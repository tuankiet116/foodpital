const User = require("../models/UserAccount.model");
exports.CreateAccount = (req, res)=>{
    if(Object.keys(req.body).length === 0){
        res.status(400).send({
            message: "Content cannot be empty!"
        });
    }
    const user_account = new User({
        User_Sign    : req.body.User_Sign,
        User_Password: req.body.User_Password,
        id_Permission: req.body.id_Permission
    });

    User.CreateAccount(user_account,(err,data)=>{
        if(err)
            res.status(500).send({
                message: 
                    err.message || "Something has been error while creating..."
            });
        else
            res.send(data);
    });
};

exports.SignIn = (req, res)=>{
    if(Object.keys(req.body).length === 0){
        res.status(400).send({
            message: "Content could not empty"
        });
    }

    User.GetInformationAccount(req ,req.body.UserAccount, req.body.UserPassword, (err, data)=>{
        if(err){
            if(err.kind === "NOT_FOUND"){
                res.status(404).send({
                    message: "This Account Doesn't exist"
                });
            }
            else{
                res.status(500).send({
                    message: err.message || "Something has been error"
                });
            }
        }else {
            res.send(data);
        }
    });
};

exports.UpdateMyPassword = (req, res)=>{
    if(Object.keys(req.body).length === 0){
        res.status(400).send({
            message: "Content could not be empty"
        });
    }

    User.EditMyPassword(req.body.id_User, req.body.User_Password, (err, data)=>{
        if(err){
            res.status(500).send({
                message: err.message || "Something has been error..."
            });
        }
        else res.send(data);
    });
};

exports.DeleteAccount = (req, res)=>{
    if(Object.keys(req.body).length === 0){
        res.status(400).send({
            message: "Content could not be empty"
        });
    }

    User.DelMyAccount(req.body.id_User, req.body.User_Password, (err, data)=>{
        if(err){
            res.status(500).send({
                message: err.message || "Something has been error..."
            });
        }else res.send(data);
    });
};

exports.GetAllAccount = (req, res)=>{
    User.GetAllAccount((err, data)=>{
        if(err){
            res.status(500).send({
                message: err.message || "Something has been error..."
            });
        }else res.send(data);
    });
};

exports.CountAccount = (req, res)=>{
    User.CountAccount((err, data)=>{
        if(err){
            res.status(500).send({
                message: err.message || "Something has been error..."
            });
        }else res.send(data);
    });
};

exports.getPermission = (req, res)=>{
    if(Object.keys(req.body).length === 0){
        res.status(400).send({
            message: "Content could not be empty"
        });
    }
    User.GetPermission(req.body.id_User, (err, data)=>{
        if(err){
            res.status(500).send({
                message: err.message || "Something has been error..."
            });
        }else res.send(data);
    });
};