'use client';

import { useState } from 'react';

interface ReferenceUploadProps {
  onUpload: (blob: Blob) => void;
  uploadedFile: Blob | null;
}

export default function ReferenceUpload({
  onUpload,
  uploadedFile,
}: ReferenceUploadProps) {
  const [dragActive, setDragActive] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);

  const handleFile = (file: File) => {
    if (!file.type.includes('audio')) {
      alert('Please upload an audio file (MP3, WAV, etc.)');
      return;
    }

    setFileName(file.name);
    onUpload(file);
  };

  const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  return (
    <div className="space-y-4">
      {/* Upload Zone */}
      <div
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors cursor-pointer ${
          dragActive
            ? 'border-cyan-400 bg-cyan-400/10'
            : 'border-slate-600 bg-slate-700/50 hover:border-slate-500'
        }`}
      >
        <div className="mb-4 text-4xl">🎵</div>
        <p className="text-white font-semibold mb-2">
          Drag and drop your reference audio here
        </p>
        <p className="text-slate-400 text-sm mb-4">or</p>

        <input
          id="file-input"
          type="file"
          accept="audio/*"
          onChange={handleChange}
          className="hidden"
        />
        <label 
          htmlFor="file-input"
          className="inline-block bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-2 px-6 rounded-lg transition-colors cursor-pointer"
        >
          Choose File
        </label>

        <p className="text-xs text-slate-400 mt-4">
          Supported formats: MP3, WAV, OGG, FLAC (Max 50MB)
        </p>
      </div>

      {/* Upload Status */}
      {uploadedFile && fileName && (
        <div className="bg-slate-700 rounded-lg p-4 border border-green-700/50">
          <div className="flex items-center gap-3">
            <div className="text-green-400 text-xl">✓</div>
            <div className="flex-1">
              <p className="text-white font-medium text-sm">Reference audio uploaded</p>
              <p className="text-slate-400 text-xs mt-1">{fileName}</p>
            </div>
          </div>

          {/* Playback Preview */}
          <audio
            controls
            className="w-full rounded-lg mt-3"
            src={URL.createObjectURL(uploadedFile)}
          />
        </div>
      )}
    </div>
  );
}
