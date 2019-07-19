var request = require("request");
var api = require("./api");

var main = {};

/**
 * @desc 获取标题、友情链接、侧边栏
 * 返回数据格式
 * {
 *     title: "",
 *     qq: "",
 *     phone: "",
 *     codeImg: "",
 *     companyPartner: [
 *         {companyName: "", url: ""}
 *     ]
 * }
 */
main.commonData = function () {
    return new Promise(function (resolve, reject) {
        var url = api.url.common;

        request({url: url, json: true}, function (err, res, data) {
            if (err || data.code != 200) {
                reject();
                return;
            }

            resolve(data.result);
        });
    });
};

/**
 * @desc 获取首页banner图片
 * 返回数据格式
 * [{
 *     imgUrl: "",
 *     url: ""
 * }]
 */
main.banner = function () {
    return new Promise(function (resolve, reject) {
        var url = api.url.banner;

        request({url: url, json: true}, function (err, res, data) {
            //获取数据失败
            if (err || data.code != 200) {
                reject();
                return;
            }

            resolve(data.result.homeImgList);
        });
    });
};

/**
 * @desc 获取导航栏自定义菜单内容
 * 返回数据格式
 */
main.navCon = function() {
    return new Promise(function (resolve, reject) {
        var url = api.url.navCon;

        request({url: url, json: true}, function (err, res, data) {
            if (err || data.code != 200) {
                reject();
                return;
            }

            resolve(data.result);
        });
    });
};


/**
 * @desc 获取首页案例列表
 * 返回数据格式
 * [{
 *     id: 1,
 *     title: "",
 *     caseUrl: "",
 *     imgUrl: "",
 *     indexDescription: ""
 * }]
 */
main.caseList = function () {
    return new Promise(function (resolve, reject) {
        var url = api.url.caseList;

        request({url: url, json: true}, function (err, res, data) {
            if (err || data.code != 200) {
                reject();
                return;
            }

            resolve(data.result.caseList);
        });
    });
};

/**
 * @desc 获取案例列表
 */
main.customerCaseList = function (path) {
    return new Promise(function (resolve, reject) {
        var url = api.url.customerCaseList + path.join('/');

        request({url: url, json: true}, function (err, res, data) {
            if (err || data.code != 200) {
                reject();
                return;
            }

            resolve(data.result);
        });
    });
};

main.caseDetail = function(id) {
    return new Promise(function(resolve, reject) {
        var url = api.url.caseDetail + id;

        request({url: url, json: true},function(err, res, data) {
            if(err || data.code != 200) {
                reject();
                return;
            }

            resolve(data.result);
        })
    });
};

/**
 * @desc 获取关于我们页面图片
 * 返回数据格式
 * [{
 *      honorImgList: [imgUrl1, imgUrl2, imgUrl3],
 *      styleImgList: [imgUrl1, imgUrl2, imgUrl3]
 * }]
 */
main.aboutUs = function() {
    return new Promise(function(resolve, reject) {
        var url = api.url.aboutUs;

        request({url: url, json: true},function(err, res, data) {
            if (err || data.code != 200) {
                reject();
                return;
            }

            resolve(data.result);
        })
    });
};

/**
 * @desc 获取案例详情数据
 * 返回数据格式
 * [
 * case:{
 *      serverContent: "",
 *		title:  "",
 *      detail:  "",
 *      prevId:  "",
 *      nextId:  ""
 * },
 * correlateCase: [{
 *      id: "",
 *      imgUrl: ""
 * }]
 * ]
 */

/**
 * @desc 获取解决方案详情数据
 * 返回数据格式
 */
main.planSolution = function (id) {
    return new Promise(function (resolve, reject) {
        var url = api.url.planSolution + id;

        request({url: url, json: true}, function (err, res, data) {
            if (err || data.code != 200) {
                reject();
                return;
            }

            resolve(data.result);
        });
    });
};

/**
 * @desc 获取首页首页公司新闻
 * 返回数据格式
 * {
 *      hotNews:
 *      {
 *          id			:	id,
 *          thumbnail	:	url,
 *          title			:	title,
 *          publishTime	:	publishTime,
 *          browseNum	:	browseNum,
 *          content		:	content
 *      },
 *      newsList	:	[
 *          {
 *              id			:	id1,
 *              thumbnail	:	url1,
 *              title			:	title1,
 *              publishTime	:	publishTime1,
 *              browseNum	:	browseNum1,
 *              content		:	content1
 *          }
 *      ]
 * }
 */
main.indexNews1 = function () {
    return new Promise(function (resolve, reject) {
        var url = api.url.indexNews + '1';

        request({url: url, json: true}, function (err, res, data) {
            if (err || data.code != 200) {
                reject();
                return;
            }

            resolve(data.result);
        });
    });
};

/**
 * @desc 获取首页首页行业动态
 * 返回数据格式
 * {
 *      hotNews:
 *      {
 *          id			:	id,
 *          thumbnail	:	url,
 *          title			:	title,
 *          publishTime	:	publishTime,
 *          browseNum	:	browseNum,
 *          content		:	content
 *      },
 *      newsList	:	[
 *          {
 *              id			:	id1,
 *              thumbnail	:	url1,
 *              title			:	title1,
 *              publishTime	:	publishTime1,
 *              browseNum	:	browseNum1,
 *              content		:	content1
 *          }
 *      ]
 * }
 */
main.indexNews2 = function () {
    return new Promise(function (resolve, reject) {
        var url = api.url.indexNews + '2';

        request({url: url, json: true}, function (err, res, data) {
            if (err || data.code != 200) {
                reject();
                return;
            }

            resolve(data.result);
        });
    });
};

/**
 * @desc 获取新闻列表
 * 返回数据格式
 */
main.newsList = function (path) {
	return new Promise(function (resolve, reject) {
		var url = api.url.newsList + path.join('/');

		request({url: url, json: true}, function (err, res, data) {
			if (err || data.code != 200) {
				reject();
				return;
			}

			resolve(data.result);
		});
	});
};

/**
 * @desc 获取新闻详情
 * 返回数据格式
 */
main.newsDetail = function (id) {
	return new Promise(function (resolve, reject) {
		var url = api.url.newsDetail + id;

		request({url: url, json: true}, function (err, res, data) {
			if (err || data.code != 200) {
				reject();
				return;
			}

			resolve(data.result);
		});
	});
};

/**
 * @desc 获取页面底部相关案例
 * 返回数据格式
 */
main.pageCaseList = function (id) {
    return new Promise(function (resolve, reject) {
        var url = api.url.pageCaseList + id;

        request({url: url, json: true}, function (err, res, data) {
            if (err || data.code != 200) {
                reject();
                return;
            }

            resolve(data.result);
        });
    });
};

module.exports = main;