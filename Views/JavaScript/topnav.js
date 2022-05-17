$(document).ready(function () {
    var topbar = new topbarjs();
})
class topbarjs {
    constructor(){
		this.initEvent();
		this.generateDataUserProfile();
	}
    initEvent() {
		$(".account .notification-side > li i").on('click',this.showSubNotify);
		$(document).on('click','.sub-notification-container .sub-notification-side > ul > li a#signout',this.signOutRequest);
		$(window).resize(this.windowResize);
	}

	signOutRequest(e){
		e.preventDefault();
		$.ajax({
			url:'http://localhost/foodpital/Views/HTML/signoutResponse.php',
			type: 'POST',
		}).done((data) => {
			window.location.href = "http://localhost/foodpital/Views/HTML/signin.php";
		}).fail((jqXHR, textStatus, errorThrown) => {
			alert("that bai");
			console.log(jqXHR);
			console.log(jqXHR + ': ' +textStatus + ': ' + errorThrown);
		});
	}

	windowResize(){
		if($(window).width() >= 768){
			$('#view-page > aside').removeClass('small-display-cate');
		}
	}
	showSubNotify(e){
		if($('.sub-notification-container .sub-notification-side#'+$(this).attr('typesub')).length){
			if($('.sub-notification-container .sub-notification-side#'+$(this).attr('typesub')).hasClass('d-block')){
				$('.sub-notification-container').addClass('animation-left-to-right').one('webkitAnimationEnd', ()=>{
					$('.sub-notification-container').removeClass('animation-left-to-right').removeClass('d-block');
					$('.sub-notification-container .sub-notification-side').removeClass('d-block');
				});
			}else{
				$('.sub-notification-container .sub-notification-side').removeClass('d-block');
				$('.sub-notification-container .sub-notification-side#'+$(this).attr('typesub')).addClass('d-block')
				$('.sub-notification-container').addClass('d-block').addClass('animation-right-to-left').one('webkitAnimationEnd', ()=>{
					$('.sub-notification-container').removeClass('animation-right-to-left');
				});
                e.preventDefault();
                $.ajax({
                    url:'http://localhost/foodpital/Views/HTML/getSessionResponse.php',
                    type:'GET'
                }).done((data)=>{
                    var dataForward = {
                        id_User: data.sessionUserID
                    }
                    GetCountNotification(dataForward);
                    ShowNotification(dataForward);

                }).fail((jqXHR, textStatus, errorThrown)=>{
                    console.log(textStatus + ': ' + errorThrown);
                })


                function ShowNoti(data){
                    $('.sub-notification-container .sub-notification-side#sub-notification-notifi ul').html("");
                    data.forEach(element => {
                        $('.sub-notification-container .sub-notification-side#sub-notification-notifi ul').append(`
					<li>
						<a href="#">
							<div class="sub-notifi-item">
								<div>
									<div class="avatar">
										<img src=`+element.Avatar_User+` alt="imageNotification">
									</div>
								</div>
								<div class="reply-invite">
									<span>`+element.Name_User+`</span>
									<span>`+element.TypeNotification+`</span>
								</div>
							</div>
						</a>
					</li>`)
                    });
                }

                function ShowNotification(myReq){

                    $.ajax({
                        url: 'http://localhost:3000/notification/getinfor',
                        type: 'POST',
                        dataType: "JSON",
                        data: myReq,
                        async: true,
                        success: function(data){
                        	debugger;
                            ShowNoti(data);
                        },
                        error: function(jqxhr){
                            debugger;
                            console.log("Fail");
                        }
                    });
                }
                function GetCountNotification(myReq){

                    $.ajax({
                        url : 'http://localhost:3000/notification/count',
                        type : 'POST',
                        data: myReq,
                        dataType: 'JSON',
                    }).done(function(data){
                        $('.sub-notification-container .sub-notification-side#sub-notification-notifi .header-sub-notifi .header-sub-number').html(data[0].CountNotification);
                    }).fail(function(jqXHR, textStatus, errorThrown) {
                        // If fail
                        console.log(textStatus + ': ' + errorThrown);
                    });
                }
			}
		}
		else{
			
			if(!$('#view-page #'+$(this).attr('typecate')).hasClass('small-display-cate')){
				$('#view-page > aside').removeClass('small-display-cate');
				$('#view-page #'+$(this).attr('typecate')).addClass('small-display-cate');
			}
			else{
				$('#view-page > aside').removeClass('small-display-cate');
			}
		}
	}
	generateDataUserProfile(){
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
				$('.account .profile-side .avatar > img').attr('src',user.Avatar_User);
				$('.account .profile-side .name-caption h5').html(user.Name_User);
				$('#post-modal .body-post .avatar-post img').attr('src',user.Avatar_User);
				$('#post-modal .body-post .text-post').html(`<span class="text-post" onclick="myPostPopUp()">What's on your mind, `+user.Name_User+`?</span>`);
				
			}).fail(()=>{
				alert("that bai");
			})
		}).fail((jqXHR, textStatus, errorThrown)=>{
			console.log(textStatus + ': ' + errorThrown);
		})
	};

	// generateData(e){
	//     e.preventDefault();
	// 	$.ajax({
	// 		url:'http://localhost/foodpital/Views/HTML/getSessionResponse.php',
	// 		type:'GET'
	// 	}).done((data)=>{
	// 		var dataForward = {
	// 			id_User: data.sessionUserID
	// 		}
	// 		GetCountNotification(dataForward);
	// 		ShowNotification(dataForward);
    //
	// 	}).fail((jqXHR, textStatus, errorThrown)=>{
	// 		console.log(textStatus + ': ' + errorThrown);
	// 	})
    //
    //
	// 	function ShowNoti(data){
	// 			data.forEach(element => {
	// 				$('.sub-notification-container .sub-notification-side#sub-notification-notifi ul').append(`
	// 				<li>
	// 					<a href="#">
	// 						<div class="sub-notifi-item">
	// 							<div>
	// 								<div class="avatar">
	// 									<img src=`+element.Avatar_User+` alt="imageNotification">
	// 								</div>
	// 							</div>
	// 							<div class="reply-invite">
	// 								<span>`+element.Name_User+`</span>
	// 								<span>`+element.TypeNotification+`</span>
	// 							</div>
	// 						</div>
	// 					</a>
	// 				</li>`)
	// 			});
	// 	}
    //
	// 	function ShowNotification(myReq){
    //
	// 			$.ajax({
	// 				url: 'http://localhost:3000/notification/getinfor',
	// 				type: 'POST',
	// 				dataType: "JSON",
	// 				data: myReq,
	// 				async: true,
	// 				success: function(data){
	// 					ShowNoti(data);
	// 				},
	// 				error: function(jqxhr){
	// 					debugger;
	// 					console.log("Fail");
	// 				}
	// 			});
	// 	}
    //     function GetCountNotification(myReq){
    //
    //         $.ajax({
    //             url : 'http://localhost:3000/notification/count',
    //             type : 'POST',
    //             data: myReq,
    //             dataType: 'JSON',
    //         }).done(function(data){
    //             $('.sub-notification-container .sub-notification-side#sub-notification-notifi .header-sub-notifi .header-sub-number').html(data[0].CountNotification);
    //         }).fail(function(jqXHR, textStatus, errorThrown) {
    //             // If fail
    //             console.log(textStatus + ': ' + errorThrown);
    //         });
    //     }
	// }
}
