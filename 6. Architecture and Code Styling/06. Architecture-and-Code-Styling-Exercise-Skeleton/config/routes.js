const auth = require('../config/auth');
const controller = require('../controllers/index');

module.exports = (app) => {
    app.get('/', controller.home.index);

    // User routes
    app.get('/user/register', auth.isAnonymous, controller.user.registerGet);
    app.post('/user/register', auth.isAnonymous, controller.user.registerPost);
    app.get('/user/login', auth.isAnonymous, controller.user.loginGet);
    app.post('/user/login', auth.isAnonymous, controller.user.loginPost);
    app.get('/user/logout', auth.isAuthed, controller.user.logout);
    
    // Article routes
    app.get('/article/create', auth.isAuthed, controller.article.createGet);
    app.post('/article/create', auth.isAuthed, controller.article.createPost);
    app.get('/article/details/:id', controller.article.details);
    app.get('/article/edit/:id', controller.article.editGet);
    app.post('/article/edit/:id', controller.article.editPost);
    app.get('/article/delete/:id', controller.article.deleteGet);
    app.get('/article/delete/:id', controller.article.deletePost);
};

