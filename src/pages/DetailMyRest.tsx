import React from 'react';
import WindowDialog from "../dialog/WindowDialog";
import {DialogProps} from "../components/type/type";
import {RestType} from "../components/Calendar";

interface DetailMyRestProps extends DialogProps {
  // data를 받아올 경우 추가할 것
  restData: RestType;
}

const DetailMyRest = (props: DetailMyRestProps) => {
  const {restData} = props;
  console.log(restData);
  return (
    <WindowDialog {...props}>
      <p className="text-sm text-gray-500">
        표시할 내용을 보여주면 됩니다.
      </p>
    </WindowDialog>
  );
};

export default DetailMyRest;
