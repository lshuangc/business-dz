'use strict';
var panel = {
    init: function () {
        // this.province();
        this.activity();
        $('#j_btnAdd').unbind('click').bind('click', this.joinActivity);

    },
    activity: function () {
        $.ajax({
            type: 'post',
            url: urlScope + "/activity/getActivitiesByStatusAndPlatform",
            data: {
                activityStatus: "1",
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
                    // var unixTimestamp = new Date(w[i].activityTime.time);
                    // var commonTime = unixTimestamp.toLocaleString();
                    var time = common.dateFormat(w[i].activityTime.time);
                    tag += '<div class="media">' +
                        '<h3>' + w[i].activityName + '</h3>' +
                        '<a class="media-left" href="#">' +
                        '<img src="./img/p1.jpg" alt="...">' +
                        '</a>' +
                        '<div class="media-body">' +
                        '<p class="describe">' +
                        '活动时间：' + time + '' +
                        '<br> 负责人：' + w[i].activityHead + '' +
                        '<br> 负责人联系方式：' + w[i].activityHeadPhone + '' +
                        '<br> 活动地点：' + w[i].activityPlace + '' +
                        '<br> 活动参加人数：' + w[i].activtyPeopleNum + '' +
                        '<br> 活动描述：' + w[i].activityExplain + '<br>' +
                        '</p>' +
                        '<a id="activity">我要参加</a>' +
                        '</div>' +
                        '</div>';
                }
                $(".recommen-list").html(tag);//


                // 给添加数据按钮绑定单击事件，让添加数据的层展示出来
                $("#activity").click(function () {
                    $("#j_mask").show();
                    $("#j_formAdd").show();
                });
                // 给关闭按钮 绑定事件，隐藏对话框
                $("#j_hideFormAdd").click(function () {
                    hideAddForm();
                });
                // 隐藏添加表单的 弹出层和添加对话框
                function hideAddForm() {
                    // 隐藏弹出层和添加数据表格
                    $("#j_mask").hide();
                    $("#j_formAdd").hide();
                }
            },
            error: function () {
                common.showErrorTip('网络错误', ".form-add");//                
            }
        });
    },

    joinActivity:function(){
        if($("#j_txtLesson").val()=="" ||$("#j_txtBelSch").val()==""){
            return;
        }
        
        $.ajax({
            type: 'post',
            url: urlScope + "/activity/addActivityAttendRecord",
            data: {
                attendName:$("#j_txtLesson").val(),
                attendPhone:$("#j_txtBelSch").val()
            },
            xhrFields:{withCredentials:true},

            success: function (data) {
                var json = JSON.parse(data);
                if(json.result=='1'){
                    window.location.href = './activity.html';
                    common.showSuccessTip("投递成功", ".form-add");  
                    // common.disabledButton('#j_btnAdd');

                }else{
                    common.showErrorTip(json.message, ".form-add");
                }
               
            },
            error: function () {
                common.showErrorTip('网络错误', ".form-add");
            }
        });
    }

};
$(function () {
    panel.init();
});
