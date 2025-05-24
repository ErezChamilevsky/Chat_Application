import { useState } from 'react';
import WritingTest from './WritingTest';
import ReadingTest from './ReadingTest';
import SpeakingTest from './SpeakingTest';
// General-purpose test component used for Reading, Writing, Speaking
function TypeTest({key, type, questions, setAnswers, setTypeTestEnd }) {
    
    if (type === "Writing") {
        return (
            <WritingTest
                type={type}
                questions={questions}
                setAnswers={setAnswers}
                setTypeTestEnd={setTypeTestEnd} />
        );
    }

    if(type === "Reading"){
        return (
            <ReadingTest
                type={type}
                questions={questions}
                setAnswers={setAnswers}
                setTypeTestEnd={setTypeTestEnd} />
        );
    }

    if(type === "Speaking"){
        return(
            <SpeakingTest
                type={type}
                questions={questions}
                setAnswers={setAnswers}
                setTypeTestEnd={setTypeTestEnd} />
        );
    }

}

export default TypeTest;