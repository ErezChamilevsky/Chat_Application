import React, { useState } from 'react';
import { GoogleGenAI } from "@google/genai";
import ChatConversation from '../components/chat/ChatConversation';
import ChatInput from '../components/chat/ChatInput'
import NavBar from '../components/utilities/NavBar';
import { GEMINI_API_KEY } from '../ConstantStrings'; 
import './css/page-chat.css'


async function askGemini(prompt) {

    const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

        const response = await ai.models.generateContent({
            model: "gemini-2.0-flash",
            contents: prompt,
        });
        return response.text;
}


function ChatPage() {
    const [messages, setMessages] = useState([]);

    const handleSend = async (msg) => {
        if (msg.trim()) {
            // Display the user's message
            setMessages(prev => [...prev, { text: msg, sender: 'user' }]);

            try {
                const aiAnswer = await askGemini(msg);

                // Add the bot's response
                setMessages(prev => [...prev, { text: aiAnswer, sender: 'bot' }]);
            } catch (err) {
                setMessages(prev => [...prev, { text: err.message || 'Something went wrong', sender: 'bot' }]);
            }
        }
    };

    return (
        <div className='container'>
            <NavBar></NavBar>
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
};

export default ChatPage;
