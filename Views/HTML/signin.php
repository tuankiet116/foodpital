<?php
    session_start();
    require_once("./isSignIn.php");
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="icon" type="image/png" href="../../Assets/Images/logo120.png" alt="Food society icon" sizes="16x16">
    <link rel="stylesheet" href="../../Assets//bootstrap-4.5.2-dist/css/bootstrap.min.css">
    <link rel="stylesheet" href="../../Assets//fontawesome-free-5.14.0-web/css/all.css">
    <link rel="stylesheet" href="../CSS/signin.css">
    <title>Login</title>
</head>
<body>
    <section class="sign-in-page">
        <div class="animation-background container-sm ">
            <div class="circle-small"></div>
            <div class="circle-medium"></div>
            <div class="circle-large"></div>
            <div class="circle-xlarge"></div>
            <div class="circle-xxlarge"></div>
        </div>
        <article class="sign-in-container container-sm">
            <article class="row">
                <aside class="banner-side h-100 col-xl-7 col-lg-6 col-md-6 d-sm-none d-none d-md-block">
                    <div id="sildes-sign-in" class="carousel slide h-100" data-ride="carousel">
                        <ol class="carousel-indicators"></ol>
                        <div class="carousel-inner h-100"></div>
                    </div>
                </aside>
                <aside class="sign-in-side col-xl-5 col-lg-6 col-md-6 col-sm-12">
                    <div class="title-sign-in">
                        <h1>Sign in</h1>
                        <small>Enter your email address and password to access admin panel.</small>
                    </div>
                    <form action="#">
                        <div class="box-form">
                            <input name="username" id="txtUserNameSignIn" type="email" />
                            <span class="effect-login" data-placeholder="Username"></span>
                        </div>
            
                        <div class="box-form">
                            <input name="password" id="txtPassWordSignIn" type="password" />
                            <span class="effect-login" data-placeholder="Password"></span>
                        </div>
                        <div class="box-form d-flex ">
                            <div class="remember-choose">
                                <label for="remember-checkbox" >
                                    <input type="checkbox" checked name="remember-checkbox">
                                    <span></span>
                                    <i class="fas fa-check"></i>Remember Me
                                </label>   
                            </div>
                            <input type="submit" value="Sign in" id="submitSignIn" onclick="return false">
                        </div>
                        <div class="box-form">
                            <a href="#" type="forget-account">Forgotten account?</a>
                        </div>
                        <div class="box-form d-flex pt-4">
                            <div class="sign-up-request">
                                <span>Don't have an account? </span>
                                <a href="#" type="sign-up-request">Sign up</a>
                            </div>
                            <div class="icon-social-link">
                                <i class="fab fa-facebook-f px-1" tabindex="0"></i>
                                <i class="fab fa-instagram px-1" tabindex="0"></i>
                                <i class="fab fa-twitter px-1" tabindex="0"></i>
                            </div>
                        </div>
                    </form>
                </aside>
            </article>
            <article class="sign-up-container container-sm position-absolute bg-white p-0">
                <article class="row">
                    <nav class="position-absolute">
                        <i class="far fa-times-circle"></i>
                    </nav>
                    <aside class="sign-up-side col-6" type="left">   
                        <h1>Sign Up</h1>
                        <small>It's quick and easy.</small>
                        <div class="box-form">
                            <input name="First name" id="txtFirstNameSignUp" type="text" />
                            <span class="effect-login" data-placeholder="First name"></span>
                        </div>
                        <div class="box-form">
                            <input name="Surname" id="txtSurNameSignUp" type="text" />
                            <span class="effect-login" data-placeholder="Surname"></span>
                        </div>
                        <div class="box-form">
                            <input name="username" id="txtUserNameSignUp" type="email" />
                            <span class="effect-login" data-placeholder="Email"></span>
                        </div>
                        <div class="box-form">
                            <input name="password" id="txtPasswordSignUp" type="password" />
                            <span class="effect-login" data-placeholder="Password"></span>
                        </div>
                        <div class="box-form">
                            <small>By clicking Sign Up, you agree to our Terms, Data Policy and Cookie Policy. You may receive SMS notifications from us and can opt out at any time.</small>
                        </div>
                    </aside>
                    <aside class="sign-up-side col-6" type="right">
                        <div class="box-form">
                            <label for="">Date of birth</label>
                            <div class="row select-row">
                                <select class="form-control col-4" id="select-day">
                                    <option value="Day" disabled>Day</option>
                                </select>
                                <select class="form-control col-4" id="select-month">
                                    <option value="Month" disabled>Month</option>
                                </select>
                                <select class="form-control col-4" id="select-year">
                                    <option value="Year" disabled>Year</option>
                                </select>
                            </div>
                        </div>
                        <div class="box-form">
                            <label for="">Gender</label>
                            <div class="row select-row">
                                    <label class="form-check-label col-4 m=0" for="select-male" tabindex="0">Male <input type="radio" class="h-100" name="select-gener" id="select-male" value="0"></label>
                                    <label class="form-check-label col-4 m=0" for="select-female" tabindex="0">Female <input type="radio" class="h-100" name="select-gener" id="select-female" value="1"></label>
                                    <label class="form-check-label col-4 m=0" for="select-custom" tabindex="0">Custom <input type="radio" class="h-100" name="select-gener" id="select-custom" value="2"></label>
                            </div>
                        </div>
                        <div class="box-form">
                            <input class="w-100" type="submit" value="Sign up" id="submitSignUp">
                        </div>
                    </aside>
                </article>  
            </article>            
        </article>
    </section>
    <script src="../JavaScript/jquery-3.5.1.min.js"></script>
    <script src="../../Assets/bootstrap-4.5.2-dist/js/bootstrap.js"></script>
    <script src="../JavaScript/signin.js"></script>
</body>
</html>