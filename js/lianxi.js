'use strict';
var panel = {
    init: function () {
        $('#btn').unbind('click').bind('click', this.toudi);
    },

    toudi: function (selector) {
        var type = common.getQueryString ("type"); 
        var userId= common.getQueryString ("userId"); 
        var url='';
        if(type=='1'){//项目
             url='/probid/addProbid';
           var data ={
               userId: userId,
                bidDetails: $("#financeDetails").val(),
                proId: common.getQueryString ("proId")
            };
        }else{
            url='/finance/addFinance';//资金
            var firmId = common.getQueryString ("firmId");
            var data ={
                userId: userId,
                financeDetails: $("#financeDetails").val(),
                firmId: firmId
            };
               
        }   

        
        $.ajax({
            type: 'post',
            url: urlScope + url,
            data: data,
            xhrFields:{withCredentials:true},
            success: function (data) {
                var json = JSON.parse(data);
                if(json.result=='1'){
                    common.showSuccessTip("投递成功", ".form-add");  
                    common.disabledButton('#btn');
                    window.location.href = './index.html';

                }else{
                    common.showErrorTip(json.message, ".form-add");
                }
               
            },
            error: function () {
                common.showErrorTip('网络错误', ".form-add");
            }
        });



    },

};

$(function () {
    panel.init();
});
