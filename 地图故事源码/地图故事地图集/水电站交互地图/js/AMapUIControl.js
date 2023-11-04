// js:实现地图控件逻辑层&热力图的制作（LOCA数据，参考自高德地图开发文档）

//问题1：图层在不添加基础图层的时候会无法进行图层显示，因此，声明基础图层数组，但是不添加相关图层内容
//问题2：用LOCA做出来的热力图无法在图层中显示——已解决，根据CSDN文档中一片博文：要重新写一个函数将api中的已有的卫星图等图层与自己制作的LOCA数据可视化的图层统一打开关闭的调用管理
//这样在浏览器中打开可以，在我使用的这个HbuiderX中打开不可以——不知道为啥？


// 设置两个指标对象进行存储图层是否可见
var optHeatmap = { opt: false }; // 初始默认关闭热力图，地图为黑色
var optPointsLayer = { opt: true }; // 初始默认开启分布点图层

function setMapLayers(id_name, opt_heatmap, opt_pointsLayer) {
    switch (id_name) {
        case "heatmap":
            // 开启、关闭热力图的展示
            if (opt_heatmap.opt) {
                map.setMapStyle('amap://styles/normal');
                hideHeatmap();
                opt_heatmap.opt = false;
            } else {
                map.setMapStyle('amap://styles/dark');
                showHeatmap();
                opt_heatmap.opt = true;
            }
            break;
        case "pointsLayer":
            // 开启、关闭分布点的展示
            if (opt_pointsLayer.opt) {
                hidePointsLayer();
                opt_pointsLayer.opt = false;
            } else {
                showPointsLayer();
                opt_pointsLayer.opt = true;
            }
            break;
        default:
            // console.log(id_name, opt_heatmap, opt_pointsLayer);  调试用的        
    }
}

//用plugin加载控件
AMap.plugin(['AMap.Scale', 'AMap.HawkEye','AMap.MapType','AMap.ControlBar'], function(){
	//添加控件:比例尺
	map.addControl(new AMap.Scale({
        position: {
           bottom: "30px",
           left: "30px"
        },
    }))
	//添加控件:鹰眼()左下角
	map.addControl(new AMap.HawkEye({
        position: {
            bottom: "60px",
            left: "10px"
        },
    }))    
	//添加罗盘控件
	map.addControl(new AMap.ControlBar({
	    position: {
	        bottom: "150px",
	        right: "8px"
	    },
	})) 
})


AMapUI.loadUI(["control/BasicControl"], function (BasicControl) {
    // 缩放控件对象
    var zoomCtrl = new BasicControl.Zoom({
        theme: "light",
        position: {
            bottom: "30px",
            right: "30px"
        },
        showZoomNum: false // 不显示Zoom值
    });

    // 图层切换控件对象
    var layerCtrl = new BasicControl.LayerSwitcher({
        theme: "light",//空间主题：浅色主题
		//空间位置
        position: {
            bottom: "110px",
            right: "30px"
        },
        // 基础图层(不提供基础图层的选择，避免影响数据展示)
        baseLayers: [
        ],
        // 可选的覆盖图层
        overlayLayers: [
            {
                enable: false,
                id: "standard",
                name: "标准图",
                layer: new AMap.TileLayer(),
            },
            {
                id: "satellite",
                name: "卫星图",
                layer: new AMap.TileLayer.Satellite(),
            },
            {
                id: "roadNet",
                name: "路网图",
                layer: new AMap.TileLayer.RoadNet(),
            },
			{
			    enable: false,
			    id: "heatmap",
			    name: "水电站分布热力图",
			    layer: heatmap,
			},
			{
			    enable: true,
			    id: "pointsLayer",
			    name: "全国水电站点位分布图",
			    layer: pointsLayer,
			}
        ]
    });

    console.log(layerCtrl);

    // 将当前可用图层设置到地图中(会移除 map 原有图层)
    map.setLayers(layerCtrl.getEnabledLayers());

    // 重写图层开启关闭功能
    // 问题解决：需要将layerControl对象写到AMapUI.loadUI(...) 里面才能控制热力图的加载才能生效
    layerCtrl._eventHandlers["layerInputClick"] = function (e) {
        e.stopPropagation();
        var target = this;
        var layerId = target.getAttribute("data-layer-id");
        // console.log(target.getAttribute("data-layer-id"))
        if ("INPUT" === target.tagName) {
            layerCtrl.syncPropsFromUI();
            layerCtrl._refreshMapLayers();
        }
        // 专题数据图层控制
        setMapLayers(layerId, optHeatmap, optPointsLayer);
    }

    // 添加控件
    map.addControl(zoomCtrl);
    map.addControl(layerCtrl);
});


	



