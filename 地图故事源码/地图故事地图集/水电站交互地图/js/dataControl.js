// ! 需要引入 LOCA 数据可视化脚本以及 geojsonSrc 对应的数据源脚本
// ! 需要使用服务器打开 index.html 文件，否则图标加载会出现跨域报错问题

// 创建 LOCA 数据可视化容器
var loca = new Loca.Container({
    map,
});
// 创建数据源对象
var geo = new Loca.GeoJSONSource({
    data: geojsonSrc
});
// 创建热力图图层对象
var heatmap = new Loca.HeatMapLayer({
    zIndex: 10,
    opacity: 1,
    visible: false, // 默认关闭显示
    zooms: [2, 22],
});
// 设置热力图数据源及展现样式
heatmap.setSource(geo, {
    radius: 250000,
    unit: 'meter',
    height: 400000,
    gradient: {
        0.1: '#2A85B8',
        0.2: '#16B0A9',
        0.3: '#29CF6F',
        0.4: '#5CE182',
        0.5: '#7DF675',
        0.6: '#FFF100',
        0.7: '#FAA53F',
        1: '#D04343',
    },
    value: function (index, feature) {
        return feature.properties.number;
    },
    heightBezier: [0, .23, .57, .78],
});
// 将图层添加到容器中
loca.add(heatmap);

//触发热力动画button
document.getElementById('heatmapAnimationBtn').addEventListener('click', function () {
    addAnimationToHeatmap();
});
//热力动画函数
function addAnimationToHeatmap() {
    heatmap.addAnimate({
        key: 'height',  // 高度跳动
        value: [0, 1],
        duration: 2000,
        easing: 'BackOut',
    });
    heatmap.addAnimate({
        key: 'radius',  // 角度跳动
        value: [0, 1],
        duration: 2000,
        easing: 'BackOut',
        transform: 1000,
        random: true,
        delay: 5000,
    });
}

// 新建POI分布点标注图层
var pointsLayer = new Loca.LabelsLayer({
    zIndex: 15,
    opacity: 1,
    visible: true,
});
// 设置标注图层的数据
pointsLayer.setSource(geo);
// 设置标注图层的样式
pointsLayer.setStyle({
    icon: {
        type: 'image',
        image: "./resource/img/Hydrostation.png",  
        size: [30, 30],
        anchor: 'center',
    },
	//每个图标下面的文字
    text: {
        // 每项配置都可使用回调函数来动态配置
        content: (index, theater) => {
            return theater.properties.name;
        },
        style: {
            fontSize: 14,
			fontFamily: '楷体',
            fontWeight: 'normal',
            fillColor: '#6B5B6B',
            strokeColor: '#ffffff',
            strokeWidth: 1,
        },
        direction: 'bottom',
    },
    extData: (index, theater) => {
        return theater.properties;
    },
});
// 将图层添加到容器中
loca.add(pointsLayer);

pointsLayer.on('complete', () => {
    // 建立普通的标注，用于展示文本
    var normalMarker = new AMap.Marker({
        offset: [70, -15],
    });
    var labelMarkers = pointsLayer.getLabelsLayer().getAllOverlays();
    for (let marker of labelMarkers) {
        marker.on("click", () => {
            // 点击缩放到该地点
            map.setZoomAndCenter(13.12, [marker.getExtData().x, marker.getExtData().y]);
            // 展示详情表格数据
            setDetailInfoData(marker.getExtData().name);
        });
        marker.on('mouseover', (e) => {
            // 展示简单的信息
            var position = e.data.data && e.data.data.position;
            if (position) {
                normalMarker.setContent(
                    '<div class="data-info" style="font-family:楷体;"><div class="data-info-title" style="color:purple;text-align:center;font-family:楷体;">' + marker.getExtData().name + '</div>所在省份：' + marker.getExtData().province + '<br>建成年份：' + marker.getExtData().number + '分</div>',
                );
                normalMarker.setPosition(position);
                map.add(normalMarker);
            }
        });
        marker.on('mouseout', () => {
            map.remove(normalMarker);
        });
    }
});


// 关闭、开启LOCA热力图
function hideHeatmap() {
    heatmap.hide();
}
function showHeatmap() {
    heatmap.show();
}

// 关闭、开启POI分布点图层
function hidePointsLayer() {
    pointsLayer.hide();
}
function showPointsLayer() {
    pointsLayer.show();
}