import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";
import ChatConversation from '../components/chat/ChatConversation';
import ChatInput from '../components/chat/ChatInput';
import NavBar from '../components/utilities/NavBar';
import { GEMINI_API_KEY } from '../ConstantStrings';
import './css/page-chat.css';

function ChatPage() {
    const [messages, setMessages] = useState([]);
    const chatRef = useRef(null);

    // Create a Gemini chat session on component mount
    useEffect(() => {
        const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

        chatRef.current = ai.chats.create({
            model: "gemini-2.0-flash",
            config: {
                systemInstruction: "this is an English practice application. you should respone in context" + 
                "for one to two lines and then space row and after that give a feedback on what the user send if there is needing, if it is fine don't feedback " +
                "your level of English supposed to be B1",
            },
            history: [
                {
                    role: "user",
                    parts: [{ text: "Hello" }],
                },
                {
                    role: "model",
                    parts: [{ text: "Hi! How can I help you today?" }],
                },
            ],
        });

        // Add initial messages to UI
        setMessages([
            { text: "Hi! How can I help you today?", sender: 'bot' }
        ]);
    }, []);

    const handleSend = async (msg) => {
        if (!msg.trim()) return;

        // Show user message
        setMessages(prev => [...prev, { text: msg, sender: 'user' }]);

        try {
            const response = await chatRef.current.sendMessage({
                message: msg
            });

            setMessages(prev => [...prev, { text: response.text, sender: 'bot' }]);
        } catch (err) {
            setMessages(prev => [...prev, {
                text: err.message || 'Something went wrong',
                sender: 'bot'
            }]);
        }
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
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ChatPage;
