
$(document).ready(function(){
    fetch("http://504080.com/api/v1/directories/enquiry-types", {
        method: "GET",
    }).then(function(response){
        response.json().then(function(obj){
            for (let i = 0; i < obj.data.length; i++) {
                var newItem = $('<option value="' + (obj.data[i].name) + '">' + (obj.data[i].name) + '</option>');
                $('#enquiry-type').append(newItem);
            }
            $('#enquiry-type').select2({
                placeholder: " ",
                minimumResultsForSearch: Infinity
            });
        })
    })
    //поле "Other"
    $("#enquiry-type").change(function(){
        if($(this).val() === 'Other'){
           $("#other-hidden").removeAttr("hidden")
        }
        else{
            $("#other-hidden").attr("hidden", true)
        }
    })
    $("#add-photo").change(function(){

    })
    function validateEmail(email) {
        var reg = /^[0-9a-z-\.]+\@[0-9a-z-]{2,}\.[a-z]{2,}$/i;
            return reg.test(email)
    }
    //проверка полей
    $(".required-name").blur(function(){
        if ($(".required-name").val() === ""){
            $(".error-name").removeAttr("hidden");
        }
        else {
            $(".error-name").attr("hidden", true)
        }
    })
    $(".required-email").blur(function () {
        if (!validateEmail(this.value)) {
            $(".error-email").removeAttr("hidden");
        }
        else {
            $(".error-email").attr("hidden", true)
        }
    })
    $(".required-subject").blur(function () {
        if ($(".required-subject").val() === "") {
            $(".error-subject").removeAttr("hidden");
        }
        else {
            $(".error-subject").attr("hidden", true)
        }
    })
    $(".required-description").blur(function () {
        if ($(".required-description").val() === "") {
            $(".error-description").removeAttr("hidden");
        }
        else {
            $(".error-description").attr("hidden", true)
        }
    })
    //валидация изображения
    $("#add-photo").change(function(){
        switch(this.files[0].type){
            case "image/jpg":
                break;
            case "image/png":
                break;
            case "image/jpeg":
                break;
            default:{
                initError();
                testPhoto = false
            }
        }
        var preview = $("#img-preview");
        var reader = new FileReader();
        var image = new Image();
        var photo = this.files[0];

        reader.readAsDataURL(photo);
        reader.onload = function(){
            image.onload = function () {
                if (this.width <= 300 && this.height <= 300 && photo.size <= 5242880) {
                    preview.attr("src", reader.result);
                    $(".img-preview").removeAttr("hidden");
                }else{
                    initError();
                    testPhoto = false
                }
            }
            image.src = reader.result
        }
    })
    function initError(){
        $("#photo-error").attr("hidden", false)
    }
    //счетчик символов
    $("#description").keyup(function(){
        $("#count").text("("+$(this).val().length+"/"+"1000"+")");
    });
    //отправка данных
    $("#submit-form").click(function(event){
        event.preventDefault(); 
        var form = new FormData();
        var bodyFormData = {
            department: 1,
            description: $("#description").val(),
            email: $("#email").val(),
            enquiry_type: $("#enquiry-type").val(),
            subject: $("#subject").val(),
            user_name: $("#name").val()
        }
        for(var key in bodyFormData){
            form.append(key, bodyFormData[key])
        }
        if($("#enquiry-type-other").val !== ""){
            form.delete("enquiry-type");
            form.append("enquiry-type", $("#enquiry-type-other").val())
        }
        if (document.getElementById("add-photo").files[0]){
            form.append("file", document.getElementById("add-photo").files[0])
        }
        fetch("http://504080.com/api/v1/support", {
            method: "POST",
            body: form
        }).then(
            function(response){
                if(response.status === 200){
                    $(".modal").css("display", "flex");
                    console.log(form)
                }
                else if(response.status === 422){
                    $(".error").removeAttr("hidden")
                }
            }
        )
    })
    $(".modal-window-button").click(function(){
        $(".modal").css("display", "none")
    })
})
  

