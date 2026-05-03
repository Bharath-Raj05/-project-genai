"""
Admin configuration for chat app.
"""
from django.contrib import admin
from .models import ChatMessage


@admin.register(ChatMessage)
class ChatMessageAdmin(admin.ModelAdmin):
    list_display = ('created_at', 'user_message_preview')
    list_filter = ('created_at',)
    search_fields = ('user_message', 'bot_response')
    readonly_fields = ('created_at',)
    
    def user_message_preview(self, obj):
        """Display preview of user message"""
        return obj.user_message[:100] + '...' if len(obj.user_message) > 100 else obj.user_message
    user_message_preview.short_description = 'User Message'
