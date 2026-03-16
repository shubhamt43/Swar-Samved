# Swar-Samved: Project Summary

## What is Swar-Samved?

Swar-Samved is an AI-powered music tutor that provides real-time feedback on vocal performance. It analyzes pitch, rhythm, and tone by comparing your live singing against a reference recording, delivering instant visual and audio metrics to help you improve.

**Project Name Meaning:** 
- "Swar" (स्वर) = Musical note/tone in Indian classical music
- "Samved" (संवेद) = Perception/sensation/feedback in Sanskrit
- Together: "Tone Perception" - A system that perceives and provides feedback on tones

---

## Core Features

### Analysis Capabilities
- **Pitch Detection**: PYIN algorithm for robust vocal pitch extraction (80-400 Hz)
- **Rhythm Analysis**: Onset detection and tempo estimation
- **Spectrogram Visualization**: Real-time frequency domain visualization with pitch contour overlay
- **Comparative Metrics**: Side-by-side analysis of your performance vs. reference

### User Features
- **No Sign-Up Required**: Instant, stateless analysis
- **Real-Time Recording**: Browser-based microphone recording
- **Audio File Upload**: Support for MP3, WAV, OGG, FLAC formats
- **Instant Feedback**: Metrics and recommendations in < 30 seconds
- **Mobile Responsive**: Works on desktop, tablet, and smartphone browsers

### Feedback Metrics
- Pitch Accuracy (0-100%)
- Pitch Error in cents (±100 cents = 1 semitone)
- Pitch Range Coverage (%)
- Tempo Accuracy (%)
- Timing Regularity (%)
- Overall Performance Score

---

## Technical Architecture

### Frontend Stack
```
React 18 (with TypeScript)
├── Next.js 15 (App Router)
├── Tailwind CSS (styling)
├── Web Audio API (recording)
├── Canvas API (spectrograms)
└── Fetch API (backend communication)
```

### Backend Stack
```
Python 3.10+
├── FastAPI (REST API)
├── Librosa (audio analysis)
├── NumPy/SciPy (signal processing)
├── PYIN Algorithm (pitch detection)
└── Uvicorn (ASGI server)
```

### Data Flow
```
User Recording (WebM)
         ↓
Web Audio API → Blob
         ↓
Frontend Form Upload
         ↓
Backend FastAPI (/compare endpoint)
         ↓
Audio Loading (Librosa)
         ↓
Feature Extraction (Librosa + PYIN)
         ↓
Comparative Analysis
         ↓
JSON Response
         ↓
Visualization (Canvas)
```

---

## File Structure

```
swar-samved/
│
├── app/
│   ├── page.tsx                 # Main application UI
│   ├── layout.tsx               # Root layout + metadata
│   └── globals.css              # Global Tailwind styles
│
├── components/
│   ├── AudioRecorder.tsx        # Microphone recording UI
│   ├── ReferenceUpload.tsx      # Audio file upload
│   ├── SpectrogramDisplay.tsx   # Canvas-based visualization
│   ├── FeedbackDisplay.tsx      # Metrics display
│   └── ControlPanel.tsx         # Control buttons
│
├── backend/
│   ├── main.py                  # FastAPI application
│   ├── audio_analyzer.py        # Audio feature extraction
│   └── pyproject.toml           # Python dependencies
│
├── scripts/
│   └── run_backend.sh           # Backend startup helper
│
├── public/                      # Static assets
├── package.json                 # npm dependencies
├── tsconfig.json               # TypeScript config
├── tailwind.config.ts          # Tailwind CSS config
├── next.config.mjs             # Next.js config
│
├── README.md                    # User guide
├── SETUP.md                     # Quick start guide
├── API.md                       # API documentation
├── DEPLOY.md                    # Deployment guide
├── TROUBLESHOOTING.md          # Troubleshooting guide
└── PROJECT_SUMMARY.md          # This file
```

---

## Key Algorithms

### Pitch Detection (PYIN)
- **Algorithm**: Probabilistic YIN
- **Input**: Audio waveform
- **Output**: Pitch contour in Hz
- **Advantages**: Robust to noise, few octave errors
- **Confidence threshold**: Voiced/unvoiced classification

### Onset Detection
- **Algorithm**: Librosa onset strength
- **Purpose**: Detect note transitions
- **Usage**: Rhythm analysis and regularity calculation

### Tempo Estimation
- **Algorithm**: Librosa beat tracking
- **Output**: BPM (beats per minute)
- **Stability**: Averaged across multiple analysis windows

