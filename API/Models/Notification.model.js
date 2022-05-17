const sql = require("./db");
const Notification = function(notification){
    this.id_User = notification.id_User;
    this.id_TypeNotification = notification.id_TypeNotification;
    this.Read = notification.Read;
    this.id_UserSend = notification.id_UserSend;
};

Notification.CreateNotification = (newNotification, result)=>{
    sql.query("INSERT INTO tbnotification SET ?", newNotification, (err,res)=>{
        if(err){
            console.log("ERROR: ", err);
            result(err,null);
            return;
        }

        console.log("Created new notification: ", {id: res.insertId, ...newNotification});
        result(null, {id: res.insertId, ...newNotification});
    }); 
};

Notification.ReadNotification = (id_Notification ,result) =>{
    sql.query("UPDATE tbnotification SET Read = 1 WHERE id_Notification = ?", id_Notification, (err, res)=>{
        if(err){
            console.log("ERROR: ", err);
            result(err, null);
            return;
        }
        console.log("Readed: ", res);
        result(null, res);
    });
};

Notification.GetByUserReceive = (id_UserReceive, result)=>{
    sql.query("SELECT * FROM tbnotification WHERE id_User = ? ORDER BY DateTime ASC", id_UserReceive, (err, res)=>{
        if(err){
            console.log("ERROR: ", err);
            result(err, null);
            return;
        }
        console.log("FOUND: ", res);
        result(null, res);
    });
};

Notification.GetCountNotification = (id_UserReceive, result)=>{
    sql.query("SELECT COUNT(*) AS CountNotification FROM tbnotification WHERE id_User = ?", id_UserReceive, (err, res)=>{
        if(err){
            console.log("ERROR: ", err);
            result(err, null);
            return;
        }
        console.log("Count: ", res);
        result(err, res);
    });
};
module.exports = Notification;