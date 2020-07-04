! function($) {
    console.log($.cookie)
        //1 获取接口
        //2 获取cookie
    function showlist(sid, num) { //sid 商品id num 商品数量
        console.log(sid)
        let id = location.search.substring(1).split('=')[1];

        $.ajax({
            type: "GET",
            url: 'http://127.0.0.1/mymin/sanms/json/detail.json',
            datatype: 'json',
            data: {
                sid: id
            },

        }).done(function(data) {
            console.log(data)
            let arrdata = JSON.parse(data);
            $.each(arrdata, function(index, value) {
                if (sid == value.sid) {
                    let $lie1 = $('.lie-1:hidden').clone(true, true); //克隆隐藏元素
                    //渲染
                    $lie1.find('.td-2').find('img').attr('sid', value.sid); //sid
                    $lie1.find('.td-2').find('img').attr('src', value.url); //图片
                    $lie1.find('.h6').find('a').html(value.title); //标题
                    $lie1.find('.td-3').find('b').html(value.price); //价格
                    $lie1.find('.pt').find('input').val(num); //加减input框
                    //计算单个商品价格
                    $lie1.find('.td-6').find('span').html((value.price * num).toFixed(2));
                    $lie1.css('display', 'block');
                    $('.lie').append($lie1); //克隆
                    total(); //计算总价
                }
            });
        });
    }

    //2 获取cookie
    if (cookie.get('cookiesid') && cookie.get('cookienum')) {
        let sid = cookie.get('cookiesid').split(',');
        let num = cookie.get('cookienum').split(',');
        $.each(sid, function(index, value) {
            showlist(sid[index], num[index]);
        });
    }

    //3 计算总价--使用多次 进行封装
    function total() {
        let $sum = 0; //商品数量
        let $count = 0; //商品总价
        $('.lie-1:visible').each(function(index, ele) {
            if ($(ele).find('.td-1 input').prop('checked')) { //全选勾选
                $sum += parseInt($(ele).find('.pt input').val());
                $count += parseFloat($(ele).find('.td-6 span').html());
            }
        });
        $('.sl').html($count.toFixed(2));
    }

    //4 全选
    $('.quanxuan').on('change', function() {
        $('.lie-1:visible').find(':checkbox').prop('checked', $(this).prop('checked'));
        $('.quanxuan').prop('checked', $(this).prop('checked'));
        total();
    });
    let $inputs = $('.lie-1:visible').find(':checkbox');
    $('.lie').on('change', $inputs, function() {
        if ($('lie-1:visible').find(':checkbox').length === $('lie-1:visible').find('input:checked').size()) {
            $('.quanxuan').prop('checked', true);
        } else {
            $('.quanxuan').prop('checked', false);
        }
        total();
    })

    //5 数量的改变
    //+++++
    $('.jia').on('click', function() {
        let $num = $(this).parents('.lie-1').find('.pt input').val(); //加减input框
        $num++;
        $(this).parents('.lie-1').find('.pt input').val($num);
        $(this).parents('.lie-1').find('.td-6 span').html(calcsingleprice($(this)));
        total();
        setcookie($(this));
    });
    //-----
    $('.jian').on('click', function() {
        let $num = $(this).parents('.lie-1').find('.pt input').val(); //加减input框
        $num--;
        if ($num < 1) {
            $num = 1;
        }
        $(this).parents('.lie-1').find('.pt input').val($num);
        $(this).parents('.lie-1').find('.td-6 span').html(calcsingleprice($(this)));
        total();
        setcookie($(this));
    });

    //判断是否数字类型
    $('.pt input').on('input', function() {
        let $reg = /^\d+$/g; //只能输入数字
        let $value = $(this).val();
        if (!$reg.test($value)) { //不是数字
            $(this).val(1);
        }
        $(this).parents('.lie-1').find('.td-6 span').html(calcsingleprice($(this)));
        total();
        setcookie($(this));
    });

    //计算单价
    function calcsingleprice(obj) {
        let $dj = parseFloat(obj.parents('.lie-1').find('.td-3 b').html());
        console.log($dj)
        let $num = parseInt(obj.parents('.lie-1').find('.pt input').val());
        console.log($num);
        return ($dj * $num).toFixed(2);
    }

    //将改变后的数量存放到cookie中
    let arrsid = []; //存储商品的编号。
    let arrnum = []; //存储商品的数量。
    function cookietoarray() {
        if (cookie.set('cookiesid') && cookie.set('cookienum')) {
            arrsid = $.cookie('cookiesid').split(','); //获取cookie 同时转换成数组。[1,2,3,4]
            arrnum = $.cookie('cookienum').split(','); //获取cookie 同时转换成数组。[12,13,14,15]
        } else {
            arrsid = [];
            arrnum = [];
        }
    }

    function setcookie(obj) {
        cookietoarray();
        let $sid = obj.parents('.lie-1').find('img').attr('sid');
        console.log($sid);
        arrnum[$.inArray($sid, arrsid)] = obj.parents('.lie-1').find('.pt input').val();
    }

    //6 删除
    function delcookie(sid, arrsid) { //删除当前id arrsid存放sid的数组
        let $index = -1; //删除索引位置
        $.each(arrsid, function(index, value) {
            if (sid === value) {
                $index = index;
            }
        });
        arrsid.splice($index, 1);
        arrnum.splice($index, 1);
        cookie.set('cookiesid', arrsid, { expires: 10, path: '/' });
        cookie.set('cookienum', arrnum, { expires: 10, path: '/' });
    }
    $('.td-7 a').on('click', function() {
        cookietoarray();
        if (window.confirm('你确定要删除吗？')) {
            $(this).parents('.lie-1').remove();
            delcookie($(this).parents('.lie-1').find('img').attr('sid'), arrsid);
            total();
        }

    })
    $('.k-1 a').on('click', function() {
        cookietoarray();
        if (window.confirm('你确定要全部删除?')) {
            $('.lie-1:visible').each(function() {
                if ($(this).find(':checkbox').is(':checked')) { //判断复选框是否选中
                    $(this).remove();
                    delcookie($(this).find('img').attr('sid'), arrsid);
                }
            })
            total();
        }
    })

}(jQuery);