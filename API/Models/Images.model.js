const sql = require("./db");

const Image =  function(newImage){
    this.Name_Image = newImage.Name_Image;
    this.id_Post = newImage.id_Post;
};

Image.CreateImage = (newImage, result)=>{
    sql.query("INSERT INTO tbimages SET ?", newImage, (err, res)=>{
        if(err){
            console.log("ERROR: ", err);
            result(err, null);
            return;
        }

        console.log("Created new image: ", {id: res.insertId, ...newImage});
        result(null, {id: res.insertId, ...newImage});
    });
};

Image.GetAllByIDPost = (idPost, result)=>{
    sql.query("SELECT * FROM tbimages WHERE id_Post = ?", idPost, (err, res)=>{
        if(err){
            console.log("ERROR: ", err);
            result(err, null);
            return;
        }
        console.log("FOUND: ", res);
        result(null, res);
    });
};

Image.DelImage = (Name_Image, id_Post, result)=>{
    sql.query(`DELETE FROM tbimages WHERE Name_Image ='${Name_Image}' AND id_Post = ${id_Post} `, (err, res)=>{
        if(err){
            console.log("ERROR: ", err);
            result(err,  null);
            return;
        }
        console.log("DELETED: ", res);
        result(null, res);
    });
};

Image.GetImageByIDUser = (id_User, result)=>{
    sql.query("SELECT Name_Image FROM tbimages, tbpost "+
    "WHERE tbimages.id_Post = tbpost.id_Post "+
    "AND tbpost.id_User = ? "+
    "ORDER BY id_Image DESC LIMIT 9", id_User, (err, res)=>{
        console.log(sql.query);
        if(err){
            console.log("ERROR: ", err);
            result(err,  null);
            return;
        }
        console.log("FOUND: ", res);
        result(null, res);
    });
};
Image.GetAllImageByIDUser = (id_User, result)=>{
    sql.query("SELECT Name_Image FROM tbimages, tbpost "+
    "WHERE tbimages.id_Post = tbpost.id_Post "+
    "AND tbpost.id_User = ? "+
    "ORDER BY id_Image DESC", id_User, (err, res)=>{
        console.log(sql.query);
        if(err){
            console.log("ERROR: ", err);
            result(err,  null);
            return;
        }
        console.log("FOUND: ", res);
        result(null, res);
    });
};

Image.Edit = (idPost, Name_Image, result)=>{
    sql.query( `UPDATE tbimages SET Name_Image = '${Name_Image}' WHERE id_Post = ${idPost}`, (err, res)=>{
        console.log(sql.query);
        if(err){
            console.log("ERROR: ", err);
            result(err,  null);
            return;
        }
        console.log("UPDATED: ", res);
        result(null, res);
    });
};

module.exports = Image;