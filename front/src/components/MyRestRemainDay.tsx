import React, {useEffect} from 'react';
import {MyRestType} from "./type/type";

type MyRestRemainDayProps = {
  myRest: MyRestType
}

const MyRestRemainDay = ({myRest}: MyRestRemainDayProps) => {
  const {takeoff, vacation, replace} = myRest.restRemainDay;
  const list = [];
  if (takeoff && vacation && replace) {
    list.push({restName: "연차", remainDay: takeoff.remainDay, total: takeoff.total});
    list.push({restName: "여름휴가", remainDay: vacation.remainDay, total: vacation.total});
    list.push({restName: "대체휴무", remainDay: replace.remainDay, total: replace.total});
  }

  return (
    <div className="remain-list">
      {list.map((type, index) => {
        return (
          <div className="mt-2 flex items-center text-sm text-gray-500" key={index}>
            <strong>{type.restName}</strong> : {type.remainDay} / {type.total}
          </div>
        );
      })}
    </div>
  );
};

export default MyRestRemainDay;
