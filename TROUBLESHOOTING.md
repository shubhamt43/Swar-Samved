# Troubleshooting Guide: Swar-Samved

## Getting Help

This guide covers common issues and their solutions. If you don't find your issue here:
1. Check the error message in the browser console (F12)
2. Check the backend logs (Terminal 2)
3. Verify both frontend and backend are running
4. Ensure proper network connectivity

---

## Frontend Issues

### Cannot connect to backend

**Symptom:** "Failed to connect to backend. Make sure it is running on http://localhost:8000"

**Solutions:**
1. Verify backend is running:
   ```bash
   # Terminal 2 output should show:
   # INFO:     Uvicorn running on http://0.0.0.0:8000
   ```

2. Check if port 8000 is in use:
   ```bash
   # On macOS/Linux
   lsof -i :8000
   
   # On Windows
   netstat -ano | findstr :8000
   ```

3. Kill conflicting process:
   ```bash
   # macOS/Linux
   kill -9 <PID>
   
   # Windows
   taskkill /PID <PID> /F
   ```

4. Test connectivity:
   ```bash
   curl http://localhost:8000/health
   # Should return: {"status":"healthy","service":"AI Music Tutor"}
   ```

5. Check CORS in browser console (F12):
   - If you see CORS error, ensure backend middleware includes your origin
   - For development, all origins are allowed

---

### Microphone permission denied

**Symptom:** Browser shows "Permission denied" or no audio recording works

**Solutions:**

**Chrome/Edge:**
1. Click the camera icon in address bar
2. Select "Always allow on this site"
3. Refresh the page

**Firefox:**
1. Click the shield icon in address bar
2. Change microphone permissions
3. Refresh the page

**Safari:**
1. System Preferences → Security & Privacy → Microphone
2. Ensure Safari is listed and allowed
3. Refresh the page

**Mobile Browsers:**
1. Check app permissions in phone settings
2. Give Safari/Chrome microphone access
3. Some mobile apps may require HTTPS

**Test microphone:**
```javascript
// In browser console
navigator.mediaDevices.getUserMedia({audio: true})
  .then(stream => {
    console.log("Microphone access granted!");
    stream.getTracks().forEach(t => t.stop());
  })
  .catch(err => console.error("Microphone access denied:", err));
```

---

### Recording button does nothing

**Symptom:** Clicking "Record" button has no effect

**Solutions:**
1. Check browser console (F12) for errors
2. Verify microphone permission is granted
3. Try a different browser
4. Restart the browser
5. Check if microphone is already in use by another application

**Debug:**
```javascript
// In browser console
console.log("Recording supported:", MediaRecorder !== undefined);
```

---

### No sound when recording

**Symptom:** Recording completes but audio playback is silent

**Solutions:**
1. Check system volume levels (not just browser volume)
2. Test microphone with another app (voice memo, etc.)
3. Try different microphone:
   - Built-in mic → USB mic
   - Or vice versa
4. Clear browser cache (Ctrl+Shift+Delete)
5. Restart browser

**Test audio input:**
```javascript
// In browser console
const audioContext = new (window.AudioContext || window.webkitAudioContext)();
navigator.mediaDevices.getUserMedia({audio: true})
  .then(stream => {
    const analyser = audioContext.createAnalyser();
    const source = audioContext.createMediaStreamSource(stream);
    source.connect(analyser);
    
    const dataArray = new Uint8Array(analyser.frequencyBinCount);
    function checkVolume() {
      analyser.getByteFrequencyData(dataArray);
      const avg = dataArray.reduce((a, b) => a + b) / dataArray.length;
      console.log("Audio level:", avg);
      requestAnimationFrame(checkVolume);
    }
    checkVolume();
  });
```

---

### Audio file upload fails

**Symptom:** Drag-and-drop or file upload shows error

**Solutions:**
1. **File format not supported:**
   - Use: MP3, WAV, OGG, FLAC
   - Check file extension
   - Ensure file is actually an audio file (not renamed)

