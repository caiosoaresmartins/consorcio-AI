package services

import "math"

// PredictionService define a interface para o serviço de predições.
type PredictionService interface {
	Predict(bid float64, horizonMonths int) (float64, error)
}

// predictionServiceImpl é a implementação concreta.
type predictionServiceImpl struct {
	// Aqui poderíamos injetar conexões de DB, repositórios, etc.
}

// NewPredictionService constrói o serviço (para uso no DI).
func NewPredictionService() PredictionService {
	return &predictionServiceImpl{}
}

// Predict calcula uma probabilidade de contemplação simulada.
func (s *predictionServiceImpl) Predict(bid float64, horizonMonths int) (float64, error) {
	// Lógica simplificada de sobrevivência (Cox/GBS mockup)
	baseProb := 0.0
	if horizonMonths <= 3 {
		baseProb = 15.0
	} else if horizonMonths <= 6 {
		baseProb = 45.0
	} else {
		baseProb = 82.0
	}

	// Adiciona o peso do lance
	currentProb := baseProb + (bid * 0.8)
	
	// Limita a probabilidade em 99%
	currentProb = math.Min(99.0, currentProb)

	return currentProb, nil
}
