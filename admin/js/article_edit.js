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


})