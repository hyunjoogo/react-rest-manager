import React, {useCallback, useState} from 'react';
import Calendar from "../components/Calendar";
import AddPage from './add-page';
import {useQuery} from "@tanstack/react-query";
import {getMyRest} from "../api/firebase";
import MyRestRemainDay from "../components/MyRestRemainDay";
import Button from '../components/ui/Button';

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
  return (
    <>
      <div className="myRest-title">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
            나의 휴가
          </h2>
          <div className="flex mt-0 ml-4">
            <Button type="button" onClick={handleAddMode}>휴가 사용</Button>
          </div>
        </div>
        <MyRestRemainDay myRest={myRest}/>
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
