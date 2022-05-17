const sql = require("./db");
const TypeNotification = function(newTypeNotification){
    this.TypeNotification = newTypeNotification.TypeNotification;
};

TypeNotification.CreateTypeNotification = (newTypeNotification, result)=>{
    sql.query("INSERT INTO tbtypenotification SET ? ", newTypeNotification, (err, res)=>{
        if(err){
            console.log("ERROR: ",err);
            result(err,null);
            return;
        }
        else{
            console.log("Created new type notification: ", {id: res.insertId, ...newTypeNotification});
            result(nulll, {id: res.insertId, ...newTypeNotification});
        }
    });
};

TypeNotification.ShowALL = result =>{
    sql.query("SELECT * FROM tbtypenotification", (err, res)=>{
        if(err){
            console.log("ERROR: ", err);
            result(err, null);
            return;
        }
        console.log("Found: ", res);
        result(null, res);
    });
};

TypeNotification.ShowByID = (id, result)=>{
    sql.query("SELECT * FROM tbtypenotification WHERE id_TypeNotification = ?",id ,(err, res)=>{
        if(err){
            console.log("ERROR: ", err);
            result(err, null);
            return;
        }
        console.log("Found: ", res);
        result(null, res);
    });
};

TypeNotification.EditType = (newTypeNotification, idNo, result)=>{
    sql.query("UPDATE tbtypenotification SET TypeNotification = ? WHERE id_TypeNotification = ?", newTypeNotification, idNo, 
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

TypeNotification.DeleteType = (id_Type, result)=>{
    sql.query("DELETE FROM tbtypenotification WHERE id_TypeNotification = ?", id_Type, 
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
module.exports = TypeNotification;