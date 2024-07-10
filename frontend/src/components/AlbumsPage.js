import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './AlbumsPage.css';

const AlbumsPage = () => {
    const [albums, setAlbums] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3001/api/albums')
            .then(response => {
                setAlbums(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the albums!', error);
            });
    }, []);

    return (
        <div className="albums-page">
            <h1>All Albums</h1>
            <div className="albums-list">
                {albums.map(album => (
                    <div key={album.id} className="album">
                        <h2>{album.title}</h2>
                        <p>By {album.artistName}</p>
                        <Link to={`/album/${album.id}`}>View Details</Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AlbumsPage;