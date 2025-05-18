import { useState, useEffect } from "react";
// import { askGeminiToCheck, generateGeminiQuestion } from './GeminiFunctionsForTest';

function WritingQuestion({ setWritingScore, EnglishLevel }) {
    const [answer, setAnswer] = useState('');
    const [geminiQuestion, setGeminiQuestion] = useState('');

    // useEffect(() => {
    //     async function fetchQuestion() {
    //         const question = await generateGeminiQuestion({ typeOfTest: 'Writing', EnglishLevel });
    //         setGeminiQuestion(question);
    //     }

    //     fetchQuestion();
    // }, [EnglishLevel]); // only re-fetch if EnglishLevel changes

    // const handleCheckAnswer = async () => {
    //     const feedback = await askGeminiToCheck({
    //         question: geminiQuestion,
    //         answer: answer
    //     });
    //     console.log(feedback);
    // };

    return (
        <div className="container">
            <h4>{geminiQuestion || "Loading question..."}</h4>
            <input
                type="text"
                className="form-control border rounded"
                placeholder="Your answer..."
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
            />
            {/* <button className="btn btn-primary" onClick={handleCheckAnswer}>Next</button> */}
        </div>
    );
}

export default WritingQuestion;
