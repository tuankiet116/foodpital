const sql = require("./db");

const Profile = function(profile){
    this.id_User       = profile.id_User;
    this.Name_User     = profile.Name_User;
    this.BOD_User      = profile.BOD_User;
    this.Sex_User      = profile.Sex_User;
    this.Email_User    = profile.Email_User;
    this.Avatar_User   = profile.Avatar_User;
};

Profile.CreateUserProfile = (newProfile, result)=>{
    sql.query("INSERT INTO tbprofile SET ?", newProfile, (err,res) => {
        if(err){
            console.log("ERROR: ",err);
            result(err, null);
            return;
        }
        console.log("Created new user profile:", newProfile);
        result(null, newProfile);
    });
};

Profile.GetMyProfile = (idUser, result)=>{
    sql.query("SELECT * FROM tbprofile WHERE id_User = ?", idUser, (err, res)=>{
        if(err){
            console.log("ERROR: ", err);
            result(err, null);
            return;
        }
        console.log("Found: ", res);
        result(null, res);
    });
};

Profile.EditMYProfile = (newProfile, result)=>{
    sql.query("UPDATE tbprofile SET Name_User = ?, BOD_User = ?, Sex_User = ?, Email_User= ? WHERE id_User = ?", 
    [newProfile.Name_User, newProfile.BOD_User, newProfile.Sex_User, newProfile.Email_User, newProfile.id_User], 
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

Profile.EditMyAvatar = (srcAvatar, idUser, result)=>{
    sql.query(`UPDATE tbprofile SET Avatar_User = '${srcAvatar}' WHERE id_User = ${idUser} `, (err, res)=>{
        if(err){
            console.log("ERROR: ", err);
            result(err, null);
            return;
        }
        console.log("Updated new avatar: ", res);
        result(null, res);
    });
};

Profile.GoodBye = (idUser, result)=>{
    sql.query("DELETE FROM tbprofile WHERE id_User = ?", idUser, (err, res)=>{
        if(err){
            console.log("ERROR: ", err);
            result(err, null);
            return;
        }
        console.log("Deleted: ", res);
        result(null, res);
    });
};

module.exports = Profile;