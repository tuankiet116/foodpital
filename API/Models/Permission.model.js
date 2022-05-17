const sql = require("./db");
const Permission = function(permission){
    this.Name_Permission = permission.Name_Permission;
};

Permission.CreatePermission = (newPermission, result) => {
    sql.query(" INSERT INTO tbpermission SET ?", newPermission, (err,res) => {
        if(err){
            console.log("ERROR: ",err);
            result(err, null);
            return;
        }

        console.log("Created new permission: ", {id: res.insertId,...newPermission});
        result(null, {id: res.insertId,...newPermission});
    });
};

Permission.ShowPermission = result =>{
    sql.query("SELECT * FROM tbpermission", (err, res)=>{
        if(err){
            console.log("ERROR: ", err);
            result(err, null);
            return;
        }
        console.log("All Permission: ", res);
        result(null, res);
    });
};

Permission.UpdateName = (newName, idPer, result)=>{
    sql.query("UPDATE tbpermission SET Name_Permission = '?' WHERE id_Permission = ?", newName , idPer, (err, res)=>{
        if(err){
            console.log("ERROR: ", err);
            result(err, null);
            return;
        }
        console.log("Updated: ", res);
        result(null, res);
    });
};

Permission.DelPermission = (idPer, result)=>{
    sql.query("DELETE FROM tbpermission WHERE id_Permission = ?", idPer, (err, res)=>{
        if(err){
            console.log("ERROR: ", err);
            result(err, null);
            return;
        }
        console.log("Deleted: ", res);
        result(null, res);
    });
};

Permission.FindPerByID = (idPer, result)=>{
    sql.query("SELECT Name_Permission FROM tbpermission WHERE id_Permission = ?", idPer, (err, res)=>{
        if(err){
            console.log("ERROR: ", err);
            result(err, null);
            return;
        }
        if(res.length){
            console.log("Found: ", res[0]);
            result(null, res[0]);
            return;
        }
        result({kind: "NOT_FOUND"}, null);
    });
};
module.exports = Permission;