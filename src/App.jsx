import "./App.css";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Input } from "antd";
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
    <main className="py-8">
      <div className="prose container max-w-4xl">
        <h1>React Summary 10</h1>
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
  );
}

export default App;
