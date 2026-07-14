from fastapi import FastAPI

app = FastAPI(
    title="ConsórcioAI API",
    description="API do MVP de plataforma de predição para consórcios.",
    version="0.1.0"
)

@app.get("/")
def read_root():
    return {"message": "Bem-vindo à API do ConsórcioAI"}

@app.get("/health")
def health_check():
    return {"status": "ok"}
