const Vote = require("../models/Vote.model");

exports.CreateVote = (req, res)=>{
    if(Object.keys(req.body).length === 0){
        res.status(400).send({
            message: "Content could not be empty"
        });
    }

    const newVote = new Vote({
        id_User: req.body.id_User,
        id_Post: req.body.id_Post,
        voteValue: req.body.voteValue,
    });

    Vote.CreateVote(newVote, (err, data)=>{
        if(err){
            res.status(500).send({
                message: err.message || "Something has been error "
            });
        }
        else{
            res.send(data);
        }
    });
};

exports.GetUserVoted = (req, res)=>{
    if(Object.keys(req.body).length === 0){
        res.status(400).send({
            message: "Content could not be empty"
        });
    }

    Vote.FindVoteByPost(req.body.id_Post, (err, data)=>{
        if(err){
            res.status(500).send({
                message: err.message || "Something has been error "
            });
        }
        else{
            res.send(data);
        }
    });
};

exports.EditValue = (req, res)=>{
    if(Object.keys(req.body).length === 0){
        res.status(400).send({
            message: "Content could not be empty"
        });
    }

    const newVote = new Vote({
        id_User: req.body.id_User,
        id_Post: req.body.id_Post,
        voteValue: req.body.voteValue,
    });

    Vote.EditVote(newVote, (err, data)=>{
        if(err){
            res.status(500).send({
                message: err.message || "Something has been error "
            });
        }
        else{
            res.send(data);
        }
    });
};

exports.DelVote = (req, res)=>{
    if(Object.keys(req.body).length === 0){
        res.status(400).send({
            message: "Content could not be empty"
        });
    }

    Vote.DelVote(req.body.id_Post, req.body.id_User, (err, data)=>{
        if(err){
            res.status(500).send({
                message: err.message || "Something has been error "
            });
        }
        else{
            res.send(data);
        }
    });
};

exports.AVG = (req, res)=>{
    if(Object.keys(req.body).length === 0){
        res.status(400).send({
            message: "Content could not be empty"
        });
    }
    Vote.VOP(req.body.id_Post, (err, data)=>{
        if(err){
            res.status(500).send({
                message: err.message || "Something has been error "
            });
        }
        else{
            res.send(data);
        }
    });
};

exports.VoteOfUserOfPost = (req, res)=>{
    if(Object.keys(req.body).length === 0){
        res.status(400).send({
            message: "Content could not be empty"
        });
    }

    Vote.FindVoteOfUserOfPost(req.body.id_User, req.body.id_Post, (err, data)=>{
        if(err){
            res.status(400).send({
                message: "Content could not be empty"
            });
        }
        else{
            res.send(data);
        }
    });
};