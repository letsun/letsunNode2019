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

			return port.aboutUs()
		})

		//获取关于我们图片
		.then(function(data) {
			resData.aboutUs = data;

            return port.pageCaseList(2);
		})

        // 获取底部案例
        .then(function (data) {
            resData.pageCaseList = data.caseList;
            res.render("traceBackProduce", resData);
        })
};
