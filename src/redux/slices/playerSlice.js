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
  reducers: {},
});

export const {} = playerSlice.actions;
export default playerSlice.reducer;
