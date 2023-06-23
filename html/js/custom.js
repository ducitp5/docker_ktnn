/*giũ trạng thái menu*/
$(document).ready(function() {
    var url = window.location;
    $('.header-center ul li a[href="' + url + '"]').parent().addClass('active');
    $('.header-center ul li a').filter(function() {
        return this.href == url;
    }).parent().addClass('active');
});
//});
// PUSHMENU 
$(document).ready(function() {
    $menuLeft = $('.pushmenu-left');
    $nav_list = $('#nav_list');
    $close_menu = $('#close-menu');
    $nav_list.click(function() {
        var classActive = $menuLeft.attr('class');
        var classact = 'active';
        if (classActive.indexOf('pushmenu-open') > 0) {
            $('body').addClass('TouchMobile');
        } else {
            $('body').removeClass('TouchMobile');
        }
        $(this).toggleClass(classact);
        $('.pushmenu-push').toggleClass('pushmenu-push-toright');
        $menuLeft.toggleClass('pushmenu-open');
    });
    $close_menu.click(function() {
        var classActive = $menuLeft.attr('class');
        var classact = 'active';
        if (classActive.indexOf('pushmenu-open') > 0) {
            $('body').addClass('TouchMobile');
        } else {
            $('body').removeClass('TouchMobile');
        }
        $(this).toggleClass(classact);
        $('.pushmenu-push').toggleClass('pushmenu-push-toright');
        $menuLeft.toggleClass('pushmenu-open');
    });
});
// end PUSHMENU
$(window).resize(function() {
    location.reload();
});
// scroll menu

$(document).ready(function() {

    var widthWinfirst = window.innerWidth;
    var wHead = $(".container-header").width();
    var wLeft = $(".header-left").width();
    var wRight = $(".header-right").width();
    var wMenucenter = $(".header-center").width();
    var wBoxMenu = wHead - wLeft - wRight - 30;
    var marLeft = wLeft + 20;
    var wsearch = wBoxMenu - wMenucenter - 30;
    var marRight = wMenucenter + wRight + 25;
    var wsearch1 = wHead - wMenucenter - 30;
    var num = 0;
    $(window).scroll(function() {

        if (widthWinfirst > 768) {
            if ($(window).scrollTop() > num) {
                $('.container-header').addClass('fixed');
                $('.container-custom >.box-search').addClass('scrollTop');

                if (widthWinfirst > 1153) {
                    if (wsearch > 300) {
                        $('.container-custom >.box-search').css({
                            "width": 300,
                            "right": marRight
                        });
                    } else {
                        $('.container-custom >.box-search').css({
                            "width": wsearch,
                            "right": marRight
                        });
                    }

                    $(".pushmenu-left").width(wBoxMenu);
                    $(".pushmenu-left").css('left', marLeft);
                } else if (widthWinfirst < 768) {
                    $('.container-custom >.box-search').css({
                        "width": wsearch1,
                        "left": wMenucenter + 20
                    });
                    $(".pushmenu-left").css({
                        "left": ''
                    });
                } else {
                    $(".pushmenu-left").width(wBoxMenu);
                    $(".pushmenu-left").css('left', marLeft);
                    $('.container-custom >.box-search').css({
                        "width": wsearch1,
                        "left": wMenucenter + 20
                    });
                }
            } else {
                $('.container-header').removeClass('fixed');
                $('.container-custom >.box-search').removeClass('scrollTop');
                $('.container-custom >.box-search').css({
                    "width": '',
                    "right": ''
                });
                $(".pushmenu-left").width(widthWinfirst - 8);
                $(".pushmenu-left").css({
                    'left': ''
                });
            }
        }


    });
    // mobile
    if (widthWinfirst <= 768) {
        var h_header = $(".container-header").height();
        $(".container-fuild > .bg-search").css("padding-top", h_header + 30);
        $('.container-custom >.box-search').css({
            "width": "70%"
        });
    }
    if (widthWinfirst < 600) {
        $('.container-custom >.box-search').css({
            "width": "100%"
        });
    }

})
// toggele button filter,search
$(document).ready(function() {
    var widthWinfirst = window.innerWidth;
    $("[data-toggle='toggle']").click(function() {
        $(this).toggleClass('in');
        var selector = $(this).data("target");
        $(selector).toggleClass('in');

    });
    // height chart
    if (widthWinfirst > 768) {
        var Hcharpie1 = $(".chartPie >.col-xs-6:first-child >h4").height();
        var Hcharpie2 = $(".chartPie >.col-xs-6:last-child >h4").height();
        if (Hcharpie1 >= Hcharpie2) {
            $('.chartPie >.col-xs-6:last-child >h4').height(Hcharpie1);
        } else {
            $('.chartPie >.col-xs-6:first-child >h4').height(Hcharpie2);
        }
    }

    //

    $('.list_results ul li div:first-child').each(function() {
       
        var hClass = $(this).hasClass('col-1');
        if (hClass) {

        } else {
            $(this).parent().addClass('clear-dot');
        }
    });

    //tooltip
    $('[data-toggle="tooltip"]').tooltip();
// 

   
});