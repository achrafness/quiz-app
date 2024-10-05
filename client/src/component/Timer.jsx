import React, { useEffect } from 'react';
import useQuestionStore from '../store/useQuestionStore';

const Timer = () => {
    const { timer, setTimer, startTimer, stopTimer, isTimerActive } = useQuestionStore();

    useEffect(() => {
        let interval;
        if (isTimerActive && timer > 0) {
            interval = setInterval(() => {
                setTimer((prevTimer) => prevTimer - 1);
            }, 1000);
        } else if (timer === 0) {
            stopTimer(); // Stop timer when it reaches 0
            alert("Time's up!");
        }
        return () => clearInterval(interval);
    }, [isTimerActive, timer, setTimer, stopTimer]);

    const handleStart = () => {
        setTimer(300); // Set to 5 minutes (300 seconds)
        startTimer();
    };

    const handleReset = () => {
        stopTimer();
        setTimer(0);
    };

    return (
        <div className="bg-[#333] p-6 rounded-lg mb-4">
            <h2 className="text-2xl font-semibold mb-4">Timer</h2>
            <p className="text-lg mb-2">Time Left: {timer}s</p>
            <button
                onClick={handleStart}
                className="bg-green-500 text-white px-4 py-2 rounded mr-2"
            >
                Start Challenge
            </button>
            <button
                onClick={handleReset}
                className="bg-red-500 text-white px-4 py-2 rounded"
            >
                Reset Timer
            </button>
        </div>
    );
};

export default Timer;
