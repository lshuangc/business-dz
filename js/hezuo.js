'use strict';
var panel = {
    init: function () {
        this.province();
        this.profession();
        $('#publish').unbind('click').bind('click', this.publishProject);
        // $('#profession').unbind('click').bind('click', this.profession);
    },
    province: function () {
        $.ajax({
            type: 'post',
            url: urlScope + "/org/getAllProvinces",
            xhrFields:{withCredentials:true},

            success: function (data) {
                var data = JSON.parse(data);
                if (data.result != '1') {
                    common.showErrorTip(data.message, ".form-add");//
                    return;
                }
                var w = data.object;
                var tag = '';
                for (var i = 0; i < w.length; i++) {
                    tag += '<option value="' + w[i].code + '">' + w[i].name + '</option>';
                }
                $("#province").html(tag);//
            },
            error: function () {
                common.showErrorTip('网络错误', ".form-add");//                
            }
        })
    },

    profession: function () {
        $.ajax({
            type: 'post',
            url: urlScope + "/projects/getAllTrades",
            xhrFields:{withCredentials:true},

            success: function (data) {
                var data = JSON.parse(data);
                if (data.result != '1') {
                    common.showErrorTip(data.message, ".form-add");//
                    return;
                }
                var w = data.object;
                var tag = '';
                for (var i = 0; i < w.length; i++) {
                    tag += '<option value="' + w[i].tradeId + '">' + w[i].tradeName + '</option>';
                }
                $("#profession").html(tag);//
            },
            error: function () {
                common.showErrorTip('网络错误', ".form-add");//                
            }
        });
    },

    publishProject: function () {
        var form = new FormData(document.getElementById("publishForm"));
        if($("#selectFile").val() == "" || $("#name").val() == "" || $("#proMoney").val() == "" || $("#province").val() == "" || $("#profession").val() == "" || $("#describe").val() == "" || $("#proAffix").val() == "" || $("#contactName").val() == "" || $("#contactPhone").val() == ""){
            common.showErrorTip("请填写完整提交", ".form-add");//
            return;
        };
        $.ajax({
            type: 'post',
            url: urlScope + "/projects/add",
            data: form,
            processData: false,
            contentType: false,
            xhrFields:{withCredentials:true},
            beforeSend:function(){
                common.disabledButton("#publish");
            },
            success: function (data) {
                    common.disabledButton("#publish");
                var data = JSON.parse(data);
                if (data.result != '1') {
                    common.showErrorTip(data.message, ".form-add");//
                    return;
                } else {
                    common.showSuccessTip("发布成功", ".form-add");
                    window.location.href = './index.html';
                }
            },
            error: function () {
                common.showErrorTip('网络错误', ".form-add");//                
            }
        });
    }


};
$(function () {
    panel.init();
});
