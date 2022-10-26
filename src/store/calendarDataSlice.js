import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  calendar: { year: 0, month: 0, date: 0, day: 0 },
  yearList: [],
  yearChange: false,
  today: { year: 0, month: 0, date: 0, day: 0 },
};
// const initialState = { calendar: 0 };

export const calendarDataSlice = createSlice({
  name: 'calendarData',
  initialState,
  reducers: {
    setToday(state, action) {
      state.today = action.payload.calendar;
    },

    setCalendar(state, action) {
      state.calendar = action.payload.calendar;
      console.log(
        'FULL_DATE:' +
          action.payload.calendar.year +
          '/' +
          action.payload.calendar.month +
          '/' +
          action.payload.calendar.date
      );
    },
    setYear(state, action) {
      state.calendar.year = action.payload.year;
      console.log('YEAR:' + action.payload.year);
    },
    setMonth(state, action) {
      state.calendar.month = action.payload.month;
      console.log('MONTH!!!:' + action.payload.month);
    },
    setYearList(state, action) {
      state.yearList.push(action.payload.yearList);
      // console.log('YearList!!!:' + action.payload.yearList);
    },
    yearListChecked(state, action) {
      state.yearChange = action.payload.isChecked;
      console.log('checked:' + action.payload.isChecked);
    },
  },
});

export const setCalendarAction = calendarDataSlice.actions;
export default calendarDataSlice.reducer;
