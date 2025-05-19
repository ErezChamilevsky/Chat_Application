import React, { useState, useRef, useEffect } from 'react';
import ChatConversation from '../components/chat/ChatConversation';
import ChatInput from '../components/chat/ChatInput';
import NavBar from '../components/utilities/NavBar';
import './css/page-chat.css';

function ChatPage() {
    const [messages, setMessages] = useState([]);
    const [sessionId, setSessionId] = useState(null);

    useEffect(() => {
        const initializeChat = async () => {
            const res = await fetch('/api/gemini/session');
            const data = await res.json();
            setSessionId(data.msg);
            setMessages([{ text: "Hi! How can I help you today?", sender: 'bot' }]);
        };
        initializeChat();
    }, []);

    const handleSend = async (msg) => {
        if (!msg.trim()) return;
        setMessages(prev => [...prev, { text: msg, sender: 'user' }]);

        const res = await fetch('/api/gemini/send', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                message: msg,
                sessionId,
                englishLevel: 'B1'
            }),
        });

        const data = await res.json();
        setMessages(prev => [...prev, { text: data.text, sender: 'bot' }]);
    };

    const handleSave = async () => {
        await fetch('/api/gemini/save', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ sessionId })
        });
        alert('Chat saved!');
    };

    return (
        <div className='container'>
            <NavBar />
            <div className="container py-4">
                <div className="mx-auto" style={{ maxWidth: '720px' }}>
                    <div className="bg-white shadow-sm rounded p-3 d-flex flex-column" style={{ height: '92vh' }}>
                        <div className="chat-scroll flex-grow-1 overflow-auto mb-3">
                            <ChatConversation messages={messages} />
                        </div>
                        <ChatInput onSend={handleSend} />
                        <button className="btn btn-primary mt-2" onClick={handleSave}>
                            Save Chat
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ChatPage;
