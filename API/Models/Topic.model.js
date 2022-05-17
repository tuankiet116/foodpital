const sql = require("./db");

const Topic = function(newTopic){
    this.Name_Topic = newTopic.Name_Topic;
};

Topic.CreateTopic = (newTopic, result) => {
    sql.query("INSERT INTO tbtopic SET ? ", newTopic, (err, res)=>{
        if(err){
            console.log("ERROR: ", err);
            result(err, null);
            return;
        }

        console.log("Created new topic: ", {id: res.insertId, ...newTopic});
        result(null, {id: res.insertId, ...newTopic});
    });
};

Topic.GetAllName = result =>{
    sql.query("SELECT * FROM tbtopic", (err, res)=>{
        if(err){
            console.log(err);
            result(err, null);
            return;
        }
        console.log("All Topic had show: ", res);
        result(null, res);
    });
};

Topic.UpdateMyTopic = (idTopic, newName, result)=>{
    sql.query("UPDATE tbtopic SET Name_Topic = '?' WHERE id_Topic =?", newName, idTopic, (err, res)=>{
        if(err){
            console.log("ERROR: ", err);
            result(err, null);
            return;
        }
        console.log("Updated topic: ", res);
        result(null, res);
    });
};

Topic.DelMyTopic = (idTopic, result)=>{
    sql.query("DELETE FROM tbtopic WHERE id_Topic = ?", idTopic, (err, res)=>{
        if(err){
            console.log("ERROR: ", err);
            result(err, null);
            return;
        }
        console.log("Delete Completed: ", res);
        result(null, res);
    });
};

Topic.getNameByID = (idTopic, result)=>{
    sql.query("SELECT Name_Topic FROM tbtopic WHERE id_Topic = ?", idTopic, (err, res)=>{
        if(err){
            console.log("ERROR: ", err);
            result(err, null);
            return;
        }
        console.log("FOUND: ", res);
        result(null, res);
    });
};

module.exports = Topic;