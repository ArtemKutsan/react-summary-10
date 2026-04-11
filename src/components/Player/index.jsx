import { useSelector, useDispatch } from "react-redux";
import AudioPlayer from "./AudioPlayer";
import PlayButton from "./PlayButton";
import ProgressBar from "./ProgressBar";
import VolumeControl from "./VolumeControl";
import PlaybackRateSelector from "./PlaybackRateSelector";
import RepeatButton from "./RepeatButton";
import SeekButtons from "./SeekButtons";
import { playPause, changeVolume, toggleMute, setPlaybackRate, nextRepeatMode } from "../../redux/slices/playerSlice";

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
      <AudioPlayer>
        <div className="space-y-2 bg-linear-to-b from-purple-100 to-indigo-100 p-4">
          {/* Строка 1: Прогресс-бар + время */}
          <ProgressBar currentTime={currentTime} maxTime={maxTime} />

          {/* Строка 2: Play/Pause + громкость + скорость + повтор + перемотка */}
          <div className="flex flex-wrap items-center gap-2">
            <PlayButton isPlaying={isPlaying} onClick={() => dispatch(playPause())} />
            <SeekButtons seekTime={15} />
            <VolumeControl volume={volume} isMuted={isMuted} onVolumeChange={(value) => dispatch(changeVolume(value))} onToggleMute={() => dispatch(toggleMute())} />
            <PlaybackRateSelector playbackRate={playbackRate} onPlaybackRateChange={(value) => dispatch(setPlaybackRate(value))} />
            <RepeatButton repeatMode={repeatMode} onNextRepeatMode={() => dispatch(nextRepeatMode())} />
          </div>
        </div>
      </AudioPlayer>
    </div>
  );
}

export default Player;
