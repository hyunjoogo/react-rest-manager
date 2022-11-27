import React, {useCallback, useState} from 'react';
import Calendar from "../components/Calendar";
import AddPage from './add-page';
import {useQuery} from "@tanstack/react-query";
import {getMyRest} from "../api/firebase";
import MyRestRemainDay from "../components/MyRestRemainDay";

const MyRest = () => {
  const [addMode, setAddMode] = useState(false);
  const {isLoading, data: myRest} = useQuery(
    ['myRest'], getMyRest,
    {staleTime: 1000 * 60 * 5}
  );


  const handleAddMode = useCallback(() => {
    setAddMode(prev => !prev);
  }, []);

  if (isLoading) {
    return <>Loading...</>;
  }

  function classNames(class1: string, class2: string) {
    return [class1, class2].filter(Boolean).join(' ');
  }

  console.log(myRest.restRemainDay);


  return (
    <>
      <div className="myRest-title">
        <MyRestRemainDay myRest={myRest}/>
        <div className="flex mt-0 ml-4">
          <button
            type="button"
            className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            onClick={handleAddMode}
          >
            휴가 사용
          </button>
        </div>
      </div>
      <div className={classNames(
        addMode ? "add-mode" : "",
        "myRest-Content"
      )}>
        {addMode && <AddPage/>}
        <Calendar myRest={myRest}/>
      </div>
    </>
  );
};

export default MyRest;
