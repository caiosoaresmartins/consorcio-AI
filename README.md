# ConsórcioAI - Plataforma SaaS de Previsão Probabilística

Bem-vindo ao repositório MVP do **ConsórcioAI**.
Esta estrutura conta com uma arquitetura de microserviços:

## Estrutura do Projeto

- `/frontend`: Aplicação Next.js + React.
- `/backend-ml`: API em Python (FastAPI, SQLAlchemy, XGBoost) para treinar modelos e processar Document AI.
- `/backend-go`: Core Prediction Service em Go, usando Injeção de Dependências genérica (Godi) para servir previsões em altíssima performance.
- `docker-compose.yml`: Banco de dados PostgreSQL local.

## Como Rodar Localmente

**Pré-requisitos**:
- Node.js (>= 18)
- Python (>= 3.9)
- Go (>= 1.21)
- Docker (Opcional, para PostgreSQL local)

### Front-end
1. `cd frontend`
2. `npm install`
3. `npm run dev`
(O front-end estará rodando em `localhost:3000`)

### Back-end ML (Python)
1. `cd backend-ml`
2. `python -m venv venv`
3. `venv\Scripts\activate` (no Windows)
4. `pip install -r requirements.txt`
5. `uvicorn main:app --reload --port 8000`

### Back-end Core (Go)
1. `cd backend-go`
2. `go mod tidy` (baixa as dependências, incluindo o Godi)
3. `go run main.go`
(O servidor Go subirá na porta 8080)

### Banco de Dados (Docker)
1. Na raiz do projeto, rode `docker-compose up -d`
