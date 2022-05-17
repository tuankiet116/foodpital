$(document).ready(function () {
    var sidebar = new sidebarjs();
})

class sidebarjs {
    constructor(){
        this.categoriesdata = [
            {name : "Newsfeed", icon : "far fa-newspaper", link : "http://localhost/foodpital/Views/HTML/newsfeed.php"},
            {name : "Profile", icon : "far fa-id-badge", link : "http://localhost/foodpital/Views/HTML/profile.php"},
            {name : "Notification", icon : "far fa-bell", link : "#"},
            {name : "Friend Lists", icon : "fas fa-user-friends", link : "#"},
            {name : "Group", icon : "fas fa-users", link : "#"},
            {name : "Image", icon : "far fa-image", link : "#"},
            {name : "Video", icon : "fas fa-film", link : "#"},
            {name : "Event", icon : "far fa-calendar-alt", link : "#"},
            {name : "Video", icon : "fas fa-archive", link : "#"},
        ];
        this.friendsdata = [
            {name : "Minh Chau", avatar : "../../Assets/Images/banner01.png", status : "online", desc : "Review am thuc"},
            {name : "Minh Chau", avatar : "../../Assets/Images/banner02.png", status : "offline", desc : "Cong an giao thong"},
            {name : "Minh Chau", avatar : "../../Assets/Images/logobanhmi.jpg", status : "offline", desc : "Ban banh my"}
        ];
        this.genderData();
    }
    genderData() {
        this.categoriesdata.forEach(item => {
            $('.row #left-sidebar #categories-nav ul').append(`<a href="`+item.link+`">
            <li>
                <i class="`+item.icon+`"></i>
                <span>`+item.name+`</span>
            </li>
        </a>`);
        if(location.href == 'http://localhost/foodpital/Views/HTML/newsfeed.php' || location.href == 'http://localhost/foodpital/Views/HTML/newsfeed.php#'){
            $(document).find('.row #left-sidebar #categories-nav ul li').eq(0).addClass('viewnow');
        }
        if(location.href == 'http://localhost/foodpital/Views/HTML/profile.php' || location.href == 'http://localhost/foodpital/Views/HTML/profile.php#'){
            $(document).find('.row #left-sidebar #categories-nav ul li').eq(1).addClass('viewnow');
        }
        
        });

        this.friendsdata.forEach(item => {
            $('.row #right-sidebar #categories-online-friends ul').append(`<a href="#">
            <li>
                <div class="friend-avatar">
                    <img src="`+item.avatar+`" alt="">
                    <span class="status `+item.status+`"></span>
                </div>
                <div class="friend-name">
                    <h6>`+item.name+`</h6>
                    <p>`+item.desc+`</p>
                </div>
            </li>
        </a>`)
        })
    }

}