// AMap需要引入 mouseTool 插件——测量画图工具
// 新建测量和绘图用的鼠标工具
var mouseTool = new AMap.MouseTool(map);

//先设置全局数组变量当做保存绘图图形功能的存储容器
// 存储当前功能对象
var recentFunc = "";

// 存储画好的覆盖物，function (e)是鼠标绘制完之后的回调函数
var overlays = [];
mouseTool.on('draw', function (e) {
    // 如果是测量则不存储，不是测量需要储存刚刚在界面上的画的图形
    if (recentFunc != 'rule' && recentFunc != 'measureArea') {
        overlays.push(e.obj);//将鼠标画的覆盖物对象（是高德地图定义的对象）储存到overlays数组中
    }
})

// 匹配对应的功能: 绘图&测量，调用draw函数，传入rule或者measureArea的参数（type）
function draw(type) {
    switch (type) {
        // 距离测量
        case 'rule': {
            mouseTool.rule({
                // 配置显示的样式strokeColor、fillColor和fillOpacity属性分别用于配置边框颜色、填充颜色和填充不透明度。——其他的样式是api中规定好的不用自己配置
                startMarkerOptions: {
                    icon: new AMap.Icon({
                        size: new AMap.Size(19, 31),//图标大小
                        imageSize: new AMap.Size(19, 31),
                        // 通过链接加载图片
                        image: "https://webapi.amap.com/theme/v1.3/markers/b/start.png"
                    }),
                    offset: new AMap.Pixel(-9, -31),
					draggable:true
                },
                endMarkerOptions: {
                    icon: new AMap.Icon({
                        size: new AMap.Size(19, 31),//图标大小
                        imageSize: new AMap.Size(19, 31),
                        image: "https://webapi.amap.com/theme/v1.3/markers/b/end.png"
                    }),
                    offset: new AMap.Pixel(-9, -31),
					draggable:true//可以拖动小图标
                },
                midMarkerOptions: {
                    icon: new AMap.Icon({
                        size: new AMap.Size(19, 31),//图标大小
                        imageSize: new AMap.Size(19, 31),
                        image: "https://webapi.amap.com/theme/v1.3/markers/b/mid.png"
                    }),
                    offset: new AMap.Pixel(-9, -31)
                },
                lineOptions: {
                    strokeStyle: "solid",
                    strokeColor: "#6A5ACD",
                    strokeOpacity: 1,
                    strokeWeight: 2
                }
            });
            break;
        }
        // 面积测量
        case 'measureArea': {
            mouseTool.measureArea({
                // 配置样式
                strokeColor: '#6A5ACD',//多边形的边框颜色
                fillColor: 'rgba(102, 79, 177, 0.4)',//多边形填充的淡紫色，透明度0.4
                fillOpacity: 0.3
            });
            break;
        }
        // 画点
        case 'marker': {
            mouseTool.marker({
				//点的点可以拖动
				draggable:true,
                // 默认鼠标点击位置和图片左上角对齐,需要偏移调整效果
                offset: [-15, -25],
                // 添加 icon 
                icon: "./resource/img/position_icon.png"
            });
            break;
        }
        // 画线
        case 'polyline': {
            mouseTool.polyline({
				strokeColor:'purple',
				isOutline:true,
            });
            break;
        }        
        // 画面（多边形）
        case 'polygon': {
            mouseTool.polygon({
                fillColor: '#6A5ACD',
                strokeColor: 'rgba(102, 79, 177, 0.4)',
				
            });
            break;
        }
        // 画矩形
        case 'rectangle': {
            mouseTool.rectangle({
                fillColor: '#6A5ACD',
                strokeColor: 'rgba(102, 79, 177, 0.4)'
            });
            break;
        }
        // 画圆
        case 'circle': {
            mouseTool.circle({
                fillColor: '#6A5ACD',
                strokeColor: 'rgba(102, 79, 177, 0.4)'
            });
            break;
        }
    }
}

// 清除覆盖物
function clearOverlays() {
    if (overlays.length > 0) {
        map.remove(overlays);
        overlays = [];
    }
}

// 关闭工具, 并且隐藏功能界面
function closeMouseTools() {
    //关闭工具
    mouseTool.close(true);
    // 取消所有功能勾选
    for (var i = 0; i < mouseToolsRadios.length; i += 1) {
        mouseToolsRadios[i].checked = false;
    }
    // 隐藏界面
    closeTools();
}

// 初始隐藏全部功能选项界面
closeTools();

// 绑定显示\隐藏功能界面的按钮点击的事件
document.getElementById('measureTools_button').onclick = function () {
    closeMouseTools(); // 关闭其他功能页面
    showByClassName("input-card");
    showByClassName("measureTools");
};
document.getElementById('drawTools_button').onclick = function () {
    closeMouseTools(); // 关闭其他功能页面
    showByClassName("input-card");
    showByClassName("drawTools");
};

//mouseTool的监听器是function（e）
// 绑定触发绘图\测量功能的按钮
var mouseToolsRadios = document.getElementsByName('mouseTools');
for (var i = 0; i < mouseToolsRadios.length; i += 1) {
    mouseToolsRadios[i].onchange = function (e) {
        draw(e.target.value)
        recentFunc = e.target.value;
    }
}

// 绑定触发关闭工具的按钮
document.getElementById('close-measure').onclick = closeMouseTools;
document.getElementById('close-draw').onclick = function () {
    closeMouseTools();
    // 将覆盖物加载到地图(要先关闭 mouseTools)
    if (overlays.length > 0) {
        map.add(overlays);
    }
}

// 绑定清除上一个覆盖物的按钮的事件
document.getElementById('clear-draw').onclick = function () {
    if (overlays.length >= 1) {
        // 弹出最后一个覆盖物
        map.remove(overlays[overlays.length - 1]);
        overlays.pop();
    }
};

// 绑定清空覆盖物按钮
document.getElementById('clear-all-draw').onclick = function () {
    clearOverlays();
};


// 添加鼠标控件的一个功能：让鼠标在地图上移动的过程中，右下角添加一个白色框，里面能显示实时鼠标位置所在的经纬度
map.on('mousemove', function (e) {//子啊定义一个鼠标移动事件的响应函数
    var position = e.lnglat.getLng() + ', ' + e.lnglat.getLat();//
    document.getElementById('mouse-position').innerHTML = position;
    document.getElementById('mouse-position').style.backgroundColor = 'white';
});
