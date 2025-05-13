import React, { useEffect, useState } from 'react';
import BotSpeaker from './BotSpeaker';
import { RESPONSE_SEPARATOR } from '../../ConstantStrings';
import './css/message-text.css';

const generateUniqueID = () => {
    return 'feedback-' + Date.now() + '-' + Math.floor(Math.random() * 10000);
};



function TextMessage({ text, sender }) {
    const isUser = sender === 'user';
    const [response, feedback] = text.split(RESPONSE_SEPARATOR); // still may need to fix

    // Initialize feedback ID if feedback exists
    const [feedbackID, setFeedbackID] = useState(null);

    useEffect(() => {
        if (feedback) {
            setFeedbackID(generateUniqueID());
        }
    }, [feedback]);

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
                        {formatText(response)}
                        <BotSpeaker text={response} />

                        {/* a collapse for the feedback */}
                        {feedback && feedbackID && (
                            <div className="feedback-wraper">
                                <p className="d-inline-flex gap-1">
                                    <a
                                        className="btn btn-light"
                                        data-bs-toggle="collapse"
                                        href={`#collapseExample-${feedbackID}`}
                                        role="button"
                                        aria-expanded="false"
                                        aria-controls={`collapseExample-${feedbackID}`}
                                    >
                                        Feedback
                                    </a>
                                </p>
                                <div className="collapse" id={`collapseExample-${feedbackID}`}>
                                    <div className="card card-body">
                                        {formatText(feedback)}
                                    </div>
                                </div>
                            </div>
                        )}

                    </div>
                )}
            </div>
        </div>
    );
}

export default TextMessage;
