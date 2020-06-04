/**
 * Created by qiu on 2017/3/1.
 */
var express = require("express");

var index = require("./controller/index");
var news = require("./controller/news");                /* 新闻列表 */
var newsDetail = require("./controller/newsDetail");    /* 新闻详情 */
var solution = require("./controller/solution");        /* 解决方案 */
var aboutUs = require("./controller/aboutUs");          /* 关于我们 */
var contactUs = require("./controller/contactUs");      /* 联系我们 */
var customer = require("./controller/customer");    /* 客户专享 */
var smartMarketing = require("./controller/smartMarketing");    /* 智慧营销 */
var merchants = require("./controller/merchants");    /* 招商 */
var Case = require("./controller/case");     /*案例*/
var caseDetail = require("./controller/caseDetail");  /*案例详情*/
var traceBack = require("./controller/traceBack");  /*追溯*/
var traceBackProduce = require("./controller/traceBackProduce");  /*追溯-生产追溯*/
var traceBackChannel = require("./controller/traceBackChannel");  /*追溯-渠道流通*/
var traceBackPickUp = require("./controller/traceBackPickUp");  /*追溯-防窜货*/


var router = express.Router();

router.get("/", index);

/* 手机端页面 */
router.get("/phoneaboutUs.html", function(req, res) {
	res.render("phoneaboutUs");
});

router.get("/phonecaseDetail.html", function(req, res) {
    res.render("phonecaseDetail");
});

router.get("/phonecaseList.html", function(req, res) {
    res.render("phonecaseList");
});

router.get("/phoneewmzs.html", function(req, res) {
    res.render("phoneewmzs");
});

router.get("/phonefch.html", function(req, res) {
    res.render("phonefch");
});

router.get("/phoneindex.html", function(req, res) {
    res.render("phoneindex");
});

router.get("/phonenews.html", function(req, res) {
    res.render("phonenews");
});

router.get("/phonenewsDetail.html", function(req, res) {
    res.render("phonenewsDetail");
});

router.get("/phoneqdlt.html", function(req, res) {
    res.render("phoneqdlt");
});

router.get("/phonesczs.html", function(req, res) {
    res.render("phonesczs");
});

router.get("/phonesolution.html", function(req, res) {
    res.render("phonesolution");
});

router.get("/phonezhyx.html", function(req, res) {
    res.render("phonezhyx");
});


/* 新闻列表 */
router.get("/dynamic-*.html", news);
router.get("/companyNews-*.html", news);

/* 新闻详情 */
router.get("/news-dynamic-*.html", newsDetail);
router.get("/news-companyNews-*.html", newsDetail);

/* 解决方案 */
router.get("/solution-*.html", solution);

/* 关于我们 */
router.get("/aboutUs.html", aboutUs);

/* 联系我们 */
router.get("/contactUs.html", contactUs);

/* 客户专享 */
router.get("/customer.html",customer);

/* 智慧营销 */
router.get("/smartMarketing.html",smartMarketing);

/* 案例 */
router.get("/allCase-*", Case);  // 全部案例
router.get("/wisdomCase-*", Case);    // 智慧营销
router.get("/traceCase-*", Case);    // 追踪溯源

/* 案例详情 */
router.get("/caseDetail-*.html", caseDetail);

/* 追溯系统 */
router.get("/traceBack.html", traceBack);

/* 生产追溯 */
router.get("/traceBackProduce.html", traceBackProduce);

/* 渠道流通 */
router.get("/traceBackChannel.html", traceBackChannel);

/* 防窜货 */
router.get("/traceBackPickUp.html", traceBackPickUp);

/* 招商 */
router.get("/merchants.html",merchants);

module.exports = router;