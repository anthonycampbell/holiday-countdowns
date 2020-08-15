import React, { useEffect, useState } from 'react';
import Flips from './Flips';
import './App.css';

function App() {
  const seconds     = 1000 
  const minutes     = seconds * 60 
  const hours       = minutes * 60 
  const days        = hours * 24 
  const goldenArray = [[],[3,14],[3,3],[2,23],[3,11],
                       [2,31],[3,18],[3,8],[2,28],[3,16],
                       [3,5],[2,25],[3,13],[3,2],[2,22],
                       [3,10],[2,30],[3,17],[3,7],[2,27]]
  
  const [date, setDate] = useState(new Date())
  const halloween       = findHolidayYear(date, 9, 31)
  const christmas       = findHolidayYear(date, 11, 25)
  const valentines      = findHolidayYear(date, 1, 14)
  const easter          = findEaster(date)
  let holidays          = [{holiday: 'Halloween', date: halloween},
                           {holiday:'Christmas', date: christmas}, 
                           {holiday:'Valentines', date: valentines}, 
                           {holiday:'Easter', date: easter}]

  useEffect(()=>{
    const interval = setInterval(()=>{
      setDate((d) => new Date())
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  function findEaster(today){
    let g = goldenArray[(today.getFullYear()%19) + 1]
    let pm = findHolidayYear(today, g[0], g[1])
    if (pm.getFullYear() > today.getFullYear()){
      pm.setYear(pm.getFullYear()-1)
    }
    pm.setDate(pm.getDate() + (7 - pm.getDay()))
    let e = findHolidayYear(today, pm.getMonth(), pm.getDate())
    if (e.getFullYear() > today.getFullYear()){
      let g = goldenArray[(e.getFullYear()%19) + 1]
      let easter = new Date(e.getFullYear(), g[0], g[1])
      easter.setDate(easter.getDate() + (7 - easter.getDay()))
      return easter
    }
    return e
  }

  function findHolidayYear(today, hMonth, hDay ){
    if ((today.getMonth() === hMonth) && (today.getDate() === hDay)){
      return new Date(today.getFullYear(), today.getMonth(), today.getDate())
    } 
    if ((today.getMonth() < hMonth) || ((today.getMonth() === hMonth) && (today.getDate() < hDay))){
        return new Date(today.getFullYear(), hMonth, hDay)
    }
    return new Date((today.getFullYear()+1), hMonth, hDay)
  }

  return (
    <div className="App">
        {holidays.map((v, i)=>{
          return(
                <div className='container' key={i} id={v[Object.keys(v)[0]]} >
                <span className='holiday-name'>{v[Object.keys(v)[0]]}</span>
                <Flips d={date}
                       h={v[Object.keys(v)[0]]}
                       hd={v[Object.keys(v)[1]]}
                       days={Math.floor((v[Object.keys(v)[1]]-date)/days)}
                       hours={Math.floor((v[Object.keys(v)[1]]-date)/hours  ) % 24} 
                       mins={Math.floor((v[Object.keys(v)[1]]-date)/minutes) % 60} 
                       secs={Math.floor((v[Object.keys(v)[1]]-date)/seconds) % 60} />
                </div>
          )
        })}
        <span className='date'>Today: { date.toString() }</span>
    </div>
  );
}

export default App;
