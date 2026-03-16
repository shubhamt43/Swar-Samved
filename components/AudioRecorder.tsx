'use client';

import { useState, useRef, useEffect } from 'react';

// 1. Top-level import remove kar dein
// import RecordRTC from 'recordrtc'; 

export default function AudioRecorder({ onRecordingComplete, recordedBlob }: any) {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  
  // 2. Type ko 'any' ya RecordRTC type dein
  const recorderRef = useRef<any>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const startRecording = async () => {
    try {
      // 3. Dynamic import RecordRTC only when needed (client-side)
      const { default: RecordRTC, StereoAudioRecorder } = await import('recordrtc');
      
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

      const recorder = new RecordRTC(stream, {
        type: 'audio',
        mimeType: 'audio/wav',
        recorderType: StereoAudioRecorder,
        numberOfAudioChannels: 1,
        desiredSampRate: 22050,
      });

      recorder.startRecording();
      recorderRef.current = recorder;
      
      setIsRecording(true);
      setRecordingTime(0);
      timerRef.current = setInterval(() => setRecordingTime((prev) => prev + 1), 1000);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const stopRecording = () => {
    if (recorderRef.current) {
      recorderRef.current.stopRecording(() => {
        const blob = recorderRef.current.getBlob();
        onRecordingComplete(blob);
        if (streamRef.current) {
          streamRef.current.getTracks().forEach((track) => track.stop());
        }
      });
      setIsRecording(false);
      if (timerRef.current) clearInterval(timerRef.current);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-4">
      {/* Recorder Controls */}
      <div className="bg-slate-700 rounded-lg p-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-4">
          <div className="flex-1">
            <div className="text-3xl font-mono font-bold text-cyan-400">
              {formatTime(recordingTime)}
            </div>
            <p className="text-slate-300 text-sm">
              {isRecording ? 'Recording (WAV Format)...' : 'Ready to record'}
            </p>
          </div>

          <div className="flex gap-3 w-full sm:w-auto">
            {!isRecording ? (
              <button
                onClick={startRecording}
                className="flex-1 sm:flex-none bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <span className="text-xl">●</span>
                Record
              </button>
            ) : (
              <button
                onClick={stopRecording}
                className="flex-1 sm:flex-none bg-slate-600 hover:bg-slate-500 text-white font-bold py-2 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <span className="text-xl">■</span>
                Stop
              </button>
            )}
          </div>
        </div>

        {/* Recording Indicator */}
        {isRecording && (
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
            <p className="text-red-400 text-sm">Recording in progress...</p>
          </div>
        )}
      </div>

      {/* Recorded Audio Playback */}
      {recordedBlob && (
        <div className="bg-slate-700 rounded-lg p-6">
          <p className="text-sm text-slate-300 mb-3 font-medium">Recorded Audio Preview:</p>
          <audio
            controls
            className="w-full rounded-lg"
            src={URL.createObjectURL(recordedBlob)}
          />
          <p className="text-xs text-slate-400 mt-2">
            Duration: {formatTime(recordingTime)} | Format: WAV
          </p>
        </div>
      )}

      <p className="text-xs text-slate-400 text-center">
      Make sure your microphone is working before recording. Click Record to start.
      </p>
    </div>
  );
}
