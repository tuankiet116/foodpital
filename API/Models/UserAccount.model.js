const sql = require("./db");
const UserAccount = function(user){
    this.User_Sign     = user.User_Sign;
    this.User_Password = user.User_Password;
    this.id_Permission = user.id_Permission;
};

//Sql Query
UserAccount.CreateAccount = (newUser, result)=>{
    sql.query("SELECT User_Sign FROM tbusersignin WHERE User_Sign = ?", newUser.User_Sign, (err, res)=>{
        if(err){
            console.log("ERROR: ", err);
            return;
        }
        if(res.length){
            console.log("This Account Exits: ", err);
            return result(err, null);
        }
        else{
            sql.query("INSERT INTO tbusersignin set ?", newUser, (err, res)=>{
                if(err){
                    console.log("ERROR: ", err);
                    result(err, null);
                    return;
                }
                console.log("Created new user account: ", {id: res.insertId, ...newUser});
                result(null, {id: res.insertId,...newUser});

            });
        }
    });
    
};

UserAccount.GetInformationAccount = (req, Account, Password, result)=>{
    sql.query(`SELECT * FROM tbusersignin WHERE User_Sign = '${Account}' and User_Password = '${Password}'`, (err, res)=>{
        if(err){
            console.log(err);
            result(err, null);
            return;
        }
        
        if(res.length){
            console.log("Found user account: ", res[0]);
            result(null, res[0]);
            return;
        }

        result({kind: "NOT_FOUND"}, null);
    });
};

UserAccount.EditMyPassword = ( MyIdAccount , MyNewPassword, result)=>{
    sql.query(`UPDATE tbusersignin SET User_Password = '${MyNewPassword}' WHERE id_User = ${MyIdAccount} `, (err,res)=>{
        if(err){
            console.log(err);
            result(err, null);
            return;
        }
        console.log("Updated new password: ", res);
        result(null, res);
    });
};

UserAccount.DelMyAccount = (MyIdAccount, MyPassword, result)=>{
    console.log(MyIdAccount);
    console.log(MyPassword);
    sql.query("DELETE FROM tbusersignin WHERE id_User = ? and User_Password = ? ", [MyIdAccount, MyPassword], (err, res)=>{
        if(err){
            console.log("ERROR: ", err);
            result(err, null);
            return;
        }
        console.log("Delete Completed account ", res);
        result(null, res);
    });
};

UserAccount.GetAllAccount = result =>{
    sql.query("SELECT * FROM tbusersignin", (err, res)=>{
        if(err){
            console.log("ERROR: ", err);
            result(err, null);
            return;
        }
        console.log("Found account ", res);
        result(null, res);
    });
};

UserAccount.CountAccount = result=>{
    sql.query("SELECT COUNT(*) as CountAccount FROM tbusersignin", (err, res)=>{
        if(err){
            console.log("ERROR: ", err);
            result(err, null);
            return;
        }
        console.log("Count Account: ", res);
        result(null, res);
    });
};

UserAccount.GetPermission = (idUser, result)=>{
    sql.query("SELECT id_Permission FROM tbusersignin WHERE ID_User = ?", idUser, (err, res)=>{
        if(err){
            console.log("ERROR: ", err);
            result(err, null);
            return;
        }
        console.log("Permission Account: ", res);
        result(null, res);
    });
};

module.exports = UserAccount;