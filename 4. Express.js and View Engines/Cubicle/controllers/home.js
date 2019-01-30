const Cube = require('../models/Cube');

module.exports = {
    homeGet: (req, res) => {
        Cube
            .find()
            .select('_id name imageUrl difficulty')
            .sort('-difficulty')
            .then((cubes) => {

                res.render('index', { cubes });
            })
            .catch((e) => console.log(e));
    },
    about: (req, res) => {
        res.render('about');
    },
    search: (req, res) => {
        let name = req.query.name;
        let from = Number(req.query.form);
        let to = Number(req.query.to);

        if (name && from && to) {
            Cube.find({})
                .where('difficulty')
                .gte(from)
                .lte(to)
                .then((cubes) => {
                    let filtered = cubes
                        .filter(c => c.name.toLowerCase().includes(name.toLowerCase()));

                    res.render('index', { cubes: filtered });
                });
        }
    }
}