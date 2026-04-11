import { Slider, Button } from "antd";
import { SoundOutlined, MutedOutlined } from "@ant-design/icons";

function VolumeControl({ volume, isMuted, onVolumeChange, onToggleMute }) {
  return (
    <div className="flex w-auto grow items-center gap-2">
      <Button type="primary" shape="circle" icon={isMuted ? <MutedOutlined /> : <SoundOutlined />} onClick={onToggleMute} />
      <Slider className="max-w-30 min-w-10 grow" min={0} max={100} value={volume} onChange={onVolumeChange} tooltip={{ formatter: (value) => `${value}%` }} />
      <span className="mr-1 text-sm">{volume}%</span>
    </div>
  );
}

export default VolumeControl;
