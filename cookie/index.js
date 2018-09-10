/**
 * Created by maoyunxiang on 2017/7/20.
 */

// 获取、设置cookies值
// escape() 函数可对字符串进行编码
// 可以使用 unescape() 对 escape() 编码的字符串进行解码
// gettime()
// settime()
// reduce()

(function () {

    //设置cookie的name、value、expires值
    function setCookie(name, value) {
        var Days = 30;
        var time = new Date()
        time.setTime(time.getTime() + Days * 24 * 60 * 60 * 1000);//设置到期时间
        document.cookie = name + "=" + escape(value) + ";expires=" + time.toGMTString() + "domain=.adelacoco.com;path=/";
    }

    // 获取所有cookie的name和value值
    function getcookiename(name) {
        var cookies = document.cookie;//获取cookie所有的name和value值
        var cookiesarray = cookies.split("; ");//以"；"将获取的值 分割成字符串数组
        var cookieslist = [];
        //将获取的值 放在数组对象中
        cookiesarray.forEach(function (item, index, array) {
            cookieslist.push({
                name: (item.split("=")[0]),
                value: (item.split("=")[1])
            });
        });
        var findname = cookieslist.filter(function (item, index, array) {
            return item.name === name;
        });
        return findname;
    }

    debugger

    console.log(123456, getcookiename("mm4"));
    // 获取指定name的cookie value值
    function getCookievalue(name) {
        var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
        if (arr = document.cookie.match(reg))
            return unescape(arr[2]);
        else
            return null;
    }

    //删除指定name的cookie值
    function deletecookie(cookiename) {
        var Days = 1;
        var time = new Date()
        time.setTime(time.getTime() - Days * 24 * 60 * 60 * 1000);//设置到期时间
        document.cookie = cookiename + "=" + escape(getCookievalue(cookiename)) + ";expires=" + time.toGMTString();
    }

    //清除所有cookie
    function clearCookie() {
        var keys = document.cookie.match(/[^ =;]+(?=\=)/g);
        if (keys) {
            for (var i = keys.length; i--;)
                document.cookie = keys[i] + '=0;expires=' + new Date(0).toUTCString()
        }
    }

    function init() {
        setCookie("mm1", 2122);
        setCookie("mm2", 2122);
        setCookie("mm3", 2122);
        setCookie("mm4", 2122);
        setCookie("mm5", 1123);
    }

    init();
    // deletecookie("mm2");


    //有规律的字符串转换为数组，再转换为对象
    var abc = document.cookie.split('; ').reduce(function (prev, next, index, array) {
        var arr = next.split('=');
        prev[arr[0]] = arr[1];
        return prev;
    }, {});
    console.log(11, abc);


    //几个数组拼接成一个数组
    var flattened = [[0, 1], [2, 3], [4, 5]].reduce(function (a, b) {
        return a.concat(b);
    }, []);
    console.log(flattened);

    //求和
    var total = [0, 1, 2, 3].reduce(function (sum, value) {
        return sum + value;
    }, 0);
    console.log(total);


    var a = "mm,22,aa,ss,dd";
    var mmm = a.split(",").reduce(function (prev, next, index) {
        prev[index] = next;
        return prev;
    }, {});
    console.log(mmm);

})();
