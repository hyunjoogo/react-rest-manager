import React, {useCallback, useContext, useEffect, useState} from 'react';
import Calendar from "../components/Calendar";
import AddPage from './add-page';
import {useQuery} from "@tanstack/react-query";
import {getMyRest, login} from "../api/firebase";
import MyRestRemainDay from "../components/MyRestRemainDay";
import Button from '../components/ui/Button';
import {useAuthContext} from "../components/context/AuthContext";


const MyRest = () => {
  const store = useAuthContext();
  const [addMode, setAddMode] = useState(false);

  const getRest = async () => {
    if (store?.user === null) {
      return {}
    }
    return getMyRest(store?.user?.uid)
  }

  const {isLoading, data: myRest} = useQuery({
    queryKey: ['myRest'],
    queryFn: getRest,
    onError: (err) => console.log(err),
    refetchOnWindowFocus: false
  });


  useEffect(() => {

  }, [])


  const handleAddMode = useCallback(() => {
    setAddMode(prev => !prev);
  }, []);

  function classNames(class1: string, class2: string) {
    return [class1, class2].filter(Boolean).join(' ');
  }

  if (isLoading) {
    return <>Loading...</>;
  }


  return (
    <>
      {Object.keys(myRest).length === 0
        ? <>aaa</>
        :
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
            {Object.keys(myRest).length > 0 && <MyRestRemainDay myRest={myRest}/>}
          </div>
          <div className={classNames(
            addMode ? "add-mode" : "",
            "myRest-Content"
          )}>
            {addMode && <AddPage setAddMode={setAddMode}/>}
            <Calendar myRest={myRest}/>
          </div>
        </>
      }
    </>
  );
};

export default MyRest;
