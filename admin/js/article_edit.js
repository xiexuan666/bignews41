// 入口函数
$(function(){
//预览图片效果
$('#inputCover').on('change',function(){
    let imgFiles = this.files[0];
    let url = URL.createObjectURL(imgFiles);
    $('.article_cover').attr('src',url);
})
// 让文章分类加载完成
$.get ({
    url : BigNew.category_list,
    success : function(res) {
        let htmSrc = template('categoryList'.res);
        $('select.category').html(htmlStr);
    }
})
// 添加日期插件
jeDate("#testico",{
    format: "YYYY-MM-DD",
    isTime : false,
    minDate : "2019-9-21 00:00:00",
    zIndex:30000,
})
//添加富文本编辑器
let E =  window.wangEditor
var editor = new  E ('#Editor');
editor.create();
//获取到文章的id？？？？？
let articleId = location.search.split('=')[1];
// 发送ajax请求
$.get({
    url : BigNew.article_search,
    data : {
        id : articleId
    },
    success : function(res) {
        if (res.code==200) {
        $('#inputTitle').val(res.data.title);
        $('img.article_cover').attr('src',res.data.cover);
        $('select.category').val(res.data.categoryId);
        $('#testico').val(res.data.data);
        editor.txt.html(res.data.content);
        }
    }
});
// 点击修改的按钮的时候，将文章数据更新，注册点击事件
$('button.btn-edit').on('click',function(e){
    // 阻止默认行为
    e.preventDefault();
    // 使用formData方式来提交数据
    let fd = new FormData($('#form')[0]);
    fd.append('content',editor.txt.html());
    // 修改文章默认是发布的
    fd.append('state','已发布');
    fd.append('id',articleId);
    // 发送ajax请求
    $.post({
        url : BigNew.article_edit,
        data : fd,
        processData : false,
        contentType : false,
        success : function (res) {
            if (res.code ==200) {
                window.history.back();
            }
        }
    })
});
// 存草稿的功能
$('button.btn-draft').on('click',function(e){
    // 阻止默认行为
    e.preventDefault();
    // 使用formdata方式来提交数据
    let fd = new FormData($('#form')[0]);
    // let fd = new FormData($('#form')[0]);
    fd.append('content',editor.txt.html());
    // 修改默认行为
    fd.append('id',articleId);
    // 发送ajax请求
    $.post({
        url : BigNew.article_edit,
        data : fd,
        processData : false,
        contentType : false,
        success : function (res) {
            if (res.code ==200) {
                window.history.back();
            }
         }
      })
   })
})
