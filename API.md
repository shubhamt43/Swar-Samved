# Swar-Samved API Documentation

## Base URL

**Local Development:**
```
http://localhost:8000
```

**Production:**
```
https://your-api-domain.com
```

## Health Check

### GET /health

Check if the backend is running and healthy.

**Request:**
```bash
curl http://localhost:8000/health
```

**Response:**
```json
{
  "status": "healthy",
  "service": "AI Music Tutor"
}
```

**Status Code:** 200 OK

---

## Analyze Audio

### POST /analyze

Analyze a single audio file and extract pitch, rhythm, and spectrogram data.

**Endpoint:**
```
POST /analyze
```

**Request:**
```bash
curl -X POST \
  -H "Content-Type: multipart/form-data" \
  -F "file=@reference.mp3" \
  http://localhost:8000/analyze
```

**Request Parameters:**
| Name | Type | Required | Description |
|------|------|----------|-------------|
| file | File | Yes | Audio file (MP3, WAV, OGG, FLAC) |

**Response Success (200 OK):**
```json
{
  "success": true,
  "analysis": {
    "pitch": [0, 0, 82.4, 85.2, 87.1, ...],
    "times": [0.0, 0.023, 0.046, 0.069, 0.092, ...],
    "spectrogram": [
      [-80, -75, -70, -65, ...],
      [-78, -73, -68, -63, ...],
      ...
    ],
    "frequencies": [0, 21.5, 43, 64.5, 86, ...],
    "spec_times": [0.0, 0.023, 0.046, 0.069, ...],
    "rhythm": {
      "onset_times": [0.05, 0.45, 0.85, 1.25, ...],
      "onset_count": 8,
      "tempo_estimate": 120.5,
      "onset_regularity": 0.92
    },
    "loudness": -25.3,
    "duration": 2.45
  },
  "sample_rate": 22050
}
```

**Response Error (400 Bad Request):**
```json
{
  "success": false,
  "error": "Failed to load audio: Invalid audio format"
}
```

**Field Descriptions:**
- `pitch`: Array of detected pitch values in Hz (0 = unvoiced)
- `times`: Time stamps corresponding to each pitch frame (seconds)
- `spectrogram`: 2D array of frequency magnitudes (in dB)
- `frequencies`: Array of frequency bins (Hz)
- `spec_times`: Time stamps for spectrogram frames (seconds)
- `rhythm.onset_times`: Detected note onset times (seconds)
- `rhythm.onset_count`: Number of detected onsets
- `rhythm.tempo_estimate`: Estimated tempo (BPM)
- `rhythm.onset_regularity`: Timing consistency (0-1)
- `loudness`: Average loudness (dB)
- `duration`: Audio duration (seconds)
- `sample_rate`: Sample rate used for analysis (Hz)

**Example JavaScript Client:**
```javascript
async function analyzeAudio(audioFile) {
  const formData = new FormData();
  formData.append('file', audioFile);

  const response = await fetch('/analyze', {
    method: 'POST',
    body: formData
  });

  const data = await response.json();
  if (data.success) {
    console.log('Analysis:', data.analysis);
    return data.analysis;
  } else {
    console.error('Error:', data.error);
  }
}
```

---

## Compare Audio

### POST /compare

Compare test audio against reference audio and return comparative feedback.

**Endpoint:**
```
POST /compare
```

**Request:**
```bash
curl -X POST \
  -H "Content-Type: multipart/form-data" \
  -F "test_file=@my_recording.webm" \
  -F "reference_file=@reference.mp3" \
  http://localhost:8000/compare
```

**Request Parameters:**
| Name | Type | Required | Description |
|------|------|----------|-------------|
| test_file | File | Yes | User's recorded audio (WebM, MP3, WAV, OGG, FLAC) |
| reference_file | File | Yes | Reference audio to compare against |

