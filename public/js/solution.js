var main = {};

(function ($) {
    var swiper;

    main.init = function () {
        main.initEvent();

        initSwiper();		//配置轮播图
    };

    main.initEvent = function () {
        $('.icon-box').on('click', '.prev', function () {
            swiper.swipePrev();
        });

        $('.icon-box').on('click', '.next', function () {
            swiper.swipeNext();
        });
    };

    /**
     * @desc 配置轮播图
     */
    function initSwiper() {
        swiper = new Swiper('.swiper-container', {
            slidesPerView: 7,
            loop: false,
            calculateHeight: true,
            paginationClickable: true
        });
    }
})(jQuery);

window.main = main;