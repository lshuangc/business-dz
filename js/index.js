'use strict';
var panel = {
    init: function () {

        this.project();
        this.money_detail();
//      this.onscroll();
        // $('#talk').unbind('click').bind('click', this.talkMoney);
    },

    project: function (selector) {
        $.ajax({
            type: 'post',
            url: urlScope + "/projects/getProAll",
            // data: {},
            xhrFields:{withCredentials:true},

            success: function (data) {
                // console.log(data);
                var data = JSON.parse(data);
                if (data.result != '1') {
                    common.showErrorTip(data.message, ".form-add");//
                    return;
                }
                var w = data.object;
                var tag = '';
                for (var i = 0; i < w.length; i++) {
                    tag += '<div class="media">' +
                        '<a class="media-left" href="#">' +
                        '<img src="./img/cp1.jpg" alt="...">' +
                        '</a>' +
                        '<div class="media-body">' +
                        '<h5 class="name">' + w[i].proName + '</h5>' +
                        '<span class="describe">' + w[i].proDetails + '</span>' +
                        '<p class="price">[' + w[i].proMoney + ']</p>' +
                        '<p class="price">意向投资：' + w[i].probidCount + '</p>' +
                        '<a  class="btn btn-default" href="project_detail.html?proId=' + w[i].proId + '">查看详情</a>' +
                        '</div>' +
                        '</div>';
                }
                $("#projectList").html(tag);//
            },
            error: function () {
                common.showErrorTip('网络错误', ".form-add");//
            }
        });
    },
    money_detail: function (selector) {
        $.ajax({
            type: 'post',
            url: urlScope + "/firm/findAll",
            // data: {},
            xhrFields:{withCredentials:true},

            success: function (data) {
                // console.log(data);
                var data = JSON.parse(data);
                if (data.result != '1') {
                    common.showErrorTip(data.message, ".form-add");//
                    return;
                }
                var w = data.object;
                var tag = '';
                for (var i = 0; i < w.length; i++) {
                    tag += '<div class="media">' +
                        '<a class="media-left" href="#">' +
                        '<img src="./img/cp2.jpg" alt="...">' +
                        '</a>' +
                        '<div class="media-body">' +
                        '<h5 class="name">' + w[i].firmName + '</h5>' +
                        '<span class="describe">' + w[i].firmDetails + '</span>' +
                        '<a class="btn btn-default"  onclick="isLogin(' + w[i].firmId + ')"  href="javascript:void(0);">立即约谈</a>' +
                        // '<a class="btn btn-default">立即约谈</a>' +
                        '</div>' +
                        '</div>';
                }
                $("#moneyList").html(tag);

            },
            error: function () {
                common.showErrorTip('网络错误', ".form-add");//
            }
        });

    },
    
};

function isLogin(firmId) {//立即约谈
    $.ajax({
        type: 'post',
        url: urlScope + "/auth/isLogin",
        xhrFields:{withCredentials:true},

        success: function (json) {
            var json = JSON.parse(json);
            if (json.result == "1") {//1表示已登录
                window.location.href = './lianxi.html?firmId=' + firmId + '&userId=' + json.object.id + '&type=2';
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
