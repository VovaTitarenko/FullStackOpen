import { createSlice } from '@reduxjs/toolkit';

const notificationSlice = createSlice({
  name: 'notifications',
  initialState: null,
  reducers: {
    showNotification(state, action) {
      return {
        timestamp: Date.now(),
        text: action.payload,
      };
    },
    hideNotification(state, action) {
      return null;
    },
  },
});

export const { showNotification, hideNotification } = notificationSlice.actions;
export default notificationSlice.reducer;
