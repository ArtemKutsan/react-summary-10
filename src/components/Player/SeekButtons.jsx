import { Button } from "antd";
import { FastBackwardOutlined, FastForwardOutlined } from "@ant-design/icons";

function SeekButtons({ onSeekBackward, onSeekForward }) {
  return (
    <>
      <Button
        type="text"
        shape="circle"
        icon={<FastBackwardOutlined />}
        onClick={onSeekBackward}
        className="transition-all duration-200 hover:scale-110 active:scale-95"
      />
      <Button
        type="text"
        shape="circle"
        icon={<FastForwardOutlined />}
        onClick={onSeekForward}
        className="transition-all duration-200 hover:scale-110 active:scale-95"
      />
    </>
  );
}

export default SeekButtons;
