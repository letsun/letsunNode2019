
'use strict';

window.main = {};

main.init = function () {
	main.initPage();

	main.initEvent();
};
main.initPage = function () {
	new Swiper('.swiper-container', {
		slidesPerView: 5,
		loop: true,
		calculateHeight: true,
		paginationClickable: true,
		autoplay: 3000
	});
};

main.initEvent = function () {

	$('.content').on('click', '.btn', function (e) {
		e.stopPropagation();
	});
};