var port = require("../../request/port");

module.exports = function (req, res, next) {
	var resData = {};

	port.navCon()
		//获取导航栏自定义菜单
		.then(function(data) {
			resData.navCon = data;

			return port.commonData();
		})
		//获取标题、侧边栏
		.then(function (data) {
			resData.commonData = data;

			return port.banner();
		})
		//获取banner
		.then(function (data) {
			resData.banner = data;

			return port.caseList();
		})

		//获取精品精品案例列表
		.then(function (data) {
			resData.caseList = data;

			return port.indexNews1();
		})

		//获取首页公司新闻
		.then(function (data) {
			resData.indexNews1 = data;
			resData.indexNews1.type = 1;

			return port.indexNews2();
		})

		//获取首页行业动态
		.then(function (data) {
			resData.indexNews2 = data;
			resData.indexNews2.type = 2;

			res.render("index", resData);
		});
};