const Cube = require('../models/Cube');

module.exports = {
    createGet: (req, res) => {
        res.render('cube/create');
    },
    createPost: (req, res) => {
        let cubeBody = req.body;
        cubeBody.difficulty = Number(cubeBody.difficulty);

        Cube.create(cubeBody)
            .then((c) => {

                res.redirect('/');
            });
    },
    details: (req, res) => {
        let cubeId = req.params.cubeId;

        Cube.findById(cubeId)
            .then((cube) => {
                res.render('cube/details', cube);
            })
            .catch((e) => console.log(e));
    }
}