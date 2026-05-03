# 🆘 Troubleshooting Guide

Solutions to common problems when setting up and running the project.

---

## 🚨 Installation Issues

### Issue: "python not found" or "python: command not found"

**Symptoms:**
- Error when running `python --version`
- `python not found` message in terminal

**Solutions:**

**Option 1: Python not installed**
- Download Python from https://www.python.org/downloads/
- Run installer
- **IMPORTANT**: Check "Add Python to PATH" during installation
- Restart terminal/PowerShell
- Test: `python --version`

**Option 2: Python installed but not in PATH**
- Find Python installation: `C:\Python311\` (example)
- Use full path: `C:\Python311\python.exe --version`
- Add to PATH:
  - Windows: System Properties → Environment Variables → Add Python path
  - Or restart and reinstall Python with "Add to PATH" checked

**Option 3: Using Python 2 instead of 3**
- Try: `python3 --version`
- If it works, use `python3` instead of `python` throughout

---

### Issue: "pip not found"

**Symptoms:**
- Error when running `pip install`
- `pip not found` message

**Solution:**
```bash
# Use Python's pip module
python -m pip install --upgrade pip

# Or use the full path
C:\Python311\Scripts\pip.exe install --upgrade pip
```

---

### Issue: "venv not found" or virtual environment issues

**Symptoms:**
- `venv\Scripts\activate` doesn't work
- `bash: ./venv/bin/activate: No such file or directory`

**Solution:**
```bash
# Recreate virtual environment
rmdir /s venv  # Windows
rm -rf venv    # macOS/Linux

# Create again
python -m venv venv

# Activate
venv\Scripts\activate          # Windows
source venv/bin/activate       # macOS/Linux
```

---

### Issue: "Permission denied" or "Access denied"

**Symptoms:**
- Cannot activate virtual environment
- Permission denied errors on Windows

**Solution:**
- Run terminal/PowerShell as Administrator
- Right-click → "Run as administrator"
- Then run: `venv\Scripts\activate`

---

### Issue: Requirements installation fails

**Symptoms:**
- Error when running `pip install -r requirements.txt`
- Some packages fail to install

**Solutions:**

**Option 1: Upgrade pip first**
```bash
python -m pip install --upgrade pip
python -m pip install --upgrade setuptools
pip install -r requirements.txt
```

**Option 2: Install packages individually**
```bash
pip install Django==4.2.7
pip install djangorestframework==3.14.0
pip install django-cors-headers==4.3.1
pip install google-generativeai==0.3.0
pip install requests==2.31.0
pip install python-decouple==3.8
```

**Option 3: Use --no-cache-dir flag**
```bash
pip install --no-cache-dir -r requirements.txt
```

---

## 🔌 API Configuration Issues

### Issue: "API key not found" error at runtime

**Symptoms:**
- Error when trying to generate questions
- "GEMINI_API_KEY" error message

**Solutions:**

**Step 1: Get API key**
- Go to https://makersuite.google.com/app/apikey
- Create new API key
- Copy it

**Step 2: Set environment variable**

Windows PowerShell:
```powershell
$env:GEMINI_API_KEY = "your_actual_key_here"
# Verify
echo $env:GEMINI_API_KEY
```

Windows Command Prompt:
```cmd
setx GEMINI_API_KEY "your_actual_key_here"
# Restart terminal for changes to apply
```

macOS/Linux Bash:
```bash
export GEMINI_API_KEY="your_actual_key_here"
# Verify
echo $GEMINI_API_KEY
```

**Step 3: Or edit settings.py directly**
- Open `chatbot/settings.py`
- Find: `GEMINI_API_KEY = os.environ.get('GEMINI_API_KEY', 'your-gemini-api-key-here')`
- Replace with: `GEMINI_API_KEY = 'your_actual_key_here'`
- Save file

---

### Issue: "API key invalid" or authentication error

**Symptoms:**
- Error: "Invalid API key"
- API calls failing even though key is set

**Solutions:**

1. **Verify key is correct**
   - Go back to https://makersuite.google.com/app/apikey
   - Check the key is not corrupted
   - Try regenerating a new key

2. **Check for extra spaces**
   - API key might have extra spaces
   - Copy carefully without spaces
   - In PowerShell, use: `$env:GEMINI_API_KEY = "key_here"` (with quotes)

3. **Verify API is enabled**
   - Go to Google Cloud Console
   - Enable Generative AI API
   - Check billing is configured

4. **Rate limit reached**
   - Free tier has limits: 60 requests per minute
   - Wait a minute and try again

---

### Issue: "Module not found" - google.generativeai

**Symptoms:**
- `ModuleNotFoundError: No module named 'google'`
- `ModuleNotFoundError: No module named 'generativeai'`

**Solutions:**

1. **Reinstall google-generativeai**
```bash
pip install google-generativeai --upgrade
```

2. **Install with specific version**
```bash
pip install google-generativeai==0.3.0
```

3. **Check virtual environment is activated**
```bash
# You should see (venv) at start of prompt
# If not, activate:
venv\Scripts\activate  # Windows
source venv/bin/activate  # macOS/Linux
```

---

## 🌐 Server Issues

### Issue: "Port 8000 already in use"

**Symptoms:**
- Error: "Address already in use"
- `OSError: [Errno 48] Address already in use`

**Solutions:**

**Option 1: Use different port**
```bash
python manage.py runserver 8001
# Then visit: http://localhost:8001
```

**Option 2: Kill process using port 8000**

Windows:
```powershell
# Find process
netstat -ano | findstr :8000

