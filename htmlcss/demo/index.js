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


})();
