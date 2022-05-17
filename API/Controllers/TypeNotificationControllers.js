const TypeNotification = require("../models/TypeNotification.model");

exports.CreateTypeNotification = (req,res)=>{
    if(Object.keys(req.body).length === 0){
        res.status(400).send({
            message: "Content cannot empty"
        });
    }

    const newTypeNotification = new TypeNotification({
        TypeNotification: req.body.TypeNotification
    });

    TypeNotification.CreateTypeNotification(newTypeNotification, (err, data)=>{
        if(err){
            res.status(500).send({
                message: err.message || "Some thing has been error"
            });
        }
        else{
            res.send(data);
        }
    });
};

exports.ShowAll = (req, res)=>{
    TypeNotification.ShowALL((err, data)=>{
        if(err){
            res.status(500).send({
                message: err.message || "Some thing has been error"
            });
        }
        else{
            res.send(data);
        }
    });
};

exports.ShowByID = (req, res)=>{
    if(Object.keys(req.body).length === 0){
        res.status(400).send({
            message: "Content cannot empty"
        });
    }

    TypeNotification.ShowByID(req.body.id_TypeNotification, (err, data)=>{
        if(err){
            res.status(500).send({
                message: err.message || "Some thing has been error"
            });
        }
        else{
            res.send(data);
        }
    });
};

exports.EditType = (req, res)=>{
    if(Object.keys(req.body).length === 0){
        res.status(400).send({
            message: "Content cannot empty"
        });
    }

    TypeNotification.EditType( req.body.TypeNotification, req.body.id_TypeNotification, (err, data)=>{
        if(err){
            res.status(500).send({
                message: err.message || "Some thing has been error"
            });
        }
        else{
            res.send(data);
        }
    });
};

exports.DelType = (req, res)=>{
    if(Object.keys(req.body).length === 0){
        res.status(400).send({
            message: "Content cannot empty"
        });
    }
    TypeNotification.DeleteType(req.body.id_TypeNotification, (err, data)=>{
        if(err){
            res.status(500).send({
                message: err.message || "Some thing has been error"
            });
        }
        else{
            res.send(data);
        }
    });
};