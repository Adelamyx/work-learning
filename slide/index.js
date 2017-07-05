/**
 * Created by maoyunxiang on 2017/7/4.
 */

(function () {

    /*
     定时器
     */
    var lis = document.querySelectorAll("#imgs li");
    var points = document.querySelectorAll("#point span");
    var index = 0;
    var timer = null;//定时器


    function Slide(delay) {
        //this.lidom = lidom;//lis
        //this.pointdom = pointdom;
        this.delay = delay;//延迟时间
    }


    /*    Slide.prototype.lisdom = function (lis) {
     return document.querySelectorAll(lis);
     }

     Slide.prototype.pointsdom = function (point) {
     return document.querySelectorAll(point);
     }*/

    //图片切换函数
    Slide.prototype.changeimg = function (index) {
        for (var i = 0; i < lis.length; i++) {
            lis[i].style.display = "none";
            points[i].className = "";
        }
        lis[index].style.display = "block";
        points[index].className = "highlight";
    }

    //自动播放
    Slide.prototype.autoimg = function () {
        if (++index >= lis.length)
            index = 0;
        Slide.prototype.changeimg(index);
        console.log(index);
    }

    //设置定时器
    Slide.prototype.settimer = function (time) {
        timer = setInterval(function () {
            a.autoimg()
        }, time);
    }


    // var a = new Slide("#imgs li", "#point span", 2000);
    /* var lis = a.lisdom(a.lidom);
     var points = a.pointsdom(a.pointdom);*/

    var a = new Slide(2000);
    a.settimer(a.delay);


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


    //foreach遍历points，鼠标滑过，对应的图片显示
    points.forEach(function (item) {
        item.addEventListener("mouseover", function () {
            clearInterval(timer);//清除定时器
            index = this.innerHTML - 1;//在mouseover时记录当前的index
            a.changeimg(index);
            console.log(index);
        })
        item.addEventListener("mouseout", function () {
            clearInterval(timer);
            a.settimer(a.delay);
        })
    })


})();