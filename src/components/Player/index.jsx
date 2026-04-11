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
    <div className="overflow-hidden rounded-3xl">
      <MediaPlayer>
        <div className="space-y-2 bg-linear-to-b from-purple-100 to-indigo-100 p-4">
          {/* Строка 1: Прогресс-бар + время */}
          <div className="mx-1 flex flex-wrap items-center gap-2">
            <ProgressBar currentTime={currentTime} maxTime={maxTime} onTimeChange={(value) => dispatch(setTime(value))} />
          </div>
          {/* Строка 2: Play/Pause + громкость + скорость + повтор + перемотка */}
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex grow items-center gap-2">
              <PlayButton isPlaying={isPlaying} onClick={() => dispatch(playPause())} />
              <SeekButtons onSeekBackward={() => dispatch(seekBackward(15))} onSeekForward={() => dispatch(seekForward(15))} />
              <VolumeControl volume={volume} isMuted={isMuted} onVolumeChange={(value) => dispatch(changeVolume(value))} onToggleMute={() => dispatch(toggleMute())} />
            </div>
            <div className="flex flex-wrap items-center gap-2">
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
