# Setup Guide for Windows Users

Complete step-by-step guide for Windows 10/11

## 📋 Prerequisites

1. **Python 3.8+** - Download from https://www.python.org/
   - ✅ Check "Add Python to PATH" during installation
   - Verify: Open PowerShell and run `python --version`

2. **Google Gemini API Key**
   - Visit: https://makersuite.google.com/app/apikey
   - Create and copy your API key

---

## 🚀 Installation Steps

### Step 1: Open PowerShell

- Press `Win + X` → Select "Windows PowerShell (Admin)" or "Terminal (Admin)"
- Navigate to project: `cd "d:\Academics 2\interview-chatbot"`

### Step 2: Create Virtual Environment

```powershell
python -m venv venv
```

**Wait for it to complete** (it creates a folder named `venv`)

### Step 3: Activate Virtual Environment

```powershell
venv\Scripts\activate
```

You should see `(venv)` at the start of your prompt. Example:
```
(venv) PS C:\Users\YourName\...>
```

### Step 4: Upgrade pip (Optional but Recommended)

```powershell
python -m pip install --upgrade pip
```

### Step 5: Install Dependencies

```powershell
pip install -r requirements.txt
```

**This will take 2-3 minutes.** You'll see packages downloading.

### Step 6: Create .env File

Open Notepad and create a file with:

```
GEMINI_API_KEY=your_api_key_here
```

Save as `.env` in the project root (`d:\Academics 2\interview-chatbot\.env`)

**OR** use PowerShell:

```powershell
@'
GEMINI_API_KEY=your_actual_api_key_here
'@ | Out-File .env -Encoding UTF8
```

### Step 7: Set Environment Variable

```powershell
$env:GEMINI_API_KEY = "your_api_key_here"
```

Verify it's set:
```powershell
echo $env:GEMINI_API_KEY
```

### Step 8: Run Migrations

```powershell
python manage.py migrate
```

You should see:
```
Running migrations:
  Applying contenttypes.0001_initial... OK
  Applying auth.0001_initial... OK
  ...
```

### Step 9: Start Development Server

```powershell
python manage.py runserver
```

You should see:
```
Starting development server at http://127.0.0.1:8000/
Quit the server with CTRL-BREAK.
```

### Step 10: Open in Browser

Go to: `http://localhost:8000`

---

## 💬 Test the Chatbot

1. Enter: `Python decorators`
2. Click "Send"
3. Wait for response (usually 3-5 seconds)
4. See the generated interview questions!

---

## 🆘 Troubleshooting

### Problem: "python not found"

**Solution:**
- Python not added to PATH
- Reinstall Python and **check "Add Python to PATH"**
- Or use full path: `C:\Python311\python.exe -m venv venv`

### Problem: "venv\Scripts\activate" - No such file

**Solution:**
- Run `python -m venv venv` again
- Make sure you're in the correct directory

### Problem: "No module named django"

**Solution:**
```powershell
# Make sure venv is activated (you should see (venv) in prompt)
pip install -r requirements.txt
```

### Problem: "API key not found"

**Solution:**
```powershell
# Check if API key is set
echo $env:GEMINI_API_KEY

# If empty, set it:
$env:GEMINI_API_KEY = "your_key_here"

# Or edit chatbot/settings.py and replace the key manually
```

### Problem: "Port 8000 already in use"

**Solution:**
```powershell
# Use a different port
python manage.py runserver 8001
```

Then visit: `http://localhost:8001`

### Problem: Static files not loading (CSS/JS broken)

**Solution:**
```powershell
python manage.py collectstatic --noinput
```

### Problem: "No such table: auth_user" or database error

**Solution:**
```powershell
# Delete database and re-run migrations
rm db.sqlite3
python manage.py migrate
```

---

## 🎓 Running Tests

```powershell
python manage.py test
```

---

## 🛑 Stopping the Server

In PowerShell:
- Press `Ctrl + C`

---

## 🔄 Restarting

1. Activate virtual environment (if not already):
   ```powershell
   venv\Scripts\activate
   ```

2. Start server:
   ```powershell
   python manage.py runserver
   ```

3. Open browser:
   ```
   http://localhost:8000
   ```

---

## 📝 Making Changes

### To modify the prompt/AI behavior:
- Edit: `chat/views.py`
- Find the `system_prompt` variable
- Modify the text
- Restart server (`Ctrl+C`, then `python manage.py runserver`)

### To change styling:
- Edit: `static/css/style.css`
- Reload browser page (F5)

### To modify frontend behavior:
- Edit: `static/js/script.js`
- Reload browser page (F5)

---

## 🚢 Deployment (Production)

For local development, the current setup is perfect.

For production deployment, see README.md for advanced configuration.

---

## 📚 Important Files

| File | Purpose |
|------|---------|
| `chatbot/settings.py` | Django config (API key here) |
| `chat/views.py` | Backend API logic |
| `templates/index.html` | Chat interface |
| `static/js/script.js` | Frontend JavaScript |
| `static/css/style.css` | Styling |

---

## ✅ Checklist

- [ ] Python installed and in PATH
- [ ] Project folder ready
- [ ] Virtual environment created
- [ ] Virtual environment activated
- [ ] Dependencies installed
- [ ] API key set in environment or settings.py
- [ ] Migrations run
- [ ] Server started
- [ ] Browser opened to localhost:8000
- [ ] Can send messages and get responses

---

## 🎉 Success!

If you see the chat interface and can send messages, you're all set!

For more details, see the full README.md in the project folder.

---

**Happy learning and good luck! 🚀**
