(function () {
    //es6函数改动
    //1、默认参数
    function abc(x=2, y=3) {
        return x * 2 + y * 3;
    }
    console.log(abc());
    //2、任意参数

    const PI = 3.1415926; //常量    
    //set和map数据结构
    //去重
    var a = new Set([1,2,3,1,1,2,'1','a','a','1',1,1,1]); 
    console.log([...a]);

    function uls(){
        return [1, ...document.querySelectorAll('.uls li')];
    }
    console.log(uls());
    const lis = new Set(uls());
    //size set成员总数
    console.log(lis.size);

    // add(value)：添加某个值，返回Set结构本身。
    // delete(value)：删除某个值，返回一个布尔值，表示删除是否成功。
    // has(value)：返回一个布尔值，表示该值是否为Set的成员。
    // clear()：清除所有成员，没有返回值。
    var set1 = new Set();
    set1.add(1).add(2).add(2).add(3);
    console.log(set1);
    console.log('delete',set1.delete(1));
    console.log('has',set1.has(2));
    console.log('clear',set1.clear());
    console.log(set1);

    // keys()：返回键名的遍历器
    // values()：返回键值的遍历器
    // entries()：返回键值对的遍历器
    // forEach()：使用回调函数遍历每个成员
    const set2 = new Set([1,2,3,4,5]);
    console.log(set2);
    for( let key of set2.keys()){
        console.log('keys',key);
    }
    for( let value of set2.values()){
        console.log('values',value);
    }
    for( let value of set2){
        console.log('省略values',value);
    }
    for( let entrie of set2.entries()){
        console.log('entries',entrie);
    }
    set2.forEach((value,key) => console.log('foreach',value*2));

    

})()