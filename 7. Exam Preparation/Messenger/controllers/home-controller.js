const Thread = require('../models/Thread');

module.exports = {
    index: async (req, res) => {
        try {
            if (req.user) {
                if (req.user.roles.indexOf('Admin') !== -1) {
                    let threads = await Thread.find().populate('users');
                    threads.forea
                    res.render('home/index', {
                        threads
                    });
                } else {
                    res.render('home/index');
                }
            } else {
                res.render('home/index');
            }
        } catch (e) {
            console.log(e);
        }
    }
};