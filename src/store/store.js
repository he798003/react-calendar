import { configureStore } from '@reduxjs/toolkit';
import calendarDataSlice from './calendarDataSlice';

export const store = configureStore({
  reducer: {
    calendarData: calendarDataSlice,
  },
});
