'use strict';
var panel = {
    init: function () {
        this.reviewCon_detail();
        // $('#project').unbind('click').bind('click', this.project);
    },
    reviewCon_detail: function (selector) {
        $.ajax({
            type: 'post',
            url: urlScope + "/activity/getActivitiesById",
            data: {
                id:common.getQueryString("id") 
            },
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
                // for (var i = 0; i < w.length; i++) {
                    tag += '<div class="media">' +
                        '<h3>' + w.activityName + '</h3>' +
                        '<a class="media-left" href="#">' +
                        '<img src="./img/cp1.jpg" alt="...">' +
                        '</a>' +
                        '<div class="media-body">' +
                        '<p class="describe">' +
                                '活动时间：' + w.activityTime.time + '' +
                                '<br> 负责人：' + w.activityHead + '' +
                                '<br> 负责人联系方式：' + w.activityHeadPhone + '' +
                                '<br> 活动地点：' + w.activityPlace + '' +
                                '<br> 活动参加人数：' + w.activtyPeopleNum   + '人' +
                                '<br> 活动描述：' + w.activityExplain + '' +
                                '<br>' +
                            '</p>'+
                        '</div>' +
                        '</div>';
                // }                
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
