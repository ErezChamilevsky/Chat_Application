import React from 'react';

function TextMessage({ text, sender, time }) {
    const isUser = sender === 'user';
    return (
        <div className={`d-flex ${isUser ? 'justify-content-end' : 'justify-content-start'}`}>
            <div
                className="px-3 py-2 rounded"
                style={{
                    backgroundColor: '#f0f0f0',
                    color: '#000',
                    maxWidth: '80%',
                    borderRadius: '12px',
                    whiteSpace: 'pre-wrap'
                }}
            >
                {text}
            </div>
        </div>
    );
};

export default TextMessage;
