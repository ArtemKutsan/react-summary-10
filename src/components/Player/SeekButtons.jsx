import { useSelector } from "react-redux";
import { Button } from "antd";
import { FastBackwardOutlined, FastForwardOutlined } from "@ant-design/icons";
import { usePlayerSeek } from "./AudioPlayer";

function SeekButtons({ seekTime = 15 }) {
  const seekTo = usePlayerSeek();
  const currentTime = useSelector((state) => state.player.currentTime);
  const maxTime = useSelector((state) => state.player.maxTime);

  const handleBackward = () => {
    seekTo(Math.max(currentTime - seekTime, 0));
  };

  const handleForward = () => {
    seekTo(Math.min(currentTime + seekTime, maxTime));
  };

  return (
    <div className="flex items-center gap-2">
      <Button type="primary" shape="circle" icon={<FastBackwardOutlined />} onClick={handleBackward} />
      <Button type="primary" shape="circle" icon={<FastForwardOutlined />} onClick={handleForward} />
    </div>
  );
}

export default SeekButtons;
