import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Dashboard = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [albums, setAlbums] = useState([]);

    useEffect(() => {
        // Fetch the first 3 albums from the database
        axios.get('http://localhost:3001/albums?limit=3')
            .then(response => {
                setAlbums(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the albums!', error);
            });
    }, []);

    const handleSearchChange = (event) => {
        const query = event.target.value;
        setSearchQuery(query);

        if (query.length > 1) {
            axios.get(`http://localhost:3001/search?type=albums&q=${query}`)
                .then(response => {
                    setSearchResults(response.data);
                })
                .catch(error => {
                    console.error('There was an error fetching the search results!', error);
                });
        } else {
            setSearchResults([]);
        }
    };

    return (
        <div>
            <h1>Dashboard</h1>
            <div>
                <input
                    type="text"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    placeholder="Search for albums..."
                />
                {searchResults.length > 0 && (
                    <ul>
                        {searchResults.map(result => (
                            <li key={result.id}>{result.title}</li>
                        ))}
                    </ul>
                )}
            </div>
            <h2>Top 3 Albums</h2>
            <ul>
                {albums.map(album => (
                    <li key={album.id}>
                        <h3>{album.title}</h3>
                        <p>{album.description}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Dashboard;
