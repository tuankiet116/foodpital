module.exports = app =>{
    const UserAccount = require("../controllers/userAccountControllers");
    const Permission = require("../controllers/PermissionControllers");
    const Topic = require("../Controllers/TopicControllers");
    const Comment = require("../Controllers/CommentControllers");
    const Content = require("../Controllers/ContentControllers");
    const Image = require("../Controllers/ImageControllers");
    const Notification = require("../Controllers/NotificationControllers");
    const Post = require("../Controllers/PostControllers");
    const TypeNotification = require("../Controllers/TypeNotificationControllers");
    const UserProfile = require("../Controllers/UserProfileControllers");
    const Vote = require("../Controllers/VoteControllers");
    const NotiUser = require("../Controllers/ShowUserNotificationControllers");

    //Permission
    app.post("/admin/permission", Permission.CreatePermission);
    app.get("/admin/permission/getall", Permission.AllPermission);
    app.post("/admin/permission/findID", Permission.GetByID);
    app.put("/admin/permission/edit/:idPer", Permission.EditNamePer);
    app.delete("/admin/permission/delete/:idPer", Permission.DelPer);

    //UserAccount
    app.post("/user/signup", UserAccount.CreateAccount);
    app.post("/user/login", UserAccount.SignIn);
    app.post("/user/permission", UserAccount.getPermission);
    app.put("/user/account/edit", UserAccount.UpdateMyPassword);
    app.delete("/user/account/del", UserAccount.DeleteAccount);
    app.get("/admin/accountuser", UserAccount.GetAllAccount);
    app.get("/admin/countaccount", UserAccount.CountAccount);

    //Post
    app.post("/post/newfeed", Post.ShowNewFeed);
    app.post("/post/create", Post.CreatePost);  
    app.put("/post/edit", Post.EditPost);
    app.delete("/post/del", Post.DeletePost);
    app.get("/admin/countpost", Post.Count);
    app.get("/admin/getallpost", Post.GetAllPost);
    app.post("/post/getpostbyuser", Post.GetPostByUser);
    app.post("/post/getpostbypost", Post.GetPostByPost);
    app.post("/post/getpostbyidpost", Post.GetPostByID);

    //Topic
    app.post("/topic/create", Topic.CreateTopic);
    app.post("/topic/gettopic", Topic.GetNameByID);
    app.get("/topic/all", Topic.ShowAllTopic);
    app.put("/topic/edit/:idTopic", Topic.UpdateTopic);
    app.delete("/topic/del", Topic.DelTopic);

    //Content
    app.post("/content/create", Content.CreateContent);
    app.post("/content/getcontent", Content.GetOne);
    app.post("/content/history", Content.GetAllByPost);
    app.delete("/content/delete", Content.DelContent);

    //Profile
    app.post("/profile/create", UserProfile.CreateUserProfile);
    app.post("/profile/myprofile", UserProfile.ShowProfile);
    app.put("/profile/myprofile/edit", UserProfile.EditProfile);
    app.put("/profile/myavatar/edit", UserProfile.EditMyAvatar);
    app.delete("/profile/goobye", UserProfile.GoodByeWorld);

    //Type Notification
    app.post("/typenotification/insert", TypeNotification.CreateTypeNotification);
    app.get("/typenotification/showall", TypeNotification.ShowAll);
    app.post("/typenotification/showone", TypeNotification.ShowByID);
    app.put("/typenotification/edit", TypeNotification.EditType);
    app.delete("/typenotification/del", TypeNotification.DelType);

    //Vote
    app.post("/vote/ins", Vote.CreateVote);
    app.post("/vote/getall", Vote.GetUserVoted);
    app.post("/vote/editvalue", Vote.EditValue);
    app.delete("/vote/del", Vote.DelVote);
    app.post("/vote/avg", Vote.AVG);
    app.post("/vote/user", Vote.VoteOfUserOfPost);

    //Image
    app.post("/img/ins", Image.CreateImage);
    app.post("/img/get", Image.GetImageOfPost);
    app.delete("/img/del", Image.DelImage);
    app.post("/img/user", Image.ImageUser);
    app.post("/img/user/all", Image.ImageUserAll);
    app.put("/image/edit", Image.UpdateImage);

    //Comment
    app.post("/comment/ins", Comment.CreateComment);
    app.post("/comment/getparent", Comment.GetParent);
    app.post("/comment/getchild", Comment.GetChild);
    app.put("/comment/edit", Comment.EditComment);
    app.delete("/comment/del", Comment.DeleteComment);
    app.post("/comment/count", Comment.CountComment);

    //Notification
    app.post("/notification/ins", Notification.CreateNotification);
    app.post("/notification/getmynoti", Notification.GetNotificationByUser);
    app.put("/notification/readed", Notification.Readed);
    app.post("/notification/count", Notification.CountNotification);

    //Show Information for tb Notification and user's information
    app.post("/notification/getinfor", NotiUser.GetInformation);
    
    //routehtml
  //   const session = require('express-session') 
  //   app.use(session({ 
  
  //     // It holds the secret key for session 
  //     secret: 'Your_Secret_Key', 
    
  //     // Forces the session to be saved 
  //     // back to the session store 
  //     resave: true, 
    
  //     // Forces a session that is "uninitialized" 
  //     // to be saved to the store 
  //     saveUninitialized: true
  // })) 
    const path = require('path');
    
    // app.get('/:page',(req,res) => {
    //   var page = req.params.page;
    //     console.log(req.session);
    //     if(!req.session.userID && page != 'signin'){
    //       res.redirect('/signin');
    //       req.session.userID = "tesst";
    //       //console.log("//////////")
    //       //console.log(req.session);
    //     }else{
    //       res.sendFile(path.resolve(__dirname + '/../../Views/HTML/'+page+'.php'));
    //     }
    //   });
};