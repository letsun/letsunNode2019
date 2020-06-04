var main = {};

//var baseUrl = "http://test-iwsct2.ebiaoji.com/letsun/gw/json/";
// var baseUrl = "http://192.168.1.27:8081/letsun/gw/json/";
var baseUrl = "https://mobile.letsun.com.cn/letsun/gw/json/";

main.url = {
	common: baseUrl + "common",
	banner: baseUrl + "banner",					//首页banner
	navCon: baseUrl + "navCon",                 // 导航栏自定义菜单内容
	caseList: baseUrl + "caseList",				//首页案例详情
    customerCaseList: baseUrl + "customerCaseList/",			// 客户案例列表
    caseDetail: baseUrl + "caseDetail/",		//案例详情页数据
	indexNews: baseUrl + "indexNews/",			//首页新闻
	newsList: baseUrl + "newsList/",			//新闻列表
	newsDetail: baseUrl + "newsDetail/",		//新闻详情
    newsSearch: baseUrl + "newsSearch/",		//搜索新闻
	aboutUs: baseUrl + "aboutUs",				//关于我们页面公司资质和团队风采图片
	planSolution: baseUrl + "planSolution/",    //解决方案菜单详情
	correlateCase: baseUrl + "correlateCase/",
	commentData: baseUrl + "commentData",
	customerData: baseUrl + "customerData",
    pageCaseList: baseUrl + "pageCaseList/"     // 获取页面底部相关案例
};

module.exports = main;