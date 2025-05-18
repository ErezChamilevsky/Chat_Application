import { useState } from 'react';
import NavBar from '../components/utilities/NavBar';
import './css/page-test.css';

function TestPage() {
    const [currentTest, setCurrentTest] = useState(null);
    
    const [readingScore, setReadingScore] = useState(0);
    const [writingScore, setWritingScore] = useState(0);
    const [speakingScore, setSpeakingScore] = useState(0);

    const [progressPrecent, setProgressPrecent] = useState(0);



    const handleNext = () => {
        setProgressPrecent(prev => Math.min(prev + 25, 100));
    };


    return (
        <div className='container'>
            <NavBar />
            <div className='test-wraper'>
                <div class="card text-center">
                    <div class="progress" role="progressbar" aria-label="Basic example" aria-valuenow={progressPrecent} aria-valuemin="0" aria-valuemax="100">
                        <div
                            class="progress-bar"
                            style={{ width: `${progressPrecent}%` }}
                        ></div>
                    </div>
                    <div class="card-body">
                        <h5 class="card-title">Special title treatment</h5>
                        <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
                        <a href="#" class="btn btn-primary" onClick={handleNext}>next</a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TestPage;