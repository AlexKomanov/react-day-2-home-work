import React, { useEffect, useState } from 'react'
import audioFile from './sample-3s.mp3'
import './Countdown.css';

const Countdown = ({ startFrom, onDone, toTime }) => {

    const calculateTimeRemaining = () => {
        const now = Date.now();
        const timeRemaining = (toTime) ? Math.floor((toTime - now) / 1000) : startFrom;

        // Math.max(0, timeRemaining) -> ensures that the calculated time remaining is never negative. 
        return Math.max(0, timeRemaining);
    }

    const formatTime = (timeInSeconds) => {
        const hours = Math.floor(timeInSeconds / 3600);
        const minutes = Math.floor((timeInSeconds % 3600) / 60);
        const seconds = timeInSeconds % 60;
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
      };

    const [seconds, setSeconds] = useState(() => calculateTimeRemaining());
    const [isExpired, setIsExpired] = useState(false);

    function playToWinner() {
        const audio = new Audio(audioFile);
        audio.volume = 0.5;
        audio.play();
    };

    useEffect(() => {
        let intervalId;


        if (toTime !== seconds && toTime) {
            intervalId = setInterval(() => {
                setSeconds(prevSeconds => prevSeconds + 1)
            }, 1000);
        }

        else if (seconds > 0 && !toTime  ) {
            intervalId = setInterval(() => {
                setSeconds((prevSeconds) => prevSeconds - 1);
            }, 1000);
        }
        else {
            setIsExpired(true);
            clearInterval(intervalId);

            if (onDone) {
                console.log("On Done!!!!")

            }
        }

        return () => clearInterval(intervalId);
    }, [seconds, onDone, toTime])


    return (
        <div className='clock-container'>
            <h1>Countdown</h1>
        <div className={`clock-face ${((!toTime && seconds <= 6 && !isExpired) || (toTime && !isExpired && (toTime - seconds <= 6))) ? "red" : "black"}`}>

            
            <p>{formatTime(seconds)}</p>
            {isExpired && <p>Time's up!</p>}
            {isExpired && onDone && <button onClick={playToWinner}>Take an AWARD!</button>}
        </div>
        </div>
    )
}

export default Countdown