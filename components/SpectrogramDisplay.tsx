'use client';

import { useEffect, useRef } from 'react';

interface SpectrogramDisplayProps {
  testAnalysis: any;
  referenceAnalysis: any;
}

export default function SpectrogramDisplay({
  testAnalysis,
  referenceAnalysis,
}: SpectrogramDisplayProps) {
  const testCanvasRef = useRef<HTMLCanvasElement>(null);
  const refCanvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (testAnalysis && testCanvasRef.current) {
      drawSpectrogram(testCanvasRef.current, testAnalysis, testAnalysis.pitch);
    }
    if (referenceAnalysis && refCanvasRef.current) {
      drawSpectrogram(refCanvasRef.current, referenceAnalysis, referenceAnalysis.pitch);
    }
  }, [testAnalysis, referenceAnalysis]);

  const drawSpectrogram = (
    canvas: HTMLCanvasElement,
    analysis: any,
    pitchData: number[]
  ) => {
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    // Clear canvas
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(0, 0, width, height);

    // Draw spectrogram (simplified visualization)
    const specData = analysis.spectrogram;
    const freqs = analysis.frequencies;
    const specTimes = analysis.spec_times;

    if (!Array.isArray(specData) || specData.length === 0) {
      ctx.fillStyle = '#94a3b8';
      ctx.font = '14px sans-serif';
      ctx.fillText('No spectrogram data available', 10, 30);
      return;
    }

    // Normalize spectrogram data for visualization
    const maxTimeSteps = Math.min(specData[0].length, Math.floor(width / 2));
    const maxFreqBins = Math.min(specData.length, height);

    for (let freqIdx = 0; freqIdx < maxFreqBins; freqIdx++) {
      for (let timeIdx = 0; timeIdx < maxTimeSteps; timeIdx++) {
        const specValue = specData[freqIdx]?.[timeIdx] || -80;
        // Normalize to 0-1 range (assuming spectrogram is in dB, typically -80 to 0)
        const normalized = Math.max(0, (specValue + 80) / 80);

        // Map to color (cool to hot colormap)
        let r, g, b;
        if (normalized < 0.33) {
          r = 0;
          g = Math.floor(normalized / 0.33 * 255);
          b = 255;
        } else if (normalized < 0.67) {
          r = 0;
          g = 255;
          b = Math.floor((1 - (normalized - 0.33) / 0.34) * 255);
        } else {
          r = Math.floor((normalized - 0.67) / 0.33 * 255);
          g = 255;
          b = 0;
        }

        ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;
        ctx.fillRect(
          (timeIdx / maxTimeSteps) * width,
          ((maxFreqBins - freqIdx) / maxFreqBins) * height,
          Math.max(1, width / maxTimeSteps),
          Math.max(1, height / maxFreqBins)
        );
      }
    }

    // Draw pitch contour overlay
    if (pitchData && pitchData.length > 0) {
      const minFreq = Math.min(...freqs);
      const maxFreq = Math.max(...freqs);
      const freqRange = maxFreq - minFreq;

      ctx.strokeStyle = '#06b6d4';
      ctx.lineWidth = 2;
      ctx.beginPath();

      for (let i = 0; i < Math.min(pitchData.length, maxTimeSteps); i++) {
        const pitch = pitchData[i];
        if (pitch > 0) {
          const x = (i / pitchData.length) * width;
          const y = height - ((pitch - minFreq) / freqRange) * height;

          if (i === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
      }
      ctx.stroke();
    }

    // Draw axes labels
    ctx.fillStyle = '#94a3b8';
    ctx.font = '12px monospace';
    ctx.fillText('Time (s)', 10, height - 5);
    ctx.fillText('Freq (Hz)', 5, 15);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-cyan-400">Spectral Analysis</h2>

      {/* Your Performance */}
      <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
        <h3 className="text-lg font-semibold text-white mb-4">Your Recording</h3>
        <div className="overflow-x-auto">
          <canvas
            ref={testCanvasRef}
            width={800}
            height={300}
            className="w-full border border-slate-700 rounded-lg bg-slate-900"
          />
        </div>
        <p className="text-xs text-slate-400 mt-2">
          Blue line: Detected pitch contour | Colors: Frequency intensity
        </p>
      </div>

      {/* Reference */}
      <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
        <h3 className="text-lg font-semibold text-white mb-4">Reference Audio</h3>
        <div className="overflow-x-auto">
          <canvas
            ref={refCanvasRef}
            width={800}
            height={300}
            className="w-full border border-slate-700 rounded-lg bg-slate-900"
          />
        </div>
        <p className="text-xs text-slate-400 mt-2">
          Blue line: Detected pitch contour | Colors: Frequency intensity
        </p>
      </div>

      {/* Legend */}
      <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
        <p className="text-sm font-semibold text-white mb-3">Color Scale (Intensity)</p>
        <div className="flex items-center gap-2">
          <div className="flex-1 h-6 rounded bg-gradient-to-r from-blue-600 via-cyan-500 via-yellow-500 to-red-600"></div>
          <div className="flex justify-between text-xs text-slate-400 w-32">
            <span>Low</span>
            <span>High</span>
          </div>
        </div>
      </div>
    </div>
  );
}