2. **File size too large:**
   - Maximum recommended: 50MB
   - Compress before uploading
   - Use MP3 instead of FLAC

3. **Corrupted file:**
   - Re-download or re-record the file
   - Verify with media player
   - Try converting with: ffmpeg, Audacity, or VLC

4. **Browser compatibility:**
   - Try different browser
   - Update browser to latest version

**Check file format:**
```bash
# On macOS/Linux
file audio-file.mp3

# In Python (if available)
python -c "import librosa; librosa.load('audio-file.mp3')"
```

---

### Feedback metrics showing 0%

**Symptom:** Pitch accuracy or rhythm showing 0% for valid audio

**Possible causes:**
1. Reference and test audio are very different lengths
2. Audio quality too poor (too much noise)
3. Very different pitch ranges between recordings
4. Backend analysis failed silently

**Solutions:**
1. Use clearer audio without background noise
2. Ensure both recordings are similar length
3. Check browser console for errors
4. Check backend logs for processing errors
5. Try uploading a known good reference file

---

## Backend Issues

### ModuleNotFoundError: No module named 'librosa'

**Symptom:** Backend crashes with import error

**Solutions:**
```bash
# Reinstall dependencies
cd backend

# Option 1: Using uv
uv add librosa numpy scipy fastapi uvicorn python-multipart pydantic

# Option 2: Using pip
pip install librosa numpy scipy fastapi uvicorn python-multipart pydantic

# Verify installation
python -c "import librosa; print(librosa.__version__)"
```

---

### "Address already in use" on port 8000

**Symptom:** Backend fails to start with "Address already in use"

**Solutions:**
1. Find process using port 8000:
   ```bash
   # macOS/Linux
   lsof -i :8000
   
   # Windows
   netstat -ano | findstr :8000
   ```

2. Kill the process:
   ```bash
   # macOS/Linux
   kill -9 <PID>
   
   # Windows
   taskkill /PID <PID> /F
   ```

3. Or use different port:
   ```bash
   # Modify backend/main.py
   # Change: uvicorn.run(app, host="0.0.0.0", port=8000)
   # To: uvicorn.run(app, host="0.0.0.0", port=8001)
   
   # And update frontend
   # Change NEXT_PUBLIC_API_URL to http://localhost:8001
   ```

---

### Backend crashes during analysis

**Symptom:** Backend starts but crashes when analyzing audio

**Causes & Solutions:**

**1. Out of memory:**
```bash
# Check available RAM
free -h                    # Linux
vm_stat                    # macOS
wmic OS get TotalVisibleMemorySize  # Windows

# Solution: Upgrade machine or process smaller files
```

**2. Invalid audio format:**
```bash
# Test with known good file
ffmpeg -i your-file.mp3 -f null -  # Verify file integrity

# Solution: Convert to WAV with known tool
ffmpeg -i audio.mp3 -acodec pcm_s16le -ar 22050 audio.wav
```

**3. Missing ffmpeg (for librosa):**
```bash
# Install ffmpeg
# macOS
brew install ffmpeg

# Ubuntu/Debian
sudo apt-get install ffmpeg

# Windows
# Download from https://ffmpeg.org/download.html
```

---

### Slow analysis (timeout)

**Symptom:** Backend analysis takes > 30 seconds or times out

**Causes:**
1. Large audio file (> 5 minutes)
2. Slow machine
3. Heavy system load
4. First run (librosa initialization)

**Solutions:**
1. Process smaller files (< 2 minutes)
2. Trim audio before uploading:
   ```bash
   ffmpeg -i input.mp3 -ss 0 -to 30 output.mp3  # First 30 seconds
   ```

3. Increase timeout in frontend (app/page.tsx):
   ```javascript
   // Increase timeout
   const controller = new AbortController();
   const timeoutId = setTimeout(() => controller.abort(), 60000);
   
   const response = await fetch('http://localhost:8000/compare', {
     method: 'POST',
     body: formData,
     signal: controller.signal
   });
   ```

