import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './AlbumDetail.css';

const AlbumDetail = () => {
    const { id } = useParams();
    const [album, setAlbum] = useState(null);

    useEffect(() => {
        // Fetch album details by ID
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

    return (
        <div className="album-detail">
            <h1>{album.title}</h1>
            <h2>by {album.artistName}</h2>
            <p>{album.description}</p>
            <ul>
                {album.songs.map(song => (
                    <li key={song.id}>
                        {song.title} - {song.length}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AlbumDetail;