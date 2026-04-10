import { Slider } from "antd";

function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}

function ProgressBar({ currentTime, maxTime, onTimeChange }) {
  return (
    <>
      <span className="w-10 text-right text-sm">{formatTime(currentTime)}</span>
      <Slider className="flex-1" min={0} max={maxTime} value={currentTime} onChange={onTimeChange} tooltip={{ formatter: (value) => formatTime(value) }} />
      <span className="w-10 text-sm">{formatTime(maxTime)}</span>
    </>
  );
}

export default ProgressBar;
