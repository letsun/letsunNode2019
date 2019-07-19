var header = {};

(function($){

    header.init = function(){
        header.initEvent();
    };

    header.initEvent = function(){
        $(".navList > li").hover(function(){
            $(this).find(".secondBar").fadeIn(300);
        },function() {
            $(this).find(".secondBar").fadeOut("fast");
        });

        $(".navList > li").not(".traceBar").hover(function(){
            $(".second1").fadeOut("fast");
        });

        $(".navList > li").not(".solutionBar").hover(function(){
            $(".second2").fadeOut("fast");
        });

        $(".navList > li").not(".newsBar").hover(function(){
            $(".second3").fadeOut("fast");
        });

        $(".navList > li").not(".aboutBar").hover(function(){
            $(".second4").fadeOut("fast");
        });

        $(".navList > li").not(".caseBar").hover(function(){
            $(".second5").fadeOut("fast");
        });

        $(".secondBar").mouseleave(function(){
            $(this).fadeOut("fast");
        });
    };
})(jQuery);

window.header = header;