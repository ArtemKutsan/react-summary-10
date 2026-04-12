import { Button } from "antd";
import { PlayCircleOutlined, PauseCircleOutlined } from "@ant-design/icons";

function PlayButton({ isPlaying, onClick }) {
  return (
    <Button
      type="primary"
      shape="circle"
      size="large"
      icon={
        <span className="text-lg">
          {isPlaying ? <PauseCircleOutlined /> : <PlayCircleOutlined />}
        </span>
      }
      onClick={onClick}
      className="transition-all duration-200 hover:scale-110 hover:shadow-lg active:scale-95"
    />
  );
}

export default PlayButton;
