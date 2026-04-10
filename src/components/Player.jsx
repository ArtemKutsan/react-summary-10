import { useSelector, useDispatch } from "react-redux";
import { playPause } from "../redux/slices/playerSlice";

function Player() {
  const isPlaying = useSelector((state) => state.player.isPlaying);
  const dispatch = useDispatch();

  return (
    <div>
      <h2>Player</h2>
      <button className="button-primary" onClick={() => dispatch(playPause())}>
        {isPlaying ? "Pause" : "Play"}
      </button>
    </div>
  );
}

export default Player;
