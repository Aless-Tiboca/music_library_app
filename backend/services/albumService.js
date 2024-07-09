const Album = require('../models/albumModel');
const Song = require('../models/songModel');

const AlbumService = {
    getAllAlbums: async (limit) => {
        if (limit) {
            return await Album.getAll(limit);
        } else {
            return await Album.getAll();
        }
    },

    getAlbumById: async (id) => {
        const album = await Album.getById(id);
        const songs = await Song.getByAlbumId(id);
        return {
            ...album,
            songs
        };
    },

    searchAlbumsByTitle: async (title) => {
        return await Album.searchByTitle(title);
    }
};

module.exports = AlbumService;