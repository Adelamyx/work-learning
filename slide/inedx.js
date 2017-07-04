/**
 * Created by maoyunxiang on 2017/7/4.
 */

(function () {
    var lis = document.querySelectorAll("#imgs li");
    var points = document.querySelectorAll("#point span");
    var index = 0;
    var timer = null;


    function Slide(delay) {
        this.delay = delay;
    }

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
    }


    // Slide.prototype.timer = setInterval(Slide.prototype.autoimg, 2000);


    var a = new Slide();

    timer = setInterval(function () {
        a.autoimg()
    }, 2000);

    console.log(timer);


    points.forEach(function (item, index, array) {
        item.addEventListener("click", function () {
            a.changeimg(index);
        })
        item.addEventListener("mouseover", function () {
            clearInterval(timer);
        })
        item.addEventListener("mouseout", function () {
            clearInterval(timer);
            timer = setInterval(function () {
                a.autoimg()
            }, 2000);
        })
    })


})();