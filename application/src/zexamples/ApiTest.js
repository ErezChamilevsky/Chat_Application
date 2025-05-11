import { useState } from 'react';
import { GoogleGenAI } from "@google/genai";

async function askGemini(prompt) {

    const ai = new GoogleGenAI({ apiKey: "AIzaSyC4XnfzYq3WCDTBIK0BX_3XiXQg-ZfTn0I" });

        const response = await ai.models.generateContent({
            model: "gemini-2.0-flash",
            contents: prompt,
        });
        return response.text;
}

function ApiTest() {
    const [input, setInput] = useState('');
    const [reply, setReply] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async () => {
        setLoading(true);
        setError('');
        try {
            const answer = await askGemini(input);
            setReply(answer);
        } catch (err) {
            setError(err.message || 'Something went wrong');
            setReply('');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ maxWidth: 600, margin: '50px auto', padding: 20, fontFamily: 'Arial' }}>
            <h2>Ask Gemini</h2>
            <textarea
                value={input}
                onChange={e => setInput(e.target.value)}
                rows={6}
                placeholder="Type your prompt here..."
                style={{ width: '100%', padding: 10, fontSize: 16 }}
            />
            <button
                onClick={handleSubmit}
                disabled={loading || !input.trim()}
                style={{
                    marginTop: 10,
                    padding: '10px 20px',
                    fontSize: 16,
                    cursor: loading ? 'not-allowed' : 'pointer'
                }}
            >
                {loading ? 'Loading...' : 'Ask Gemini'}
            </button>
            {error && <p style={{ color: 'red', marginTop: 10 }}>Error: {error}</p>}
            {reply && <p style={{ marginTop: 20 }}><strong>Reply:</strong> {reply}</p>}
        </div>
    );
}

export default ApiTest;
