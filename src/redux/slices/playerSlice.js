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
};

const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    playPause: (state) => {
      state.isPlaying = !state.isPlaying;
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

      if (state.volume === 0) {
        state.isMuted = true;
      } else if (state.isMuted) {
        state.isMuted = false;
      }
    },
  },
});

export const { playPause, setTime, changeVolume } = playerSlice.actions;
export default playerSlice.reducer;
