import React from 'react';
import {RestType} from "./Calendar";

type RestBarProps = {
  rest: RestType;
  onDetail: (rest: RestType) => void;
}

export const RestBar = ({rest, onDetail}: RestBarProps) => {

  const showRestType = (rest: RestType) => {
    let category = "";
    switch (rest.category) {
      case "takeoff" :
        category = "연차";
        break;
      case "vacation" :
        category = "여름휴가";
        break;
      case "replace":
        category = "대체휴무";
        break;
      default:
        alert("잘못된 값입니다.");
    }
    let useType = ""
    switch (rest.useType) {
      case "tmo" :
        useType = "하루 종일";
        break;
      case "tao" :
        useType = "오전 반차";
        break;
      case "tdo":
        useType = "오후 반차";
        break;
      default:
        alert("잘못된 값입니다.");
    }
    return <span>{category} : {useType}</span>
  };

  return (
    <div
      className="rest-content"
      onClick={() => onDetail(rest)}>
      {showRestType(rest)}
    </div>
  );
};

export default RestBar;
