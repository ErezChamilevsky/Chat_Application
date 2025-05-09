import React from 'react';
import BotSpeaker from './BotSpeaker';
import { RESPONSE_SEPARATOR } from '../../ConstantStrings';
import './css/message-text.css';



function TextMessage({ text, sender }) {
    const isUser = sender === 'user';
    const [response, feedback] = text.split(RESPONSE_SEPARATOR); // still may need to fix

    const formatText = (input) => {
        const parts = input.split(/(\*[^*\n]+\*)/g); // Split by *...*
        return parts.map((part, index) => {
            if (part.startsWith('*') && part.endsWith('*')) {
                return <strong key={index}>{part.slice(1, -1)}</strong>;
            }
            return <span key={index}>{part}</span>;
        });
    };

    return (
        <div className={`d-flex ${isUser ? 'justify-content-end' : 'justify-content-start'}`}>
            <div className="text-message-bubble">
                {isUser && (formatText(text))}
                {/*Here will be changed when the user could record himself */}
                {!isUser && (
                    <div className="bot-speaker-wrapper">
                        {text}
                        <BotSpeaker text={response} />
                    </div>
                )}
            </div>
        </div>
    );
}

export default TextMessage;
