! function() {
    let username = document.querySelector('.username');
    let passworde = document.querySelector('.password');
    let span = document.querySelectorAll('span')[1];
    let form1 = document.querySelector('.form1');
    let user = true;
    username.onblur = function() {
            let reg = /^[a-zA-Z0-9_-]{4,16}$/;
            if (this.value != '') {
                $ajax({
                    type: 'post',
                    url: 'http://127.0.0.1/mymin/sanms/json/detail.json',
                    data: {
                        username: username.value, //将数据传给后端
                        password: passworde.value,
                    },
                    success: function(data) { //后端反值 1存在 空为不存在
                        if (data) {
                            console.log(username.value)
                            span.innerHTML = '√';
                            span.style.color = 'grenn';
                            user = true;
                        } else {
                            span.innerHTML = '用户名已存在';
                            span.style.color = 'red';
                            user = false;
                        }
                    }
                });
            } else {
                alert('输入用户名');
            }
        }
        //console.log(form1);
    form1.onsubmit = function() {
        //判断用户名是否为空。
        if (shoujihao.value === '') {
            alert('请输入用户名');
            user = false;
        }
        if (!sjh) {
            return false;
        }
    }
}();

let Input = document.querySelectorAll('input');
let Span = document.querySelectorAll('span');
//设置判断条件
let yonghu = true; //用户
let emali = true; //邮箱
let password = true; //密码
let repass = true; //重复密码
//let sjh = true;//手机号
console.log(Span);
//1---用户名--获取焦点 失去焦点
Input[0].onfocus = function() {
        Span[1].innerHTML = '请输入用户名';
        Span[1].style.color = "#999";
    }
    //test方法---字符串中查找是否存在指定的正则表达式并返回布尔值，
    //如果存在则返回 true，不存在则返回 false。
    // Input[0].onblur = function () {
    //     let reg = /^[a-zA-Z0-9_-]{4,16}$/;//用户名正则
    //     if (this.value !== '') {//大判断 假如input的value值不为空 执行下面
    //         if (reg.test(this.value)) {//假如input的值有正则 输出
    //             Span[1].innerHTML = '√';
    //             Span[1].style.color = 'green';
    //             this.yonghu = true;//赋值
    //         } else {
    //             Span[1].innerHTML = '请输入一个正确的用户名';
    //             Span[1].style.color = 'red';
    //             this.yonghu = false;
    //         }
    //     } else {
    //         Span[1].innerHTML = '用户名不能为空';
    //         Span[1].style.color = 'red';
    //     }
    // }

//2--邮箱
Input[1].onfocus = function() {
    Span[2].innerHTML = '请输入邮箱';
    Span[2].style.color = '#999';
}
Input[1].onblur = function() {
    let reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    if (this.value !== '') {
        if (reg.test(this.value)) {
            Span[2].innerHTML = '√';
            Span[2].style.color = 'grenn';
            emali = true;
        } else {
            Span[2].innerHTML = '请输入正确的邮箱';
            Span[2].style.color = 'red';
            emali = false;
        }
    } else {
        Span[2].innerHTML = '邮箱不能为空';
        Span[2].style.color = 'red';
    }
}

//3 密码 
Input[2].onfocus = function() {
        Span[3].innerHTML = '请输入密码';
        Span[3].style.color = '#999';
    }
    //当文本框的内容发生改变时触发。
Input[2].oninput = function() {
    if (this.value.length >= 6 && this.value.length <= 20) {
        let regnum = /[0-9]+/g; //数字
        let regda = /[A-Z]+/g; //大写字符
        let regxiao = /[a-z]+/g; //小写字符
        let regq = /[\W\_]+/g; //其他字符
        let regchin = /[\u4e00-\u9fa5]+/g; //中文
        var shuzi = 0; //种类计数
        if (!regchin.test(this.value)) {
            if (regnum.test(this.value)) {
                shuzi++;
            }
            if (regda.test(this.value)) {
                shuzi++;
            }
            if (regxiao.test(this.value)) {
                shuzi++;
            }
            if (regq.test(this.value)) {
                shuzi++;
            }
        } else {
            Span[3].innerHTML = '输入密码格式有错';
            Span[3].style.color = 'red';
            password = false;
        }

        switch (shuzi) {
            case 1:
                Span[3].innerHTML = '弱鸡';
                Span[3].style.color = 'red';
                password = false;
                break;
            case 1:
            case 1:
                Span[3].innerHTML = '中';
                Span[3].style.color = 'orange';
                password = true;
                break;
            case 4:
                Span[3].innerHTML = '强';
                Span[3].style.color = 'grenn';
                password = true;
        }

    } else {
        Span[3].innerHTML = '密码长度有误';
        Span[3].style.color = 'red';
        password = false;
    }
}
Input[2].onblur = function() {
    if (this.value !== '') {
        if (this.value.length >= 6 && this.value.length <= 20) {
            if (password) {
                Span[3].innerHTML = '√';
                Span[3].style.color = 'grenn';
                password = true;
            } else {
                Span[3].innerHTML = '密码格式不正确';
                Span[3].style.color = 'red';
                password = false;
            }
        }
        if (this.value === Input[2].value) {
            Span[3].innerHTML = '√';
            Span[3].style.cssText = 'color:green;';
            Password = true;
            Input[3].focus();
        } else {
            Span[3].innerHTML = '两次密码不一致';
            Span[3].style.cssText = 'color:red;';
            Password = false;
            input[1].focus();
        }
    } else {
        Span[3].innerHTML = '密码不能为空';
        Span[3].style.cssText = 'color:red';
        Password = false;
    }
}


//4 重复密码
Input[3].onfocus = function() {
    if (this.value === '') {
        Span[4].innerHTML = '请输入密码';
        Span[4].style.color = '#999';
        repass = true;
    }

}
Input[3].onblur = function() {
    if (this.value !== '') {
        if (this.value === Input[2].value) {
            Span[4].innerHTML = '√';
            Span[4].style.color = 'color-grenn';
            repass = true;
        } else {
            Span[4].innerHTML = '两次密码不一致';
            Span[4].style.color = 'red';
            repass = false;
        }
    } else {
        Span[4].innerHTML = '密码重复不能为空';
        Span[4].style.color = 'red';
        repass = false;
    }
}

//5 手机号
Input[4].onfocus = function() {
    Span[5].innerHTML = '请输入手机号';
    Span[5].style.color = '#999';
}
Input[4].onblur = function() {
    let reg = /^1[3578]\d{9}$/;
    if (this.value !== '') {
        if (reg.test(this.value)) {
            Span[5].innerHTML = '√';
            Span[5].style.color = 'grenn';
            sjh = true;
        } else {
            Span[5].innerHTML = '请输入正确的手机号';
            Span[5].style.color = 'red';
            sjh = false;
        }
    } else {
        Span[5].innerHTML = '手机号不能为空';
        Span[5].style.color = 'red';
    }
}

//随机数
let s1 = document.querySelector('.s1');
Input[5].onclick = function() {
    var Num = "";
    for (var i = 0; i < 8; i++) {
        Num += Math.floor(Math.random() * 10);
    }
    s1.innerHTML = Num;
    s1.style.color = 'blank';
}