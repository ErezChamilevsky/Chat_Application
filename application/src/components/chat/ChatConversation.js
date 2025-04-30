import React from 'react';
import TextMessage from './TextMessage';
import { useRef, useEffect } from 'react';

function ChatConversation({messages}){
    const bottomRef = useRef(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    return (
        <div className="d-flex flex-column gap-3">
            {messages.map((msg, index) => (
                <TextMessage key={index} text={msg.text} sender={msg.sender} />
            ))}
            {/* 👇 This element is always at the bottom */}
            <div ref={bottomRef} />
        </div>
    );
};

export default ChatConversation;
