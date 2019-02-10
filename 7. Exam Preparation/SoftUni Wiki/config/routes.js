const controllers = require('../controllers');
const auth = require('./auth');

module.exports = app => {
    app.get('/', controllers.home.index);
    app.get('/register', auth.isAnonymous, controllers.user.registerGet);
    app.post('/register', auth.isAnonymous, controllers.user.registerPost);
    app.post('/logout', auth.isAuthed, controllers.user.logout);
    app.get('/login', auth.isAnonymous, controllers.user.loginGet);
    app.post('/login', auth.isAnonymous, controllers.user.loginPost);

    app.get('/article/create', auth.isAuthed, controllers.article.createGet);
    app.post('/article/create', auth.isAuthed, controllers.article.createPost);
    app.get('/article/all', controllers.article.listAll);
    app.get('/article/details:id', controllers.article.details);
    app.get('/article/edit', auth.isAuthed, controllers.article.editGet);
    app.post('/article/edit', auth.isAuthed, controllers.article.editPost);
    app.get('/article/lock/:id', auth.hasRole('Admin'), controllers.article.lock);
    app.get('/article/unlock/:id', auth.hasRole('Admin'), controllers.article.unlock);


    app.all('*', (req, res) => {
        res.status(404);
        res.send('404 Not Found');
        res.end();
    });
};