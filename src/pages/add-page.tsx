import React, {useEffect, useState} from 'react';
import "react-datepicker/dist/react-datepicker.css";
import MiniCalendar from "../components/mini-calendar";
import {DataType, MyRestType} from "../components/type/type";
import {translateNumberType, translateType} from "../utils/translateType";
import {useQuery} from "@tanstack/react-query";
import WillUseRest from "../components/WillUseRest";
import {format} from "../utils/DateUtil";
import {insertAtInString} from "../utils/changeDate";


export type FormDate = {
  category: "takeoff" | "vacation" | "replace" | "";
  useType: "tmo" | "tao" | "tdo" | "";
  date: string[];
  publicReason: string;
  privateReason: string;
}

export type DateType = Date | null

type AddPageProps = {
  myRest: MyRestType
}

type SelectedResultType = {
  [key: string]: DataType
}

export type SelectedDateTypes = {
  [key: string]: {
    category: "takeoff" | "vacation" | "replace",
    useType: "tmo" | "tao" | "tdo",
    deduction: number,
  }
}

const AddPage = () => {
// 현재 폼에 선택되어 있는 데이터 모음
  const [selectedFormData, setSelectedFormData] = useState<FormDate>({
    category: "",
    useType: "",
    date: [],
    publicReason: "",
    privateReason: ""
  });
  // 서버에서 가지고 온 잔여일 데이터
  const {isSuccess, data: myRest} = useQuery<MyRestType>(['myRest']);
  const [tempRestRemainDay, setTempRestRemainDay] = useState<MyRestType['restRemainDay']>({});
  const [selectedResult, setSelectedResult] = useState<SelectedResultType[]>([]);   // 서버에 올릴 리스트
  const [selectedDate, setSelectedDate] = useState<SelectedDateTypes>({});


  useEffect(() => {
    if (isSuccess) {
      setTempRestRemainDay(myRest.restRemainDay);
    }
  }, []);


  const handleSelectMenuValue = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const target = e.target;
    const name = target.name;
    const value = target.value as "takeoff" | "vacation" | "replace" | "";
    if (name === "category") {
      setSelectedFormData(prev => ({...prev, [name]: value, useType: ""}));
    } else {
      setSelectedFormData(prev => ({...prev, [name]: target.value}));
    }
  };

  const handleTextareaValue = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const target = e.target;
    const name = target.name;
    setSelectedFormData(prev => ({...prev, [name]: target.value}));
  };

  const handleSelectedDay = () => {
    const list = Object.keys(selectedDate);

    if (list.length === 0) {
      return <></>;
    }


    let tempRemainDay = {
      takeoff: myRest!.restRemainDay['takeoff']!.remainDay,
      vacation: myRest!.restRemainDay['vacation']!.remainDay,
      replace: myRest!.restRemainDay['replace']!.remainDay,
    };
    const node: JSX.Element[] = [];
    list.forEach((date, index) => {
      const {category, useType} = selectedDate[date]!;
      console.table(tempRemainDay);


      node.push(
        <div key={index}>
          {translateType(category)} ({insertAtInString(date)}) : {translateType(useType)}
          {tempRemainDay[category]!} ➡️ {tempRemainDay[category]! - translateNumberType(useType)!}
        </div>
      );
      tempRemainDay[category]! -= translateNumberType(useType)!;
      console.table(tempRemainDay);
    });
    return node;
  };


  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(selectedFormData);
    // 날짜 : 정보 형식으로 firebase 올리기
  };
  return (

    <form onSubmit={onSubmit} className="add-page">
      <div className="overflow-hidden shadow sm:rounded-md">
        <div className="bg-white px-4 py-5 sm:p-6">
          {/* 휴가 유형 */}
          <div className="col-span-6 sm:col-span-3">
            <label htmlFor="category" className="block text-sm font-medium text-gray-700">
              휴가 유형 *
            </label>
            <select
              id="category"
              name="category"
              onChange={handleSelectMenuValue}
              value={selectedFormData.category}
              className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
            >
              <option value="" disabled>선택하세요</option>
              <option value="takeoff">연차</option>
              <option value="vacation">여름 휴가</option>
              <option value="replace">대체 휴무</option>
            </select>
          </div>
          {/* 휴가 사용 유형 */}
          <div className="col-span-6 sm:col-span-3">
            <label htmlFor="useType" className="block text-sm font-medium text-gray-700">
              휴가 사용 유형
            </label>
            <select
              id="useType"
              name="useType"
              onChange={handleSelectMenuValue}
              disabled={selectedFormData.category === ""}
              value={selectedFormData.useType}
              className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
            >
              <option value="" disabled>선택하세요</option>
              <option value="tmo">하루 종일</option>
              <option value="tao">오전 반차</option>
              <option value="tdo">오후 반차</option>
            </select>
          </div>
          <div className="col-span-6 sm:col-span-3 relative">
            <label htmlFor="" className="block text-sm font-medium text-gray-700">
              휴가 일정 선택
            </label>
            <MiniCalendar selectedFormData={selectedFormData} setSelectedFormData={setSelectedFormData}
                          selectedDate={selectedDate}
                          setSelectedDate={setSelectedDate}
                          handleSelectedDay={handleSelectedDay}/>
          </div>
          <div className="col-span-6 sm:col-span-3 border">
            {/* 일정 선택 결과 보여주기 */}
            {handleSelectedDay()}
          </div>
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
                        value={selectedFormData.publicReason}
                        onChange={handleTextareaValue}
                      />
            </div>
          </div>
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
                        value={selectedFormData.privateReason}
                        onChange={handleTextareaValue}
                      />
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
  );
};

export default AddPage;
