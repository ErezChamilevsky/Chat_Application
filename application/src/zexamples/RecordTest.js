
import * as sdk from 'microsoft-cognitiveservices-speech-sdk';
import Microphone from '../components/utilities/Microphone';
import SpeechToElement from 'speech-to-element';
import { useEffect, useRef, useState } from 'react';
import './test-record.css';
import { ToggleWebSpeech } from '../components/utilities/ToggleSpeech';


function RecordTest() {
    const [availableServices, setAvailableServices] = useState([]);
    const [activeService, setActiveService] = useState('webspeech');
    const [isRecording, setIsRecording] = useState(false);
    const [isPreparing, setIsPreparing] = useState(false);
    const [isError, setIsError] = useState(false);
    const textElement = useRef(null);

    useEffect(() => {
        if (!window.SpeechSDK) window.SpeechSDK = sdk;
        const availableServicesArr = [{value:'', text: '' }];
        if (SpeechToElement.isWebSpeechSupported()) {
            availableServicesArr.unshift({ value: 'webspeech', text: 'Web Speech' });
        }
        setAvailableServices(availableServicesArr);
        if (availableServicesArr.length === 1) {
            setActiveService(availableServicesArr[0].value);
        }
    }, []);

    return (
        <>
            <main id="main">
                <div id="text" ref={textElement} contentEditable={true}></div>
                <div
                    id="button"
                    onClick={() => {
                        if (!isRecording) setIsPreparing(true);
                        if (activeService === 'webspeech') {
                            ToggleWebSpeech(textElement, setIsRecording, setIsPreparing, setIsError);
                        }
                    }}
                >
                    <Microphone isRecording={isRecording} />
                </div>
                <div>
                    {isPreparing ? (
                        <div>Connecting...</div>
                    ) : isError ? (
                        <div id="message-error">Error, please check the console for more info</div>
                    ) : (
                        <div id="message-empty">Placeholder text</div>
                    )}
                </div>
            </main>
        </>
    );
}

export default RecordTest;
