from pyecharts import options as opts
from pyecharts.charts import Pie, Timeline
from pyecharts.faker import Faker

# 数据字段
# 每个字典包含'name'和'value'键，表示类别的名称和对应的数值
real_data = [
    # 2005年的数据
    [
        {'name': '农、林、牧、渔、水利业', 'value': 7971.53254394485 },
        {'name': '采掘业', 'value': 13150.4331677006},
        {'name': '食品加工业', 'value': 4321.10798375122},
        {'name': '纺织业', 'value': 5835.33901300713},
        {'name': '木材家具加工业', 'value': 819.536279119494},
        {'name': '纸制品加工业', 'value': 3744.48166637039},
        {'name': '石油化学加工业', 'value': 34375.9430607408},
        {'name': '医药器械制造业', 'value': 4990.58019822886},
        {'name': '矿物制造业', 'value': 64247.2416328144},
        {'name': '电汽制造业', 'value': 8034.91985917179},
        {'name': '其他制造业', 'value': 1314.73970631279},
        {'name': '电力、煤气及水生产和供应业', 'value': 17122.9793077339},
        {'name': '建筑业', 'value': 3409.3185716514},
        {'name': '交通运输、仓储和邮政业', 'value': 16671.8142248211},
        {'name': '批发、零售业和住宿餐饮业', 'value': 5026.16639344278},
        {'name': '其他行业', 'value': 32283.1617077147},
    ],
    # 2006年的数据
    [
        {'name': '农、林、牧、渔、水利业', 'value': 8395.0957266445},
        {'name': '采掘业', 'value': 13140.5796622401},
        {'name': '食品加工业', 'value': 4592.71910780133},
        {'name': '纺织业', 'value': 6726.60827805064},
        {'name': '木材家具加工业', 'value': 143.277905998724},
        {'name': '纸制品加工业', 'value': 3937.87057797894},
        {'name': '石油化学加工业', 'value': 37139.150168073},
        {'name': '医药器械制造业', 'value': 5322.94241160606},
        {'name': '矿物制造业', 'value': 73970.0688121226},
        {'name': '电汽制造业', 'value': 9108.20972606596},
        {'name': '其他制造业', 'value': 1343.51256905115},
        {'name': '电力、煤气及水生产和供应业', 'value': 18811.9127835167},
        {'name': '建筑业', 'value': 3715.23850231817},
        {'name': '交通运输、仓储和邮政业', 'value': 18582.7174225919},
        {'name': '批发、零售业和住宿餐饮业', 'value': 5522.44},
        {'name': '其他行业', 'value': 35817.8082060196}
    ],
    # 2007年的数据
    [
        {'name': '农、林、牧、渔、水利业', 'value': 6013.13},
        {'name': '采掘业', 'value': 16865.65},
        {'name': '食品加工业', 'value': 5670.45},
        {'name': '纺织业', 'value': 7510.45},
        {'name': '木材家具加工业', 'value': 1163.71101911431},
        {'name': '纸制品加工业', 'value': 4568.219475809},
        {'name': '石油化学加工业', 'value': 42708.1418407989},
        {'name': '医药器械制造业', 'value': 5997.27273739083},
        {'name': '矿物制造业', 'value': 91635.22},
        {'name': '电汽制造业', 'value': 11394.4858091903},
        {'name': '其他制造业', 'value': 1458.56016918126},
        {'name': '电力、煤气及水生产和供应业', 'value': 20145.1902690053},
        {'name': '建筑业', 'value': 3812.53},
        {'name': '交通运输、仓储和邮政业', 'value': 22917.25},
        {'name': '批发、零售业和住宿餐饮业', 'value': 5733.58078576632},
        {'name': '其他行业', 'value': 43854.45}
    ],
    # 2008年的数据
    [
        {'name': '农、林、牧、渔、水利业', 'value': 6251.18},
        {'name': '采掘业', 'value':17332.01},
        {'name': '食品加工业', 'value': 5783.95},
        {'name': '纺织业', 'value': 7348.57},
        {'name': '木材家具加工业', 'value': 1232.9},
        {'name': '纸制品加工业', 'value': 4673.1},
        {'name': '石油化学加工业', 'value': 44274.36},
        {'name': '医药器械制造业', 'value': 6031.11},
        {'name': '矿物制造业', 'value': 97725.8},
        {'name': '电汽制造业', 'value': 12051.34},
        {'name': '其他制造业', 'value': 1474.84},
        {'name': '电力、煤气及水生产和供应业', 'value': 21016.02},
        {'name': '建筑业', 'value': 4562.02},
        {'name': '交通运输、仓储和邮政业', 'value': 23691.84},
        {'name': '批发、零售业和住宿餐饮业', 'value': 6412.26},
        {'name': '其他行业', 'value': 46785.8500000001}
    ],
    # 2009年的数据
    [
        {'name': '农、林、牧、渔、水利业', 'value': 6477.3},
        {'name': '采掘业', 'value': 18185.87},
        {'name': '食品加工业', 'value': 5512.1},
        {'name': '纺织业', 'value': 7345.14},
        {'name': '木材家具加工业', 'value': 1245.28},
        {'name': '纸制品加工业', 'value': 4563.73},
        {'name': '石油化学加工业', 'value': 46271.59},
        {'name': '医药器械制造业', 'value': 6427.27},
        {'name': '矿物制造业', 'value': 101686.16},
        {'name': '电汽制造业', 'value': 13864.01},
        {'name': '其他制造业', 'value': 1582.57},
        {'name': '电力、煤气及水生产和供应业', 'value': 24204.58},
        {'name': '建筑业', 'value': 6226.3},
        {'name': '交通运输、仓储和邮政业', 'value': 26068.47},
        {'name': '批发、零售业和住宿餐饮业', 'value': 6826.82218592381},
        {'name': '其他行业', 'value': 48451.96}
    ],
]

tl = Timeline()
for i in range(2005, 2010):
    year_index = i - 2005  # 根据年份计算索引
    year_data = real_data[year_index]  # 获取对应年份的数据

    attr = [data['name'] for data in year_data]

    pie = (
        Pie()
        .add(
            "商家A",
            [list(z) for z in zip(attr, [data['value'] for data in year_data])],
            rosetype="radius",
            radius=["30%", "55%"],
        )
        .set_global_opts(title_opts=opts.TitleOpts("某商店{}年营业额".format(i)))
    )
    tl.add(pie, "{}年".format(i))

tl.render("timeline_pie.html")


"""
attr = Faker.choose()
tl = Timeline()
for i in range(2015, 2020):
    pie = (
        Pie()
        .add(
            "商家A",
            [list(z) for z in zip(attr, Faker.values())],
            rosetype="radius",
            radius=["30%", "55%"],
        )
        .set_global_opts(title_opts=opts.TitleOpts("某商店{}年营业额".format(i)))
    )
    tl.add(pie, "{}年".format(i))
tl.render("timeline_pie.html")
"""