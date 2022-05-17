const UserProfile = require("../models/UserProfile.model");

exports.CreateUserProfile = (req,res)=>{
    if(Object.keys(req.body).length === 0){
        res.status(400).send({
            message: "Content could not empty"
        });
    }
    const newUserProfile = new UserProfile({
        id_User       : req.body.id_User,
        Name_User     : req.body.Name_User,
        BOD_User      : req.body.BOD_User,
        Sex_User      : req.body.Sex_User,
        Email_User    : req.body.Email_User,
        Avatar_User   : req.body.Avatar_User
    });

    UserProfile.CreateUserProfile(newUserProfile,(err,data)=>{
        if(err)
            res.status(500).send({
                message: 
                    err.message || "Something has been error while creating..."
            });
        else
            res.send(data);
    });
};

exports.EditProfile = (req, res)=>{
    if(Object.keys(req.body).length === 0){
        res.status(400).send({
            message: "Content could not empty"
        });
    }
    const newUserProfile = new UserProfile({
        id_User       : req.body.id_User,
        Name_User     : req.body.Name_User,
        BOD_User      : req.body.BOD_User,
        Sex_User      : req.body.Sex_User,
        Email_User    : req.body.Email_User,
    });

    UserProfile.EditMYProfile(newUserProfile,(err,data)=>{
        if(err)
            res.status(500).send({
                message: 
                    err.message || "Something has been error while creating..."
            });
        else
            res.send(data);
    });
};

exports.EditMyAvatar = (req, res)=>{
    if(Object.keys(req.body).length === 0){
        res.status(400).send({
            message: "Content could not empty"
        });
    }

    UserProfile.EditMyAvatar(req.body.Avatar_User, req.body.id_User, (err,data)=>{
        if(err)
            res.status(500).send({
                message: 
                    err.message || "Something has been error while creating..."
            });
        else
            res.send(data);
    });
};

exports.ShowProfile = (req, res)=>{
    if(Object.keys(req.body).length === 0){
        res.status(400).send({
            message: "Content could not empty"
        });
    }
    UserProfile.GetMyProfile(req.body.id_User,(err,data)=>{
        if(err)
            res.status(500).send({
                message: 
                    err.message || "Something has been error while creating..."
            });
        else
            res.send(data);
    });
};

exports.GoodByeWorld = (req, res)=>{
    if(Object.keys(req.body).length === 0){
        res.status(400).send({
            message: "Content could not empty"
        });
    }
    UserProfile.GoodBye(req.body.id_User,(err,data)=>{
        if(err)
            res.status(500).send({
                message: 
                    err.message || "Something has been error while creating..."
            });
        else
            res.send(data);
    });
};