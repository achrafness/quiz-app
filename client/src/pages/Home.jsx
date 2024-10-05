import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import useResultStore from "../store/useResultStore";
import { FaLock } from 'react-icons/fa'; // Importing a locked icon from React Icons
import axiosBaseURL from '../axiosConfig';
const Home = () => {
  const { username, setUsername } = useResultStore();
  const navigate = useNavigate();
  const [hasTimer, setHasTimer] = useState(false); // State to check if the timer exists
  const [loading, setLoading] = useState(true); // Loading state

  const handleInputChange = (e) => {
    setUsername(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username) {
      alert("Please enter a username.");
      return;
    }
    navigate('/quiz');
  };

  useEffect(() => {
    const fetchTimer = async () => {
      try {
        const response = await axiosBaseURL.get('/timer'); 
        setHasTimer(!!response.data.timer); 
      } catch (error) {
        console.error("Error fetching timer:", error);
        setHasTimer(false); 
      } finally {
        setLoading(false);
      }
    };

    fetchTimer();
  }, []);

  return (
    <div className="container mx-auto p-6 bg-[#2B2B2B] text-white min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold text-center mb-6 text-[#72EA88]">Quiz Application</h1>

      {loading ? (
        <p>Loading timer status...</p> // Loading message
      ) : hasTimer ? (
        <>
          <ol className="list-decimal list-inside space-y-2 text-lg">
            <li>You will be asked 10 questions one after another.</li>
            <li>Each question has three options. You can choose only one option.</li>
            <li>You can review and change answers before the quiz finishes.</li>
            <li>The result will be declared at the end of the quiz.</li>
          </ol>
          <form className="my-8 w-full max-w-md">
            <input
              className="block w-full p-2 rounded-md text-[#2B2B2B] placeholder-gray-400"
              type="text"
              placeholder="Username*"
              value={username}
              onChange={handleInputChange}
              required
            />
            <div className="start text-center mt-4">
              <button
                className="btn inline-block bg-[#72EA88] hover:bg-[#5fcc6a] text-[#2B2B2B] font-semibold px-6 py-2 rounded-md"
                onClick={handleSubmit}
              >
                Start Quiz
              </button>
            </div>
          </form>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center h-full">
          <FaLock className="text-6xl text-red-500 mb-4" /> {/* Display the locked icon */}
          <p className="text-lg">No active timer. Please create a timer to start the quiz.</p>
        </div>
      )}
    </div>
  );
};

export default Home;
