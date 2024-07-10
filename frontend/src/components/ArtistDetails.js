import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import './ArtistDetails.css';
import waveformImage from '../images/waveform.png'; // Update this path as necessary

const ArtistDetails = () => {
    const { id } = useParams();
    const [artist, setArtist] = useState(null);
    const [albums, setAlbums] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:3001/api/artists/${id}`)
            .then(response => {
                setArtist(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the artist details!', error);
            });

        axios.get(`http://localhost:3001/api/artists/${id}/albums`)
            .then(response => {
                setAlbums(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the artist albums!', error);
            });
    }, [id]);

    if (!artist) {
        return <div>Loading...</div>;
    }

    return (
        <div className="artist-detail">
            <h1>{artist.name}</h1>
            <h2>Albums</h2>
            <div className="albums-list">
                {albums.map(album => {
                    const color = getRandomColor();
                    const lighterColor = lightenColor(color, 40);
                    return (
                    
                    <Link key={album.id} to={`/album/${album.id}`} className="album-item" style={{ backgroundColor: lighterColor }}>
                        <div className="album-item">
                            <div className="album-cover" style={{ backgroundColor: color }}></div>
                            <div className="album-info">
                                <div className="album-title">{album.title}</div>
                                <div className="album-artist">{artist.name}</div>
                            </div>
                        </div>
                    </Link>
                )})}
            </div>
        </div>
    );
};

const getRandomColor = () => {
    const colors = ['#FF6347', '#6A5ACD', '#20B2AA', '#FFB6C1', '#4682B4', '#9ACD32', '#FF4500', '#2E8B57'];
    return colors[Math.floor(Math.random() * colors.length)];
};

const lightenColor = (color, percent) => {
    const num = parseInt(color.slice(1), 16);
    const amt = Math.round(2.55 * percent);
    const R = ((num >> 16) + amt);
    const G = ((num >> 8 & 0x00FF) + amt);
    const B = ((num & 0x0000FF) + amt);
    return `rgb(${R < 255 ? R : 255}, ${G < 255 ? G : 255}, ${B < 255 ? B : 255}, 0.3)`;
};

export default ArtistDetails;