var main = {};

(function($) {
	main.init = function() {
		main.initPage();

		main.initEvent();
	};

	main.initPage = function () {

		if (navigator.appName == 'Microsoft Internet Explorer' && parseInt(navigator.appVersion.split(/msie/i)[1]) <= 9) {
			$('.missionImg .img').css('opacity', 1).css('filter', 'alpha(opacity=100)').show();
		}

		var mySwiper = new Swiper('.swiper-container', {
			slidesPerView: 6,
			loop: true,
			calculateHeight: true,
			paginationClickable: true,
			autoplay: 2000
		});

		/*new Swiper('.swiper-container', {
		 slidesPerView: 6,
		 loop: true,
		 calculateHeight: true,
		 paginationClickable: true,
		 autoplay: 3000
		 });*/
	};

	main.initEvent = function() {
		/*$(document).on("scroll", function() {
		 var curTop = $(".con2").find(".missionImg").offset().top;
		 var scrollTop = $(window).scrollTop();
		 var visualH = $(window).height();

		 if((scrollTop > curTop - visualH) && (scrollTop < curTop + $(".missionImg").find(".img").height())) {
		 //$(".missionImg").find(".img").css("-webkit-animation","fadeIn 1s").show();
		 common.animate($(".missionImg").find(".img"));
		 }else {
		 //$(".missionImg").find(".img").css("-webkit-animation","none").hide();
		 common.removeAni($(".missionImg").find(".img"));
		 }
		 });*/

		$('.swiper-wrapper').on('click', 'img', function () {
			$('#imgView').empty();
			$(this).clone().appendTo($('#imgView'));
			$('#mask').show().next().show();
		});

		$('#mask').on('click', function () {
			$('#mask').hide().next().hide();
		});
	};

})(jQuery);

window.main = main;