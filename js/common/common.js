var common = {
    checkIsNull: function (str) {//判断非空
        return str.replace(/^\s+|\s+$/g, "");
    },

    showErrorTip: function (message, selector) {//错误提示
        var tag = '<div id="tip">' +
            '<span id="x" onclick="yincang()">×</span>' +
            '<strong>' + message + '</strong>' +
            '</div>';
        $(selector).html(tag);
    },

    showSuccessTip: function (message, selector) {//正确提示
        var tag =
            '<div id="tip">' +
            // '<span id="x">×</span>' +
            '<strong>' + message + '</strong>' +
            '</div>';
        $(selector).html(tag);
    },
    disabledButton: function (selector) {//禁用按钮
        $(selector).attr("style", "background: gray;");
        $(selector).attr("disabled", "disabled");
    },
    abledButton: function (selector) {//解除禁用
        $(selector).removeAttr("disabled");
        $(selector).removeAttr("style");
    },
    getQueryString: function (name) {//获取url参数
        var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
        var r = window.location.search.substr(1).match(reg);
        if (r != null) {
            return unescape(r[2]);
        }
        return null;
    },
    
    dateFormat: function (time) {//重写日期格式
        var unixTimestamp = new Date(time);       
        Date.prototype.toLocaleString = function() {
          return this.getFullYear() + "." + (this.getMonth() + 1) + "." + this.getDate() + ". " + this.getHours() + ":" + this.getMinutes();
        };
        var commonTime = unixTimestamp.toLocaleString();
        return commonTime;
    }



};