var main = {};

(function ($) {
    var swiper2;
    var navPosition = '0 0';

    main.init = function () {
        main.initEvent();

        initSwiper();		//配置轮播图

        compatibilityIE();	//样式兼容ie

        lkkued2.caseFun();  // 首页案例动画效果
    };

    main.initEvent = function () {
        /**
         * @desc 智慧营销，tab动画
         */
        $('.nav-list li').hover(function () {
            if ($('.nav-list li').index(this) == 0) {
                $('.nav-list').css('background-position', '0 0');
                $(".product").css("background","url('/images/1/1_29.png')");
            } else if ($('.nav-list li').index(this) == 1) {
                $('.nav-list').css('background-position', '300px 0');
                $(".product").css("background","url('/images/1/1_30.png')");
            } else if ($('.nav-list li').index(this) == 2) {
                $('.nav-list').css('background-position', '600px 0');
                $(".product").css("background","url('/images/1/1_31.png')");
            } else if ($('.nav-list li').index(this) == 3) {
                $('.nav-list').css('background-position', '900px 0');
                $(".product").css("background","url('/images/1/1_32.png')");
            }
        }, function () {
            $('.nav-list').css('background-position', navPosition);
        });

        $('.nav-list li').on('mouseover', function () {
            if ($('.nav-list li').index(this) == 0) {
                navPosition = '0 0';
            } else if ($('.nav-list li').index(this) == 1) {
                navPosition = '300px 0';
            } else if ($('.nav-list li').index(this) == 2) {
                navPosition = '600px 0';
            } else if ($('.nav-list li').index(this) == 3) {
                navPosition = '900px 0';
            }

            $('.product .product-con').hide();

            $('.product .product-con:eq(' + $('.nav-list li').index(this) + ')').show();
        });

        /**
         * @desc 新闻资讯，tab动画
         */
        $(".newsNav li").hover(function() {
            $(this).addClass("active").siblings().removeClass("active");
        });

        $('.newsNav li').on('mouseover', function () {
            $('.news .navLi').hide();

            $('.news .navLi:eq(' + $('.newsNav li').index(this) + ')').show();
        });
    };

    /**
     * @desc 配置轮播图
     */
    function initSwiper() {
        //banner
        new Swiper('.swiper-container', {
            pagination: '.pagination',
            loop: true,
            calculateHeight: true,
            paginationClickable: true,
            autoplayDisableOnInteraction: false,
            autoplay: 5000,
            speed: 900,
        });

        $('.swiper-container').css({
            'opacity': '1',
            'filter': 'alpha(opacity=100)'
        });
    }

    /**
     * @desc 样式兼容ie
     */
    function compatibilityIE() {
        if (navigator.appName == 'Microsoft Internet Explorer' && parseInt(navigator.appVersion.split(/msie/i)[1]) <= 9) {

        }
    }

    /**
     * @desc 首页客户案例动画效果（随着鼠标移动方向）
     */

    var lkkued2 = (function($) {
        var lkkuedFun = {
            caseFun: function() { //首页案例
                var moveFun = function() { //文字框移动
                    var moveTime = 200;
                    var moveIn = function(obj, direction) {
                        switch (direction) {
                            case 0:
                                obj.css({
                                    "top": "-100%",
                                    "left": "0"
                                });
                                break;
                            case 1:
                                obj.css({
                                    "top": "0",
                                    "left": "100%"

                                });
                                break;
                            case 2:
                                obj.css({
                                    "top": "100%",
                                    "left": "0"
                                });
                                break;
                            case 3:
                                obj.css({
                                    "top": "0",
                                    "left": "-100%"
                                });
                                break;
                        }
                        obj.stop().animate({
                            "top": "0",
                            "left": "0"
                        }, moveTime, 'easeOutSine');
                    };
                    var moveOut = function(obj, direction) {
                        switch (direction) {
                            case 0:
                                obj.stop().animate({
                                    "top": "-100%",
                                    "left": "0"
                                }, moveTime, 'easeOutSine');
                                break;
                            case 1:
                                obj.stop().animate({
                                    "top": "0",
                                    "left": "100%"
                                }, moveTime, 'easeOutSine');
                                break;
                            case 2:
                                obj.stop().animate({
                                    "top": "100%",
                                    "left": "0"
                                }, moveTime, 'easeOutSine');
                                break;
                            case 3:
                                obj.stop().animate({
                                    "top": "0",
                                    "left": "-100%"
                                }, moveTime, 'easeOutSine');
                                break;
                        }
                    };

                    $(".case-list .case-item").bind("mouseenter mouseleave", function(e) {
                        var obj = $(this);
                        var objTxt = obj.find(".case-hover");
                        var w = obj.width();
                        var h = obj.height();
                        var x = (e.pageX - this.offsetLeft - (w / 2)) * (w > h ? (h / w) : 1);
                        var y = (e.pageY - this.offsetTop - (h / 2)) * (h > w ? (w / h) : 1);
                        var direction = Math.round((((Math.atan2(y, x) * (180 / Math.PI)) + 180) / 90) + 3) % 4;
                        var eventType = e.type;

                        if (e.type == 'mouseenter') {
                            moveIn(objTxt, direction);
                        } else {
                            moveOut(objTxt, direction);
                        }
                    });
                };
                moveFun();
            }
        };

        return lkkuedFun;
    })(jQuery)

})(jQuery);

window.main = main;