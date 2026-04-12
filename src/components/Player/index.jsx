import { useSelector, useDispatch } from "react-redux";
import MediaPlayer from "./MediaPlayer";
import PlayButton from "./PlayButton";
import ProgressBar from "./ProgressBar";
import VolumeControl from "./VolumeControl";
import PlaybackRateSelector from "./PlaybackRateSelector";
import RepeatButton from "./RepeatButton";
import SeekButtons from "./SeekButtons";
import { playPause, setTime, changeVolume, toggleMute, setPlaybackRate, nextRepeatMode, seekForward, seekBackward } from "../../redux/slices/playerSlice";

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
    <div className="relative overflow-hidden rounded-2xl bg-linear-to-br from-indigo-900/95 via-purple-900/90 to-slate-900/95 shadow-2xl shadow-indigo-500/20 backdrop-blur-3xl ring-1 ring-white/10">
      <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-purple-500/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-indigo-500/20 blur-3xl" />
      <MediaPlayer>
        <div className="relative space-y-4 p-5">
          {/* Строка 1: Прогресс-бар + время */}
          <div className="mx-1 flex items-center gap-3">
            <ProgressBar currentTime={currentTime} maxTime={maxTime} onTimeChange={(value) => dispatch(setTime(value))} />
          </div>
          {/* Строка 2: Play/Pause + громкость + скорость + повтор + перемотка */}
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-3">
              <PlayButton isPlaying={isPlaying} onClick={() => dispatch(playPause())} />
              <SeekButtons onSeekBackward={() => dispatch(seekBackward(15))} onSeekForward={() => dispatch(seekForward(15))} />
              <VolumeControl volume={volume} isMuted={isMuted} onVolumeChange={(value) => dispatch(changeVolume(value))} onToggleMute={() => dispatch(toggleMute())} />
            </div>
            <div className="flex items-center gap-3">
              <PlaybackRateSelector playbackRate={playbackRate} onPlaybackRateChange={(value) => dispatch(setPlaybackRate(value))} />
              <RepeatButton repeatMode={repeatMode} onNextRepeatMode={() => dispatch(nextRepeatMode())} />
            </div>
          </div>
        </div>
      </MediaPlayer>
    </div>
  );
}

export default Player;
