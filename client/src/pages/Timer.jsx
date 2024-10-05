import { useState, useEffect } from 'react';
import axiosBaseURL from '../axiosConfig';
import { ToastContainer, toast } from 'react-toastify';
import useTimerStore from '../store/useTimerStore';

const Timer = () => {
    const { timeLeft, timerId, isActive, setTimer, clearTimer, tick } = useTimerStore();
    const [hours, setHours] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);

    useEffect(() => {
        // Fetch the existing timer on component mount
        const fetchTimer = async () => {
            try {
                const response = await axiosBaseURL.get("/timer");
                if (response.data.timer) {
                    const { end } = response.data.timer;
                    const currentTime = new Date().getTime();
                    const timeRemaining = Math.max(0, Math.floor((new Date(end).getTime() - currentTime) / 1000));
                    setTimer(timeRemaining, response.data.timer._id);
                }
            } catch (error) {
                toast.error("Failed to fetch timer.");
                console.error("Error fetching timer:", error);
            }
        };

        fetchTimer();
    }, [setTimer]);

    useEffect(() => {
        let timerInterval;
        if (isActive && timeLeft > 0) {
            timerInterval = setInterval(() => {
                tick();
            }, 1000);
        } else if (timeLeft === 0 && isActive) {
            clearTimer();
            deleteTimer();
            toast.info("Time's up!");
        }

        return () => clearInterval(timerInterval);
    }, [isActive, timeLeft, tick, clearTimer]);

    const startTimer = async () => {
        const totalSeconds = hours * 3600 + minutes * 60 + seconds;

        if (totalSeconds <= 0) {
            toast.error("Please enter a valid time.");
            return;
        }

        try {
            const response = await axiosBaseURL.post("/timer", {
                start: new Date(),
                end: new Date(new Date().getTime() + totalSeconds * 1000), // Set end time based on input
            });
            setTimer(totalSeconds, response.data.timer._id);
            toast.success("Timer started!");
        } catch (error) {
            toast.error("Failed to start the timer. Another timer may be running.");
            console.error("Error starting the timer:", error);
        }
    };

    const deleteTimer = async () => {
        try {
            await axiosBaseURL.delete(`/timer`);
            clearTimer();
            toast.success("Timer stopped and deleted.");
        } catch (error) {
            toast.error("Failed to delete the timer.");
            console.error("Error deleting the timer:", error);
        }
    };

    return (
        <div>
            <ToastContainer />
            <h1 className="text-3xl font-bold mb-4 w-full">Quiz Timer</h1>

            {isActive ? (
                <div>
                    <h2 className="text-5xl font-semibold">Time Left: {timeLeft} seconds</h2>
                    <button
                        onClick={deleteTimer}
                        className="bg-red-500 hover:bg-red-600 text-white p-2 rounded mt-4"
                    >
                        Stop Timer
                    </button>
                </div>
            ) : (
                <div>
                    <div className="flex items-center mb-4">
                        <input
                            type="number"
                            placeholder="Hours"
                            value={hours}
                            onChange={(e) => setHours(Number(e.target.value))}
                            className="border p-2 rounded mr-2"
                        />
                        <input
                            type="number"
                            placeholder="Minutes"
                            value={minutes}
                            onChange={(e) => setMinutes(Number(e.target.value))}
                            className="border p-2 rounded mr-2"
                        />
                        <input
                            type="number"
                            placeholder="Seconds"
                            value={seconds}
                            onChange={(e) => setSeconds(Number(e.target.value))}
                            className="border p-2 rounded"
                        />
                    </div>

                    <button
                        onClick={startTimer}
                        className="bg-[#72EA88] hover:bg-[#66d07c] text-white p-2 rounded"
                    >
                        Start Timer
                    </button>
                </div>
            )}
        </div>
    );
};

export default Timer;
