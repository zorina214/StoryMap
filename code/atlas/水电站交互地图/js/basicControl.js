// 本js功能实现：创建地图&定义各个控件窗口的显示与关闭函数

// 创建地图
var map = new AMap.Map("container", {
	//3D地图，可以在高德地图api的开发中查看
    // 设置为全国显示范围
    center: [114.946609, 32.262324],//地图中心点
    zoom: 5.87,//缩放级别
    zooms: [4, 20], // 限制地图的缩放等级范围
    resizeEnable: true,//是否可调整大小
    viewMode: '3D',//视图模式（3D）
    pitch: 40, // 仰角(3D地图中的设置)
});


// 通过类名隐藏控件
function hidddenByClassName(className){
    var element = document.getElementsByClassName(className);
    for (var i = 0; i< element.length; i+=1){
        element[i].style.display="none";
    }
}

// 通过类名显示控件
function showByClassName(className){
    var element = document.getElementsByClassName(className);
    for (var i = 0; i< element.length; i+=1){
        element[i].style.display="block";
    }
}

// 信息窗口对象
var nav_info = document.getElementById("nav-info");
var search_info = document.getElementById("search-info");

/*// 隐藏信息窗口
function closeNavInfo(){
    nav_info.style.display = "none";
}
function closeSearchInfo(){
    search_info.style.display = "none";
}

// 显示信息窗口
function showNavInfo(){
    nav_info.style.display = "block";
}
function showSearchInfo(){
    search_info.style.display = "block";
}*/

// 隐藏功能选项界面
function closeTools() {
    hidddenByClassName("input-card");
    hidddenByClassName("measureTools");
    hidddenByClassName("drawTools");
    hidddenByClassName("navigationTools");
    closeNavInfo();
}