# Kill process (replace PID with the number shown)
taskkill /PID <PID> /F
```

macOS/Linux:
```bash
# Find process
lsof -i :8000

# Kill process (replace PID)
kill -9 <PID>
```

---

### Issue: "Connection refused" or "Cannot connect"

**Symptoms:**
- Cannot access http://localhost:8000
- "Connection refused" in browser

**Solutions:**

1. **Is server running?**
   - Check terminal running `python manage.py runserver`
   - Should show: "Starting development server at..."

2. **Start the server**
```bash
# Make sure you're in the project directory
cd "d:\Academics 2\interview-chatbot"

# Activate virtual environment
venv\Scripts\activate  # Windows

# Run server
python manage.py runserver
```

3. **Check URL is correct**
   - http://localhost:8000 ✅
   - http://127.0.0.1:8000 ✅
   - http://0.0.0.0:8000 ❌ (won't work, use above)

---

### Issue: Server crashes with "ModuleNotFoundError"

**Symptoms:**
- Server starts but crashes immediately
- `ModuleNotFoundError: No module named 'chat'`

**Solutions:**

1. **Check directory structure**
   - Should have: `chat/`, `chatbot/`, `templates/`, `static/` folders
   - Should have: `manage.py` in root

2. **Reinstall Django**
```bash
pip install Django==4.2.7
```

3. **Run migrations**
```bash
python manage.py migrate
```

---

## 🎨 Frontend Issues

### Issue: CSS not loading (page looks broken)

**Symptoms:**
- Page loads but no styling
- No colors, just plain text
- Buttons look like plain text

**Solutions:**

**Option 1: Collect static files**
```bash
python manage.py collectstatic --noinput
```

**Option 2: Enable static files serving**
- Check `chatbot/settings.py` has:
```python
STATIC_URL = '/static/'
STATICFILES_DIRS = [BASE_DIR / 'static']
```

**Option 3: Check file structure**
- Verify: `static/css/style.css` exists
- Verify: `static/js/script.js` exists

**Option 4: Hard refresh browser**
- Ctrl+Shift+R (Windows/Linux)
- Cmd+Shift+R (macOS)
- Or Ctrl+F5

**Option 5: Clear browser cache**
- Open DevTools (F12)
- Settings → Clear cache
- Reload page

---

### Issue: "Send" button doesn't work

**Symptoms:**
- Click button, nothing happens
- No messages appear
- No loading indicator

**Solutions:**

**Step 1: Check browser console**
- Press F12 to open Developer Tools
- Go to "Console" tab
- Look for red error messages

**Step 2: Check if server is running**
- Make sure Django server is running
- Check terminal where you ran `runserver`

**Step 3: Check network tab**
- Press F12 → Network tab
- Click Send button
- Look for POST request to `/api/chat/`
- Check status: should be 200 or 400 (not 500)

**Step 4: Check input validation**
- Make sure you entered text (not empty)
- Text should be under 1000 characters

---

### Issue: Loading spinner never stops

**Symptoms:**
- Click Send
- Loading spinner appears
- Never disappears
- Error message doesn't show

**Solutions:**

**Step 1: Check browser console (F12)**
- Look for errors
- Check Network tab for failed requests

**Step 2: Check API key is set**
- Terminal/PowerShell: `echo $GEMINI_API_KEY`
- Should show your API key, not empty

**Step 3: Check Django server is running**
- Should see requests in terminal
- If no requests logged, server not receiving them

**Step 4: Check Gemini API status**
- Visit: https://ai.google.dev/
- Check if service is up

---

## 💾 Database Issues

### Issue: "Table 'chat_chatmessage' doesn't exist"

**Symptoms:**
- Error when accessing admin panel
- "no such table: chat_chatmessage"

**Solution:**
```bash
# Run migrations to create tables
python manage.py migrate
```

---

### Issue: "Database is locked"

**Symptoms:**
- Error: "database is locked"
- Can't start migrations

**Solution:**
```bash
# Remove old database
rm db.sqlite3  # macOS/Linux
del db.sqlite3  # Windows

