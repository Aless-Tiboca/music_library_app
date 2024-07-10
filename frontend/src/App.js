import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import AlbumDetail from './components/AlbumDetail';
import Header from './components/Header';
import AlbumsPage from './components/AlbumsPage';
import ArtistsPage from './components/ArtistsPage';

function App() {
    return (
        <Router>
            <Header/>
            <div className='content'>
                <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/albums" element={<AlbumsPage />} />
                    <Route path="/artists" element={<ArtistsPage />} />
                    <Route path="/album/:id" element={<AlbumDetail />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;