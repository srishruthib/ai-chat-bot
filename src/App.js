// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ChatPage from './views/ChatPage';
import HistoryPage from './views/HistoryPage';
import './App.css';

function App() {
    return (
        <Router>
            <div className="app-container">
                {/* THIS IS THE CORRECTED HEADER TAG */}
                <header className="navbar">
                    <div className="nav-links">
                        <h1 className="app-title">Bot AI</h1>
                        <Link to="/" className="nav-link">New Chat</Link>
                        <Link to="/history" className="nav-link">Past Conversations</Link>
                    </div>
                </header> {/* THIS IS THE CORRECTED CLOSING HEADER TAG */}

                <Routes>
                    <Route path="/" element={<ChatPage />} />
                    <Route path="/history" element={<HistoryPage />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;