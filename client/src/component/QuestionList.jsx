import React from 'react';
import useQuestionStore from '../store/useQuestionStore';

const QuestionList = () => {
    const { questions, updateQuestion, deleteQuestion } = useQuestionStore();

    return (
        <div className="bg-[#333] p-6 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">Questions List</h2>
            {questions.length > 0 ? (
                questions.map((question) => (
                    <div key={question.id} className="mb-4 border-b border-gray-700 pb-2">
                        <p className="font-medium">{question.question}</p>
                        <p>Options: {question.options.join(', ')}</p>
                        <p>Correct Answer: {question.answer}</p>
                        <button
                            onClick={() => deleteQuestion(question.id)}
                            className="bg-red-500 text-white px-2 py-1 rounded mt-2"
                        >
                            Delete
                        </button>
                        {/* Optionally add edit functionality here */}
                    </div>
                ))
            ) : (
                <p>No questions available.</p>
            )}
        </div>
    );
};

export default QuestionList;
