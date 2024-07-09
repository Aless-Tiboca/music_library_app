const express = require('express');
const router = express.Router();
const artistController = require('../controllers/artistController');
const albumController = require('../controllers/albumController');
const searchController = require('../controllers/searchController');

router.get('/artists', artistController.getAllArtists);
router.get('/artists/:id', artistController.getArtistById);
router.post('/artists', artistController.createArtist);

router.get('/albums', albumController.getAllAlbums);
router.get('/albums/:id', albumController.getAlbumById);
router.get('/search', searchController.search);

module.exports = router;