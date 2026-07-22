import os
import json
from dotenv import load_dotenv
from google import genai

load_dotenv()

client = genai.Client(
    api_key=os.getenv("GEMINI_API_KEY")
)

def recommend_schemes(user, schemes):

    prompt = f"""
You are SchemePilot AI.

User Profile

Age: {user["age"]}
Gender: {user["gender"]}
State: {user["state"]}
Occupation: {user["occupation"]}
Category: {user["category"]}
Income: ₹{user["income"]}

Eligible Schemes:

{schemes}

Choose the SINGLE BEST scheme.

Return ONLY valid JSON.

{{
  "bestScheme":"",
  "whyEligible":"",
  "benefits":["",""],
  "documents":["",""],
  "deadline":"",
  "tips":""
}}

Do not use markdown.
Do not add any extra text.
"""

    response = client.models.generate_content(
        model="gemini-3-flash-preview",
        contents=prompt,
    )

    text = response.text.strip()

    if text.startswith("```json"):
        text = text.replace("```json", "").replace("```", "").strip()
    elif text.startswith("```"):
        text = text.replace("```", "").strip()

    return json.loads(text)