$(document).ready(function () {
    var profile = new profilejs();
})
class profilejs {
    constructor(){
        this.generateData();
        this.initEvent();
        this.stateInfor = {};
    }

    generateData(){
        this.checkAdmin();
        $.ajax({
			url:'http://localhost/foodpital/Views/HTML/getSessionResponse.php',
			type:'GET'
		}).done((data)=>{
			var dataForward = {
				id_User: data.sessionUserID
			}
			$.ajax({
				url:'http://localhost:3000/profile/myprofile',
				type:'POST',
				data: dataForward,
				dataType: 'JSON',
			}).done((data)=>{
                var user = data[0];
                $('#view-page #content .card-profile .cover-side #cover-photo').attr('src',user.Avatar_User);
                $('#view-page #content .card-profile .cover-side .avatar-side #avatar-photo').attr('src',user.Avatar_User);
                $('#view-page #content .card-profile .information-side .name-info h4').html(user.Name_User);
			}).fail(()=>{
				alert("that bai");
            })
            $.ajax({
				url:'http://localhost:3000/img/user',
				type:'POST',
				data: dataForward,
				dataType: 'JSON',
			}).done((images)=>{
                images.forEach(element => {
                        $('.tab-panel > .row#feed-tab-panel #feed-right #photo-modal ul').append(`<li class="col-md-4 col-6"><a href="#"><img src="`+element.Name_Image+`" alt="`+element.Name_Image+`" class="img-fluid"></a></li>`)
                    });
			}).fail(()=>{
				alert("that bai");
            })
		}).fail((jqXHR, textStatus, errorThrown)=>{
			console.log(textStatus + ': ' + errorThrown);
		})
	};
    

