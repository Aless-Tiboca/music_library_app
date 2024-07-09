const AlbumService = require('../services/albumService');

const AlbumController = {
    getAllAlbums: async (req, res) => {
        try {
            const limit = req.query.limit ? parseInt(req.query.limit, 10) : null;
            const albums = await AlbumService.getAllAlbums(limit);
            res.json(albums);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    getAlbumById: async (req, res) => {
        try {
            const album = await AlbumService.getAlbumById(req.params.id);
            res.json(album);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    searchAlbums: async (req, res) => {
        try {
            const albums = await AlbumService.searchAlbumsByTitle(req.query.q);
            res.json(albums);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};

module.exports = AlbumController;