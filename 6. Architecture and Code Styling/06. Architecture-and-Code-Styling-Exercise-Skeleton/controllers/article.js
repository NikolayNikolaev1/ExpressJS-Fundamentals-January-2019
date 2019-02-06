const Article = require('../models/Article');

module.exports = {
    createGet: (req, res) => {
        res.render('article/create');
    },
    createPost: (req, res) => {
        let { title, content } = req.body;
        let author = req.user._id;
        let user = req.user;

        let article = new Article({
            title,
            content,
            author
        });
        
        article
            .save()
            .then((result) => {
                user.articles.push(result._id);
                return user.save();
            })
            .then(() => {
                res.redirect('/');
            })
            .catch(console.error);
    },
    details: (req, res) => {
        let articleId = req.params.id;

        Article
            .findById(articleId)
            .populate('author')
            .then((article) => {
                let isAuthor = false;
                if (req.user) {
                    isAuthor = req.user.isAuthor(article);
                }
                

                res.render('article/details', { article, isAuthor });
            })
            .catch(console.error);
    },
    editGet: (req, res) => {

    },
    editPost: (req, res) => {

    },
    deleteGet: (req, res) => {

    },
    deletePost: (req, res) => {
        
    }
}