 // 给登录按钮注册点击事件
 $(function () {
    $('.input_sub').on('click', function (e) {
      //阻止默认跳转事件
      e.preventDefault();
      //获取用户名和密码
      let userName = $('.input_txt').val().trim();
      let password = $('.input_pass').val().trim();
      //非空判断
      if (userName === '' || password === '') {
        // 使用模态框
        $('.container-fluid').text('用户名和密码不能为空');
        $('#modelId').modal();
        return;
      };
      //ajax发送请求
      $.ajax({
        // 实现封装http // url: 'http://localhost:8080/api/v1/admin/user/login',
        // 实现封装http
        url: BigNew.user_login,
        type: 'post',
        // dataType : 'json' ,
        data: {
          username : userName,
          password :password
        },
        success: function (res) {
          $('.container-fluid').text(res.msg);
            $('#modelId').modal();
          if (res.code === 200) {
            // 使用模态框
            $('#modelId').on('hidden.bs.modal',function (e){
              // 跳转页面
              localStorage.setItem('token', res.token)
            window.location.href = './index.html';
            })
        }; 
        },           
      });
    });      
  });