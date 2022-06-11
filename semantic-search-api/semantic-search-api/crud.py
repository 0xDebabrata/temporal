from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
import psycopg2
from decouple import config

from . import models

DATABASE_PASSWD = config("DATABASE_PASSWD")

DATABASE_URI = "postgresql+psycopg2://postgres:{}@127.0.0.1:5433/temporal".format(DATABASE_PASSWD)

engine = create_engine(DATABASE_URI)
Session = sessionmaker(bind=engine)

def addArticle(url, title, content, vector_emb):
    s = Session()

    article = models.Article(
        url=url,
        title=title,
        content=content,
        vector_emb=vector_emb
    )
    
    s.add(article)
    s.commit()
    s.close()
