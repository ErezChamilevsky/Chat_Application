import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage'
import ChatPage from './pages/ChatPage'
import ApiTest from './zexamples/ApiTest';
import SpeechSynthesizer from './zexamples/SpeechSynthesizer';
import ChooseVoice from './components/utilities/ChooseVoice';
import BotSpeaker from './components/chat/BotSpeaker';
import TestPage from './pages/TestPage';
import WritingQuestion from './components/test/WritingQuestion';



function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/chat" element={<ChatPage />} />
          {/* <Route path='/test' element={<ApiTest/>}/> */}
          <Route path='/test' element={<TestPage/>} />
          <Route path='/synthesizer' element={<SpeechSynthesizer />} />
          <Route path='/chooseVoice' element={<ChooseVoice/>} />
          <Route path='/bot' element={<BotSpeaker text = {"this is text to test"}/>} />
          <Route path='/writing' element={<WritingQuestion setWritingScore = {null} EnglishLevel={"A1"} />} />


          
        </Routes>
      </Router> 
    </div>
  );
}

export default App;
