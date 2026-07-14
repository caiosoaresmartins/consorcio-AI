package di

import (
	"consorcio-ai/backend-go/services"
	"github.com/devs-group/godi"
)

// SetupContainer configura e registra todas as dependências no container Godi.
func SetupContainer() godi.Container {
	container := godi.NewContainer()

	// Registra o PredictionService como um Singleton (instância única)
	container.RegisterSingleton(func() services.PredictionService {
		return services.NewPredictionService()
	})

	return container
}
