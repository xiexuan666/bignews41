// 入口函数
$(function(){
    //图片预览效果
    $('#inputCover').on('change',function(){
        let imgFile = this.files[0];
        let url = ULR.createObjectURL(imgFile);
        $('.article_cover').attr('src',url);
    })
    // 让文章加载成功
    $.get({
        url : BigNew.category_list,
        success : function (res) {
            let htmStr =templat('categoryList',res);
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
       $('.button.btn-edit').on('click',function(e){

        // 阻止默认行为
        e.preventDefault();
       })                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    




})