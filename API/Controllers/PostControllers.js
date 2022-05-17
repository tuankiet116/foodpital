const Post = require("../models/Post.model");

exports.CreatePost = (req, res)=>{
    if(Object.keys(req.body).length === 0){
        res.status(400).send({
            message: "Content cannot empty"
        });
    }
    
    const newPost = new Post({
        id_User: req.body.id_User,
        id_Topic: req.body.id_Topic,
    });

    Post.CreatePost(newPost, (err, data)=>{
        if(err){
            res.status(500).send({
                message: err.message || "Some thing has been error"
            });
        }
        else res.send(data);
    });
};

exports.ShowNewFeed = (req, res)=>{
    Post.FindAll(req,(err, data)=>{
        if(err){
            res.status(500).send({
                message: err.message || "Something has been error"
            });
        }
        else res.send(data);
    });
};

exports.EditPost = (req, res)=>{
    if(Object.keys(req.body).length === 0){
        res.status(400).send({
            message: "Content could not be empty"
        });
    }

    Post.UpdatePost(req.body.id_Post, req.body.id_Topic, (err, data)=>{
        if(err){
            res.status(500).send({
                message: err.message || "Something has been error"
            });
        }
        else res.send(data);
    });
};

exports.DeletePost = (req, res)=>{
    if(Object.keys(req.body).length === 0){
        res.status(400).send({
            message: "Content could not be empty"
        });
    }

    Post.DeletePost(req.body.id_Post, req.body.id_User, (err, data)=>{
        if(err){
            res.status(500).send({
                message: err.message || "Something has been error"
            });
        }
        else res.send(data);
    });
};

exports.Count = (req, res)=>{
    Post.CountPost((err, data)=>{
        if(err){
            res.status(500).send({
                message: err.message || "Something has been error"
            });
        }
        else res.send(data);
    });
};

exports.PostUser = (req, res)=>{
    if(Object.keys(req.body).length === 0){
        res.status(400).send({
            message: "Content could not be empty"
        });
    }
    Post.FindPostUser(req.body.id_User, (err, data)=>{
        if(err){
            res.status(500).send({
                message: err.message || "Something has been error"
            });
        }
        else res.send(data);
    });
};

exports.GetAllPost = (req, res)=>{
    Post.GetAllPost((err, data)=>{
        if(err){
            res.status(500).send({
                message: err.message||"Something has been error"
            });
        }
        else res.send(data);
    });
}

exports.GetPostByUser = (req,res) => {
    if(Object.keys(req.body).length === 0){
        res.status(400).send({
            message: "Content could not be empty"
        });
    }
    Post.GetPostByUser(req,(err, data)=>{
        if(err){
            res.status(500).send({
                message: err.message || "Something has been error"
            });
        }
        else res.send(data);
    });
}
exports.GetPostByPost = (req,res) => {
    if(Object.keys(req.body).length === 0){
        res.status(400).send({
            message: "Content could not be empty"
        });
    }
    Post.GetPostByPost(req,(err, data)=>{
        if(err){
            res.status(500).send({
                message: err.message || "Something has been error"
            });
        }
        else res.send(data);
    });
};

exports.GetPostByID = (req, res)=>{
    if(Object.keys(req.body).length === 0){
        res.status(400).send({
            message: "Content could not be empty"
        });
    }

    Post.GetPostByIdPost(req.body.id_Post, req.body.id_User, (err, data)=>{
        if(err){
            res.status(500).send({
                message: err.message || "Something has been error"
            });
        }
        else res.send(data);
    });
};