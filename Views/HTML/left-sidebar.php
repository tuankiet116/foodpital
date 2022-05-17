<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Demo left sidebar</title>
    <link rel="stylesheet" href="../../Assets//fontawesome-free-5.14.0-web/css/all.css">
    <link rel="stylesheet" href="../../Assets//bootstrap-4.5.2-dist/css/bootstrap.min.css">
    <link rel="stylesheet" href="../CSS/left-sidebar.css">
</head>
<body>
    <article class="row" id="view-page">
        <aside id="left-sidebar" class="col-xl-2">
            <nav id="categories-nav">
                <ul></ul>
            </nav>
        </aside>
        <aside id="content" class="col-xl-8">
            <div class="row h-100 justify-content-center">
                    <aside id="feed-left" class="col-lg-6">
                        <div id="post-modal">
                            <h4>Create Post</h4>
                            <div class="body-post">
                                <div class="avatar-post">
                                    <img src="../../Assets/Images/logobanhmi.jpg" alt="">
                                </div>
                                <div class="text-post">
                                    <span class="text-post">What's on your mind, Chau?</span>
                                </div>
                            </div>
                        </div>
                    </aside>
                    <aside id="feed-rigth" class="col-lg-3">

                    </aside>
            </div>
        </aside>
        <aside id="right-sidebar" class="col-xl-2">
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
    <script src="../JavaScript/sidebar.js"></script>
</body>
</html>