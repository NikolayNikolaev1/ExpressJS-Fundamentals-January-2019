const Cube = require('../models/Cube');

module.exports = {
    homeGet: (req, res) => {
        res.render('index');
    },
    about: (req, res) => {
        res.render('about');
    },
    search: (req, res) => {
        
    }
}