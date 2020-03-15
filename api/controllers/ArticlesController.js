const Article = require('../models/Article');
const validator = require('express-validator');

// Get all
module.exports.list = (request, response, next) => {
    Article.find({}, (error, articles) => {
        if(error) {
            return response.status(500).json({
                message: 'Error getting records'
            });
        } else {
            return response.json(articles);
        }
    })
}

// Get one
module.exports.show = (request, response) => {
    const id = request.params.id;
    Article.findOne({_id: id}, (error, article) => {
        if(error) {
            return response.status(500).json({
                message: 'Error getting record'
            });
        } else {
            return response.json(article);
        }
    })
}

// Create 
module.exports.create = [
    // validations rules
    validator.body('title', 'Please enter title').isLength({min: 1}),
    // validator.body('title').custom(value => {
    //     return Article.findOne({title: value}).then(article => {
    //         if(article !== null) {
    //             return Promise.reject('Title already in use');
    //         }
    //     })
    // }),
    validator.body('author', 'Please enter Author Name').isLength({min: 1}),
    validator.body('body', 'Please enter Article Content').isLength({min: 1}),

    (request, response) => {
        const errors = validator.validationResult(request);
        if(!errors.isEmpty()) {
            return response.status(422).json({errors: errors.mapped()});
        }

        // initialize record
        const article = new Article({
            title: request.body.title,
            author: request.body.author,
            body: request.body.body,
        })

        // save record
        article.save((error, article) => {
            if(error) {
                return response.status(500).json({
                    message: 'Error saving record',
                    error: error
                })
            } else {
                return response.json({
                    message: 'saved',
                    _id: article._id
                });
            }
        })
    }
];

// Update
module.exports.update = [
    // validation rules
    validator.body('title', 'Please enter title').isLength({min: 1}),
    // validator.body('title').custom((value, {request}) => {
    //     return Article.findOne({title: value, _id: {$ne: request.params.id}})
    //     .then(article => {
    //         if(article !== null) {
    //             return Promise.reject('Title already in use');
    //         }
    //     })
    // }),
    validator.body('author', 'Please enter Author Name').isLength({min: 1}),
    validator.body('body', 'Please enter article content').isLength({min: 1}),

    (request, response) => {
        // throw validation
        const errors = validator.validationResult(request);

        if(!errors.isEmpty()) {
            return response.status(422).json({errors: errors.mapped()});
        }

        const id = request.params.id;
        Article.findOne({_id: id}, (error, article) => {
            if(error) {
                return response.status(500).json({
                    message: 'Error saving',
                    error: error
                });
            }
            if(!article) {
                return response.status(404).json({
                    message: 'No such record'
                });
            }

            // Initialize record 
            article.title = request.body.title ? request.body.title : article.title;
            article.author = request.body.author ? request.body.author : article.author;
            article.body = request.body.body ? request.body.body : article.body;

            // Save record
            article.save((error, article) => {
                if(error) {
                    return response.status(500).json({
                        message: 'Error getting record'
                    });
                }
                if(!article) {
                    return response.status(404).json({
                        message: "No such record"
                    });
                }
                return response.json(article);
            })
        })
    }
];

// Delete
module.exports.delete = (request, response) => {
    const id = request.params.id;
    Article.findByIdAndRemove(id, (error, article) => {
        if(error) {
            return response.status(500).json({
                message: 'Error delete'
            });
        } else {
            return response.json(article);
        }
    });
}