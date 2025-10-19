from fastapi import FastAPI, Depends
from sqlalchemy import create_engine, Column, Integer, String, DateTime
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, Session
import datetime
import os
from dotenv import load_dotenv

load_dotenv()

# Database setup
DATABASE_URL = os.getenv("DATABASE_URL")
engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

# Message model
class Message(Base):
  __tablename__ = "messages"
  id = Column(Integer, primary_key=True, index=True)
  sender = Column(String, index=True)
  content = Column(String)
  timestamp = Column(DateTime, default=datetime.datetime.utcnow)

# Create tables
Base.metadata.create_all(bind=engine)

app = FastAPI(title="PyWebView Msg App Backend", version="0.1.0")

# Dependency to get DB session
def get_db():
  db = SessionLocal()
  try:
    yield db
  finally:
    db.close()

@app.get("/")
async def root():
  return {"message": "Hello from FastAPI backend!"}

@app.get("/health")
async def health_check():
  return {"status": "healthy"}

@app.post("/messages/")
async def send_message(sender: str, content: str, db: Session = Depends(get_db)):
  message = Message(sender=sender, content=content)
  db.add(message)
  db.commit()
  db.refresh(message)
  return message

@app.get("/messages/")
async def get_messages(db: Session = Depends(get_db)):
  messages = db.query(Message).all()
  return messages
