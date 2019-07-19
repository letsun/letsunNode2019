var main = {};

main.init = function () {
    //main.initPage();

    main.initEvent();
};

main.initPage = function () {

    //common._placeholder($('#suggestion'));

};

main.initEvent = function () {

    $('.submit-btn').on('click', function () {
        var sugVal = $('#suggestion').val();
        if($.trim(sugVal) == "") {
            alert("麻烦输入点意见呗~");
            return false;
        }

        $.ajax({
            type: "POST",
            data: {
                comment	:	$('#suggestion').val()
            },
            url: common.cfg.customerData,
            dataType: "text",
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            success: function (rep) {
                rep = JSON.parse(rep);
                console.log(rep);
                alert(rep.msg);
            },
            error: function (rep) {
                //callback.apply(this, arguments);
                console.log(rep);
            }
        });
    })
};

window.main = main;
