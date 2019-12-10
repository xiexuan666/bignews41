 // 入口函数
 $(function () {
    // 发送ajax请求
    getData();
    function getData() {
        $.get({
            url: BigNew.category_list,
            success: function (res) {
                let htmlSrc = template('categoryList', res);
                $('tbody').html(htmlSrc);
            }
        })
    }
    // 点击取消的时候表格里面的东西全部重置
    $('#btn-cancel').on('click', function () {
        $('form')[0].reset();
    })
    //当模态框在显示的时候，我们需要知道是哪一个按钮被点击了
    $('#myModal').on('show.bs.modal', function (e) {
        let dom = e.relatedTarget;
        //判断到底是谁触发了这个模态框显示
        if (dom == $('#xinzengfenlei')[0]) {
            $('#exampleModalLabel').text('新增文章分类');
            $('#btn-confirm').text('新增').addClass('btn-success').removeClass('btn-primary');
            // 讲表单中的数据全部重置
            $('form')[0].reset();
            $('#btn-confirm').on('click', function () {
                let name = $('#recipient-name').val()
                let slug = $('#message-text').val()
                if (name == '' || slug == '') {
                    alert('请填写数据')
                    return;
                }
                $.post({
                    url: BigNew.category_add,
                    data: {
                        name: name,
                        slug: slug
                    },
                    success: function (res) {
                        if (res.code === 201) {
                            $('#myModal').modal('hide')
                            getData();
                        }
                    }
                })
            })
        } else {
            $('#exampleModalLabel').text('编辑文章分类')
            $('#btn-confirm').text('编辑').addClass('btn-primary').removeClass('btn-success')
            let cateId = $(dom).attr('data-id');
            $.get({
                url: BigNew.category_search,
                data: {
                    id: cateId
                },
                success: function (res) {
                    if (res.code === 200) {
                        $('#recipient-name').val(res. data[0].name)
                        $('#message-text').val(res.data[0].slug)
                        $('#cateid').val(res.data[0].id)
                    }
                }
            })
            $('#btn-confirm').on('click', function () {
                let name = $('#recipient-name').val()
                let slug = $('#message-text').val()
                let id = $('#cateid').val()
                $.post({
                    url: BigNew.category_edit,
                    data: {
                        id: id,
                        name: name,
                        slug: slug
                    },
                    success: function (res) {
                        if (res.code === 200) {
                            $('#myModal').modal('hide')
                            getData();
                        }
                    }
                })
            })
        }
    })
    $('tbody').on('click', '#btn-delete', function () {
        let deleteId = $(this).attr('data-id')
        let ans = confirm('你确定要删除吗?');
        if (ans) {
            $.post({
                url: BigNew.category_delete,
                data: {
                    id: deleteId
                },
                success: function (res) {
                    if(res.code == 204) {
                        getData();
                    }
                }
            })
        }
    })

})
