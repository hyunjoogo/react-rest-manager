import React, {useCallback, useEffect, useState} from "react";
import {changeDate} from "../utils/changeDate";
import {
  Format,
  format,
  nextMonth,
  prevMonth,
  toEndOfMonth,
  toEndOfPrevMonth,
  toStartOfMonth,
  toStartOfNextMonth,
  whatDay
} from "../utils/DateUtil";
import ONLY_REST from "../assets/json/only-rest-date.json";
import {CalendarList} from "./mini-calendar";
import {classStr} from "../utils/classStr";
import REST_DATA from '../assets/json/rest-data.json';
import {getMyRestList} from "../api/firebase";
import {useQuery} from "@tanstack/react-query";
import RestBar from "./RestBar";
import DialogManager from "../dialog/DialogManager";
import DetailMyRest from "../pages/DetailMyRest";

export type RestDataType = {
  [key: string]: {
    [key: string]: string;
  };
}
export type RestType = {
  "category": string,
  "createDt": string,
  "date": string,
  "deduction": number,
  "privateReason": string,
  "publicReason": string,
  "useType": string
}

const Calendar = () => {
  const {isLoading, error, data: myRestList} = useQuery(
    ['myRestList'], getMyRestList,
    {staleTime: 1000 * 60 * 5}
  );

  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today);
  const [calendarList, setCalendarList] = useState<CalendarList[]>([]);
  const [selectsDate, setSelectDate] = useState<string[]>([]);
  const [onDetailScreen, setOnDetailScreen] = useState(false);

  useEffect(() => {

    // fetchMyRest()
    // 서버에서 자료를 가지고 오고
    // 맞는 자료가 있으면 뿌려주기

    const dayList = ['일', '월', '화', '수', '목', '금', '토'];
    const todayInfo = {
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
      const isHoliday = whatDay(date) === 0 || whatDay(date) === 6 || ONLY_REST["restDayList"].includes(date);
      tempList.push({
        dateNum: prevMonthRemainDate,
        fullDate: date,
        isCurrentMonth: false,
        isHoliday: isHoliday,
      });
    }

    // 이번달 내용 표시하기
    for (let i = 1; i < thisMonthLast.date + 1; i++) {
      const date = changeDate(todayInfo.year, todayInfo.month, i) as string;
      const isHoliday = whatDay(date) === 0 || whatDay(date) === 6 || ONLY_REST["restDayList"].includes(date);

      let temp: CalendarList = {
        dateNum: i,
        fullDate: date,
        isCurrentMonth: true,
        isHoliday: isHoliday,
      };

      const json: RestDataType = REST_DATA;
      const thisYearHolidayJson = json[String(todayInfo.year)]!;

      if (typeof thisYearHolidayJson[date] === "string") {
        temp["daysName"] = thisYearHolidayJson[date];
      }

      tempList.push(temp);
    }

    // 다음달 내용 표시
    for (let i = thisMonthLast.day + 1; i < 7; i++) {
      const date = changeDate(nextMonthFirst.year, nextMonthFirst.month, i - thisMonthLast.day);
      const isHoliday = whatDay(date) === 0 || whatDay(date) === 6 || ONLY_REST["restDayList"].includes(date);
      tempList.push({
        dateNum: i - thisMonthLast.day,
        fullDate: date,
        isCurrentMonth: false,
        isHoliday: isHoliday,
      });
    }
    setCalendarList(tempList);

  }, [currentMonth]);


  if (isLoading) {
    return <span>Loading</span>;
  }

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
    target.classList.toggle('selected');
  };

  const handleCurrentMonth = (e: React.MouseEvent<HTMLButtonElement>) => {
    const target = e.currentTarget;
    if (target.name === "prev") {
      setCurrentMonth(prev => prevMonth(prev));
    } else if (target.name === "next") {
      setCurrentMonth(prev => nextMonth(prev));
    } else {
      console.error('잘못된 파라미터 입니다.');
    }
  };

  const showMyRestDay = (value: CalendarList) => {
    const list = Object.keys(myRestList);
    if (list.includes(value.fullDate)) {
      return myRestList[value.fullDate].map((rest: RestType, index: number) => (
        <RestBar rest={rest} key={index} onDetail={onDetail}/>
      ));
    }
    return null;
  };

  const onDetail = (rest: RestType) => {
    DialogManager.push(
      <DetailMyRest
        show={false}
        restData={rest}
        onClose={(result: string) => console.log(result)}/>
    );
  };


  return (
    <>
      {isLoading && <p>Loading...</p>}
      {/*{error && <p>{error}</p>}*/}
      <section className="big-calendar">
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
                        <div>
                          <span className="dateNum">{temp.dateNum}</span>
                          <span className="dateName">{temp.daysName}</span>
                        </div>
                        {myRestList && showMyRestDay(temp)}
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
    </>
  )
    ;
};

export default Calendar;
