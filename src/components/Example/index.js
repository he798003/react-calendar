import React, { useState, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import calendarDataSlice, { setCalendarAction } from '../../store/calendarDataSlice';

import './index.scss';

export default function Example() {
  const dispatch = useDispatch();
  const list = useSelector((state) => state.calendarData.calendar);
  const today = useSelector((state) => state.calendarData.today);
  const yearList = useSelector((state) => state.calendarData.yearList);
  const isChecked = useSelector((state) => state.calendarData.yearChange);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  // let today = { year: 0, month: 0, date: 0, day: 0 };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  // let calendar = { year: 0, month: 0, date: 0, day: 0 };

  // const [calendar, setCalendar] = useState({ year: 0, month: 0, date: 0, day: 0 });
  // const [today, setToday] = useState({ year: 0, month: 0, date: 0, day: 0 });

  // useEffect(() => {
  //   const date = new Date();
  //   today.year = calendar.year = date.getFullYear();
  //   today.month = calendar.month = date.getMonth();
  //   today.date = calendar.date = date.getDate();
  //   today.day = calendar.day = date.getDay();
  // }, [calendar, today]);

  // 今日
  // const [today, setToday] = useState({
  //   year: 0,
  //   month: 0,
  //   date: 0,
  //   day: 0,
  // });
  // 日曆
  // const [calendar, setCalendar] = useState({
  //   year: 0,
  //   month: 0,
  //   date: 0,
  //   day: 0,
  // });

  // useEffect(() => {
  //   const date = new Date();
  //   setCalendar((calendar) => ({
  //     ...calendar,
  //     year: date.getFullYear(),
  //     month: date.getMonth(), // 0~11
  //     date: date.getDate(),
  //     day: date.getDay(),
  //   }));
  //   console.log(3);
  // }, []);

  let ary5 = [];
  let ary4 = [];
  for (let i = 0; i < 6; i++) {
    ary5[i] = i;
  }
  for (let i = 0; i < 7; i++) {
    ary4[i] = i;
  }

  // const [monthFirst, setMonthFirst] = useState({ year: 0, month: 0, date: 0, day: 0 });

  // eslint-disable-next-line react-hooks/exhaustive-deps

  // useEffect(() => {
  //   const getMonthFirstDay = () => {
  //     let date = new Date(calendar.year, calendar.month, 1);
  //     setMonthFirst((firstDay) => ({
  //       ...firstDay,
  //       year: date.getFullYear(),
  //       month: date.getMonth(), // 0~11
  //       date: date.getDate(),
  //       day: date.getDay(),
  //     }));
  //   };

  //   getMonthFirstDay();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);
  const [calendarFirstDay, setCalendarFirstDay] = useState({ year: 0, month: 0, date: 0, day: 0 });

  // eslint-disable-next-line react-hooks/exhaustive-deps

  useEffect(() => {
    const getCalendarFirstDay = () => {
      let mDate = new Date(list.year, list.month - 1, 1);
      let date = new Date(list.year, list.month - 1, 1 - mDate.getDay());

      let firstDay = {
        year: date.getFullYear(),
        month: date.getMonth(), // 0~11
        date: date.getDate(),
        day: date.getDay(),
      };
      console.log(firstDay, 123);
      setCalendarFirstDay((calendarFirstDay) => ({
        ...calendarFirstDay,
        ...firstDay,
      }));
      console.log(mDate, date, firstDay);
    };
    getCalendarFirstDay();
  }, [list.month, list.year]);

  const [calendarMonthDay, setCalendarMonthDay] = useState([]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    const calendarMonth = () => {
      let date;
      let temp = [];
      for (let i = 0; i < 42; i++) {
        date = new Date(calendarFirstDay.year, calendarFirstDay.month, calendarFirstDay.date + i);
        temp.push({
          year: date.getFullYear(),
          month: date.getMonth() + 1, // 0~11
          date: date.getDate(),
          day: date.getDay(),
        });
      }

      setCalendarMonthDay((calendarMonthDay) => {
        return (calendarMonthDay = temp);
      });
    };
    calendarMonth();
  }, [calendarFirstDay.date, calendarFirstDay.month, calendarFirstDay.year]);

  // useEffect(() => {
  //   console.log(calendarMonthDay.length > 0 ? calendarMonthDay[0].month : '', 666, calendarMonthDay.length);
  // }, [calendarMonthDay]);

  let rows = ary5.map((row, a) => {
    return (
      <div className="week col" key={a}>
        {ary4.map((colum, b) => {
          return (
            <div
              className={`day row ${
                calendarMonthDay[a * 7 + b]?.month !== list.month
                  ? 'other'
                  : calendarMonthDay[a * 7 + b]?.year === today.year &&
                    calendarMonthDay[a * 7 + b]?.month === today.month &&
                    calendarMonthDay[a * 7 + b]?.date === today.date
                  ? 'dateNow'
                  : ''
              }`}
              key={b}
              data-date={`${calendarMonthDay[a * 7 + b]?.date}`}
            >
              {calendarMonthDay[a * 7 + b]?.date}
            </div>
          );
        })}
      </div>
    );
  });
  useEffect(() => {
    console.log(today.year);
  }, [today.year]);
  // 將所選年.月傳至store
  const setYearHandler = (e) => {
    dispatch(setCalendarAction.setYear({ year: e.target.innerText * 1 }));
    dispatch(setCalendarAction.yearListChecked({ isChecked: !isChecked }));
  };

  let yearCols = [];
  let yearRows = [];
  for (let i = 0; i < 7; i++) {
    yearCols[i] = i;
  }
  for (let i = 0; i < 3; i++) {
    yearRows[i] = i;
  }

  let yearListComponent = yearCols.map((col, colIndex) => {
    return (
      <div className="yearCol col" key={colIndex}>
        {yearRows.map((row, rowIndex) => {
          return (
            <div
              onClick={(e) => setYearHandler(e)}
              className={`yearRow row`}
              key={rowIndex}
              data-date={`${yearList.length > 1 ? yearList[colIndex * 3 + rowIndex] : ''}`}
            >
              {yearList.length > 1 ? yearList[colIndex * 3 + rowIndex] : ''}
            </div>
          );
        })}
      </div>
    );
  });
  console.log(rows);
  console.log(yearList);

  return (
    <div className="mainDate">
      {
        <>
          {/* <h1>
            {list.year}年{list.month}月{list.date}日
          </h1> */}
          <div className="calendar">
            <div className="weekDayHead">
              <div className="weekDay" style={{ display: isChecked ? 'none' : '' }}>
                <div>SUN</div>
                <div>MON</div>
                <div>TUE</div>
                <div>WED</div>
                <div>THU</div>
                <div>FRI</div>
                <div>SAT</div>
              </div>
            </div>
            {!isChecked ? rows : yearListComponent}
          </div>
        </>
      }
    </div>
  );
}
