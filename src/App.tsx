import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [time, setTime] = useState(new Date())
  const [is24Hour, setIs24Hour] = useState(true)

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const formatTime = (date: Date) => {
    let hours = date.getHours()
    const minutes = date.getMinutes()
    const seconds = date.getSeconds()
    let period = ''

    if (!is24Hour) {
      period = hours >= 12 ? 'PM' : 'AM'
      hours = hours % 12 || 12
    }

    const hoursStr = String(hours).padStart(2, '0')
    const minutesStr = String(minutes).padStart(2, '0')
    const secondsStr = String(seconds).padStart(2, '0')

    return { hoursStr, minutesStr, secondsStr, period }
  }

  const formatDate = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    }
    return date.toLocaleDateString('en-US', options)
  }

  const { hoursStr, minutesStr, secondsStr, period } = formatTime(time)

  return (
    <div className="clock-container">
      <div className="clock-card">
        <div className="time-display">
          <div className="time-segment">
            <span className="time-number">{hoursStr}</span>
          </div>
          <span className="time-separator">:</span>
          <div className="time-segment">
            <span className="time-number">{minutesStr}</span>
          </div>
          <span className="time-separator">:</span>
          <div className="time-segment">
            <span className="time-number">{secondsStr}</span>
          </div>
          {!is24Hour && <span className="period">{period}</span>}
        </div>
        
        <div className="date-display">
          {formatDate(time)}
        </div>

        <div className="controls">
          <button 
            className="format-toggle"
            onClick={() => setIs24Hour(!is24Hour)}
          >
            {is24Hour ? '12-Hour' : '24-Hour'} Format
          </button>
        </div>
      </div>
    </div>
  )
}

export default App