# Recreate it
python manage.py migrate
```

---

## 🔍 API Endpoint Issues

### Issue: POST to /api/chat/ returns 404

**Symptoms:**
- Error: "404 Not Found"
- "POST /api/chat/ HTTP/1.1" 404

**Solutions:**

1. **Check URLs are configured**
   - Verify `chatbot/urls.py` has: `path('api/chat/', include('chat.urls'))`
   - Verify `chat/urls.py` has: `path('', views.chat, name='chat')`

2. **Restart server**
```bash
# Ctrl+C to stop
# Then restart:
python manage.py runserver
```

3. **Check request URL**
   - Should be: `http://localhost:8000/api/chat/`
   - Not: `http://localhost:8000/chat/`

---

### Issue: POST returns 405 Method Not Allowed

**Symptoms:**
- Error: "405 Method Not Allowed"
- "POST /api/chat/ HTTP/1.1" 405

**Solution:**
- Check `chat/views.py` has: `@require_http_methods(["POST"])`
- Check endpoint is configured correctly

---

### Issue: API returns 500 Internal Server Error

**Symptoms:**
- Status code: 500
- Server error in response

**Solutions:**

1. **Check terminal/PowerShell for error messages**
   - Look at where you ran `runserver`
   - Copy-paste the error

2. **Enable DEBUG mode**
   - `DEBUG = True` in `settings.py` (already enabled)
   - Should show detailed error page in browser

3. **Check API key is valid**
   - Verify `GEMINI_API_KEY` is set correctly
   - Test with simpler input

---

## ⚙️ Environment & Configuration

### Issue: Settings don't take effect after editing

**Symptoms:**
- Edit settings.py
- Changes don't apply
- Still using old settings

**Solution:**
```bash
# Restart server to load new settings
# Ctrl+C in terminal
# Then:
python manage.py runserver
```

---

### Issue: Environment variable not persisting

**Symptoms:**
- Set `GEMINI_API_KEY` in terminal
- Close terminal
- Variable is gone

**Solution:**

**Windows - Set permanently:**
```powershell
# Set for current user
[Environment]::SetEnvironmentVariable("GEMINI_API_KEY", "your_key", "User")

# Restart terminal for changes to apply
```

