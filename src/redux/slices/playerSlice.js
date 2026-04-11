import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isPlaying: false,
  currentTime: 0,
  maxTime: 180,
  volume: 50,
  isMuted: false,
  previousVolume: 50,
  playbackRate: 1.0,
  repeatMode: 'none',
  // src: 'https://www.youtube.com/watch?v=mqgEYRtWMJU',
  // src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
  src: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
};

const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    playPause: (state) => {
      state.isPlaying = !state.isPlaying;
    },
    setIsPlaying: (state, action) => {
      state.isPlaying = action.payload;
    },
    setTime: (state, action) => {
      if (action.payload < 0) state.currentTime = 0;
      else if (action.payload > state.maxTime) state.currentTime = state.maxTime;
      else state.currentTime = action.payload;
    },
    changeVolume: (state, action) => {
      if (action.payload < 0) state.volume = 0;
      else if (action.payload > 100) state.volume = 100;
      else state.volume = action.payload;

      if (state.volume > 0) {
        state.isMuted = false;
      }
    },
    toggleMute: (state) => {
      if (state.isMuted) {
        state.volume = state.previousVolume;
        state.isMuted = false;
      } else {
        state.previousVolume = state.volume;
        state.volume = 0;
        state.isMuted = true;
      }
    },
    setPlaybackRate: (state, action) => {
      const allowedRates = [0.5, 0.75, 1.0, 1.25, 1.5];
      if (allowedRates.includes(action.payload)) {
        state.playbackRate = action.payload;
      }
    },
    nextRepeatMode: (state) => {
      const modes = ['none', 'one', 'all'];
      const currentIndex = modes.indexOf(state.repeatMode);
      state.repeatMode = modes[(currentIndex + 1) % modes.length];
    },
    seekForward: (state, action) => {
      state.currentTime = Math.min(state.currentTime + action.payload, state.maxTime);
    },
    seekBackward: (state, action) => {
      state.currentTime = Math.max(state.currentTime - action.payload, 0);
    },
    setMaxTime: (state, action) => {
      state.maxTime = action.payload;
    },
  },
});

export const {
  playPause,
  setIsPlaying,
  setTime,
  changeVolume,
  toggleMute,
  setPlaybackRate,
  nextRepeatMode,
  seekForward,
  seekBackward,
  setMaxTime,
} = playerSlice.actions;
export default playerSlice.reducer;
