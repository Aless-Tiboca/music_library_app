import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './AlbumDetail.css';
import waveformImage from '../images/waveform.png';

const AlbumDetail = () => {
    const { id } = useParams();
    const [album, setAlbum] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost:3001/api/albums/${id}`)
            .then(response => {
                setAlbum(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the album details!', error);
            });
    }, [id]);

    if (!album) {
        return <div>Loading...</div>;
    }

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

    return (
        <div className="album-detail">
            <h1>{album.title}</h1>
            <h2>by {album.artistName}</h2>
            <p>{album.description}</p>
            <div className="song-list">
                {album.songs.map(song => {
                    const color = getRandomColor();
                    const lighterColor = lightenColor(color, 40);
                    return (
                        <div key={song.id} className="song-item" style={{ backgroundColor: lighterColor }}>
                            <div className="song-cover" style={{ backgroundColor: color }}></div>
                            <div className="song-info">
                                <div className="song-title">{song.title}</div>
                                <div className="song-artist">{album.artistName}</div>
                            </div>
                            <div className="song-waveform">
                                <img src={waveformImage} alt="waveform" className="waveform-image"/>
                            </div>
                            <div className="song-duration">{song.length}</div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default AlbumDetail;