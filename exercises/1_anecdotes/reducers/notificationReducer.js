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

export const setNotification = (text, timeout) => {
  return async (dispatch) => {
    dispatch(showNotification(text));
    setTimeout(() => {
      dispatch(hideNotification());
    }, 1000 * timeout);
  };
};

export default notificationSlice.reducer;
