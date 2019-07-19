var port = require("../../request/port");
var paginator = require('./paginator');

module.exports = function (req, res, next) {

    var path = req.url.split('/')[1];
    var resData = {};
    var listNum = 16;	//列表数量

    resData.type = path.split('-')[0];

    var type;
    var id;
    /* 判断类型 */
    if (resData.type == "allCase") {
        type = 1;
    } else if (resData.type == "wisdomCase") {
        type = 2;
    } else {
        type = 3;
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
            return port.customerCaseList([type, path.split('-')[1].split('.')[0], listNum]);
        })

        //获取案例
        .then(function (data) {
            resData.caseList = data.caseList;

            resData.pageTotal = Math.ceil(data.caseNum / listNum);
            resData.curIndex = path.split('-')[1].split('.')[0];

            resData.paginator = new paginator({
                total		:	resData.pageTotal,
                curIndex	:	resData.curIndex
            });

            res.render("case", resData);
        })
};