/**
 * Created by maoyunxiang on 2017/7/3.
 */
(function () {


    var title = document.querySelector("#calender-year");
    var d = new Date();
    //获取固定值，不改变的
    var invariantyear = d.getFullYear()//获取年份，不对它进行变化
    var invariantmonth = d.getMonth() + 1;//获取月份，不对它进行变化
    var invariantday = d.getDate();//获取日，不对它进行变化

    //获取改变值，可变化的
    var year = d.getFullYear();//获取年
    var month = d.getMonth() + 1;//获取月   月是(0-11代表一到十二月份)
    var day = d.getDate();//获取日
    var week = d.getDay();//获取星期
    var datearr = [];//日历body部分，当前页面上显示的日期

    var calendartoday = document.querySelector("#calendar-today");//返回当前日期，today

    var yearselect = document.querySelector("#yearselect");

    //选择修改年份
    var selects = document.querySelector("#select");

    selects.addEventListener("change", function () {
        year = selects.value;
        showTitle(year, month, day);
        arr(year, month, day);
        yearselect.setAttribute("class", "");

    })

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

    //修改年份
    title.addEventListener("click", function (year) {
        yearselect.setAttribute("class", "show");
    }, false);


    //点击进行月份--
    var prevmonth = document.querySelector("#prev-month");
    prevmonth.addEventListener("click", function () {
        if (month > 1) {
            month--;
            showTitle(year, month, day);
            arr(year, month, day);
        } else {
            year--;
            month = 12;
            showTitle(year, month, day);
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
        } else {
            year++;
            month = 1;
            showTitle(year, month, day);
            arr(year, month, day);
        }
    }, false);

    //获取每个月日历上显示的天数
    function arr(year, month, day) {
        var countDay = getCountDays(year, month, day);//获取每月的天数
        var firsttoweek = gainfirstdaytoweek(year, month);//获取每月的第一天是周几
        var datearr = [];
        var today = day;

        var firstline = (6 - firsttoweek) + 1;//第一行的个数值
        var heights = 0;//日历的高度
        var h = parseInt((countDay - firstline) / 7);//最后一行的个数
        var lastlines = 0;//最后一行后面的数
        //获取日历的高度，最后一行的后面的数字个数
        if ((countDay - firstline) % 7 === 0) {
            heights = h + 1;
            lastlines = 0;
        } else {
            heights = h + 2;
            lastlines = 7 - ((countDay - firstline) % 7);
        }

        var firstlines = 7 - firstline;//第一行前面有几个数字
        var lastweekcount = getCountDays(year, month - 1, day);//上个月的天数

        //将每个月显示在日历上的数字放到数组datearr中
        //分三步：第一行前部分，每个月的天数，最后一行的后部分
        for (var i = 0; i < firstlines; i++) {
            datearr.unshift(lastweekcount);
            lastweekcount--;
        }
        for (var i = 0; i < countDay; i++) {
            datearr.push(i + 1);
        }
        for (var i = 0; i < lastlines; i++) {
            datearr.push(i + 1);
        }

        //dom添加操作
        var tables = document.querySelector("#calendar-body-box");
        var tableshead = "<tr>" +
            "<th>周日</th>" +
            "<th>周一</th>" +
            "<th>周二</th>" +
            "<th>周三</th>" +
            "<th>周四</th>" +
            "<th>周五</th>" +
            "<th>周六</th>" +
            "</tr>";

        var tablesbody = "";
        var tablesbodytd = "";
        var tablesbodytr = "";

        for (var i = 0; i < heights; i++) {
            var tablesbodytd = "";
            for (var j = 0; j < 7; j++) {
                tablesbodytd += "<td>" + datearr[i * 7 + j] + "</td>";
            }
            tablesbodytr += "<tr>" + tablesbodytd + "</tr>";
        }
        tablesbody = tablesbodytr;
        tables.innerHTML = tableshead + tablesbody;


        var tds = tables.querySelectorAll("tr td");

        //样式区别当月日期和非当月日期
        function styles() {
            for (var i = 0; i < firstlines; i++) {
                tds[i].setAttribute("class", "a");
            }
            for (var i = (countDay + firstlines); i < (countDay + firstlines + lastlines); i++) {
                tds[i].setAttribute("class", "a");
            }
        }

        styles();//样式区别当月日期和非当月日期


        //判断该日期是不是今天，然后高亮显示今天的日期，颜色红色
        function istody() {
            if (invariantyear === year && invariantmonth === month && invariantday === day) {
                tds[today + firstlines - 1].setAttribute("class", "b");
                calendartoday.setAttribute("class", "");
                calendartoday.innerHTML = "";
            }
            else {
                calendartoday.innerHTML = "今天";
                calendartoday.setAttribute("class", "calendar-today");
            }
        }

        istody();
        tds.forEach(function (item, index, array) {
            item.addEventListener("click", function () {

                for (var z = 0; z < (firstlines + countDay + lastlines); z++) {
                    array[z].setAttribute("class", "");
                    styles();
                }
                array[index].setAttribute("class", "b");

                if (index < firstlines) {
                    day = item.innerHTML;
                    month--;
                } else if (index < (firstlines + countDay)) {
                    day = item.innerHTML;
                } else {
                    day = item.innerHTML;
                    month++;
                }
                showTitle(year, month, day);
                istody();

            })
        })
    }

    //回到今天
    calendartoday.addEventListener("click", function () {
        year = invariantyear;
        month = invariantmonth;
        day = invariantday;
        showTitle(year, month, day);
        arr(year, month, day);
    })


    showTitle(year, month, day);
    arr(year, month, day);
})();