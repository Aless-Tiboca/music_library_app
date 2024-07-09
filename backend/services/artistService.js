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
    }
};

module.exports = ArtistService;