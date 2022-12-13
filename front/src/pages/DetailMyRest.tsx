import React from 'react';
import WindowDialog from "../dialog/WindowDialog";
import {DialogProps} from "../components/type/type";
import {RestType} from "../components/Calendar";
import {translateType} from "../utils/translateType";

interface DetailMyRestProps extends DialogProps {
  // data를 받아올 경우 추가할 것
  restData: RestType;
}

const DetailMyRest = (props: DetailMyRestProps) => {
  const {restData, onClose} = props;
  const list = [
    {labelName: "유형", value: translateType(restData.category)},
    {labelName: "사용 유형", value: translateType(restData.useType)},
    {labelName: "사유", value: restData.privateReason},
    {labelName: "개인 메모", value: restData.publicReason},
  ];

  const Footer = () => {
    return (
      <button
        type="button"
        className="blue-btn bg-blue-100"
        onClick={() => onClose('확인')}
      >
        확인
      </button>
    );
  };


  return (
    <WindowDialog
      {...props}
      title={<p className="text-2xl font-bold text-gray-900 sm:pr-12">{restData.date}</p>}
    footer={Footer()}
    >
      <article>
        <dl
          className="flex flex-wrap  border-slate-200 text-sm sm:text-base lg:text-sm xl:text-base">
          {list.map((value, index) => {
            return (<
                div className="w-full flex-none flex items-center p-4 sm:p-6 lg:p-4 xl:p-6" key={index}>
                <dt className="w-2/5 sm:w-1/4 flex-none text-slate-900 font-medium">{value.labelName}</dt>
                <dd>{value.value}</dd>
              </div>
            );
          })}
        </dl>
      </article>
    </WindowDialog>
  );
};

export default DetailMyRest;
