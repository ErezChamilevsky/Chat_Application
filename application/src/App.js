import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage'
import ChatPage from './pages/ChatPage'
import ApiTest from './ApiTest';
import RecordTest from './RecordTest';
import SpeechSynthesizer from './SpeechSynthesizer';



function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/chat" element={<ChatPage />} />
          <Route path='/test' element={<ApiTest/>}/>
          <Route path='/record' element={<RecordTest />} />
          <Route path='/synthesizer' element={<SpeechSynthesizer />} />
          
        </Routes>
      </Router> 
    </div>
  );
}

export default App;
