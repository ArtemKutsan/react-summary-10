import { Slider } from "antd";
import { usePlayerSeek } from "./AudioPlayer";

function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}

function ProgressBar({ currentTime, maxTime }) {
  const seekTo = usePlayerSeek();

  return (
    <div className="flex items-center gap-2">
      <span className="ml-1 text-right text-sm">{formatTime(currentTime)}</span>
      <Slider className="flex-1" min={0} max={maxTime} value={currentTime} onChange={seekTo} tooltip={{ formatter: (value) => formatTime(value) }} />
      <span className="mr-1 text-sm">{formatTime(maxTime)}</span>
    </div>
  );
}

export default ProgressBar;
