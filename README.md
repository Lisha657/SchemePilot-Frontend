- AI-powered government scheme recommendations
- Eligibility checking based on:
  - Age
  - Gender
  - State
  - Occupation
  - Category
  - Annual Income
- Displays eligible schemes instantly
- AI-generated explanation of the best matching scheme
- Required documents for application
- Benefits of the scheme
- Application tips
- Responsive and modern user interface

---

## 🛠️ Tech Stack

### Frontend
- React
- TypeScript
- Vite
- Tailwind CSS
- Axios

### Backend
- FastAPI
- Python
- Google Gemini API
- JSON-based scheme database

### Deployment
- Frontend: Vercel
- Backend: Render
- Version Control: GitHub

---

## 📂 Project Structure

```
SchemePilot-Frontend/
│
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── backend/
│   ├── main.py
│   ├── ai.py
│   ├── schemes.json
│   ├── requirements.txt
│   └── .env
│
└── README.md
```

---

## ⚙️ Installation

### Clone the repository

```bash
git clone https://github.com/Lisha657/SchemePilot-Frontend.git
```

```bash
cd SchemePilot-Frontend
```

---

### Frontend

```bash
cd frontend
npm install
npm run dev
```

---

### Backend

```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```

---

## 🔑 Environment Variables

Create a `.env` file inside the `backend` folder.

```env
GEMINI_API_KEY=YOUR_GEMINI_API_KEY
```

---

## 📡 API Endpoints

### Check Eligible Schemes

```
GET /eligible
```

Parameters

- age
- gender
- state
- occupation
- category
- income

---

### AI Recommendation

```
POST /recommend
```

Request Body

```json
{
  "user": {},
  "schemes": []
}
```

---
