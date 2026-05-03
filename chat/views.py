import json
import logging
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
from django.views.decorators.csrf import csrf_exempt
from django.conf import settings
from google import genai

logger = logging.getLogger(__name__)


@csrf_exempt
@require_http_methods(["POST"])
def chat(request):
    try:
        data = json.loads(request.body)
        user_message = data.get("message", "").strip()

        if not user_message:
            return JsonResponse({
                "success": False,
                "response": "",
                "error": "Please provide a valid message."
            }, status=400)

        if len(user_message) > 1000:
            return JsonResponse({
                "success": False,
                "response": "",
                "error": "Message too long."
            }, status=400)

        system_prompt = """You are an expert interview preparation assistant.
Generate structured interview Q&A."""

        full_prompt = f"{system_prompt}\n\nTopic: {user_message}"

        # ✅ NEW SDK USAGE (NO configure, NO GenerativeModel)
        client = genai.Client(api_key=settings.GEMINI_API_KEY)

        response = client.models.generate_content(
            model=settings.GEMINI_MODEL,
            contents=full_prompt
        )

        bot_response = response.text

        return JsonResponse({
            "success": True,
            "response": bot_response,
            "error": None
        })

    except json.JSONDecodeError:
        return JsonResponse({
            "success": False,
            "response": "",
            "error": "Invalid JSON"
        }, status=400)

    except Exception as e:
        return JsonResponse({
            "success": False,
            "response": "",
            "error": str(e)
        }, status=500)