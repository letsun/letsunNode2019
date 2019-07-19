var port = require("../../request/port");

module.exports = function (req, res, next) {

	var path = req.url.split('-');
	var numType;

	var resData = {};

	resData.type = path[1];

	path[1] = path[1] ? path[1] : "dynamic";   //类型
	/* 判断类型 */
	if(resData.type == "dynamic") {
		numType = 2;
	}else if(resData.type == "companyNews") {
		numType = 1;
	}

	var articleId = path[2].split(".")[0]; //新闻id

	port.navCon()
		//获取导航栏自定义菜单
		.then(function(data) {
			resData.navCon = data;

			return port.commonData();
		})
		//获取标题、侧边栏
		.then(function (data) {
			resData.commonData = data;

			return port.newsDetail(articleId);
		})
        //获取详情
        .then(function (data) {
            resData.newsDetail = data;
            res.render("newsDetail", resData);
        })
};