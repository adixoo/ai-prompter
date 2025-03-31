import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import AddPrompt from './components/AddPrompt';
import Context from './components/Context';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add" element={<AddPrompt />} />
        <Route path="/context" element={<Context />} />
      </Routes>
    </Router>
  );
}

export default App;
