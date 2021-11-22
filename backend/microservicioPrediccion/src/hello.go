package main

import (

	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"strconv"
	"github.com/gorilla/mux"

)

type mx struct {
	ValueM string `json:"m"`
	ValueC string `json:"c"`
}

type registroPM25 struct {
	ID          int    `json:"id"`
	PM25        string `json:"pm25"`
}

type registroPM10 struct {
	ID          int    `json:"id"`
	PM10        string `json:"pm10"`
}

type allRegistersPM10 []registroPM10
type allRegistersPM25 []registroPM25

var registros = allRegistersPM10{
	{
		ID:          1,
		PM10:        "0.31",
	},
	{
		ID:          2,
		PM10:        "100.31",
	},
}

func prediction(w http.ResponseWriter, r *http.Request) {
	enableCors(&w, r)
	if (*r).Method == "OPTIONS" {
		return
	}

	var slopeIntercept mx
	reqBody, err := ioutil.ReadAll(r.Body)
	if err != nil {
		fmt.Fprintf(w, "inserte un registro válido")
	}

	json.Unmarshal(reqBody, &slopeIntercept)
	fmt.Println(slopeIntercept.ValueM, slopeIntercept.ValueC)
	//Llamar a la función calcularY (predecir)
	var registros2 allRegistersPM25
	for _, reg := range registros {
		mV, _ := strconv.ParseFloat(slopeIntercept.ValueM, 64)
		cV, _ := strconv.ParseFloat(slopeIntercept.ValueC, 64)
		pm10V, _ := strconv.ParseFloat(reg.PM10, 64)
		registros2 = append(registros2, registroPM25{reg.ID, fmt.Sprintf("%f",calcularY(mV, cV, pm10V))})
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(registros2)
}

func getRegisters(w http.ResponseWriter, r *http.Request) {
	enableCors(&w, r)
	if (*r).Method == "OPTIONS" {
		return
	}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(registros)
}

func getRegister(w http.ResponseWriter, r *http.Request) {
	enableCors(&w, r)
	if (*r).Method == "OPTIONS" {
		return
	}
	vars := mux.Vars(r)
	registerID, _ := strconv.Atoi(vars["id"])

	for _, reg := range registros {
		if reg.ID == registerID {
			w.Header().Set("Content-Type", "application/json")
			json.NewEncoder(w).Encode(reg)
		}
	}
}

func createRegister(w http.ResponseWriter, r *http.Request) {
	enableCors(&w, r)
	if (*r).Method == "OPTIONS" {
		return
	}

	var newRegister registroPM10
	reqBody, err := ioutil.ReadAll(r.Body)
	if err != nil {
		fmt.Fprintf(w, "inserte un registro válido")
	}

	json.Unmarshal(reqBody, &newRegister)
	newRegister.ID = len(registros) + 1

	registros = append(registros, newRegister)

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(newRegister)
}

func updateRegister(w http.ResponseWriter, r *http.Request) {
	enableCors(&w, r)
	if (*r).Method == "OPTIONS" {
		return
	}

	vars := mux.Vars(r)
	registerID, _ := strconv.Atoi(vars["id"])

	var updatedRegister registroPM10
	reqBody, err := ioutil.ReadAll(r.Body)
	if err != nil {
		fmt.Fprintf(w, "no se puede capturar el nuevo registro")
	}

	json.Unmarshal(reqBody, &updatedRegister)

	for i, reg := range registros {
		if reg.ID == registerID {
			updatedRegister.ID = registerID
			registros[i] = updatedRegister
		}
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(registros)
}

func deleteRegister(w http.ResponseWriter, r *http.Request) {
	enableCors(&w, r)
	if (*r).Method == "OPTIONS" {
		return
	}
	vars := mux.Vars(r)
	registerID, _ := strconv.Atoi(vars["id"])

	for i, reg := range registros {
		if reg.ID == registerID {
			registros = append(registros[:i], registros[i+1:]...)
		}
	}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(registros)
}

func welcome(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "Microservicio de Predcción")
}

func enableCors(w *http.ResponseWriter, req *http.Request) {
	(*w).Header().Set("Access-Control-Allow-Origin", "*")
	(*w).Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
	(*w).Header().Set("Access-Control-Allow-Headers", "Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization")
}

func main() {

	router := mux.NewRouter().StrictSlash(true)
	router.HandleFunc("/", welcome)
	router.HandleFunc("/data", getRegisters).Methods("GET")
	router.HandleFunc("/data/{id}", getRegister).Methods("GET")
	router.HandleFunc("/data", createRegister).Methods("POST", "OPTIONS")
	router.HandleFunc("/data/{id}", updateRegister).Methods("PUT", "OPTIONS")
	router.HandleFunc("/data/{id}", deleteRegister).Methods("DELETE", "OPTIONS")
	router.HandleFunc("/predict", prediction).Methods("POST", "OPTIONS")

	log.Fatal(http.ListenAndServe(":9000", router))
}


func calcularY(m, c, pm10 float64)(float64){
	return m*pm10 + c
}