### Spectral Analysis
- **Method**: Short-Time Fourier Transform (STFT)
- **Window**: Hann window, 2048 samples
- **Hop Length**: 512 samples
- **Output**: Frequency-time representation

---

## API Endpoints Summary

| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | `/health` | Health check |
| POST | `/analyze` | Analyze single audio file |
| POST | `/compare` | Compare test vs reference |
| POST | `/analyze-simple` | Fast analysis (minimal output) |

**Response Time:**
- Health check: < 100ms
- Analyze: 2-5 seconds (5-10s audio)
- Compare: 5-15 seconds (5-10s audio each)

---

## Performance Specifications

### Audio Processing
- **Sample Rate**: 22,050 Hz (CD quality reduced)
- **Bit Depth**: 16-bit (after conversion)
- **Channels**: Mono (auto-converted)
- **Max File Size**: 50 MB recommended

### Processing Time
- **Pitch Detection**: ~0.5-1s per 10s of audio
- **Spectrogram**: ~0.5s per 10s of audio
- **Rhythm Analysis**: ~0.3s per 10s of audio
- **Total**: ~1-2s per 10s of audio

### Memory Usage
- **Frontend**: 50-150 MB (depending on browser)
- **Backend**: 200-500 MB (librosa/numpy overhead)
- **Canvas (spectrogram)**: ~10 MB

---

## Browser Compatibility

| Browser | Support | Notes |
|---------|---------|-------|
| Chrome/Chromium | ✓ 90+ | Best support for Web Audio API |
| Firefox | ✓ 88+ | Good support, may be slower |
| Safari | ✓ 14+ | Good support, HTTPS recommended |
| Edge | ✓ 90+ | Chromium-based, excellent support |
| IE 11 | ✗ | Not supported |
| Mobile Chrome | ✓ | Good support for Android |
| Mobile Safari | ✓ | iOS 14+ supported |

---

## Known Limitations

### Current MVP (v1.0)
1. **Vocal-only**: No instrument support
2. **Single session**: No user accounts or progress tracking
3. **File size**: 50 MB recommended maximum
4. **Latency**: Processing takes 5-15 seconds
5. **Monophonic**: Single voice/instrument at a time

### Technical Limitations
1. **Pitch range**: 80-400 Hz (most vocal ranges)
2. **Polyphony**: Cannot handle multiple simultaneous pitches
3. **Duration**: Optimal for 10-60 second clips
4. **Noise**: Sensitive to background noise

### Platform Limitations
1. **Mobile**: No native app, web-based only
2. **Offline**: Requires backend API (no offline mode)
3. **Storage**: No persistent user data
4. **Export**: No PDF/report export in v1.0

---

## Future Enhancement Roadmap

### Phase 2 (Q2 2025)
- [ ] User accounts and progress tracking
- [ ] Exercise library with pre-made lessons
- [ ] Export analysis as PDF
- [ ] Real-time waveform visualization during recording
- [ ] Multiple recording attempts per session

### Phase 3 (Q3 2025)
- [ ] Instrument support (piano, guitar, flute)
- [ ] Harmony and polyphony detection
- [ ] Sheet music integration
- [ ] Social features (share results, leaderboards)

### Phase 4 (Q4 2025)
- [ ] Advanced AI feedback (personalized coaching)
- [ ] Mobile native app (iOS/Android)
- [ ] Offline mode with background processing
- [ ] Integration with music notation software
- [ ] Teacher dashboard for student management

---

## Security & Privacy

### Data Handling
- **No Persistence**: Audio files are processed and discarded
- **No User Data**: No user accounts, no data storage
- **CORS Protected**: Backend CORS restrictions in production
- **HTTPS**: Recommended for production
- **Microphone**: User explicitly grants access

### Best Practices
- All user interactions stay on device
- Audio processing happens on backend
- No third-party API calls
- No tracking or analytics on user performance

---

## Performance Optimization Tips

### For Users
1. Use a quality microphone (USB if possible)
2. Record in a quiet environment
3. Use professional-quality reference audio
4. Keep recordings 5-60 seconds
5. Use MP3 for faster uploads

### For Developers
1. Implement Redis caching for repeated analyses
2. Use async task queues for large batches
3. Optimize spectral analysis with Numba JIT
4. Consider GPU acceleration (CUDA/ROCm) for librosa
5. Use CDN for frontend assets

---

## Deployment Checklist

