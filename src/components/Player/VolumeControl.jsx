import { Slider, Button } from "antd";
import { SoundOutlined, MutedOutlined } from "@ant-design/icons";

function VolumeControl({ volume, isMuted, onVolumeChange, onToggleMute }) {
  return (
    <>
      <Slider className="w-20" min={0} max={100} value={volume} onChange={onVolumeChange} tooltip={{ formatter: (value) => `${value}%` }} />
      <span className="text-sm">{volume}%</span>
      <Button type="primary" shape="circle" icon={isMuted ? <MutedOutlined /> : <SoundOutlined />} onClick={onToggleMute} />
    </>
  );
}

export default VolumeControl;
