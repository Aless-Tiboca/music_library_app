const SearchService = require('../services/searchService');

const SearchController = {
    search: async (req, res) => {
        try {
            const results = await SearchService.searchAlbums(req.query.q);
            res.json(results);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};

module.exports = SearchController;
