package main

import (
	"encoding/csv"
	"encoding/json"
	"fmt"
	"image/color"
	"io"
	"io/ioutil"
	"log"
	"net/http"
	"os"
	"strconv"

	"github.com/gorilla/mux"
	"gonum.org/v1/plot"
	"gonum.org/v1/plot/plotter"
	"gonum.org/v1/plot/vg/draw"
)

type mx struct {
	ValueM string `json:"m"`
	ValueC string `json:"c"`
}

var slopeIntercept mx

type registro struct {
	ID          int    `json:"id"`
	Fecha       string `json:"fecha"`
	CO          string `json:"co"`
	H2S         string `json:"h2s"`
	NO2         string `json:"no2"`
	O3          string `json:"o3"`
	PM10        string `json:"pm10"`
	PM25        string `json:"pm25"`
	SO2         string `json:"so2"`
	Ruido       string `json:"ruido"`
	UV          string `json:"uv"`
	Humedad     string `json:"humedad"`
	Presion     string `json:"presion"`
	Temperatura string `json:"temperatura"`
}

type allRegisters []registro

var registros = allRegisters{
	{
		ID:          1,
		Fecha:       "12/12/2021",
		CO:          "0.19",
		H2S:         "0.41",
		NO2:         "0.08",
		O3:          "0.00",
		PM10:        "0.31",
		PM25:        "0.80",
		SO2:         "0.88",
		Ruido:       "0.79",
		UV:          "0.00",
		Humedad:     "0.36",
		Presion:     "0.00",
		Temperatura: "0.15",
	},
	{
		ID:          2,
		Fecha:       "24/12/2021",
		CO:          "100.19",
		H2S:         "100.41",
		NO2:         "100.08",
		O3:          "100.00",
		PM10:        "100.31",
		PM25:        "100.80",
		SO2:         "100.88",
		Ruido:       "100.79",
		UV:          "100.00",
		Humedad:     "100.36",
		Presion:     "100.00",
		Temperatura: "100.15",
	},
}

func getReady(w http.ResponseWriter, r *http.Request) {
	enableCors(&w, r)
	if (*r).Method == "OPTIONS" {
		return
	}

	slopeIntercept.ValueC = "0"
	slopeIntercept.ValueM = "0"

	url := "https://raw.githubusercontent.com/omarmendozaaa/TF/Future/dataset/SI_contaminacion.csv"

	var dataMatrix []xy
	dataMatrix, _ = leerCSVdesdeURL(url)
	//Tengo que ver si el usuario ha ingresado nuevos registros para el train

	err := entrenamiento("out.png", dataMatrix)
	if err != nil {
		log.Fatalf("Could not plot data: %v", err)
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(slopeIntercept)
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

	var newRegister registro
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

	var updatedRegister registro
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
	fmt.Fprintf(w, "Trabajo Final de Programación Concurrente")
}

func enableCors(w *http.ResponseWriter, req *http.Request) {
	(*w).Header().Set("Access-Control-Allow-Origin", "*")
	(*w).Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
	(*w).Header().Set("Access-Control-Allow-Headers", "Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization")
}

func main() {

	router := mux.NewRouter().StrictSlash(true)
	router.HandleFunc("/", welcome)
	router.HandleFunc("/registers", getRegisters).Methods("GET")
	router.HandleFunc("/registers/{id}", getRegister).Methods("GET")
	router.HandleFunc("/registers", createRegister).Methods("POST", "OPTIONS")
	router.HandleFunc("/registers/{id}", updateRegister).Methods("PUT", "OPTIONS")
	router.HandleFunc("/registers/{id}", deleteRegister).Methods("DELETE", "OPTIONS")
	router.HandleFunc("/training", getReady).Methods("GET")

	log.Fatal(http.ListenAndServe(":8000", router))
}
