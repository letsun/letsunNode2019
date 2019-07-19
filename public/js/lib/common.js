window.common = {};

var timer = [];

(function ($) {
	/**
	 * @desc 接口地址
	 */
	//var baseUrl= "http://m.letsun.com.cn/letsun/gw/json/";
	var baseUrl= "https://mobile.letsun.com.cn/letsun/gw/json/";

	common.cfg = {
		common			:	baseUrl + "common",
		banner			:	baseUrl + "banner",
		caseList		:	baseUrl + "caseList",
		indexNews		:	baseUrl + "indexNews",
		newsList		:	baseUrl + "newsList/",
		newsDetail		:	baseUrl + "newsDetail/",
		aboutUs			:	baseUrl + "aboutUs",
		caseDetail		:	baseUrl + "caseDetail/",
		correlateCase	:	baseUrl + "correlateCase/",
		commentData		:	baseUrl + "commentData",
		requirementData	:	baseUrl + "requirementData",
		customerData	:	baseUrl + "customerData"
	};

	common.str = {
		more:	"上滑加载更多",
		noMore:  "没有更多数据了"
	};

	/**
	 * @func getData
	 * @desc 异步获取数据
	 * @param {string} url 异步请求的地址
	 * @param {object} data 请求的参数
	 * @param {function} callback 回调函数
	 * @returns {boolean}
	 * @example
	 * Common.getData("/test",“{}”,function(data){})
	 */
	common.getData = function (url, data, callback) {
		$.ajax({
			type: "GET",
			data: data,
			url: url,
			dataType: "text",
			contentType: "application/x-www-form-urlencoded; charset=UTF-8",
			success: function (rep) {
				rep = JSON.parse(rep);
				callback.apply(this, arguments);
			},
			error: function (rep) {
				callback.apply(this, arguments);
			}
		});
	};

	/**
	 * @func GetUrlString
	 * @desc 获取url传的值
	 * @param {string} name 需要获取的字段名
	 */
	common.getUrlString = function (name) {
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
		var str = window.location.search.substr(1).match(reg);
		if (str) {
			return str[2];
		}
		else {
			return null;
		}
	};

	/**
	 * @func renderHtml
	 * @desc 将tmpl插入到container里
	 * @param {string} tmpl 模板生成的html字符串
	 * @param {string} container 选择器
	 */
	common.renderHtml = function(tmpl,container){
		var containerEl = $(container);
		return $(containerEl).append(tmpl);
	};

	/**
	 * @func requireTmpl
	 * @desc 获取模板
	 * @param {string} tmpl 模板名称
	 * @param {function} cb 回调函数
	 * @example
	 *  Common.requireTmpl('test',function(tmpl){
     *       Common.render({
     *           context:'#testtpml',
     *           data:{name:"xjc"},
     *           tmpl:tmpl
     *       })
     *   })
	 */
	common.requireTmpl = function(tmpl, cb) {
		var url = '../tpl/' + tmpl.replace(/\./g, '/') + '.html';
		$.ajax({
			type: "GET",
			url: url,
			dataType: "text",
			success: function(rep) {
				return cb && cb(rep);
			}
		});

	};

	/**
	 * @func render
	 * @desc 页面渲染
	 * @param {object} cfg
	 * @param {object} cfg.tmpl dotjs的模板对象
	 * @param {object} cfg.data 渲染模板所需要数据
	 * @param {string} cfg.container 渲染的模板将被插入的容器选择器
	 * @param {boolean} cfg.overwrite 是否清空容器原有内容 默认不清空
	 * @param {boolean} cfg.append 是否在末尾添加
	 * @param {function} cfg.callback 渲染完成的回调方法
	 * @example
	 * common.render(cfg);
	 */
	common.render = function(cfg) {
		var self = this,
			_data = cfg.data,
			dom = '',
			container = cfg.container,
			callback = cfg.callback,
			_tmpl;

		if(typeof cfg.tmpl == "string")
			_tmpl = doT.template(cfg.tmpl);
		else
			_tmpl = doT.template($(cfg.tmpl).html());

		if (cfg.overwrite) {
			$(container).empty();
		}
		if (_tmpl) {
			dom = self.renderHtml($.trim(_tmpl(_data)), container);
		} else {
			console.log("对应的模块不存在!");
		}
		callback && callback.call(this, {
			data: _data,
			dom: dom
		});

	};

	/**
	 * @desc 隐藏动画元素
	 * @func common.hideEle()
	 */
	common.hideEle = function () {
		$(".ani").hide();
	};

	/**
	 * @desc 添加动画
	 * @func common.animate()
	 * @param ele {object} 需要添加动画的元素
	 */
	common.animate = function (ele) {
		var num = 0;
		ele.each(function () {
			var self = $(this);
			timer[num] = setTimeout(function () {
				self.show();
				self.css({
					"-webkit-animation": self.data("animate"),
					"-moz-animation": self.data("animate"),
					"-ms-animation": self.data("animate"),
					"-o-animation": self.data("animate")
				});
			}, self.data("delay"));
			num++;
		});
	};

	/**
	 * @desc 移除动画
	 * @func common.removeAni()
	 * @param ele {object} 需要移除动画的元素
	 */
	common.removeAni = function (ele) {
		for (var i = 0; i < timer.length; i++) {
			clearTimeout(timer[i]);
		}
		ele.hide();
		ele.each(function () {
			var self = $(this);

			self.css({
				"-webkit-animation": "none",
				"-moz-animation": "none",
				"-ms-animation": "none",
				"-o-animation": "none"
			});
		});
	};

	common._placeholder = function (ele) {
		$(ele).each(function () {
			if (navigator.appName == 'Microsoft Internet Explorer' && parseInt(navigator.appVersion.split(/msie/i)[1]) <= 9) {
				$(this).val($(this).attr('placeholder'))
					.on('focus', function () {
						if ($(this).val() == $(this).attr('placeholder'))
							$(this).select();
					})
					.on('blur', function () {
						if (!$(this).val())
							$(this).val($(this).attr('placeholder'));
					});
			}
		});
	}

})(jQuery);

