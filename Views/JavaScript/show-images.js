function changeImage(evt){
    evt.preventDefault();
    evt.stopPropagation();

    var file = evt.target.files;

    var file = files[0];

    var fileReader = new FileReader();

    fileReader.onload = function(progressEvent){
        var url = fileReader.result;

        console.log(url);

        var myImg = document.getElementById("imageFile");
        myImg.src = url;
    }

    fileReader.readAsDataURL(file);
}