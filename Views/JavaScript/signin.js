$(document).ready(function () {
    var login = new loginjs();
})

class loginjs {
    constructor() {
        this.monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        this.timeNow = new Date();
        this.initEvent();
        this.validInputSignIn();
        this.validInputSignUp();
        this.generateData();
    }

    initEvent() {
        $('.box-form input').on('focus', this.inputBoxFormOnFocus);
        $('.box-form input').on('blur', this.inputBoxFormOnBlur);
        $('.sign-in-side .remember-choose input').on('click',this.inputChooseOnClick);
        $('.sign-in-container .row .sign-in-side .box-form .sign-up-request a[type="sign-up-request"]').on('click',this.signuprequestOnClick);
        $('.sign-up-container .row nav').on('click',this.closeSignUpOnClick);
        $('.sign-in-container > .row #txtUserNameSignIn').keyup(this.validInputSignIn);
        $('.sign-in-container > .row #txtPassWordSignIn').keyup(this.validInputSignIn);
        $('.sign-up-container .sign-up-side[type="right"] #select-month').on('change',this.monthOptionChange.bind(this));
        $('.sign-up-container .sign-up-side[type="right"] #select-year').on('change',this.yearOptionChange.bind(this));
        $('.sign-up-container .sign-up-side[type="left"] .box-form #txtFirstNameSignUp').keyup(this.validInputSignUp);
        $('.sign-up-container .sign-up-side[type="left"] .box-form #txtSurNameSignInUp').keyup(this.validInputSignUp);
        $('.sign-up-container .sign-up-side[type="left"] .box-form #txtUserNameSignUp').keyup(this.validInputSignUp);
        $('.sign-up-container .sign-up-side[type="left"] .box-form #txtPasswordSignUp').keyup(this.validInputSignUp);
        $('.sign-up-container .sign-up-side[type="right"] .box-form input[name="select-gener"]').on('change',this.validInputSignUp);
        $('.sign-up-container .sign-up-side[type="right"] .box-form #submitSignUp').on('click', this.submitSignUp);
        $('.sign-in-container .sign-in-side .box-form #submitSignIn').on('click', this.submitSignIn);
    }
    submitSignIn(e) {
        var signInDaTaRequest = {
            "UserAccount" : $('.sign-in-container .sign-in-side .box-form #txtUserNameSignIn').val(),
            "UserPassword" : $('.sign-in-container .sign-in-side .box-form #txtPassWordSignIn').val()
        }
        debugger;
        $.ajax({
            url : 'http://localhost:3000/user/login',
            type : 'POST',
            data: signInDaTaRequest,
            dataType: 'json',
        }).done((data) => {
            debugger;
            $.ajax({
                url : 'http://localhost/foodpital/Views/HTML/signinResponse.php',
                type : 'POST',
                data: JSON.stringify(data),
                dataType: 'json',
            }).done((data) => {
                window.location.href = "http://localhost/foodpital/Views/HTML/newsfeed.php";
            }).fail((jqXHR, textStatus, errorThrown) => {
                alert("that bai");
                console.log(jqXHR);
                console.log(jqXHR + ': ' +textStatus + ': ' + errorThrown);
            });
            
        }).fail(function(jqXHR, textStatus, errorThrown) {
            alert('sai mat khau');
        });
    }
    submitSignUp(e) {
        var signupDataRequest = {
            signData : {
                User_Sign : $('.sign-up-container .sign-up-side[type="left"] .box-form #txtUserNameSignUp').val(),
                User_Password : $('.sign-up-container .sign-up-side[type="left"] .box-form #txtPasswordSignUp').val(),
                id_Permission : 1
            },
            profileData : {
                Name_User : $('.sign-up-container .sign-up-side[type="left"] .box-form #txtFirstNameSignUp').val() + ' ' +$('.sign-up-container .sign-up-side[type="left"] .box-form #txtSurNameSignUp').val() ,
                BOD_User : ''+$('.sign-up-container .sign-up-side[type="right"] #select-year').val()+'/'+(parseInt($('.sign-up-container .sign-up-side[type="right"] #select-month').val())+1)+'/' + $('.sign-up-container .sign-up-side[type="right"] #select-day').val() ,
                Sex_User: $('.sign-up-container .sign-up-side[type="right"] .box-form input[name="select-gener"]:checked').val(),
                Avatar_User: 'http://localhost/foodpital/Assets/AvatarUser/con-cho.jpg',
                Email_User : $('.sign-up-container .sign-up-side[type="left"] .box-form #txtPasswordSignUp').val()
            }
        }
        $.ajax({
            url : 'http://localhost:3000/user/signup',
            type : 'POST',
            data: signupDataRequest.signData,
            dataType: 'json',
        }).done((data) => {
            $.ajax({
                url : 'http://localhost:3000/profile/create',
                type : 'POST',
                data: {id_User:data.id,...signupDataRequest.profileData},
                dataType: 'json',
            }).done((data) => {
                console.log(data);
                $.ajax({
                    url : 'http://localhost/foodpital/Views/HTML/signinResponse.php',
                    type : 'POST',
                    data: JSON.stringify(data),
                    dataType: 'json',
                }).done((data) => {
                    window.location.href = "http://localhost/foodpital/Views/HTML/newsfeed.php";
                }).fail((jqXHR, textStatus, errorThrown) => {
                    alert("that bai");
                    console.log(jqXHR);
                    console.log(jqXHR + ': ' +textStatus + ': ' + errorThrown);
                });
            }).fail((jqXHR,textStatus,errorThrown) => { 
                $.ajax({
                    url : 'http://localhost:3000/user/account/del',
                    type : 'DELETE',
                    data: {id_User:data.id,...signupDataRequest.signData.User_Password},
                    dataType: 'json',
                }).done((data)=>{
                    if(data.affectedRows != 0){
                        alert('Xoa thanh cong');
                    }
                }).fail((jqXHR,textStatus,errorThrown) => {
                    alert("Tao profile that bai");
                })
            })
        }).fail(function(jqXHR, textStatus, errorThrown) {
            alert("Tai khoan da ton tai");
        });
        
    }
    yearOptionChange() {
        $('.sign-up-container .sign-up-side[type="right"] #select-day option').removeAttr("hidden");
        var yearChange = $('.sign-up-container .sign-up-side[type="right"] #select-year').val();
        if(yearChange %4 != 0) {
            $('.sign-up-container .sign-up-side[type="right"] #select-day option[value="29"]').attr("hidden","hidden");
            if($('.sign-up-container .sign-up-side[type="right"] #select-day').val()==29){
                $('.sign-up-container .sign-up-side[type="right"] #select-day').val(this.timeNow.getDate());
            }
        }
    }
    monthOptionChange() {
        $('.sign-up-container .sign-up-side[type="right"] #select-day option').removeAttr("hidden");
        var monthChange = $('.sign-up-container .sign-up-side[type="right"] #select-month').val();
        if(monthChange==1){
            if($('.sign-up-container .sign-up-side[type="right"] #select-year').val() % 4 != 0) {
                $('.sign-up-container .sign-up-side[type="right"] #select-day option[value="29"]').attr("hidden","hidden");
                if($('.sign-up-container .sign-up-side[type="right"] #select-day').val()==29){
                    $('.sign-up-container .sign-up-side[type="right"] #select-day').val(this.timeNow.getDate());
                }
            }
            $('.sign-up-container .sign-up-side[type="right"] #select-day option[value="30"]').attr("hidden","hidden");
            $('.sign-up-container .sign-up-side[type="right"] #select-day option[value="31"]').attr("hidden","hidden");
            if($('.sign-up-container .sign-up-side[type="right"] #select-day').val()==30 || $('.sign-up-container .sign-up-side[type="right"] #select-day').val()==31){
                $('.sign-up-container .sign-up-side[type="right"] #select-day').val(this.timeNow.getDate());
            }
        }
        else if(monthChange == 3 || monthChange == 4 || monthChange == 8 || monthChange == 10) {
            $('.sign-up-container .sign-up-side[type="right"] #select-day option[value="31"]').attr("hidden","hidden");
        }
    }
    closeSignUpOnClick(){
        $('.sign-up-container').addClass('slide-left-reverse').one('webkitAnimationEnd',function(){
            $('.sign-up-container').removeClass('slide-left-reverse').removeClass('d-block');
        });
        $('.sign-in-container > .row').removeClass('d-none').addClass('slide-over-left-reverse').one('webkitAnimationEnd',function(){
            $('.sign-in-container > .row').removeClass('slide-over-left-reverse');
        });
    }
    signuprequestOnClick(){
        $('.sign-in-container > .row').addClass('slide-over-left').one('webkitAnimationEnd',function(){
            $('.sign-in-container > .row').removeClass('slide-over-left').addClass('d-none');
        });
        $('.sign-up-container').addClass('d-block').addClass('slide-left').one('webkitAnimationEnd',function(){
            $('.sign-up-container').removeClass('slide-left');
        });
    }
    inputBoxFormOnFocus() {
        $(this).addClass('focus');
    }
    inputBoxFormOnBlur() {
        if (!$(this).val()) {
            $(this).removeClass('focus');
        }
    }
    inputChooseOnClick(e) {
        if($('.remember-choose input').prop('checked') == true){
            
            $('.remember-choose > label > .fas.fa-check').addClass('d-block').addClass('animation-show-check').one('webkitAnimationEnd',function(){
                $('.remember-choose > label > .fas.fa-check').removeClass('animation-show-check').removeClass('d-none');
            })
        }
        else if($('.remember-choose input').prop('checked') == false){
            $('.remember-choose > label > .fas.fa-check').addClass('animation-hide-check').one('webkitAnimationEnd',function(){
                $('.remember-choose > label > .fas.fa-check').removeClass('animation-hide-check').removeClass('d-block').addClass('d-none');
            })
        }
    }
    validInputSignIn(){
        if(!$('.sign-in-container > .row #txtUserNameSignIn').val() || !$('.sign-in-container > .row #txtPassWordSignIn').val()){
            $('.sign-in-container > .row #submitSignIn').addClass('noHover');
            return false;
        }
        else{
            $('.sign-in-container > .row #submitSignIn').removeClass('noHover');
            return true;
        }
    }
    validInputSignUp(){
        if(!$('.sign-up-container .sign-up-side[type="left"] .box-form #txtFirstNameSignUp').val() || !$('.sign-up-container .sign-up-side[type="left"] .box-form #txtSurNameSignUp').val() || !$('.sign-up-container .sign-up-side[type="left"] .box-form #txtPasswordSignUp').val() || !$('.sign-up-container .sign-up-side[type="left"] .box-form #txtUserNameSignUp').val() || !$('.sign-up-container .sign-up-side[type="right"] .box-form input[name="select-gener"]:checked').val()){
            $('.sign-up-container .sign-up-side[type="right"] .box-form #submitSignUp').addClass('noHover');
            return false;
        }
        else{
            $('.sign-up-container .sign-up-side[type="right"] .box-form #submitSignUp').removeClass('noHover');
            return true;
        }
    }
    renderSlide(dataSlide){
        dataSlide.forEach(element => {
            $('.sign-in-container .banner-side #sildes-sign-in .carousel-indicators').append(`<li data-target="#sildes-sign-in" data-slide-to="`+dataSlide.indexOf(element)+`"></li>`)
            $('.sign-in-container .banner-side #sildes-sign-in .carousel-inner').append(`<div class="carousel-item h-100">
            <img class="d-block h-100" src="`+element.sourceImage+`" alt="`+element.alt+`">
          </div>`);
        });
        $('.sign-in-container .banner-side #sildes-sign-in .carousel-indicators li').eq(0).addClass('active');
        $('.sign-in-container .banner-side #sildes-sign-in .carousel-inner .carousel-item').eq(0).addClass('active');

    };
    generateData(){
        var that = this ;
        //datetime
        for (let index = 1; index <= 31; index++) {
            $('.sign-up-container .sign-up-side[type="right"] #select-day').append("<option value='"+index+"'>"+index+"</option>");
        }
        for (let index = 0; index < 12; index++) {
            $('.sign-up-container .sign-up-side[type="right"] #select-month').append("<option value='"+index+"'>"+this.monthNames[index]+"</option>");
        }
        for (let index = 1905; index <= 2020; index++) {
            $('.sign-up-container .sign-up-side[type="right"] #select-year').append("<option value='"+index+"'>"+index+"</option>");
        }
        $('.sign-up-container .sign-up-side[type="right"] #select-day').val(this.timeNow.getDate());
        $('.sign-up-container .sign-up-side[type="right"] #select-month').val(this.timeNow.getMonth());
        $('.sign-up-container .sign-up-side[type="right"] #select-year').val(this.timeNow.getFullYear());


        //slidebanner

        $.ajax({
            url : 'https://raw.githubusercontent.com/vuminhchautroutrous/demo/master/db.json',
            type : 'GET',
            data: '',
            dataType: 'JSON',
        }).done(function(data){
            that.renderSlide(data.dataSlide);
        }).fail(function(jqXHR, textStatus, errorThrown) {
            // If fail
            console.log(textStatus + ': ' + errorThrown);
        });
    }

}

