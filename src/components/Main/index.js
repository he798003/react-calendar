import React, { useState, useEffect } from 'react';
import { AiOutlineRight, AiOutlineLeft } from 'react-icons/ai';

import { useDispatch, useSelector } from 'react-redux';
import calendarDataSlice, { setCalendarAction } from '../../store/calendarDataSlice';

import './index.scss';

export default function Main() {
  // redux
  const dispatch = useDispatch();
  const list = useSelector((state) => state.calendarData.calendar);
  const isChecked = useSelector((state) => state.calendarData.yearChange);

  // 年份選單
  const [yearList, setYearList] = useState([]);
  // 月份選單
  const [monthList, setMonthList] = useState([]);
  // 當前年份
  const nowYear = new Date().getFullYear();
  // 當前月份
  const nowMonth = new Date().getMonth() + 1;

  // 月份對照表
  const monthsMap = {
    1: 'January',
    2: 'February',
    3: 'March',
    4: 'April',
    5: 'May',
    6: 'June',
    7: 'July',
    8: 'August',
    9: 'September',
    10: 'October',
    11: 'November',
    12: 'December',
  };

  // 設定當前年月份
  // const [year, setYear] = useState(nowYear);
  // const [month, setMonth] = useState(nowMonth);

  const [calendar, setCalendar] = useState({
    year: 0,
    month: 0,
    date: 0,
    day: 0,
  });

  // let defaultFirstDay = new Date(nowYear, nowMonth - 1, 1).getDay();
  // let defaultLastDay = function () {
  //   let d = new Date(year, month - 1, 1);
  //   d.setMonth(d.getMonth() + 1);
  //   d.setDate(0);
  //   return d.getDate();
  // };

  // const [first, setFirst] = useState(defaultFirstDay);
  // const [last, setLast] = useState(defaultLastDay);
  const [yearListTest, setYearListTest] = useState([]);

  // 以當前年份為中心，取出前後10年
  const getYears = () => {
    for (let i = nowYear - 10; i <= nowYear + 10; i++) {
      // setYearList((list) => {
      //   return [...list, i];
      // });
      // setYearListTest((list) => {
      //   return [...list, { year: i }];
      // });
      dispatch(setCalendarAction.setYearList({ yearList: i }));
    }
  };

  // 取出1~12月份
  const getMonths = () => {
    for (let i = 1; i <= 12; i++) {
      setMonthList((list) => {
        return [...list, i];
      });
    }
  };

  // *useCallback
  useEffect(() => {
    getYears();
    getMonths();
  }, []);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  // const getFirstDay = (year, month) => {
  //   let day = new Date(year, month - 1, 1).getDay();
  //   setFirst(day);
  // };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  // const getLastDate = (year, month) => {
  //   let d = new Date(year, month - 1, 1);
  //   d.setMonth(d.getMonth() + 1);
  //   d.setDate(0);
  //   setLast(d.getDate());
  // };
  // let ary1 = [];
  // let ary2 = [];
  // let ary3 = [];
  // let ary4 = [];
  // let ary5 = [];

  // let index = 1;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  // let index = 1;
  // for (let rows = 0; rows < 6; rows++) {
  // for (let cells = 0; cells < 7; cells++) {
  //   html.push(<td>{index}</td>);
  //   console.log(index);
  //   index++;
  // }
  // }
  // for (let i = 0; i < first; i++) {
  //   ary1[i] = i;
  // }
  // for (let i = 0; i < 7; i++) {
  //   ary4[i] = i;
  // }
  // for (let i = 0; i < 6; i++) {
  //   ary5[i] = i;
  // }
  // for (let i = 0; i < last; i++) {
  //   ary2[i] = i + 1;
  // }

  // for (let rows = 0; rows < 6; rows++) {
  //   // ary3[i] = <tr>{i + 1}</tr>;

  //   for (let cells = 0; cells < 7; cells++) {
  //     if (cells + rows * 7 >= first) {
  //       ary2[cells] = <td>{index}</td>;
  //       // ary3[rows] = <tr>{ary2}</tr>;
  //       index++;
  //     } else {
  //       ary2[cells] = <td></td>;
  //     }
  //   }
  //   console.log(ary2);
  //   ary3[rows] = <tr>{ary2}</tr>;
  // }

  // let node1;
  // let node2;
  // const calendar = () => {
  //   node1 = ary1.map(function (item) {
  //     return <li></li>;
  //   });
  //   node2 = ary2.map(function (item) {
  //     return <li>{item}</li>;
  //   });
  // };

  useEffect(() => {
    // 獲取當日年月日星期幾
    const date = new Date();
    setCalendar((calendar) => ({
      ...calendar,
      year: date.getFullYear(),
      month: date.getMonth() + 1, // 0~11
      date: date.getDate(),
      day: date.getDay(),
    }));
  }, []);

  useEffect(() => {
    dispatch(setCalendarAction.setCalendar({ calendar: calendar }));
    dispatch(setCalendarAction.setToday({ calendar: calendar }));
  }, [calendar, dispatch]);

  // useEffect(() => {
  //   // 將月份List設置當下月份
  //   monthList.forEach((month) => {
  //     if (month === nowMonth) {
  //       setMonth((val) => {
  //         // console.log(a);
  //         return (val = month);
  //       });
  //     }
  //   });
  //   // 將年份List設置當下年份
  //   yearList.forEach((year) => {
  //     if (year === nowYear) {
  //       setYear((val) => {
  //         // console.log(a);
  //         return (val = year);
  //       });
  //     }
  //   });
  //   // 傳至store
  // }, [nowYear, yearList, monthList, nowMonth]);

  // 將所選年.月傳至store
  // const setYearHandler = (e) => {
  //   dispatch(setCalendarAction.setYear({ year: e.target.value * 1 }));
  // };

  // const setMonthHandler = (e) => {
  //   dispatch(setCalendarAction.setMonth({ month: e.target.value * 1 }));
  // };

  const monthsControl = (num) => {
    let month = list.month;
    let year = list.year;
    let mark = (month += num);
    if (mark > 12) {
      dispatch(setCalendarAction.setMonth({ month: 1 }));
      dispatch(setCalendarAction.setYear({ year: year + 1 }));
    } else if (mark < 1) {
      dispatch(setCalendarAction.setMonth({ month: 12 }));
      dispatch(setCalendarAction.setYear({ year: year - 1 }));
    } else {
      dispatch(setCalendarAction.setMonth({ month: mark }));
    }
  };
  let yearSelectHandler = () => {
    dispatch(setCalendarAction.yearListChecked({ isChecked: !isChecked }));
  };

  return (
    <div className="main">
      <div className="header">
        <div className="month">
          <AiOutlineLeft className="left selectBtn" onClick={() => monthsControl(-1)} />
          <h1>{monthsMap[list.month]}</h1>
          <AiOutlineRight className="right selectBtn" onClick={() => monthsControl(1)} />
        </div>
        <div className="year">
          <h1 onClick={yearSelectHandler}>{list.year}</h1>
        </div>
      </div>
    </div>
  );
}
// {/* <select value={list.year} onChange={(e) => setYearHandler(e)}>
// {/* <select value={year} onChange={(e) => setYear(e.target.value)}> */}
// {yearList.map((year, index) => {
//   return (
//     <option value={year} key={index}>
//       {year}
//     </option>
//   );
// })}
// </select>
// <select value={list.month} onChange={(e) => setMonthHandler(e)}>
// {monthList.map((month, index) => {
//   return (
//     <option value={month} key={index}>
//       {month}
//     </option>
//   );
// })}
// </select> */}
