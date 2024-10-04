import React, { useEffect, useState } from 'react';
import Questions from "../component/Questions";
import { Navigate } from 'react-router-dom';
import useQuizStore from '../store/useQuizStore';
import useResultStore from '../store/useResultStore'; 

export default function Quiz() {
  const [check, setChecked] = useState(undefined);
  const { questions, trace, answers, fetchQuestions, moveNext, movePrev, pushAnswer } = useQuizStore();
  const { submitResult, setAnswer } = useResultStore(); 

  useEffect(() => {
    fetchQuestions();
  }, [fetchQuestions]);

  const onNext = () => {
    if (trace < questions.length - 1) {
      moveNext(); 

      if (check !== undefined) {
        pushAnswer(check); 
        setAnswer(questions[trace]._id, check);
      }
    } else {
      if (check !== undefined && answers.length === trace) {
        pushAnswer(check);
        setAnswer(questions[trace]._id, check);
      }

      submitResult();

      console.log('Quiz completed! Redirecting to result...');
    }
  };

  const onPrev = () => {
    if (trace > 0) {
      movePrev();
    }
  };

  const onChecked = (check) => {
    setChecked(check);
  };

  if (answers.length >= questions.length) {
    return <Navigate to="/result" replace={true} />;
  }

  return (
    <div className="container mx-auto p-8 bg-[#2B2B2B] text-white min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-5xl font-bold text-center mb-8 text-[#72EA88] drop-shadow-lg">
        Quiz Application
      </h1>

      {questions.length > 0 && (
        <div className="w-full max-w-3xl bg-[#333] p-6 rounded-lg shadow-lg">
          <Questions question={questions[trace]} onChecked={onChecked} />
        </div>
      )}

      <div className="flex justify-between mt-8 w-full max-w-3xl">
        {trace > 0 && (
          <button
            className="btn bg-[#72EA88] text-[#2B2B2B] px-6 py-3 rounded-md text-lg font-semibold hover:bg-[#66d07c] transition duration-300 ease-in-out"
            onClick={onPrev}
          >
            Prev
          </button>
        )}
        <button
          className="btn bg-[#72EA88] text-[#2B2B2B] px-6 py-3 rounded-md text-lg font-semibold hover:bg-[#66d07c] transition duration-300 ease-in-out ml-auto"
          onClick={onNext}
        >
          {trace === questions.length - 1 ? 'Finish' : 'Next'}
        </button>
      </div>
    </div>
  );
}
