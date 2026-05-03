import sys
import os

# Make the project root importable
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'chatbot.settings')

from django.core.wsgi import get_wsgi_application

app = get_wsgi_application()
