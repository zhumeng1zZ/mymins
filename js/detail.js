//获取地址栏id
let id = location.search.substring(1).split('=')[1];
// let Datu = document.querySelector('#spic img'); //大图
// let Datu1 = document.querySelector('#df img'); //二培大图
// let Xiaotu = document.querySelector('#list'); //小图表

// let mony = document.querySelector('.mony'); //价格
// let da = document.querySelector('.p1 a'); //大标题
// let xiao = document.querySelector('.p2'); //小标题
let banxinC = document.querySelector('.banxin-c');
// console.log(Xiaotu)

$ajax({
    type: "GET",
    url: 'http://127.0.0.1/mymin/sanms/json/detail.json',
    dataType: "json",
    data: {
        sid: id
    },
    success: function(data) {
        // console.log(data)

        let arrdata = JSON.parse(data); //解析字符串

        let temp = `
            
    
        <div class="ringt" style="width: 800px;">
            <p class="p1">
                ${arrdata.data[0].title}
                <em></em>
                <a></a>
            </p>
            <p class="p2">${arrdata.data[0].particulars}</p>
        </div>
    
        <div class="cont" style="width: 800px;">
            <div class="jiage">
                <span class="s1">
                    <sub>￥</sub>
                    <del class="mony shuzi">${arrdata.data[0].price}</del>
                    <em>降价通知</em>
                </span>
                <span class="s2">重量：0.9kg </span>
            </div>
           
            `;
        $('.banxin-c').append(temp);

    }


})

// //放大镜
function Scale() {
    this.scale = document.querySelector('#box1');
    this.spic = document.querySelector('#spic'); //小图
    this.spicimg = this.spic.children[0];
    this.sf = document.querySelector('#sf'); //小放
    this.df = document.querySelector('#df'); //大放
    this.bpic = this.df.children[0]; //大图
    this.list = document.querySelector('#list');
    this.listimg = this.list.children;
    // console.log(this.listimg) //大盒子
}
//公式：大图/小图=大放/小放
Scale.prototype.init = function() {
    //1.鼠标经过小图，显示小放和大放
    this.scale.onmouseover = () => {
        this.sf.style.display = 'block';
        this.df.style.display = 'block';


        //2.求小放的尺寸和比例
        this.sf.style.width = this.spic.offsetWidth * this.df.offsetWidth / this.bpic.offsetWidth +
            'px';
        this.sf.style.height = this.spic.offsetHeight * this.df.offsetHeight / this.bpic.offsetHeight +
            'px';

        //比例
        this.bili = this.bpic.offsetWidth / this.spic.offsetWidth;

        //3.小图添加鼠标移动事件
        this.spic.onmousemove = (ev) => {
                var ev = ev || window.event;
                let l = ev.pageX - this.scale.offsetLeft - this.sf.offsetWidth / 2;
                let t = ev.pageY - this.scale.offsetTop - this.sf.offsetHeight / 2;
                if (l < 0) {
                    l = 0
                } else if (l >= this.spic.offsetWidth - this.sf.offsetWidth) {
                    l = this.spic.offsetWidth - this.sf.offsetWidth - 2;
                }
                if (t < 0) {
                    t = 0
                } else if (t >= this.spic.offsetHeight - this.sf.offsetHeight) {
                    t = this.spic.offsetHeight - this.sf.offsetHeight - 2;
                }
                this.sf.style.left = l + 'px';
                this.sf.style.top = t + 'px';
                this.bpic.style.left = -l * this.bili + 'px';
                this.bpic.style.top = -t * this.bili + 'px';
            }
            // 5 点击小图 切换图片
        for (let i = 0; i < this.listimg.length; i++) {
            this.listimg[i].onmousemove = () => {
                //console.log(this.listimg[i].src)
                this.bpic.src = this.listimg[i].src;
                this.spicimg.src = this.listimg[i].src;
            }
        }
    };

    this.scale.onmouseout = () => {
        this.sf.style.display = 'none';
        this.df.style.display = 'none';
    };
}

new Scale().init();

//商品进入购物车
//cookie存储

let btn = document.querySelector('.k-1'); //购物车按钮
let value = document.querySelector('.value'); //input的值
let jia = document.querySelector('.jia'); //加号
let jian = document.querySelector('.jian'); //减号

console.log(btn)
console.log(value)



let arrsid = []; //商品id
let arrnum = []; //商品数量

//先获取cookie才能进行点击次数的判断(第一次，还是第一次之后)
//提前约定cookie键值(cookiesid/cookienum)
//用cookie封装函数 取出数据 变成数组
function cookievalue() {
    if (cookie.get('cookiesid') && cookie.get('cookienum')) {
        arrsid = cookie.get('cookiesid').split(','); //获取的cookie变成数组
        arrnum = cookie.get('cookienum').split(','); //
    } else {
        arrnum = [];
        arrsid = [];
    }
}
console.log(cookievalue());
// //通过点击判断是否第一次加入购物车
btn.onclick = function() {
    //获取当前商品id
    cookievalue();
    if (arrsid.indexOf(id) !== -1) { //存在 不是第一次
        let num = parseInt(arrnum[arrsid.indexOf(id)]) + parseInt(value.value);
        arrnum[arrsid.indexOf(id)] = num;
        cookie.set('cookienum', arrnum, 10);
        console.log(value.value)
    } else { //第一次添加
        arrsid.push(id);
        let num = parseInt(value.value);
        arrnum.push(num);
        cookie.set('cookiesid', arrsid, 10);
        cookie.set('cookienum', arrnum, 10);
        console.log(num)
    }
    console.log(arrsid);
    console.log(arrnum);
    alert('商品已加入购物车')
}