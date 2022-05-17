const Image = require("../Models/Images.model");

exports.CreateImage = (req, res)=>{
    if(Object.keys(req.body).length === 0){
        res.status(400).send({
            message: "Content could not be empty!"
        });
    }

    const newImage = new Image({
        Name_Image: req.body.Name_Image,
        id_Post: req.body.id_Post
    });

    Image.CreateImage(newImage, (err, data)=>{
        if(err){
            res.status(500).send({
                message: err.message || "Something has been error"
            });
        }
        else res.send(data);
    });
};

exports.GetImageOfPost = (req, res)=>{
    if(Object.keys(req.body).length === 0){
        res.status(400).send({
            message: "Content could not be empty!"
        });
    }

    Image.GetAllByIDPost(req.body.id_Post, (err, data)=>{
        if(err){
            res.status(500).send({
                message: err.message || "Something has been error"
            });
        }
        else res.send(data);
    });
};

exports.DelImage = (req, res)=>{
    if(Object.keys(req.body).length === 0){
        res.status(400).send({
            message: "Content could not be empty!"
        });
    }

    Image.DelImage(req.body.Name_Image, req.body.id_Post, (err, data)=>{
        if(err){
            res.status(500).send({
                message: err.message || "Something has been error"
            });
        }
        else res.send(data);
    });
};

exports.ImageUser = (req, res)=>{
    if(Object.keys(req.body).length === 0){
        res.status(400).send({
            message: "Content could not be empty!"
        });
    }

    Image.GetImageByIDUser(req.body.id_User, (err, data)=>{
        if(err){
            res.status(500).send({
                message: err.message || "Something has been error"
            });
        }
        else res.send(data);
    });
};

exports.ImageUserAll = (req, res)=>{
    if(Object.keys(req.body).length === 0){
        res.status(400).send({
            message: "Content could not be empty!"
        });
    }

    Image.GetAllImageByIDUser(req.body.id_User, (err, data)=>{
        if(err){
            res.status(500).send({
                message: err.message || "Something has been error"
            });
        }
        else res.send(data);
    });
};

exports.UpdateImage = (req, res)=>{
    if(Object.keys(req.body).length === 0){
        res.status(400).send({
            message: "Content could not be empty!"
        });
    }

    Image.Edit(req.body.id_Post, req.body.Name_Image, (err, data)=>{
        if(err){
            res.status(500).send({
                message: err.message || "Something has been error"
            });
        }
        else res.send(data);
    });
};