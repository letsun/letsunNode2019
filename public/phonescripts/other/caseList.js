//var baseUrl = "http://test-iwsct2.ebiaoji.com/letsun/gw/json/";
// var baseUrl = "http://192.168.1.27:8081/letsun/gw/json/";
var baseUrl = "https://mobile.letsun.com.cn/letsun/gw/json/";

var caseNum; // 总数据量
var type = 1; // type类型 1为 全部案例，2为 智慧营销，3为追踪溯源
var budget; // 预算
var messageList = []; // 留言信息列表

$(function() {

	
	//右上角按钮切换
	$(".header .nav-wra .nav-btn").click(function() {
		$(".header .nav-wra .nav-btn .old-img").toggle();
		$(".header .nav-wra .nav-btn .new-img").toggle();
		$(".header .nav-list").slideToggle();
	})

	// 填写信息关闭按钮
	$('.close-demand').on('click', function() {
		$('.demand-win').hide();
	})
	
	// tab切换
	$('.tab-item').on('click', function() {
		$(this).addClass('active').siblings().removeClass('active');
		let index = $(this).index();
		// console.log(index)
		if(index == 0){
			type = 1;
			init();
		} else if(index == 1){
			type = 2;
			init();
		} else if(index == 2){
			type = 3;
			init();
		} else {
			$('.demand-win').show();
		}
	})
	
	// tab切换
	$('.check-item').on('click', function() {
		
		$(this).addClass('active').siblings().removeClass('active');
		budget = $(this).find('.check-text').html();
	})
	
	// select-item选中留言内容
	$('.select-item').on('click', function() {
		var itemValue = $(this).html();
		
		if($(this).hasClass('multi-active')){
			$(this).removeClass('multi-active');

			for(var i=0;i<messageList.length;i++){
				if(messageList[i] == itemValue) {
					messageList.splice(i, 1);
				}
			}
			// console.log(messageList);
		}else{
			$(this).addClass('multi-active');
			messageList.push(itemValue);
			// console.log(messageList);
		}
		
	})
	
	// 点击提交需求 submit-btn
	$('.submit-btn').on('click', function() {
		let company = $('.company').val();
		let email = $('.email').val();
		let name = $('.name').val();
		let mobile = $('.mobile').val();
		let comment = messageList.join(',');
		console.log(comment)
		
		if(company == ''){
			common.alert({
				content: '请填写您的公司名称',
				mask: true
			});
			return
		} else if(email == ''){
			common.alert({
				content: '请填写您的邮箱',
				mask: true
			});
			return
		} else if(name == ''){
			common.alert({
				content: '请填写您的姓名',
				mask: true
			});
			return
		} else if(mobile == ''){
			common.alert({
				content: '请填写您的电话号码',
				mask: true
			});
			return
		}

		var length = $('.check-item').length;
		for(var i=0;i<length;i++){
			let index = $('.check-item').eq(i).index();
			if($('.check-item').eq(index).hasClass('active')){
				budget = $('.check-item').eq(i).find('.check-text').html();
			}
		}
		
		// 提交需求
		$.ajax({
			url: baseUrl + 'requirementData', // type类型（1为 全部案例，2为 智慧营销，3为追踪溯源）pageIndex 请求页码 num 每页展示数量
			type: 'POST',
			data: {
				name: name,
				mobile: mobile,
				email: email,
				company: company,
				budget: budget,
				comment: comment
			},
			success: function(res) {
				var data = JSON.parse(res);
				if (data.code == 200) {
					common.alert({
						content: '信息提交成功',
						mask: true
					});
					$('.demand-win').hide();
					
					$('.company').val('');
					$('.email').val('');
					$('.name').val('');
					$('.mobile').val('');
					$('.check-item').removeClass('active').eq(0).addClass('active');
					$('.select-item').removeClass('multi-active');
				} else {
					common.alert({
						content: data.msg,
						mask: true
					});
				}
			}
		});
	})

	init();
	// 初始化列表数据
	function init() {
		$('#case-list').html('');
		let page = 1;
		// 初始化数据
		$.ajax({
			url: baseUrl + 'customerCaseList/' + type + '/' + page + '/' + 10, // type类型（1为 全部案例，2为 智慧营销，3为追踪溯源）pageIndex 请求页码 num 每页展示数量
			type: 'GET',
			success: function(res) {
				// console.log(res.result)
				if (res.code === '200') {
					var data = res.result;
					caseNum = data.caseNum;

					render(data.caseList);			
					if (data.caseList.length >= 10) {
						$('#loading').show();
					}

					$('#loadingWrapper').hide();
				} else {
					common.alert({
						content: res.msg,
						mask: true
					});
				}
			}
		});
	}

	var hasNext = true; // 是否有下一页
	var page = 1;

	var scrollWra = new BScroll('#scrollWrapper', {
		scrollbar: {
			fade: true
		},
		click: true,
		pullUpLoad: {
			threshold: 0
		}
	});

	scrollWra.on('pullingUp', () => {
		// if(page * 10 >= caseNum){
		// 	hasNext = false;
		// }
		
		// if (!hasNext) {
		// 	$('#loading').text('已经没有更多了');
		// 	return;
		// }
		// $('#loading').text('正在加载中...');

		page++;
		
		// 拉取数据
		$.ajax({
			url: baseUrl + 'customerCaseList/' + type + '/' + page + '/' + 10, // type类型（1为 全部案例，2为 智慧营销，3为追踪溯源）pageIndex 请求页码 num 每页展示数量
			type: 'GET',
			success: function(res) {
				// console.log(res.result)
				if (res.code === '200') {
					var data = res.result;
					caseNum = data.caseNum;
			
					// hasNext = data.hasNext;
					render(data.caseList);			
					if (data.caseList.length >= 10) {
						$('#loading').show();
					}
		
					$('#loadingWrapper').hide();
				} else {
					common.alert({
						content: res.msg,
						mask: true
					});
				}
			}
		});
		
	});

	/**
	 * 渲染数据
	 * @param  object data 需要的数据
	 * @return null
	 */
	function render(data) {
		var html = '';
		for (var i = 0; i < data.length; i++) {
			html += '<a class="case-item" href="phonecaseDetail.html?id=' + data[i].id + '">'
			html += '	<img class="case-img" src="' + data[i].thumbnail + '" alt="">'
			html += '	<div class="case-title">' + data[i].title + '</div>'
			html += '	<div class="case-dec">'
			html += '		<div class="dec-key">服务内容</div>'
			html += '		<div class="dec-val">' + data[i].serviceDesc + '</div>'
			html += '	</div>'
			html += '</a>'
		}

		$('#case-list').append(html);

		scrollWra.finishPullUp();
		scrollWra.refresh();
	}


    // 返回顶部
    $('#backTop').on('click',function () {
        $(this).hide();
        scrollWra.scrollTo(0,0,1000);
    });

    var height = $(window).innerHeight();
    scrollWra.on('scroll',res=>{
        if (Math.abs(res.y) >= height) {
            $('#backTop').show();
        } else {
            $('#backTop').hide();
        }
    })

});
