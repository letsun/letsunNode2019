var port = require("../../request/port");

module.exports = function(req, res, next) {
	var resData = {};

	port.navCon()
		//获取导航栏自定义菜单
		.then(function(data) {
			resData.navCon = data;

			return port.commonData();
		})
		//获取标题、侧边栏
		.then(function(data) {
			resData.commonData = data;

			return port.pageCaseList(8);
		})
		// 获取页面相关案例
		.then(function(data) {
			resData.pageCaseList = data.caseList;

			return port.aboutUs();
		})

		//获取关于我们图片
		.then(function(data) {
			resData.aboutUs = data;

			res.render("aboutUs", resData);
		})
};
