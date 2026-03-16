'use client';

interface FeedbackDisplayProps {
  comparison: any;
}

export default function FeedbackDisplay({ comparison }: FeedbackDisplayProps) {
  const pitchFeedback = comparison.pitch_feedback || {};
  const rhythmFeedback = comparison.rhythm_feedback || {};

  const AccuracyGauge = ({ value, label }: { value: number; label: string }) => {
    const percentage = Math.min(100, Math.max(0, value));
    const color =
      percentage >= 80
        ? 'from-green-500 to-emerald-500'
        : percentage >= 60
          ? 'from-yellow-500 to-amber-500'
          : 'from-red-500 to-rose-500';

    return (
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <p className="text-slate-300 font-medium">{label}</p>
          <p className="text-white font-bold text-lg">{percentage.toFixed(1)}%</p>
        </div>
        <div className="w-full bg-slate-700 rounded-full h-3 overflow-hidden">
          <div
            className={`h-full bg-gradient-to-r ${color} transition-all duration-500`}
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>
    );
  };

  const MetricCard = ({ title, value, unit, color }: any) => (
    <div className="bg-slate-700 rounded-lg p-4 border border-slate-600">
      <p className="text-slate-400 text-sm font-medium mb-1">{title}</p>
      <p className={`text-2xl font-bold ${color}`}>
        {typeof value === 'number' ? value.toFixed(2) : value}
        <span className="text-sm text-slate-400 ml-1">{unit}</span>
      </p>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Pitch Feedback */}
      <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
        <h3 className="text-xl font-bold text-cyan-400 mb-4">Pitch Analysis</h3>
        <div className="space-y-4">
          <AccuracyGauge
            value={pitchFeedback.accuracy || 0}
            label="Pitch Accuracy"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
            <MetricCard
              title="Mean Pitch Error"
              value={pitchFeedback.mean_error_cents || 0}
              unit="cents"
              color="text-cyan-400"
            />
            <MetricCard
              title="Range Match"
              value={pitchFeedback.range_match || 0}
              unit="%"
              color="text-blue-400"
            />
          </div>
        </div>

        {/* Pitch Feedback Tips */}
        <div className="mt-4 p-3 bg-slate-700/50 rounded border border-slate-600">
          <p className="text-sm text-slate-300">
            {pitchFeedback.accuracy >= 80
              ? '✓ Excellent pitch control! You matched the reference very well.'
              : pitchFeedback.accuracy >= 60
                ? '◐ Good pitch control. Focus on hitting the exact notes more precisely.'
                : '✗ Keep practicing your pitch accuracy. Try singing with the reference audio.'}
          </p>
        </div>
      </div>

      {/* Rhythm Feedback */}
      <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
        <h3 className="text-xl font-bold text-cyan-400 mb-4">Rhythm Analysis</h3>
        <div className="space-y-4">
          <AccuracyGauge
            value={rhythmFeedback.regularity || 0}
            label="Timing Regularity"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
            <MetricCard
              title="Your Tempo"
              value={rhythmFeedback.your_tempo || 0}
              unit="BPM"
              color="text-cyan-400"
            />
            <MetricCard
              title="Reference Tempo"
              value={rhythmFeedback.reference_tempo || 0}
              unit="BPM"
              color="text-slate-400"
            />
          </div>

          <MetricCard
            title="Tempo Accuracy"
            value={rhythmFeedback.tempo_accuracy || 0}
            unit="%"
            color="text-blue-400"
          />
        </div>

        {/* Rhythm Feedback Tips */}
        <div className="mt-4 p-3 bg-slate-700/50 rounded border border-slate-600">
          <p className="text-sm text-slate-300">
            {rhythmFeedback.regularity >= 80
              ? '✓ Great rhythm! Your timing is very consistent.'
              : rhythmFeedback.regularity >= 60
                ? '◐ Your rhythm is decent. Practice with a metronome to improve consistency.'
                : '✗ Work on your timing. Try practicing with a metronome at a slower tempo.'}
          </p>
        </div>
      </div>

      {/* Overall Recommendations */}
      <div className="bg-gradient-to-r from-purple-900/40 to-indigo-900/40 rounded-lg p-6 border border-purple-700/50">
        <h3 className="text-lg font-bold text-purple-300 mb-3">Recommendations</h3>
        <ul className="space-y-2 text-sm text-slate-300">
          <li className="flex items-start gap-2">
            <span className="text-purple-400 mt-0.5">•</span>
            <span>
              {pitchFeedback.accuracy >= 80 && rhythmFeedback.regularity >= 80
                ? 'Excellent! Try practicing at faster tempos or more complex pieces.'
                : pitchFeedback.accuracy < 60
                  ? 'Focus on pitch accuracy first by practicing individual notes.'
                  : 'Work on matching the reference tempo while maintaining pitch control.'}
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-purple-400 mt-0.5">•</span>
            <span>
              Record multiple attempts and compare your improvements over time.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-purple-400 mt-0.5">•</span>
            <span>
              Listen to your recording carefully and identify where adjustments are needed.
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
}
