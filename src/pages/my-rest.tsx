import React, {useCallback, useState} from 'react';
import Calendar from "../components/Calendar";
import AddPage from './add-page';
import {useQuery} from "@tanstack/react-query";
import {getMyRest} from "../api/firebase";
import Button from '../components/ui/Button';

const MyRest = () => {
  const [addMode, setAddMode] = useState(false);
  const {isLoading, error, data: myRest} = useQuery(
    ['myRest'], getMyRest,
    {staleTime: 1000 * 60 * 5}
  );

  const handleAddMode = useCallback(() => {
    setAddMode(prev => !prev);
  }, []);

  if (isLoading) {
    return <>Loading...</>
  }

  return (
    <>
      <div className="myRest-Title">
        <>남은 일 수 보여주기</>
        <Button onClick={handleAddMode}>추가하기</Button>
      </div>
      {addMode && <AddPage/>}

      <Calendar myRest={myRest}/>
    </>
  );
};

export default MyRest;
