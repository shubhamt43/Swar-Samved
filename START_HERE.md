# 🎵 Welcome to Swar-Samved: AI Music Tutor

**START HERE** if you're new to this project!

This guide will help you get up and running in minutes.

---

## What is Swar-Samved?

Swar-Samved is an **AI-powered vocal training platform** that gives you instant feedback on your singing. It analyzes:

- **Pitch accuracy** - How well you hit the target notes
- **Rhythm & timing** - How steady your rhythm is
- **Tempo** - Whether you're keeping the right speed
- **Spectrogram analysis** - Visual representation of your voice

All this in **real-time**, with no account needed. Just record, get feedback, improve!

---

## 🚀 Quick Start (5 Minutes)

### 1. Start the Frontend
Open a terminal and run:
```bash
pnpm install
pnpm dev
```
**Frontend is ready at:** http://localhost:3000

### 2. Start the Backend  
Open another terminal and run:
```bash
cd backend
uv init --bare .
uv add fastapi uvicorn python-multipart librosa numpy scipy pydantic
uv run main.py
```
**Backend is ready at:** http://localhost:8000

### 3. Open the App
Go to **http://localhost:3000** in your browser and start using it!

---

## 💡 How It Works

```
1. Upload a reference audio
   (the song/exercise you want to learn)
        ↓
2. Record yourself singing it
   (using your microphone)
        ↓
3. Click "Analyze & Compare"
   (backend analyzes both)
        ↓
4. Get instant feedback
   (see your performance metrics & tips)
```

---

## 📖 Documentation Guide

### Quick Decision Tree

**"I just want to start right now"**
→ You're done! Go to http://localhost:3000

**"I want more detailed setup instructions"**
→ Read [SETUP.md](./SETUP.md)

**"I'm stuck or something's not working"**
→ Check [TROUBLESHOOTING.md](./TROUBLESHOOTING.md)

**"I want to understand what I'm using"**
→ Read [README.md](./README.md)

**"I want to integrate this with my app"**
→ Read [API.md](./API.md)

**"I want to deploy this to production"**
→ Read [DEPLOY.md](./DEPLOY.md)

**"I need a comprehensive overview"**
→ Read [PROJECT_SUMMARY.md](./PROJECT_SUMMARY.md)

---

## ✅ System Requirements

Before you start, make sure you have:

- ✅ **Node.js** version 18 or higher
- ✅ **Python** version 3.10 or higher  
- ✅ **pnpm** (or npm/yarn)
- ✅ **A modern browser** (Chrome, Firefox, Safari, Edge)
- ✅ **A microphone** (for recording)

### Check Your Versions

```bash
node --version     # Should show v18 or higher
python --version   # Should show 3.10 or higher
pnpm --version     # Should show a version number
```

---

## 🎤 Using the App

### Step 1: Upload Reference Audio
- Click the upload box or drag-and-drop an audio file
- Supports: MP3, WAV, OGG, FLAC
- Best: 10-60 second clips, clear audio

### Step 2: Record Yourself
- Click the "Record" button
- Sing or perform the same piece
- Click "Stop" when done
- Listen to playback to verify

### Step 3: Analyze
- Click "Analyze & Compare"
- Wait 5-15 seconds while we process
- Get instant feedback!

### Step 4: Review Feedback
Your results show:
- **Pitch accuracy** (0-100%)
- **Tempo match** (how well you matched the speed)
- **Timing regularity** (how consistent you were)
- **Detailed metrics** (pitch error in cents, etc.)
- **Recommendations** (what to improve)

### Step 5: Practice Again
- Record multiple takes
- Compare improvements
- Follow the AI tips

---

## 🎯 Tips for Best Results

1. **Use good audio quality**
   - Quiet room (close windows/doors)
   - Good microphone (USB mic preferred)
   - Clear, loud singing (not whisper)

2. **Record the right way**
   - 6-12 inches from microphone
   - Sing clearly without hesitation
   - 5-60 second clips work best

