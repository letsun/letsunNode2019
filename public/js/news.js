$(function () {
    var path = window.location.pathname.split('/')[1].split('-')[0];
    var type;
    if (path == 'dynamic') {
        type = 2;
    } else {
        type = 1;
    }

    var curIndex = window.location.pathname.split('-')[1].split('.')[0];
    var url = 'https://mobile.letsun.com.cn/letsun/gw/json/newsSearch/' + type + '/' + curIndex+ '/10';

    var content = decodeURIComponent(decodeURI(GetQueryString('content')));

    if (content != 'null') {
        newsSearch(content);
    }

    // 搜索新闻
    function newsSearch(searchVal) {
        $('.search-wra').addClass('active');
        setTimeout(function () {
            $('.search-wra').removeClass('active');
        },100);
        $.ajax({
            url: url,
            type: 'GET',
            dataType: 'json',
            data:{
                content:searchVal
            },
            success: function(res) {
                $('#paginator-container1').hide();
                var newsList = res.result.newsList;
                var html = '';
                var pagHtml = '';
                var pageTotal = Math.ceil(res.result.newsNum / 10);

                if (newsList.length > 0) {
                    for (var i = 0; i < newsList.length; i++) {
                        html+= '<div class="item">';
                        html+= '<div class="newsImg">';
                        html+= '<img src="'+ newsList[i].thumbnail +'">';
                        html+= '</div>';
                        html+= '<div class="newsRight">';
                        html+= '<div class="title"><a href="/news-'+ path + '-' + newsList[i].id +'.html" target="_blank">'+ newsList[i].title +'</a></div>';
                        html+= '<p class="text">'+ newsList[i].desc +'</p>';
                        html+= '</div>';
                        html+= '<div class="newsView">';
                        html+= '<div class="view">';
                        html+= '<img src="/images/5/5_7.png">';
                        html+= '<span>'+ newsList[i].browseNum +'</span>';
                        html+= '<a href="/news-'+ path + '-' + newsList[i].id +'.html" target="_blank"><img src="/images/5/5_13.png"></a>';
                        html+= '</div>';
                        html+= '<span class="date">'+ newsList[i].publishTime +'</span>';
                        html+= '</div>';
                        html+= '</div>';
                    }

                    $('#newsCon').html(html);

                    var paginatorResult = searchPaginator({
                        total		:	pageTotal,
                        curIndex	:	curIndex
                    });

                    for (var j = 0; j < paginatorResult.length; j++) {
                        if (paginatorResult[j].disabled) {
                            pagHtml += '<li class="li disabled"><a href="' + path + '-' + paginatorResult[j].index + '.html?content=' + encodeURI(encodeURIComponent(searchVal)) + '">' + paginatorResult[j].text + '</a></li>';

                        } else {
                            pagHtml += '<li class="li"><a href="' + path + '-' + paginatorResult[j].index + '.html?content=' + encodeURI(encodeURIComponent(searchVal)) + '">' + paginatorResult[j].text + '</a></li>';
                        }
                    }

                    $('#paginator-container2').show();
                    $('#paginator-container2 .list').html(pagHtml);
                }
            },
            error:function (res) {
                console.log(res);
            }
        });
    }

    // 点击搜索
    $('#form-btn').on('click',function () {
        var searchVal = $.trim($('#searchVal').val());

        newsSearch(searchVal);
    });

    // 监听输入框键盘事件
    $('#searchVal').on('keydown',function (e) {
        if (e.keyCode == 13) {
            var searchVal = $.trim($('#searchVal').val());

            newsSearch(searchVal);
        }
    });
});

/**
 * @desc	传入总分页数、当前页、两边分页数，返回分页数组
 * @param cfg
 * @cfg.total	必填，总分页数
 * @cfg.curIndex	必填，当前分页数
 * @cfg.sideNum	选填，当前页两边展示分页按钮数量，默认为4
 * @returns {*}
 */
function searchPaginator(cfg) {

    //分页数组
    var pagingList;

    //未设置当前页或总页数
    if(!cfg || !cfg.curIndex || !cfg.total){
        return false;
    }

    var curIndex = cfg.curIndex;
    var total = cfg.total;

    //当前页两边展示数量
    var sideNum = cfg.sideNum || cfg.sideNum ? cfg.sideNum : 4;

    //左右分页
    var leftIndex, rightIndex;

    //设置左分页
    if(curIndex > sideNum){
        leftIndex = curIndex - sideNum;
    }else{
        leftIndex = 1;
    }

    //设置右分页
    if(total - curIndex > sideNum){
        rightIndex = Number(curIndex) + Number(sideNum);
    }else{
        rightIndex = total;
    }

    //创建分页数组
    pagingList = new Array(rightIndex - leftIndex + 1);

    //遍历分页数组
    for(var i = 0; i < pagingList.length; i++){
        pagingList[i] = {
            index	:	leftIndex + i,
            text	:	leftIndex + i,
            disabled	:	false
        };

        //将当前页设置为disabled
        if(i == curIndex - leftIndex){
            pagingList[i].disabled = true;
        }
    }

    //左分页大于2时左侧依次增加按钮'...'、'1'、'<'
    if(leftIndex > 2){
        pagingList.unshift({
            index	:	null,
            text	:	'...',
            disabled	:	true
        });

        pagingList.unshift({
            index	:	1,
            text	:	1,
            disabled	:	false
        });

        //设置左箭头页码
        var prevPage = leftIndex - sideNum - 1;

        if(prevPage < 1){
            prevPage = 1;
        }

        pagingList.unshift({
            index	:	prevPage,
            text	:	'<',
            disabled	:	false
        });

        //左分页等于2时不需要'...'按钮
    }else if(leftIndex == 2){
        pagingList.unshift({
            index	:	1,
            text	:	1,
            disabled	:	false
        });

        pagingList.unshift({
            index	:	null,
            text	:	'<',
            disabled	:	true
        });

        //左分页等于1时不需要'...'、'1'按钮
    }else{
        pagingList.unshift({
            index	:	null,
            text	:	'<',
            disabled	:	true
        });
    }

    //右分页小于倒数第二个时右侧依次增加按钮'...'、'total'、'>'
    if(rightIndex < total - 1){
        pagingList.push({
            index	:	null,
            text	:	'...',
            disabled	:	true
        });

        pagingList.push({
            index	:	total,
            text	:	total,
            disabled	:	false
        });

        //设置右箭头页码
        var nextPage = rightIndex + sideNum + 1;

        if(nextPage > total){
            nextPage = total;
        }

        pagingList.push({
            index	:	nextPage,
            text	:	'>',
            disabled	:	false
        });
    }else if(rightIndex == total - 1){

        pagingList.push({
            index	:	total,
            text	:	total,
            disabled	:	false
        });

        pagingList.push({
            index	:	null,
            text	:	'>',
            disabled	:	true
        });
    }else{
        pagingList.push({
            index	:	null,
            text	:	'>',
            disabled	:	true
        });
    }

    return pagingList;
}


function GetQueryString(name) {
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if(r!=null)return  unescape(r[2]); return null;
}



