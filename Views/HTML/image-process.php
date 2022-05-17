<?php

    if(isset($_REQUEST["s1"]))
    {
        $newName = "null";
        if(isset($_FILES["images"]) && $_FILES["images"]["error"] == 0)
        {
            $imageName = $_FILES["images"]["name"];
            $imageTmp = $_FILES["images"]["tmp_name"];
            $nameExp = explode('.', $imageName);
            $ext = end($nameExp);
            $newName = rand(100,999) . '.' . $ext;

            move_uploaded_file($imageTmp, "../../Assets/PostImage/$newName");

        }
    }
?>
<script src="../JavaScript/jquery-3.5.1.min.js"></script>
<script>
    var nameImg = "<?php echo $newName ?>";
    var url = `http://localhost/foodpital/Assets/PostImage/` + nameImg;
    var ConfirmEdit = localStorage.getItem("EditOrNot");

    if(nameImg != "null"){
        if(ConfirmEdit === "yes"){
            var myIdPost = localStorage.getItem("id_MyPost");
            var PostIDReq = {
                id_Post:  myIdPost
            }
            debugger;
            $.ajax({
                url: 'http://localhost:3000/img/get',
                type: 'POST',
                dataType: 'JSON',
                data: PostIDReq,
                async: false,
                success: function(data){
                    debugger;
                    if(data.length){
                        editImage(url, myIdPost);
                        location.href = localStorage.getItem('before_href');
                    }
                    else{
                        createImage(url, myIdPost);
                        location.href = localStorage.getItem('before_href');
                    }

                },
                error: function (jqXHR, textStatus, errorThrown) {
                    console.log(textStatus + ": " + errorThrown);
                }

            });
            debugger;

            function editImage (url, myidPost){
                var reqDataEdit = {
                    Name_Image: url,
                    id_Post: myIdPost
                };
                $.ajax({
                    url: 'http://localhost:3000/image/edit',
                    type: 'PUT',
                    dataType: 'JSON',
                    data: reqDataEdit,
                    async: false,
                    success: function(data){

                        debugger;
                        localStorage.setItem("EditOrNot", "No");
                        location.href = localStorage.getItem('before_href');
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        console.log(textStatus + ": " + errorThrown);
                    }

                });
            }
            function createImage(url, idPost){
                var id_Post = idPost;
                var reqData = {
                    Name_Image: url,
                    id_Post: id_Post
                };
                debugger;
                $.ajax({
                    url: 'http://localhost:3000/img/ins',
                    type: 'POST',
                    dataType: 'JSON',
                    data: reqData,
                    async: false,
                    success: function(data){
                        debugger;
                        location.href = localStorage.getItem('before_href');
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        console.log(textStatus + ": " + errorThrown);
                    }
                });
            }

        }else{

            var id_Post = localStorage.getItem("id_NewPost");
            debugger;
            var reqData = {
                Name_Image: url,
                id_Post: id_Post
            };
            $.ajax({
                url: 'http://localhost:3000/img/ins',
                type: 'POST',
                dataType: 'JSON',
                data: reqData,
                async: false,
                success: function(data){
                    debugger;
                    location.href = localStorage.getItem('before_href');
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    console.log(textStatus + ": " + errorThrown);
                }
            });
        }
    }
    else{
        location.href = localStorage.getItem('before_href');
    }
</script>

