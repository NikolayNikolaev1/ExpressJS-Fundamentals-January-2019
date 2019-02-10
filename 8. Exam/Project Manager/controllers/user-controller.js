const encryption = require('../util/encryption');
const User = require('mongoose').model('User');
const Team = require('../models/Team');
const Project = require('../models/Project');

module.exports = {
    registerGet: (req, res) => {
        res.render('user/register');
    },
    registerPost: async (req, res) => {
        const reqUser = req.body;
        let profilePicture = reqUser.profilePicture;
        if (!profilePicture) {
            profilePicture = 'https://themes.gohugo.io//theme/hugo-geo//img/profile.png';
        }
        const salt = encryption.generateSalt();
        const hashedPass =
            encryption.generateHashedPassword(salt, reqUser.password);
        try {
            if (!profilePicture.startsWith('http') 
            && (!profilePicture.endsWith('png') || !profilePicture.endsWith('jpg'))) {
                errorHandler('Invalid picture URL.');
                return;
            }

            const user = await User.create({
                username: reqUser.username,
                hashedPass,
                salt,
                firstName: reqUser.firstName,
                lastName: reqUser.lastName,
                profilePicture,
                roles: []
            });
            req.logIn(user, (err, user) => {
                if (err) {
                    res.locals.globalError = err;
                    res.render('users/register', user);
                } else {
                    res.redirect('/');
                }
            });
        } catch (e) {
            console.log(e);
            res.locals.globalError = e;
            res.render('user/register');
        }
    },
    logout: (req, res) => {
        req.logout();
        res.redirect('/');
    },
    loginGet: (req, res) => {
        res.render('user/login');
    },
    loginPost: async (req, res) => {
        const reqUser = req.body;
        try {
            const user = await User.findOne({ username: reqUser.username });
            
            if (!user) {
                errorHandler('Invalid user data');
                return;
            }
            if (!user.authenticate(reqUser.password)) {
                errorHandler('Invalid user data');
                return;
            }
            req.logIn(user, (err, user) => {
                if (err) {
                    errorHandler(err);
                } else {
                    res.redirect('/');
                }
            });
        } catch (e) {
            errorHandler(e);
        }

        function errorHandler(e) {
            console.log(e);
            res.locals.globalError = e;
            res.render('user/login');
        }
    },
    profile: async (req, res) => {
        let teamIds = req.user.teams;
        let teams = [];
        let projects = [];

        try {
            for ( let id of teamIds) {
                let team = await Team.findById(id);
                teams.push(team);
    
                if (team.projects) {
                    for (let projectId of team.projects) {
                        let project = await Project.findById(projectId);
                        projects.push(project);
                    }
                }
            }
            
            res.render('user/profile', { teams, projects });
        } catch (e) {
            console.log(e);
        }       
    },
    leaveTeam: async (req ,res) => {
        let teamId = req.params.teamId;
        let teams = req.user.teams;

        try {
            let user = await User.findById(req.user._id);
            let team = await Team.findById(teamId);
            
            user.teams.remove(teamId);
            user.save();
            
            team.members.remove(req.user._id);
            team.save();

            res.redirect('/profile');
        } catch (e) {
            console.log(e);
        }
    }
};