const sql = require("./db");

const Comment = function(newComment){
    this.id_Post =  newComment.id_Post;
    this.Content_Comment = newComment.Content_Comment;
    this.ParentCode = newComment.ParentCode;
    this.id_User = newComment.id_User;
};

Comment.Create = (newComment, result)=>{
    sql.query("INSERT INTO tbcomment SET ? ", newComment, (err, res)=>{
        
        if(err){
            console.log("ERROR: ", err);
            result(err, null);
            return;
        }
        console.log("Created new comment: ", {id: res.insertId, ...newComment});
        result(null,{id: res.insertId, ...newComment});
    });
};

Comment.GetParentComment = (id_Post, result)=>{
    sql.query("SELECT * FROM tbcomment WHERE id_Post = ? AND ParentCode = 0", id_Post, (err, res)=>{
        if(err){
            console.log("ERROR: ", err);
            result(err, null);
            return;
        }
        console.log("FOUND: ", res);
        result(null, res);
    });
};

Comment.GetChildComment = (id_Post, id_CommentParent, result)=>{
    sql.query(`SELECT * FROM tbcomment WHERE id_Post = ${id_Post} AND ParentCode = ${id_CommentParent}`, (err, res)=>{
        if(err){
            console.log("ERROR: ", err);
            result(err, null);
            return;
        }
        console.log("FOUND: ", res);
        result(null, res);
    });
};

Comment.EditComment = (id_User, idComment, Text, result)=>{
    sql.query(`UPDATE tbcomment SET Content_Comment = '${Text}', DateTime_Comment = CURRENT_TIMESTAMP 
    WHERE id_Comment = ${idComment} AND id_User = ${id_User}`,
    (err, res)=>{
        if(err){
            console.log("ERROR: ", err);
            result(err, null);
            return;
        }
        console.log("Updated: ", res);
        result(null, res);
    });
};

Comment.DelMyComment = (idComment, idUser, result)=>{
    sql.query(`DELETE FROM tbcomment WHERE id_Comment = ${idComment} AND id_User = ${idUser}`, (err, res)=>{
        if(err){
            console.log("ERROR: ", err);
            result(err, null);
            return;
        }
        console.log("DELETED: ", res);
        result(null, res);
    });
};

Comment.CountCommentByIdPost = (id_Post, result) => {
    sql.query("SELECT COUNT(*) AS CountComment FROM tbcomment WHERE id_Post = ?", id_Post, (err, res)=>{
        if(err){
            console.log("ERROR: ", err);
            result(err, null);
            return;
        }
        console.log("COUNT: ", res);
        result(null, res);
    });
};

module.exports = Comment;