import React, { useEffect, useRef, useState } from 'react'

const StopWatch = (timeString) => {
    const time = timeString.timeString
    const hour0 = new Date().getHours()
    const min0 = new Date().getMinutes()
    const sec0 = new Date().getSeconds()
    const date = new Date(time);

    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    const timer1 = hours * 3600 + minutes * 60 + seconds
    const timer0 = (hour0 * 3600 + min0 * 60 + sec0) - timer1
    // console.log(timer0);

    const [timer, setTimer] = useState(timer0);
    const [laps, setLaps] = useState([]);
    const [running, setRunning] = useState(false);
    const countRef = useRef(null);

    const handleStartStop = () => {
        if (running) {
            clearInterval(countRef.current);
        } else {
            countRef.current = setInterval(() => {
                setTimer((timer) => timer + 1);
            }, 1000);
        }
        setRunning(!running);
    };
    const handleLap = () => {
        if (running) {
            setLaps([...laps, timer]);
        }
    };
    const handleReset = () => {
        clearInterval(countRef.current);
        setRunning(false);
        setTimer(timer0);
        setLaps([]);
    };
    const formatTime = (timer) => {
        const getSeconds = `0${timer % 60
            }`.slice(-2);
        const minutes = `${Math.floor(timer / 60)
            }`;
        const getMinutes = `0${minutes % 60}`.slice(-2);
        const getHours = `0${Math.floor(timer / 3600)}`.slice(-2);
        return `${getHours}:${getMinutes}:${getSeconds}`
    };
    const getSeconds = (timer) => {
        return `0${timer % 60}`.slice(-2);
    }
    const getMinutes = (timer) => {
        const minutes = `${Math.floor(timer / 60)}`;
        return `0${minutes % 60}`.slice(-2);
    }
    const getHours = (timer) => {
        return `0${Math.floor(timer / 3600)}`.slice(-2);
    }
    useEffect(() => {
        countRef.current = setInterval(() => {
            setTimer((timer) => timer + 1);
        }, 1000);
        return () => clearInterval(countRef.current);
    }, []);
    return (
        <div className="app ">
            {/* <div>{formatTime(timer)}</div> */}
            {
                (
                    <span className="countdown font-mono text-sm ">
                        <span style={{ "--value": getHours(timer) }}></span>:
                        <span style={{ "--value": getMinutes(timer) }}></span>:
                        <span style={{ "--value": getSeconds(timer) }}></span>
                    </span>
                )
            }
            {/* <button className="btn btn-success btn-sm text-white mx-1" onClick={handleStartStop} >{running ? 'Stop' : 'Start'}</button> */}
            {/* <button className="btn btn-primary text-white" onClick={handleLap}>Lap</button> */}
            {/* <button className="btn btn-error btn-sm text-white" onClick={handleReset} >Reset</button> */}
            <ul>
                {laps.map((lap, index) => (
                    <li key={index}>Lap {index + 1}: {formatTime(lap)}</li>
                ))}
            </ul>
        </div >
    );
}

export default StopWatch