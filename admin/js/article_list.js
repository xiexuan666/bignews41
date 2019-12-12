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
               // console.log(res);                
                let htmlSrc = template('artList',res);
                $('tbody').html(htmlSrc);
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
    let perpage = 10;
     //页面一加载就展示文章条目数据
      getData(mypage,function(res){
         $('#pagination-demo').twbsPagination({
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
      $('#btnSearch').on('click',function(e){
        //   阻止默认行为
        e.preventDefault();
        //点击按钮的时候获取文章类型和文章状态
        getData(mypage,function(res){
            //索到的数据条目是不一样的，所以总的页数是会动态改变的
            $('#pagination-demo').twbsPagination('changeTotalPages',res.data.totalPage,1)
        });
      })
      //删除文章  删除是动态生成的，需要使用事件委托来注册
      $('#tbody').on('click','delete',function(){
        let artId = $(this).attr('data-id');
        if(confirm('你确定要删除吗')) {
            $.post({
                url : BigNew.category_delete,
                data : {
                    id : artId
                },
                success : function (res) {
                   getData(mypage,function(res){
                    $('#pagination-demo').twbsPagination('changeTotalPages',res.data.totalPage,mypage)
                   })
                }
            })
        }
      })
})