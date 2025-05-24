const dotenv = require('dotenv');
dotenv.config();

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const PROMPT_INSTRUCTION_FOR_CHAT = "You are a helpful English tutor. Use B1-level vocabulary to assist the learner. ";
const LANGUAGE_LEVELS = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
const PROMPT_INSTRUCTION_FOR_GENERATE_TEST = 'Generate 6 questions, one in each level' + LANGUAGE_LEVELS + '.' +
'Every question should start in a new line. proceed to the the questions right away without any intro and do not write what is the level of each question.';
const PROMPT_CHECK_INSTRUCTION_FOR_USER_ANSWER = 'In relative to the question, does the answer fit? give 1 point for each right answer' +
'and return the number it sums up to. Consider the type of the question on order to determine if the answer fits.' +
'if the type is reading you supposed to give a sentence to read it out loud. The type of those qeustions is ';

module.exports = {
    GEMINI_API_KEY,
    PROMPT_INSTRUCTION_FOR_CHAT,
    LANGUAGE_LEVELS,
    PROMPT_INSTRUCTION_FOR_GENERATE_TEST,
    PROMPT_CHECK_INSTRUCTION_FOR_USER_ANSWER
};
