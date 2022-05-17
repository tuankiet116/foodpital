$(document).ready(function () {
  var admin = new adminjs();
});

class adminjs {
    constructor() {
        this.checkIfAdmin();
        this.managementUser = [
        {
            name: "Ari Staprans Leff",
            avatar:
            // "https://images.pexels.com/photos/1071162/pexels-photo-1071162.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
            "../../Assets/Images/logobanhmi.jpg",
            icon: "../../Assets/Images/BlueCheckIcon1.png",
            rank: "admin",
            link: "#",
        },
        ];

        this.managementdata = [
        { name: "Dashboard", icon: "fas fa-home", link: "#" },
        { name: "Account", icon: "fas fa-user-circle", link: "#" },
        { name: "Post", icon: "far fa-newspaper", link: "#" },
        ];

        this.managementDashboard = [
            {
                name: "Dashboard",
                icon: "fas fa-home",
                icon2: "fas fa-sign-in-alt",
                icon3: "far fa-newspaper",
                icon4: "fas fa-user-circle",
            },
        ];

        this.managementAccount = [{ name: "Account", icon: "fas fa-user-circle" }];

        this.managementPost = [{ name: "Post", icon: "far fa-newspaper" }];

        this.managementTopic = [{ name: "Topic", icon: "fab fa-elementor" }];


        this.genderData();
        this.initEvent();
    }

