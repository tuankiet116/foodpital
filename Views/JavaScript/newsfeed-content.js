$(document).ready(function(){
    var content = new container();
})

class container {
	constructor(){
        this.postArray = [];
        this.startPost = 0 ;
        this.limitPost = 2 ;
        this.loadingFlag = false;
		this.storiesdata = [
		    {name: "Minh Chau", avatar: "../../Assets/Images/banner01.png", status: "read", desc: "1 hour ago"},
		    {name: "Tuan Kiet", avatar: "../../Assets/Images/Sierra.jpg", status: "read", desc: "4 hour ago"},
		    {name: "Phi Long", avatar: "../../Assets/Images/logobanhmi.jpg", status: "read", desc: "9 hour ago"},
		];
        this.suggestedData = [
            {name: "Foody", avatar: "../../Assets/Images/logo-foody.png", images: "../../Assets/Images/foody.jpg", icon: "far fa-thumbs-up", desc:"4.5 / 5 sao"},
            {name: "Now", avatar: "../../Assets/Images/logo-now2.png", images: "../../Assets/Images/now.jpg", icon: "far fa-thumbs-up", desc: "4 / 5 sao"},
        ];
        this.newsData = [
            {name: "Doan Phi Long", avatar: "../../Assets/Images/Sierra.jpg", images: "../../Assets/Images/Sierra.jpg", status: "avatar-online", desc: "Just Now", 
            caption: "Hôm nay là Tuesday, mai là Wednesday, bao giờ thì em mới đổ anh đây", cmt: "500 Comments", icon1: "fas fa-comments", icon2: "far fa-thumbs-up", 
            icon3: "far fa-comment-alt", icon4: "far fa-share-square", icon5: "fas fa-paper-plane", icon6: "fa fa-circle", icon7: "fas fa-user-times", time: "Just Now",
            icon8: "fas fa-minus-circle", icon9: "fas fa-bullhorn"},
        ];
        // this.postPopup = [
        //     {avatar: "../../Assets/Images/Sierra.jpg", image1: "../../Assets/Images/AddImageLogo.png", image2: "../../Assets/Images/AddFriendLogo2.png", image3: "../../Assets/Images/SmileLogo.png",
        //     image4: "../../Assets/Images/CheckInLogo2.png"},
        // ];
        this.genderData();
        this.initEvent();
    }
    genderData(){
        this.genderPost(this.startPost,this.limitPost);
        this.chooseTopic();
        this.checkAdmin();
    	this.storiesdata.forEach(item => {
    		$('#stories-modal #stories-online-friend ul').append(`<a href="#">
    			<li>
    			    <div class="friend-avatar"> 
    			        <img src="`+item.avatar+`" class="status `+item.status+`" alt=""> 		        
    			    </div>
    			    <div class="friend-name">
                        <h6>`+item.name+`</h6>
                        <p>`+item.desc+`</p>
    			    </div>
    		    </li>
    		</a>`)
    	})

    	this.suggestedData.forEach(item => {
    		$('#suggested-modal #pages-container ul').append(`<a href="#">
	    		<li>	
	    			<div class="page-avatar">
	                    <img src="`+item.avatar+`">
	    			</div>
	    			<div class="page-name">
                        <h6>`+item.name+`</h6>
                        <p>`+item.desc+`</p>
	    		    </div>
		    	</li>
		    	<li>
		    	    <div class="page-image">
	                    <img src="`+item.images+`">
	                </div>
		    	</li>
		    	<div>
	    	        <button class="like-btn" type="text">
	    	            <i class="`+item.icon+`"></i>
	    	            Like Page 
	    	        </button>
		        <div>
            </a>`)
    	});

        this.PostPopup();
    }


