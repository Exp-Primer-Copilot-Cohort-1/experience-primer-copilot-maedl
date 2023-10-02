// create web server
// create router
// add router to web server
// listen for requests
// add comments to router
// get comments from router
// add comments to router
// delete comments from router
// update comments from router

// create web server
var express = require('express');
var app = express();
// create router
var router = express.Router();
// add router to web server
app.use(router);
// listen for requests
var port = 3000;
app.listen(port, function() {
    console.log('Server running on port %s', port);
});

// add comments to router
var comments = [];
router.route('/comments')
    // get comments from router
    .get(function(request, response) {
        response.json(comments);
    })
    // add comments to router
    .post(function(request, response) {
        var comment = request.body;
        comments.push(comment);
        response.json(comment);
    });

// delete comments from router
router.route('/comments/:id')
    .delete(function(request, response) {
        var id = request.params.id;
        comments = comments.filter(function(comment) {
            return comment.id !== id;
        });
        response.json(comments);
    });

// update comments from router
router.route('/comments/:id')
    .put(function(request, response) {
        var id = request.params.id;
        var comment = request.body;
        comments = comments.map(function(c) {
            return c.id !== id ? c : comment;
        });
        response.json(comment);
    });