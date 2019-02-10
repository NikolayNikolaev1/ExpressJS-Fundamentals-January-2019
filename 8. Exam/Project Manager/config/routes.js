const controllers = require('../controllers');
const auth = require('./auth');

module.exports = app => {
    app.get('/', controllers.home.index);

    // User
    app.get('/register', auth.isAnonymous, controllers.user.registerGet);
    app.post('/register', auth.isAnonymous, controllers.user.registerPost);
    app.post('/logout', auth.isAuthed, controllers.user.logout);
    app.get('/login', auth.isAnonymous, controllers.user.loginGet);
    app.post('/login', auth.isAnonymous, controllers.user.loginPost);
    app.get('/profile', auth.isAuthed, controllers.user.profile);
    app.post('/leave/:teamId', auth.isAuthed, controllers.user.leaveTeam);

    // Team
    app.get('/team/create', auth.hasRole('Admin'), controllers.team.createGet);
    app.post('/team/create', auth.hasRole('Admin'), controllers.team.createPost);
    app.get('/admin/teams', auth.hasRole('Admin'), controllers.team.manageGet);
    app.post('/admin/teams', auth.hasRole('Admin'), controllers.team.managePost);
    app.get('/teams', auth.isAuthed, controllers.team.allTeams);

    // Project
    app.get('/project/create', auth.hasRole('Admin'), controllers.project.createGet);
    app.post('/project/create', auth.hasRole('Admin'), controllers.project.createPost);
    app.get('/admin/projects', auth.hasRole('Admin'), controllers.project.manageGet);
    app.post('/admin/projects', auth.hasRole('Admin'), controllers.project.managePost);
    app.get('/projects', auth.isAuthed, controllers.project.allProjects);


    app.all('*', (req, res) => {
        res.status(404);
        res.send('404 Not Found');
        res.end();
    });
};