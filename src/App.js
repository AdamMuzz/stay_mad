import logo from './logo.svg';
import { useState, useEffect } from 'react';
import './App.css';

const LAUNCH_DATE = 1667160671000; // 10/30/22 1:11:11
const SEC = 1000;
const MIN = SEC * 60;
const HOUR = MIN * 60;
const DAY = HOUR * 24;

function App() {
  const [time, set_time] = useState(parse_time());

  useEffect(() => {
    const updater = setInterval(() => set_time(parse_time()), 1000);
    return () => {clearInterval(updater)};
  }, []);

  return (
    <div className="App">
        <div id='logo' style={{backgroundImage:'url('+logo+')'}}>
          <p className='text bold'>V.I</p>
          <p className='text'>{time}</p>
        </div>
    </div>
  );
}

const parse_time = () => {
  //compute millisecond time diff of now until target
  const now = new Date().getTime();
  const diff = LAUNCH_DATE - now;

  //compute differentials
  const days = Math.floor(diff / DAY);
  const hours = Math.floor((diff % DAY) / HOUR);
  const mins = Math.floor((diff % HOUR) / MIN);
  const secs = Math.floor((diff % MIN) / SEC);

  //format
  const days_str = days > 9 ? days : '0'+days;
  const hours_str = hours > 9 ? hours : '0'+hours;
  const mins_str = mins > 9 ? mins : '0'+mins;
  const secs_str = secs > 9 ? secs : '0'+secs;

  //finish
  const formatted_date = diff < 0 ? 'Stay mad...' : `${days_str}:${hours_str}:${mins_str}:${secs_str}`;

  return formatted_date;
}

export default App;
