import { Button } from "antd";
import { RetweetOutlined } from "@ant-design/icons";

function RepeatButton({ repeatMode, onNextRepeatMode }) {
  const isActive = repeatMode !== "none";
  return (
    <>
      <Button
        type={isActive ? "primary" : "text"}
        shape="circle"
        icon={<RetweetOutlined className="text-lg" />}
        onClick={onNextRepeatMode}
        className="transition-all duration-200 hover:scale-110 active:scale-95"
      />
      <span className="min-w-10 text-sm text-white/60">
        {repeatMode === "none" ? "Нет" : repeatMode === "one" ? "Один" : "Все"}
      </span>
    </>
  );
}

export default RepeatButton;
