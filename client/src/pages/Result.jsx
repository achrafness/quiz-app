import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useResultStore from '../store/useResultStore';
import { ToastContainer, toast } from "react-toastify";

const Result = () => {
  const { score, username, answers, submitResult } = useResultStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!username || Object.keys(answers).length === 0) {
      navigate('/');
    }
  }, [username, answers, navigate]);

  return (
    <div className="container mx-auto p-8 bg-[#2B2B2B] text-white min-h-screen flex flex-col items-center justify-center">
      <ToastContainer />
      <h1 className="text-5xl font-bold text-center mb-8 text-[#72EA88] drop-shadow-lg">
        Quiz Result
      </h1>
      <div className="bg-[#333] p-6 rounded-lg shadow-lg w-full max-w-3xl text-center">
        <h2 className="text-3xl font-semibold text-[#72EA88] mb-4">
          Congratulations, {username}!
        </h2>
        <p className="text-xl text-white mb-8">
          You scored: <span className="text-[#72EA88] font-bold">{score}</span> points
        </p>

        <div className="mt-6">
          <button
            className="btn bg-[#72EA88] text-[#2B2B2B] px-6 py-3 rounded-md text-lg font-semibold hover:bg-[#66d07c] transition duration-300 ease-in-out"
            onClick={() => navigate('/scoreboard')}
          >
            Go to The ScoreBoard
          </button>
        </div>
      </div>
    </div>
  );
};

export default Result;
