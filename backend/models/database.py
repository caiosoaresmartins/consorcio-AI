import os
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base

# No MVP usaremos SQLite se o DB_URL não for informado (facilita para testes sem Docker).
# Se rodar via docker-compose, passamos a variável de ambiente.
SQLALCHEMY_DATABASE_URL = os.getenv("DB_URL", "sqlite:///./consorcio.db")

if "sqlite" in SQLALCHEMY_DATABASE_URL:
    engine = create_engine(SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False})
else:
    engine = create_engine(SQLALCHEMY_DATABASE_URL)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

# Exemplo de modelo
from sqlalchemy import Column, Integer, String, Float

class Grupo(Base):
    __tablename__ = "grupos"
    
    id = Column(Integer, primary_key=True, index=True)
    nome = Column(String, index=True)
    administradora = Column(String)
    membros = Column(Integer)
    default_rate = Column(Float)
    avg_bid = Column(Float)

Base.metadata.create_all(bind=engine)
