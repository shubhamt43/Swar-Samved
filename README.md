# Swar-Samved: AI Music Tutor

An AI-powered vocal training platform that provides real-time feedback on pitch, rhythm, and tone. The system analyzes your vocal performance and compares it against reference audio to deliver instant, personalized coaching.

## Features

- **Real-Time Vocal Analysis**: Pitch detection, rhythm extraction, and tone analysis using advanced audio processing
- **Spectrogram Visualization**: Visual representation of frequency content with pitch contour overlay
- **Comparative Feedback**: Compare your performance against reference audio
- **Instant Metrics**: Get instant feedback on:
  - Pitch accuracy and mean error (in cents)
  - Rhythm regularity and tempo matching
  - Range coverage
  - Overall performance score
- **Mobile Responsive**: Works on desktop, tablet, and mobile devices
- **No User Accounts Required**: Stateless architecture - instant analysis without sign-up

## Tech Stack

### Frontend
- **React 18** with TypeScript
- **Next.js 15** (App Router)
- **Tailwind CSS** for styling
- **Web Audio API** for microphone recording
- **Canvas API** for spectrogram visualization
- Vanilla JavaScript (no external audio libraries required)

### Backend
- **Python 3.10+**
- **FastAPI** for REST API
- **Librosa** for audio feature extraction
- **NumPy/SciPy** for signal processing
- **PYIN Algorithm** for robust pitch detection

## Project Structure

```
.
├── app/
│   ├── page.tsx              # Main application page
│   ├── layout.tsx            # Root layout with metadata
│   └── globals.css           # Global styles
├── components/
│   ├── AudioRecorder.tsx     # Microphone recording interface
│   ├── ReferenceUpload.tsx   # Audio file upload for reference
│   ├── SpectrogramDisplay.tsx # Canvas-based spectrogram visualization
│   ├── FeedbackDisplay.tsx   # Comparative feedback metrics
│   └── ControlPanel.tsx      # Session control buttons
├── backend/
│   ├── main.py              # FastAPI application
│   ├── audio_analyzer.py    # Audio feature extraction logic
│   └── pyproject.toml       # Python project configuration
└── scripts/
    └── run_backend.sh       # Backend startup script
```

## Installation & Setup

### Prerequisites
- Node.js 18+ and pnpm
- Python 3.10+

### Frontend Setup

1. Install dependencies:
```bash
pnpm install
```

2. Run the development server:
```bash
pnpm dev
```

The frontend will be available at `http://localhost:3000`

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Initialize Python project and install dependencies:
```bash
uv init --bare .
uv add fastapi==0.104.1 uvicorn==0.24.0 python-multipart==0.0.6 librosa==0.10.0 numpy==1.24.3 scipy==1.11.4 pydantic==2.5.0
```

Or use the convenient script:
```bash
bash scripts/run_backend.sh
```

3. Start the FastAPI server:
```bash
uv run main.py
```

The backend API will be available at `http://localhost:8000`

## Usage

1. **Upload Reference Audio**: Select or drag-and-drop an MP3, WAV, OGG, or FLAC file that you want to learn from
2. **Record Your Performance**: Click the Record button and sing/perform the same piece
3. **Get Instant Feedback**: The system analyzes both recordings and provides:
   - Side-by-side spectrograms with pitch contours
   - Pitch accuracy metrics
   - Rhythm analysis with tempo comparison
   - Overall performance score
   - Personalized recommendations for improvement

## API Endpoints

### `/analyze` (POST)
Analyze a single audio file and extract pitch, rhythm, and spectrogram data.

**Request:**
```
Content-Type: multipart/form-data
file: <audio_file>
```

**Response:**
```json
{
  "success": true,
  "analysis": {
    "pitch": [float, ...],
    "times": [float, ...],
    "spectrogram": [[float, ...], ...],
    "frequencies": [float, ...],
    "rhythm": {...},
    "duration": float
  },
  "sample_rate": int
}
```

### `/compare` (POST)
Compare test audio against reference audio and return comparative feedback.

**Request:**
```
Content-Type: multipart/form-data
test_file: <user_recording>
reference_file: <reference_audio>
```

**Response:**
```json
{
  "success": true,
  "test_analysis": {...},
  "reference_analysis": {...},
  "comparison": {
    "pitch_feedback": {
      "accuracy": float,
      "mean_error_cents": float,
      "range_match": float
    },
    "rhythm_feedback": {
      "tempo_accuracy": float,
      "regularity": float,
      "reference_tempo": float,
      "your_tempo": float
    },
    "overall_score": float
  }
}
```

## Audio Processing Pipeline

1. **Audio Loading**: Converts uploaded audio to mono waveform at 22050 Hz
2. **Pitch Detection**: Uses PYIN (Probabilistic YIN) algorithm for robust pitch contour extraction
3. **Spectrogram Generation**: Computes STFT (Short-Time Fourier Transform) for frequency visualization
4. **Onset Detection**: Identifies note onsets for rhythm analysis
5. **Feature Comparison**: Calculates metrics for pitch accuracy and rhythm regularity
6. **Visualization**: Renders spectrograms with pitch contour overlay on the frontend

## Performance Metrics Explained

- **Pitch Accuracy**: Percentage match between your pitch and the reference (0-100%)
- **Mean Pitch Error**: Average deviation in cents (100 cents = 1 semitone)
- **Range Match**: How well your pitch range covers the reference's pitch range
- **Tempo Accuracy**: How well your tempo matches the reference tempo
- **Onset Regularity**: Consistency of your note timing (0-100%)
- **Overall Score**: Combined metric of pitch and rhythm accuracy

## Browser Compatibility

- Chrome/Chromium 90+
- Firefox 88+
- Safari 14+
- Edge 90+

Requires microphone access for recording (HTTPS recommended in production).

## Limitations & Future Enhancements

### Current Limitations
- Vocals-focused (no instrument support in MVP)
- Single reference file per session
- No user account/progress tracking
- Maximum file size ~50MB

### Planned Features
- Multiple instrument support (piano, guitar, flute)
- User accounts with progress tracking
- Exercise library with pre-made lessons
- Real-time waveform visualization during recording
- Export analysis as PDF
- Harmony and polyphony support
- Integration with music notation software

## Troubleshooting

### "Failed to connect to backend"
- Ensure FastAPI server is running on `http://localhost:8000`
- Check CORS is enabled in `backend/main.py`
- Verify no port conflicts

### "Microphone access denied"
- Allow microphone permissions in browser settings
- Use HTTPS in production (browsers restrict microphone access on HTTP)
- Check if another app is using the microphone

### Poor pitch detection quality
- Ensure good audio quality without background noise
- Use a closer microphone placement
- Try with a clearer reference audio
- Avoid talking or humming - sing clearly

### Slow analysis
- Reduce audio file size
- Use a more powerful machine for backend
- The first analysis may be slower due to librosa initialization

## Performance Optimization Tips

1. **Recording Quality**: Use a good microphone in a quiet room
2. **Reference Audio**: Provide clear, professional-quality reference tracks
3. **File Formats**: MP3 and WAV work best
4. **Browser**: Chrome/Chromium typically offers best Web Audio API support

## License

This project is provided as-is for educational and personal use.

## Support

For issues or questions, please:
1. Check the troubleshooting section above
2. Review the browser console for error messages
3. Ensure both frontend and backend are running
4. Verify Python and Node.js versions meet requirements

## Credits

Built with:
- Librosa for audio analysis
- FastAPI for the backend
- Next.js and React for the frontend
- Tailwind CSS for styling
