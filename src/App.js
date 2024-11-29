import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from './components/Homepage/Homepage';
import Login from './pages/Login/Login';

function App() {
    return (
        <Router>
            <Routes>
                {/* Default route: Homepage */}
                <Route path="/" element={<Homepage />} />
                {/* Other route: Login */}
                <Route path="/login" element={<Login />} />
            </Routes>
        </Router>
    );
}

export default App;
