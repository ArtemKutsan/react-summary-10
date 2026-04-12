import { Slider, Button } from "antd";
import { SoundOutlined, MutedOutlined } from "@ant-design/icons";

function VolumeControl({ volume, isMuted, onVolumeChange, onToggleMute }) {
  return (
    <>
      <Button
        type="text"
        shape="circle"
        icon={isMuted ? <MutedOutlined /> : <SoundOutlined />}
        onClick={onToggleMute}
        className="transition-all duration-200 hover:scale-110 active:scale-95"
      />
      <Slider
        className="max-w-24 min-w-12 grow"
        min={0}
        max={100}
        value={volume}
        onChange={onVolumeChange}
        tooltip={{ formatter: (value) => `${value}%` }}
      />
      <span className="min-w-10 text-sm font-mono text-white/60">{volume}%</span>
    </>
  );
}

export default VolumeControl;
