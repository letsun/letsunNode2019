var port = require("../../request/port");

module.exports = function(req, res, next) {
	var resData = {};

	port.commonData()
	//获取标题、侧边栏
		.then(function(data) {
			resData.commonData = data;

			res.render("service", resData);
		})
};
