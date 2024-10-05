import { useEffect, useState } from 'react';
import useQuestionDashStore from '../store/useQuestionDashStore';
import { ToastContainer, toast } from "react-toastify";

const Questions = () => {
    const { questions, fetchQuestions, addQuestion, deleteQuestion, updateQuestion } = useQuestionDashStore();
    const [newQuestion, setNewQuestion] = useState({ question: '', options: [], answer: '' });
    const [editingQuestionId, setEditingQuestionId] = useState(null);
    const [inputValue, setInputValue] = useState('');

    useEffect(() => {
        fetchQuestions();
    }, [fetchQuestions]);

    const handleAddOrUpdateQuestion = async () => {
        if (editingQuestionId) {
            await updateQuestion(editingQuestionId, newQuestion);
            setEditingQuestionId(null);
            toast.success("edit Question successfully!");
        } else {
            await addQuestion(newQuestion);
            toast.success("Question Added successfully!");
        }
        setNewQuestion({ question: '', options: [], answer: '' });
        setInputValue(''); // Clear input field after adding/updating
    };

    const handleEditQuestion = (question) => {
        setNewQuestion({
            question: question.question,
            options: question.options, 
            answer: question.answer
        });
        setEditingQuestionId(question._id);
    };

    const handleOptionChange = (index, value) => {
        const updatedOptions = [...newQuestion.options];
        updatedOptions[index] = value;
        setNewQuestion({ ...newQuestion, options: updatedOptions });
    };

    const handleAddOption = () => {
        if (inputValue.trim() !== '') {
            setNewQuestion({ ...newQuestion, options: [...newQuestion.options, inputValue.trim()] });
            setInputValue(''); 
        }
    };

    const handleRemoveOption = (index) => {
        const updatedOptions = newQuestion.options.filter((_, i) => i !== index);
        setNewQuestion({ ...newQuestion, options: updatedOptions });
    };

    return (
        <div className="container mx-auto p-6 bg-gray-100 rounded-lg shadow-lg">
            <ToastContainer />
            <h1 className="text-3xl font-bold mb-4">Manage Questions</h1>

            {/* Add or Edit Question Form */}
            <div className="mb-6 p-4 bg-white rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold mb-4">{editingQuestionId ? 'Edit Question' : 'Add Question'}</h2>
                <input
                    type="text"
                    placeholder="Enter question"
                    value={newQuestion.question}
                    onChange={(e) => setNewQuestion({ ...newQuestion, question: e.target.value })}
                    className="border border-gray-300 p-3 mb-2 w-full rounded-md focus:outline-none focus:ring focus:ring-[#72EA88] transition"
                />

                {/* Options Input */}
                <h3 className="font-semibold mb-2">Options</h3>
                <div className="flex items-center mb-2">
                    <input
                        type="text"
                        placeholder="Enter option"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                e.preventDefault();
                                handleAddOption();
                            }
                        }}
                        className="border border-gray-300 p-2 rounded-md flex-grow"
                    />
                    <button
                        onClick={handleAddOption}
                        className="bg-[#72EA88] hover:bg-[#66d07c] text-white p-2 rounded ml-2"
                    >
                        Add
                    </button>
                </div>

                {/* Display Options */}
                <div className="grid grid-cols-1 gap-2 mb-4">
                    {newQuestion.options.map((option, index) => (
                        <div key={index} className="flex items-center justify-between border-b py-2">
                            <input
                                type="text"
                                value={option}
                                onChange={(e) => handleOptionChange(index, e.target.value)}
                                className="border border-gray-300 p-2 rounded-md flex-grow"
                                placeholder={`Option ${index + 1}`}
                            />
                            <button
                                onClick={() => handleRemoveOption(index)}
                                className="text-red-500 ml-2"
                            >
                                Remove
                            </button>
                        </div>
                    ))}
                </div>

                <input
                    type="text"
                    placeholder="Enter answer (index)"
                    value={newQuestion.answer}
                    onChange={(e) => setNewQuestion({ ...newQuestion, answer: e.target.value })}
                    className="border border-gray-300 p-3 mb-2 w-full rounded-md focus:outline-none focus:ring focus:ring-[#72EA88] transition"
                />
                <button
                    onClick={handleAddOrUpdateQuestion}
                    className="bg-[#72EA88] hover:bg-[#66d07c] text-white p-2 rounded"
                >
                    {editingQuestionId ? 'Update Question' : 'Add Question'}
                </button>
            </div>

            {/* Questions List */}
            <h2 className="text-2xl font-semibold mb-4">Questions List</h2>
            <ul className="bg-white rounded-lg shadow-md">
                {questions.map((question) => (
                    <li key={question._id} className="flex justify-between items-center border-b border-gray-200 p-4">
                        <span className="text-lg">{question.question}</span>
                        <div>
                            <button
                                onClick={() => handleEditQuestion(question)}
                                className="text-blue-500 hover:text-blue-700 mr-4 transition duration-300"
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => deleteQuestion(question._id)}
                                className="text-red-500 hover:text-red-700 transition duration-300"
                            >
                                Delete
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Questions;