**macOS/Linux - Add to ~/.bashrc or ~/.zshrc:**
```bash
# Add this line to ~/.bashrc or ~/.zshrc:
export GEMINI_API_KEY="your_key_here"

# Then:
source ~/.bashrc  # or source ~/.zshrc

# Or just restart terminal
```

---

## 🧪 Testing Issues

### Issue: Tests fail or don't run

**Symptoms:**
- Error when running `python manage.py test`
- Tests don't execute

**Solution:**
```bash
# Run specific test
python manage.py test chat.tests

# Run with verbose output
python manage.py test --verbosity=2

# Check syntax
python -m py_compile chat/tests.py
```

---

## 📊 Performance Issues

### Issue: API response is very slow (>10 seconds)

**Symptoms:**
- Button click takes 10+ seconds
- Loading spinner hangs
- Eventually returns response

**Possible causes:**
- Gemini API is slow (normal, 3-5 sec average)
- Network connection is slow
- Server is overloaded
- API rate limit being approached

**Solutions:**

1. **This is normal** - Gemini API takes 3-5 seconds
2. **Check internet connection** - Run speedtest
3. **Check API is not rate-limited** - Wait a minute and try again
4. **Check for errors** - Look at browser console (F12)

---

## 🛡️ Security Issues

### Issue: CORS error in browser console

**Symptoms:**
- Error: "Cross-Origin Request Blocked"
- Frontend can't connect to backend

**Solution:**
- Already configured in `settings.py`
- If persists, check:
  - `CORS_ALLOWED_ORIGINS` in settings
  - Restart server
  - Check frontend URL matches settings

---

### Issue: CSRF token error

**Symptoms:**
- Error: "CSRF verification failed"
- 403 Forbidden

**Solution:**
- Already handled in `script.js`
- Should work automatically
- Check JavaScript is loading properly

---

## 📚 Documentation Issues

### Issue: Can't find instructions for something

**Solutions:**

1. **README.md** - Complete reference (5000+ words)
2. **QUICKSTART.md** - Quick setup (5 minutes)
3. **WINDOWS_SETUP.md** - Windows-specific
4. **API_TESTING.md** - How to test API
5. **PROJECT_SUMMARY.md** - Architecture overview
6. **FILE_LISTING.md** - File descriptions

---

## 🆘 Still having issues?

### Debugging Steps

1. **Check browser console** (F12 → Console)
2. **Check server logs** (look at terminal)
3. **Check file structure** (verify all files exist)
4. **Verify API key** (echo $GEMINI_API_KEY)
5. **Restart everything** (stop server, clear cache, reload)

### Information to provide when asking for help

- Full error message (copy-paste)
- Steps to reproduce
- Operating system (Windows/macOS/Linux)
- Python version (`python --version`)
- File that's giving error
- Screenshot of issue

---

## ✅ Verification Checklist

After setup, verify:

- [ ] Python is installed and in PATH
- [ ] Virtual environment created and activated
- [ ] Dependencies installed
- [ ] API key set (echo $GEMINI_API_KEY shows it)
- [ ] Migrations run (no database errors)
- [ ] Server starts without errors
- [ ] Browser shows chat interface
- [ ] Can enter text and send
- [ ] Loading spinner appears
- [ ] Response comes back
- [ ] No red errors in console (F12)

---

## 🎉 Common Solutions Summary

| Issue | Quick Fix |
|-------|-----------|
| Module not found | `pip install -r requirements.txt` |
| API key error | `export GEMINI_API_KEY="your_key"` |
| Port in use | `python manage.py runserver 8001` |
| CSS not loading | `python manage.py collectstatic` |
| Database error | `python manage.py migrate` |
| Can't send message | Check console (F12), restart server |
| Slow response | Normal (3-5 sec), check internet |

---

**Still stuck? Check the full documentation in README.md or ask for help with the above information! 🚀**
