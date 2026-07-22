from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import json
from ai import recommend_schemes


app = FastAPI(title="SchemePilot API")

# Allow React frontend to access FastAPI
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load schemes
with open("schemes.json", "r", encoding="utf-8") as file:
    schemes = json.load(file)


@app.get("/")
def home():
    return {"message": "SchemePilot API is running"}


@app.get("/eligible")
def eligible(
    age: int,
    income: int,
    state: str,
    occupation: str,
    gender: str,
    category: str,
):
    results = []

    for scheme in schemes:

        # Age check
        if age < scheme["ageMin"] or age > scheme["ageMax"]:
            continue

        # Income check
        if income > scheme["incomeMax"]:
            continue

        # Occupation check
        occupations = [o.lower() for o in scheme["occupation"]]
        if occupation.lower() not in occupations:
            continue

        # State check
        if (
            scheme["state"].lower() != "all india"
            and scheme["state"].lower() != state.lower()
        ):
            continue

        results.append(scheme)

    return results


@app.post("/recommend")
def recommend(data: dict):

    recommendation = recommend_schemes(
        data["user"],
        data["schemes"]
    )

    return {
        "recommendation": recommendation
    }

    return recommendation