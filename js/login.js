! function() {
    const username = document.querySelector('.username');
    const password = document.querySelector('.password');
    const btn = document.querySelector('.btn');
    console.log(password)
    btn.onclick = function() {
        $ajax({
            type: 'GET',
            url: 'http://127.0.0.1/mymin/sanms/json/detail.json',
            data: { //将用户名和密码传给后端
                user: username.value,
                pass: password.value,
            },
            success: function(data) { //返回1 登录成功  返回空  登录失败
                if (data) { //登录成功
                    alert('登陆成功');
                    location.href = '../html/home.html';
                    localStorage.setItem('uesrname', username.value); //将用户名永久存储。
                } else { //登录失败
                    alert('用户名或者密码错误');
                    password.value = '';
                }

            }
        });
    }
}();