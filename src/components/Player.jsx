import { useSelector, useDispatch } from "react-redux";
import { PlayCircleOutlined, PauseCircleOutlined, SoundOutlined, MutedOutlined, FastBackwardOutlined, FastForwardOutlined, RetweetOutlined } from "@ant-design/icons";
import { Button, Select, Slider } from "antd";
import { playPause, setTime, changeVolume, toggleMute, setPlaybackRate, nextRepeatMode, seekForward, seekBackward } from "../redux/slices/playerSlice";

function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}

function Player() {
  const isPlaying = useSelector((state) => state.player.isPlaying);
  const currentTime = useSelector((state) => state.player.currentTime);
  const maxTime = useSelector((state) => state.player.maxTime);
  const volume = useSelector((state) => state.player.volume);
  const isMuted = useSelector((state) => state.player.isMuted);
  const playbackRate = useSelector((state) => state.player.playbackRate);
  const repeatMode = useSelector((state) => state.player.repeatMode);

  const dispatch = useDispatch();

  return (
    <div className="flex flex-col gap-2 rounded-lg border border-gray-300 bg-white p-4">
      {/* Строка 1: Play/Pause + статус */}
      <div className="flex items-center justify-between">
        <Button type="primary" shape="circle" icon={isPlaying ? <PauseCircleOutlined /> : <PlayCircleOutlined />} onClick={() => dispatch(playPause())} />
        <span className="text-sm text-gray-600">{isPlaying ? "Воспроизведение" : "Остановлено"}</span>
      </div>

      {/* Строка 2: Прогресс-бар */}
      <div className="flex items-center gap-3">
        <span className="w-10 text-right text-sm">{formatTime(currentTime)}</span>
        <Slider className="flex-1" min={0} max={maxTime} value={currentTime} onChange={(value) => dispatch(setTime(value))} tooltip={{ formatter: (value) => formatTime(value) }} />
        <span className="w-10 text-sm">{formatTime(maxTime)}</span>
      </div>

      {/* Строка 3: Громкость + скорость + повтор + перемотка */}
      <div className="flex flex-wrap items-center gap-4">
        {/* Громкость */}
        <div className="flex items-center gap-2">
          <Slider className="w-20" min={0} max={100} value={volume} onChange={(value) => dispatch(changeVolume(value))} tooltip={{ formatter: (value) => `${value}%` }} />
          <span className="text-sm">{volume}%</span>
          <Button type="primary" shape="circle" icon={isMuted ? <MutedOutlined /> : <SoundOutlined />} onClick={() => dispatch(toggleMute())} />
        </div>

        {/* Разделитель */}
        <span className="text-gray-300">|</span>

        {/* Скорость */}
        <Select
          className="w-20"
          value={playbackRate}
          onChange={(value) => dispatch(setPlaybackRate(value))}
          options={[
            { value: 0.5, label: "0.5x" },
            { value: 0.75, label: "0.75x" },
            { value: 1.0, label: "1.0x" },
            { value: 1.25, label: "1.25x" },
            { value: 1.5, label: "1.5x" },
          ]}
        />

        {/* Разделитель */}
        <span className="text-gray-300">|</span>

        {/* Повтор */}
        <div className="flex items-center gap-2">
          <Button type="primary" shape="circle" icon={<RetweetOutlined />} onClick={() => dispatch(nextRepeatMode())} />
          <span className="text-sm">{repeatMode === "none" ? "Нет" : repeatMode === "one" ? "Один" : "Все"}</span>
        </div>

        {/* Разделитель */}
        <span className="text-gray-300">|</span>

        {/* Перемотка */}
        <div className="flex items-center gap-2">
          <Button type="primary" shape="circle" icon={<FastBackwardOutlined />} onClick={() => dispatch(seekBackward(15))} />
          <Button type="primary" shape="circle" icon={<FastForwardOutlined />} onClick={() => dispatch(seekForward(15))} />
        </div>
      </div>
    </div>
  );
}

export default Player;
