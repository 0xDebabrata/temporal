from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy import Column, String, DateTime
from pgvector.sqlalchemy import Vector
import uuid
from datetime import datetime

Base = declarative_base()

class Article(Base):
    __tablename__ = "articles"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_email = Column(String)
    url = Column(String)
    title = Column(String)
    content = Column(String)
    vector_emb = Column(Vector(768))
    time = Column(DateTime, default=datetime.now)

    def __repr__(self):
        return "{}\n"\
                .format(self.title)
