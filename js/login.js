var panel = {
    init: function () {
        // $('.eyeState').unbind('click').bind('click',this.eyeState);//眼睛显示隐藏
        $('#phoneInput').unbind('blur').bind('blur', this.phoneInputCheck);
        $('#passwordInput').unbind('blur').bind('blur',this.passwordInputCheck);
        $('#login').unbind('click').bind('click', this.login);
        common.disabledButton("#login");

    },

    // eyeState:function(){
    // 	$('.eyeshow').toggle();
    // 	$('.eyehide').toggle();
    // },
    phoneInputCheck: function () {
        var regMobile = /^(13[0-9]|14[57]|15[0-9]|17[0-9]|18[0-9])\d{8}$/;
        if (regMobile.test(this.value)) {
            $(".pass1").attr("style","background:url('./img/pass1.png') no-repeat;width:20px;height:20px;background-size:100% 100%");
            
        }else {
            $(".pass1").attr("style","background:url('./img/pass3.png') no-repeat;width:20px;height:20px;background-size:100% 100%");
            
             return;
        }

    },
    passwordInputCheck: function () {
        if ($("#passwordInput").val() == "") {
            $("#passwordInput").nextAll().remove();
            $(".pass2").attr("style","background:url('./img/pass3.png') no-repeat;width:20px;height:20px;background-size:100% 100%");
            return;
        }else{
            $(".pass2").attr("style","background:url('./img/pass1.png') no-repeat;width:20px;height:20px;background-size:100% 100%");
            
            
        }
        $(".pass3").attr("style","background:url('./img/pass1.png') no-repeat;width:20px;height:20px;background-size:100% 100%");
        common.abledButton("#login");

    },
    login: function () {
        $.ajax({
            url: urlScope + "/user/login",
            type: 'post',
            data: {
                userPhone: $("#phoneInput").val(),
                userPassWord: $("#passwordInput").val()
            },
            xhrFields:{withCredentials:true},
            success: function (data) {
                var data = JSON.parse(data);
                if (data.result != "1") {
                    common.showErrorTip(data.message, ".form-add");
                    return;
                }

                window.location.href = "./index.html";
            },
            error: function () {
                common.showErrorTip("网络错误",".form-add");
            },


        });
    }


};

$(function () {
    panel.init();
});