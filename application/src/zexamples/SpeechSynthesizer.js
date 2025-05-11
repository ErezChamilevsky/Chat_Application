import React, { useState, useEffect, useRef } from 'react';
import './synthez-test.css';

// more details here https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesis/getVoices

function SpeechSynthesizer(){
    const synth = window.speechSynthesis;
    const [voices, setVoices] = useState([]);
    const [selectedVoice, setSelectedVoice] = useState('');
    const [text, setText] = useState('');
    const [rate, setRate] = useState(1);
    const [pitch, setPitch] = useState(1);

    const inputRef = useRef();

    //sleceting specific voices and populate them
    useEffect(() => {
        const populateVoiceList = () => {
            const voicesList = synth.getVoices().filter((voice) => voice.name.includes("Microsoft Zira") ||
                voice.name.includes("Google US English") ||
                voice.name.includes("Microsoft David") );
            setVoices(voicesList);
            if (voicesList.length > 0) {
                setSelectedVoice((prev) => prev || voicesList[0].name);
            }
        };

        populateVoiceList();
        if (typeof synth.onvoiceschanged !== 'undefined') {
            synth.onvoiceschanged = populateVoiceList;
        }
    }, [synth]);

    const speak = () => {
        if (synth.speaking) {
            console.error('speechSynthesis.speaking');
            return;
        }

        if (text !== '') {
            const utterThis = new SpeechSynthesisUtterance(text);

            utterThis.onend = () => {
                console.log('SpeechSynthesisUtterance.onend');
            };

            utterThis.onerror = (event) => {
                console.error('SpeechSynthesisUtterance.onerror', event);
            };

            const voice = voices.find((v) => v.name === selectedVoice);
            if (voice) {
                utterThis.voice = voice;
            }

            utterThis.pitch = pitch;
            utterThis.rate = rate;
            synth.speak(utterThis);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        speak();
        inputRef.current.blur();
    };

    return (
        <div>
            <h1>Speech Synthesizer</h1>

            <form onSubmit={handleSubmit}>
                <label htmlFor="txt">Enter text</label>
                <input
                    id="txt"
                    type="text"
                    className="txt"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    ref={inputRef}
                />
                <div>
                    <label htmlFor="rate">Rate</label>
                    <input
                        type="range"
                        min="0.5"
                        max="2"
                        value={rate}
                        step="0.1"
                        id="rate"
                        onChange={(e) => setRate(e.target.value)}
                    />
                    <div className="rate-value">{rate}</div>
                </div>
                <div>
                    <label htmlFor="pitch">Pitch</label>
                    <input
                        type="range"
                        min="0"
                        max="2"
                        value={pitch}
                        step="0.1"
                        id="pitch"
                        onChange={(e) => setPitch(e.target.value)}
                    />
                    <div className="pitch-value">{pitch}</div>
                </div>
                <select
                    value={selectedVoice}
                    onChange={(e) => setSelectedVoice(e.target.value)}
                >
                    {voices.map((voice, index) => (
                        <option key={index} value={voice.name}>
                            {voice.name} ({voice.lang}){voice.default ? ' -- DEFAULT' : ''}
                        </option>
                    ))}
                </select>
                <div className="controls">
                    <button id="play" type="submit">
                        Play
                    </button>
                </div>
            </form>
        </div>
    );
};

export default SpeechSynthesizer;
