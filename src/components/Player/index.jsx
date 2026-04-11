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
    <MediaPlayer>
      <div className="rounded-xl border border-gray-200 bg-linear-to-b from-white to-blue-50 p-4">
        {/* Строка 1: Play/Pause + прогресс-бар + время */}
        <div className="flex items-center gap-4">
          <PlayButton isPlaying={isPlaying} onClick={() => dispatch(playPause())} />
          <ProgressBar currentTime={currentTime} maxTime={maxTime} onTimeChange={(value) => dispatch(setTime(value))} />
        </div>

        {/* Строка 2: Громкость + скорость + повтор + перемотка */}
        <div className="mt-2 flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2">
            <VolumeControl volume={volume} isMuted={isMuted} onVolumeChange={(value) => dispatch(changeVolume(value))} onToggleMute={() => dispatch(toggleMute())} />
          </div>

          <span className="text-gray-200">|</span>

          <PlaybackRateSelector playbackRate={playbackRate} onPlaybackRateChange={(value) => dispatch(setPlaybackRate(value))} />

          <span className="text-gray-200">|</span>

          <div className="flex items-center gap-2">
            <RepeatButton repeatMode={repeatMode} onNextRepeatMode={() => dispatch(nextRepeatMode())} />
          </div>

          <span className="text-gray-200">|</span>

          <div className="flex items-center gap-2">
            <SeekButtons onSeekBackward={() => dispatch(seekBackward(15))} onSeekForward={() => dispatch(seekForward(15))} />
          </div>
        </div>
      </div>
    </MediaPlayer>
  );
}

export default Player;
