const Artist = require('../models/artistModel');

const ArtistService = {
    getAllArtists: async () => {
        return await Artist.getAll();
    },

    getArtistById: async (id) => {
        return await Artist.getById(id);
    },

    createArtist: async (name) => {
        await Artist.create(name);
    },

    getAlbumsByArtist: async (id) => {
        return await Artist.getAlbumsByArtist(id);
    },

};

module.exports = ArtistService;