    initEvent(){
        $(document).on('mouseenter', '.news-modal .news-like-comment div#vote-request i',this.voteHover);
        $(document).on('mouseleave', '.news-modal .news-like-comment div#vote-request i',this.voteUnHover);
        $(document).on('mouseenter', '.news-modal .news-like-comment div#vote-request span',this.voteHover);
        $(document).on('mouseleave', '.news-modal .news-like-comment div#vote-request span',this.voteUnHover);
        $(document).on('click','.news-modal .news-like-comment div#vote-request i',this.voteStarClick);
        $(document).on('click','.news-modal .news-like-comment div#vote-request span',this.voteSpanClick);
        $(document).on('click','.post-comments .text-comment-side .comment-data-block a[typeaction="reply"]',this.replyOnClick);
        $(document).on('click','.news-modal .news-comment-bar button i', this.replyRequest);
        $(document).on('click','.news-modal .news-edit button',this.myNewsEdit);
        $(document).on('click','#post-popup #post-popup-content #post-popup-main #post-popup-profile #post-popup-middle form button.btn-post', this.submitPost);
        $(document).on('click','.news-modal ul.post-comments a[typeaction="edit"]',this.editCommentOnClick);
        $(document).on('click','.news-modal ul.post-comments li .contentcomment .btn-secondary',this.cancelEditCommentOnClick);
        $(document).on('click','.news-modal ul.post-comments li .contentcomment .btn-info',this.saveEditCommentOnClick);
        $(document).on('click','.news-modal ul.post-comments li .contentcomment .btn-danger',this.deleteEditCommentOnClick);
        $(document).on('click','.news-modal .news-edit-container ul li button#btn-delete', this.DeletePostOnClick);
        $(document).on('click', '#view-page #content .row #feed-left .news-modal .news-edit-container ul li button#btn-edit', this.editPost);
        $(document).on('click','#upload-popup #upload-popup-content #upload-popup-close button',this.hideUploadPopUp);
        $(document).on('click','#upload-popup #upload-popup-container', this.outsideUploadPopUp);
        $(document).on('click','#upload-popup #upload-popup-content #upload-popup-main #upload-popup-profile #upload-popup-middle form button.btn-post', this.editConfirm);
        $(document).on('click','#view-page #content .row #feed-left .news-modal .news-image img ', this.nextPage);
        $(window).scroll(this.windowScroll.bind(this));
    }
    nextPage(){
	    var idThisPost = $(this).closest('.news-modal').attr('idPost');
	    localStorage.setItem("idThisPost", idThisPost);
	    location.href = "http://localhost/foodpital/Views/HTML/post.php";
    }
    editConfirm(){
        debugger;
        localStorage.setItem('before_href',location.href);
	    var idPost = localStorage.getItem("idPost");

        localStorage.setItem("EditOrNot", "yes");

        var requestData = {
            id_User: getUserID(),
            id_Post: idPost
        };
        $.ajax({
                url: 'http://localhost:3000/post/getpostbyidpost',
                type: 'POST',
                dataType: 'JSON',
                data: requestData,
                async: false,
                success: function(data){
                    debugger;
                    var idTopic = $('#upload-popup #upload-popup-content #upload-popup-main .topic select').find(":selected").attr('idTopic');
                    debugger;
                    InsertContent(data[0].id_Post);
                    debugger;
                    EditPost(idTopic,idPost );
                    localStorage.setItem("id_MyPost", idPost);
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    console.log(textStatus + ": " + errorThrown);
                }
            });

        function EditPost(id_Topic, id_Post){
            var requestData = {
                id_Post: id_Post,
                id_Topic: id_Topic
            };
            debugger;
            $.ajax({
                url: 'http://localhost:3000/post/edit',
                type: 'PUT',
                dataType: 'JSON',
                data: requestData,
                async: false,
                success: function(data){
                    debugger;
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    console.log(textStatus + ": " + errorThrown);
                }
            });
        }

        function InsertContent(id_Post){
            var requestDataContent = {
                Title_Content: " ",
                Text_Content: $('#upload-popup #upload-popup-content #upload-popup-main #upload-popup-profile #upload-popup-head #upload-popup-input textarea[type=text]').val(),
                id_Post: id_Post
            };
            debugger;
            $.ajax({
                url: 'http://localhost:3000/content/create',
                type: 'POST',
                dataType: 'JSON',
                data: requestDataContent,
                async: false,
                success: function(data){
                    debugger;
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    console.log(textStatus + ": " + errorThrown);
                }
            });
        }

        function getUserID(){
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

    PostPopup(){
	    var reqData = {
	        id_User: getUserID()
        }
        $.ajax({
            url: 'http://localhost:3000/profile/myprofile',
            type: 'POST',
            dataType: 'JSON',
            data: reqData,
            async: false,
            success: function(data){
                data.forEach(item => {
                    $('#post-popup-profile').append(`
                <div id="post-popup-head">
                    <div id="post-popup-avatar">
                        <img src="`+item.Avatar_User+`">
                    </div>
                    <div id="post-popup-input">
                        <textarea type="text" placeholder="Write something here..."></textarea>
                    </div>
                    <div id="post-image-file">

                    </div>
                </div>
                <div id="post-popup-middle">
                    <form method="post" action="image-process.php"  enctype="multipart/form-data">
                        <button type="button">
                            <img src="../../Assets/Images/AddImageLogo.png">
                            <p>Photo/Video</p>
                            <input type="file" onchange="changeImage(event)" name="images">
                        </button>
                        <button class="btn-post" type="submit" name="s1"> Post </button>
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
                
            </div>`)
                })
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(textStatus + ": " + errorThrown);
            }
        });

        function  getUserID() {
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

    DeletePostOnClick(){
	    var reqData = {
	        id_Post: $(this).closest('.news-modal').attr('idPost'),
            id_User: getUserID()    
        }
        debugger;
        var that = this
        $.ajax({
            url: 'http://localhost:3000/post/del',
            type: 'DELETE',
            dataType: 'JSON',
            data: reqData,
            async: false,
            success: function(data){
                debugger;
                $(that).closest('.news-modal[idPost = "'+ $(that).closest('.news-modal').attr('idPost') +'"]').remove();
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(textStatus + ": " + errorThrown);
            }
        });

        function  getUserID() {
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
    windowScroll(){
        var that = this ;
        $(window).scroll(function(){
            if (!that.loadingFlag && ($(document).height() - $(window).height())-$(window).scrollTop()<=400 && location.href != 'http://localhost/foodpital/Views/HTML/post.php'){
                that.startPost += 2;
                that.genderPost(that.startPost,that.limitPost);
            }
        });
        // $(document).on('change','#post-popup #post-popup-content #post-popup-main .topic select',this.chooseTopic);
        //$(document).on('click','#post-popup-profile #post-popup-bottom #post-button', this.submitPost);
    }
    deleteEditCommentOnClick(e){
        e.preventDefault();
        $.ajax({
			url:'http://localhost/foodpital/Views/HTML/getSessionResponse.php',
			type:'GET'
		}).done((user)=>{
            $.ajax({
				url:'http://localhost:3000/comment/del',
				type:'DELETE',
				data: {
                    "id_User": user.sessionUserID,
                    "id_Comment": $(this).closest('li').attr('idcomment')
                },
				dataType: 'JSON',
			}).done((data)=>{
                ($(this).closest('li[idcomment='+$(this).closest('li').attr('idcomment')+']')).remove();
            }).fail(()=>{
                alert("that bai");
            })
        
        }).fail(()=>{
            alert("that bai");
        })
    }
    saveEditCommentOnClick(e){
        e.preventDefault();
        $.ajax({
			url:'http://localhost/foodpital/Views/HTML/getSessionResponse.php',
			type:'GET'
		}).done((user)=>{
            $.ajax({
				url:'http://localhost:3000/comment/edit',
				type:'PUT',
				data: {
                    "id_User": user.sessionUserID,
                    "id_Comment": $(this).closest('li').attr('idcomment'),
                    "Content_Comment": ($(this).closest('p.contentcomment')).find(' input').val()
                },
				dataType: 'JSON',
			}).done((user)=>{
                $(this).closest('p.contentcomment').html(($(this).closest('p.contentcomment')).find('input').val());
            }).fail(()=>{
                alert("that bai");
            })
        
        }).fail(()=>{
            alert("that bai");
        })
    }

    cancelEditCommentOnClick(e){
        e.preventDefault();
        $(this).closest('p.contentcomment').html(localStorage.getItem('tempContentComment'));
    }

    editCommentOnClick(e){
        e.preventDefault();
        if(!$(document).find('p.contentcomment input').length){
            window.localStorage.setItem('tempContentComment', ($(this).closest('.comment-data-block')).find('p.contentcomment').text());
            ($(this).closest('.comment-data-block')).find('p.contentcomment').html(`
                <input type="text">
                <button type="button" class="btn btn-info">Save</button>
                <button type="button" class="btn btn-danger">Delete</button>
                <button type="button" class="btn btn-secondary">Cancel</button>
            `);
            ($(this).closest('.comment-data-block')).find('p.contentcomment input').val(localStorage.getItem('tempContentComment'));
            ($(this).closest('.comment-data-block')).find('p.contentcomment input').focus();
        }
        
    }

    replyRequest(){
        $.ajax({
			url:'http://localhost/foodpital/Views/HTML/getSessionResponse.php',
			type:'GET'
		}).done((data)=>{
			var dataForward = {
				"id_User": data.sessionUserID
            }
            $.ajax({
				url:'http://localhost:3000/profile/myprofile',
				type:'POST',
				data: dataForward,
				dataType: 'JSON',
			}).done((user)=>{
                if($(this).closest('button').attr('typeaction')=='newcomment'){
                    $.ajax({
                        url : 'http://localhost:3000/comment/ins',
                        type : 'POST',
                        data : {
                            "id_Post": $(this).closest('.news-modal').attr('idPost'),
                            "Content_Comment": $(this).closest('.news-comment-bar').find('input').val(),
                            "ParentCode": 0,
                            "id_User": user[0].id_User
                        },
                        dataType : 'json'
                    }).done((comment)=>{
                        var getFormattedDate = (date) => {
                            let year = date.getFullYear();
                            let month = (1 + date.getMonth()).toString().padStart(2, '0');
                            let day = date.getDate().toString().padStart(2, '0');
                          
                            return day + '/' + month + '/' + year;
                        }
                        $('#view-page #content .row #feed-left .news-modal[idpost="'+$(this).closest('.news-modal').attr('idPost')+'"] ul.post-comments').append(`
                            <li class="mb-2">
                                <aside class="avatar-comment-side">
                                    <div class="avatar">
                                    <img src="`+user[0].Avatar_User+`" alt="`+user[0].Avatar_User+`">
                                    </div>
                                </aside>
                                <aside class="text-comment-side">
                                    <div class="comment-data-block ml-3">
                                        <a href=""><h6 class="m-0">`+user[0].Name_User+`</h6></a>
                                        <p class="mb-0">`+comment.Content_Comment+`</p>
                                        <div class="d-flex flex-wrap align-items-center comment-activity comment-interactive">
                                            <a href="#" typeaction="like">Like</a>
                                            <a href="#" typeaction="reply">Reply</a>
                                            <span>`+getFormattedDate(new Date)+`</span>
                                        </div>
                                    </div>
                                    <ul class="comment-replies ml-3"></ul>
                                </aside>
                            </li>`)
                        $(this).closest('.news-comment-bar').find('input').val('');
                        //taonotification
                        if(data.sessionUserID != $(this).closest('.news-modal').attr('idUser')){
                            $.ajax({
                                url:'http://localhost:3000/notification/ins',
                                type:'POST',
                                data: {
                                    "id_User": $(this).closest('.news-modal').attr('idUser'),
                                    "id_TypeNotification": 3,
                                    "Read": 0,
                                    "id_UserSend": data.sessionUserID
                                },
                                dataType: 'JSON',
                            }).done((data)=>{

                            }).fail(()=>{
                                alert('that bai noti');
                            })
                        }
                        }).fail(()=>{
                            alert("that bai");
                        })
                } else if($(this).closest('button').attr('typeaction')=='newreply'){
                    $.ajax({
                        url : 'http://localhost:3000/comment/ins',
                        type : 'POST',
                        data : {
                            "id_Post": $(this).closest('.news-modal').attr('idPost'),
                            "Content_Comment": $(this).closest('.news-comment-bar').find('input').val(),
                            "ParentCode": $(this).closest('li').attr('idcomment'),
                            "id_User": user[0].id_User
                        },
                        dataType : 'json'
                    }).done((reply)=>{
                        var getFormattedDate = (date) => {
                            let year = date.getFullYear();
                            let month = (1 + date.getMonth()).toString().padStart(2, '0');
                            let day = date.getDate().toString().padStart(2, '0');
                          
                            return day + '/' + month + '/' + year;
                        }
                        $(this).closest('.text-comment-side').find('ul.comment-replies').append(`
                        <li class="mb-2">
                            <aside class="avatar-reply-side">
                                <div class="avatar">
                                    <img src="`+user[0].Avatar_User+`" alt="`+user[0].Avatar_User+`">
                                </div>
                            </aside>
                            <aside class="text-reply-side">
                                <div class="comment-data-block ml-3">
                                    <a href=""><h6 class="m-0">`+user[0].Name_User+`</h6></a>
                                    <p class="mb-0">`+reply.Content_Comment+`</p>
                                    <div class="d-flex flex-wrap align-items-center comment-activity comment-interactive">
                                        <a href="#" typeaction="like">Like</a>
                                        <a href="#" typeaction="reply">Reply</a>
                                        <span>`+getFormattedDate(new Date)+`</span>
                                    </div>
                                </div>
                            </aside>
                        </li>`);
                    $(this).closest('.news-comment-bar').find('input').val('');
                    //taonotification
                    if(data.sessionUserID != $(this).closest('.news-modal').attr('idUser')){
                        $.ajax({
                            url:'http://localhost:3000/notification/ins',
                            type:'POST',
                            data: {
                                "id_User": $(this).closest('.news-modal').attr('idUser'),
                                "id_TypeNotification": 3,
                                "Read": 0,
                                "id_UserSend": data.sessionUserID
                            },
                            dataType: 'JSON',
                        }).done((data)=>{

                        }).fail(()=>{
                            alert('that bai noti');
                        })
                    }
                    }).fail(()=>{
                        alert('that bai');
                    })
                    
                }
            }).fail(()=>{
                alert("that bai");
            })
        }).fail(()=>{
            alert("that bai");
        })
    }
    replyOnClick(e){
        e.preventDefault();
        if($(this).closest('.text-comment-side').find('.news-comment-bar').length > 0){
            $(this).closest('.text-comment-side').find('.news-comment-bar input').trigger('focus');
            return;
        }
        $(this).closest('.text-comment-side').append(`
        <div class="news-comment-bar">
            <input type="text" placeholder="Write a comment...">
            <button type="button" typeaction="newreply">
                <i class="fas fa-paper-plane"></i>
            </button>
        </div>`);
        $(this).closest('.text-comment-side').find('.news-comment-bar input').trigger('focus');
    }
    voteSpanClick(){
        $.ajax({
			url:'http://localhost/foodpital/Views/HTML/getSessionResponse.php',
			type:'GET'
		}).done((data)=>{
            if($(this).hasClass('vote-active')){
                $.ajax({
                    url:'http://localhost:3000/vote/del',
                    type:'DELETE',
                    data: {
                        "id_User" : data.sessionUserID,
                        "id_Post" : $(this).closest('.news-modal').attr('idPost') 
                    },
                    dataType: 'JSON',
                }).done((data)=>{
                    $(this).closest('#vote-request').find('i').removeClass('vote-active');
                    $(this).closest('#vote-request').find('span').removeClass('vote-active');
                    //capnhatvoteavg
                    $.ajax({
                        url:'http://localhost:3000/vote/avg',
                        type:'POST',
                        data: {
                            "id_Post" : $(this).closest('.news-modal').attr('idPost')
                        },
                        dataType: 'JSON',
                    }).done((dataavg)=>{
                        var voteAVG;
                        if(!dataavg[0].AVG){
                            voteAVG = 0;
                        }
                        else{
                            voteAVG = dataavg[0].AVG;
                        }
                        $('#view-page #content .row #feed-left .news-modal[idpost="'+$(this).closest('.news-modal').attr('idPost')+'"] .news-interactive .news-statistics .vote-avg').html(voteAVG+`/5 Stars`);
                    }).fail(()=>{
                        alert("that bai");
                    })
                }).fail((jqXHR, textStatus, errorThrown)=>{
                    console.log(textStatus + ': ' + errorThrown);
                })
                
            }
            else{
                $.ajax({
                    url:'http://localhost:3000/vote/ins',
                    type:'POST',
                    data: {
                        "id_Post" : $(this).closest('.news-modal').attr('idPost'),
                        "id_User" : data.sessionUserID,
                        "voteValue": 5
                    },
                    dataType: 'JSON',
                }).done((vote)=>{
                    $(this).closest('#vote-request').find('i').addClass('vote-active');
                    $(this).closest('#vote-request').find('span').addClass('vote-active');
                    //capnhatvoteavg
                    $.ajax({
                        url:'http://localhost:3000/vote/avg',
                        type:'POST',
                        data: {
                            "id_Post" : $(this).closest('.news-modal').attr('idPost')
                        },
                        dataType: 'JSON',
                    }).done((dataavg)=>{
                        var voteAVG;
                        if(!dataavg[0].AVG){
                            voteAVG = 0;
                        }
                        else{
                            voteAVG = dataavg[0].AVG;
                        }
                        $('#view-page #content .row #feed-left .news-modal[idpost="'+$(this).closest('.news-modal').attr('idPost')+'"] .news-interactive .news-statistics .vote-avg').html(voteAVG+`/5 Stars`);
                    }).fail(()=>{
                        alert("that bai");
                    })
                    //taonotification
                    if(data.sessionUserID != $(this).closest('.news-modal').attr('idUser')){
                        $.ajax({
                            url:'http://localhost:3000/notification/ins',
                            type:'POST',
                            data: {
                                "id_User": $(this).closest('.news-modal').attr('idUser'),
                                "id_TypeNotification": 1,
                                "Read": 0,
                                "id_UserSend": data.sessionUserID
                            },
                            dataType: 'JSON',
                        }).done((data)=>{

                        }).fail(()=>{
                            alert('that bai noti');
                        })
                    }
                }).fail(()=>{
                    alert("that bai");
                })
                
            }
        }).fail(()=>{
            alert('that bai');
        })
    }
    voteStarClick(){
        $.ajax({
			url:'http://localhost/foodpital/Views/HTML/getSessionResponse.php',
			type:'GET'
		}).done((data)=>{
            $.ajax({
                url:'http://localhost:3000/vote/user',
                type:'POST',
                data: {
                    "id_Post" : $(this).closest('.news-modal').attr('idPost'),
                    "id_User" : data.sessionUserID
                },
                dataType: 'JSON',
            }).done((isExist)=>{
                if(isExist.length){
                    $.ajax({
                        url:'http://localhost:3000/vote/editvalue',
                        type:'POST',
                        data: {
                            "id_Post" : $(this).closest('.news-modal').attr('idPost'),
                            "id_User" : data.sessionUserID,
                            "voteValue": $(this).attr("votevalue")
                        },
                        dataType: 'JSON',
                    }).done((vote)=>{
                        $(this).closest('#vote-request').find('i').removeClass('vote-active');
                        $(this).closest('#vote-request').find('span').removeClass('vote-active');
                        $(this).prevAll().add(this).add('.news-modal .news-like-comment div#vote-request span').addClass('vote-active');
                        //capnhatvoteavg
                        $.ajax({
                            url:'http://localhost:3000/vote/avg',
                            type:'POST',
                            data: {
                                "id_Post" : $(this).closest('.news-modal').attr('idPost')
                            },
                            dataType: 'JSON',
                        }).done((dataavg)=>{
                            var voteAVG;
                            if(!dataavg[0].AVG){
                                voteAVG = 0;
                            }
                            else{
                                voteAVG = dataavg[0].AVG;
                            }
                            
                            $('#view-page #content .row #feed-left .news-modal[idpost="'+$(this).closest('.news-modal').attr('idPost')+'"] .news-interactive .news-statistics .vote-avg').html(voteAVG+`/5 Stars`);
                        }).fail(()=>{
                            alert("that bai");
                        })
                    }).fail(()=>{
                        alert("that bai");
                    })
                }else{
                    $.ajax({
                        url:'http://localhost:3000/vote/ins',
                        type:'POST',
                        data: {
                            "id_Post" : $(this).closest('.news-modal').attr('idPost'),
                            "id_User" : data.sessionUserID,
                            "voteValue": $(this).attr("votevalue")
                        },
                        dataType: 'JSON',
                    }).done((vote)=>{
                        $(this).closest('#vote-request').find('i').removeClass('vote-active');
                        $(this).closest('#vote-request').find('span').removeClass('vote-active');
                        $(this).prevAll().add(this).add('.news-modal .news-like-comment div#vote-request span').addClass('vote-active');
                        //capnhatvoteavg
                        $.ajax({
                            url:'http://localhost:3000/vote/avg',
                            type:'POST',
                            data: {
                                "id_Post" : $(this).closest('.news-modal').attr('idPost')
                            },
                            dataType: 'JSON',
                        }).done((dataavg)=>{
                            var voteAVG;
                            if(!dataavg[0].AVG){
                                voteAVG = 0;
                            }
                            else{
                                voteAVG = dataavg[0].AVG;
                            }
                            $('#view-page #content .row #feed-left .news-modal[idpost="'+$(this).closest('.news-modal').attr('idPost')+'"] .news-interactive .news-statistics .vote-avg').html(voteAVG+`/5 Stars`);
                        }).fail(()=>{
                            alert("that bai");
                        })
                        //taonotification
                        if(data.sessionUserID != $(this).closest('.news-modal').attr('idUser')){
                            $.ajax({
                                url:'http://localhost:3000/notification/ins',
                                type:'POST',
                                data: {
                                    "id_User": $(this).closest('.news-modal').attr('idUser'),
                                    "id_TypeNotification": 1,
                                    "Read": 0,
                                    "id_UserSend": data.sessionUserID
                                },
                                dataType: 'JSON',
                            }).done((data)=>{
        
                            }).fail(()=>{
                                alert('that bai noti');
                            })
                        }
                    }).fail(()=>{
                        alert("that bai");
                    })
                }
            }).fail(()=>{
                alert("Thất bại lef");
            })
        }).fail(()=>{
            alert("Thất bại lef");
        })
        
    }
    voteHover(){
        $(this).prevAll().add(this).add('.news-modal .news-like-comment div#vote-request span').css("color","#b0b000");
    }
    voteUnHover(){
        $('.news-modal .news-like-comment div#vote-request i').add('.news-modal .news-like-comment div#vote-request span').css("color","#a9b9b9");
    }

    getFormattedDate(date) {
        let year = date.getFullYear();
        let month = (1 + date.getMonth()).toString().padStart(2, '0');
        let day = date.getDate().toString().padStart(2, '0');
      
        return day + '/' + month + '/' + year;
    }

    genderPost(start,limit){
        this.loadingFlag = true ;
        var user = {};
        $.ajax({
			url:'http://localhost/foodpital/Views/HTML/getSessionResponse.php',
			type:'GET'
		}).done((data)=>{
			var dataForward = {
				"id_User": data.sessionUserID
            }
            
			$.ajax({
				url:'http://localhost:3000/profile/myprofile',
				type:'POST',
				data: dataForward,
				dataType: 'JSON',
			}).done((data)=>{
                user = data[0];
                var urlGetNewFeed;
                var dataGetNewFeed;
                if(location.href == "http://localhost/foodpital/Views/HTML/profile.php"){
                    urlGetNewFeed = 'http://localhost:3000/post/getpostbyuser';
                    dataGetNewFeed = {
                        "id_User": user.id_User,
                        "start" : start,
                        "limit" : limit
                    }
                }
                else if(location.href == "http://localhost/foodpital/Views/HTML/newsfeed.php"){
                    urlGetNewFeed = 'http://localhost:3000/post/newfeed';
                    dataGetNewFeed = {
                        "start" : start,
                        "limit" : limit
                    }
                }
                else if(location.href == "http://localhost/foodpital/Views/HTML/post.php"){
                    urlGetNewFeed = 'http://localhost:3000/post/getpostbypost';
                    dataGetNewFeed = {
                        "id_Post": localStorage.getItem("idThisPost"),
                        "start" : 0,
                        "limit" : 1
                    }
                }

                console.log(dataGetNewFeed);
                debugger;
                $.ajax({
                    url : urlGetNewFeed,
                    type : 'POST',
                    data: dataGetNewFeed,
                    dataType: 'JSON',
                }).done((data)=>{
                    if(!data.length) return;
                    //mảng post
                    data.forEach( (post)=>{
                        var postItemTemp = {};
                        postItemTemp.timePost = new Date(post.DateTimePost);
                        $('#view-page #content .row #feed-left').append(`
                            <div class="news-modal" idpost="`+post.id_Post+`" idUser="`+post.id_User+`">
                                <div class="news-edit">
                                    <button type="button">
                                        <i class="fa fa-circle"></i>
                                        <i class="fa fa-circle"></i>
                                        <i class="fa fa-circle"></i>
                                    </button>   
                                </div>
                                <div id="news-edit-btn" class="news-edit-container">
                                    <ul>
                                        <li>
                                            <button>
                                                <div class="news-edit-icon">
                                                    <i class="fas fa-bullhorn"></i>
                                                </div>
                                                <div class="news-edit-content">
                                                    <h6>Report Post</h6>
                                                    <p>Report this to admin for some reasons</p>
                                                </div>
                                            </button>
                                        </li>
                                        <li>
                                            <button>
                                                <div class="news-edit-icon">
                                                    <i class="fas fa-minus-circle"></i>
                                                </div>
                                                <div class="news-edit-content">
                                                    <h6>Hide Post</h6>
                                                    <p>See fewer posts like this</p>
                                                </div>
                                            </button>
                                        </li>
                                        <li>
                                            <button>
                                                <div class="news-edit-icon">
                                                    <i class="fas fa-user-times"></i>
                                                </div>
                                                <div class="news-edit-content">
                                                    <h6>Unfollow user</h6>
                                                    <p>Stop seeing post but stay friends</p>
                                                </div>
                                            </button>
                                        </li>
                                    </ul>
                                </div>
                                <div class="author">
                                    <div class="avatar">
                                        <img src="" alt="">
                                    </div>
                                    <div class="news-info">
                                        <a href="#" class="news-name"><h6></h6></a>
                                        <p class="news-time">`+ this.getFormattedDate(postItemTemp.timePost)+`</p>
                                    </div>
                                </div>
                                <div class="news-caption">
                                    <p></p>
                                    <p></p>
                                </div>
                                <div class="news-image">
                                    <img src="" alt="">
                                </div>
                                <div class="news-interactive">
                                    <div class="news-statistics">
                                        <button type="button" class="vote-avg"></button>
                                        <button type="button" class="count-comment"></button>
                                    </div>
                                    <div class="news-topic">
                                        <button type="button"></button>
                                    </div>
                                </div>
                                <div class="news-like-comment">
                                    <div id="vote-request" idVote="">
                                        <i class="far fa-star" votevalue="1"></i>
                                        <i class="far fa-star" votevalue="2"></i>
                                        <i class="far fa-star" votevalue="3"></i>
                                        <i class="far fa-star" votevalue="4"></i>
                                        <i class="far fa-star" votevalue="5"></i>
                                        <span>Vote</span>
                                    </div>
                                    <div id="comment-request">
                                        <i class="far fa-comment-alt"></i>Comment
                                    </div>
                                </div>
                                <ul class="post-comments p-0 m-0 comment-box"></ul>
                                <div class="news-comment-bar">
                                    <input type="text" placeholder="Write a comment...">
                                    <button type="button" typeaction="newcomment">
                                        <i class="fas fa-paper-plane"></i>
                                    </button>
                                </div>
                            </div>
                        `);

                        if(post.id_User == dataForward.id_User){
                            $('#view-page #content .row #feed-left .news-modal[idpost="'+post.id_Post+'"] .news-edit-container ul').prepend(`
                                <li>
                                    <button id="btn-edit">
                                        <div class="news-edit-icon">
                                            <i class="fas fa-edit"></i>
                                        </div>
                                        <div class="news-edit-content">
                                            <h6>Edit Post</h6>
                                        </div>
                                    </button>
                                </li>
                                <li>
                                    <button id="btn-delete">
                                        <div class="news-edit-icon">
                                            <i class="fas fa-eraser"></i>
                                        </div>
                                        <div class="news-edit-content">
                                            <h6>Delete Post</h6>
                                        </div>
                                    </button>
                                </li>
                            `)
                        }
                        this.loadingFlag = false;
                        $.ajax({
                            url:'http://localhost:3000/profile/myprofile', //lấy thông tin người post
                            type:'POST',
                            data: {
                                "id_User": post.id_User
                            },
                            dataType: 'JSON',
                        }).done((data)=>{
                            postItemTemp.nameUserPost = data[0].Name_User;
                            postItemTemp.avatarUserPost = data[0].Avatar_User;
                            $('#view-page #content .row #feed-left .news-modal[idpost="'+post.id_Post+'"] .author .avatar img').attr("src",postItemTemp.avatarUserPost);
                            $('#view-page #content .row #feed-left .news-modal[idpost="'+post.id_Post+'"] .author .avatar img').attr("alt",postItemTemp.avatarUserPost);
                            $('#view-page #content .row #feed-left .news-modal[idpost="'+post.id_Post+'"] .author .news-info .news-name h6').html(postItemTemp.nameUserPost);
                        }).fail(()=>{
                            alert("that bai");
                        })
                        //lay content
                        $.ajax({
                            url:'http://localhost:3000/content/getcontent',
                            type:'POST',
                            data: {
                                "id_Post" : post.id_Post
                            },
                            dataType: 'JSON',
                        }).done((data)=>{
                            postItemTemp.titleContentPost = data[0].Title_Content;
                            postItemTemp.textContentPost = data[0].Text_Content;
                            $('#view-page #content .row #feed-left .news-modal[idpost="'+post.id_Post+'"] .news-caption p').eq(0).html(postItemTemp.titleContentPost);
                            $('#view-page #content .row #feed-left .news-modal[idpost="'+post.id_Post+'"] .news-caption p').eq(1).html(postItemTemp.textContentPost);
                        }).fail(()=>{
                            alert("that bai");
                        })
                        //lay image
                        $.ajax({
                            url:'http://localhost:3000/img/get',
                            type:'POST',
                            data: {
                                "id_Post" : post.id_Post
                            },
                            dataType: 'JSON',
                        }).done((data)=>{
                            if(data.length){
                                postItemTemp.imagePost = data[0].Name_Image;
                                $('#view-page #content .row #feed-left .news-modal[idpost="'+post.id_Post+'"] .news-image img').attr("src",postItemTemp.imagePost);
                                $('#view-page #content .row #feed-left .news-modal[idpost="'+post.id_Post+'"] .news-image img').attr("attr",postItemTemp.imagePost);
                            }
                        }).fail(()=>{
                            alert("that bai");
                        })
                        //lay trungbinh vote
                        $.ajax({
                            url:'http://localhost:3000/vote/avg',
                            type:'POST',
                            data: {
                                "id_Post" : post.id_Post
                            },
                            dataType: 'JSON',
                        }).done((data)=>{
                            if(!data[0].AVG){
                                postItemTemp.voteAVG = 0;
                            }
                            else{
                                postItemTemp.voteAVG = data[0].AVG;
                            }
                            $('#view-page #content .row #feed-left .news-modal[idpost="'+post.id_Post+'"] .news-interactive .news-statistics .vote-avg').html(postItemTemp.voteAVG+`/5 Stars`);
                        }).fail(()=>{
                            alert("that bai");
                        })
                        //lay so comment
                        $.ajax({
                            url:'http://localhost:3000/comment/count',
                            type:'POST',
                            data: {
                                "id_Post" : post.id_Post
                            },
                            dataType: 'JSON',
                        }).done((data)=>{
                            postItemTemp.CountComment = data[0].CountComment;
                            $('#view-page #content .row #feed-left .news-modal[idpost="'+post.id_Post+'"] .news-interactive .news-statistics .count-comment').html(postItemTemp.CountComment+` Comment`);
                        }).fail(()=>{
                            alert("that bai");
                        })
                        //lấy topic
                        $.ajax({
                            url:'http://localhost:3000/topic/gettopic',
                            type:'POST',
                            data: {
                                "id_Topic" : post.id_Topic
                            },
                            dataType: 'JSON',
                        }).done((data)=>{
                            postItemTemp.Name_Topic = data[0].Name_Topic;
                            $('#view-page #content .row #feed-left .news-modal[idpost="'+post.id_Post+'"] .news-interactive .news-topic button').html(postItemTemp.Name_Topic);
                        }).fail(()=>{
                            alert("Thất bại");
                        })
                        //lấy voteuser
                        $.ajax({
                            url:'http://localhost:3000/vote/user',
                            type:'POST',
                            data: {
                                "id_Post" : post.id_Post,
                                "id_User" : user.id_User
                            },
                            dataType: 'JSON',
                        }).done((data)=>{
                            if(data.length){
                                postItemTemp.id_Vote = data[0].id_Vote;
                                postItemTemp.voteValue = data[0].voteValue;
                                $('#view-page #content .row #feed-left .news-modal[idpost="'+post.id_Post+'"] .news-like-comment #vote-request').attr("idVote",postItemTemp.id_Vote = data[0].id_Vote);
                                $('#view-page #content .row #feed-left .news-modal[idpost="'+post.id_Post+'"] .news-like-comment #vote-request i').eq(postItemTemp.voteValue-1).prevAll()
                                .add($('#view-page #content .row #feed-left .news-modal[idpost="'+post.id_Post+'"] .news-like-comment #vote-request i').eq(postItemTemp.voteValue-1))
                                .add('#view-page #content .row #feed-left .news-modal[idpost="'+post.id_Post+'"] .news-like-comment div#vote-request span').addClass('vote-active');
                            }
                        }).fail(()=>{
                            alert("Thất bại lef");
                        })
                        //lấy commtent
                $.ajax({
                    url:'http://localhost:3000/comment/getparent',
                    type:'POST',
                    data: {
                        "id_Post" : post.id_Post
                    },
                    dataType: 'JSON',
                }).done((data)=>{
                    postItemTemp.arrayComment = [...data];
                    postItemTemp.arrayComment.forEach(comment=>{
                        if(comment.id_User == dataForward.id_User){
                            $('#view-page #content .row #feed-left .news-modal[idpost="'+post.id_Post+'"] ul.post-comments').append(`
                            <li class="mb-2" idComment = "`+comment.id_Comment+`">
                                <aside class="avatar-comment-side">
                                    <div class="avatar">
                                        <img src="" alt="">
                                    </div>
                                </aside>
                                <aside class="text-comment-side">
                                    <div class="comment-data-block ml-3">
                                        <a href=""><h6 class="m-0"></h6></a>
                                        <p class="mb-0 contentcomment">`+comment.Content_Comment+`</p>
                                        <div class="d-flex flex-wrap align-items-center comment-activity comment-interactive">
                                            <a href="#" typeaction="like">Like</a>
                                            <a href="#" typeaction="reply">Reply</a>
                                            <a href="#" typeaction="edit">Edit</a>
                                        <span>`+this.getFormattedDate(new Date(comment.DateTime_Comment))+`</span>
                                        </div>
                                    </div>
                                    <ul class="comment-replies ml-3"></ul>
                                </aside>
                            </li>`);
                        }else{
                            $('#view-page #content .row #feed-left .news-modal[idpost="'+post.id_Post+'"] ul.post-comments').append(`
                            <li class="mb-2" idComment = "`+comment.id_Comment+`">
                                <aside class="avatar-comment-side">
                                    <div class="avatar">
                                        <img src="" alt="">
                                    </div>
                                </aside>
                                <aside class="text-comment-side">
                                    <div class="comment-data-block ml-3">
                                        <a href=""><h6 class="m-0"></h6></a>
                                        <p class="mb-0 contentcomment">`+comment.Content_Comment+`</p>
                                        <div class="d-flex flex-wrap align-items-center comment-activity comment-interactive">
                                            <a href="#" typeaction="like">Like</a>
                                            <a href="#" typeaction="reply">Reply</a>
                                        <span>`+this.getFormattedDate(new Date(comment.DateTime_Comment))+`</span>
                                        </div>
                                    </div>
                                    <ul class="comment-replies ml-3"></ul>
                                </aside>
                            </li>`);
                        }
                    //lấy user comment
                        $.ajax({
                            url:'http://localhost:3000/profile/myprofile', //lấy thông tin người comment
                            type:'POST',
                            data: {
                                "id_User": comment.id_User
                            },
                            dataType: 'JSON',
                        }).done((data)=>{
                            comment.nameUserComment = data[0].Name_User;
                            comment.avatarUserComment = data[0].Avatar_User;
                            $('#view-page #content .row #feed-left .news-modal[idpost="'+post.id_Post+'"] ul.post-comments li[idComment = "'+comment.id_Comment+'"] div.avatar img').attr("src",comment.avatarUserComment);
                            $('#view-page #content .row #feed-left .news-modal[idpost="'+post.id_Post+'"] ul.post-comments li[idComment = "'+comment.id_Comment+'"] div.avatar img').attr("alt",comment.avatarUserComment);
                            $('#view-page #content .row #feed-left .news-modal[idpost="'+post.id_Post+'"] ul.post-comments li[idComment = "'+comment.id_Comment+'"] .text-comment-side h6').html(comment.nameUserComment);
                        }).fail(()=>{
                            alert("that bai");
                        })
                        //lấy reply
                        $.ajax({
                            url:'http://localhost:3000/comment/getchild',
                            type:'POST',
                            data: {
                                "id_Post" : comment.id_Post,
                                "id_Comment" : comment.id_Comment
                            },
                            dataType: 'JSON',
                        }).done((data)=>{
                            comment.arrayReply=[...data];

                            //lấy reply
                        comment.arrayReply.forEach(reply =>{
                            if(reply.id_User == dataForward.id_User){
                                $('#view-page #content .row #feed-left .news-modal[idpost="'+post.id_Post+'"] ul.post-comments li[idComment = "'+comment.id_Comment+'"] ul.comment-replies').append(
                                    `<li class="mb-2" idComment="`+reply.id_Comment+`">
                                        <aside class="avatar-reply-side">
                                            <div class="avatar">
                                            <img src="" alt="">
                                            </div>
                                        </aside>
                                        <aside class="text-reply-side">
                                            <div class="comment-data-block ml-3">
                                                <a href=""><h6 class="m-0"></h6></a>
                                                <p class="mb-0 contentcomment">`+reply.Content_Comment+`</p>
                                                <div class="d-flex flex-wrap align-items-center comment-activity comment-interactive">
                                                    <a href="#" typeaction="like">Like</a>
                                                    <a href="#" typeaction="reply">Reply</a>
                                                    <a href="#" typeaction="edit">Edit</a>
                                                    <span>`+this.getFormattedDate(new Date(reply.DateTime_Comment))+`</span>
                                                </div>
                                            </div>
                                        </aside>
                                    </li>`
                                );
                            }else{
                                $('#view-page #content .row #feed-left .news-modal[idpost="'+post.id_Post+'"] ul.post-comments li[idComment = "'+comment.id_Comment+'"] ul.comment-replies').append(
                                    `<li class="mb-2" idComment="`+reply.id_Comment+`">
                                        <aside class="avatar-reply-side">
                                            <div class="avatar">
                                            <img src="" alt="">
                                            </div>
                                        </aside>
                                        <aside class="text-reply-side">
                                            <div class="comment-data-block ml-3">
                                                <a href=""><h6 class="m-0"></h6></a>
                                                <p class="mb-0 contentcomment">`+reply.Content_Comment+`</p>
                                                <div class="d-flex flex-wrap align-items-center comment-activity comment-interactive">
                                                    <a href="#" typeaction="like">Like</a>
                                                    <a href="#" typeaction="reply">Reply</a>
                                                    <span>`+this.getFormattedDate(new Date(reply.DateTime_Comment))+`</span>
                                                </div>
                                            </div>
                                        </aside>
                                    </li>`
                                );
                            }
                            
                            $.ajax({
                                url:'http://localhost:3000/profile/myprofile',
                                type:'POST',
                                data: {
                                    "id_User": reply.id_User
                                },
                                dataType: 'JSON',
                            }).done((data)=>{
                                
                                reply.nameUserReply = data[0].Name_User;
                                reply.avatarUserReply = data[0].Avatar_User;
                                $('#view-page #content .row #feed-left .news-modal[idpost="'+post.id_Post+'"] ul.post-comments li[idComment = "'+comment.id_Comment+'"] ul.comment-replies li[idComment = "'+reply.id_Comment+'"] div.avatar img').attr("src",reply.avatarUserReply);
                                $('#view-page #content .row #feed-left .news-modal[idpost="'+post.id_Post+'"] ul.post-comments li[idComment = "'+comment.id_Comment+'"] ul.comment-replies li[idComment = "'+reply.id_Comment+'"] div.avatar img').attr("alt",reply.avatarUserReply);
                                $('#view-page #content .row #feed-left .news-modal[idpost="'+post.id_Post+'"] ul.post-comments li[idComment = "'+comment.id_Comment+'"] ul.comment-replies li[idComment = "'+reply.id_Comment+'"] .text-reply-side h6').html(reply.nameUserReply);
                            }).fail(()=>{
                                alert("that bai");
                            })
                        });
                    }).fail(()=>{
                        alert("that bai");
                    })
                    });
                }).fail(()=>{
                    alert("that bai");
                })
                });
                })
			}).fail(()=>{
				alert("that bai");
			})
		}).fail((jqXHR, textStatus, errorThrown)=>{
			console.log(textStatus + ': ' + errorThrown);
        })
        
        console.log(this.postArray);
    }

    myNewsEdit(){
        if(!$('.news-modal[idPost = "'+$(this).closest('.news-modal').attr('idPost')+'"] #news-edit-btn').hasClass('d-block'))
        {
            $('.news-modal[idPost = "'+$(this).closest('.news-modal').attr('idPost')+'"] #news-edit-btn').addClass('d-block');
        }
        else{
            $('.news-modal[idPost = "'+$(this).closest('.news-modal').attr('idPost')+'"] #news-edit-btn').removeClass('d-block');
        }
    }

    chooseTopic(){
        $.ajax({
          url: 'http://localhost:3000/topic/all',
          type: 'GET',
          dataType: 'JSON',
          data: '',
          success: function (data) {
            data.forEach(element => {
              $('.topic select').append(`<option value="`+element.Name_Topic+`" idTopic = "`+element.id_Topic+`">`+element.Name_Topic+`</option>`);
            });
          },
        });
    }

    inputTopic(e){
        var requestDataTopic = {
            Name_Topic: $('.topic select option').val(),  
        };
        $.ajax({
            url: 'http://localhost:3000/topic/gettopic',
            type: 'POST',
            dataType: 'JSON',
            data: requestDataTopic,
            success: function (data) {
                console.log("oke");
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(textStatus + ": " + errorThrown);
            }
        });
    }



    ///// demo submit post button //////

    submitPost(e){
        localStorage.setItem('before_href',location.href);
        localStorage.setItem("EditOrNot", "No");
        var idTopic = $('.topic select').find(":selected").attr('idTopic');
        var requestDataContent = {
            id_Topic: idTopic,
            id_User: getUserID()
        };
        $.ajax({
            url: 'http://localhost:3000/post/create',
            type: 'POST',
            dataType: 'JSON',
            data: requestDataContent,
            async: false,
            success: function(data){
                CreateContent(data.id);
                localStorage.setItem("id_NewPost", data.id);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                alert("Loi con me no roi");
                console.log(textStatus + ": " + errorThrown);
            }
        });

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

        function CreateContent (id_Post){
            debugger;
            var requestData = {
                Text_Content: $('#post-popup-input textarea').val(),
                id_Post: id_Post
            }
            $.ajax({
                url: 'http://localhost:3000/content/create',
                type: 'POST',
                dataType: 'JSON',
                data: requestData,
                async: false,
                success: function(data){
                    debugger;
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    console.log(textStatus + ": " + errorThrown);
                }
            });
        }
    }

    editPost(){
        $("#upload-popup").show();
        var idPost =$(this).closest('.news-modal').attr('idPost');
        var contentTemp = $('#view-page #content .row #feed-left .news-modal[idpost="'+$(this).closest(".news-modal").attr("idpost")+'"] .news-caption p').eq(1).text();
        $('#upload-popup #upload-popup-content #upload-popup-main #upload-popup-profile #upload-popup-head #upload-popup-input textarea[type=text]').val(contentTemp);
        var imageTemp = $('#view-page #content .row #feed-left .news-modal[idpost="'+$(this).closest(".news-modal").attr("idpost")+'"] .news-image img').attr('src');
        $('#postImg').attr("src", imageTemp);
        var reqData = {
          id_User: getUserID(),
        };

        $.ajax({
            url: 'http://localhost:3000/profile/myprofile',
            type: 'POST',
            dataType: 'JSON',
            data: reqData,
            async: false,
            success: function(data){
                $('#upload-popup #upload-popup-content #upload-popup-main #upload-popup-profile #upload-popup-head #upload-popup-avatar img ').attr("src",data[0].Avatar_User);
                localStorage.setItem("idPost", idPost);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(textStatus + ": " + errorThrown);
            }
        });

        function  getUserID() {
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
    };
    hideUploadPopUp(){
        $("#upload-popup").hide();
    };
    outsideUploadPopUp(){
        $("#upload-popup").hide();
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




var edit = document.getElementById("submenu-edit");
var i = 0;

function mySubEdit(){
    if(i == 0)
    {
    	edit.style.display = "block";
    	i++;
    }
    else {
    	edit.style.display = "none";
    	i--;
    }
}

var post = document.getElementById("post-popup");
var i3 = 0;
var i4 = 0;

function myPostPopUp(){
    if(i3 == 0)
    {
        post.style.display = "block";
        i3++;
    }
    else{
        post.style.display = "none";
        i3--;
    }
}

function changeImage(evt) {
    evt.preventDefault();
    evt.stopPropagation();

    var files = evt.target.files;

    var file = files[0];

    var fileReader = new FileReader();

    fileReader.onload = function(progressEvent) {
        var url = fileReader.result;

        console.log(url);

        // var myImg = document.getElementById("myimage");
        // myImg.src = url;

        $("#post-image-file").append(`<img src=`+url+` id="myimage"/>
            <button type="button"><i class="fas fa-times"></i></button>
        `)

        $("#post-image-file button").click(function() {
            $("#post-image-file #myimage").remove();
            $("#post-image-file button").remove();
        });

        $("#upload-image-file").append(`<img src=`+url+` id="uploadImage"/>
            <button type="button" id="uploadImage-btn"><i class="fas fa-times"></i></button>
        `)

        $("#upload-image-file button#uploadImage-btn").click(function(){
            $("#upload-image-file #uploadImage").remove();
            $("#upload-image-file button#uploadImage-btn").remove();
        });
    };

    fileReader.readAsDataURL(file);
}


// $(document).ready(function(){
//     $("#post-image-file button").click(function(){
//         $("#post-image-file #myimage").remove();
//     });
// });

// function getNameImage(){
//     var nameImg = document.getElementById("myimage").src;
//     document.getElementById("demo").innerHTML = nameImg;
// }

$("#postImgButton").click(function(){
    $("#upload-image-file #postImg").remove();
    $("#postImgButton").remove();
});