3. **Choose good reference**
   - Professional quality audio
   - Clear, well-recorded singing
   - Appropriate difficulty level

4. **Practice with purpose**
   - Record multiple takes
   - Compare improvements
   - Focus on weak areas (pitch or rhythm)

---

## 🔧 Troubleshooting

### "Cannot connect to backend"
**Fix:** Make sure backend is running
```bash
# In another terminal, check:
curl http://localhost:8000/health
# Should show: {"status":"healthy","service":"AI Music Tutor"}
```

### "Microphone not working"
**Fix:** Allow browser permission
- Click camera/microphone icon in address bar
- Select "Allow" for microphone
- Refresh the page

### "Nothing recorded"
**Fix:** Check microphone
- Test microphone in phone or other app first
- Make sure it's plugged in (if USB)
- Try different microphone

### "Analysis takes too long"
**Fix:** Use shorter audio
- Keep clips under 30 seconds
- Large files take longer to process
- This is normal

**Still stuck?** → See [TROUBLESHOOTING.md](./TROUBLESHOOTING.md)

---

## 📚 Documentation Overview

### For Quick Reference
- **[QUICK_START.txt](./QUICK_START.txt)** - ASCII art guide (5 min read)
- **[BUILD_SUMMARY.md](./BUILD_SUMMARY.md)** - What was built (10 min read)

### For Understanding Features
- **[README.md](./README.md)** - Feature guide (15 min read)
- **[SETUP.md](./SETUP.md)** - Detailed setup (15 min read)

### For Technical Details
- **[API.md](./API.md)** - API reference (25 min read)
- **[PROJECT_SUMMARY.md](./PROJECT_SUMMARY.md)** - Architecture (25 min read)

### For Production
- **[DEPLOY.md](./DEPLOY.md)** - Deployment guide (30 min read)

### For Help
- **[TROUBLESHOOTING.md](./TROUBLESHOOTING.md)** - Common issues (40 min read)
- **[DOCUMENTATION_INDEX.md](./DOCUMENTATION_INDEX.md)** - Doc navigation (15 min read)

---

## 🎓 Learning Path

### Beginner (Just want to use it)
1. Read this file (START_HERE.md) ✓ You're here
2. Go to http://localhost:3000
3. Upload, record, analyze
4. Check [README.md](./README.md) if you have questions

**Time:** 5-20 minutes

### Developer (Want to extend it)
1. Complete Beginner path
2. Read [PROJECT_SUMMARY.md](./PROJECT_SUMMARY.md)
3. Read [API.md](./API.md)
4. Explore the code in app/ and backend/

**Time:** 1-2 hours

### Operator (Want to deploy)
1. Complete Developer path
2. Read [DEPLOY.md](./DEPLOY.md)
3. Choose hosting platform
4. Set up and deploy

**Time:** 2-4 hours

---

## 💬 Feedback Interpretation

### Pitch Accuracy (0-100%)
- **80-100%** ✅ Excellent! You matched the pitch very well
- **60-80%** ◐ Good, but could be more precise
- **<60%** ✗ Keep practicing, focus on hitting exact notes

**Pitch Error (cents):**
- 100 cents = 1 semitone (one piano key)
- Negative = singing too low
- Positive = singing too high
- ±20 cents or less = great!

### Tempo Accuracy (0-100%)
- **90-100%** ✅ Perfect tempo match
- **80-90%** ◐ Good timing, minor adjustments
- **<80%** ✗ Work on staying with the tempo

### Timing Regularity (0-100%)
- **80-100%** ✅ Very consistent rhythm
- **60-80%** ◐ Generally good, some variation
- **<60%** ✗ Practice with metronome

---

## 🚀 Next Steps

### Immediate
1. ✅ Set up frontend (already done above)
2. ✅ Set up backend (already done above)
3. ✅ Open app at http://localhost:3000
4. 📤 Upload reference audio
5. 🎤 Record yourself
6. 📊 Get feedback!

### Today
- Try 3-5 different recordings
- Compare your improvements
- Read feedback tips
- Practice the weak areas