**Response Success (200 OK):**
```json
{
  "success": true,
  "test_analysis": {
    "pitch": [...],
    "times": [...],
    "spectrogram": [...],
    "frequencies": [...],
    "spec_times": [...],
    "rhythm": {
      "onset_times": [0.1, 0.5, 0.9, 1.3, ...],
      "onset_count": 8,
      "tempo_estimate": 118.2,
      "onset_regularity": 0.88
    },
    "loudness": -24.5,
    "duration": 2.5
  },
  "reference_analysis": {
    "pitch": [...],
    "times": [...],
    "spectrogram": [...],
    "frequencies": [...],
    "spec_times": [...],
    "rhythm": {
      "onset_times": [0.0, 0.4, 0.8, 1.2, ...],
      "onset_count": 8,
      "tempo_estimate": 120.0,
      "onset_regularity": 0.95
    },
    "loudness": -23.8,
    "duration": 2.45
  },
  "comparison": {
    "pitch_feedback": {
      "accuracy": 82.3,
      "mean_error_cents": -15.5,
      "range_match": 91.2
    },
    "rhythm_feedback": {
      "tempo_accuracy": 98.5,
      "regularity": 88.0,
      "reference_tempo": 120.0,
      "your_tempo": 118.2
    },
    "overall_score": 85.2
  }
}
```

**Response Error (400 Bad Request):**
```json
{
  "success": false,
  "error": "Failed to load audio: Maximum file size exceeded"
}
```

**Response Field Descriptions:**

**pitch_feedback:**
- `accuracy`: Pitch matching accuracy (0-100%)
  - 0% = completely different pitch
  - 50% = 1 semitone average error
  - 100% = perfect pitch match
- `mean_error_cents`: Average pitch deviation in cents
  - Negative = singing too low
  - Positive = singing too high
  - 100 cents = 1 semitone
- `range_match`: How well your pitch range covers the reference (0-100%)

**rhythm_feedback:**
- `tempo_accuracy`: How well your tempo matches reference (0-100%)
- `regularity`: Timing consistency (0-100%)
  - Measures how consistent your note onsets are
- `reference_tempo`: Reference audio tempo (BPM)
- `your_tempo`: Your recorded tempo (BPM)

**overall_score:** Combined metric of pitch and rhythm accuracy (0-100%)

**Example JavaScript Client:**
```javascript
async function compareAudio(testFile, referenceFile) {
  const formData = new FormData();
  formData.append('test_file', testFile);
  formData.append('reference_file', referenceFile);

  const response = await fetch('/compare', {
    method: 'POST',
    body: formData
  });

  const data = await response.json();
  
  if (data.success) {
    console.log('Comparison Results:', {
      pitchAccuracy: data.comparison.pitch_feedback.accuracy,
      rhythmAccuracy: data.comparison.rhythm_feedback.regularity,
      overallScore: data.comparison.overall_score
    });
    return data.comparison;
  } else {
    console.error('Error:', data.error);
  }
}
```

---

## Simple Analysis

### POST /analyze-simple

Lightweight analysis endpoint that returns minimal data for faster response times.

**Endpoint:**
```
POST /analyze-simple
```

**Request:**
```bash
curl -X POST \
  -H "Content-Type: multipart/form-data" \
  -F "file=@audio.mp3" \
  http://localhost:8000/analyze-simple
```

**Response Success (200 OK):**
```json
{
  "success": true,
  "pitch": [82.4, 85.2, 87.1, 89.0, ...],
  "times": [0.0, 0.023, 0.046, 0.069, ...],
  "spectrogram": [
    [-80, -75, -70, -65, ...],
    [-78, -73, -68, -63, ...],
    ...
  ],
  "frequencies": [0, 21.5, 43, 64.5, 86, ...],
  "duration": 2.45
}
```

**Use Case:** When you only need pitch and spectrogram data without detailed rhythm analysis.

---

## Error Handling

### Common Error Responses

**Invalid File Format (400):**
```json
{
  "success": false,
  "error": "Failed to load audio: Invalid audio format"
}
```

**File Too Large (400):**
```json
{
  "success": false,
  "error": "Failed to load audio: File size exceeds maximum"
}
```

**Server Error (500):**
```json
{
  "success": false,
  "error": "Internal server error: [error details]"
}
```

### Handling Errors in JavaScript

