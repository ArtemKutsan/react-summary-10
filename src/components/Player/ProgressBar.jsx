import { Slider } from "antd";

function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}

function ProgressBar({ currentTime, maxTime, onTimeChange }) {
  return (
    <>
      <span className="min-w-12 text-right text-sm font-mono text-white/70">{formatTime(currentTime)}</span>
      <Slider
        className="flex-1"
        min={0}
        max={maxTime}
        value={currentTime}
        onChange={onTimeChange}
        tooltip={{ formatter: (value) => formatTime(value) }}
      />
      <span className="min-w-12 text-sm font-mono text-white/50">{formatTime(maxTime)}</span>
    </>
  );
}

export default ProgressBar;
