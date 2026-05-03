# 📁 File Listing & Description

Complete reference of all files created in the project.

---

## 📋 Root Directory Files

### Configuration & Management
- **manage.py** - Django management command entry point. Run all Django commands with this.
- **requirements.txt** - Python package dependencies. Install with: `pip install -r requirements.txt`
- **.env.example** - Template for environment variables. Copy to `.env` and fill in values.
- **.gitignore** - Version control ignore rules for Git.

### Documentation Files
- **README.md** - 📖 MAIN DOCUMENTATION. Start here for complete guide (5000+ words)
- **QUICKSTART.md** - ⚡ Get running in 5 minutes. Quick overview and setup.
- **WINDOWS_SETUP.md** - 🪟 Windows-specific step-by-step installation guide.
- **API_TESTING.md** - 🧪 How to test the API with Postman, cURL, Python, JavaScript.
- **PROJECT_SUMMARY.md** - 📦 This project's architecture and features summary.
- **FILE_LISTING.md** - 📁 You are here! Reference of all files.

---

## 🔧 Django Configuration Directory (chatbot/)

### Core Configuration Files

**settings.py** (Main configuration file)
- Django settings for the project
- Database configuration (SQLite)
- Installed apps (Django built-in + third-party)
- Middleware configuration
- Template and static files paths
- **IMPORTANT:** Gemini API key configuration here
- CORS settings for frontend-backend communication
- 150+ lines of configuration

**urls.py** (Main URL router)
- Root URL routing
- Admin panel route
- Chat API route
- Static files serving setup
- 20+ lines

**asgi.py** (ASGI application)
- Async Server Gateway Interface config
- Used for async applications
- Production deployment setup
- 10 lines

**wsgi.py** (WSGI application)
- Web Server Gateway Interface config
- Standard production server interface
- 10 lines

**__init__.py** (Package marker)
- Empty file marking directory as Python package
- 0 lines

---

## 💬 Chat Application Directory (chat/)

### Core Application Files

