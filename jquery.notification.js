function Notification(){
    "use strict";
};

Notification.prototype.constructor = Notification;
Notification.prototype.callNotification = function(__options__){
    var defaults =
    {
        position : 'top-right'
    };

    if($('.wrapper-notification').length)
    {
        $('.wrapper-notification').remove();
    }

    var _options = $.extend(defaults, __options__);

    this.options = _options;

    var _html = "<div class='wrapper-notification "+_options.class+ " "+_options.position+"'>";
    _html += "<div class='wrapper-notification-inner'><p class='wrapper-notification-text'>"+((_options.text) ? _options.text : '')+"</p></div>";
    _html += "<a class='wrapper-notification-close' href='#'><em class='spt spt-close-white'></em></a>";
    _html += "</div>";

    $('body').append(_html);

    $('.wrapper-notification-close').click(function(){
        $.notification.removeNotification();
        return false;
    });

    $('.wrapper-notification').fadeIn(300);

    if(_options.timerClose)
    {
        this.setTimeOutMessage();
    }
};

Notification.prototype.setTimeOutMessage = function(){
    if(this.options.timerClose){
        var _timer = this.options.timerClose;
        var _timer = setTimeout(function(){ $.notification.removeNotification();},_timer);
        this.timeout = _timer;
    }
};

Notification.prototype.removeNotification = function(__options__){
    clearTimeout(this.timeout);
    this.timeout = null;
    $(".wrapper-notification").stop(true,true).fadeOut(300,function(){
        $(".wrapper-notification").remove();
    });
};

Notification.prototype.changeMessage = function(__options__){
    if($('.wrapper-notification').length)
    {
        clearTimeout(this.timeout);
        this.timeout = null;

        $(".wrapper-notification-text",".wrapper-notification").text(__options__.message);
        this.setTimeOutMessage();
    }
};

$.notification = new Notification();