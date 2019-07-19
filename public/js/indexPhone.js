var main = {};

(function ($) {

    var doc = $(document);

    main.init = function () {
        main.initSwiper();

        // 点击头部导航切换
        $('.cate-item').on('click',function () {
            $(this).addClass('active').siblings('.cate-item').removeClass('active');
            var type = $(this).attr('data-type') - 0;
            $('#cate').removeClass('active');
            $('.cate-list').hide();
            $.fn.fullpage.moveTo(type);
        });


        // 点击返回头部
        $('#backTop').on('click',function () {
            $.fn.fullpage.moveTo(0);
        });
    };

    /**
     * @desc 配置全屏滚动插件
     * @func initSwiper
     */
    main.initSwiper = function () {
        $('.wp-inner').fullpage({
            drag: true,
            duration: 300,
            change: function (e) {
                //页面切换时移除前一页的动画
                var current = $(".page" + (e.prev + 1)).find(".ani");
                common.removeAni(current);

                //静止最后一页滑动
                if (e.cur == 4) {
                    $(".page6").find("#mapCon").on("touchmove", function (e) {
                        e.stopPropagation();
                    }, false);
                }

                if (e.cur == 0) {
                    $('#backTop').hide();
                } else {
                    $('#backTop').show();
                }


            },
            afterChange: function (e) {
                var current = $(".page" + (e.cur + 1)).find(".ani");
                common.hideEle();
                common.animate(current);

                if (e.cur == 4) {
                    $(".arrow").hide();
                } else {
                    $(".arrow").show();
                }
            }
        });
    };

})(Zepto);

$(function () {

    // 点击头部导航
    $('#cate').on('click',function () {
        if (!$(this).hasClass('active')) {
            $(this).addClass('active');
            $('.cate-list').slideDown();
        } else {
            $(this).removeClass('active');
            $('.cate-list').slideUp();
        }

    });

    // 点击播放视频
    $('#playBtn').on('click',function () {
        $(this).hide();
        $('.video-poster').hide();
        $('.video').get(0).play();
    });

    // 监听视频播放结束
    $(".video").on("ended",function(){
        $('.playBtn').show();
        $('.video-poster').show();
    });


    // 点击提交联系方式
    $('#form-btn').on('click',function () {
        $(this).addClass('active');
        var companyName = $('#companyName').val();
        var actualName = $('#actualName').val();
        var mobile = $('#mobile').val();
        var demandDetail = $('#demandDetail').val();
        var reg = /^1[0-9]{10}$/;

        if ($.trim(companyName) == '') {
            common.alert({
                mask:true,
                content:'公司名称不能为空',
                ok:function () {
                    $('#form-btn').removeClass('active');
                }
            });

            return;
        }

        if ($.trim(actualName) == '') {
            common.alert({
                mask:true,
                content:'真实姓名不能为空',
                ok:function () {
                    $('#form-btn').removeClass('active');
                }
            });

            return;
        }

        if ($.trim(mobile) == '') {
            common.alert({
                mask:true,
                content:'手机号不能为空',
                ok:function () {
                    $('#form-btn').removeClass('active');
                }
            });

            return;
        }


        if (!reg.test(mobile)) {
            common.alert({
                mask:true,
                content:'手机号格式不正确',
                ok:function () {
                    $('#form-btn').removeClass('active');
                }
            });

            return;
        }

        if ($.trim(demandDetail) == '') {
            common.alert({
                mask:true,
                content:'需求不能为空',
                ok:function () {
                    $('#form-btn').removeClass('active');
                }
            });

            return;
        }

        var url = 'https://mobile.letsun.com.cn/letsun/gw/json/commentData';

        $.ajax({
            type: 'POST',
            url: url,
            data:{
                company: companyName,    // 公司名称
                name: actualName,  // 姓名
                mobile: mobile,     // 手机号
                email: "test@letsun.com.cn",
                comment: demandDetail  // 需求详情
            },
            dataType: "text",
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            success: function (rep) {
                rep = JSON.parse(rep);
                console.log(rep);

                common.alert({
                    mask: true,
                    content: "提交成功!",
                    ok:function () {
                        $('.form').find('input').val('');
                        $('.form').find('textarea').val('');
                        $('#form-btn').removeClass('active');
                    }
                })
            },
            error: function (rep) {
                //callback.apply(this, arguments);
                console.log(rep);
            }
        });
    })
});