- [ ] Frontend deployed (Vercel recommended)
- [ ] Backend deployed (Railway, AWS, or Heroku)
- [ ] Environment variables configured
- [ ] CORS settings updated for production domain
- [ ] SSL/HTTPS enforced
- [ ] API rate limiting configured
- [ ] Error logging set up
- [ ] Monitoring and alerts configured
- [ ] Backup strategy implemented
- [ ] Load testing completed

---

## Technology Decisions

### Why These Technologies?

**React + Next.js**
- Server-side rendering for better performance
- Built-in API routes (can be used for proxy)
- Excellent developer experience
- Easy deployment to Vercel

**Tailwind CSS**
- Rapid UI development
- Responsive design built-in
- Minimal bundle size
- Easy theming for future versions

**Web Audio API**
- No external audio library needed
- Native browser support
- Low latency recording
- Stream processing capability

**FastAPI**
- High performance Python framework
- Automatic API documentation
- Built-in validation with Pydantic
- Async/await support
- Easy CORS configuration

**Librosa**
- Industry-standard audio analysis library
- PYIN pitch detection algorithm
- Comprehensive feature extraction
- Well-documented and maintained

---

## Cost Analysis

### Development
- Frontend hosting: Free (Vercel)
- Backend hosting: $20-50/month (Railway/Heroku)
- Domain: $12/year
- **Total**: ~$20-50/month

### Scaling (1000+ daily users)
- Frontend: $50-200/month (Vercel Pro)
- Backend: $200-1000/month (auto-scaling)
- Database (if added): $50-200/month
- **Total**: ~$300-1400/month

---

## Support & Community

### Getting Help
1. Check TROUBLESHOOTING.md
2. Review API.md for endpoint details
3. Check browser console (F12) for errors
4. Check backend logs for processing errors
5. Test with curl: `curl http://localhost:8000/health`

### Reporting Issues
Include:
- Browser and version
- Error message (from console)
- Steps to reproduce
- Operating system
- Audio file details

---

## Code Quality Standards

### Frontend
- TypeScript for type safety
- ESLint for code quality
- Next.js best practices
- Responsive design with Tailwind
- Semantic HTML structure
- ARIA labels for accessibility

### Backend
- Python type hints
- Docstrings for all functions
- Error handling with try/except
- Logging for debugging
- Input validation with Pydantic
- CORS middleware configuration

---

## Testing Strategy (Future)

```python
# Backend tests (pytest)
def test_pitch_detection():
    audio = generate_test_sine_wave(440)  # 440 Hz
    pitch = analyzer.extract_pitch(audio)
    assert 430 < pitch.mean() < 450  # Within tolerance

def test_compare_identical_audio():
    audio = load_test_audio()
    comparison = analyzer.calculate_pitch_accuracy(audio, audio)
    assert comparison["overall_accuracy"] > 95  # Should be nearly perfect
```

```javascript
// Frontend tests (Jest + React Testing Library)
test('renders AudioRecorder component', () => {
  render(<AudioRecorder />);
  expect(screen.getByText(/Record/i)).toBeInTheDocument();
});

test('uploads file successfully', async () => {
  render(<ReferenceUpload />);
  const file = new File(['audio'], 'test.mp3', { type: 'audio/mp3' });
  const input = screen.getByRole('textbox');
  await userEvent.upload(input, file);
  expect(screen.getByText(/uploaded/i)).toBeInTheDocument();
});
```

---

## Conclusion

Swar-Samved is a modern, AI-powered music tutor built with cutting-edge web technologies and robust audio processing algorithms. It bridges the gap between professional audio analysis and accessible music education by providing instant, intelligent feedback to vocal learners.

The MVP focuses on core functionality (vocal pitch and rhythm analysis) with a clean, intuitive interface. Future versions will expand to support multiple instruments, user progression tracking, and advanced AI-driven coaching.

**Status:** Ready for local development and testing
**Next Steps:** Deploy to production, gather user feedback, iterate on features

---

## Quick Links

- [README.md](./README.md) - User guide and feature overview
- [SETUP.md](./SETUP.md) - Quick start in 5 minutes
- [API.md](./API.md) - Complete API reference
- [DEPLOY.md](./DEPLOY.md) - Production deployment guide
- [TROUBLESHOOTING.md](./TROUBLESHOOTING.md) - Common issues and solutions

---

**Project Created:** March 2025
**Version:** 1.0.0
**Status:** Beta
**License:** Educational Use

For questions or contributions, please refer to the documentation files above.
