import React, { useState, useEffect } from 'react';

function Timer({ time, setTime, isRunning }) {



    useEffect(() => {
        let interval;
        if (isRunning) {
            interval = setInterval(() => {
                setTime(prev => prev + 1);
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [isRunning]);

    const formatTime = (timeInSeconds) => {
        const hours = String(Math.floor(timeInSeconds / 3600)).padStart(2, '0');
        const minutes = String(Math.floor((timeInSeconds % 3600) / 60)).padStart(2, '0');
        const seconds = String(timeInSeconds % 60).padStart(2, '0');
        return `${hours}:${minutes}:${seconds}`;
    };
    return (
        <span>{formatTime(time)}</span>
    );
}

export default Timer;