4. Close other applications to free RAM

---

### "Unsupported audio format"

**Symptom:** Backend returns error for seemingly valid audio file

**Solutions:**
1. Check file format:
   ```bash
   ffprobe -v quiet -print_format json -show_streams audio.mp3
   ```

2. Convert to WAV (most compatible):
   ```bash
   ffmpeg -i audio.mp3 -acodec pcm_s16le -ar 22050 audio.wav
   ```

3. Try different file:
   - Some MP3s may have uncommon codecs
   - Use standard encoding

4. Check file integrity:
   ```bash
   # Try playing it first
   ffplay audio.mp3
   ```

---

## Audio Analysis Issues

### Poor pitch detection

**Symptom:** Detected pitch seems wrong or random

**Causes:**
1. Too much background noise
2. Singing too quietly
3. Audio quality is poor
4. Pitch range outside vocal range (80-400 Hz)

**Solutions:**
1. **Record in quiet environment:**
   - Close windows/doors
   - Use noise-canceling microphone
   - Turn off speakers/TV

2. **Record with proper volume:**
   - Should see audio waveform
   - Not peaking or too quiet
   - Test with another app first

3. **Sing in supported range:**
   - Pitch range: 80-400 Hz
   - Male voice: ~85-180 Hz
   - Female voice: ~165-255 Hz
   - Very high: can be ~250-400 Hz

4. **Check pitch detection output:**
   ```javascript
   // In browser console after analysis
   const analysis = lastAnalysisResult;
   const voicedPitch = analysis.pitch.filter(p => p > 0);
   console.log("Average pitch:", 
     voicedPitch.reduce((a,b) => a+b) / voicedPitch.length);
   console.log("Pitch range:", 
     Math.min(...voicedPitch), "-", Math.max(...voicedPitch), "Hz");
   ```

---

### Rhythm detection not working

**Symptom:** Tempo or regularity showing incorrect values

**Causes:**
1. Irregular singing/timing
2. Very slow or very fast tempos
3. No clear rhythm structure

**Solutions:**
1. Sing with metronome (use tempo 80-160 BPM)
2. Sing more rhythmically
3. Use music with clear beats

---

### Spectrogram showing artifacts

**Symptom:** Spectrogram visualization looks strange or noisy

**This is usually normal!** STFT spectrograms can show:
- Noise floor (low frequencies at bottom)
- Harmonics (multiple horizontal lines)
- Artifacts from short audio

**To improve visualization:**
1. Use longer audio (> 5 seconds)
2. Record in quiet environment
3. Sing clearer notes

---

## Performance Issues

### Slow frontend response

**Symptom:** Page loads slowly or interactions are laggy

**Solutions:**
```bash
# 1. Clear browser cache
# Chrome: Ctrl+Shift+Delete
# Firefox: Ctrl+Shift+Delete
# Safari: Cmd+Shift+Delete

# 2. Restart development server
pnpm dev

# 3. Check browser extensions
# Try incognito mode to disable extensions

# 4. Check system resources
# Close unnecessary applications
```

---

### Memory leak or growing memory usage

**Symptom:** Browser tab uses increasing memory over time

**Solutions:**
1. Clear audio buffers between sessions
2. Close and reopen browser tab
3. Check for console errors (F12)
4. Reload page occasionally

**Monitor memory:**
```javascript
// In browser console
setInterval(() => {
  const used = performance.memory?.usedJSHeapSize;
  console.log("Memory used:", (used / 1048576).toFixed(2), "MB");
}, 1000);
```

---

## Network Issues

### CORS error in console

**Symptom:** Browser shows CORS error, request blocked

**Cause:** Incorrect backend CORS configuration or API URL

**Solutions:**
1. Verify backend is running at correct URL
2. Check CORS middleware in backend/main.py:
   ```python
   # Should have:
   app.add_middleware(
       CORSMiddleware,
       allow_origins=["*"],  # Allow all origins for dev
       ...
   )
   ```

