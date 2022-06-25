from fastapi import FastAPI, HTTPException
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
    user_email: str

@app.get("/{email}")
def getArticles(email: str):
    articles = crud.getArticles(email)
    return articles

@app.get("/search/")
def search(email: str, query: str = ""):
    query_emb = model.encode(query)
    articles = crud.search(email, query_emb)
    return articles

@app.post("/add-article")
async def addArticle(article: Article):
    vector = model.encode(article.content)
    crud.addArticle(article.url, article.user_email, article.title, article.content, vector)

    return "Success"

@app.delete("/delete-article/{id}")
def deleteArticle(id: str):
    flag = crud.deleteArticle(id)
    if flag:
        return "Success"
    else:
        raise HTTPException(status_code=404, detail="Article not found")

@app.get("/ping")
def ping():
    return "pong"
