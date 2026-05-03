# API Testing Guide

Test the Interview Generator API using different tools.

---

## 🧪 Using Postman (Recommended)

### Setup

1. Download and install [Postman](https://www.postman.com/downloads/)
2. Open Postman
3. Create new request

### Configuration

**Request Details:**
- **Method:** POST
- **URL:** `http://localhost:8000/api/chat/`
- **Headers:**
  - Key: `Content-Type`
  - Value: `application/json`

**Body (raw JSON):**
```json
{
    "message": "JavaScript promises"
}
```

### Example Requests

**Request 1: Python decorators**
```json
{
    "message": "Python decorators"
}
```

**Request 2: SQL joins**
```json
{
    "message": "SQL joins and database design"
}
```

**Request 3: React hooks**
```json
{
    "message": "React hooks and state management"
}
```

### Expected Response

```json
{
    "success": true,
    "response": "**Question 1:** What are decorators in Python?\n**Answer:** Decorators are functions...",
    "error": null
}
```

---

## 💻 Using cURL (Command Line)

### Basic Request

```bash
curl -X POST http://localhost:8000/api/chat/ \
  -H "Content-Type: application/json" \
  -d '{"message": "Python decorators"}'
```

### Windows PowerShell

```powershell
$headers = @{"Content-Type" = "application/json"}
$body = @{"message" = "Python decorators"} | ConvertTo-Json
Invoke-WebRequest -Uri "http://localhost:8000/api/chat/" `
  -Method POST `
  -Headers $headers `
  -Body $body
```

### Save to File

```bash
curl -X POST http://localhost:8000/api/chat/ \
  -H "Content-Type: application/json" \
  -d '{"message": "JavaScript promises"}' > response.json
```

---

## 🐍 Using Python (requests library)

### Simple Script

```python
import requests
import json

url = "http://localhost:8000/api/chat/"
headers = {"Content-Type": "application/json"}
payload = {"message": "Python decorators"}

response = requests.post(url, json=payload, headers=headers)
data = response.json()

print("Status Code:", response.status_code)
print("Response:")
print(json.dumps(data, indent=2))
```

### Pretty Print Response

```python
import requests
import pprint

url = "http://localhost:8000/api/chat/"
response = requests.post(url, json={"message": "Python decorators"})

pprint.pprint(response.json())
```

### Handle Errors

```python
import requests

try:
    response = requests.post(
        "http://localhost:8000/api/chat/",
        json={"message": "Python decorators"},
        timeout=30
    )
    response.raise_for_status()  # Raise error for bad status
    print(response.json())
except requests.exceptions.RequestException as e:
    print(f"Error: {e}")
```

---

## 🟦 Using JavaScript (Fetch API)

### Simple Example

```javascript
const message = "Python decorators";

fetch('http://localhost:8000/api/chat/', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({ message: message })
})
.then(response => response.json())
.then(data => {
    console.log('Success:', data);
    console.log('Response:', data.response);
})
.catch(error => {
    console.error('Error:', error);
});
```

### Using async/await

```javascript
async function sendQuery(message) {
    try {
        const response = await fetch('http://localhost:8000/api/chat/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message })
        });
        
        const data = await response.json();
        
        if (data.success) {
            console.log('Response:', data.response);
        } else {
            console.error('Error:', data.error);
        }
    } catch (error) {
        console.error('Network error:', error);
    }
}

// Usage
sendQuery('Python decorators');
```

---

## 🔄 Using Insomnia

Similar to Postman:

1. Create new POST request
2. URL: `http://localhost:8000/api/chat/`
3. Body (JSON):
```json
{
    "message": "Python decorators"
}
```
4. Click Send

---

## 📊 Request/Response Examples

### Example 1: JavaScript Promises

**Request:**
```json
{
    "message": "JavaScript promises"
}
```

**Response:**
```json
{
    "success": true,
    "response": "**Question 1: What are JavaScript Promises?**\n**Answer:** Promises are objects representing the eventual completion or failure of an asynchronous operation...\n**Key Points:**\n- Pending, Fulfilled, Rejected states\n- .then(), .catch(), .finally()\n**Example:** Promise.resolve(42).then(val => console.log(val))",
    "error": null
}
```

### Example 2: Error - Empty Message

**Request:**
```json
{
    "message": ""
}
```

**Response (400):**
```json
{
    "success": false,
    "response": "",
    "error": "Please provide a valid message."
}
```

### Example 3: Error - Message Too Long

**Request:**
```json
{
    "message": "very long text... (over 1000 chars)"
}
```

**Response (400):**
```json
{
    "success": false,
    "response": "",
    "error": "Message is too long. Please keep it under 1000 characters."
}
```

### Example 4: API Error

**Response (500):**
```json
{
    "success": false,
    "response": "",
    "error": "Error generating response: API error details"
}
```

---

## ⏱️ Performance Testing

### Load Test with Apache Bench

```bash
# Install (macOS): brew install httpd
# Install (Windows): choco install apache-httpd

ab -n 100 -c 10 -p data.json \
   -T application/json \
   http://localhost:8000/api/chat/
```

Where `data.json` contains:
```json
{"message": "Python decorators"}
```

---

## 🔍 Debugging

### Enable Django Debug

The server is in DEBUG mode by default. You'll see:
- Detailed error messages
- Exception stack traces
- Query logs

### Check Server Logs

Look at terminal/PowerShell where server is running:

```
[12/May/2026 10:30:00] "POST /api/chat/ HTTP/1.1" 200 1024
[12/May/2026 10:30:15] "POST /api/chat/ HTTP/1.1" 400 256
```

- `200` = Success
- `400` = Bad request
- `500` = Server error

---

## 📈 Test Scenarios

### Scenario 1: Basic Usage
1. Send: `"Python decorators"`
2. Expect: `success: true` with full response

### Scenario 2: Input Validation
1. Send: `""`
2. Expect: `success: false` with error message

### Scenario 3: Long Input
1. Send: Text > 1000 characters
2. Expect: `success: false` with error

### Scenario 4: Missing Field
1. Send: `{}`
2. Expect: `success: false` with error

### Scenario 5: Invalid JSON
1. Send: `{invalid json}`
2. Expect: `success: false` or 400 error

---

## 🚀 Integration Testing

### Test Multiple Topics

```python
topics = [
    "Python decorators",
    "JavaScript promises",
    "SQL joins",
    "React hooks",
    "System design",
    "Git workflow"
]

for topic in topics:
    response = requests.post(
        "http://localhost:8000/api/chat/",
        json={"message": topic}
    )
    print(f"Topic: {topic}")
    print(f"Success: {response.json()['success']}")
    print("---")
```

---

## 💾 Save Responses

### Python

```python
import requests
import json

response = requests.post(
    "http://localhost:8000/api/chat/",
    json={"message": "Python decorators"}
)

# Save to file
with open('response.json', 'w') as f:
    json.dump(response.json(), f, indent=2)
```

### bash/PowerShell

```bash
# Save response
curl -X POST http://localhost:8000/api/chat/ \
  -H "Content-Type: application/json" \
  -d '{"message": "Python decorators"}' > response.json

# View response
cat response.json  # Linux/macOS
type response.json  # Windows
```

---

## ✅ Checklist

- [ ] Test with Postman/Insomnia
- [ ] Test with cURL
- [ ] Test with Python
- [ ] Test error cases
- [ ] Verify response format
- [ ] Check response time
- [ ] Test multiple topics
- [ ] Save sample responses

---

**Happy testing! 🧪**
