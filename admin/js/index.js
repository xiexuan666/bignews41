$(function () {
    $.ajax({
        // url : 'http://localhost:8080/api/v1/admin/user/info',
        // 实现封装http
        type: 'get',
        url: BigNew.user_info,
        success: function (res) {
        $('.user_info img').attr('src', res.data.userPic);
        $('.user_info span').html('欢迎&nbsp;&nbsp;'+ res.data.nickname + '');
        $('.user_center_link>img').attr('src', res.data.userPic);
        }
    })
    // 实现退出按钮
    $('.logout').on('click', function () {
      window.localStorage.removeItem('token');
      window.location.href = './index.html';
    })
    $('div.level01').on('click', function () {
        $(this).addClass('active').siblings().removeClass('active');
        if ($(this).index() === 1) {
            $('ul.level02').slideToggle();
            // 使用dom调用click
            $('.level02>li>a').first()[0].click();
            //  点击箭头的时候，箭头向下方向
            $(this).find('b').toggleClass('rotate0');
        }
    })
    $('ul.level02 li').on('click', function () {
        $(this).addClass('active').siblings().removeClass('active');
    })
})
