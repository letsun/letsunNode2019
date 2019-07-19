var coopIntention = {};

(function($){
    coopIntention.init = function(){
        coopIntention.initEvent();
    };

    coopIntention.initEvent = function(){
        /**
         * @desc 服务点击事件
         */
        var valArr = [];
        var curVal = "";
        $(".multi-item").on("click",function(e) {
            curVal = $(this).data("value");
            var index = $(this).index();

            if($(this).hasClass("multi-active")) {
                $(this).removeClass("multi-active");

                mySplice(valArr,index);
            } else {
                $(this).addClass("multi-active");

                valArr.push(curVal);
            }
            e.stopPropagation();
        });


        $(".right-btn").on("click",function(e) {
            var reg = /^1[0-9]{10}$/;
            var reg2 = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;

            if($.trim($('#company').val()) == "") {
                alert("请输入公司名称");
                return false;
            }

            if($.trim($('#email').val()) == "") {
                alert("请输入邮箱");
                return false;
            }

            if(!reg2.test($('#email').val())) {
                alert("请输入正确的邮箱格式");
                return false;
            }

            if($.trim($('#name').val()) == "") {
                alert("请输入姓名");
                return false;
            }

            if($.trim($('#phone').val()) == "") {
                alert("请输入电话");
                return false;
            }

            if (!reg.test($('#phone').val())) {
                alert("请输入正确的手机号格式");
            }

            if(valArr == "") {
                alert("请选择您想要的服务");
                return false;
            }

            $.ajax({
                type: "POST",
                data: {
                    name	:	$('#name').val(),
                    mobile	:	$('#phone').val(),
                    email	:	$('#email').val(),
                    company	:	$('#company').val(),
                    comment	:	valArr.join("，"),
                    budget	:	$('.radio:checked').data("value")
                },
                url: common.cfg.requirementData,
                dataType: "text",
                contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                success: function (rep) {
                    rep = JSON.parse(rep);
                    alert("提交成功!");
                    $(".coop-intention").hide();
                },
                error: function (rep) {
                    //callback.apply(this, arguments);
                    alert("提交失败");
                }
            });
            e.stopPropagation();
        });

        /**
         * 关闭弹框
         */
        $(".close-btn").on("click",function(e) {
            $(".coop-intention").hide();
            e.stopPropagation();
        });

        // 点击弹框本身
        $(".coop-intention").on('click',function (e) {
            e.stopPropagation();
        });

        // 点击关闭弹框
       /* $(document).on('click',function () {
            $(".coop-intention").hide();
        })*/
    };

    function mySplice(arr, index){
        if(index >= 0 && index<arr.length){
            for(var i = index; i < arr.length; i++){
                arr[i] = arr[i+1];
            }
            arr.length = arr.length-1;
        }
        return arr;
    }
})(jQuery);

window.coopIntention = coopIntention;