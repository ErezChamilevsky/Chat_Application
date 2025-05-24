import { useState } from 'react';

function WritingTest({ type, questions, setAnswers, setTypeTestEnd }) {
    // Track current question index and local answers
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [localAnswers, setLocalAnswers] = useState(Array(questions.length).fill(""));

    // Handle answer change for current question
    const handleAnswerChange = () => {
        // Move to next question
        setCurrentQuestionIndex(currentQuestionIndex + 1);
    };

    // Handle input change and update local answers
    const handleInputChange = (value) => {
        const updated = [...localAnswers];
        updated[currentQuestionIndex] = value;
        setLocalAnswers(updated);
    };

    // Submit all answers and signal test end
    const handleSubmit = () => {
        setAnswers(localAnswers);
        setTypeTestEnd(true);
    };

    // Check if there are more questions after current one
    const hasMoreQuestions = currentQuestionIndex < questions.length - 1;

    return (
        <div className="card-body">
            <h3 className="card-title">{type} Test</h3>

            {/* Display current question */}
            <div className="mb-3 text-start">
                <h5>
                    {currentQuestionIndex + 1}. {questions[currentQuestionIndex]}
                </h5>

                {/* Input field based on test type */}
                {
                    <textarea
                        className="form-control"
                        rows="1"
                        value={localAnswers[currentQuestionIndex]}
                        onChange={(e) => handleInputChange(e.target.value)}
                    />
                }
            </div>

            {/* Navigation button - Next or Submit based on remaining questions */}
            {hasMoreQuestions ? (
                <button
                    className="btn btn-primary mt-3"
                    onClick={handleAnswerChange}
                >
                    Next Question
                </button>
            ) : (
                <button
                    className="btn btn-primary mt-3"
                    onClick={handleSubmit}
                >
                    Submit
                </button>
            )}

        </div>
    );
}

export default WritingTest;