import React, {useEffect, useState} from "react";
import {Format, format, nextMonth, prevMonth} from "../utils/DateUtil";
import {CalendarList} from "./mini-calendar";
import {classStr} from "../utils/classStr";
import RestBar from "./RestBar";
import DialogManager from "../dialog/DialogManager";
import DetailMyRest from "../pages/DetailMyRest";
import {makeCalendar} from "./makeCalendar";
import {MyRestType} from "./type/type";

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

type CalendarProps = {
  myRest: MyRestType
}


const Calendar = ({myRest}: CalendarProps) => {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today);
  const [calendarList, setCalendarList] = useState<CalendarList[]>([]);
  const [selectsDate, setSelectDate] = useState<string[]>([]);

  useEffect(() => {
    const newCalendar = makeCalendar(currentMonth, true);
    setCalendarList(newCalendar);
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
    const list = Object.keys(myRest.myRestList);
    if (list.includes(value.fullDate)) {
      const fullDateList = myRest.myRestList[value.fullDate]!;
      return fullDateList.map((rest: RestType, index: number) => (
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
                      {myRest?.myRestList && showMyRestDay(temp)}
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

  )
    ;
};

export default Calendar;
