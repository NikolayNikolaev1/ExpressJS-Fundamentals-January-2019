const homeController = require('../controllers/home');
const userController = require('../controllers/user');
const articleController = require('../controllers/article');

module.exports = {
    home: homeController,
    user: userController,
    article: articleController
}