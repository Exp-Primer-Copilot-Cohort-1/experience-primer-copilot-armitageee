// Create web server for comment

// Import modules

// Connect to database
mongoose.connect(config.database, {useNewUrlParser: true});

// On connection
mongoose.connection.on('connected', () => {
    console.log('Connected to database ' + config.database);
});

// On error
mongoose.connection.on('error', (err) => {
    console.log('Database error: ' + err);
});

// Create comment
router.post('/create', (req, res, next) => {
    let newComment = new Comment({
        user: req.body.user,
        post: req.body.post,
        content: req.body.content
    });

    Comment.addComment(newComment, (err, comment) => {
        if (err) {
            res.json({success: false, msg: 'Failed to create comment'});
        } else {
            res.json({success: true, msg: 'Comment created'});
        }
    });
});

// Get comment by post
router.get('/get-by-post/:postId', (req, res, next) => {
    const postId = req.params.postId;
    Comment.getCommentByPost(postId, (err, comment) => {
        if (err) {
            res.json({success: false, msg: 'Failed to get comment'});
        } else {
            res.json({success: true, comment: comment});
        }
    });
});

// Delete comment
router.delete('/delete/:commentId', (req, res, next) => {
    const commentId = req.params.commentId;
    Comment.deleteComment(commentId, (err, comment) => {
        if (err) {
            res.json({success: false, msg: 'Failed to delete comment'});
        } else {
            res.json({success: true, msg: 'Comment deleted'});
        }
    });
});

// Update comment
router.put('/update/:commentId', (req, res, next) => {
    const commentId = req.params.commentId;
    const content = req.body.content;
    Comment.updateComment(commentId, content, (err, comment) => {
        if (err) {
            res.json({success: false, msg: 'Failed to update comment'});
        } else {
            res.json({success: true, msg: 'Comment updated'});
        }
    });
});

module.exports = router;
