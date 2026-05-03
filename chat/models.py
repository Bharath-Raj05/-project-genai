"""
Models for chat app.
"""
from django.db import models


class ChatMessage(models.Model):
    """
    Model to store chat messages (optional for future enhancements)
    """
    user_message = models.TextField()
    bot_response = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        ordering = ['-created_at']
    
    def __str__(self):
        return f"Chat at {self.created_at}"
