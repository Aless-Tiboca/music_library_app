import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './ArtistsPage.css';

const ArtistsPage = () => {
    const [artists, setArtists] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3001/api/artists')
            .then(response => {
                setArtists(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the artists!', error);
            });
    }, []);

    const getRandomColor = () => {
        const colors = ['#FF6347', '#6A5ACD', '#20B2AA', '#FFB6C1', '#4682B4', '#9ACD32', '#FF4500', '#2E8B57'];
        return colors[Math.floor(Math.random() * colors.length)];
    };

    return (
        <div className="artists-page">
            <h1>All Artists</h1>
            <div className="artists-list">
                {artists.map(artist => (
                    <Link key={artist.id} to={`/artist/${artist.id}`} className="artist-link">
                        <div className="artist" style={{ backgroundColor: getRandomColor() }}>
                            <h2>{artist.name}</h2>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default ArtistsPage;