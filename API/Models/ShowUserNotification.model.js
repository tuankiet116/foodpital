const sql = require("./db");
const ShowUserNotification = function(params){
    this.id_User = params.id_User;
};

ShowUserNotification.Get = (idUser, result)=>{
    sql.query("SELECT tbnotification.*, tbprofile.Name_User, tbprofile.Avatar_User, "+
    "tbtypenotification.TypeNotification FROM tbnotification, tbprofile, tbtypenotification "+
    "WHERE tbnotification.id_UserSend = tbprofile.id_User "+
    "AND tbnotification.id_TypeNotification = tbtypenotification.id_TypeNotification AND tbnotification.id_User = ?"+
    "ORDER BY tbnotification.DateTime DESC", idUser, 
    (err, res)=>{
        if(err){
            console.log("ERROR: ", err);
            result(err, null);
            return;
        }
        console.log("FOUND: ", res);
        result(null, res);
    });
};

module.exports = ShowUserNotification;