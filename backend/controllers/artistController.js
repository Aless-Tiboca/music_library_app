const ArtistService = require('../services/artistService');

const ArtistController = {
    getAllArtists: async (req, res) => {
        try {
            const artists = await ArtistService.getAllArtists();
            res.json(artists);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    getArtistById: async (req, res) => {
        try {
            const artist = await ArtistService.getArtistById(req.params.id);
            res.json(artist);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    createArtist: async (req, res) => {
        try {
            await ArtistService.createArtist(req.body.name);
            res.status(201).json({ message: 'Artist created' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    getAlbumsByArtist: async (req, res) => {
        try {
            const { id } = req.params;
            const albums = await ArtistService.getAlbumsByArtist(id);
            res.json(albums);
        } catch (error) {
            console.error('Error fetching albums by artist:', error);
            res.status(500).send('Server error');
        }
    },
};

module.exports = ArtistController;