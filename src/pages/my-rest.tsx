import React, {useCallback, useState} from 'react';
import Calendar from "../components/Calendar";
import AddPage from './add-page';
import MyModal from "../components/modal/MyModal";
import {Store, useAuthContext} from "../components/context/AuthContext";

const MyRest = () => {
  const [today, setToday] = useState(new Date());
  const [addMode, setAddMode] = useState(false);



  const handleAddMode = useCallback(() => {
    setAddMode(prev => !prev);
  }, []);


  return (
    <>
      <button onClick={handleAddMode}>추가하기</button>
      {addMode && <AddPage/>}
      <Calendar />
    </>
  );
};

export default MyRest;
