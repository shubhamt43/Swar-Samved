'use client';

interface ControlPanelProps {
  onReset: () => void;
}

export default function ControlPanel({ onReset }: ControlPanelProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <button
        onClick={onReset}
        className="flex-1 bg-slate-600 hover:bg-slate-500 text-white font-bold py-3 rounded-lg transition-colors"
      >
        Start New Session
      </button>
      <button
        onClick={() => window.location.href = '/'}
        className="flex-1 bg-slate-600 hover:bg-slate-500 text-white font-bold py-3 rounded-lg transition-colors"
      >
        Go to Home
      </button>
    </div>
  );
}
