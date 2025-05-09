import React, { useEffect, useState } from 'react';
import { SELECTED_VOICE } from '../../ConstantStrings';

const BotSpeaker = ({ text }) => {
    const [voice, setVoice] = useState(null);
    const synth = window.speechSynthesis;

    useEffect(() => {
        const loadVoices = () => {
            const availableVoices = synth.getVoices();
            const matchedVoice = availableVoices.find(v => v.name.includes(SELECTED_VOICE));
            setVoice(matchedVoice || null);
        };

        // Voices might not be immediately available
        if (synth.onvoiceschanged !== undefined) {
            synth.onvoiceschanged = loadVoices;
        }
        loadVoices();
    }, [synth]);

    const speak = () => {
        if (!text || synth.speaking) return;

        const utterance = new SpeechSynthesisUtterance(text);
        if (voice) utterance.voice = voice;
        synth.speak(utterance);
    };

    return (<div>
        <i class="bi bi-file-play"></i>

        <button className="btn btn-white" onClick={speak}>🔊</button>
    </div>
    );
};

export default BotSpeaker;
