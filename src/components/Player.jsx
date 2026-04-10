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
    <div className="rounded-xl border border-gray-200 bg-linear-to-b from-white to-gray-100 p-4">
      {/* Строка 1: Play/Pause + прогресс-бар + время */}
      <div className="flex items-center gap-4">
        <Button type="primary" shape="circle" icon={isPlaying ? <PauseCircleOutlined /> : <PlayCircleOutlined />} onClick={() => dispatch(playPause())} />
        <span className="w-10 text-right text-sm">{formatTime(currentTime)}</span>
        <Slider className="flex-1" min={0} max={maxTime} value={currentTime} onChange={(value) => dispatch(setTime(value))} tooltip={{ formatter: (value) => formatTime(value) }} />
        <span className="w-10 text-sm">{formatTime(maxTime)}</span>
      </div>

      {/* Строка 2: Громкость + скорость + повтор + перемотка */}
      <div className="mt-2 flex flex-wrap items-center gap-4">
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
