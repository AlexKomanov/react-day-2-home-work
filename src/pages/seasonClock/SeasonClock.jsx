import React, { useEffect, useState } from 'react'
import * as ut from '../../services/util.service'
import "./seasonClock.css"
import winter from '../../assets/winter.jpg'

const SeasonClock = () => {

  const [isDark, setIsDark] = useState(true);
  const [date, setDate] = useState(new Date())

  const toggleWidgetTheme = () => {
    setIsDark((isDark) => !isDark)
  }

  useEffect(() => {
    const intervalId = setInterval(() => {
      setDate(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, [])

  const formattedTime = date.toLocaleTimeString();
  const monthName = ut.utilService.getMonthName(date);
  const seasonName = ut.utilService.getSeason(monthName);

  return (
    <div>

      <div className='season-container'>
        <div className={`season-widget ${isDark ? 'dark' : 'light'}`} onClick={toggleWidgetTheme}>
          <h2>Season Clock</h2>
          <p>{ut.utilService.getMonthName(date, "il")} ({seasonName})</p>
          <img src={winter} alt="winter" width={"50%"} />
          <p>{ut.utilService.getDayName(date, "il")}</p>
          <h4>Current Time</h4>
          <p>{formattedTime}</p>

        </div>


      </div>

    </div>
  )
}

export default SeasonClock