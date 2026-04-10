import { Select } from "antd";

function PlaybackRateSelector({ playbackRate, onPlaybackRateChange }) {
  return (
    <Select
      className="w-20"
      value={playbackRate}
      onChange={onPlaybackRateChange}
      options={[
        { value: 0.5, label: "0.5x" },
        { value: 0.75, label: "0.75x" },
        { value: 1.0, label: "1.0x" },
        { value: 1.25, label: "1.25x" },
        { value: 1.5, label: "1.5x" },
      ]}
    />
  );
}

export default PlaybackRateSelector;
