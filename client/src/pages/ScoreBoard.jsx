import React, { useEffect, useState, useRef } from 'react';
import io from 'socket.io-client';
import axiosBaseURL from '../axiosConfig';
const Scoreboard = () => {
  const [scores, setScores] = useState([]);
  const socketRef = useRef();
  
  useEffect(() => {
    socketRef.current = io("https://nexus-quiz.onrender.com/");
    // socketRef.current = io("http://localhost:3000/");

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

    fetchScores();

    socketRef.current.on("scoreboardUpdate", (updatedScores) => {
      console.log("Updated scores received:", updatedScores);
      setScores(updatedScores);
    });

    return () => {
      socketRef.current.off("scoreboardUpdate");
      socketRef.current.disconnect(); // Close the connection
    };
  }, []); 

  return (
    <div className="container mx-auto p-8 bg-[#2B2B2B] text-white min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-5xl font-bold text-center mb-8 text-[#72EA88] drop-shadow-lg">
        Scoreboard
      </h1>
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
