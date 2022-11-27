import React from 'react';
import {MyRestType} from "./type/type";

type MyRestRemainDayProps = {
  myRest: MyRestType
}

const MyRestRemainDay = ({myRest}: MyRestRemainDayProps) => {
  if (!myRest) {
    return <></>;
  }

  const {restRemainDay: {takeoff, vacation, replace}} = myRest;
  const list = [];
  if (takeoff && vacation && replace) {
    list.push({restName: "연차", remainDay: takeoff.remainDay, total: takeoff.total});
    list.push({restName: "여름휴가", remainDay: vacation.remainDay, total: vacation.total});
    list.push({restName: "대체휴무", remainDay: replace.remainDay, total: replace.total});
  }
  return (
    <div className="min-w-0 flex-1">
      <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
        나의 휴가
      </h2>
      <div className="remain-list">
        {list.map((type) => {
          return (
            <div className="mt-2 flex items-center text-sm text-gray-500">
              <strong>{type.restName}</strong> : {type.remainDay} / {type.total}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MyRestRemainDay;
