var port = require("../../request/port");

module.exports = function (req, res, next) {
	var path = req.url.split('-')[1].split(".")[0];

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

			return port.pageCaseList(path);
		})
		// 获取页面相关案例
		.then(function(data) {
			resData.pageCaseList = data.caseList;

			return port.planSolution(path);
		})
		// 获取解决方案详情
		.then(function (data) {
			resData.planSolution = data;

			res.render("solution", resData);
		})
};
