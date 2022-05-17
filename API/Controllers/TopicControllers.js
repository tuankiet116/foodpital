const Topic = require("../models/Topic.model");

exports.CreateTopic = (req,res)=>{
    if(Object.keys(req.body).length === 0){
        res.status(400).send({
            message: "Content could not be empty"
        });
    }

    const newTopic = new Topic({
        Name_Topic: req.body.Name_Topic
    });

    Topic.CreateTopic(newTopic, (err, data)=>{
        if(err){
            res.status(500).send({
                message: err.message || "Something has been error..."
            });
        }else res.send(data);
    });
};

exports.ShowAllTopic = (req, res)=>{
    Topic.GetAllName((err, data)=>{
        if(err){
            res.status(500).send({
                message: err.message || "Something has been error..."
            });
        }
        else res.send(data);
    });
};

exports.UpdateTopic = (req, res)=>{
    if(Object.keys(req.body).length === 0){
        res.status(400).send({
            message: "Content could not be empty"
        });
    }

    Topic.UpdateMyTopic(req.params.idTopic, req.body.newName, (err, data)=>{
        if(err){
            res.status(500).send({
                message: err.message || "Something has been error..."
            });
        }
        else res.send(data);
    });
};

exports.DelTopic = (req, res)=>{
    if(Object.keys(req.body).length === 0){
        res.status(400).send({
            message: "Content could not be empty"
        });
    }
    
    Topic.DelMyTopic(req.body.id_Topic, (err, data)=>{
        if(err){
            res.status(500).send({
                message: "Something has been error"
            });
        }
        else res.send(data);
    });
};

exports.GetNameByID = (req, res)=>{
    if(Object.keys(req.body).length === 0){
        res.status(400).send({
            message: "Content could not be empty"
        });
    }

    Topic.getNameByID(req.body.id_Topic, (err, data)=>{
        if(err){
            res.status(500).send({
                message: "Something has been error"
            });
        }
        else res.send(data);
    });
};