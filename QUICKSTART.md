# Quick Start Guide - AI Interview Generator

Get up and running in 5 minutes!

## ⚡ Quick Setup

### 1. Get API Key
- Visit: https://makersuite.google.com/app/apikey
- Click "Get API Key" → "Create API Key in new project"
- Copy your API key

### 2. Create Virtual Environment
```bash
# Windows
python -m venv venv
venv\Scripts\activate

# macOS/Linux
python3 -m venv venv
source venv/bin/activate
```

### 3. Install Dependencies
```bash
pip install -r requirements.txt
```

### 4. Set API Key
```bash
# Windows (PowerShell)
$env:GEMINI_API_KEY = "your_api_key_here"

# macOS/Linux (Bash)
export GEMINI_API_KEY="your_api_key_here"

# OR edit settings.py directly
```

### 5. Run Database Setup
```bash
python manage.py migrate
```

### 6. Start Server
```bash
python manage.py runserver
```

### 7. Open Browser
Go to: `http://localhost:8000`

### 8. Try It Out!
- Enter: "Python decorators"
- Click Send
- Get interview questions!

---

## 🧪 Test Questions

```
1. Python decorators
2. JavaScript promises
3. SQL joins
4. React hooks
5. System design
6. Git workflow
7. Docker basics
8. API design
```

---

## 🔧 Troubleshooting

| Problem | Solution |
|---------|----------|
| API key not working | Check: `echo %GEMINI_API_KEY%` |
| Module not found | Run: `pip install -r requirements.txt` |
| Port 8000 in use | Run: `python manage.py runserver 8001` |
| Static files missing | Run: `python manage.py collectstatic` |
| Database error | Run: `python manage.py migrate` |

---

## 📚 File Structure

```
interview-chatbot/
├── manage.py              ← Run the app
├── requirements.txt       ← Install with pip
├── chatbot/               ← Settings & config
│   └── settings.py        ← API key goes here
├── chat/                  ← API logic
│   └── views.py           ← Gemini integration
├── templates/
│   └── index.html         ← Chat UI
└── static/
    ├── css/style.css      ← Styling
    └── js/script.js       ← Frontend logic
```

---

## 📝 API Usage

### Test with cURL:
```bash
curl -X POST http://localhost:8000/api/chat/ \
  -H "Content-Type: application/json" \
  -d '{"message": "Python decorators"}'
```

### Test with Python:
```python
import requests
r = requests.post('http://localhost:8000/api/chat/',
                  json={'message': 'Python decorators'})
print(r.json())
```

---

## ✨ Features

✅ ChatGPT-like interface  
✅ Real-time AI responses  
✅ Structured questions & answers  
✅ Error handling  
✅ Responsive design  
✅ No database needed initially  

---

## 🚀 Next Steps

1. ✅ Get it working locally
2. 📖 Read full README.md for detailed docs
3. 🎨 Customize styling in style.css
4. 🔌 Explore the API endpoint
5. 🚢 Deploy to cloud (Heroku, AWS, etc.)

---

**Questions?** See the full README.md for detailed documentation.
