import uvicorn
from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def index():
    return "Hello world"

def main():
    print("Server started")
    uvicorn.run(app, host="0.0.0.0", port=8000)

if __name__ == "__main__":
    main()
