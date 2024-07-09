const AlbumService = require('../services/albumService');

const AlbumController = {
    getAllAlbums: async (req, res) => {
        try {
            const limit = parseInt(req.query.limit, 10) || 3;
            const albums = await AlbumService.getAllAlbums(limit);
            res.json(albums);
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
