// 入口函数
$(function(){
    //图片预览效果
    $('#inputCover').on('change',function(){
        let imgFile = this.files[0];
        let url = URL.createObjectURL(imgFile);
        $('.article_cover').attr('src',url);
    })
    // 让文章加载成功
    $.get({
        url : BigNew.category_list,
        success : function (res) {
            let htmStr = template('categoryList',res);
            $('select.category').html(htmStr);
        }
    })
    // 添加日期
    jeDate("#testico", {
        isinitVal: true,
        format: "YYYY-MM-DD",
        isTime: false,
        minDate: "2014-09-19 00:00:00",
        zIndex: 30000
    })
    // 添加富文本编辑器
    var E = window.wangEditor
    var editor = new E('#editor')     
    editor.create()
    // 按钮注册点击事件
       $('button.btn-edit').on('click',function(e){
        // 阻止默认行为
        e.preventDefault();
        // 使用formdata完成方式来提交数据
        let  fd = new FormData($('#form')[0]);
        fd.append('content',editor.txt.html());
        // 修改默认是发布的
        fd.append('state','已发布');
        // 发送ajax请求
        $.post({
            url : BigNew.article_publish,
            data : fd,
            processData : false,
            contentType : false,
            success : function(res) {
                if (res.code==200) {
                    window.history.back();
                }
            }
        })
      });             
    //   存草稿功能
    $('button.btn-draft').on('click',function(e){
        // 阻止默认行为
        e.preventDefault();
        // 使用fromdata完成方式来提交数据
        let  fd = new FormData($('#form')[0]);
        fd.append('content',editor.txt.html());
        // 发送ajax请求
        $.post({
            url : BigNew.article_publish,
            data : fd,
            processData : false,
            contentType : false,
            success : function(res) {
                console.log(res);
                if (res.code==200) {
                    window.history.back();
                }
            }
        })
    })                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   

})