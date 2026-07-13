# ConsórcioAI - Plataforma SaaS de Previsão Probabilística

Bem-vindo ao repositório MVP do **ConsórcioAI**.
Esta estrutura conta com um Front-end moderno em Next.js (Tailwind) e um Back-end Python com FastAPI focado em extração (OCR/Document AI) e modelos estatísticos.

## Estrutura do Projeto

- `/frontend`: Aplicação Next.js + React.
- `/backend`: APIs em Python (FastAPI, SQLAlchemy, scikit-learn).
- `docker-compose.yml`: Banco de dados PostgreSQL local.

## Como Rodar Localmente

**Pré-requisitos**:
- Node.js (>= 18)
- Python (>= 3.9)
- Docker (Opcional, para PostgreSQL local)

### Front-end
1. `cd frontend`
2. `npm install`
3. `npm run dev`
(O front-end estará rodando em `localhost:3000`)

### Back-end
1. `cd backend`
2. `python -m venv venv`
3. `venv\Scripts\activate` (no Windows)
4. `pip install -r requirements.txt`
5. `uvicorn main:app --reload`
(A documentação Swagger estará em `localhost:8000/docs`)

### Banco de Dados (Docker)
1. Na raiz do projeto, rode `docker-compose up -d`
