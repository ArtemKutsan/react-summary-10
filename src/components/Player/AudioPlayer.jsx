import { createContext, useContext, useRef, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import ReactPlayer from "react-player";
import { setTime, setMaxTime, setIsPlaying } from "../../redux/slices/playerSlice";

const PlayerContext = createContext(null);

export function usePlayerSeek() {
  return useContext(PlayerContext);
}

function AudioPlayer({ children }) {
  const dispatch = useDispatch();
  const playerRef = useRef(null);
  const lastTimeRef = useRef(0);

  const src = useSelector((state) => state.player.src);
  const isPlaying = useSelector((state) => state.player.isPlaying);
  const volume = useSelector((state) => state.player.volume);
  const isMuted = useSelector((state) => state.player.isMuted);
  const playbackRate = useSelector((state) => state.player.playbackRate);

  const handleTimeUpdate = useCallback(
    (event) => {
      const currentTime = Math.floor(event.target.currentTime);
      // Throttle
      if (Math.abs(currentTime - lastTimeRef.current) >= 1) {
        lastTimeRef.current = currentTime;
        dispatch(setTime(currentTime));
      }
    },
    [dispatch],
  );

  const handleDurationChange = useCallback(
    (event) => {
      dispatch(setMaxTime(Math.floor(event.target.duration)));
    },
    [dispatch],
  );

  const handlePlay = useCallback(() => {
    dispatch(setIsPlaying(true));
  }, [dispatch]);

  const handlePause = useCallback(() => {
    dispatch(setIsPlaying(false));
  }, [dispatch]);

  const seekTo = useCallback((time) => {
    if (playerRef.current && typeof time === "number") {
      playerRef.current.currentTime = time;
    }
  }, []);

  const isVideo = src.includes("youtube.com") || src.includes("youtu.be") || src.includes(".mp4") || src.includes("vimeo.com");

  return (
    <PlayerContext.Provider value={seekTo}>
      {isVideo && <ReactPlayer ref={playerRef} src={src} playing={isPlaying} volume={volume / 100} muted={isMuted} playbackRate={playbackRate} controls={false} onTimeUpdate={handleTimeUpdate} onDurationChange={handleDurationChange} onPlay={handlePlay} onPause={handlePause} width="100%" height="300px" />}
      {!isVideo && <ReactPlayer ref={playerRef} src={src} playing={isPlaying} volume={volume / 100} muted={isMuted} playbackRate={playbackRate} onTimeUpdate={handleTimeUpdate} onDurationChange={handleDurationChange} style={{ display: "none" }} />}
      {children}
    </PlayerContext.Provider>
  );
}

export default AudioPlayer;
