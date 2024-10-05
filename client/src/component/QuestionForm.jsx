import React, { useState } from 'react';
import useQuestionStore from '../store/useQuestionStore';

const QuestionForm = () => {
    const { addQuestion } = useQuestionStore();
    const [questionText, setQuestionText] = useState('');
    const [options, setOptions] = useState(['', '', '', '']);
    const [correctAnswer, setCorrectAnswer] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const question = {
            id: Date.now(), // Unique ID
            question: questionText,
            options,
            answer: correctAnswer,
        };
        addQuestion(question);
        // Reset form
        setQuestionText('');
        setOptions(['', '', '', '']);
        setCorrectAnswer('');
    };

    return (
        <form onSubmit={handleSubmit} className="bg-[#333] p-6 rounded-lg mb-4">
            <div className="mb-4">
                <label className="block text-lg mb-2">Question</label>
                <input
                    type="text"
                    value={questionText}
                    onChange={(e) => setQuestionText(e.target.value)}
                    required
                    className="w-full p-2 rounded-md text-[#2B2B2B]"
                />
            </div>
            {options.map((option, index) => (
                <div key={index} className="mb-4">
                    <label className="block text-lg mb-2">Option {index + 1}</label>
                    <input
                        type="text"
                        value={option}
                        onChange={(e) => {
                            const newOptions = [...options];
                            newOptions[index] = e.target.value;
                            setOptions(newOptions);
                        }}
                        required
                        className="w-full p-2 rounded-md text-[#2B2B2B]"
                    />
                </div>
            ))}
            <div className="mb-4">
                <label className="block text-lg mb-2">Correct Answer (Option Number)</label>
                <input
                    type="number"
                    value={correctAnswer}
                    onChange={(e) => setCorrectAnswer(e.target.value)}
                    min="1" max="4"
                    required
                    className="w-full p-2 rounded-md text-[#2B2B2B]"
                />
            </div>
            <button
                type="submit"
                className="bg-[#72EA88] text-[#2B2B2B] px-4 py-2 rounded-md"
            >
                Add Question
            </button>
        </form>
    );
};

export default QuestionForm;
