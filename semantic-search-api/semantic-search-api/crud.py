from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
import psycopg2
from decouple import config

from . import models

DATABASE_PASSWD = config("DATABASE_PASSWD")

DATABASE_URI = "postgresql+psycopg2://postgres:{}@127.0.0.1:5433/temporal".format(DATABASE_PASSWD)

engine = create_engine(DATABASE_URI)
Session = sessionmaker(bind=engine)

def getArticles(email):
    s = Session()
    articles = []
    a = models.Article
    result = s.query(a.id, a.title, a.url, a.time).filter(models.Article.user_email == email).order_by(models.Article.time.desc()).all()

    for row in result:
        articles.append({
            "id": row[0],
            "title": row[1],
            "url": row[2],
            "time": row[3]
        })

    s.close()
    return articles

def addArticle(url, user_email, title, content, vector_emb):
    s = Session()

    article = models.Article(
        url=url,
        user_email=user_email,
        title=title,
        content=content,
        vector_emb=vector_emb
    )
    
    s.add(article)
    s.commit()
    s.close()

def search(query_emb):
    s = Session()
    print(s.query(models.Article).order_by(models.Article.vector_emb.cosine_distance(query_emb)).limit(2).all())
    s.close()

def deleteArticle(id):
    s = Session()
    article = s.get(models.Article, id)

    if article:
        s.delete(article)
        s.commit()
        s.close()
        return 1
    else:
        s.close()
        return 0
