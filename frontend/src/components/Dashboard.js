import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ReactSearchAutocomplete } from 'react-search-autocomplete';
import './Dashboard.css';

const Dashboard = () => {
    const [albums, setAlbums] = useState([]);
    const [searchItems, setSearchItems] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch the first 3 albums from the database
        axios.get('http://localhost:3001/api/albums?limit=3')
            .then(response => {
                setAlbums(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the albums!', error);
            });

        // Fetch all albums for search autocomplete
        axios.get('http://localhost:3001/api/albums')
            .then(response => {
                const searchData = response.data.map(album => ({
                    id: album.id,
                    name: album.title
                }));
                setSearchItems(searchData);
            })
            .catch(error => {
                console.error('There was an error fetching the albums for search!', error);
            });
    }, []);

    const handleOnSelect = item => {
        // Navigate to the AlbumDetail page
        navigate(`/album/${item.id}`);
    };

    return (
        <div className="dashboard">
            <header className="dashboard-header">
                <h1>Music Library Dashboard</h1>
                <h2>Explore and Discover Albums</h2>
            </header>
            <div className="search-bar">
                <ReactSearchAutocomplete
                    items={searchItems}
                    onSelect={handleOnSelect}
                    autoFocus
                    placeholder="Search for albums..."
                />
            </div>
            <h2>Top 3 Albums</h2>
            <ul className="album-list">
                {albums.map(album => (
                    <li key={album.id} className="album-item" onClick={() => navigate(`/album/${album.id}`)}>
                        <h3>{album.title}</h3>
                        <p>{album.description}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Dashboard;