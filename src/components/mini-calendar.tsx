import React, {useCallback, useEffect, useState} from 'react';
import {changeDate} from "../utils/changeDate";
import REST_JSON from "../assets/json/rest-data.json";
import {RestDataType} from "./Calendar";
import {
  Format,
  format,
  nextMonth,
  prevMonth,
  toEndOfMonth,
  toEndOfPrevMonth,
  toStartOfMonth,
  toStartOfNextMonth, whatDay
} from "../utils/DateUtil";
import {classStr} from "../utils/classStr";
import ONLY_REST from '../assets/json/only-rest-date.json';

type CalendarList = {
  dateNum: number,
  fullDate: string,
  isCurrentMonth: boolean,
  isHoliday: boolean,
  daysName?: string,
}

type SelectsDate = {
  startDt: string | null,
  endDt: string | null
}


const MiniCalendar = () => {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today);
  const [calendarList, setCalendarList] = useState<CalendarList[]>([]);

  const [selectsDate, setSelectDate] = useState<string[]>([]);

  useEffect(() => {
    // console.log(format(toStartOfNextMonth(currentMonth), Format.YYYY_MM_DD_HHmmss));
    const dayList = ['일', '월', '화', '수', '목', '금', '토'];
    const today1 = {
      year: currentMonth.getFullYear(),
      month: currentMonth.getMonth() + 1, //  1 ~ 12
      date: currentMonth.getDate(),
      day: currentMonth.getDay(), // 0 ~ 6
      ko: dayList[currentMonth.getDay()]
    };


    const firstDayOfThisMonth = toStartOfMonth(currentMonth);
    const lastDayOfThisMonth = toEndOfMonth(currentMonth);
    const lastDayOfPrevMonth = toEndOfPrevMonth(currentMonth);
    const firstDayOfNextMonth = toStartOfNextMonth(currentMonth);


    // 이번달 마지막 날은 언제?
    const thisMonthLast = {
      year: lastDayOfThisMonth.getFullYear(),
      month: lastDayOfThisMonth.getMonth() + 1,
      date: lastDayOfThisMonth.getDate(),
      day: lastDayOfThisMonth.getDay(),
      ko: dayList[lastDayOfThisMonth.getDay()]
    };

    // 이전 달에 대한 정보
    const prevMonthLast = {
      year: lastDayOfPrevMonth.getFullYear(),
      month: lastDayOfPrevMonth.getMonth() + 1,
      date: lastDayOfPrevMonth.getDate(),
      day: lastDayOfPrevMonth.getDay(),
      ko: dayList[lastDayOfPrevMonth.getDay()]
    };

    const nextMonthFirst = {
      year: firstDayOfNextMonth.getFullYear(),
      month: firstDayOfNextMonth.getMonth() + 1,
      date: firstDayOfNextMonth.getDate(),
      day: firstDayOfNextMonth.getDay(),
      ko: dayList[firstDayOfNextMonth.getDay()]
    };

    const tempList: CalendarList[] = [];

    // 이전달 내용 표시
    for (let i = firstDayOfThisMonth.getDay() - 1; i > -1; i--) {
      const prevMonthRemainDate = prevMonthLast.date - i;
      const date = changeDate(prevMonthLast.year, prevMonthLast.month, prevMonthRemainDate);
      const isHoliday = whatDay(date) === 0 || whatDay(date) === 6 || ONLY_REST["restDayList"].includes(date)
      tempList.push({
        dateNum: prevMonthRemainDate,
        fullDate: date,
        isCurrentMonth: false,
        isHoliday: isHoliday,
      });
    }

    // 이번달 내용 표시하기
    for (let i = 1; i < thisMonthLast.date + 1; i++) {
      const date = changeDate(today1.year, today1.month, i) as string;
      const isHoliday = whatDay(date) === 0 || whatDay(date) === 6 || ONLY_REST["restDayList"].includes(date)

      let temp: CalendarList = {
        dateNum: i,
        fullDate: date,
        isCurrentMonth: true,
        isHoliday: isHoliday,
      };

      tempList.push(temp);
    }

    // 다음달 내용 표시
    for (let i = thisMonthLast.day + 1; i < 7; i++) {
      const date = changeDate(nextMonthFirst.year, nextMonthFirst.month, i - thisMonthLast.day);
      const isHoliday = whatDay(date) === 0 || whatDay(date) === 6 || ONLY_REST["restDayList"].includes(date)
      tempList.push({
        dateNum: i - thisMonthLast.day,
        fullDate: date,
        isCurrentMonth: false,
        isHoliday: isHoliday,
      });
    }
    // console.log(tempList);
    setCalendarList(tempList);
  }, [currentMonth]);

  // 특정 일자에 맞게 클래스 변경해주는 함수
  const makeClassName = (value: CalendarList, dayofweekNum: number) => {
    const classArr: string[] = [value.fullDate];
    if (value.fullDate === format(today)) {
      classArr.push('today');
    }
    if (dayofweekNum === 6) {
      classArr.push('sat');
    }
    if (value.isHoliday) {
      classArr.push('holiday');
    }
    if (!value.isCurrentMonth) {
      classArr.push('notCurrent');
    }

    if (selectsDate.includes(value.fullDate)) {
      classArr.push('selected');
    }

    return classStr(classArr);
  };

  const clickDay = (e: React.MouseEvent) => {
    const target = e.target as Element;
    const targetDate = target.classList[0] as string;

    if (target.classList.contains('holiday')) {
      return;
    }

    setSelectDate(prev => {
      if (prev.includes(targetDate)) {
        return prev.filter(date => date !== targetDate);
      }

      return [...prev, targetDate];
    });
    console.log(targetDate);
    target.classList.toggle('selected');
  };

  const handleCurrentMonth = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    const target = e.currentTarget;
    if (target.name === "prev") {
      setCurrentMonth(prev => prevMonth(prev));
    } else if (target.name === "next") {
      setCurrentMonth(prev => nextMonth(prev));
    } else {
      console.error('잘못된 파라미터 입니다.');
    }


  }, [currentMonth]);

  return (
    <section className="mini-calendar">
      <div className="calendar__navi">
        <button
          name="prev"
          className="calendar__nav--previous p-2"
          onClick={handleCurrentMonth}
        >﹤
        </button>
        <p className="calendar__nav--month p-2" onClick={() => console.log(selectsDate)}>
          {format(currentMonth, Format.YYYY_MM)}
        </p>
        <button
          name="next"
          className="calendar__nav--next p-2"
          onClick={handleCurrentMonth}
        >﹥
        </button>
      </div>
      <table className="calendar__container">
        <thead>
        <tr>
          <th className="dayofweek sunday">일</th>
          <th className="dayofweek">월</th>
          <th className="dayofweek">화</th>
          <th className="dayofweek">수</th>
          <th className="dayofweek">목</th>
          <th className="dayofweek">금</th>
          <th className="dayofweek">토</th>
        </tr>
        </thead>
        <tbody>
        {calendarList.map((_, index) => {
          if (index % 7 === 0) {
            return (
              <tr key={index}>
                {[0, 1, 2, 3, 4, 5, 6].map((count, dayofweekNum) => {
                  const temp = calendarList[index + count] as CalendarList;
                  return (
                    <td
                      className={makeClassName(temp, dayofweekNum)}
                      key={index + count}
                      onClick={clickDay}
                    >
                      {temp.dateNum}
                    </td>
                  );
                })}
              </tr>
            );
          } else {
            return null;
          }
        })}
        </tbody>
      </table>


    </section>
  );
};

export default MiniCalendar;
