from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy import Column, String 
from pgvector.sqlalchemy import Vector
import uuid

Base = declarative_base()

class Article(Base):
    __tablename__ = "articles"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), default=uuid.uuid4)
    url = Column(String)
    title = Column(String)
    content = Column(String)
    vector_emb = Column(Vector(768))

    def __repr__(self):
        return "<Book(title='{}', content='{}', url='{}')"\
                .format(self.title, self.author, self.url)
