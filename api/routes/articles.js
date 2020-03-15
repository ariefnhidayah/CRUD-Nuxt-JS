const config = require('../config')
const {Router} = require('express');

const router = Router();

// Init Controller
const ArticleController = require('../controllers/ArticlesController');

// Get All
router.get('/articles', ArticleController.list);

// Get One
router.get('/articles/:id', ArticleController.show);

// Create
router.post('/articles', config.isAuthenticated, ArticleController.create);

// Update
router.put('/articles/:id', config.isAuthenticated, ArticleController.update);

// Delete
router.delete('/articles/:id', config.isAuthenticated, ArticleController.delete);

module.exports = router;