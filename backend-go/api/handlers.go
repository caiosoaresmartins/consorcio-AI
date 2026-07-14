package api

import (
	"consorcio-ai/backend-go/services"
	"encoding/json"
	"net/http"
)

// PredictRequest representa o payload esperado do frontend.
type PredictRequest struct {
	Bid           float64 `json:"bid"`
	HorizonMonths int     `json:"horizonMonths"`
}

// PredictResponse representa a resposta do cálculo.
type PredictResponse struct {
	Probability float64 `json:"probability"`
	Status      string  `json:"status"`
}

// PredictHandler lida com a requisição de simulação de contemplação.
func PredictHandler(svc services.PredictionService) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		if r.Method != http.MethodPost {
			http.Error(w, "Método não permitido", http.StatusMethodNotAllowed)
			return
		}

		var req PredictRequest
		if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
			http.Error(w, "Erro no payload", http.StatusBadRequest)
			return
		}

		// Utiliza o serviço injetado para calcular a predição
		prob, err := svc.Predict(req.Bid, req.HorizonMonths)
		if err != nil {
			http.Error(w, "Erro interno de predição", http.StatusInternalServerError)
			return
		}

		resp := PredictResponse{
			Probability: prob,
			Status:      "success",
		}

		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(resp)
	}
}
