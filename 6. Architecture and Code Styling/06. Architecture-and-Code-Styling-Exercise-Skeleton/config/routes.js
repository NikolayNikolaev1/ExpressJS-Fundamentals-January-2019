const homeController = require('../controllers/home');
const userController = require('../controllers/user');

module.exports = (app) => {
    app.get('/', homeController.index);
    app.get('/user/register', userController.registerGet);
    app.post('/user/register', userController.registerPost);

    app.get('/user/login', userController.loginGet);
    app.post('/user/login', userController.loginPost);

    app.get('/user/logout', userController.logout);
    //TODO Add other app routes and restrict certain pages using auth.js
};

