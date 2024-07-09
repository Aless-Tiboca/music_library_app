const AlbumService = require('./albumService');

const SearchService = {
    searchAlbums: async (query) => {
        return await AlbumService.searchAlbumsByTitle(query);
    }
};

module.exports = SearchService;
