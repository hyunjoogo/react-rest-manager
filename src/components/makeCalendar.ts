import {toEndOfMonth, toEndOfPrevMonth, toStartOfMonth, toStartOfNextMonth, whatDay} from "../utils/DateUtil";
import {changeDate} from "../utils/changeDate";
import ONLY_REST from "../assets/json/only-rest-date.json";
import {CalendarList} from "./mini-calendar";

/**
 * 특정 월의 날짜를 넣으면 해당 월의 리스트를 주는 함수 (미니캘린더와 기본캘린더 같이 사용할 수 있을듯)
 * @param currentMonth {Date} 보여주려고 하는 월 입력
 * @return tempList 일-토 기준으로 전월 + 현재월 + 익월의 정보가 있는 리스트 리턴
 */

export const makeCalendar = (currentMonth : Date) => {
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

  return tempList
}
