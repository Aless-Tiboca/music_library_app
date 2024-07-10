import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import AlbumDetail from './components/AlbumDetail';
import Header from './components/Header';

function App() {
    return (
        <Router>
            <Header/>
            <div className='content'>
                <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/album/:id" element={<AlbumDetail />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;