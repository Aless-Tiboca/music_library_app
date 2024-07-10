const SearchService = require('../services/searchService');
const ArtistService = require('../services/artistService');
const AlbumService = require('../services/albumService');

const SearchController = {
    search: async (req, res) => {
        try {
            const albums = await AlbumService.getAllAlbums();
            const artists = await ArtistService.getAllArtists();
    
            const results = [
                ...albums.map(album => ({ id: album.id, name: album.title, type: 'album' })),
                ...artists.map(artist => ({ id: artist.id, name: artist.name, type: 'artist' })),
            ];
    
            res.json(results);
        } catch (error) {
            console.error('Error searching:', error);
            res.status(500).send('Server error');
        }
    }
};

module.exports = SearchController;
