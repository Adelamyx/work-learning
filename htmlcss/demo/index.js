/**
 * Created by maoyunxiang on 2017/7/7.
 */

(function () {

    /*tab切换*/
    var navTitleLi = document.querySelectorAll(".nav-title ul li");
    var navContentDiv = document.querySelectorAll(".nav-content-div");
    changetab(0);
    navTitleLi.forEach(function (item, index, array) {
        item.addEventListener("click", function () {
            changetab(index);
        })
    })
    //点击li是改变div
    function changetab(index) {
        for (var i = 0; i < navTitleLi.length; i++) {
            navTitleLi[i].setAttribute("class", "nav-title-li");
            navContentDiv[i].style.display = "none";
        }
        navTitleLi[index].setAttribute("class", "nav-title-li-click");
        navContentDiv[index].style.display = "block";
    }


    // ajax数据请求
    var headspans = document.querySelector(".ielts-top-num"); //head中的评论圆圈
    var hottitle = document.querySelector(".pagemain-hot-title"); //头条
    var originajax = document.querySelector("#originajax"); //机构简介
    var onlinecourses = document.querySelector("#onlinecourses"); //在线课程

    var ajax = new XMLHttpRequest;
    ajax.open('GET', "./school.json", true);
    ajax.send();
    ajax.onreadystatechange = function () {
        if (ajax.readyState == 4 && ajax.status == 200) {
            var data = JSON.parse(ajax.responseText);
            console.log(data);
            var str = "";
            headspans.innerHTML = "";
            for (var i = 0; i < data.head.length; i++) {
                li = '<li class="ielts-top-circle"><span class="ielts-top-span">' + data.head[i].word + '</span><br>' + data.head[i].count + '</li>';
                str += li;

            }
            headspans.innerHTML = str; //head中的评论圆圈
            hottitle.innerHTML = data.hottitle; //头条
            //机构简介
            var qualifications = '<p class="pagemain-content-word"><span class="pagemain-content-word-span">' + data.organization.qualification.title + '</span> ' + data.organization.qualification.content + '</p>';
            var words = "";
            for (var i = 0; i < data.organization.character.content.length; i++) {
                li = '<span class="pagemain-content-greenword">' + data.organization.character.content[i].item + '</span>';
                words += li;
            }
            var characters = '<p class="pagemain-content-word"><span class="pagemain-content-word-span">' + data.organization.character.title + words + '</span></p>';
            var introduces = '<p class="pagemain-content-word"><span class="pagemain-content-word-span">' + data.organization.introduce.title + '</span></span> ' + data.organization.introduce.content + '</p>';
            originajax.innerHTML = qualifications + characters + introduces; //机构简介


            //在线课程
            var item = "";
            for (var i = 0; i < data.onlinecourse.content.length; i++) {
                img = '<a href="http://www.haiziwang.com/"><img src="' + data.onlinecourse.content[i].img + '" alt="课程"></a>';
                course = '<div class="course-online"><a href="" class="online-title">' + data.onlinecourse.content[i].type + '</a><a href="" class="online-num">' + data.onlinecourse.content[i].classhour + '</a></div>';
                if (data.onlinecourse.content[i].discount != 0) {
                    money = '<div><span class="course-title">' + data.onlinecourse.content[i].title + '</span><span class="course-discount">' + data.onlinecourse.content[i].discount + '</span><span class="course-price">' + data.onlinecourse.content[i].money + '</span></div>';
                } else {
                    money = '<div><span class="course-title">' + data.onlinecourse.content[i].title + '</span><span class="course-price">' + data.onlinecourse.content[i].money + '</span></div>';
                }
                item += '<div class="course-img">' + img + course + money + '</div>'
            }
            onlinecourses.innerHTML += item;





            // console.log(Object.prototype.toString.call(JSON.parse(datas)));//判断类型
        }
    }

})();