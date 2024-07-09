import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ReactSearchAutocomplete } from 'react-search-autocomplete';
import './Dashboard.css';

const Dashboard = () => {
    const [albums, setAlbums] = useState([]);
    const [searchItems, setSearchItems] = useState([]);

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

    const handleOnSearch = (string, results) => {
        // onSearch handler can be used to show suggestions
        console.log(string, results);
    };

    const handleOnSelect = item => {
        // onSelect handler can be used to redirect or show item details
        console.log(item);
    };

    return (
        <div className="dashboard">
            <h1>Music Library Dashboard</h1>
            <div className="search-bar">
                <ReactSearchAutocomplete
                    items={searchItems}
                    onSearch={handleOnSearch}
                    onSelect={handleOnSelect}
                    autoFocus
                    placeholder="Search for albums..."
                />
            </div>
            <h2>Top 3 Albums</h2>
            <ul className="album-list">
                {albums.map(album => (
                    <li key={album.id} className="album-item">
                        <h3>{album.title}</h3>
                        <p>{album.description}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Dashboard;