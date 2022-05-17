const Notification = require("../models/Notification.model");
exports.CreateNotification = (req,res)=>{
    if(Object.keys(req.body).length === 0){
        res.status(400).send({
            message: "Content could not be empty"
        });
    }    


    const newNotification = new Notification({
        id_User: req.body.id_User,
        id_TypeNotification: req.body.id_TypeNotification,
        Read: req.body.Read,
        id_UserSend: req.body.id_UserSend
    });

    Notification.CreateNotification(newNotification,(err,data)=>{
        if(err){
            res.status(500).send({
                message: err.message || "Something has been error"
            });
        }else res.send(data);
    });
};

exports.GetNotificationByUser = (req, res)=>{
    if(Object.keys(req.body).length === 0){
        res.status(400).send({
            message: "Content could not be empty"
        });
    }    

    Notification.GetByUserReceive(req.body.id_User, (err, data)=>{
        if(err){
            res.status(500).send({
                message: err.message || "Something has been error"
            });
        }else res.send(data);
    });
};

exports.Readed = (req, res)=>{
    if(Object.keys(req.body).length === 0){
        res.status(400).send({
            message: "Content could not be empty"
        });
    }    
    Notification.ReadNotification(req.body.id_Notification, (err, data)=>{
        if(err){
            res.status(500).send({
                message: err.message || "Something has been error"
            });
        }
        else res.send(data);
    });
};

exports.CountNotification = (req, res)=>{
    if(Object.keys(req.body).length === 0){
        res.status(400).send({
            message: "Content could not be empty"
        });
    }    
    Notification.GetCountNotification(req.body.id_User, (err, data)=>{
        if(err){
            res.status(500).send({
                message: err.message || "Something has been error"
            });
        }
        else res.send(data);
    });
};