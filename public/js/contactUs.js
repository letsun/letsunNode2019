var main = {};

main.init = function () {
	main.initPage();

	main.initEvent();
};

main.initPage = function () {

	common._placeholder($('._placeholder'));
	$(".img1").css("-webkit-animation","flipInY 1s").show();

	setTimeout(function() {
		$(".img2").css("-webkit-animation","flipInY 1s").show();
	},500);

	setTimeout(function() {
		$(".img3").css("-webkit-animation","flipInY 1s").show();
	},1000);

	setTimeout(function() {
		$(".img4").css("-webkit-animation","flipInY 1s").show();
	},1500);

};

main.initEvent = function () {

	$('#submit').on('click', function () {
		if($.trim($('#name').val()) == "") {
			alert("请输入姓名");
			return false;
		}

		if($.trim($('#phone').val()) == "") {
			alert("请输入电话");
			return false;
		}

		if($.trim($('#email').val()) == "") {
			alert("请输入邮箱");
			return false;
		}

		if($.trim($('#company').val()) == "") {
			alert("请输入公司名称");
			return false;
		}

		$.ajax({
			type: "POST",
			data: {
				name	:	$('#name').val(),
				mobile	:	$('#phone').val(),
				email	:	$('#email').val(),
				company	:	$('#company').val(),
				comment	:	$('._placeholder').val()
			},
			url: common.cfg.commentData,
			dataType: "text",
			contentType: "application/x-www-form-urlencoded; charset=UTF-8",
			success: function (rep) {
				alert("提交成功");
			},
			error: function (rep) {
				//callback.apply(this, arguments);
				alert("提交失败");
			}
		});
	})
};

window.main = main;