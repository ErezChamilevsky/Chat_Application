import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationArrow } from '@fortawesome/free-solid-svg-icons';
import Microphone from '../utilities/Microphone';
import * as sdk from 'microsoft-cognitiveservices-speech-sdk';
import SpeechToElement from 'speech-to-element';
import { ToggleWebSpeech } from '../utilities/ToggleSpeech';
import './css/input-chat.css';

function ChatInput({ onSend }) {
    const [input, setInput] = useState('');
    const [isRecording, setIsRecording] = useState(false);
    const [isPreparing, setIsPreparing] = useState(false);
    const [isError, setIsError] = useState(false);
    const [activeService, setActiveService] = useState('webspeech');
    const textElement = useRef(null);

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

    const handleMicClick = () => {
        if (!isRecording) setIsPreparing(true);

        if (activeService === 'webspeech') {
            ToggleWebSpeech({
                targetElement: textElement,
                setIsRecording,
                setIsPreparing,
                setIsError,
                onResult: (finalText) => {
                    setInput(finalText);
                }
            });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!input.trim()) return;
        onSend(input.trim());
        setInput('');
    };

    return (
        <form onSubmit={handleSubmit} className="d-flex gap-2 align-items-center">
            <div
                ref={textElement}
                contentEditable={false}
                style={{ display: 'none' }}
            ></div>

            <input
                type="text"
                className="form-control border rounded"
                placeholder="Send a message or record..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={isRecording}
            />

            {isPreparing ? (
                <button className="chat-button btn btn-secondary" type="button" disabled>
                    Connecting...
                </button>
            ) : input === '' && !isRecording ? (
                <button
                    className="chat-button btn btn-light"
                    type="button"
                    onClick={handleMicClick}
                >
                    <Microphone isRecording={false} />
                </button>
            ) : isRecording ? (
                <button
                    className="chat-button btn btn-danger"
                    type="button"
                    onClick={handleMicClick}
                >
                    <Microphone isRecording={true} />
                </button>
            ) : (
                <button className="chat-button btn btn-light" type="submit">
                    <FontAwesomeIcon icon={faLocationArrow} style={{ color: 'black' }} />
                </button>
            )}
        </form>
    );
}

export default ChatInput;
