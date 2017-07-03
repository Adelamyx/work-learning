/**
 * Created by maoyunxiang on 2017/7/3.
 */
(function () {

    var title = document.querySelector("#calender-year");
    var d = new Date();
    var year = d.getFullYear();//获取年
    var month = d.getMonth() + 1;//获取月   月是(0-11代表一到十二月份)
    var day = d.getDate();//获取日
    var week = d.getDay();//获取星期


    //日历头部显示
    function showTitle(year, month, day) {
        title.innerHTML = year + "年" + month + "月" + day + "日";
    }

    //获取每个月有多少天
    function getCountDays(year, month, day) {
        var curDate = new Date();
        curDate.setFullYear(year, month, day);
        curDate.setDate(0);
        /* 返回当月的天数 */
        return curDate.getDate();
    }

    // 获取每月的第一天是周几
    function gainfirstdaytoweek(year, month) {
        var firstday = new Date(year, month - 1, 1);
        var firstdaytoweek = firstday.getDay();
        return firstdaytoweek;
    }


    //修改年份——未实现
    title.addEventListener("click", function () {
        alert(d.getFullYear());
    }, false);


    //点击进行月份--
    var prevmonth = document.querySelector("#prev-month");
    prevmonth.addEventListener("click", function () {
        if (month > 1) {
            month--;
            arr(year, month, day);
        }
    }, false);


    //点击进行月份++
    var nextmonth = document.querySelector("#next-month");
    nextmonth.addEventListener("click", function () {
        if (month < 12) {
            month++;
            showTitle(year, month, day);
            arr(year, month, day);
        }
    }, false);


    function arr(year, month, day) {
        var countDay = getCountDays(year, month, day);//获取每月的天数
        var firsttoweek = gainfirstdaytoweek(year, month);//获取每月的第一天是周几
        var datearr = [];
        debugger

        var firstline = (6 - firsttoweek) + 1;//第一行的个数值
        var heights = 0;//日历的高度
        var h = parseInt((countDay - firstline) / 7);//最后一行的个数

        if ((countDay - firstline) % 7 === 0) {
            heights = h + 1;
        } else {
            heights = h + 2;
        }

        var firstlines = 7 - firstline;//第一行前面有几个数字
        debugger
        var lastweekcount = getCountDays(year, month - 1, day);
        for (var i = 0; i < firstlines; i++) {
            datearr.unshift(lastweekcount);
            lastweekcount--;
        }

        for (var i = 0; i < countDay; i++) {
            datearr.push(i + 1);
        }


        console.log(datearr);
    }


    showTitle(year, month, day);
    gainfirstdaytoweek(year, month);
    console.log(getCountDays(year, month, day));
    arr(year, month, day);


})();