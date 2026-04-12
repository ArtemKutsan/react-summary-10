import "./App.css";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Input, ConfigProvider, theme } from "antd";
import Player from "./components/Player";
import { setSrc } from "./redux/slices/playerSlice";

function App() {
  const dispatch = useDispatch();
  const currentSrc = useSelector((state) => state.player.src);
  const [inputValue, setInputValue] = useState(currentSrc);

  const handleSrcChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSrcSubmit = () => {
    if (inputValue.trim()) {
      dispatch(setSrc(inputValue.trim()));
    }
  };

  return (
    <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm,
        token: {
          colorPrimary: "#a855f7",
          colorBgContainer: "rgba(255,255,255,0.08)",
          colorBorder: "rgba(255,255,255,0.15)",
          colorText: "#e2e8f0",
          borderRadius: 8,
        },
        components: {
          Button: {
            colorPrimary: "#a855f7",
            algorithm: true,
          },
          Slider: {
            trackBg: "linear-gradient(to right, #a855f7, #6366f1)",
            trackHoverBg: "linear-gradient(to right, #c084fc, #818cf8)",
            handleColor: "#a855f7",
            handleActiveColor: "#c084fc",
            railColor: "rgba(255,255,255,0.2)",
            railHoverColor: "rgba(255,255,255,0.3)",
          },
          Input: {
            colorBgContainer: "rgba(255,255,255,0.08)",
            colorBorder: "rgba(255,255,255,0.15)",
            colorTextPlaceholder: "rgba(255,255,255,0.35)",
          },
          Select: {
            colorBgContainer: "rgba(255,255,255,0.08)",
            colorBorder: "rgba(255,255,255,0.15)",
            colorText: "#e2e8f0",
          },
        },
      }}
    >
      <main className="py-8">
        <div className="prose container max-w-4xl">
          <h1 className="text-white">React Summary 10</h1>
          <div className="not-prose mb-4">
            <Input
              value={inputValue}
              onChange={handleSrcChange}
              onPressEnter={handleSrcSubmit}
              onBlur={handleSrcSubmit}
              placeholder="Вставьте URL медиа-файла (.mp3, .mp4, .webm)"
              allowClear
            />
          </div>
          <div className="not-prose">
            <Player />
          </div>
        </div>
      </main>
    </ConfigProvider>
  );
}

export default App;
