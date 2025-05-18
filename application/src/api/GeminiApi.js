export async function sendChatMessage(message, sessionId, englishLevel) {
    const res = await fetch('/api/gemini/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message, sessionId, englishLevel })
    });
    return res.json();
}

export async function fetchTestQuestion(typeOfTest, EnglishLevel) {
    const res = await fetch('/api/gemini/generate-question', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ typeOfTest, EnglishLevel })
    });
    return res.json();
}

export async function checkUserAnswer(question, answer) {
    const res = await fetch('/api/gemini/check-answer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question, answer })
    });
    return res.json();
}
