import { useSelector, useDispatch } from "react-redux";
import { playPause, setTime } from "../redux/slices/playerSlice";

function Player() {
  const isPlaying = useSelector((state) => state.player.isPlaying);
  const currentTime = useSelector((state) => state.player.currentTime);
  const maxTime = useSelector((state) => state.player.maxTime);
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
    </div>
  );
}

export default Player;
