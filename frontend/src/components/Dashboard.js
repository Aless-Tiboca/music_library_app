import React, { useEffect, useState} from 'react';
import axios from 'axios';
import { ReactSearchAutocomplete } from 'react-search-autocomplete';
import './Dashboard.css';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const [albums, setAlbums] = useState([]);
    const [searchItems, setSearchItems] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:3001/api/albums?limit=3')
            .then(response => {
                setAlbums(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the albums!', error);
            });

        // Fetch all albums for search suggestions
        axios.get('http://localhost:3001/api/search')
            .then(response => {
                setSearchItems(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the search data!', error);
            });
            
    }, []);

    const handleOnSelect = item => {
        if (item.type === 'album') {
            navigate(`/album/${item.id}`);
        } else if (item.type === 'artist') {
            navigate(`/artist/${item.id}`);
        }
    };

    return (
        <div className="dashboard">
            <img src={"https://svgsilh.com/svg/26432.svg"} alt="dots background" className="dots-background" />
            <header className="dashboard-header">
                <div className="header-text">The best place to know your music</div>
                <div className="search-bar">
                    <ReactSearchAutocomplete
                        items={searchItems}
                        onSelect={handleOnSelect}
                        autoFocus
                        styling={{ borderRadius: "25px", backgroundColor: "#1e1e1e", color: "#B0C4DE" }}
                    />
                </div>
            </header>
            <div className="albums">
                <h1>Top 3 Albums</h1>
                <div className='top-albums'>
                    {albums.map(album => (
                        <div key={album.id} className="album" onClick={() => navigate(`/album/${album.id}`)}>
                            <h2>{album.title}</h2>
                            <p>By {album.artistName}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;