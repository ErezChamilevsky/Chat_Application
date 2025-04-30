import React, { useState } from 'react';

function ChatInput({ onSend }){
    const [input, setInput] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSend(input);
        setInput('');
    };

    return (
        <form onSubmit={handleSubmit} className="d-flex gap-2">
            <input
                type="text"
                className="form-control border rounded"
                placeholder="Send a message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
            />
            <button className="btn btn-dark" type="submit">Send</button>
        </form>
    );
};

export default ChatInput;
