
'use strict';

var panel = {
    init: function () {
        this.project_detail(".fuwuhao");
        // $('#project').unbind('click').bind('click', this.project);
    },
    project_detail: function (selector) {
        $.ajax({
            type: 'post',
            url: urlScope + "/projects/findByProId",
            data: { proId: common.getQueryString("proId") },
            xhrFields:{withCredentials:true},
            success: function (data) {
                // console.log(data);
                var data = JSON.parse(data);
                if (data.result != '1') {
                    common.showErrorTip(data.message, ".form-add");//
                    return;
                }
                var w = data.object;
                var tag = '<header>' +
                    '<a href="./index.html" class="icon_back"></a>' +
                    '<p>找项目</p>' +
                    '</header>' +
                    '<section id="recommen">' +
                    '<div class="recommen-list">' +
                    '<form method="POST" enctype="multipart/form-data" id="project-detail">';
                for (var i = 0; i < w.length; i++) {

                    tag += '<div class="media">' +
                        '<h3>项目名称: <span>' + w[i].proName + '</span></h3>' +
                        '<input type="hidden" name="userId">' +
                        '<input type="hidden" name="proId">' +
                        '<a class="media-left" href="#">' +
                        '<img src="./img/cp1.jpg" alt="...">' +
                        '</a>' +
                        '<div class="media-body">' +
                        '<h5 class="price">融资目标：' + w[i].proMoney + '</h5>' +
                        '<h5 class="price">意向投标：' + w[i].probidCount + ' </h5>' +
                        '<h4>项目资料:</h4>&nbsp&nbsp&nbsp&nbsp <span>' + w[i].proDetails + '</span><br>' +
                        '</div>' +
                        '</div>';
                }
                tag += '</form>' +
                    '</div>' +

                    '</section>' +

                    '<footer>' +
                    '<a cate="2" onclick="isLogin('+w[0].proId+')" href="javascript:void(0);" class="td_btn toudi tekan_toudi">立即约谈</a>' +
                    '</footer>';
                $(selector).html(tag);//
            },
            error: function () {
                common.showErrorTip('网络错误', ".form-add");//
            }
        })
    },

};


function isLogin(proId) {//立即约谈
    $.ajax({
        type: 'post',
        url: urlScope + "/auth/isLogin",
        // data: {"result": "1"},
        xhrFields:{withCredentials:true}, 
        success: function (json) {
            var json = JSON.parse(json);
            if (json.result == "1") {//1表示已登录
                window.location.href = './lianxi.html?proId=' + proId + '&userId=' + json.object.id + '&type=1';
            } else {//这里你可以插入跳转至登陆页面的代码
                window.location.href = './login.html';
            }
        },
        error: function () {
            common.showErrorTip("网络错误", ".form-add");
        },
    });
}
$(function () {
    panel.init();
});
