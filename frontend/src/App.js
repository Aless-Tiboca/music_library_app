import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import AlbumDetail from './components/AlbumDetail';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/album/:id" element={<AlbumDetail />} />
            </Routes>
        </Router>
    );
}

export default App;