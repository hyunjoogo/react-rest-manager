import React, {useCallback, useState} from 'react';
import AddPage from "../components/add-page";
import Calendar from "../components/Calendar";

const MyRest = () => {
  const [today, setToday] = useState(new Date());
  const [addMode, setAddMode] = useState(true);

  const handleAddMode = useCallback(() => {
    setAddMode(prev => !prev);
  }, []);


  return (
    <>
      <button onClick={handleAddMode}>추가하기</button>
      {addMode && <AddPage/>}
      <Calendar wantDay={today} setToday={setToday}/>

    </>
  );
};

export default MyRest;
