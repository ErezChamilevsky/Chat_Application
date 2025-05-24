import { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMicrophone, faTimes } from '@fortawesome/free-solid-svg-icons';
import Microphone from '../utilities/Microphone';
import * as sdk from 'microsoft-cognitiveservices-speech-sdk';
import SpeechToElement from 'speech-to-element';
import { ToggleWebSpeech } from '../utilities/ToggleSpeech';

function ReadingTest({ type, questions, setAnswers, setTypeTestEnd }) {
    // Track current question index and local answers
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [localAnswers, setLocalAnswers] = useState(Array(questions.length).fill(""));

    // Speech recording states
    const [isRecording, setIsRecording] = useState(false);
    const [isPreparing, setIsPreparing] = useState(false);
    const [isError, setIsError] = useState(false);
    const [activeService, setActiveService] = useState('webspeech');
    const textElement = useRef(null);

    useEffect(() => {
        if (questions.length > 0) {
            setLocalAnswers(Array(questions.length).fill(""));
        }
    }, [questions]);

    useEffect(() => {
        if (!window.SpeechSDK) window.SpeechSDK = sdk;

        const availableServicesArr = [];
        if (SpeechToElement.isWebSpeechSupported()) {
            availableServicesArr.push({ value: 'webspeech', text: 'Web Speech' });
        }

        if (availableServicesArr.length > 0) {
            setActiveService(availableServicesArr[0].value);
        }
    }, []);

    // Handle microphone click for speech recording
    const handleMicClick = () => {
        if (!isRecording) setIsPreparing(true);

        if (activeService === 'webspeech') {
            ToggleWebSpeech({
                targetElement: textElement,
                setIsRecording,
                setIsPreparing,
                setIsError,
                onResult: (finalText) => {
                    handleInputChange(finalText);
                }
            });
        }
    };

    // Handle clear button click
    const handleClearClick = () => {
        handleInputChange("");
    };

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

    // Determine which button to show (microphone or clear)
    const showMicrophoneButton = localAnswers[currentQuestionIndex] === "" && !isRecording;
    const showClearButton = localAnswers[currentQuestionIndex] !== "";
    console.log('local' + localAnswers[currentQuestionIndex]);
    console.log('currentindex ' + currentQuestionIndex);

    return (
        <div className="card-body">
            <h3 className="card-title">{type} Test</h3>

            {/* Display current question */}
            <div className="mb-3 text-start">
                <h5>
                    {currentQuestionIndex + 1}. {questions[currentQuestionIndex]}
                </h5>

                {/* Input field based on test type */}
                    <div className="d-flex gap-2 align-items-center">
                        {/* Hidden element for speech recognition */}
                        <div
                            ref={textElement}
                            contentEditable={false}
                            style={{ display: 'none' }}
                        ></div>

                        {/* Read-only input box that shows recorded text */}
                        <input
                            type="text"
                            className="form-control border rounded"
                            placeholder="Recorded speech will appear here..."
                            value={localAnswers[currentQuestionIndex]}
                            readOnly
                            disabled={isRecording}
                        />

                        {/* Microphone or Clear button */}
                        {isPreparing ? (
                            <button className="btn btn-secondary" type="button" disabled>
                                Connecting...
                            </button>
                        ) : showMicrophoneButton ? (
                            <button
                                className="btn btn-light"
                                type="button"
                                onClick={handleMicClick}
                                title="Start Recording"
                            >
                                <Microphone isRecording={false} />
                            </button>
                        ) : isRecording ? (
                            <button
                                className="btn btn-danger"
                                type="button"
                                onClick={handleMicClick}
                                title="Stop Recording"
                            >
                                <Microphone isRecording={true} />
                            </button>
                        )
                         : showClearButton ? (
                            <button
                                className="btn btn-outline-secondary"
                                type="button"
                                onClick={handleClearClick}
                                title="Clear Text"
                            >
                                <FontAwesomeIcon icon={faTimes} />
                            </button>
                        ) : null}
                    </div>
                
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
                    Submit {type}
                </button>
            )}
        </div>
    );
}

export default ReadingTest;