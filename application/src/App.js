import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage'
import ChatPage from './pages/ChatPage'
import ApiTest from './ApiTest';



function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/chat" element={<ChatPage />} />
          <Route path='/test' element={<ApiTest/>}/>
        </Routes>
      </Router> 
    </div>
  );
}

export default App;
