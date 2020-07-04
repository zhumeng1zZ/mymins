// 主页内容块渲染
let auto = document.querySelectorAll('.auto-scroll-box')[0];
let auto1 = document.querySelectorAll('.auto-scroll-box')[1];
let auto2 = document.querySelectorAll('.auto-scroll-box')[2];
let auto3 = document.querySelectorAll('.auto-scroll-box')[3];



$.ajax({
    type: "GET",
    url: 'http://127.0.0.1/mymin/sanms/json/product.json',
    dataType: "json",
    success: function(data) {
        // console.log(JSON.parse(data))
        let arrdata = data.data; //解析字符串
        let str = '';
        let str1 = '';
        let str2 = '';
        for (let i = 0; i < arrdata.length; i++) {
            console.log('data:', arrdata[i].url)
            str += `
            <div class="item" style="width: 250px;">
            <a href="../html/detail.html" target="_blank">
                <div class="i-size-box">
                    <img class="img-agent lazyload" src="${arrdata[i].url}">
                </div>
                <p class="i-size-tit is-tags-mark"><u class="jsd-tag"></u>${arrdata[i].title}</p>
                <span data-pmid="77944676" data-productid="66384732"><em>¥</em>${arrdata[i].price}</span>
                <div class="marking save">
                    <div class="boxs">
                        <i>已省</i>
                        <p><em>¥</em>12.6</p>
                    </div>
                </div>
            </a>
        </div>`;
        }
        for (let i = 4; i < 9; i++) {
            str1 += `
            <div class="item" style="width: 250px;">
            <a href="#" target="_blank">
                <div class="i-size-box">
                    <img class="img-agent lazyload" src="${arrdata[i].url}">
                </div>
                <p class="i-size-tit is-tags-mark"><u class="jsd-tag"></u>${arrdata[i].title}</p>
                <span data-pmid="77944676" data-productid="66384732"><em>¥</em>${arrdata[i].price}</span>
                <div class="marking save">
                    <div class="boxs">
                        <i>已省</i>
                        <p><em>¥</em>10.3</p>
                    </div>
                </div>
            </a>
        </div>`;
        }

        auto.innerHTML = str;
        auto1.innerHTML = str1;

    }
});


//轮播图
banner = document.querySelector('.banner'); //大盒子
Li = document.querySelectorAll('.banner ul li'); //获取图片
Span = document.querySelectorAll('.p1 span'); //跟随按钮
right = document.querySelector('.right'); //右头
num = 0; //当前索引
timer = null; //关闭定时器
console.log(Span)

//遍历按钮下标 给每一个按钮添加点击事件
for (let i = 0; i < Span.length; i++) {
    Span[i].index = i; //给每一个按钮添加自定义属性
    Span[i].onclick = function() {
        num = this.index;
        tabswitch();
    }
}
//鼠标进入轮播图 关闭定时器
banner.onmouseover = function() {
        clearInterval(timer);
    }
    //鼠标移开轮播图 开启定时器
banner.onmouseout = function() {
        timer = setInterval(function() {
            right.onclick();
        }, 3000)
    }
    //给right 添加点击事件
right.onclick = function() {
        num++;
        if (num > Span.length - 1) { //如果num大于最大的索引值，重新设置为0
            num = 0;
        }
        tabswitch();
    }
    //封装切换过程
function tabswitch() {
    for (let j = 0; j < Span.length; j++) {
        Span[j].className = ''; //去掉按钮所有的类名
        Li[j].className = ''; //去掉图片所以的类名
    }
    Span[num].className = 'active'; //给每个每个按钮添加active属性
    Li[num].className = 'show'; //给每个Li添加show属性
    document.title = num;
}
//定时器自动轮播
timer = setInterval(function() {
    right.onclick();
}, 3000);

//会员用户评价  模拟滚动条
let main = document.querySelector('.main'); //外部大盒子
let main1 = document.querySelector('.main-1'); //内容盒子 
let main2 = document.querySelector('.main-2'); //评价内容 p
let scroll = document.querySelector('.scroll'); //滚动条盒子
let dragbox = document.querySelector('.dragbox'); //滚动条
console.log(main)
    //取消 按下鼠标游览器默认行为
dragbox.onmousedown = function(ev) {
    var ev = ev || window.event;
    var sy = ev.offsetY; //鼠标相对于操作元素垂直距离
    console.log(sy);
    //取消 鼠标划过游览器默认行为
    document.onmousemove = function(ev) {
        var ev = ev || window.event;
        console.log(ev.clientY)
        var t = ev.clientY - sy - parseInt(main1.offsetTop / 25);
        console.log(t);
        if (t <= 0) {
            t = 0;
        } else if (t >= scroll.offsetHeight - dragbox.offsetHeight - 2) {
            t = scroll.offsetHeight - dragbox.offsetHeight - 2;
        }

        //求比列
        console.log(t)
        var bili = t / (scroll.offsetHeight - dragbox.offsetHeight);
        console.log(bili)
        dragbox.style.top = t + 'px';
        console.log(main2.offsetHeight)
        console.log(main1.offsetHeight)
        main2.style.top = -bili * (main2.offsetHeight - main1.offsetHeight) + 'px';
    };
    //取消 松开鼠标游览器默认行为 取消行为
    document.onmouseup = function() {
        document.onmousemove = null;
        document.onmouseup = null;
    };
    return false;
}

function addEvent(obj, etype, fn) {
    if (obj.addEventListener) {
        obj.addEventListener(etype, fn, false);
    } else {
        obj.attachEvent('on' + etype, fn);
    }
}

addEvent(document, 'mousewheel', direction);
addEvent(document, 'DOMMouseScroll', direction);

function direction(ev) {
    var ev = ev || window.event;
    var flag = true;
    if (ev.wheelDelta) {
        flag = ev.wheelDelta > 0 ? true : false;
    } else {
        flag = ev.detail < 0 ? true : false;
    }
    if (flag) { //向上,dragbox--top值变小
        var t = dragbox.offsetTop - 5;
        if (t <= 0) {
            t = 0;
        } else if (t >= scroll.offsetHeight - dragbox.offsetHeight - 2) {
            t = scroll.offsetHeight - dragbox.offsetHeight - 2;
        }

        //1.求比例
        var bili = t / (scroll.offsetHeight - dragbox.offsetHeight);
        dragbox.style.top = t + 'px';
        main2.style.top = -bili * (main2.offsetHeight - main1.offsetHeight) + 'px';
    } else { //向下,dragbox--top值变大
        var t = dragbox.offsetTop + 5;
        if (t <= 0) {
            t = 0;
        } else if (t >= scroll.offsetHeight - dragbox.offsetHeight - 2) {
            t = scroll.offsetHeight - dragbox.offsetHeight - 2;
        }

        //1.求比例
        var bili = t / (scroll.offsetHeight - dragbox.offsetHeight);
        dragbox.style.top = t + 'px';
        main2.style.top = -bili * (main2.offsetHeight - main1.offsetHeight) + 'px';
    }
}