3. Check API URL in frontend:
   - Should be: `http://localhost:8000` for local dev
   - Should NOT have trailing slash

---

### Network timeout

**Symptom:** Request fails with "Network timeout" or "Connection refused"

**Solutions:**
1. Verify both servers are running:
   ```bash
   # Test frontend
   curl http://localhost:3000
   
   # Test backend
   curl http://localhost:8000/health
   ```

2. Check if ports are accessible:
   ```bash
   # Linux/macOS
   nc -zv localhost 3000
   nc -zv localhost 8000
   ```

3. Check firewall:
   - Windows Defender
   - macOS firewall
   - Third-party firewalls

4. Try different network:
   - Switch WiFi/Ethernet
   - Try hotspot from phone

---

## Browser Compatibility

### Not working in Safari

**Symptom:** App doesn't work on Safari browser

**Possible causes:**
1. Older Safari version (< 14)
2. Microphone permissions not granted
3. HTTPS required

**Solutions:**
1. Update Safari to latest version
2. Grant microphone permissions (System Preferences)
3. Use HTTP for localhost, HTTPS for production

---

### Not working on mobile

**Symptom:** App doesn't work on iPhone/Android

**Possible causes:**
1. Microphone not allowed
2. Audio file upload not supported
3. Browser doesn't support Web Audio API

**Solutions:**
1. Grant microphone permission in phone settings
2. Use file upload instead of drag-and-drop
3. Try Chrome for Android (better support)

---

## Getting Support

If you're still stuck:

1. **Check logs:**
   ```bash
   # Frontend: Open browser console (F12)
   # Backend: Check terminal output
   ```

2. **Test individual components:**
   ```bash
   # Test backend API
   curl -X GET http://localhost:8000/health
   
   # Test microphone
   # Use browser console (see "Microphone permission denied" section)
   
   # Test audio file upload
   # Try different file format (MP3 → WAV)
   ```

3. **Reduce to minimal case:**
   - Try with shortest audio file
   - Use simplest reference audio
   - Try different browser

4. **Check environment:**
   ```bash
   node --version    # Should be 18+
   python --version  # Should be 3.10+
   
   # Check backend can import librosa
   python -c "import librosa; print('OK')"
   ```

---

## Common Error Messages

| Error | Cause | Solution |
|-------|-------|----------|
| "Permission denied" | Microphone access | Grant browser permission |
| "Cannot connect to backend" | Backend not running | Start backend: `cd backend && uv run main.py` |
| "Invalid audio format" | Wrong file type | Use MP3, WAV, OGG, or FLAC |
| "File too large" | File exceeds 50MB | Compress or trim audio |
| "Pitch accuracy 0%" | Poor audio quality | Record in quiet environment |
| "No module named 'librosa'" | Missing dependency | Run: `uv add librosa` |
| "Address already in use" | Port 8000 occupied | Change port or kill process |
| "Timeout" | Analysis too slow | Use shorter audio files |
| "CORS error" | Wrong API URL | Check API_URL configuration |

---

## Quick Diagnostic Script

Run this to check system health:

```bash
#!/bin/bash
echo "=== Swar-Samved Diagnostic ==="

echo "Checking Node.js..."
node --version

echo "Checking Python..."
python --version

echo "Checking pnpm..."
pnpm --version

echo "Checking ports..."
lsof -i :3000 || echo "Port 3000: Not in use ✓"
lsof -i :8000 || echo "Port 8000: Not in use ✓"

echo "Checking Python dependencies..."
python -c "import librosa, numpy, scipy, fastapi; print('All dependencies: ✓')" || echo "Missing Python dependencies ✗"

echo "Testing frontend..."
curl -s http://localhost:3000 > /dev/null && echo "Frontend: ✓" || echo "Frontend: ✗ (not running)"

echo "Testing backend..."
curl -s http://localhost:8000/health | grep healthy > /dev/null && echo "Backend: ✓" || echo "Backend: ✗ (not running)"

echo "=== Diagnostic Complete ==="
```

---

Last Updated: March 2025
