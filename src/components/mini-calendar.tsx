import React, {ReactNode, useCallback, useEffect, useState} from 'react';
import {Format, format, nextMonth, prevMonth} from "../utils/DateUtil";
import {classStr} from "../utils/classStr";
import {FormDate} from "../pages/add-page";
import {makeCalendar} from "./makeCalendar";
import {useQuery} from "@tanstack/react-query";
import {MyRestType} from "./type/type";
import {translateNumberType} from "../utils/translateType";

export type CalendarList = {
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

type SelectedDateTypes = {
  [key: string]: {
    category: "takeoff" | "vacation" | "replace",
    useType: "tmo" | "tao" | "tdo",
    deduction: number,
  }
}

type MiniCalendarProps = {
  selectedFormData: FormDate;
  setSelectedFormData: React.Dispatch<React.SetStateAction<FormDate>>;
  handleSelectedDay: (newSelectsDate: string[]) => void;
}

const MiniCalendar = ({selectedFormData}: MiniCalendarProps) => {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today);
  const [calendarList, setCalendarList] = useState<CalendarList[]>([]);
  const [selectsDate, setSelectDate] = useState<string[]>([]);
  const [selectedDate, setSelectedDate] = useState<SelectedDateTypes>({});
  const [tempRestRemainDay, setTempRestRemainDay] = useState<MyRestType['restRemainDay']>({});

  const {isSuccess, data: myRest} = useQuery<MyRestType>(['myRest']);

  useEffect(() => {
    if (isSuccess) {
      setTempRestRemainDay(myRest.restRemainDay);
    }
  }, []);

  useEffect(() => {
    const newCalendar = makeCalendar(currentMonth);
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

    // 0. 유형선택은 필수
    if (selectedFormData.category === "" || selectedFormData.useType === "") {
      return alert('휴가 유형 또는 휴가 사용 유형을 선택하세요');
    }
    const {category, useType} = selectedFormData;

// 선택완료시 날짜를 선택하는 순간
    // 1. 계산부터
    // - 휴가 유형, 사용 유형 확인
    // - 0보다 작은 큰지 확인하여 return t/f
    const {remainDay} = tempRestRemainDay[category]!;
    if (remainDay! - translateNumberType(useType)! < 0) {
      return alert('해당 휴가 유형의 사용일수가 부족합니다.');
    }

    setSelectedDate(prev => {
      if (Object.keys(prev).includes(targetDate)) {
        const temp = {...prev};
        delete temp[targetDate];
        return temp;
      } else {
        return {
          ...prev, [targetDate]: {
            category: category,
            useType: useType,
            deduction: translateNumberType(useType)!
          }
        };
      }
    });
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
