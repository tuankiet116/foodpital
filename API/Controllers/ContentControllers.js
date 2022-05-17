const Content = require("../models/Content.model");

exports.CreateContent = (req, res)=>{
    if(Object.keys(req.body).length === 0){
        res.status(400).send({
            message: "Content could not be empty"
        });
    }

    const newContent = new Content({
        id_Post: req.body.id_Post,
        Title_Content: req.body.Title_Content,
        Text_Content: req.body.Text_Content
    });

    Content.CreateContent(newContent, (err, data)=>{
        if(err){
            res.status(500).send({
                message: err.message||"Something has been error"
            });
        }
        else res.send(data);
    });
};

exports.GetOne = (req, res)=>{
    if(Object.keys(req.body).length === 0){
        res.status(400).send({
            message: "Content could not be empty"
        });
    }
    Content.GetOneByIdPost(req.body.id_Post, (err, data)=>{
        if(err){
            res.status(500).send({
                message: err.message || "Something has been error"
            });
        }
        else res.send(data);
    });
};

exports.GetAllByPost = (req, res)=>{
    if(Object.keys(req.body).length === 0){
        res.status(400).send({
            message: "Content could not be empty"
        });
    }
    Content.GetAllByID_Post(req.body.id_Post, (err, data)=>{
        if(err){
            res.status(500).send({
                message: err.message || "Something has been error"
            });
        }
        else res.send(data);
    });
}

exports.DelContent = (req, res)=>{
    if(Object.keys(req.body).length === 0){
        res.status(400).send({
            message: "Content could not be empty"
        });
    }
    Content.DeleteByID(req.body.id_Content, (err, data)=>{
        if(err){
            res.status(500).send({
                message: err.message || "Something has been error"
            });
        }
        else res.send(data);
    });
};