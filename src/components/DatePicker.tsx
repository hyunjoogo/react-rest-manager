import React, {useState} from 'react';
import {insertAtInString} from "../utils/changeDate";
import {format} from "../utils/DateUtil";
import ONLY_REST_JSON from "../assets/json/only-rest-date.json";
import {DateType} from "./add-page";

const DatePicker = () => {
  const [startDate, setStartDate] = useState<DateType>(null);
  const [endDate, setEndDate] = useState<DateType>(null);
  const onChange = (dates: [(DateType), (DateType)] | Date) => {
    console.log(dates);
    console.log();


    if (Array.isArray(dates)) {
      const [start, end] = dates;
      setStartDate(start);
      setEndDate(end);
      // setFormData(prev => ({...prev, startDt: format(start), endDt: format(end)}));
    } else {
      setStartDate(dates);
      setEndDate(dates);
      // setFormData(prev => ({...prev, startDt: format(dates), endDt: format(dates)}));
    }
  };
  // TODO 주말도 선택되는 이슈있음
  const isWeekday = (date: Date) => {
    const day = date.getDay();
    return day !== 0 && day !== 6;
  };
  const excludeDate = () => {
    const array: Date[] = ONLY_REST_JSON.restDayList.map(value => new Date(insertAtInString(value)));
    return array;
  };


  return (
    <>
      {/*<DatePicker*/}
      {/*  locale={ko}*/}
      {/*  name="datePicker"*/}
      {/*  dateFormat="yy/MM/dd"*/}
      {/*  isClearable={true}*/}
      {/*  onChange={onChange}*/}
      {/*  selected={startDate}*/}
      {/*  startDate={startDate}*/}
      {/*  endDate={endDate}*/}
      {/*  excludeDates={excludeDate()} // 자신의 휴가일 빼는 것도 좋을듯*/}
      {/*  dayClassName={(date) => {*/}
      {/*    const today = dateChangeDate(date);*/}
      {/*    const year = date.getFullYear();*/}
      {/*    const json: RestDataType = REST_JSON[year.toString() as keyof typeof REST_JSON];*/}
      {/*    return (typeof json[today] === 'string') ? "random" : "";*/}
      {/*  }}*/}
      {/*  // onMonthChange={setStartDate}*/}
      {/*  disabled={formData.useType === "" || formData.category === ""}*/}
      {/*  selectsRange={formData.useType === "tmo"} // 오후반차,오전반차일 경우 false*/}
      {/*  // selectsRange={true} // 오후반차,오전반차일 경우 false*/}
      {/*  inline={false}*/}
      {/*  filterDate={isWeekday}*/}
      {/*/>*/}
    </>
  );
};

export default DatePicker;
