package main

import (
	"bufio"
	"encoding/json"
	"fmt"
	"math/rand"
	"net"
	"os"
	"time"

	"gonum.org/v1/plot/plotter"
)

var addrs []string //libreta de direcciones de los nodos de la red
var ticket int
var direccion string //localhost:9001

//estructura que se comparte entre los nodos
type Info struct {
	Tipo       string
	NumNodo    int
	AddrNodo   string
	Numeros    []float64
	Pendiente  float64
	Intercepto float64
}

type xy struct {
	x, y float64
}

type mx struct {
	ValueM string `json:"m"`
	ValueC string `json:"c"`
}

//estructura que permanece en cada nodo
type MyInfo struct {
	contadorMsg int
	primero     bool
	proxNum     int
	proxAddr    string
}

var chIniciar chan bool //esperar que el nodo inicie su trabajo en SC
var chMyInfo chan MyInfo

func main() {

	//configuración de la red
	var n int
	fmt.Print("Ingrese la dirección del nodo: ")
	fmt.Scanf("%s\n", &direccion) //direccionamos el almacenamiento en memoria

	//1.- Solicitar las direcciones de los nodos
	fmt.Print("Ingrese la cantidad de nodos de la red: ")
	fmt.Scanf("%d\n", &n)

	//guardar las direcciones en la bitácora
	addrs = make([]string, n)

	for i := range addrs {
		fmt.Printf("Nodo %d = ", i+1)
		fmt.Scanf("%s\n", &addrs[i]) //guardar directamente al arreglo
	}
	/////////////////////////
	//2.-Generar el tiket
	rand.Seed(time.Now().UTC().UnixNano()) //semilla para valores aleatoreos
	ticket = rand.Intn(1000000)
	fmt.Println(ticket)

	/*ln, _ := net.Listen("tcp", "localhost:8000")
	defer ln.Close()
	con, _ := ln.Accept()
	defer con.Close()
	r := bufio.NewReader(con)
	msg, _ := r.ReadString('\n')
	fmt.Print(msg)*/

	//Valores del arreglo

	var dataMatrix []xy
	dataMatrix = append(dataMatrix, xy{1.0, 2.0})
	dataMatrix = append(dataMatrix, xy{2.0, 4.0})

	var arregloNumeros []float64

	for _, reg := range dataMatrix {
		arregloNumeros = append(arregloNumeros, reg.x)
		arregloNumeros = append(arregloNumeros, reg.y)
	}
	//Prueba-Incio
	type mx struct {
		ValueM string `json:"m"`
		ValueC string `json:"c"`
	}

	//var slopeIntercept mx
	m, c := entrenamiento(dataMatrix)
	//Puebra-Fin

	//inicializar / crear canales
	chIniciar = make(chan bool)
	chMyInfo = make(chan MyInfo)

	//enviar un mensaje inicial
	go func() {
		chMyInfo <- MyInfo{0, true, 10000001, ""}
	}()

	//3.- Inicio del proceso //Rol Cliente
	go func() {
		fmt.Print("Presione enter para iniciar!!: ")
		//pausa
		bufferIn := bufio.NewReader(os.Stdin)
		bufferIn.ReadString('\n') //pausa

		//crear la info a enviar
		info := Info{"ENVIOTIKET", ticket, direccion, arregloNumeros, m, c}
		//notificar a todos los nodos de la bitácora
		for _, addr := range addrs {
			go enviar(addr, info)
		}
	}()

	//TODO
	//4,. Publicar el servicio //Rol Servidor
	servicioSC()
}

func enviar(addr string, info Info) {
	con, _ := net.Dial("tcp", addr)
	defer con.Close()
	//codificar el mensaje a enviar a los nodos
	binfo, _ := json.Marshal(info)
	//enviar
	fmt.Fprintln(con, string(binfo))

	//fmt.Println(reflect.TypeOf(dataMatrix))
	//encoder := gob.NewEncoder(con)
	//encoder.Encode(arregloNumeros)
}

//////////////////////////////////
func servicioSC() {
	//expone el puerto y se coloca en modo escucha
	ln, _ := net.Listen("tcp", direccion)
	defer ln.Close()
	for {
		con, _ := ln.Accept()
		go manejadorConexiones(con)
	}
}

func manejadorConexiones(con net.Conn) {
	//lógica del servicio
	defer con.Close()
	bufferIn := bufio.NewReader(con)
	bInfo, _ := bufferIn.ReadString('\n')
	//decodificar
	var info Info
	json.Unmarshal([]byte(bInfo), &info)
	//type xy struct{ x, y float64 }
	//var dataMatrix []xy
	fmt.Println(info)
	//var numeros []float64
	//dec := gob.NewDecoder(con)
	//dec.Decode(&numeros)

	//for i := 0; i < len(numeros); i = i + 2 {
	//	dataMatrix = append(dataMatrix, xy{numeros[i], numeros[i+1]})
	//}
	//mt.Println(dataMatrix)

	//fmt.Println(reflect.TypeOf(dataMatrix))
	//evaluación según el tiket
	switch info.Tipo {
	case "ENVIOTIKET":
		//recuperar del canal la info del nodo
		myInfo := <-chMyInfo
		if info.NumNodo < ticket {
			myInfo.primero = false
		} else if info.NumNodo < myInfo.proxNum { //actualiza la info del nodo
			myInfo.proxNum = info.NumNodo
			myInfo.proxAddr = info.AddrNodo
		}

		//actualiza en uno el contador
		myInfo.contadorMsg++

		//retornar por el canal la info actualizada
		go func() {
			chMyInfo <- myInfo
		}()

		//evaluar si ya repondieron todos los nodos
		if myInfo.contadorMsg == len(addrs) {
			//evaluar
			if myInfo.primero {
				procesarSC()
			} else {
				chIniciar <- true
			}
		}
	case "INICIAR":
		<-chIniciar
		procesarSC()
	}
}

func procesarSC() {
	fmt.Print("Inicia las tareas de la SC")
	myInfo := <-chMyInfo

	fmt.Println("Procesando la SC ")

	if myInfo.proxAddr == "" {
		fmt.Println("Soy el último nodo, SC Procesada!")
	} else {
		//notifica al nodo que le continua

		fmt.Println("trabajo concluido, SC finalizada!!!")

		//enviar la notificación al próximo
		info := Info{Tipo: "INICIAR"}
		enviar(myInfo.proxAddr, info)
	}
}
func entrenamiento(xys []xy) (x, c float64) {

	pxys := make(plotter.XYs, len(xys))
	for i, xy := range xys {
		pxys[i].X = xy.x
		pxys[i].Y = xy.y
	}

	//Start Linear Regression
	x, c = linearRegression(pxys, 0.01)
	//	slopeIntercept.ValueC = fmt.Sprintf("%f", c)
	//	slopeIntercept.ValueM = fmt.Sprintf("%f", x)
	//End Linear Regression
	return x, c
}

func linearRegression(xys plotter.XYs, alpha float64) (m, c float64) {
	for i := 0; i < 1000; i++ {
		dm, dc := gradienteDescendiente(xys, m, c)
		m += -dm * alpha
		c += -dc * alpha
		//fmt.Printf("grad(%.2f, %.2f) = (%.2f, %.2f)\n", m, c, dm, dc)
	}

	return m, c
}

func gradienteDescendiente(xys plotter.XYs, pendiente, intercepto float64) (dp, di float64) {
	for _, xy := range xys {
		d := xy.Y - (xy.X*pendiente + intercepto)
		dp += -xy.X * d
		di += -d
	}

	n := float64(len(xys))
	return 2 / n * dp, 2 / n * di

}
