import React, { useEffect, useState } from 'react';
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
  const [halloween, ]   = useState(findHolidayYear(date, 9, 31))
  const [christmas, ]   = useState(findHolidayYear(date, 11, 25))
  const [valentines,]   = useState(findHolidayYear(date, 1, 14))
  const [easter    ,]   = useState(findEaster(date));
  let holidays          = [{holiday: 'Halloween', date: halloween},
                           {holiday:'Christmas', date: christmas}, 
                           {holiday:'Valentines', date: valentines}, 
                           {holiday:'Easter', date: easter}]

  useEffect(()=>{
    const interval = setInterval(()=>{
      setDate(new Date())
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  function findEaster(today){
    let g = goldenArray[(today.getFullYear()%19) + 1]
    let nextEasterYear = findHolidayYear(today, g[0], g[1])
    if (nextEasterYear.getFullYear() > today.getFullYear()){
      let g = goldenArray[(nextEasterYear.getFullYear()%19) + 1]
      let easter = new Date(nextEasterYear.getFullYear(), g[0], g[1])
      easter.setDate(easter.getDate() + (7 - easter.getDay()))
      return easter
    }
    return nextEasterYear
  }

  function findHolidayYear(today, hMonth, hDay ){
    if ((today.getMonth() === hMonth) && (today.getDate() === hDay)){
      return "CELEBRATE"
    } 
    if ((today.getMonth() < hMonth) || ((today.getMonth() === hMonth) && (today.getDate() < hDay))){
        return new Date(today.getFullYear(), hMonth, hDay)
    }
    return new Date((today.getFullYear()+1), hMonth, hDay)
  }

  return (
    <div className="App">
      <ul>
        <li>
          Today: { date.toString() }
        </li>
        {holidays.map((v, i)=>{
          return(
            <li key={i}>
              <h1>{v[Object.keys(v)[0]]}:</h1> 
              {Math.floor((v[Object.keys(v)[1]]-date)/days   )     }:
              {Math.floor((v[Object.keys(v)[1]]-date)/hours  ) % 24}:
              {Math.floor((v[Object.keys(v)[1]]-date)/minutes) % 60}:
              {Math.floor((v[Object.keys(v)[1]]-date)/seconds) % 60}
            </li>
          )
        })}
      </ul>
    </div>
  );
}

export default App;
