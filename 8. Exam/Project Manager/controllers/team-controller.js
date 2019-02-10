const Team = require('../models/Team');
const User = require('../models/User');

module.exports = {
    createGet: async (req, res) => {
        res.render('team/create')
    },
    createPost: async (req, res) => {
        let name = req.body.name;
        try {
            let team = await Team.create({ name });

            res.redirect('/admin/teams');
        } catch (e) {
            console.log(e);
        }
    },
    manageGet: async (req, res) => {
        try {
            let users = await User.find();
            let teams = await Team.find();
            
            res.render('team/teams-admin', { users, teams });
        } catch (e) {
            console.log(e);
        }
    },
    managePost: async (req, res) => {
        let teamId = req.body.teams;
        let userId = req.body.users;
        
        try {
            let team = await Team.findById(teamId);
            let user = await User.findById(userId);

            await team.members.push(userId);
            team.save();

            await user.teams.push(teamId);
            user.save();

            res.redirect('/admin/teams');
        } catch (e) {
            console.log(e);
        }
    },
    allTeams: async (req, res) => {
        try {
            let teams = await Team.find().populate('members').populate('projects');
    
            res.render('team/teams', { teams })
        } catch (e) {
            console.log(e);
        }
    }
}