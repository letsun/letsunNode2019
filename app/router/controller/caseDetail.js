var port = require("../../request/port");

module.exports = function(req, res, next) {
    var resData = {};

    var path = req.url.split('-')[1];
    var id = path.split('.')[0];

    port.navCon()
        //获取导航栏自定义菜单
        .then(function(data) {
            resData.navCon = data;

            return port.commonData();
        })
        //获取标题、侧边栏
        .then(function(data) {
            resData.commonData = data;

            return port.caseDetail(id);
        })

        //获取案例详情
        .then(function(data) {
            resData.caseDetail = data;

            res.render("caseDetail", resData);
        })

};