import { Button } from "antd";
import { FastBackwardOutlined, FastForwardOutlined } from "@ant-design/icons";

function SeekButtons({ onSeekBackward, onSeekForward }) {
  return (
    <>
      <Button type="primary" shape="circle" icon={<FastBackwardOutlined />} onClick={onSeekBackward} />
      <Button type="primary" shape="circle" icon={<FastForwardOutlined />} onClick={onSeekForward} />
    </>
  );
}

export default SeekButtons;
