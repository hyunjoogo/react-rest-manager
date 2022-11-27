import React, {useEffect, useState} from 'react';
import "react-datepicker/dist/react-datepicker.css";
import MiniCalendar from "../components/mini-calendar";


export interface FormDate {
  category: string;
  useType: string;
  date: string[];
  publicReason: string;
  privateReason: string;
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
    date: [],
    publicReason: "",
    privateReason: ""
  });


  useEffect(() => {

  }, []);


  const handleSelectMenuValue = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const target = e.target;
    const name = target.name;
    if (name === "category") {
      setFormData(prev => ({...prev, [name]: target.value, useType: ""}));
    } else {
      setFormData(prev => ({...prev, [name]: target.value}));
    }
  };

  const handleTextareaValue = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const target = e.target;
    const name = target.name;
    setFormData(prev => ({...prev, [name]: target.value}));
  };

  const renderSelectResult = () => {
    console.log(formData);

    const sortList = formData.date.sort((a, b) => Number(a) - Number(b));

    // 리스트를 숫자로 바꿔
    // 차순으로 변경
    // 휴가유형의 잔여일수를 서버에서 가지고 오고
    // 잔여일수 - 사용유형일수를 뺀다.

    // 마이너스일 경우 세이브 버튼 비활성화
    // 빨간색으로 표현하기

    return (
      <>
        연차 : 2022.11.15 ~ 2022.11.15
        잔여 일수 : 14 -﹥ 13일
      </>
    );
  };


  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
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
                value={formData.category}
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
                disabled={formData.category === ""}
                value={formData.useType}
                className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              >
                <option value="" disabled>선택하세요</option>
                <option value="tmo">하루 종일</option>
                <option value="tao">오전 반차</option>
                <option value="tdo">오후 반차</option>
              </select>
            </div>
            <div className="col-span-6 sm:col-span-3">
              <label htmlFor="" className="block text-sm font-medium text-gray-700">
                휴가 일정 선택
              </label>
              {/* 유형, 사용유형이 선택되어 있지 않으면 안됨 */}
              <MiniCalendar setFormData={setFormData}/>
            </div>
            {formData.date.length > 0 &&
              <div className="col-span-6 sm:col-span-3 border">
                {renderSelectResult()}
              </div>
            }
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
                        value={formData.privateReason}
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
