import React, { useState } from 'react';
import './css/page-chat.css'
import ChatConversation from '../components/chat/ChatConversation';
import ChatInput from '../components/chat/ChatInput'
import NavBar from '../components/utilities/NavBar';

function ChatPage() {
    const [messages, setMessages] = useState([]);

    const handleSend = (msg) => {
        if (msg.trim()) {
            setMessages(prev => [...prev, { text: msg, sender: 'user' }]);

            // Simulate bot reply
            setTimeout(() => {
                setMessages(prev => [...prev, { text: `Echo: ${msg}`, sender: 'bot' }]);
            }, 500);
        }
    };

    return (
        <div className='container'>
            <NavBar></NavBar>
                   <div className="container py-4">
            <div className="mx-auto" style={{ maxWidth: '720px' }}>
                <div className="bg-white shadow-sm rounded p-3 d-flex flex-column" style={{ height: '80vh' }}>
                        <div className="chat-scroll flex-grow-1 overflow-auto mb-3">
                        <ChatConversation messages={messages} />
                    </div>
                    <ChatInput onSend={handleSend} />
                </div>
            </div>
        </div>
        </div>

    );
};

export default ChatPage;
