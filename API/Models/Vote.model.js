const sql = require("./db");

const Vote = function(newVote){
    this.id_Post = newVote.id_Post;
    this.id_User = newVote.id_User;
    this.voteValue = newVote.voteValue;
};

Vote.CreateVote = (newVote, result)=>{
    sql.query("INSERT INTO tbvote SET ? ", newVote, (err, res)=>{
        if(err){
            console.log("ERROR: ", err);
            result(err, null);
            return;
        }
        console.log("Create new vote: ", {id: res.insertId, ...newVote});
        result(null, {id: res.insertId, ...newVote});
    });
};

Vote.EditVote = (newVote, result)=>{
    sql.query("UPDATE tbvote SET voteValue = ? WHERE id_Post = ? AND id_User = ?", 
    [newVote.voteValue, newVote.id_Post, newVote.id_User], (err, res)=>{
        if(err){
            console.log("ERROR: ", err);
            result(err, null);
            return;
        }
        console.log("Updated: ", res);
        result(null, res);
    });
};

Vote.DelVote = (id_Post, id_User, result)=>{
    sql.query(`DELETE FROM tbvote WHERE id_Post = ${id_Post} AND id_User = ${id_User}`, (err, res)=>{
        if(err){
            console.log("ERROR: ", err);
            result(err, null);
            return;
        }
        console.log("DELETED: ", res);
        result(null, res);
    });
};

Vote.FindVoteByPost = (id_Post, result)=>{
    sql.query(`SELECT * FROM tbvote WHERE id_Post = ${id_Post}`, (err, res)=>{
        if(err){
            console.log("ERROR: ", err);
            result(err, null);
            return;
        }
        console.log("FOUND: ", res);
        result(null, res);
    });
};

Vote.VOP = (id_Post, result)=>{
    sql.query("SELECT AVG(voteValue) AS AVG FROM tbvote WHERE id_Post = ?", id_Post, (err, res)=>{
        if(err){
            console.log("ERROR: ", err);
            result(err, null);
            return;
        }
        console.log("AVG Value: ", res);
        result(null, res);
    });
};

Vote.FindVoteOfUserOfPost = (id_User, id_Post, result)=>{
    sql.query(`SELECT * FROM tbvote WHERE id_User = ${id_User} AND id_Post =  ${id_Post}`, (err, res)=>{
        if(err){
            console.log("ERROR: ", err);
            result(err, null);
            return;
        }
        console.log("FOUND: ", res);
        result(null, res);
    });
};

module.exports = Vote;