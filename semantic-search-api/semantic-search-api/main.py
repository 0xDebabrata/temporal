from fastapi import FastAPI
from pydantic import BaseModel
from sentence_transformers import SentenceTransformer

from . import crud

app = FastAPI()

model = SentenceTransformer("multi-qa-mpnet-base-dot-v1")

# article object model for article data sent from nodejs server
class Article(BaseModel):
    content: str
    title: str
    url: str
    user_id: str

@app.get("/")
def index():
    return "Hello world"

@app.get("/search/{query}")
def search(query: str):
    query_emb = model.encode(query)
    print(query)
    crud.search(query_emb)
    return "Query embedding done" 

@app.post("/add-article")
async def addArticle(article: Article):
    vector = model.encode(article.content)
    crud.addArticle(article.url, article.title, article.content, vector)

    return "Success"
