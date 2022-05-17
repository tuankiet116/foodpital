const sql = require("./db");

const Content = function(newContent){
    this.id_Post = newContent.id_Post;
    this.Title_Content = newContent.Title_Content;
    this.Text_Content = newContent.Text_Content;
}

Content.CreateContent = (newContent, result)=>{
    sql.query("INSERT INTO tbcontent SET ?", newContent, (err, res)=>{
        if(err){
            console.log("ERROR: ",err);
            result(err, null);
            return;
        }
        console.log("Created new content: ", {id: res.insertId, ...newContent});
        result(null, {id: res.insertId, ...newContent});
    });
};

Content.GetOneByIdPost = (idPost, result)=>{
    sql.query("SELECT * FROM tbcontent WHERE id_Post = ? ORDER BY DateTimeContent DESC LIMIT 1", idPost, (err, res)=>{
        if(err){
            console.log("ERROR: ", err);
            result(err, null);
            return;
        }
        console.log("Found: ", res);
        result(null, res);
    });
};

Content.GetAllByID_Post = (idPost, result)=>{
    sql.query("SELECT * FROM tbcontent WHERE id_Post = ? ORDER BY DateTimeContent DESC", idPost, (err, res)=>{
        if(err){
            console.log("ERROR: ", err);
            result(err, null);
            return;
        }
        console.log("Found: ", res);
        result(null, res);
    });
};

Content.DeleteByID = (idContent, result)=>{
    sql.query("DELETE FROM tbcontent WHERE id_Content = ?", idContent, (err, res)=>{
        if(err){
            console.log("ERROR: ", err);
            result(err, null);
            return;
        }
        console.log("Deleted: ", res);
        result(null, res);
    });
};

module.exports = Content;