    initEvent(){
        $('#btnSeeAllPhoto').on('click',this.btnSeeAllPhotoOnClick);
        $(document).on('click','#view-page #content .user-tabing a[href="#photo-tab-panel"]',this.allPhotoRequest);
        $(document).on('click','#view-page #content .user-tabing a[href="#info-tab-panel"]',this.infoRequest.bind(this));
        $(document).on('mouseenter', '#view-page #content .card-profile .cover-side .avatar-side',this.editAvatarHover);
        $(document).on('mouseleave', '#view-page #content .card-profile .cover-side .avatar-side',this.editAvatarUnHover);
        $(document).on('click','.infor-item i',this.editInforOnClick);
        $(document).on('click','.infor-item .col-9 p .btn-info',this.saveInforOnClick);
        $(document).on('click','.infor-item .col-9 p .btn-secondary',this.cancelInforOnClick);
        $(document).on('change', '#view-page #content .card-profile .cover-side .avatar-side #edit-avatar input', this.changeAvatar);
    };
    saveInforOnClick(){

        var userTemp = JSON.parse(localStorage.getItem('tempInfo'));
        if($(this).closest('.infor-item').find('.col-3 h6').text() == 'Full Name'){
            userTemp.Name_User = $(this).closest('.infor-item').find('.col-9 p input').val();
        }
        else if($(this).closest('.infor-item').find('.col-3 h6').text() == 'Birth Of Date'){
            userTemp.BOD_User = $(this).closest('.infor-item').find('.col-9 p input').val();
        }
        else if($(this).closest('.infor-item').find('.col-3 h6').text() == 'Gener'){
            userTemp.Sex_User = $(this).closest('.infor-item').find('.col-9 p input').val();
        }
        else if($(this).closest('.infor-item').find('.col-3 h6').text() == 'Email'){
            userTemp.Email_User = $(this).closest('.infor-item').find('.col-9 p input').val();
        }
        $.ajax({
            url:'http://localhost:3000/profile/myprofile/edit',
            type:'PUT',
            data: userTemp,
            dataType: 'JSON',
        }).done((data)=>{
            alert("Thành công");
        }).fail(()=>{
            alert("haha");
        })
    }
    cancelInforOnClick(){
        var userTemp = JSON.parse(localStorage.getItem('tempInfo'));
        if($(this).closest('.infor-item').find('.col-3 h6').text() == 'Full Name'){
            $(this).closest('.infor-item').find('.col-9 p').html(userTemp.Name_User);
        }
        else if($(this).closest('.infor-item').find('.col-3 h6').text() == 'Birth Of Date'){
            $(this).closest('.infor-item').find('.col-9 p').html(userTemp.BOD_User);
        }
        else if($(this).closest('.infor-item').find('.col-3 h6').text() == 'Gener'){
            $(this).closest('.infor-item').find('.col-9 p').html(userTemp.Sex_User);
        }
        else if($(this).closest('.infor-item').find('.col-3 h6').text() == 'Email'){
            $(this).closest('.infor-item').find('.col-9 p').html(userTemp.Email_User);
        }
    }
    editInforOnClick(){
        $(this).closest('.infor-item').find('.col-9 p').html(`
            <input type="text">
            <button type="button" class="btn btn-info">Save</button>
            <button type="button" class="btn btn-secondary">Cancel</button>
        `);
        var userTemp = JSON.parse(localStorage.getItem('tempInfo'))
        if($(this).closest('.infor-item').find('.col-3 h6').text() == 'Full Name'){
            $(this).closest('.infor-item').find('.col-9 p input').val(userTemp.Name_User);
        }
        else if($(this).closest('.infor-item').find('.col-3 h6').text() == 'Birth Of Date'){
            var getFormattedDate = (date) => {
                let year = date.getFullYear();
                let month = (1 + date.getMonth()).toString().padStart(2, '0');
                let day = date.getDate().toString().padStart(2, '0');
              
                return day + '/' + month + '/' + year;
            }
            $(this).closest('.infor-item').find('.col-9 p input').val(getFormattedDate(new Date (userTemp.BOD_User)));
        }
        else if($(this).closest('.infor-item').find('.col-3 h6').text() == 'Gener'){
            $(this).closest('.infor-item').find('.col-9 p input').val(userTemp.Sex_User);
        }
        else if($(this).closest('.infor-item').find('.col-3 h6').text() == 'Email'){
            $(this).closest('.infor-item').find('.col-9 p input').val(userTemp.Email_User);
        }
        console.log(userTemp);
    }
    editAvatarHover(){
        $('#view-page #content .card-profile .cover-side .avatar-side #edit-avatar').show();
    }
    editAvatarUnHover(){
        $('#view-page #content .card-profile .cover-side .avatar-side #edit-avatar').hide();
    }
    btnSeeAllPhotoOnClick(){
        $('#view-page #content .user-tabing a[href="#photo-tab-panel"]').trigger('click');
    }
    allPhotoRequest(){
        if($('#view-page #content .user-tabing a[href="#photo-tab-panel"]').attr('dataGet') == 'notGet'){
            $.ajax({
                url:'http://localhost/foodpital/Views/HTML/getSessionResponse.php',
                type:'GET'
            }).done((data)=>{
                var dataForward = {
                    id_User: data.sessionUserID
                }
                $.ajax({
                    url:'http://localhost:3000/img/user/all',
                    type:'POST',
                    data: dataForward,
                    dataType: 'JSON',
                }).done((images)=>{
                    images.forEach(element => {
                        $('.tab-panel > .row#photo-tab-panel .photo-list-tab #photosofyou .row').append(
                            `<div class="col-md-6 col-lg-3 mb-3">
                                 <div class="user-images position-relative overflow-hidden">
                                     <a href="#">
                                     <img src="`+element.Name_Image+`" class="img-fluid rounded" alt="`+element.Name_Image+`">
                                     </a>
                                 </div>
                             </div>`
                        )
                        });
                        $('#view-page #content .user-tabing a[href="#photo-tab-panel"]').attr('dataGet','Get')
                }).fail(()=>{
                    alert("that bai");
                })
            }).fail((jqXHR, textStatus, errorThrown)=>{
                console.log(textStatus + ': ' + errorThrown);
            })
        }
    }
    infoRequest(){
        if($('#view-page #content .user-tabing a[href="#info-tab-panel"]').attr('dataGet') == 'notGet'){
            $.ajax({
                url:'http://localhost/foodpital/Views/HTML/getSessionResponse.php',
                type:'GET'
            }).done((data)=>{
                var dataForward = {
                    id_User: data.sessionUserID
                }
                $.ajax({
                    url:'http://localhost:3000/profile/myprofile',
                    type:'POST',
                    data: dataForward,
                    dataType: 'JSON',
                }).done((data)=>{
                    var user = data[0];
                    localStorage.setItem('tempInfo',JSON.stringify(user));
                    for (const key in user) {
                        if (user.hasOwnProperty(key)) {
                            const element = user[key];
                            if(key == "Name_User"){
                                $('.row.tab-pane#basicinfo').append(
                                    `<div class = "infor-item">
                                        <div class="col-3">
                                            <h6>Full Name</h6>
                                        </div>
                                        <div class="col-9">
                                            <p class="mb-0">`+element+`</p>
                                        </div>
                                        <i class="fas fa-edit"></i>
                                        <hr/>
                                    </div>`
                                );
                            }
                            if(key == "BOD_User"){
                                var getFormattedDate = (date) => {
                                    let year = date.getFullYear();
                                    let month = (1 + date.getMonth()).toString().padStart(2, '0');
                                    let day = date.getDate().toString().padStart(2, '0');
                                  
                                    return day + '/' + month + '/' + year;
                                }
                                $('.row.tab-pane#basicinfo').append(
                                    `<div class = "infor-item">
                                        <div class="col-3">
                                            <h6>Birth Of Date</h6>
                                        </div>
                                        <div class="col-9">
                                            <p class="mb-0">`+getFormattedDate(new Date(element))+`</p>
                                        </div>
                                        <i class="fas fa-edit"></i>
                                        <hr/>
                                    </div>`
                                );
                            }
                            if(key == "Sex_User"){
                                if(element == 0) {
                                    $('.row.tab-pane#basicinfo').append(
                                        `<div class = "infor-item">
                                            <div class="col-3">
                                                <h6>Gener</h6>
                                            </div>
                                            <div class="col-9">
                                                <p class="mb-0">Male</p>
                                            </div>
                                            <i class="fas fa-edit"></i>
                                            <hr/>
                                        </div>`
                                    );
                                } else{
                                    $('.row.tab-pane#basicinfo').append(
                                        `<div class = "infor-item">
                                            <div class="col-3">
                                                <h6>Gener</h6>
                                            </div>
                                            <div class="col-9">
                                                <p class="mb-0">Female</p>
                                            </div>
                                            <i class="fas fa-edit"></i>
                                            <hr/>
                                        </div>`
                                    );
                                }
                            }
                            if(key == "Email_User"){
                                $('.row.tab-pane#contactinfo').append(
                                    `<div class = "infor-item">
                                        <div class="col-3">
                                            <h6>Email</h6>
                                        </div>
                                        <div class="col-9">
                                            <p class="mb-0">`+element+`</p>
                                        </div>
                                        <i class="fas fa-edit"></i>
                                        <hr/>
                                    </div>`
                                );
                            }
                        }
                    }
                    $('#view-page #content .user-tabing a[href="#info-tab-panel"]').attr('dataGet','Get');
                }).fail(()=>{
                    alert("that bai");
                })
            }).fail((jqXHR, textStatus, errorThrown)=>{
                console.log(textStatus + ': ' + errorThrown);
            })
        }
    }
    changeAvatar(evt){
        evt.preventDefault();
        evt.stopPropagation();
        var files = evt.target.files;
        var file = files[0];
        var fileReader = new FileReader();
        fileReader.onload = function(progressEvent) {
            var url = fileReader.result;
            debugger;
            $('#view-page #content .card-profile .cover-side .avatar-side #avatar-photo').attr('src',url);
        }
        fileReader.readAsDataURL(file);


        var file_data = $("#view-page #content .card-profile .cover-side .avatar-side #edit-avatar input").prop("files")[0]; // Getting the properties of file from file field
        var form_data = new FormData(); // Creating object of FormData class
        form_data.append("file", file_data) // Appending parameter named file with properties of file_field to form_data
        $.ajax({
            url: "http://localhost/foodpital/Views/HTML/ImageAvatar.php", // Upload Script
            dataType: 'script',
            cache: false,
            contentType: false,
            processData: false,
            data: form_data, // Setting the data attribute of ajax with file_data
            type: 'POST',
            success: function(data) {
                debugger;
                var str = data.replace(/\"/g, "");
                updateImage(getUserID(), str);
                debugger;
            },
            error: function () {
                debugger;
            }
        });

        function updateImage(userID, src){
            var requestDataImage = {
              id_User: userID,
              Avatar_User: src
            };
            debugger;
            $.ajax({
                url: 'http://localhost:3000/profile/myavatar/edit',
                type: 'PUT',
                dataType: 'JSON',
                data: requestDataImage,
                async: false,
                success: function(data){
                    debugger;
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    alert("Loi con me no roi");
                    console.log(textStatus + ": " + errorThrown);
                }
            });
        }

        function  getUserID(){
            var userID = {};
            $.ajax({
                url:'http://localhost/foodpital/Views/HTML/getSessionResponse.php',
                type:'GET',
                dataType: 'JSON',
                async: false,
                success: function(data){
                    userID = data.sessionUserID;
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    console.log(textStatus + ": " + errorThrown);
                }
            });
            return userID;
        }
    }

    checkAdmin(){
        var reqData = {
            id_User: getUserID(),
        }

        $.ajax({
            url: 'http://localhost:3000/user/permission',
            type: 'POST',
            dataType: 'JSON',
            data: reqData,
            success: function(data){
                if(data[0].id_Permission == '2')  
                {
                    $("#sub-setting ul li.admin-btn").append(`
                        <a href="http://localhost/foodpital/Views/HTML/admin.php">
                            <div class="sub-notifi-item">
                                <i class="fas fa-user-cog"></i> 
                                <span>Admin</span>
                            </div>
                        </a>
                    `);
                }
            }
        });

        function getUserID() {
            var userID = {};
            $.ajax({
                url: 'http://localhost/foodpital/Views/HTML/getSessionResponse.php',
                type: 'GET',
                dataType: 'JSON',
                async: false,
                success: function (data) {
                    userID = data.sessionUserID;
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    console.log(textStatus + ": " + errorThrown);
                }
            });
            return userID;
        }
    }
}

// function changeAvatar(evt){
//     evt.preventDefault();
//     evt.stopPropagation();
//     var files = evt.target.files;
//     var file = files[0];
//     var fileReader = new FileReader();
//     fileReader.onload = function(progressEvent) {
//     var url = fileReader.result;
//     debugger;
//     $('#view-page #content .card-profile .cover-side .avatar-side #avatar-photo').attr('src',url);
//     }
//     fileReader.readAsDataURL(file);
// }
