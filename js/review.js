'use strict';
var panel = {
    init: function () {
        // this.province();
        this.activity();
        // $('#j_btnAdd').unbind('click').bind('click', this.joinActivity);
    },
    activity: function () {
        $.ajax({
            type: 'post',
            url: urlScope + "/activity/getActivitiesByStatusAndPlatform",
            data: {
                activityStatus: "0",
                activityPlatform: "2"
            },
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
                    var time = common.dateFormat(w[i].activityTime.time);
                    tag += '<div class="media">' +
                        '<a class="media-left" href="./reviewCon.html?id='+w[i].id+'">' +
                        '<img src="./img/p1.jpg" alt="...">' +
                        '</a>' +
                        '<div class="media-body">' +
                        '<h5 class="name">' + w[i].activityName + '</h5>' +
                        '<p class="price">时间：' +time + '</p>' +
                        '<p class="price">地点：' + w[i].activityName + '</p>' +
                        '<p class="price">参与人数：' + w[i].activityName + '人</p>' +
                        '<span class="describe"> 意义阐述：' + w[i].activityName + '<br>' +
                        '</span>' +
                        // '<a  class="btn btn-default" href="./project_detail.html?proId=' + w[i].proId + '">我要反馈</a>' +
                        '</div>' +
                        '</div>';
                }
                $(".recommen-list").html(tag);//
            },
            error: function () {
                common.showErrorTip('网络错误', ".form-add");//                
            }
        });
    },



};
$(function () {
    panel.init();
});
