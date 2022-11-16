import './App.css';
import Calendar from './components/Calendar';
import { useCallback, useState } from "react";
import AddPage from "./components/add-page";

function App() {
  const [today, setToday] = useState(new Date());
  const [addMode, setAddMode] = useState(true);

  const handleAddMode = useCallback(() => {
    setAddMode(prev => !prev);
  }, []);

  return (
    <div>
      <button onClick={handleAddMode}>추가하기</button>
      {addMode && <AddPage/>}
      <Calendar wantDay={today} setToday={setToday}/>
    </div>
  );
}

export default App;
