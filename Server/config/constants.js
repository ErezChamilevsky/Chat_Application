const dotenv = require('dotenv');
dotenv.config();

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const PROMPT_INSTRUCTION_FOR_CHAT = "You are a helpful English tutor. Use B1-level vocabulary to assist the learner. ";
const LANGUAGE_LEVELS = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
const THE_QUESTION_LEVEL = '. The English level of the question supposed to be ';
const PROMPT_INSTRUCTION_FOR_GENERATE_TEST = 'Generate a question of ';
const PROMPT_CHECK_USER_ANSWER_INSTRUCTION = 'In relative to the question, does the answer fit? return 1 for yes 0 for no';

module.exports = {
    GEMINI_API_KEY,
    PROMPT_INSTRUCTION_FOR_CHAT,
    LANGUAGE_LEVELS,
    THE_QUESTION_LEVEL,
    PROMPT_INSTRUCTION_FOR_GENERATE_TEST,
    PROMPT_CHECK_USER_ANSWER_INSTRUCTION
};
