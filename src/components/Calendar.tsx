import React, {Dispatch, SetStateAction, useEffect, useState} from "react";
import {changeDate} from "../utils/changeDate";
import REST_JSON from '../assets/json/rest-data.json';

type CalendarProps = {
  wantDay: Date;
  setToday: Dispatch<SetStateAction<Date>>
}

type CalendarList = {
  dateNum: number,
  fullDate: string,
  daysName?: string,
}

type Item = {
  [key: string]: string;
}


const Calendar = ({wantDay, setToday}: CalendarProps) => {
  const [month, setMonth] = useState();
  const [calendarList, setCalendarList] = useState<CalendarList[]>([]);


  useEffect(() => {
    // let now = new Date(2022,11, 1);
    let now = wantDay;
    // console.log(wantDay);

    const dayList = ['일', '월', '화', '수', '목', '금', '토'];
    const today = {
      year: now.getFullYear(),
      month: now.getMonth() + 1, //  1 ~ 12
      date: now.getDate(),
      day: now.getDay(), // 0 ~ 6
      ko: dayList[now.getDay()]
    };

    const firstDayOfThisMonth = new Date(today.year, today.month - 1, 1);
    const lastDayOfThisMonth = new Date(today.year, today.month, 0);
    const lastDayOfPrevMonth = new Date(today.year, today.month - 1, 0); // 이전달 마지막 날
    const firstDayOfNextMonth = new Date(today.year, today.month, 1);


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

    for (let i = firstDayOfThisMonth.getDay() - 1; i > -1; i--) {
      const prevMonthRemainDate = prevMonthLast.date - i;
      tempList.push({
        dateNum: prevMonthRemainDate,
        fullDate: changeDate(prevMonthLast.year, prevMonthLast.month, prevMonthRemainDate),
      });
    }
    for (let i = 1; i < thisMonthLast.date + 1; i++) {
      // 이번달 내용 표시하기
      const year = today.year.toString() as string;
      const json: Item = REST_JSON[year as keyof typeof REST_JSON];
      const date = changeDate(today.year, today.month, i) as string;

      let temp: CalendarList = {
        dateNum: i,
        fullDate: changeDate(today.year, today.month, i),
      };

      if (json && typeof json[date] === 'string') {
        temp["daysName"] = json[date];
      }
      tempList.push(temp);
    }

    for (let i = thisMonthLast.day + 1; i < 7; i++) {
      tempList.push({
        dateNum: i - thisMonthLast.day,
        fullDate: changeDate(nextMonthFirst.year, nextMonthFirst.month, i - thisMonthLast.day)
      });
    }
    setToday(wantDay);
    setCalendarList(tempList);
  }, [wantDay]);

  const handleMonth = (e: React.MouseEvent<HTMLButtonElement>) => {
    const button: HTMLButtonElement = e.currentTarget;
    setToday(prevState => {
      const year = prevState.getFullYear();
      const targetMonth = button.name === "next" ? prevState.getMonth() + 1 : prevState.getMonth() - 1;
      const date = prevState.getDate();
      return new Date(year, targetMonth, date);
    });
  };

  return (
    <>
      <div className="calendar__nav">
        <button
          className="prev"
          name="prev"
          onClick={handleMonth}
        >﹤
        </button>
        <p className="this__month">{wantDay.getFullYear()}-{wantDay.getMonth() + 1}</p>
        <button
          className="next"
          name="next"
          onClick={handleMonth}
        >﹥
        </button>
      </div>
      <section className="calendar__body"></section>
      <table className="calendar">
        <thead>
        <tr>
          <th className="day red">일</th>
          <th className="day">월</th>
          <th className="day">화</th>
          <th className="day">수</th>
          <th className="day">목</th>
          <th className="day">금</th>
          <th className="day sat">토</th>
        </tr>
        </thead>
        <tbody>

        {calendarList.map((value, index) => {
          if (index % 7 === 0) {
            return (
              <tr key={index}>
                {[0, 1, 2, 3, 4, 5, 6].map((count) => {
                  const temp = calendarList[index + count];
                  return (
                    <td className={value.fullDate} key={index + count}>
                      <div className="days_wrapper">
                        <div className="days_title">
                          <p className="days">{temp?.dateNum}</p>
                          <p className="days-name">{temp?.daysName}</p>
                        </div>
                        <div className="days_content_wrapper">
                          <div className="days_content"></div>
                        </div>
                      </div>
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
    </>
  )
    ;
};

export default Calendar;
