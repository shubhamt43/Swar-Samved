# Quick Start Guide: Swar-Samved AI Music Tutor

## 🚀 Getting Started in 5 Minutes

### Step 1: Frontend Setup (Terminal 1)

```bash
# Install dependencies
pnpm install

# Start the development server
pnpm dev
```

Frontend will be available at: **http://localhost:3000**

### Step 2: Backend Setup (Terminal 2)

```bash
# Navigate to backend
cd backend

# Initialize Python and install dependencies
uv init --bare .
uv add fastapi==0.104.1 uvicorn==0.24.0 python-multipart==0.0.6 librosa==0.10.0 numpy==1.24.3 scipy==1.11.4 pydantic==2.5.0

# Start the FastAPI server
uv run main.py
```

Backend will be available at: **http://localhost:8000**

### Step 3: Start Using the App

1. Open **http://localhost:3000** in your browser
2. Allow microphone access when prompted
3. Upload a reference audio file (MP3, WAV, OGG, FLAC)
4. Record yourself singing the same piece
5. Get instant AI feedback on your pitch and rhythm!

---

## 📋 Requirements

- **Node.js**: v18.0.0 or higher
- **Python**: v3.10 or higher
- **pnpm**: Latest version (or npm/yarn)
- **uv**: Python package manager (or pip)
- **Modern Browser**: Chrome, Firefox, Safari, or Edge

### Check Your Versions

```bash
node --version
python --version
pnpm --version
uv --version
```

---

## 🎤 How to Use

### Uploading Reference Audio
- Click the upload area or drag-and-drop an audio file
- Supports: MP3, WAV, OGG, FLAC
- Maximum file size: 50MB recommended

### Recording Your Performance
1. Click the **Record** button
2. Sing or perform the same piece as the reference
3. Click **Stop** when done
4. Listen to your recording to verify

### Understanding Feedback
- **Pitch Accuracy**: How well you matched the target pitch (0-100%)
- **Pitch Error**: Deviation in cents (negative = too low, positive = too high)
- **Tempo Accuracy**: How well you matched the reference tempo
- **Timing Regularity**: Consistency of your rhythm
- **Overall Score**: Combined metric of all factors

---

## 🔧 Troubleshooting

### "Cannot connect to backend"
```bash
# Make sure backend is running in another terminal
cd backend
uv run main.py
```

### "Microphone not working"
- Check browser permissions (allow microphone access)
- Try a different browser
- Ensure no other app is using the microphone

### "Pitch detection not working"
- Use a quieter environment
- Sing more clearly and loudly
- Ensure good quality reference audio
- Try a different reference file

### Slow Performance
- Reduce audio file size
- Close unnecessary browser tabs
- Ensure your machine meets requirements
- Try clearing browser cache

---

## 📊 Features Overview

### Current MVP Features
✅ Real-time vocal analysis  
✅ Pitch and rhythm detection  
✅ Spectrogram visualization  
✅ Comparative feedback  
✅ Mobile responsive design  
✅ No account required  

### Supported Formats
- MP3 (best compatibility)
- WAV (high quality)
- OGG (web-optimized)
- FLAC (lossless)

### Browser Support
- Chrome/Chromium 90+
- Firefox 88+
- Safari 14+
- Edge 90+

---

## 📁 Project Structure

```
swar-samved/
├── app/                          # Next.js app
│   ├── page.tsx                 # Main interface
│   ├── layout.tsx               # Layout with metadata
│   └── globals.css              # Tailwind styles
├── components/                   # React components
│   ├── AudioRecorder.tsx        # Recording interface
│   ├── ReferenceUpload.tsx      # File upload
│   ├── SpectrogramDisplay.tsx   # Visualization
│   ├── FeedbackDisplay.tsx      # Metrics & feedback
│   └── ControlPanel.tsx         # Controls
├── backend/                      # Python FastAPI
│   ├── main.py                  # FastAPI server
│   ├── audio_analyzer.py        # Audio processing
│   └── pyproject.toml           # Dependencies
└── scripts/
    └── run_backend.sh           # Startup helper
```

---

## 🎯 Tips for Best Results

1. **Use a Good Microphone**: External USB mics work better than laptop mics
2. **Quiet Environment**: Minimize background noise
3. **Clear Audio**: Sing or speak clearly without hesitation
4. **Quality Reference**: Use professional-quality reference audio
5. **Distance**: Keep microphone 6-12 inches from mouth
6. **Volume**: Sing at a comfortable volume (not whisper-loud)

---

## 🚀 Advanced: Production Deployment

### Deploy Frontend to Vercel
```bash
git init
git add .
git commit -m "Initial commit"
# Push to GitHub and connect to Vercel
```

### Deploy Backend
The backend can be deployed to:
- AWS Lambda (with serverless framework)
- Heroku
- DigitalOcean App Platform
- Railway
- Render

Example (Railway):
```bash
# Install Railway CLI
npm i -g @railway/cli

# Login and deploy
railway login
railway init
railway deploy
```

---

## 📞 Support

### Common Issues
- See **Troubleshooting** section above
- Check browser console (F12) for errors
- Ensure both servers are running on correct ports

### Checking Server Status
```bash
# Frontend health
curl http://localhost:3000

# Backend health
curl http://localhost:8000/health
```

---

## 📝 Notes

- This is a **stateless application** - no user accounts or data storage
- Each session is independent
- All processing happens on your machine (privacy-friendly)
- Python dependencies may take 5-10 minutes on first install
- Librosa library is large (~500MB) - initial download may take time

---

## 🎓 Learning Resources

- [Web Audio API Documentation](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API)
- [Librosa Documentation](https://librosa.org/)
- [FastAPI Documentation](https://fastapi.tiangolo.com/)
- [Next.js Documentation](https://nextjs.org/docs)

---

**Happy Learning! 🎵**

Last Updated: March 2025
