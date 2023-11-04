// ! 需要引入数据脚本
var detailInfo = document.getElementById("data-detail-info");
var lastTable = '';

// 设置信息窗口打开、关闭函数
function showdetailInfo(){
    detailInfo.style.display = "block";
}
function closedetailInfo(){
    detailInfo.style.display = "none";
}

// 创建表格的数据项，并没有创建表格对象
function creatTd(tr, text){
    var td = document.createElement("td");
    td.innerText = text;
    tr.appendChild(td);
}

// 设置表格并添加到页面中
function setDetailInfoData(name){
    console.log(name);
    // 打开列表窗口显示
    showdetailInfo();
    // 获取数据列表
    var list = detail[name]['list'];
    // 清除上一个数据，新增一个新的数据
    if (lastTable != ''){
        detailInfo.removeChild(lastTable);
    }
    var infoTable = document.createElement("table");//创建一个表格对象
    infoTable.id = "data-detail-info-table";//定义这个表格对象的id是data-detail-info-table
    
    // 先添加表头
    var dataTitle = document.createElement("tr");
	//下面这些是创建表头的内容
    creatTd(dataTitle, "日期");
    creatTd(dataTitle, "剧目");
    creatTd(dataTitle, "票价");
	creatTd(dataTitle, "余票");
    infoTable.appendChild(dataTitle);//添加表头这一行数据
    for(var i=0;i<list.length;i+=1){
        // 循环添加数据行
        var tr = document.createElement("tr");//创建表格内容的载体对象
        tr.className = "data-detail-info-tr";//表格内容的载体对象的类名叫data-detail-info-tr
        // 添加数据子项（调用函数function creatTd(tr, text)）
        creatTd(tr, list[i]["time"]);
        creatTd(tr, list[i]["performence"]);
        creatTd(tr, list[i]["price"]);
		creatTd(tr, list[i]["left"]);
        infoTable.appendChild(tr);//再表格对象中添加一行信息
    }
    detailInfo.appendChild(infoTable);//窗口中添加表格
    lastTable = infoTable;
}

// 初始关闭信息窗口
closedetailInfo();

// 地图点击无POI点的地方关闭信息窗口
map.on('click', function (e) {
    closedetailInfo();
});