**views.py** ⭐ (Backend API Logic - MOST IMPORTANT)
- `chat()` function - Main API endpoint handler
- **POST /api/chat/** request handling
- **Gemini API integration** with google-generativeai library
- Input validation (non-empty, max 1000 chars)
- Error handling and logging
- Response formatting
- 150+ lines with comprehensive comments

**urls.py** (Chat app routing)
- Maps URL paths to view functions
- Defines app namespace
- Chat endpoint URL pattern
- 15 lines

**models.py** (Database models)
- `ChatMessage` model for storing conversations
- Fields: user_message, bot_response, created_at
- Admin-friendly meta configuration
- Optional - not required for basic operation
- 25 lines

**admin.py** (Django admin configuration)
- Registers ChatMessage in Django admin
- Custom display with message preview
- Search and filter capabilities
- 20 lines

**apps.py** (App configuration)
- App metadata
- Auto field configuration
- 10 lines

**tests.py** (Unit tests)
- `ChatAPITestCase` test class
- Tests for missing message, empty message, wrong HTTP method
- 35 lines

**__init__.py** (Package marker)
- Empty file
- 0 lines

**migrations/__init__.py** (Package marker for migrations)
- Empty file
- 0 lines

---

## 🎨 Frontend Directory (templates/)

### HTML Template

**templates/index.html** ⭐ (Chat Interface - MOST IMPORTANT)
- Single-page HTML application
- Semantic HTML5 structure
- Bootstrap-free (pure CSS styling)
- Includes:
  - Header with title and subtitle
  - Chat messages container with message display area
  - Input form with text field and send button
  - Loading indicator (hidden by default)
  - Error message display (hidden by default)
  - Character count display
  - Links to CSS and JavaScript files
- 100+ lines with clean structure

---

## 🎨 Static Files Directory (static/)

### CSS Styling

**static/css/style.css** ⭐ (Complete Styling - MOST IMPORTANT)
- Modern, responsive CSS
- CSS Variables (custom properties) for theming
- Purple gradient theme
- Animations and transitions
- Mobile-first responsive design
- Includes:
  - Root color variables
  - Body and container styles
  - Header styling with gradient
  - Chat container layout
  - Message styling (user vs bot)
  - Input area with focus states
  - Loading spinner animation
  - Error message styling
  - Responsive breakpoints (mobile, tablet, desktop)
- 400+ lines of well-organized CSS

### JavaScript Frontend Logic

**static/js/script.js** ⭐ (Frontend Logic - MOST IMPORTANT)
- Vanilla JavaScript (no frameworks)
- DOM element references
- Event listeners:
  - Form submission handling
  - Character count updating
  - Button states
- Async/await for API calls
- Fetch API for backend communication
- CSRF token extraction from cookies
- Message formatting for display
- Loading and error state management
- Auto-scroll to latest message
- Includes:
  - `addMessage()` - Add message to chat
  - `sendMessageToServer()` - API communication
  - `formatBotResponse()` - Format AI response
  - `getCsrfToken()` - Security token handling
  - `showError()` - Error display
  - `scrollToBottom()` - Auto-scroll
- 250+ lines with inline comments

---

## 📊 Database

**db.sqlite3** (Auto-generated)
- SQLite database file
- Created after running `python manage.py migrate`
- Stores ChatMessage records (if used)
- Contains Django built-in tables (users, permissions, etc.)

---

## 📁 Directory Structure Summary

```
interview-chatbot/
├── Configuration & Setup
│   ├── manage.py
│   ├── requirements.txt
│   ├── .env.example
│   └── .gitignore
│
├── Documentation
│   ├── README.md (5000+ words)
│   ├── QUICKSTART.md
│   ├── WINDOWS_SETUP.md
│   ├── API_TESTING.md
│   ├── PROJECT_SUMMARY.md
│   └── FILE_LISTING.md (this file)
│
├── Backend - Django
│   ├── chatbot/ (main project)
│   │   ├── settings.py
│   │   ├── urls.py
│   │   ├── asgi.py
│   │   ├── wsgi.py
│   │   └── __init__.py
│   │
│   └── chat/ (app)
│       ├── views.py (Gemini API integration)
│       ├── models.py
│       ├── urls.py
│       ├── admin.py
│       ├── apps.py
│       ├── tests.py
│       ├── __init__.py
│       └── migrations/
│           └── __init__.py
│
└── Frontend - HTML/CSS/JS
    ├── templates/
    │   └── index.html
    └── static/
        ├── css/
        │   └── style.css
        └── js/
            └── script.js
```

---

## 🎯 File Priority & Reading Order

### 🔴 CRITICAL (Must Read)
1. **README.md** - Complete documentation
2. **settings.py** - API key configuration
3. **views.py** - Gemini integration logic

### 🟡 IMPORTANT (Should Read)
4. **index.html** - Frontend structure
5. **style.css** - UI styling
6. **script.js** - Client logic

### 🟢 OPTIONAL (Reference)
7. Other configuration files
8. Test files
9. Admin configuration

---

## 📝 File Statistics

| Component | Files | Total Lines |
|-----------|-------|-------------|
| Documentation | 6 | 3000+ |
| Django Config | 5 | 400+ |
| Chat App | 6 | 500+ |
| Frontend | 3 | 800+ |
| **TOTAL** | **20+** | **4700+** |

---

## 🔑 Key Files Explained

### For API Integration
- **views.py** - Contains the Gemini API integration code
- **settings.py** - Configure API key here
- **urls.py** - Maps URL to the view function

### For Frontend
- **index.html** - Main chat interface
- **style.css** - All styling and layout
- **script.js** - User interaction and API calls

### For Configuration
- **settings.py** - Django settings
- **requirements.txt** - Python dependencies
- **.env.example** - Environment template

### For Testing
- **API_TESTING.md** - How to test endpoints
- **tests.py** - Automated tests

---

## 🚀 How to Use Files

### To Start the Project
1. Read: `README.md` or `QUICKSTART.md`
2. Edit: `.env` (or settings.py)
3. Run: `python manage.py runserver`
4. Open: `templates/index.html` (served at localhost:8000)

### To Understand the Architecture
1. Read: `PROJECT_SUMMARY.md`
2. Check: `chatbot/urls.py` (routing)
3. Review: `chat/views.py` (logic)
4. Study: `static/js/script.js` (frontend)

### To Modify Behavior
1. **Change AI responses**: Edit `chat/views.py` (search for `system_prompt`)
2. **Change UI styling**: Edit `static/css/style.css`
3. **Change frontend behavior**: Edit `static/js/script.js`
4. **Change API key**: Edit `chatbot/settings.py` or set environment variable

### To Deploy
1. Read: `README.md` (Production section)
2. Update: `chatbot/settings.py` (DEBUG, SECRET_KEY, ALLOWED_HOSTS)
3. Collect: `python manage.py collectstatic`
4. Deploy: Use Gunicorn, Nginx, etc.

### To Test
1. Read: `API_TESTING.md`
2. Use: Postman, cURL, Python, or JavaScript
3. Run: `python manage.py test`

---

## 📦 Dependencies Explained

From `requirements.txt`:

| Package | Purpose |
|---------|---------|
| Django | Web framework |
| djangorestframework | REST API utilities |
| django-cors-headers | Enable CORS |
| google-generativeai | Gemini API SDK |
| requests | HTTP library |
| python-decouple | Environment config |

---

## 🎓 Learning Path

1. **Beginner**: Read README.md → Run project → Modify CSS
2. **Intermediate**: Understand views.py → Test API → Add logging
3. **Advanced**: Deploy → Add authentication → Scale application

---

## ✅ Verification Checklist

After cloning/downloading, verify you have:

- [ ] manage.py
- [ ] requirements.txt
- [ ] README.md (and other docs)
- [ ] chatbot/ directory with 5 Python files
- [ ] chat/ directory with 7 Python files
- [ ] templates/index.html
- [ ] static/css/style.css
- [ ] static/js/script.js

Total: 20+ files as described above

---

## 🔗 File Relationships

```
manage.py
    ↓
chatbot/settings.py (imports installed apps)
    ↓
    ├→ chat/apps.py
    ├→ chat/models.py
    ├→ chat/admin.py
    ├→ chat/views.py (★ Gemini API here)
    └→ chat/urls.py
         ↓
    chatbot/urls.py (includes chat.urls)
         ↓
    templates/index.html
         ↓
    static/js/script.js (calls API at chat/views.py)
    static/css/style.css (styles HTML)
```

---

## 🎉 You're All Set!

You now have a complete reference of all project files and their purposes.

**Next Steps:**
1. Start with QUICKSTART.md or WINDOWS_SETUP.md
2. Get your Gemini API key
3. Run `pip install -r requirements.txt`
4. Set your API key
5. Run `python manage.py runserver`
6. Open http://localhost:8000
7. Start asking interview questions!

---

**Happy Coding! 🚀**
