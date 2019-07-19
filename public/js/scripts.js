var main = {};
var music = new Audio();

(function ($) {
    main.init = function () {
        main.initSwiper();
        main.initEvent();
    };

    main.initEvent = function () {
        /**
         * 音乐播放事件
         */
        music.addEventListener('playing' ,function (e) {
            $('#musicBtn').removeClass('pause');
        });

        /**
         * @desc 音乐暂停事件
         */
        music.addEventListener('pause' ,function (e) {
            $('#musicBtn').addClass('pause');
        });

        /**
         * @desc 点击音乐按钮，控制音乐暂停和播放
         */
        $("#musicBtn").on("tap", function () {
            if ($(this).hasClass("pause")) {
                music.play();
            }
            else {
                music.pause();
            }
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
            },
            afterChange: function (e) {
                //最后一页去除上滑提示箭头
                if (e.cur == 4) {
                    $(".start").hide();
                    $(".bb").hide();
                } else {
                    $(".start").show();
                    $(".bb").show();
                }

                var current = $(".page" + (e.cur + 1)).find(".ani");
                common.hideEle();
                common.animate(current);
            }
        });
    };

    main.initMusic = function (cfg) {
        var loop = cfg.loop || true;
        var autoplay = cfg.autoplay || true;

        music.src = cfg.url;
        music.loop = loop;
        music.autoplay = autoplay;

        music.load();
    }
})(Zepto);

window.main = main;