### This Week  
- Try different songs/exercises
- Get comfortable with the interface
- Read [README.md](./README.md) for features
- Check [API.md](./API.md) if curious about backend

### This Month
- Read [DEPLOY.md](./DEPLOY.md) if deploying
- Read [PROJECT_SUMMARY.md](./PROJECT_SUMMARY.md) for deep dive
- Share with friends and get feedback
- Suggest improvements

---

## 🌟 Key Features

✨ **No Sign-Up** - Start using immediately
✨ **Real-Time Feedback** - Get instant analysis (5-15 seconds)
✨ **Multiple Metrics** - Pitch, rhythm, tempo, spectral analysis
✨ **Visual Feedback** - See spectrograms and metrics
✨ **Mobile Friendly** - Works on phones and tablets
✨ **Privacy Focused** - No data storage, no tracking
✨ **Free to Use** - Open source, no costs

---

## 🛠️ Technology Stack

### Frontend
- React 18 + TypeScript
- Next.js 15 (Modern React framework)
- Tailwind CSS (Beautiful styling)
- Web Audio API (Recording)

### Backend
- Python 3.10+
- FastAPI (Modern API framework)
- Librosa (Audio analysis)
- NumPy/SciPy (Math processing)

### Hosting
- Vercel (Frontend, recommended)
- Railway/AWS/Heroku (Backend)

---

## 📞 Getting Help

### Errors or Issues?

1. **Check browser console (F12)**
   - Often shows the actual error
   - Look for red text

2. **Check backend logs**
   - Terminal showing backend
   - Look for error messages

3. **Test backend health**
   ```bash
   curl http://localhost:8000/health
   ```

4. **Search troubleshooting guide**
   - [TROUBLESHOOTING.md](./TROUBLESHOOTING.md)
   - Covers 40+ common issues

5. **Check browser compatibility**
   - Use Chrome, Firefox, Safari, or Edge
   - Mobile Safari iOS 14+
   - Chrome Android

---

## 🎉 You're Ready!

Everything is set up. Now:

1. **Open http://localhost:3000** in your browser
2. **Allow microphone access** when prompted
3. **Upload an audio file** to learn from
4. **Record yourself singing** the same piece
5. **Get instant AI feedback** on your performance
6. **Practice and improve!**

---

## 📖 All Documentation

| File | Purpose | Time |
|------|---------|------|
| **[START_HERE.md](./START_HERE.md)** | You are here | 10 min |
| [QUICK_START.txt](./QUICK_START.txt) | Quick reference | 5 min |
| [README.md](./README.md) | Features & usage | 15 min |
| [SETUP.md](./SETUP.md) | Detailed setup | 15 min |
| [API.md](./API.md) | API documentation | 25 min |
| [DEPLOY.md](./DEPLOY.md) | Production deployment | 30 min |
| [PROJECT_SUMMARY.md](./PROJECT_SUMMARY.md) | Architecture & tech | 25 min |
| [TROUBLESHOOTING.md](./TROUBLESHOOTING.md) | Problem solving | 40 min |
| [BUILD_SUMMARY.md](./BUILD_SUMMARY.md) | What was built | 10 min |
| [DOCUMENTATION_INDEX.md](./DOCUMENTATION_INDEX.md) | Doc navigation | 15 min |

---

## 🎵 Happy Learning!

Welcome to your AI Music Tutor. Whether you're learning vocal basics, perfecting a song, or just having fun with music, we hope Swar-Samved helps you on your musical journey.

**Let's make learning music fun and effective!**

---

**Need something specific?**
- Learn about features → [README.md](./README.md)
- Fix a problem → [TROUBLESHOOTING.md](./TROUBLESHOOTING.md)
- Deploy to cloud → [DEPLOY.md](./DEPLOY.md)
- Integrate with API → [API.md](./API.md)
- Understand architecture → [PROJECT_SUMMARY.md](./PROJECT_SUMMARY.md)

---

*Swar-Samved v1.0.0 | March 2025 | Ready for local use and production deployment*
