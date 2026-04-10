import { Button } from "antd";
import { PlayCircleOutlined, PauseCircleOutlined } from "@ant-design/icons";

function PlayButton({ isPlaying, onClick }) {
  return (
    <Button type="primary" shape="circle" icon={isPlaying ? <PauseCircleOutlined /> : <PlayCircleOutlined />} onClick={onClick} />
  );
}

export default PlayButton;
