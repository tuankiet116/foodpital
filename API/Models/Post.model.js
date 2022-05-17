const sql = require("./db");

const Post = function(post){
    this.id_User = post.id_User;
    this.id_Topic = post.id_Topic;
};

Post.CreatePost = (newPost, result)=>{
    sql.query("INSERT INTO tbpost SET ? ", newPost, (err, res)=>{
        if(err){
            console.log("ERROR: ", err);
            result(err, null);
            return;
        }
        
        console.log("Created new post: " ,{id: res.insertId, ...newPost});
        result(null, {id: res.insertId, ...newPost});
    });
};
Post.FindPostUser = (id_User, result)=>{
    sql.query("SELECT * FROM tbpost WHERE id_User = ?", id_User, (err, res)=>{
        if(err){
            console.log("ERROR: ", err);
            result(err, null);
            return;
        }
        console.log("FOUND Post Of User: ", res);
        result(null, res);
    });
};

Post.FindAll = (req,result) =>{
    sql.query("SELECT * FROM tbpost ORDER BY DateTimePost DESC LIMIT ?, ?", [parseInt(req.body.start),parseInt(req.body.limit)], (err, res)=>{
        console.log(sql.query);
        if(err){
            console.log(err);
            result(err, null);
            return;
        }
        console.log("post: ", res);
        result(null, res);
    });
};

Post.UpdatePost = (id_Post, id_Topic, result)=>{
    sql.query(`UPDATE tbpost  SET id_Topic = ${id_Topic} WHERE id_Post = ${id_Post}`, (err, res)=>{
        if(err){
            console.log("ERROR: ",err);
            result(err, null);
            return;
        }
        console.log("Updated post: ", res);
        result(null,res);
    });

    console.log(`UPDATE tbpost  SET id_Topic = ${id_Topic} WHERE id_Post = ${id_Post}`);
};

Post.DeletePost = (idPost, idUser,  result)=>{
    sql.query(`DELETE FROM tbpost WHERE id_Post = ${idPost} AND id_User = ${idUser}`, (err, res)=>{
        if(err){
            console.log("ERROR: ", err);
            result(err, null);
            return;
        }
        console.log("Delete Completed: ", res);
        result(null, res);
    });
};

Post.CountPost = result=>{
    sql.query("SELECT COUNT(*) as CountPost FROM tbpost ", (err, res)=>{
        if(err){
            console.log("ERROR: ", err);
            result(err, null);
            return;
        }
        console.log("COUNT: ", res);
        result(null, res);
    });
};

Post.GetAllPost = result=>{
    sql.query("SELECT * FROM tbpost", (err, res)=>{
        if(err){
            console.log("ERROR: ", err);
            result(err, null);
            return;
        }
        console.log("COUNT: ", res);
        result(null, res);
    });
}

Post.GetPostByUser = (req, result)=>{
    console.log(req);
    sql.query("SELECT * FROM tbpost  WHERE id_User = ? ORDER BY DateTimePost DESC LIMIT ?, ?", [req.body.id_User,parseInt(req.body.start),parseInt(req.body.limit)], (err, res)=>{
        
        if(err){
            console.log("ERROR: ", err);
            result(err, null);
            return;
        }
        console.log("Delete Completed: ", res);
        result(null, res);
    });
}
Post.GetPostByPost = (req, result)=>{
    console.log(req);
    sql.query("SELECT * FROM tbpost  WHERE id_Post = ? ORDER BY DateTimePost DESC LIMIT ?, ?", [req.body.id_Post,parseInt(req.body.start),parseInt(req.body.limit)], (err, res)=>{
        if(err){
            console.log("ERROR: ", err);
            result(err, null);
            return;
        }
        console.log("Delete Completed: ", res);
        result(null, res);
    });
}

Post.GetPostByIdPost = (idPost, idUser, result)=>{
    sql.query(`SELECT * FROM tbpost WHERE id_Post = ${idPost} AND id_User = ${idUser}`, (err, res)=>{
        if(err){
            console.log("ERROR: ", err);
            result(err, null);
            return;
        }
        console.log("Found Completed: ", res);
        result(null, res);
    });
};

module.exports = Post;