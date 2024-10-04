import { useState } from 'react';

const Questions = ({ question, onChecked }) => {
    const [selectedOption, setSelectedOption] = useState(undefined);

    const handleSelect = (option) => {
        setSelectedOption(option);
        onChecked(option);  // Notify the parent component
    };

    return (
        <div className="bg-[#333] p-6 rounded-lg shadow-lg w-full">
            {/* Question */}
            <h2 className="text-3xl font-bold text-[#72EA88] mb-6">{question?.question}</h2>

            {/* Options */}
            <div className="space-y-4">
                {question?.options.map((option, idx) => (
                    <div key={idx} className="option flex items-center space-x-4">
                        <input
                            type="radio"
                            name="option"
                            value={option}
                            checked={selectedOption === option}
                            onChange={() => handleSelect(option)}
                            className="h-5 w-5 text-[#72EA88] border-gray-300 focus:ring-[#72EA88] focus:outline-none cursor-pointer"
                        />
                        <label
                            className="text-xl text-white cursor-pointer"
                            onClick={() => handleSelect(option)}  // Make label clickable
                        >
                            {option}
                        </label>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Questions;
