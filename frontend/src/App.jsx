import './App.css'
import Home from './components/Home'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {

  return (
    <Router>
    <div className="bg-[#061429] h-screen">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Home />} />
      </Routes>
      
    </div>
    </Router>
  )
}

export default App
