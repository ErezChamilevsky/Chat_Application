import React, { useEffect, useState } from 'react';
import { SELECTED_VOICE } from '../../ConstantStrings';

const BotSpeaker = ({ text }) => {
    const [voice, setVoice] = useState(null);
    const [isSpeaking, setIsSpeaking] = useState(false);
    const synth = window.speechSynthesis;

    useEffect(() => {
        const loadVoices = () => {
            const availableVoices = synth.getVoices();
            const matchedVoice = availableVoices.find(v => v.name.includes(SELECTED_VOICE));
            setVoice(matchedVoice || null);
        };

        if (synth.onvoiceschanged !== undefined) {
            synth.onvoiceschanged = loadVoices;
        }
        loadVoices();
    }, [synth]);

    const toggleSpeech = () => {
        if (synth.speaking) {
            synth.cancel();  // Stops the speech
            setIsSpeaking(false);
        } else if (text) {
            const utterance = new SpeechSynthesisUtterance(text);
            if (voice) utterance.voice = voice;
            utterance.onend = () => setIsSpeaking(false);
            synth.speak(utterance);
            setIsSpeaking(true);
        }
    };

    return (
        <div>
            {/* Use Bootstrap Icons or your preferred icon library */}
            <button className="btn btn-light" onClick={toggleSpeech}>
                <i className={`bi ${isSpeaking ? 'bi-stop-circle' : 'bi-play-circle'}`} style={{ fontSize: '1.5rem' }}></i>
            </button>
        </div>
    );
};

export default BotSpeaker;
