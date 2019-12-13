// 入口函数
$(function () {
    //  发送ajax请求
    $.get({
        url: BigNew.user_detail,
        success: function (res) {
            console.log(res);
            
            for (var key in res.data) {
                $('input.' + key).val(res.data[key]);
            }
            $('img.user_pic').attr('src', res.data.userPic);
        }
    })
    // 给文本域添加一个change事件
    $('#exampleInputFile').on('change', function (e) {
        // 图片对象
        let imgFile = this.files[0];
        let url = URL.createObjectURL(imgFile);
        $('img.user_pic').attr('src', url);
    })
    // 修改按钮点击注册事件
    $('.btn-edit').on('click', function (e) {
        //阻止默认行为
        e.preventDefault();
        // 获取表单元素
        let form = $('#form')[0];
        let userdata = new FormData(form);
        // 发送ajax请求
        $.ajax({
            url: BigNew.user_edit,
            type: 'post',
            data: userdata,
            //阻止编译
            processData: false,
            //不需要设置请求的类型
            contentType: false,
            success: function (res) {
                // console.log(res)
                if (res.code === 200) {
                    //在子页面刷新父页面
                    $.ajax({
                        url :BigNew.user_detail,
                        type : 'get',
                        success : function(res) {
                            console.log(res);
                            
                            if(res.code===200) {
                                //获取服务器返回的数据，使用这些数据去渲染页面的内容
                                parent.$('.user_info img').attr('src',res.data.userPic);
                                parent.$('.user_info span').html('欢迎&nbsp;&nbsp;'+ res.data.nickname + '');
                                parent.$('.user_center_link>img').attr('src',res.data.userPic);
                            }
                        }
                    })

                }
            }
        })
    })
})