```javascript
async function analyzeWithErrorHandling(file) {
  try {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch('http://localhost:8000/analyze', {
      method: 'POST',
      body: formData
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    if (!data.success) {
      throw new Error(data.error || 'Unknown error occurred');
    }

    return data.analysis;

  } catch (error) {
    console.error('Analysis failed:', error.message);
    // Show user-friendly error message
    return null;
  }
}
```

---

## Rate Limiting

Currently, there is no built-in rate limiting. For production deployments, implement:

```python
# Add to main.py
from slowapi import Limiter
from slowapi.util import get_remote_address

limiter = Limiter(key_func=get_remote_address)
app.state.limiter = limiter

@app.post("/compare")
@limiter.limit("10/minute")  # 10 requests per minute
async def compare_audio(...):
    ...
```

---

## CORS Configuration

The API accepts requests from all origins. For production, restrict CORS:

```python
# In main.py
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://your-domain.com",
        "https://www.your-domain.com"
    ],
    allow_credentials=True,
    allow_methods=["POST", "GET"],
    allow_headers=["*"],
)
```

---

## Timeout Configuration

Backend processing times:
- Simple audio (< 10 seconds): 2-5 seconds
- Complex audio: 5-15 seconds
- Comparison: 10-20 seconds

Recommend client timeout: **30 seconds**

```javascript
const response = await fetch('/compare', {
  method: 'POST',
  body: formData,
  signal: AbortSignal.timeout(30000) // 30 second timeout
});
```

---

## File Format Support

| Format | Codec | Extension | Quality |
|--------|-------|-----------|---------|
| MP3 | MPEG-1 Layer III | .mp3 | Good |
| WAV | PCM | .wav | Excellent |
| OGG | Vorbis | .ogg | Very Good |
| FLAC | FLAC | .flac | Lossless |
| WebM | Opus | .webm | Good |

**Recommended:** WAV or FLAC for best analysis quality

---

## Performance Tips

1. **Compress before upload**: Use MP3 or OGG to reduce file size
2. **Batch requests**: Don't send many simultaneous requests
3. **Reuse analysis results**: Cache results for identical files
4. **Monitor response times**: Implement timeout handling

---

## Testing with cURL

### Test Health Check
```bash
curl http://localhost:8000/health
```

### Test Analysis
```bash
curl -X POST \
  -H "Content-Type: multipart/form-data" \
  -F "file=@test-audio.mp3" \
  http://localhost:8000/analyze | jq
```

### Test Comparison
```bash
curl -X POST \
  -H "Content-Type: multipart/form-data" \
  -F "test_file=@user-recording.webm" \
  -F "reference_file=@reference.mp3" \
  http://localhost:8000/compare | jq
```

---

## Integration Examples

### Python
```python
import requests

def analyze_audio(file_path):
    with open(file_path, 'rb') as f:
        files = {'file': f}
        response = requests.post(
            'http://localhost:8000/analyze',
            files=files
        )
    return response.json()

# Usage
result = analyze_audio('song.mp3')
print(f"Pitch accuracy: {result['analysis']['pitch']}")
```

### JavaScript/Node.js
```javascript
const fs = require('fs');
const FormData = require('form-data');
const axios = require('axios');

async function analyzeAudio(filePath) {
  const form = new FormData();
  form.append('file', fs.createReadStream(filePath));

  const response = await axios.post(
    'http://localhost:8000/analyze',
    form,
    { headers: form.getHeaders() }
  );
  
  return response.data;
}

// Usage
analyzeAudio('song.mp3').then(data => {
  console.log('Analysis result:', data);
});
```

---

## Webhooks (Future)

Webhooks for async processing (planned feature):

```python
# Future endpoint
@app.post("/analyze-async")
async def analyze_async(file: UploadFile, webhook_url: str):
    """
    Analyze audio asynchronously and POST results to webhook_url
    """
    job_id = generate_job_id()
    # Process in background task
    return {"job_id": job_id, "status": "queued"}
```

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | 2025-03-15 | Initial release |

---

Last Updated: March 2025
