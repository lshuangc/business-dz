var panel = {
    init: function () {
        // $('.eyeState').unbind('click').bind('click', this.eyeState);//眼睛显示隐藏
        $('#phoneInput').unbind('blur').bind('blur', this.phoneInputCheck);
        $('#passwordInput').unbind('blur').bind('blur', this.passwordInputCheck);
        $('#password2Input').unbind('blur').bind('blur', this.password2InputCheck);
        $('#register').unbind('click').bind('click', this.register);
        common.disabledButton("#register");

    },

    // eyeState:function(){
    // 	$('.eyeshow').toggle();
    // 	$('.eyehide').toggle();
    // },
    phoneInputCheck: function () {
        var regMobile = /^(13[0-9]|14[57]|15[0-9]|17[0-9]|18[0-9])\d{8}$/;
        if (regMobile.test(this.value)) {
            $(".pass1").attr("style", "background:url('./img/pass1.png') no-repeat;width:20px;height:20px;background-size:100% 100%");

        } else {
            $(".pass1").attr("style", "background:url('./img/pass3.png') no-repeat;width:20px;height:20px;background-size:100% 100%");

            return;
        }
        $.ajax({
            url: urlScope + "/user/register",
            type: 'post',
            data: {
                userPhone: $("#phoneInput").val()
            },
            success: function (data) {
                $("#phoneInput").nextAll().remove();
                var data = JSON.parse(data);
                if (data.result == "1") {
                    $("#phoneInput").after('<span class="wrong">用户已存在</span>');
                    common.disabledButton("#register")
                } else {
                    $("#phoneInput").after('<span class="right">号码可注册</span>');

                }
            },
            error: function () {
                common.showErrorTip("网络错误", ".form-add");
            },
        });
    },
    passwordInputCheck: function () {
        if ($("#passwordInput").val() == "") {
            $("#passwordInput").nextAll().remove();
            $(".pass2").attr("style", "background:url('./img/pass3.png') no-repeat;width:20px;height:20px;background-size:100% 100%");
            return;
        } else {
            $(".pass2").attr("style", "background:url('./img/pass1.png') no-repeat;width:20px;height:20px;background-size:100% 100%");


        }


    },
    password2InputCheck: function () {
        if ($("#password2Input").val() == "") {
            $("#password2Input").nextAll().remove();
            $(".pass3").attr("style", "background:url('./img/pass3.png') no-repeat;width:20px;height:20px;background-size:100% 100%");

            return;
        }
        if ($("#passwordInput").val() != $("#password2Input").val()) {
            $("#password2Input").nextAll().remove();
            $("#password2Input").after('<span class="wrong">两次密码不一致</span>');
            $(".pass3").hide();
            return;
        }
        $("#password2Input").nextAll().remove();
        $(".pass3").attr("style", "background:url('./img/pass1.png') no-repeat;width:20px;height:20px;background-size:100% 100%");
        common.abledButton("#register");


    },

    register: function () {

        $.ajax({
            url: urlScope + "/user/register",
            type: 'post',
            data: {
                userPhone: $("#phoneInput").val(),
                userPassWord: $("#passwordInput").val(),
                platformType: "2"
            },
            xhrFields:{withCredentials:true},
            success: function (data) {
                var data = JSON.parse(data);
                if (data.result == "1") {
                    $("#register").attr("disabled", "disabled");
                    common.showSuccessTip("注册成功，将跳转至登录...", ".form-add");
                    window.location.href = './login.html';

                } else {
                    common.showSuccessTip(data.message, ".form-add");
                    return;
                }

            },
            error: function () {
                common.showErrorTip("网络错误", ".form-add");
            },


        });
    },




};

$(function () {
    panel.init();
});