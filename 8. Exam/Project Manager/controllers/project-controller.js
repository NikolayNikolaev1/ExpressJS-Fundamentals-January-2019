const Project = require('../models/Project');
const Team = require('../models/Team');

module.exports = {
    createGet: async (req, res) => {
        res.render('project/create')
    },
    createPost: async (req, res) => {
        let name = req.body.name;
        let description = req.body.description;
        
        try {
            let project = await Project.create({ name, description });

            res.redirect('/admin/projects');
        } catch (e) {
            console.log(e);
        }
    },
    manageGet: async (req, res) => {
        try {
            let teams = await Team.find();
            let projects = await Project.find();
            
            res.render('project/projects-admin', { projects, teams });
        } catch (e) {
            console.log(e);
        }
    },
    managePost: async (req, res) => {
        let projectId = req.body.projects;
        let teamId = req.body.teams;
        
        try {
            let project = await Project.findById(projectId);
            let team = await Team.findById(teamId);

            project.team = teamId;
            project.save();

            await team.projects.push(projectId);
            team.save();

            res.redirect('/admin/projects');
        } catch (e) {
            console.log(e);
        }
    },
    allProjects: async (req, res) => {
        try {
            let projects = await Project.find().populate('team');
    
            res.render('project/projects', { projects })
        } catch (e) {
            console.log(e);
        }
    }
}