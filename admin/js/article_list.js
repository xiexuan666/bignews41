$(function(){
    $.get({
        url : BigNew.category_list,
        success : function(res) {
            if(res.code==200) {
                let htmlStr = template('categoryList',res)
                $('#selCategory').html(htmlStr)
            }
        }
    });
    // 封装一个获取数据的方法
    function getData (pages,callback) {
        $.get({
            url : BigNew.article_query,
            data : {
                type :$('#selCategory').val(),
                state : $('#selStatus').val(),
                page : pages,
                perpage : perpage
            },
            success : function(res) {
                let htmlSrc = template('artList',res);
                $('#tbody').html(htmlSrc);
                // 使用回调函数
                if(res.data.data.length != 0 &&callback != null) {
                    $('#pagination-demo').show();
                    $('#tips').hide();
                    callback(res);
                }else if(res.data.data.length ==0) {
                    $('#pagination-demo').hide();
                    $('#tips').show();
                }
            }
        });
    }
    // 定了两个变量，用来表示页码和条数
    let mypage = 1;
    let pergage = 10;
     //页面一加载就展示文章条目数据
     getData(mypage,function(res){
         $('#paginantion').twbsPagination({
            totalPages :res.data.totalPage,
            visiblePages : 7,
            first : '首页',
            prev : '上一页',
            next : '下一页',
            last : '尾页',
            onPageClick :function(even,page){
                mypage = page;
                getData(mypage,null);
            }
         });
     })
     //筛选按钮注册点击事件






})