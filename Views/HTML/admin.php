<?php
session_start();
if($_SESSION['admin']==" "  || $_SESSION['admin']==null){
    header("location: http://localhost/foodpital/Views/HTML/newsfeed.php");
}
require_once("./isSignIn.php");
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <title> Admin </title>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="icon" type="image/png" href="../../Assets/Images/logo120.png" alt="Food society icon" sizes="16x16">
    <link rel="stylesheet" href="../../Assets//fontawesome-free-5.14.0-web/css/all.css">
    <link rel="stylesheet" href="../../Assets//bootstrap-4.5.2-dist/css/bootstrap.min.css">
    <link rel="stylesheet" type="text/css" href="../CSS/navbar.css">
    <link rel="stylesheet" href="../CSS/left-sidebar.css">
    <link rel="stylesheet" href="../CSS/admin.css">
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
            <a href="http://localhost/foodpital/Views/HTML/profile.php" class="profile-side">
                <div class="avatar">
                    <img alt="my avatar">
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
            <li>
                <a href="#">
                    <div class="sub-notifi-item">
                        <i class="fas fa-sign-out-alt"></i>
                        <span>Sign out</span>
                    </div>
                </a>
            </li>
        </ul>
        </aside>
    </article>

    <article class="container">
        <aside id="left-management" class="col-xl-3 col-lg-2 col-md-2 d-md-block d-sm-none d-none">
            <nav id="management-nav">
                <div class="admin-info"></div>
                <ul>
                    <a href="#">
                        <li class="m-Title" onclick="currentManagement(1)">
                            <span>Dashboard</span>
                            <i class="fas fa-home"></i>
                        </li>
                    </a>
                    <a href="#">
                        <li class="m-Title" onclick="currentManagement(2)">
                            <span>Account</span>
                            <i class="fas fa-user-circle"></i>
                        </li>
                    </a>
                    <a href="#">
                        <li class="m-Title" onclick="currentManagement(3)">
                            <span>Post</span>
                            <i class="far fa-newspaper"></i>
                        </li>
                    </a>
                    <a href="#">
                        <li class="m-Title" onclick="currentManagement(4)">
                            <span> Topic </span>
                            <i class="fab fa-elementor"></i>
                        </li>
                    </a>
                </ul>
            </nav>
        </aside>
        <aside id="right-management" class="col-xl-9 col-lg-10 col-md-10 col-sm-12">
            <div class="m-Content m-Dashboard m-Style"></div>
            <div class="m-Content m-Account m-Style"></div>
            <div class="m-Content m-Post m-Style"></div>
            <div class="m-Content m-Topic m-Style"></div>
        </aside>
    </article>

    <script src="../JavaScript/jquery-3.5.1.min.js"></script>
	<script src="../../Assets/bootstrap-4.5.2-dist/js/bootstrap.js"></script>
    <script src="../JavaScript/sidebar.js"></script>
    <script src="../JavaScript/topnav.js"></script>
    <script src="../JavaScript/admin.js"></script>
</body>
</html>