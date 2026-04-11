import { useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setTime, setMaxTime, setIsPlaying } from "../../redux/slices/playerSlice";

function MediaPlayer({ children }) {
  const dispatch = useDispatch();
  const mediaRef = useRef(null);
  // console.log(mediaRef.current);

  const src = useSelector((state) => state.player.src);
  const isPlaying = useSelector((state) => state.player.isPlaying);
  const currentTime = useSelector((state) => state.player.currentTime);
  const volume = useSelector((state) => state.player.volume);
  const isMuted = useSelector((state) => state.player.isMuted);
  const playbackRate = useSelector((state) => state.player.playbackRate);
  const repeatMode = useSelector((state) => state.player.repeatMode);

  // Определяем тип медиа по расширению файла
  const isVideo = src.endsWith(".mp4") || src.endsWith(".webm");

  // 1. Play/Pause
  useEffect(() => {
    if (!mediaRef.current) return;
    if (isPlaying) {
      mediaRef.current.play().catch(() => {});
    } else {
      mediaRef.current.pause();
    }
  }, [isPlaying]);

  // 2. Volume
  useEffect(() => {
    if (mediaRef.current) {
      mediaRef.current.volume = volume / 100;
    }
  }, [volume]);

  // 2.1 Mute
  useEffect(() => {
    if (mediaRef.current) {
      mediaRef.current.muted = isMuted;
    }
  }, [isMuted]);

  // 2.2 Playback Rate
  useEffect(() => {
    if (mediaRef.current) {
      mediaRef.current.playbackRate = playbackRate;
    }
  }, [playbackRate]);

  // 2.3 Repeat (Loop)
  useEffect(() => {
    if (mediaRef.current) {
      // 'one' и 'all' включают зацикливание, 'none' выключает
      mediaRef.current.loop = repeatMode !== "none";
    }
  }, [repeatMode]);

  // 3. Seek (перемотка)
  useEffect(() => {
    if (mediaRef.current && mediaRef.current.duration) {
      // Если отличие больше 0.5 сек — значит это перемотка пользователем
      if (Math.abs(mediaRef.current.currentTime - currentTime) > 0.5) {
        mediaRef.current.currentTime = currentTime;
      }
    }
  }, [currentTime]);

  // 4. Синхронизация Redux -> из событий элемента
  const handleTimeUpdate = () => {
    if (mediaRef.current) {
      dispatch(setTime(Math.floor(mediaRef.current.currentTime)));
    }
  };

  const handleLoadedMetadata = () => {
    if (mediaRef.current) {
      dispatch(setMaxTime(Math.floor(mediaRef.current.duration)));
    }
  };

  const handleEnded = () => {
    dispatch(setIsPlaying(false));
  };

  if (isVideo) {
    return (
      <>
        <video ref={mediaRef} src={src} onTimeUpdate={handleTimeUpdate} onLoadedMetadata={handleLoadedMetadata} onEnded={handleEnded} className="my-0 max-h-80 w-full bg-black" />
        {children}
      </>
    );
  }

  return (
    <>
      <audio ref={mediaRef} src={src} onTimeUpdate={handleTimeUpdate} onLoadedMetadata={handleLoadedMetadata} onEnded={handleEnded} style={{ display: "none" }} />
      {children}
    </>
  );
}

export default MediaPlayer;
