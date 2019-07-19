var port = require("../../request/port");
var paginator = require('./paginator');

module.exports = function (req, res, next) {

    var path = req.url.split('/')[1];
    var resData = {};
    var listNum = 10;	//列表数量

    resData.type = path.split('-')[0];

    var type;
    var id;
    /* 判断类型 */
    if(resData.type == "dynamic") {
        type = 2;
        id = 13;
    }else if(resData.type == "companyNews") {
        type = 1;
        id = 12;
    }

    port.navCon()
        //获取导航栏自定义菜单
        .then(function(data) {
            resData.navCon = data;

            return port.commonData();
        })
        //获取标题、侧边栏
        .then(function (data) {
            resData.commonData = data;

            return port.newsList([type, path.split('-')[1].split('.')[0], listNum]);
        })
        //获取标题、侧边栏
        .then(function (data) {
            resData.newsList = data;

            resData.pageTotal = Math.ceil(data.newsNum / listNum);
            resData.curIndex = path.split('-')[1].split('.')[0];

            resData.paginator = new paginator({
                total		:	resData.pageTotal,
                curIndex	:	resData.curIndex
            });

            return port.pageCaseList(id);
        })
        .then(function (data) {
            resData.pageCaseList = data.caseList;
            res.render("news", resData);
        })
};