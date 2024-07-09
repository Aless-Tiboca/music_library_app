const Album = require('../models/albumModel');
const Song = require('../models/songModel');

const AlbumService = {
    getAllAlbums: async (limit) => {
        return await Album.getAll(limit);
    },

    searchAlbumsByTitle: async (title) => {
        return await Album.searchByTitle(title);
    },

    getSongsByAlbumId: async (albumId) => {
        return await Song.getByAlbumId(albumId);
    }
};

module.exports = AlbumService;