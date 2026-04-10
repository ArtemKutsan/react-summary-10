import { useSelector, useDispatch } from "react-redux";
import { playPause, setTime, changeVolume } from "../redux/slices/playerSlice";

function Player() {
  const isPlaying = useSelector((state) => state.player.isPlaying);
  const currentTime = useSelector((state) => state.player.currentTime);
  const maxTime = useSelector((state) => state.player.maxTime);
  const volume = useSelector((state) => state.player.volume);
  const isMuted = useSelector((state) => state.player.isMuted);
  const dispatch = useDispatch();

  return (
    <div className="flex flex-col gap-4 p-4">
      <h2 className="text-xl font-bold">Player</h2>
      <button className="button-primary" onClick={() => dispatch(playPause())}>
        {isPlaying ? "Pause" : "Play"}
      </button>
      <p>Статус: {isPlaying ? "Воспроизведение" : "Остановлено"}</p>
      <div className="flex items-center gap-4">
        <label>Время:</label>
        <input type="range" min={0} max={maxTime} value={currentTime} onChange={(event) => dispatch(setTime(Number(event.target.value)))} />
        <span>
          {currentTime} / {maxTime}
        </span>
      </div>
      <div className="flex items-center gap-4">
        <label>Громкость:</label>
        <input type="range" min={0} max={100} value={volume} onChange={(event) => dispatch(changeVolume(Number(event.target.value)))} />
        <span>
          {volume}% {isMuted && "(muted)"}
        </span>
      </div>
    </div>
  );
}

export default Player;
