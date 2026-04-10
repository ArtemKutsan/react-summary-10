import { Button } from "antd";
import { RetweetOutlined } from "@ant-design/icons";

function RepeatButton({ repeatMode, onNextRepeatMode }) {
  return (
    <>
      <Button type="primary" shape="circle" icon={<RetweetOutlined />} onClick={onNextRepeatMode} />
      <span className="text-sm">{repeatMode === "none" ? "Нет" : repeatMode === "one" ? "Один" : "Все"}</span>
    </>
  );
}

export default RepeatButton;
