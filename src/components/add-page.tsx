import React, {useCallback, useEffect, useState} from 'react';
import DatePicker from "react-datepicker";
import {ko} from "date-fns/esm/locale";
import "react-datepicker/dist/react-datepicker.css";
import REST_JSON from "../assets/json/rest-data.json";
import ONLY_REST_JSON from "../assets/json/only-rest-date.json";
import {changeDate, dateChangeDate, insertAtInString} from "../utils/changeDate";
import {RestDataType} from "./Calendar";
import {format} from "../utils/DateUtil";


interface FormDate {
  category: string,
  useType: string,
  startDt: string,
  endDt: string,
  publicReason : string,
  privateReason : string
}

export type DateType = Date | null


// 1. 휴가 사용유형이 오전반차, 오후반차일 경우
// => 날짜 선택 => 하루만 선택

// 2. 휴가 사용유형이 하루 종일일 경우
// => 시작날짜, 종료날짜 선택
// => 같은 날일 경우 => 하루사용으로 간주
// => 다른 날일 경우 => 종료 - 시작 일수 사용으로 간주

const AddPage = () => {
  const [formData, setFormData] = useState<FormDate>({
    category: "",
    useType: "",
    startDt : "",
    endDt : "",
    publicReason : "",
    privateReason : ""
  });
  const [startDate, setStartDate] = useState<DateType>(new Date());
  const [endDate, setEndDate] = useState<DateType>(null);

  useEffect(() => {

  }, []);


  const handleSelectMenuValue = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const target = e.target;
    const name = target.name;
    setFormData(prev => ({...prev, [name]: target.value}));
  }

  const handleTextareaValue = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const target = e.target;
    const name = target.name;
    setFormData(prev => ({...prev, [name]: target.value}));
  }

  const onChange = (dates: [(DateType), (DateType)]) => {
    const [start, end] = dates;
    // end가 null 일 경우 하루 선택
    setStartDate(start);
    setEndDate(end);
    setFormData(prev => ({...prev , startDt : format(start), endDt : format(end)}));
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


  const onSubmit = (e : React.FormEvent) => {
    e.preventDefault()
    console.log(formData);
  };
  return (
    <>
      <div className="md:grid md:grid-cols-3 md:gap-6">
        <div className="mt-5 md:col-span-2 md:mt-0">
          <form onSubmit={onSubmit}>
            <div className="overflow-hidden shadow sm:rounded-md">
              <div className="bg-white px-4 py-5 sm:p-6">
                {/* 휴가 유형 */}
                <div className="grid grid-cols-6 gap-6">
                  <div className="col-span-6 sm:col-span-3">
                    <label htmlFor="rest-category" className="block text-sm font-medium text-gray-700">
                      휴가 유형 *
                    </label>
                    <select
                      id="rest-category"
                      name="rest-category"
                      onChange={handleSelectMenuValue}
                      value={formData.category}
                      className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    >
                      <option value="" disabled>선택하세요</option>
                      <option value="takeoff">연차</option>
                      <option value="vacation">여름 휴가</option>
                      <option value="replace">대체 휴무</option>
                    </select>
                  </div>
                </div>
                {/* 휴가 사용 유형 */}
                <div className="grid grid-cols-6 gap-6">
                  <div className="col-span-6 sm:col-span-3">
                    <label htmlFor="rest-useType" className="block text-sm font-medium text-gray-700">
                      휴가 사용 유형
                    </label>
                    <select
                      id="rest-useType"
                      name="rest-useType"
                      onChange={handleSelectMenuValue}
                      value={formData.useType}
                      className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    >
                      <option value="" disabled>선택하세요</option>
                      <option value="tmo">하루 종일</option>
                      <option value="tao">오전 반차</option>
                      <option value="tdo">오후 반차</option>
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-6 gap-6">
                  <div className="col-span-6 sm:col-span-3">
                    <label htmlFor="datePicker" className="block text-sm font-medium text-gray-700">
                      날짜 선택
                    </label>
                    <DatePicker
                      locale={ko}
                      name="datePicker"
                      selected={startDate}
                      onChange={(date) => onChange(date)}
                      startDate={startDate}
                      endDate={endDate}
                      excludeDates={excludeDate()} // 자신의 휴가일 빼는 것도 좋을듯
                      dayClassName={(date) => {
                        const today = dateChangeDate(date);
                        const year = date.getFullYear();
                        const json: RestDataType = REST_JSON[year.toString() as keyof typeof REST_JSON];
                        return (typeof json[today] === 'string') ? "random" : "";
                      }}
                      selectsRange
                      onMonthChange={setStartDate}
                      inline
                      filterDate={isWeekday}
                      className=""
                    />
                  </div>
                </div>
                <div className="grid grid-cols-6 gap-6">
                  <div className="col-span-6 sm:col-span-3">
                    <label htmlFor="publicReason" className="block text-sm font-medium text-gray-700">
                      휴가 사유
                    </label>
                    <div className="mt-1">
                      <textarea
                        id="publicReason"
                        name="publicReason"
                        rows={3}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        placeholder="공개되는 휴가 사유를 적으세요."
                        value={formData.publicReason}
                        onChange={handleTextareaValue}
                      />
                    </div>
                    <p className="mt-2 text-sm text-gray-500">
                      Brief description for your profile. URLs are hyperlinked.
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-6 gap-6">
                  <div className="col-span-6 sm:col-span-3">
                    <label htmlFor="privateReason" className="block text-sm font-medium text-gray-700">
                      개인 메모 (비공개)
                    </label>
                    <div className="mt-1">
                      <textarea
                        id="privateReason"
                        name="privateReason"
                        rows={3}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        placeholder="이 메모는 비공개입니다. "
                        value={formData.privateReason}
                        onChange={handleTextareaValue}
                      />
                    </div>
                    <p className="mt-2 text-sm text-gray-500 ">
                      Brief description for your profile. URLs are hyperlinked.
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                <button
                  type="submit"
                  className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Save
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddPage;
