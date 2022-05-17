const Comment = require("../models/Comment.model");

exports.CreateComment = (req, res)=>{
    if(Object.keys(req.body).length === 0){
        res.status(400).send({
            message: "Content could not be empty"
        });
    }    

    const newComment = new Comment({
        id_Post: req.body.id_Post,
        Content_Comment: req.body.Content_Comment,
        ParentCode: req.body.ParentCode,
        id_User: req.body.id_User
    });

    Comment.Create(newComment, (err, data)=>{
        console.log(newComment);
        if(err){
            res.status(500).send({
                message: err.message || "Something has been error ..."
            });
        }
        else res.send(data);
    });
};

exports.GetParent = (req, res)=>{
    if(Object.keys(req.body).length === 0){
        res.status(400).send({
            message: "Content could not be empty"
        });
    }    

    Comment.GetParentComment(req.body.id_Post, (err, data)=>{
        if(err){
            res.status(500).send({
                message: err.message || "Something has been error"
            });
        }
        else res.send(data);
    });
};

exports.GetChild = (req, res)=>{
    if(Object.keys(req.body).length === 0){
        res.status(400).send({
            message: "Content could not be empty"
        });
    }    

    Comment.GetChildComment(req.body.id_Post, req.body.id_Comment, (err, data)=>{
        if(err){
            res.status(500).send({
                message: err.message || "Something has been error"
            });
        }
        else res.send(data);
    });
};

exports.EditComment = (req, res)=>{
    if(Object.keys(req.body).length === 0){
        res.status(400).send({
            message: "Content could not be empty"
        });
    }    

    Comment.EditComment(req.body.id_User, req.body.id_Comment, req.body.Content_Comment, (err, data)=>{
        if(err){
            res.status(500).send({
                message: err.message || "Something has been error"
            });
        }
        else res.send(data);
    });
};

exports.DeleteComment = (req, res)=>{
    if(Object.keys(req.body).length === 0){
        res.status(400).send({
            message: "Content could not be empty"
        });
    }    

    Comment.DelMyComment(req.body.id_Comment, req.body.id_User, (err, data)=>{
        if(err){
            res.status(500).send({
                message: err.message || "Something has been error"
            });
        }
        else res.send(data);
    });
};

exports.CountComment = (req, res)=>{
    if(Object.keys(req.body).length === 0){
        res.status(400).send({
            message: "Content could not be empty"
        });
    }    

    Comment.CountCommentByIdPost(req.body.id_Post, (err, data)=>{
        if(err){
            res.status(500).send({
                message: err.message || "Something has been error"
            });
        }
        else res.send(data);
    });
};