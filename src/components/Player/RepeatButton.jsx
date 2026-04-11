import { Button } from "antd";
import { RetweetOutlined } from "@ant-design/icons";

function RepeatButton({ repeatMode, onNextRepeatMode }) {
  return (
    <div className="flex items-center gap-2">
      <Button type="primary" shape="circle" icon={<RetweetOutlined />} onClick={onNextRepeatMode} />
      <span className="text-sm">{repeatMode === "none" ? "Нет" : repeatMode === "one" ? "Один" : "Все"}</span>
    </div>
  );
}

export default RepeatButton;
