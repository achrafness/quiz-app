import { useEffect, useState, useRef } from 'react';
import io from 'socket.io-client';
import axiosBaseURL from '../axiosConfig';

const Scoreboard = () => {
  const [scores, setScores] = useState([]);
  const [timeLeft, setTimeLeft] = useState(0); // Time left from the database
  const [loading, setLoading] = useState(true); // Loading state for the timer
  const socketRef = useRef();

  useEffect(() => {
    // socketRef.current = io("https://nexus-quiz.onrender.com/");
    socketRef.current = io("http://localhost:3000/");

    socketRef.current.on("connect", () => {
      console.log("Socket connected: ", socketRef.current.id);
    });

    socketRef.current.on("disconnect", () => {
      console.log("Socket disconnected");
    });

    const fetchScores = async () => {
      try {
        const response = await axiosBaseURL.get("/result");
        setScores(response.data.results);
      } catch (error) {
        console.error("Error fetching scores:", error);
      }
    };

    const fetchTimer = async () => {
      try {
        const response = await axiosBaseURL.get("/timer"); // Fetch the timer from your timer endpoint
        const timer = response.data.timer;

        if (timer) {
          const currentTime = new Date().getTime();
          const endTime = new Date(timer.end).getTime();
          const timeRemaining = Math.max(0, Math.floor((endTime - currentTime) / 1000)); // Calculate time left in seconds
          setTimeLeft(timeRemaining);
        }
      } catch (error) {
        console.error("Error fetching timer:", error);
      } finally {
        setLoading(false); // Stop loading once data is fetched
      }
    };

    fetchScores();
    fetchTimer();

    socketRef.current.on("scoreboardUpdate", (updatedScores) => {
      console.log("Updated scores received:", updatedScores);
      setScores(updatedScores);
    });

    return () => {
      socketRef.current.off("scoreboardUpdate");
      socketRef.current.disconnect(); // Close the connection
    };
  }, []);

  // Timer Logic
  useEffect(() => {
    let timer;
    if (timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      clearInterval(timer);
      console.log("Time's up!"); // Here you can trigger actions when the timer expires
    }

    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="container bg-green mx-auto p-8 bg-[#2B2B2B] text-white min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-5xl font-bold text-center mb-8 text-[#72EA88] drop-shadow-lg">
        Scoreboard
      </h1>

      {/* Timer Display */}
      {loading ? (
        <p>Loading timer status...</p>
      ) : (
        <div className="text-3xl font-bold mb-4">
          Time Left: {formatTime(timeLeft)}
        </div>
      )}

      <div className="bg-[#333] p-6 rounded-lg shadow-lg w-full max-w-3xl">
        <table className="min-w-full table-auto text-left">
          <thead>
            <tr className="bg-[#444]">
              <th className="py-2 px-4 font-semibold">Username</th>
              <th className="py-2 px-4 font-semibold">Score</th>
            </tr>
          </thead>
          <tbody>
            {scores.length > 0 ? (
              scores.map((scoreEntry, idx) => (
                <tr key={idx} className="border-b border-[#444]">
                  <td className="py-2 px-4">{scoreEntry.username}</td>
                  <td className="py-2 px-4">{scoreEntry.score}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="2" className="py-2 px-4 text-center">No scores available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Scoreboard;
