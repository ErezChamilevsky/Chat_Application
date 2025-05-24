import { useEffect, useState } from 'react';
import NavBar from '../components/utilities/NavBar';
import './css/page-test.css';
import TypeTest from '../components/test/TypeTest';
import Results from '../components/test/Results';

function TestPage() {
    const [answers, setAnswers] = useState([]);
    const [currentAnswers, setCurrentAnswers] = useState([]);
    const [typeTestEnd, setTypeTestEnd] = useState(false);
    const [progressPrecent, setProgressPrecent] = useState(0);

    const [currentTypeIndex, setCurrentTypeIndex] = useState(0);
    const [questions, setQuestions] = useState([]);
    const [testFinished, setTestFinished] = useState(false);
    const [testKey, setTestKey] = useState(0);
    const [scores, setScores] = useState({ reading: 0, writing: 0, speaking: 0 });

    const types = ['Reading', 'Writing', 'Speaking'];

    // Get 6 questions for current type
    const generateQuestions = async (type) => {
        const res = await fetch('/api/gemini/generate-question', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ type }),
        });
        const data = await res.json();
        return data.text.split('\n').filter(line => line.trim()).slice(0, 6);
    };

    // Send answers to server for checking and return score
    const checkAnswers = async (type, questions, answers) => {
        const res = await fetch('/api/gemini/check-answers', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({type, questions, answers }),
        });
        const data = await res.json();
        return data.score;
    };

    // When user finishes a test section
    useEffect(() => {
        console.log("got here");
        const handleFinish = async () => {
            if (typeTestEnd) {
                const currentType = types[currentTypeIndex];
                const score = await checkAnswers(currentType, questions, currentAnswers);
                setScores(prev => ({
                    ...prev,
                    [currentType.toLowerCase()]: score
                }));

                setProgressPrecent((currentTypeIndex + 1) * (100 / types.length));
                setAnswers(prev => [...prev, ...currentAnswers]);

                if (currentTypeIndex < types.length - 1) {
                    setCurrentTypeIndex(prev => prev + 1);
                    setTypeTestEnd(false);
                    setTestKey(prev => prev + 1);  // Force remount of TypeTest
                } else {
                    setTestFinished(true);
                }
            }
        }
          
        handleFinish();
        

    }, [typeTestEnd]);  
    
    

    // When current test type changes, get its 6 questions
    useEffect(() => {
        if (!testFinished) {
            generateQuestions(types[currentTypeIndex]).then(setQuestions);
        }
    }, [currentTypeIndex]);

    if (testFinished) {
        return (
            <div className="container">
                <NavBar />
                <div className="test-wraper text-center">
                    <h2>Test Finished</h2>
                    <p>Reading: {scores.reading}</p>
                    <p>Writing: {scores.writing}</p>
                    <p>Speaking: {scores.speaking}</p>
                    <p>Average Score: {Math.round((scores.reading + scores.writing + scores.speaking) / 3)}</p>
                </div>
            </div>
        );
    }

    return (
        <div className='container'>
            <NavBar />
            <div className='test-wraper'>
                <div className="card text-center">
                    <div className="progress" role="progressbar" aria-valuenow={progressPrecent} aria-valuemin="0" aria-valuemax="100">
                        <div
                            className="progress-bar"
                            style={{ width: `${progressPrecent}%` }}
                        ></div>
                    </div>
                    <TypeTest
                        key={testKey}
                        type={types[currentTypeIndex]}
                        questions={questions}
                        setAnswers={setCurrentAnswers}
                        setTypeTestEnd={setTypeTestEnd}
                    />
                </div>
            </div>
        </div>
    );
}

export default TestPage;
