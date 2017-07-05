/**
 * Created by maoyunxiang on 2017/7/4.
 */

(function () {

    function Slide(obj) {
        this.el = obj.el;
        this.delay = obj.delay;//延迟时间
        this.img = obj.img;//图片加载
        this.timer = null;
    }

    Slide.prototype.init = function () {
        var that = this
        this.createDom(function () {
            that.settimer();
            that.showimg();
        })

    }
    //dom添加
    Slide.prototype.createDom = function (cb) {
        var ul = document.createElement("ul");
        ul.setAttribute("class", "imgs");
        var div = document.createElement("div");
        div.setAttribute("class", "point");
        var imglists = "";
        var pointlists = "";
        this.img.forEach(function (item, index, array) {
            imglists += " <li><img src=" + item.src + " alt=" + item.alt + "></li>";
            pointlists += "<span>" + (index + 1) + "</span>"
        })
        ul.innerHTML = imglists;
        div.innerHTML = pointlists;
        var slidediv = document.querySelector(this.el);
        slidediv.appendChild(ul);
        slidediv.appendChild(div);
        console.log(slidediv);

        this.$lis = slidediv.querySelectorAll(".imgs li");
        this.$points = slidediv.querySelectorAll(".point span");
        console.log(123, this.$lis, this.$points);


        this.$index = 0;

        this.$lis[0].style.display = "block";
        this.$points[0].className = "highlight";

        cb();
    }

    //图片切换函数
    Slide.prototype.changeimg = function (index) {
        console.log(this.$lis, 222)
        for (var i = 0; i < this.$lis.length; i++) {
            this.$lis[i].style.display = "none";
            this.$points[i].className = "";
        }
        this.$lis[index].style.display = "block";
        this.$points[index].className = "highlight";
    }

    //自动播放
    Slide.prototype.autoimg = function () {
        if (++(this.$index) >= this.$lis.length)
            this.$index = 0;
        this.changeimg(this.$index);
    }

    //设置定时器
    Slide.prototype.settimer = function () {
        var that = this;
        that.timer = setInterval(function () {
            that.autoimg();
        }, this.delay);
    }

    //鼠标滑过对应的图片显示
    Slide.prototype.showimg = function () {
        var that = this;
        console.log(222, this.$points);
        this.$points.forEach(function (item) {
            item.addEventListener("mouseover", function () {
                console.log('aaaaaa', that.timer)
                clearInterval(that.timer);//清除定时器
                // console.log(this);
                that.$index = this.innerText - 1;//在mouseover时记录当前的index
                that.changeimg(that.$index);
            })
            item.addEventListener("mouseout", function () {
                clearInterval(that.timer);
                //设置定时器
                that.settimer();
            })
        })
    }

    var a = new Slide({
        el: "#slide",
        delay: 2000,
        img: [
            {src: "img/test_img01.jpg", alt: "img1"},
            {src: "img/test_img02.jpg", alt: "img2"},
            {src: "img/banner.jpg", alt: "img3"},
            {src: "img/test_img02.jpg", alt: "img2"}
        ]
    });

    a.init();

    var b = new Slide({
        el: "#mm",
        delay: 1000,
        img: [
            {src: "img/img4.jpg", alt: "img1"},
            {src: "img/test_img02.jpg", alt: "img2"},
            {src: "img/img5.jpg", alt: "img2"},
        ]
    });
    b.init();


    /*
     //for遍历points，鼠标滑过，对应的图片显示
     for (var i = 0; i < points.length; i++) {
     points[i].addEventListener("mouseover", function () {
     clearInterval(timer);
     index = this.innerHTML - 1;
     a.changeimg(index);
     })
     points[i].addEventListener("mouseout", function () {
     timer = setInterval(function () {
     a.autoimg()
     }, 2000);
     })
     }
     */


})();