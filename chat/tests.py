"""
Tests for chat app.
"""
from django.test import TestCase, Client
from django.urls import reverse
import json


class ChatAPITestCase(TestCase):
    """Test cases for chat API"""
    
    def setUp(self):
        """Set up test client"""
        self.client = Client()
        self.chat_url = '/api/chat/'
    
    def test_chat_endpoint_post_required(self):
        """Test that GET request is not allowed"""
        response = self.client.get(self.chat_url)
        self.assertEqual(response.status_code, 405)
    
    def test_chat_missing_message(self):
        """Test that missing message returns error"""
        response = self.client.post(
            self.chat_url,
            data=json.dumps({}),
            content_type='application/json'
        )
        self.assertEqual(response.status_code, 400)
        data = json.loads(response.content)
        self.assertFalse(data['success'])
    
    def test_chat_empty_message(self):
        """Test that empty message returns error"""
        response = self.client.post(
            self.chat_url,
            data=json.dumps({'message': ''}),
            content_type='application/json'
        )
        self.assertEqual(response.status_code, 400)
        data = json.loads(response.content)
        self.assertFalse(data['success'])
