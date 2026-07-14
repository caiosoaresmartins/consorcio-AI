package main

import (
	"consorcio-ai/backend-go/api"
	"consorcio-ai/backend-go/di"
	"consorcio-ai/backend-go/services"
	"fmt"
	"log"
	"net/http"
	
	"github.com/devs-group/godi"
)

func main() {
	// Inicializa o container de dependências
	container := di.SetupContainer()

	// Resolve o serviço de predições
	predSvc := godi.Resolve[services.PredictionService](container)

	// Configura o roteamento HTTP
	http.HandleFunc("/predict", api.PredictHandler(predSvc))
	
	http.HandleFunc("/health", func(w http.ResponseWriter, r *http.Request) {
		w.WriteHeader(http.StatusOK)
		w.Write([]byte("Go Prediction Service OK"))
	})

	// Inicia o servidor
	port := ":8080"
	fmt.Printf("Iniciando Core Prediction Service em Go na porta %s...\n", port)
	log.Fatal(http.ListenAndServe(port, nil))
}
