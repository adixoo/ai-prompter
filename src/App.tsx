import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './components/Home';
import AddPrompt from './components/AddPrompt';
import './App.css';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <nav className="bg-white shadow-sm">
          <div className="container mx-auto px-4">
            <div className="flex h-16 items-center justify-between">
              <Link to="/" className="text-xl font-bold text-gray-800">
                AI Prompter
              </Link>
              <div className="space-x-4">
                <Link to="/" className="rounded-md px-3 py-2 text-gray-600 hover:text-gray-900">
                  Home
                </Link>
                <Link to="/add" className="rounded-md px-3 py-2 text-gray-600 hover:text-gray-900">
                  Add Prompt
                </Link>
              </div>
            </div>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add" element={<AddPrompt />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