    initEvent(){
        $(document).on('click','.m-Table3 table tr td button.topic-delete', this.deleteTopic);
        $(document).on('click','.sub-notification-container .sub-notification-side > ul > li a#signout',this.signOutRequest);
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

    genderData() {

        this.postNumber();
        this.accountNumber();
        this.countAccount();
        this.showAllPost();
        this.showAllTopic();
        this.showInfoAdmin();
        // this.managementUser.forEach((item) => {
        // $(".container #left-management #management-nav .admin-info").append(`<a href="` + item.link +`">
        //         <div class="admin-avatar">
        //             <img src="` + item.avatar + `" alt="">
        //         </div>
        //     </a>
        //     <div class="admin-name">
        //         <a href="` + item.link + `">
        //             <h5>` + item.name + `</h5>
        //         </a>
        //         <p>Admin</p>
        //     </div>
        //     <img class="admin-icon" src="` + item.icon + `" alt="">
        //     `);
        // });

        this.managementDashboard.forEach((item) => {
        $("#right-management .m-Dashboard").append(`            
            <div class="title">
                <div><i class="` + item.icon + `"></i></div>
                <span><h6>` + item.name + `</h6> </span>   
            </div>       

            <div class="m-Parameters">
                <div class="monthly-access"> 
                    <div class="monthly-access-title">
                        <span>Monthly Access</span>
                        <i class="` + item.icon2 + `"></i>
                    </div>
                    <h3> 4,200 </h3>
                </div>

                <div class="posts-number"> 
                    <div class="posts-number-title">
                        <span>Posts Number</span>
                        <i class="` + item.icon3 + `"></i>
                    </div>
                    <div class="posts-number-parameters"></div>
                </div>

                <div class="Accounts-number"> 
                    <div class="Accounts-number-title">
                        <span>Accounts Number</span>
                        <i class="` + item.icon4 + `"></i>
                    </div>
                    <div class="Accounts-number-parameters"></div>
                </div>
                        
            </div>`);
        });

        this.managementAccount.forEach((item) => {
        $("#right-management .m-Account").append(`
            <div class="title">
                <div><i class="` + item.icon + `"></i></div>
                <span><h6>` + item.name + `</h6> </span>   
            </div> 

            <div class="m-Table">
                <div class="table-border">
                    <table>
                        <tr class="table-title">
                            <td><h6> ID </h6></td>
                            <td><h6> Username </h6></td>
                            <td><h6> Password </h6></td>
                            <td><h6> Permission </h6></td>
                            <td colspan="2"><h6> Setting </h6></td>
                        </tr>
                    </table>
                </div>
            </div>`);
        });

        this.managementPost.forEach((item) => {
            $("#right-management .m-Post").append(`
                <div class="title">
                    <div><i class="` + item.icon + `"></i></div>
                    <span><h6>` + item.name + `</h6></span>
                </div>

                <div class="m-Table2">
                    <div class="table-border">
                        <table>
                            <tr class="table-title2">
                                <td><h6>ID Post</h6></td>
                                <td><h6>ID User</h6></td>
                                <td><h6>ID Content</h6></td>
                                <td><h6>ID Topic</h6></td>
                                <td><h6> Date </h6></td>
                                <td colspan="2"><h6> Setting </h6></td>
                            </tr>
                        </table>
                    </div>
                </div>
                
            `);
        });  

        this.managementTopic.forEach(item => {
            $("#right-management .m-Topic").append(`
                <div class="title">
                    <div><i class="` + item.icon + `"></i></div>
                    <span><h6>` + item.name + `</h6></span>
                </div>

                <div class="m-Table3">
                    <div class="table-border">
                        <table>
                            <tr class="table-title3">
                                <td><h6> ID </h6></td>
                                <td><h6> Name </h6></td>
                                <td colspan="2"><h6> Setting </h6></td>
                            </tr>
                        </table>
                    </div>
                </div>
                
                <div class="data-edit">
                    <button type="button"> 
                        <i class="fas fa-plus"></i>
                        <span>Add</span> 
                    </button>
                </div>

            `)
        });
    }

    showInfoAdmin(){
        var reqData = {
            id_User: getUserID()
        }

        $.ajax({
            url: "http://localhost:3000/profile/myprofile",
            type: "POST",
            dataType: "JSON",
            data: reqData,
            async: false,
            success: function (data) {
                data.forEach((item) => {
                $(".container #left-management #management-nav .admin-info").append(`<a href="#">
                    <div class="admin-avatar">
                        <img src="` +item.Avatar_User+ `" alt="">
                    </div>
                </a>
                <div class="admin-name">
                    <a href="#">
                        <h5>` + item.Name_User + `</h5>
                    </a>
                    <p>Admin</p>
                </div>
                <img class="admin-icon" src="../../Assets/Images/BlueCheckIcon1.png" alt="">`);
                });
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(textStatus + ": " + errorThrown);
            },
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

    postNumber() {
        $.ajax({
        url: "http://localhost:3000/admin/countpost",
        type: "GET",
        dataType: "JSON",
        success: function (data) {
            data.forEach((element) => {
            $(".posts-number .posts-number-parameters").append(
                `<h3>` + element.CountPost + `</h3>`
            );
            });
        },
        });
    }

    accountNumber() {
        $.ajax({
        url: "http://localhost:3000/admin/accountuser",
        type: "GET",
        dataType: "JSON",
        success: function (data) {
            data.forEach(element => {
                $(".m-Table table").append(`
                    <tr>
                        <td> ` + element.id_User + ` </td>
                        <td> ` + element.User_Sign + ` </td>
                        <td> ` + element.User_Password + ` </td>
                        <td> ` + element.id_Permission + ` </td>
                        <td>  
                            <button>
                                <img src="../../Assets/Images/lock-icon.png" alt="lock icon">
                                Lock  
                            </button>   
                        </td>
                        <td> 
                            <button>
                                <img class="m-Icon-trash" src="../../Assets/Images/trash-can-icon.png" alt="trash can icon">
                                Delete
                            </button>
                        </td>
                    </tr>`);
                });
            },
        });
    }

    countAccount(){
        $.ajax({
            url: 'http://localhost:3000/admin/countaccount',
            type: 'GET',
            dataType: 'JSON',
            success: function(data){
                data.forEach(element => {
                    $(".Accounts-number .Accounts-number-parameters").append(`
                        <h3>`+element.CountAccount+`</h3>
                    `);
                })
            }

        });
    }

    showAllPost(){
        $.ajax({
            url: 'http://localhost:3000/admin/getallpost',
            type: 'GET',
            dataType: 'JSON',
            success: function(data){
                data.forEach(element => {
                    $('.m-Table2 table').append(`
                        <tr>
                            <td>`+element.id_Post+`</td>
                            <td>`+element.id_User+`</td>
                            <td>`+element.id_Topic+`</td>
                            <td>`+element.DateTimePost+`</td>
                            <td>  
                                <button>
                                    <img src="../../Assets/Images/lock-icon.png" alt="lock icon">
                                    Lock  
                                </button>   
                            </td>
                            <td> 
                                <button>
                                    <img class="m-Icon-trash" src="../../Assets/Images/trash-can-icon.png" alt="trash can icon">
                                    Delete
                                </button>
                            </td>
                        </tr>             
                    `)
                })
            }

        });
    }

    showAllTopic(){
        $.ajax({
            url: 'http://localhost:3000/topic/all',
            type: 'GET',
            dataType: 'JSON',
            success: function(data)
            {
                data.forEach(element => {
                    $('.m-Table3 table').append(`
                        <tr>
                            <td id="idTopic">`+element.id_Topic+`</td>
                            <td>
                                <p>`+element.Name_Topic+`</p>
                                <button type="button" class="edit-btn">
                                    <img src="../../Assets/Images/edit-icon.png" alt="edit icon">
                                </button>
                            </td>
                            <td>  
                                <button class="topic-lock">
                                    <img src="../../Assets/Images/lock-icon.png" alt="lock icon">
                                    Lock  
                                </button>   
                            </td>
                            <td> 
                                <button class="topic-delete">
                                    <img class="m-Icon-trash" src="../../Assets/Images/trash-can-icon.png" alt="trash can icon">
                                    Delete
                                </button>
                            </td>
                        </tr>
                    `)
                })
            }
            
        });
    }

    deleteTopic(){
        var reqData = {
            id_Topic: $(this).closest('.m-Table3').find('#idTopic').text(), 
        }

        $.ajax({
            url: 'http://localhost:3000/topic/del',
            type: 'DELETE',
            dataType: 'JSON',
            data: reqData,
            async: false,
            success: function (data) {
                debugger;
                console.log("oke");
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(textStatus + ": " + errorThrown);
                debugger;
            }
           
        });

        // function  getUserID() {
        //     var userID = {};
        //     $.ajax({
        //         url: 'http://localhost/foodpital/Views/HTML/getSessionResponse.php',
        //         type: 'GET',
        //         dataType: 'JSON',
        //         async: false,
        //         success: function (data) {
        //             userID = data.sessionUserID;
        //         },
        //         error: function (jqXHR, textStatus, errorThrown) {
        //             console.log(textStatus + ": " + errorThrown);
        //         }
        //     });
        //     return userID;
        // }
    }

    checkIfAdmin(){
        var reqData = {
            id_User: getUserID(),
        }

        $.ajax({
            url: 'http://localhost:3000/user/permission',
            type: 'POST',
            dataType: 'JSON',
            async: false,
            data: reqData,
            success: function(data){
                if(data[0].id_Permission != '2')
                {
                    window.location.href = "http://localhost/foodpital/Views/HTML/newsfeed.php";
                    return;
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
    

var managementClick = 1;
showManagement(managementClick);

function currentManagement(n) {
  showManagement((managementClick = n));
}

function showManagement(n) {
  var content = document.getElementsByClassName("m-Content");
  var contentTitle = document.getElementsByClassName("m-Title");

  for (var i = 0; i < content.length; i++) {
    content[i].style.display = "none";
  }
  for (var i = 0; i < contentTitle.length; i++) {
    contentTitle[i].className = contentTitle[i].className.replace(
      " content-active",
      ""
    );
  }
  content[managementClick - 1].style.display = "block";
  contentTitle[managementClick - 1].className += " content-active";
}
