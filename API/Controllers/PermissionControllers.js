const Permission = require("../models/Permission.model");
exports.CreatePermission = (req,res) => {
    if(Object.keys(req.body).length === 0){
        res.status(400).send({
            message: "Content cannot empty"
        });
    }

    const permission = new Permission({
        Name_Permission: req.body.Name_Permission
    });

    Permission.CreatePermission(permission, (err,data) => {
        if(err){
            res.status(500).send({
                message: err.message || "Something has been error"
            });
        }
        else res.send(data);
    });
};

exports.AllPermission = (req, res)=>{
    Permission.ShowPermission((err, data)=>{
        if(err){
            res.status(500).send({
                message: err.message || "Something has been error"
            });
        }
        else res.send(data);
    });
};

exports.GetByID = (req, res)=>{
    if(Object.keys(req.body).length === 0){
        res.status(400).send({
            message: "Content cannot empty"
        });
    }
    
    Permission.FindPerByID(req.body.id_Permission, (err, data)=>{
        if(err){
           if(err.kind === "NOT_FOUND"){
                res.status(404).send({
                    message: "This Permission Doesn't exist"
                });
            }
            else{
                res.status(500).send({
                    message: err.message || "Something has been error"
                });
            } 
        }
        else res.send(data);
    });
};

exports.EditNamePer = (req, res)=>{
    if(Object.keys(req.body).length === 0){
        res.status(400).send({
            message: "Content could not be empty"
        });
    }
    Permission.UpdateName(req.body.Name_Permission, req.params.idPer, (err, data)=>{
        if(err){
            res.status(500).send({
                message: err.message || "Something has been error"
            });
        }
        else res.send(data);
    });
};

exports.DelPer = (req, res)=>{
    Permission.DelPermission(req.params.idPer, (err, data)=>{
        if(err){
            res.status(500).send({
                message: err.message || "Something has been error"
            });
        }
        else res.send(data);
    });
};