<?php
    session_start();
    require_once("./isSignIn.php");
?>

<!DOCTYPE html>
<html lang="en">
<head>
	<title> Food society </title>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="icon" type="image/png" href="../../Assets/Images/logo120.png" alt="Food society icon" sizes="16x16">
    <link rel="stylesheet" href="../../Assets//fontawesome-free-5.14.0-web/css/all.css">
    <link rel="stylesheet" href="../../Assets//bootstrap-4.5.2-dist/css/bootstrap.min.css">
    <link rel="stylesheet" href="../CSS/left-sidebar.css">
    <link rel="stylesheet" type="text/css" href="../CSS/navbar.css">
    <link rel="stylesheet" href="../CSS/profile-page.css">
    <link rel="stylesheet" type="text/css" href="../CSS/newsfeed-content.css">
</head>

<body>
    <article id="top-nav">
    	<!--------------------  Logo ---------------------->
        <a href="http://localhost/foodpital/Views/HTML/newsfeed.php">
            <aside class="logo-side">
                <img src="../../Assets/Images/logo60.png" alt="Food society newsfeed logo">
            </aside>
        </a>
    	
        <!---------------------- Search bar ----------------------->
    	<aside class="topnav-search ">
	    	<input type="text" placeholder="Type here to search...">
            <a href="#"><i class="fa fa-search"></i></a>
	    </aside>

    	<div class="account ">
            <a href="#" class="profile-side">
                <div class="avatar">
                    <img src="../../Assets/Images/Sierra.jpg" alt="my avatar">
                </div>
                <div class="name-caption">
                    <h5></h5>
                </div>
            </a>
            <ul class="notification-side">
                <li><i class="fas fa-bars" typecate="left-sidebar"></i></li>
                <li><i class="fas fa-comment-alt" typecate="right-sidebar"></i></li>
                <li><i class="fa fa-bell" typesub="sub-notification-notifi"></i></li>
                <li><i class="fas fa-user-friends" typesub="sub-notification-friend"></i></li>
                <li><i class="fa fa-caret-down" typesub="sub-setting"></i></li>
            </ul>
    	</div>
    </article>
    
    <article class="sub-notification-container">
      <aside class="sub-notification-side" id="sub-notification-notifi">
            <div class="header-sub-notifi">
               <span class="header-sub-text">Notification</span>
               <span class="header-sub-number"></span>
            </div>
            <ul></ul>
      </aside>
      <aside class="sub-notification-side" id="sub-notification-friend">
               <div class="header-sub-notifi">
                  <span class="header-sub-text">Friend Request</span>
                  <span class="header-sub-number">4</span>
               </div>
               <ul>
                  <li>
                     <a href="#">
                           <div class="sub-notifi-item justify-content-between">
                              <div class="d-flex">
                                 <div class="avatar">
                                       <img src="../../Assets/Images/banner02.png"" alt="chau">
                                 </div>
                                 <div class="name-caption">
                                       <span class="name">Minh Chau</span>
                                       <span class="mutual-friend-number">15 friends</span>
                                 </div>
                              </div>
                              <div class="reply-invite d-flex">
                                 <button reply="confirm">Confirm</button>
                                 <button reply="delete">Delete Request</button>
                              </div>
                           </div>
                     </a>
                  </li>
                  <li>
                     <a href="#">
                           <div class="sub-notifi-item justify-content-between">
                              <div class="d-flex">
                                 <div class="avatar">
                                       <img src="../../Assets/Images/banner02.png"" alt="chau">
                                 </div>
                                 <div class="name-caption">
                                       <span class="name">Minh Chau</span>
                                       <span class="mutual-friend-number">15 friends</span>
                                 </div>
                              </div>
                              <div class="reply-invite d-flex">
                                 <button reply="confirm">Confirm</button>
                                 <button reply="delete">Delete Request</button>
                              </div>
                           </div>
                     </a>
                  </li>
                  <li>
                     <a href="#">
                           <div class="sub-notifi-item justify-content-between">
                              <div class="d-flex">
                                 <div class="avatar">
                                       <img src="../../Assets/Images/banner02.png"" alt="chau">
                                 </div>
                                 <div class="name-caption">
                                       <span class="name">Minh Chau</span>
                                       <span class="mutual-friend-number">15 friends</span>
                                 </div>
                              </div>
                              <div class="reply-invite d-flex">
                                 <button reply="confirm">Confirm</button>
                                 <button reply="delete">Delete Request</button>
                              </div>
                           </div>
                     </a>
                  </li>
               </ul>
      </aside>
      <aside class="sub-notification-side" id="sub-setting">
      <div class="header-sub-notifi">
         <span class="header-sub-text">Setting</span>
      </div>
        <ul>
            <li class="admin-btn"></li>
            
            <li>
                <a href="#" id="signout">
                    <div class="sub-notifi-item">
                        <i class="fas fa-sign-out-alt"></i>
                        <span>Sign out</span>
                    </div>
                </a>
            </li>
        </ul>
   </aside>
    </article>
	
	<article class="row" id="view-page">
        <aside id="left-sidebar" class="col-xl-2 col-lg-1 col-md-1 d-md-block d-sm-none d-none">
            <nav id="categories-nav">
                <ul></ul>
            </nav>
        </aside>
        <aside id="content" class="col-xl-8 col-lg-10 col-md-10 col-sm-12">
            <div class="row">
                <div class="card-profile col-xl-12">
                    <div class="cover-side">
                        <img id="cover-photo" alt="Cover Photo">
                        <div class="avatar-side">
                           <img id="avatar-photo" alt="Avatar Photo">
                           <div id="edit-avatar">
                                <label for="input-edit-avatar">Change Avatar</label>
                               <form name = "changeAvatar" action="ImageAvatar.php" enctype="multipart/form-data">
                                   <input type="file" name="input-edit-avatar" id = "input-edit-avatar">
                               </form>

                           </div>
                        </div>     
                    </div>
                    <div class="information-side">
                        <div class="name-info">
                            <h4></h4>
                        </div>
                        <div class="social-links">
                            <a href="#"><i class="fab fa-facebook-square"></i></a>
                            <a href="#"><i class="fab fa-instagram-square"></i></a>
                            <a href="#"><i class="fab fa-twitter-square"></i></a>
                        </div>
                        <div class="social-info">
                            <div id="number-post">
                                <h5>Posts</h5>
                                <h6></h6>
                            </div>
                            <div id="number-follower">
                                <h5>Followers</h5>
                                <h6></h6>
                            </div>
                            <div id="number-folowing">
                                <h5>Following</h5>
                                <h6></h6>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="nav nav-pills user-tabing col-xl-12">
                    <a class="nav-link active" data-toggle="pill" href="#feed-tab-panel" dataGet="notGet">Timeline</a>
                    <a class="nav-link" data-toggle="pill" href="#info-tab-panel" dataGet="notGet">About</a>
                    <a href="#">Friends</a>
                    <a class="nav-link" data-toggle="pill" href="#photo-tab-panel" dataGet="notGet">Photos/Videos</a>
                </div>
                <div class="tab-panel">
                    <div id="feed-tab-panel" class="row tab-pane fade active show" role="tabpanel">
                        <aside id="feed-right" class="col-lg-4">
                            <div id="photo-modal">
                                <h4>Photo</h4>
                                 <ul class="profile-img-gallary d-flex flex-wrap p-0">
                                 </ul>
                                 <button id="btnSeeAllPhoto">See All</button>
                            </div>
                            <div id="friends-modal">
                                 <h4>Friends</h4>
                                 <ul class="profile-img-gallary d-flex flex-wrap p-0 m-0">
                                    <li class="col-md-4 col-6 pl-2 pr-0 pb-3">
                                       <a href="javascript:void();"><img src="../../Assets/Images/logobanhmi.jpg" alt="gallary-image" class="img-fluid"></a>
                                       <h6 class="mt-2">Anna Rexia</h6>
                                    </li>
                                    <li class="col-md-4 col-6 pl-2 pr-0 pb-3">
                                       <a href="javascript:void();"><img src="../../Assets/Images/logobanhmi.jpg" alt="gallary-image" class="img-fluid"></a>
                                       <h6 class="mt-2">Tara Zona</h6>
                                    </li>
                                    <li class="col-md-4 col-6 pl-2 pr-0 pb-3">
                                       <a href="javascript:void();"><img src="../../Assets/Images/logobanhmi.jpg" alt="gallary-image" class="img-fluid"></a>
                                       <h6 class="mt-2">Polly Tech</h6>
                                    </li>
                                    <li class="col-md-4 col-6 pl-2 pr-0 pb-3">
                                       <a href="javascript:void();"><img src="../../Assets/Images/logobanhmi.jpg" alt="gallary-image" class="img-fluid"></a>
                                       <h6 class="mt-2">Bill Emia</h6>
                                    </li>
                                    <li class="col-md-4 col-6 pl-2 pr-0 pb-3">
                                       <a href="javascript:void();"><img src="../../Assets/Images/logobanhmi.jpg" alt="gallary-image" class="img-fluid"></a>
                                       <h6 class="mt-2">Moe Fugga</h6>
                                    </li>
                                    <li class="col-md-4 col-6 pl-2 pr-0 pb-3">
                                       <a href="javascript:void();"><img src="../../Assets/Images/logobanhmi.jpg" alt="gallary-image" class="img-fluid"></a>
                                       <h6 class="mt-2">Hal Appeno </h6>
                                    </li>
                                    <li class="col-md-4 col-6 pl-2 pr-0 pb-0">
                                       <a href="javascript:void();"><img src="../../Assets/Images/logobanhmi.jpg" alt="gallary-image" class="img-fluid"></a>
                                       <h6 class="mt-2">Zack Lee</h6>
                                    </li>
                                    <li class="col-md-4 col-6 pl-2 pr-0 pb-0">
                                       <a href="javascript:void();"><img src="../../Assets/Images/logobanhmi.jpg" alt="gallary-image" class="img-fluid"></a>
                                       <h6 class="mt-2">Terry Aki</h6>
                                    </li>
                                    <li class="col-md-4 col-6 pl-2 pr-0 pb-0">
                                       <a href="javascript:void();"><img src="../../Assets/Images/logobanhmi.jpg" alt="gallary-image" class="img-fluid"></a>
                                       <h6 class="mt-2">Greta Life</h6>
                                    </li>
                                 </ul>
                                 <button>See All</button>
                                 
                            </div>
                        </aside>
                        <aside id="feed-left" class="col-lg-8">
                            <div id="post-modal">
                                <h4>Create Post</h4>
                                <div class="body-post">
                                    <div class="avatar-post">
                                        <img src="../../Assets/Images/logobanhmi.jpg" alt="">
                                    </div>
                                    <div class="text-post">
                                        <span class="text-post" onclick="myPostPopUp()">What's on your mind, Chau?</span>
                                    </div>
                                </div>
                                <div class="option-post">
                                    <button type="button">
                                        <img src="../../Assets/Images/AddImageLogo.png" alt="Add image logo">
                                        Photo/Video
                                    </button>
                                    <button type="button">
                                        <img src="../../Assets/Images/AddFriendLogo2.png" alt="Add friends logo">
                                        Tag Friend
                                    </button>
                                    <button type="button">
                                        <img src="../../Assets/Images/SmileLogo.png" alt="Smile logo">
                                        Feeling/Activity
                                    </button>
                                </div>


                                <div id="post-popup">
                                    <div id="post-popup-container" onclick="myPostPopUp()"></div>
                                    <div id="post-popup-content">
                                        <div class="col-lg-8">
                                            <div id="post-popup-main">
                                                <h4>Create Post</h4>
                                                <div class="topic">
                                                    <div>Topic</div>
                                                    <select></select>
                                                </div>
                                                <div id="post-popup-profile">
                                                    <div>
                                                    </div>
                                                </div>
                                                <div id="post-popup-close">
                                                    <button type="text" onclick="myPostPopUp()"><i class="fas fa-times"></i></button>
                                                </div>
                                            </div>  
                                        </div>
                                    </div>
                                </div>

                                <div id="upload-popup">
                                    <div id="upload-popup-container"></div>
                                    <div id="upload-popup-content">
                                        <div class="col-lg-8">
                                            <div id="upload-popup-main">
                                                <h4>Update Post</h4>
                                                <div class="topic">
                                                    <div>Topic</div>
                                                    <select></select>
                                                </div>
                                                <div id="upload-popup-profile">
                                                    <div id="upload-popup-head">
                                                        <div id="upload-popup-avatar">
                                                            <img src="">
                                                        </div>
                                                        <div id="upload-popup-input">
                                                            <textarea type="text" placeholder="Write something here..."></textarea>
                                                        </div>
                                                        <div id="upload-image-file">
                                                            <img src="" alt="" id="postImg">
                                                            <button type="button" id="postImgButton"><i class="fas fa-times"></i></button>
                                                        </div>
                                                    </div>
                                                    <div id="upload-popup-middle">
                                                        <form method="post" action="image-process.php"  enctype="multipart/form-data">
                                                            <button type="button">
                                                                <img src="../../Assets/Images/AddImageLogo.png">
                                                                <p>Photo/Video</p>
                                                                <input type="file" onchange="changeImage(event)" name="images">
                                                            </button>
                                                            <button class="btn-post" type="submit" name="s1"> Update </button>
                                                        </form>
                                                        <button type="button">
                                                            <img src="../../Assets/Images/AddFriendLogo2.png">
                                                            <p>Tag Friend</p>
                                                        </button>
                                                        <button type="button">
                                                            <img src="../../Assets/Images/SmileLogo.png">
                                                            <p>Feeling/Activity</p>
                                                        </button>
                                                        <button type="button">
                                                            <img src="../../Assets/Images/CheckInLogo2.png">
                                                            <p>Check in</p>
                                                        </button>
                                                    </div>
                                                </div>
                                                <div id="upload-popup-close">
                                                    <button type="text"><i class="fas fa-times"></i></button>
                                                </div>
                                            </div>  
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </aside>
                        
                    </div>
                    <div id="info-tab-panel" class="row tab-pane fade" role="tabpanel">
                        <div class="col-md-3">
                           <ul class="nav nav-pills basic-info-items list-inline d-block p-0 m-0">
                              <li>
                                 <a class="nav-link active" data-toggle="pill" href="#basicinfo">Basic Information</a>
                              </li>
                              <li>
                                 <a class="nav-link" data-toggle="pill" href="#contactinfo">Contact Information</a>
                              </li>
                           </ul>
                        </div>
                        <div class="col-md-9 pl-4">
                           <div class="tab-content">
                              <div class="row tab-pane fade active show" id="basicinfo" role="tabpanel"></div>
                              <div class="row tab-pane fade" id="contactinfo" role="tabpanel"></div>
                           </div>
                        </div>
                     </div>
                     <div id="photo-tab-panel" class="row tab-pane fade" role="tabpanel">
                           <div class="photo-list-tab mt-2">
                              <ul class="nav nav-pills d-flex align-items-center justify-content-left photo-list-items p-0 mb-2">
                                 <li>
                                    <a class="nav-link active" data-toggle="pill" href="#photosofyou">Photos of You</a>
                                 </li>
                                 <li>
                                    <a class="nav-link" data-toggle="pill" href="#your-photos">Your Photos</a>
                                 </li>
                              </ul>
                              <div class="tab-content">
                                 <div class="tab-pane fade active show" id="photosofyou" role="tabpanel">
                                       <div class="row"></div>
                                 </div>
                              </div>
                           </div>
                     </div>
                </div>
            </div>
        </aside>
        <aside id="right-sidebar" class="col-xl-2 col-lg-1 col-md-1 d-md-block d-sm-none d-none">
            <div id="categories-online-friends">
                <ul>
                    <a href="#">
                        <li>
                            <div class="friend-avatar">
                                <img src="../../Assets/Images/Sierra.jpg" alt="">
                                <span class="status online"></span>
                            </div>
                            <div class="friend-name">
                                <h6>Minh Chau</h6>
                                <p>Admin</p>
                            </div>
                        </li>
                    </a>
                    <a href="#">
                        <li>
                            <div class="friend-avatar">
                                <img src="../../Assets/Images/Sierra.jpg" alt="">
                                <span class="status online"></span>
                            </div>
                            <div class="friend-name">
                                <h6>Minh Chau</h6>
                                <p>Admin</p>
                            </div>
                        </li>
                    </a>
                </ul>
            </div>
        </aside>
    </article>
    
	<script src="../JavaScript/jquery-3.5.1.min.js"></script>
	<script src="../../Assets/bootstrap-4.5.2-dist/js/bootstrap.js"></script>
    <script src="../JavaScript/sidebar.js"></script>
    <script src="../JavaScript/topnav.js"></script>
    <script src="../JavaScript/newsfeed-content.js"></script>
    <script src="../JavaScript/profile.js"></script>

</body>
</html>