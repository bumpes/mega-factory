export interface SeedCreation {
  name: string;
  category: string;
  source: 'preset';
  setting_desc: string;
  copywriting_md: string;
  prompt: string;
  style_tag: string;
}

export const seedCreations: SeedCreation[] = [
  {
    name: '戴森球核心',
    category: '恒星工程',
    source: 'preset',
    setting_desc: '包裹整颗恒星的巨型能量收集结构，由数万亿块太阳能板组成，直径达1.5亿公里。核心区域温度高达数百万度，外层冷却系统延伸至奥尔特云边缘。',
    copywriting_md: '清晨六点，能量调度员李明站在观测廊，看着恒星光芒穿透数千层能量吸收板。他的咖啡杯微微震动——那是戴森球自转稳定系统的节奏。"又是能量满溢的一天，"他笑着在日志上写道。',
    prompt: 'colossal Dyson sphere surrounding a blazing star, overwhelming epic scale, megastructure, billions of solar panels orbiting in perfect formation, stellar engineering, hard sci-fi, cinematic lighting, 8k ultra detailed',
    style_tag: '硬科幻'
  },
  {
    name: '环形世界',
    category: '壳世界',
    source: 'preset',
    setting_desc: '环绕恒星的巨型环形栖息地，直径3亿公里，宽度160万公里。内表面可居住面积相当于300万个地球，通过离心力模拟重力，中央恒星提供光照。',
    copywriting_md: '艾拉骑着光帆摩托穿越环形世界的"天空"，远处大陆弧线向上弯曲，最终消失在云端。她的孩子在下方草原奔跑，那里一年四季如春。"有时候忘了这是人造的，"她对同伴说。',
    prompt: 'massive ring world orbiting a star, interior landscape visible, overwhelming epic scale, megastructure, curved horizon rising into the sky, multiple continents, hard sci-fi, epic vista, 8k',
    style_tag: '太空歌剧'
  },
  {
    name: '恒星引擎',
    category: '恒星工程',
    source: 'preset',
    setting_desc: '可移动整颗恒星的巨型推进系统，通过不对称辐射推力缓慢改变恒星轨道。整个结构延伸数天文单位，需要千年才能完成一次轨道调整。',
    copywriting_md: '导航员陈浩凝视着星图，恒星引擎的推力尾迹在后方延伸0.5光年。"我们正以每秒50公里移动，"他说，"但相对于银河系，这只是散步。"船员的家人在恒星周围的行星上生活，跟随这颗太阳迁徙。',
    prompt: 'giant stellar engine moving an entire star, massive thruster structures extending astronomical units, overwhelming epic scale, megastructure, star trailing plasma exhaust, deep space, hard sci-fi, 8k',
    style_tag: '硬科幻'
  },
  {
    name: '行星发动机阵列',
    category: '行星工程',
    source: 'preset',
    setting_desc: '安装在行星表面的巨型推进器群，可将整颗行星推离原轨道。每台发动机高5公里，喷射等离子流温度超过太阳核心，需要消耗行星地壳物质作为燃料。',
    copywriting_md: '小薇从学校窗户望向地平线，七号发动机的光柱刺破大气层，将天空染成紫色。"妈妈说我们到达新太阳系时我就老了，"她在日记里写。窗外，城市随行星一起穿越星际空间。',
    prompt: 'planetary engines mounted on a planet surface, colossal thrusters firing plasma beams into space, overwhelming epic scale, megastructure, city beneath the engines, interstellar travel, hard sci-fi, cinematic, 8k',
    style_tag: '硬科幻'
  },
  {
    name: '黑洞城市',
    category: '能源巨构',
    source: 'preset',
    setting_desc: '围绕微型黑洞建造的能源采集与科研城市，利用彭罗斯过程提取旋转能量。城市悬浮在事件视界外100公里处，时间膨胀效应使内部时间流速仅为外界的1/10。',
    copywriting_md: '物理学家王教授在黑城已经住了3年，外界只过了3个月。"这里一天等于外面10天，"他说，"我有足够时间思考。"窗外，吸积盘的蓝移光芒照亮了悬浮花园，孩子们在低重力区跳跃。',
    prompt: 'city built around a black hole, structures hovering near event horizon, overwhelming epic scale, megastructure, accretion disk glowing blue, time dilation visualization, hard sci-fi, cyberpunk elements, 8k',
    style_tag: '赛博朋克'
  },
  {
    name: '奥尼尔圆柱体群',
    category: '栖息地',
    source: 'preset',
    setting_desc: '由20个巨型旋转圆柱体组成的太空栖息地群，每个圆柱长30公里、直径6公里。内部有山脉、河流、城市，通过旋转产生0.9G重力，可容纳5000万人。',
    copywriting_md: '李娜骑着自行车穿越圆柱体的"天空"，远处的地面弯曲向上，形成完整的圆环。她的农场在第三区，种植着低重力环境下长成的巨型番茄。"有时候抬头能看到另一个圆柱，"她说，"像天上的浮岛。"',
    prompt: 'multiple O\'Neill cylinders in space, interior visible with landscapes and cities, overwhelming epic scale, megastructure, curved ground rising into sky, multiple habitats in formation, hard sci-fi, pastoral, 8k',
    style_tag: '太空歌剧'
  },
  {
    name: '星际方舟',
    category: '世代飞船',
    source: 'preset',
    setting_desc: '长距离星际航行的巨型世代飞船，长50公里，可容纳10万人。飞船内部有完整的生态系统、城市、农田，航程预计800年，经历数十代人的生与死。',
    copywriting_md: '第七代船长张明站在舰桥，看着星图上遥远的目标恒星。"爷爷的爷爷出发时，地球还在争论这个计划，"他在航行日志写。飞船中部的森林里，孩子们在人造阳光下玩耍，他们从未见过真正的天空。',
    prompt: 'massive generation ship traveling between stars, 50km long vessel with visible interior ecosystems, overwhelming epic scale, megastructure, city inside the ship, deep space journey, hard sci-fi, epic scale, 8k',
    style_tag: '硬科幻'
  },
  {
    name: '量子计算云',
    category: '计算巨构',
    source: 'preset',
    setting_desc: '利用整个星云物质构建的分布式量子计算网络，计算能力超过宇宙中所有行星计算机总和。计算节点散布在数光年范围内，通过量子纠缠实时通信。',
    copywriting_md: '程序员小吴"接入"计算云意识，他的思维在数光年范围内展开。"一个问题还没算完，答案已经从另一端传来，"他描述那种体验。他的身体躺在地球医院的维生舱里，意识已在云端工作了三周。',
    prompt: 'quantum computing nebula, vast cloud of computation nodes spanning light years, overwhelming epic scale, megastructure, glowing neural network patterns in space, hard sci-fi, abstract technology, 8k',
    style_tag: '赛博朋克'
  },
  {
    name: '引力透镜阵列',
    category: '观测巨构',
    source: 'preset',
    setting_desc: '利用太阳引力透镜效应观测系外行星的巨型传感器阵列，分布在太阳焦点区域（550天文单位外）。分辨率足以看清100光年外行星表面的建筑物。',
    copywriting_md: '天文学家林博士调整着第3000号传感器的位置，屏幕上显示出半人马座阿尔法星行星的街道。"能看到他们在走路，"她惊叹。她的团队在太阳焦点区工作，距离地球3天的光速通信延迟。',
    prompt: 'gravitational lens sensor array around the sun, massive dish antennas at solar focal point, overwhelming epic scale, megastructure, observing distant exoplanets, hard sci-fi, solar corona visible, 8k',
    style_tag: '硬科幻'
  },
  {
    name: '反物质工厂',
    category: '能源巨构',
    source: 'preset',
    setting_desc: '在木星大气层中采集氢同位素并合成反物质的巨型工厂，占地相当于整个木星大红斑。生产的反物质储存在磁约束容器中，供星际航行使用。',
    copywriting_md: '工程师老赵在工厂控制室监控着反物质产量，窗外木星风暴翻涌。"一克反物质够一艘飞船航行10光年，"他说。工厂已经运行了50年，生产了足够装备整个舰队的反物质燃料。',
    prompt: 'antimatter factory in Jupiter atmosphere, massive industrial structures floating in gas giant, overwhelming epic scale, megastructure, Jupiter storm visible, hard sci-fi, industrial design, 8k',
    style_tag: '硬科幻'
  },
  {
    name: '生态穹顶城',
    category: '栖息地',
    source: 'preset',
    setting_desc: '火星表面的巨型密封城市，直径50公里的穹顶内维持着地球般的大气和生态。穹顶由透明铝合金制成，可抵御辐射和微陨石，内部有山川湖泊。',
    copywriting_md: '小梅在穹顶公园放风筝，抬头能看到透明的天花板外火星的红色荒漠。"妈妈说以前人类住在开放的天空下，"她说。穹顶内是蓝色的天空和白云，外面是永恒的红色，两个世界只隔着一层材料。',
    prompt: 'massive ecological dome city on Mars, 50km diameter transparent dome, overwhelming epic scale, megastructure, Earth-like ecosystem inside, red Mars desert outside, hard sci-fi, utopian, 8k',
    style_tag: '太空歌剧'
  },
  {
    name: '小行星采矿舰队',
    category: '资源采集',
    source: 'preset',
    setting_desc: '由上万艘自动采矿船组成的小行星带开采系统，每艘船可捕获并加工直径数公里的小行星。舰队覆盖整个主小行星带，年开采量超过地球历史总产量。',
    copywriting_md: '舰队指挥官陈晨监控着全息星图，上万个光点代表正在工作的采矿船。"第3042号船刚刚捕获了一颗铂含量15%的小行星，"AI报告。他在舰队母舰上已经工作了5年，见证着小行星带被一点点"消化"。',
    prompt: 'asteroid mining fleet in the asteroid belt, thousands of mining ships processing space rocks, overwhelming epic scale, megastructure, asteroids being dismantled, industrial space operations, hard sci-fi, 8k',
    style_tag: '硬科幻'
  },
  {
    name: '太空电梯群',
    category: '地天工程',
    source: 'preset',
    setting_desc: '连接地球表面与同步轨道的巨型运输系统，由12条碳纳米管缆绳组成，每条高36000公里。电梯舱以超音速攀升，将运输成本降至每公斤10美元。',
    copywriting_md: '第一次乘坐太空电梯的小林贴着窗户，看着地球曲线逐渐显现。"我们已经过了对流层，"乘务员说。6小时后，他们将抵达轨道站，那里有通往月球和火星的航班。地面的城市已经变成了一片光斑。',
    prompt: 'space elevator extending from Earth to orbit, massive carbon nanotube tether, overwhelming epic scale, megastructure, elevator cabin climbing, Earth curvature visible, hard sci-fi, futuristic transport, 8k',
    style_tag: '硬科幻'
  },
  {
    name: '恒星孵化器',
    category: '恒星工程',
    source: 'preset',
    setting_desc: '在分子云中人工触发恒星形成的巨型设施，通过精确压缩气体云团催生新恒星。整个设施跨越数十光年，可同时"孵化"上百颗恒星。',
    copywriting_md: '恒星工程师苏菲观察着第17号孵化区，一团气体云正在坍缩，中心温度已达百万度。"再过10万年，这里会有一颗G型恒星诞生，"她说。她的工作是为银河系"补种"恒星，弥补自然恒星形成的不足。',
    prompt: 'stellar nursery facility in a molecular cloud, artificial star formation in progress, overwhelming epic scale, megastructure, glowing gas clouds collapsing, new stars igniting, hard sci-fi, cosmic scale, 8k',
    style_tag: '硬科幻'
  },
  {
    name: '时间膨胀度假村',
    category: '娱乐巨构',
    source: 'preset',
    setting_desc: '建在中子星轨道上的豪华度假村，利用强引力场的时间膨胀效应提供"永恒体验"。住客在此度过一周，外界已过去十年。',
    copywriting_md: '富豪张先生在度假村阳台欣赏中子星的脉冲光芒，他的手表显示才过了3天。"外面已经过了30年，"管家说。这里的房价按"外界时间"计算，一晚等于外界3.6年。张先生觉得物有所值——他有足够时间思考人生。',
    prompt: 'luxury resort orbiting a neutron star, time dilation visualization, overwhelming epic scale, megastructure, pulsar beams in background, elegant architecture in space, hard sci-fi, cyberpunk luxury, 8k',
    style_tag: '赛博朋克'
  },
  {
    name: '银河地图仪',
    category: '观测巨构',
    source: 'preset',
    setting_desc: '实时绘制整个银河系三维地图的传感器网络，由10亿个量子探针组成，分布在银河系各处。可追踪每颗恒星的运动，预测百万年后的银河系形态。',
    copywriting_md: '地图员小王"放大"银河地图，看到了太阳系附近的详细星图。"那颗恒星的行星上有生命迹象，"AI提示。他的工作是在银河尺度上寻找文明信号，虽然大部分时间只是看着星星发呆。',
    prompt: 'galaxy mapping instrument, billion sensor network mapping the Milky Way, overwhelming epic scale, megastructure, holographic galaxy visualization, hard sci-fi, cosmic cartography, 8k',
    style_tag: '硬科幻'
  },
  {
    name: '物质重组工厂',
    category: '制造巨构',
    source: 'preset',
    setting_desc: '在原子层面重组物质的巨型制造设施，可将任何废料转化为所需材料。工厂占地100平方公里，日产量超过一个中等国家的工业产出。',
    copywriting_md: '工程师老李将一吨塑料垃圾送入重组机，另一端输出了高纯度钛合金。"原子只是重新排列，"他解释。工厂已经将地球的垃圾山转化为了建筑材料，正在修复被破坏的生态环境。',
    prompt: 'matter reconfiguration factory, atomic-level manufacturing facility, overwhelming epic scale, megastructure, raw materials transforming into products, industrial megastructure, hard sci-fi, nanotechnology, 8k',
    style_tag: '硬科幻'
  },
  {
    name: '星际通信网',
    category: '通信巨构',
    source: 'preset',
    setting_desc: '跨越数千光年的量子纠缠通信网络，由上百万个中继节点组成。实现超光速实时通信，连接人类殖民的所有星系，延迟不超过几秒。',
    copywriting_md: '通信员小赵监控着星际网络流量，每秒有 EB 级数据穿越数千光年。"半人马座殖民地发来视频通话请求，"AI说。她接通后，看到了8光年外的同事，画面清晰得仿佛就在对面。',
    prompt: 'interstellar communication network, quantum entanglement relay nodes spanning thousands of light years, overwhelming epic scale, megastructure, data streams between stars, hard sci-fi, cosmic network, 8k',
    style_tag: '硬科幻'
  },
  {
    name: '人工重力轮',
    category: '栖息地',
    source: 'preset',
    setting_desc: '直径10公里的旋转轮形太空栖息地，通过离心力模拟1G重力。轮辐高5公里，内有城市、农田、海洋，可容纳200万人长期生活。',
    copywriting_md: '小陈在轮辐的"地面"上跑步，抬头看到轮子的另一侧在"天上"，那里的城市倒挂着头顶。"有时候会晕，"他说，"但习惯了就好。"他的公寓在轮缘，窗外是旋转产生的"地平线"。',
    prompt: 'massive rotating wheel space habitat, 10km diameter, overwhelming epic scale, megastructure, cities on inner surface, wheel spokes visible, Earth-like environment inside, hard sci-fi, 8k',
    style_tag: '太空歌剧'
  },
  {
    name: '暗物质采集器',
    category: '能源巨构',
    source: 'preset',
    setting_desc: '在银河系暗物质密度最高的区域部署的采集装置，通过未知技术将暗物质转化为可用能源。单个采集器延伸数千公里，功率输出超过1000个太阳。',
    copywriting_md: '物理学家林博士看着暗物质采集器的读数，这种不可见物质的能量正在被转化为电能。"它支撑着整个星区的能源需求，"她说。采集器本身是隐形的，只能通过引力效应感知它的存在。',
    prompt: 'dark matter collector in deep space, invisible structure detected by gravitational effects, overwhelming epic scale, megastructure, energy conversion visualization, hard sci-fi, abstract technology, 8k',
    style_tag: '硬科幻'
  },
  {
    name: '行星发动机',
    category: '行星工程',
    source: 'preset',
    setting_desc: '安装在地球赤道的12000台巨型发动机，每台高11公里，可将地球推离太阳系。发动机喷射的等离子流温度超过太阳核心，推动地球踏上2500年的星际旅程。',
    copywriting_md: '小星站在发动机脚下，仰头看不到顶。"妈妈说地球要去新的家，"她说。发动机启动时，整个大地都在震动，天空被等离子光柱染成蓝色。她将在旅途中出生、成长、老去，第100代子孙才能抵达新家园。',
    prompt: 'planetary engines on Earth, 11km tall thrusters firing plasma, overwhelming epic scale, megastructure, cities beneath engines, Earth leaving solar system, hard sci-fi, epic scale, cinematic, 8k',
    style_tag: '硬科幻'
  },
  {
    name: '轨道太阳能阵列',
    category: '能源巨构',
    source: 'preset',
    setting_desc: '地球同步轨道上的巨型太阳能收集系统，由100万块太阳能板组成，总面积超过瑞士。通过微波将能量传输到地面接收站，提供全球30%的电力。',
    copywriting_md: '工程师老王在轨道站维护太阳能板，脚下是蓝色的地球。"这些板子永远面向太阳，"他说。阵列已经运行了50年，为地面数十亿人提供清洁能源。从地面看，它像一条闪亮的项链环绕地球。',
    prompt: 'orbital solar power array, million solar panels in geostationary orbit, overwhelming epic scale, megastructure, microwave beam to Earth, space infrastructure, hard sci-fi, clean energy, 8k',
    style_tag: '硬科幻'
  },
  {
    name: '海底城市',
    category: '栖息地',
    source: 'preset',
    setting_desc: '建在马里亚纳海沟底部的密封城市，可容纳50万人。城市外壳承受1000个大气压，内部维持正常气压，通过核聚变提供能源，是地球深处的避难所。',
    copywriting_md: '小海从窗户望向外面，深海的黑暗中有发光的鱼群游过。"上面在下雨，"她说，"但我们这里是永恒的宁静。"城市已经与世隔绝了20年，地面上的人们忘记了战争，海底的人们忘记了阳光。',
    prompt: 'underwater city at bottom of Mariana Trench, sealed dome city under extreme pressure, overwhelming epic scale, megastructure, deep sea creatures outside, bioluminescent lighting, hard sci-fi, underwater metropolis, 8k',
    style_tag: '赛博朋克'
  },
  {
    name: '星际船坞',
    category: '制造巨构',
    source: 'preset',
    setting_desc: '在土星轨道上建造星际飞船的巨型太空船坞，长50公里，可同时建造10艘世代飞船。船坞利用土星环的冰物质作为原料，实现就地取材。',
    copywriting_md: '造船工程师老赵站在船坞观景台，看着一艘新飞船的龙骨逐渐成型。"这艘船将航行1000光年，"他说。船坞已经运行了200年，建造了上百艘星际飞船，每一艘都承载着人类的希望。',
    prompt: 'interstellar shipyard in Saturn orbit, massive construction facility, overwhelming epic scale, megastructure, generation ships under construction, Saturn rings visible, hard sci-fi, industrial space, 8k',
    style_tag: '硬科幻'
  },
  {
    name: '气候控制网',
    category: '行星工程',
    source: 'preset',
    setting_desc: '覆盖全球的天气控制卫星网络，可精确调节任意区域的温度、降水、风力。由3万颗卫星组成，是人类应对气候变化的终极武器。',
    copywriting_md: '气象员小李调整着控制面板，为干旱的非洲送去降雨。"以前人类只能预测天气，"他说，"现在我们能制造天气。"他的工作是为全球分配降水资源，确保每个地方都有适宜的气候。',
    prompt: 'global climate control satellite network, 30000 satellites orbiting Earth, overwhelming epic scale, megastructure, weather manipulation beams, Earth from space, hard sci-fi, geoengineering, 8k',
    style_tag: '硬科幻'
  },
  {
    name: '虚拟世界服务器',
    category: '计算巨构',
    source: 'preset',
    setting_desc: '容纳数十亿人类意识的巨型计算设施，占地100平方公里，功耗相当于一颗恒星的输出。内部运行着上千个虚拟宇宙，每个都有独特的物理法则。',
    copywriting_md: '小吴"醒来"在虚拟的中世纪世界，他的真实身体在服务器中沉睡。"这里一天等于外面一秒，"他想。他已经在虚拟世界生活了100年，经历了上千种人生。现实世界？那已经是另一个宇宙的事了。',
    prompt: 'virtual world server farm, massive computing facility housing billions of consciousnesses, overwhelming epic scale, megastructure, multiple virtual realities visualized, cyberpunk, hard sci-fi, 8k',
    style_tag: '赛博朋克'
  },
  {
    name: '小行星推进站',
    category: '资源采集',
    source: 'preset',
    setting_desc: '为小行星安装推进系统并将其移动到指定轨道的工业设施，每年可移动上千颗小行星。这些被移动的小行星成为采矿目标或太空栖息地的原材料。',
    copywriting_md: '工程师老周看着一颗直径5公里的小行星缓缓启动推进器，开始向火星轨道移动。"这颗富含铂金的小行星价值万亿，"他说。他的工作是将小行星带"配送"到各个需要的地方，像太空中的快递员。',
    prompt: 'asteroid propulsion station, installing engines on asteroids to move them, overwhelming epic scale, megastructure, asteroids with thrusters, space logistics, hard sci-fi, industrial operations, 8k',
    style_tag: '硬科幻'
  },
  {
    name: '星际灯塔',
    category: '导航巨构',
    source: 'preset',
    setting_desc: '为星际航行提供导航信号的巨型信标网络，每个灯塔功率超过1000颗恒星，可在数千光年外被探测到。灯塔阵列构成了人类文明的星际坐标系统。',
    copywriting_md: '灯塔维护员小陈站在灯塔顶端，看着光束射向深空。"这束光将穿越1000光年，"他说。远处的飞船依靠这些灯塔确定位置，就像古代的水手依靠灯塔导航。他是星际时代的守灯人。',
    prompt: 'interstellar lighthouse, massive beacon emitting powerful light beam into deep space, overwhelming epic scale, megastructure, navigation signal visualization, hard sci-fi, cosmic lighthouse, 8k',
    style_tag: '太空歌剧'
  },
  {
    name: '重力模拟器',
    category: '物理巨构',
    source: 'preset',
    setting_desc: '在太空中人工制造重力场的实验设施，可产生从0到100G的任意重力环境。用于研究极端重力下的物理现象，以及为太空栖息地提供人工重力技术。',
    copywriting_md: '物理学家苏菲走进重力模拟室，将重力调至2倍地球重力。"感觉像背了个人，"她说。她的研究将帮助未来的太空城市模拟不同重力环境，让人类适应各种重力条件。',
    prompt: 'gravity simulator facility in space, artificial gravity field visualization, overwhelming epic scale, megastructure, gravitational waves distorted, hard sci-fi, physics experiment, 8k',
    style_tag: '硬科幻'
  },
  {
    name: '星际农场',
    category: '资源采集',
    source: 'preset',
    setting_desc: '在彗星和小行星上建立的自动化农业系统，利用冰和矿物质种植转基因作物。农场覆盖整个小行星带，为数十亿太空居民提供食物。',
    copywriting_md: '农场主老李在低重力温室里收割着巨型番茄，这些作物在小行星上长得比地球大3倍。"太空农业产量是地球的10倍，"他说。他的农场已经养活了100万人，而他自己从未踏足过地球。',
    prompt: 'interstellar farm on asteroids, automated agriculture in space, overwhelming epic scale, megastructure, greenhouses on space rocks, crops growing in low gravity, hard sci-fi, space farming, 8k',
    style_tag: '太空歌剧'
  },
  {
    name: '量子传送门',
    category: '交通巨构',
    source: 'preset',
    setting_desc: '利用量子纠缠实现物质瞬间传输的实验设施，可在银河系范围内传送物质。每个传送门直径1公里，耗能相当于一颗恒星的输出。',
    copywriting_md: '传送员小吴看着一个苹果从地球端的传送门消失，0.5秒后出现在火星端。"信息传输是瞬间的，"他解释，"但重组需要时间。"他的工作是确保传送过程中物质不被"复制"，保持唯一性。',
    prompt: 'quantum teleportation gate, massive portal enabling instant matter transmission, overwhelming epic scale, megastructure, quantum entanglement visualization, hard sci-fi, teleportation technology, 8k',
    style_tag: '硬科幻'
  },
  {
    name: '星际博物馆',
    category: '文化巨构',
    source: 'preset',
    setting_desc: '保存人类文明所有知识的巨型档案馆，建在冥王星轨道上以确保长期稳定。馆内存储了地球所有图书馆的数据，以及人类殖民各星系的文化遗产。',
    copywriting_md: '馆员小林在档案库中漫步，这里存储着人类5000年的文明史。"这首诗来自21世纪的地球，"她指着一个数据晶体。她的职责是确保即使人类灭绝，文明也不会被遗忘。',
    prompt: 'interstellar museum at Pluto orbit, massive archive preserving human civilization, overwhelming epic scale, megastructure, data crystals storing knowledge, hard sci-fi, cultural preservation, 8k',
    style_tag: '太空歌剧'
  },
  {
    name: '恒星燃料采集站',
    category: '能源巨构',
    source: 'preset',
    setting_desc: '从恒星表面采集氢等离子体作为核聚变燃料的设施，通过磁场引导将物质输送到收集器。整个设施延伸数百万公里，年采集量可供地球使用万年。',
    copywriting_md: '采集站长老赵看着等离子体沿着磁场管道流入储存罐。"这一罐燃料够一艘飞船航行100光年，"他说。他的工作是在恒星表面"放牧"，将恒星的能量转化为人类可用的形式。',
    prompt: 'stellar fuel collection station, harvesting plasma from star surface, overwhelming epic scale, megastructure, magnetic fields channeling stellar material, hard sci-fi, energy harvesting, 8k',
    style_tag: '硬科幻'
  },
  {
    name: '轨道 Habitat',
    category: '栖息地',
    source: 'preset',
    setting_desc: '地球低轨道上的巨型环形栖息地，直径5公里，可容纳100万人。通过旋转产生人工重力，是地球与深空之间的中转站和永久居所。',
    copywriting_md: '小梅在栖息地的公园里散步，抬头能看到地球在"天上"。"今天能看到极光，"她的朋友说。栖息地每90分钟绕地球一圈，所以每天有16次日出日落。她已经习惯了这种节奏。',
    prompt: 'orbital habitat ring around Earth, massive rotating space station, overwhelming epic scale, megastructure, cities inside the ring, Earth visible in sky, hard sci-fi, space living, 8k',
    style_tag: '太空歌剧'
  },
  {
    name: '反重力实验室',
    category: '物理巨构',
    source: 'preset',
    setting_desc: '研究并制造反重力场的实验设施，可在局部区域抵消引力。实验室本身悬浮在地球轨道上，完全依靠反重力技术维持位置，是物理学的圣杯。',
    copywriting_md: '物理学家苏菲漂浮在零重力区，这里是实验室的核心。"我们成功抵消了地球引力，"她说。她的研究将彻底改变航天技术，让飞船不再需要火箭推进。',
    prompt: 'anti-gravity laboratory floating in orbit, defying gravitational forces, overwhelming epic scale, megastructure, gravitational field distortion visualization, hard sci-fi, physics breakthrough, 8k',
    style_tag: '硬科幻'
  },
  {
    name: '星际高速公路',
    category: '交通巨构',
    source: 'preset',
    setting_desc: '连接太阳系各殖民地的超高速运输通道，由加速轨道和减速轨道组成。飞船在轨道上可达到0.1倍光速，将火星到木星的旅程从数年缩短到数周。',
    copywriting_md: '司机老李驾驶货运飞船驶入高速公路，自动导航系统接管了控制。"现在可以睡一觉，"他对副驾说。高速公路将自动把他们送到10亿公里外的目的地，全程只需3周。',
    prompt: 'interstellar highway, accelerated transport lanes connecting solar system colonies, overwhelming epic scale, megastructure, ships traveling at high speed, space infrastructure, hard sci-fi, cosmic transport, 8k',
    style_tag: '硬科幻'
  },
  {
    name: '行星防御网',
    category: '防御巨构',
    source: 'preset',
    setting_desc: '保护地球免受小行星撞击的防御系统，由激光拦截站和引力牵引器组成。可在威胁到达地球前数年发现并偏转小行星，是人类文明的盾牌。',
    copywriting_md: '防御员小陈监控着近地空间，系统刚刚发现一颗直径1公里的小行星可能在50年后撞击地球。"启动引力牵引器，"他下令。50年后，这颗小行星将偏离轨道，安全擦过地球。',
    prompt: 'planetary defense network, laser stations and gravity tractors protecting Earth, overwhelming epic scale, megastructure, asteroid deflection in progress, hard sci-fi, planetary shield, 8k',
    style_tag: '硬科幻'
  },
  {
    name: '物质传输网',
    category: '交通巨构',
    source: 'preset',
    setting_desc: '太阳系内的 instant 物质传输系统，通过量子扫描和重组实现 instant 传输。传输站遍布各殖民地，将旅行时间从数月缩短到数秒。',
    copywriting_md: '小吴走进地球传输站，一秒后出现在火星站。"感觉像眨眼，"他说。他的行李已经先一步到达，在火星的家中等着他。传输技术让太阳系变成了一个"村庄"。',
    prompt: 'matter transmission network, quantum teleportation stations across solar system, overwhelming epic scale, megastructure, instant transportation visualization, hard sci-fi, futuristic transport, 8k',
    style_tag: '赛博朋克'
  },
  {
    name: '星际学院',
    category: '文化巨构',
    source: 'preset',
    setting_desc: '培养星际时代人才的巨型教育机构，建在中性轨道上，可容纳100万学生。学院拥有模拟各种星球环境的训练设施，是人类的未来摇篮。',
    copywriting_md: '学生小林在火星模拟区训练，这里的重力和大气模拟火星环境。"毕业后我要去半人马座殖民地，"她说。学院已经培养了上百万星际人才，他们散布在人类文明的各个角落。',
    prompt: 'interstellar academy, massive educational facility in neutral orbit, overwhelming epic scale, megastructure, students training in various planet simulations, hard sci-fi, future of humanity, 8k',
    style_tag: '太空歌剧'
  },
  {
    name: '能量传输网',
    category: '能源巨构',
    source: 'preset',
    setting_desc: '通过微波在太阳系内无线传输能量的巨型网络，将太阳能从日照充足区域传输到需要的地方。传输效率超过95%，让能量成为真正的"免费"资源。',
    copywriting_md: '工程师老赵调整着传输阵列，将能量从水星轨道传输到外太阳系。"这束能量将穿越10亿公里，"他说。接收站将把微波转化为电能，为冥王星的殖民地提供能源。',
    prompt: 'energy transmission network, wireless power transfer across solar system via microwaves, overwhelming epic scale, megastructure, energy beams crossing space, hard sci-fi, wireless energy, 8k',
    style_tag: '硬科幻'
  },
  {
    name: '时间研究所',
    category: '物理巨构',
    source: 'preset',
    setting_desc: '研究时间本质和操控时间的实验设施，利用黑洞附近的极端时间膨胀效应进行实验。研究所本身建在黑洞轨道上，是时间物理学的圣地。',
    copywriting_md: '物理学家苏菲在研究所工作了一年，外界已过去10年。"这里的时间流速不同，"她说。她的研究可能让人类掌握时间旅行的秘密，虽然她自己已经错过了孩子的童年。',
    prompt: 'time research institute orbiting a black hole, studying time dilation effects, overwhelming epic scale, megastructure, time distortion visualization, hard sci-fi, temporal physics, 8k',
    style_tag: '硬科幻'
  },
  {
    name: '星际医院',
    category: '医疗巨构',
    source: 'preset',
    setting_desc: '为整个星系提供医疗服务的巨型医疗设施，可容纳100万患者。医院拥有最先进的医疗技术，包括基因修复、器官再生、意识上传等。',
    copywriting_md: '医生老李刚完成一例基因修复手术，患者的遗传病已被治愈。"这技术来自1000光年外的殖民地，"他说。医院汇集了人类文明的医学智慧，是生命的最后防线。',
    prompt: 'interstellar hospital, massive medical facility serving the galaxy, overwhelming epic scale, megastructure, advanced medical technology, healing pods, hard sci-fi, medical science, 8k',
    style_tag: '太空歌剧'
  },
  {
    name: '物质合成器',
    category: '制造巨构',
    source: 'preset',
    setting_desc: '在分子层面合成任何物质的巨型制造设施，可将能量直接转化为物质。合成器可制造从食物到飞船的任何东西，是后稀缺社会的基石。',
    copywriting_md: '小吴在合成器前输入指令，一秒后一份热腾腾的牛排出现。"这是用能量直接合成的，"他说。合成器已经取代了传统制造业，人类不再需要为物质匮乏而争斗。',
    prompt: 'matter synthesizer facility, converting energy directly into matter, overwhelming epic scale, megastructure, molecular assembly visualization, hard sci-fi, post-scarcity technology, 8k',
    style_tag: '硬科幻'
  },
  {
    name: '星际港口',
    category: '交通巨构',
    source: 'preset',
    setting_desc: '太阳系最大的太空港，可同时起降上万艘星际飞船。港口建在海王星轨道，是通往银河系的门户，每年处理上亿乘客和数十亿吨货物。',
    copywriting_md: '港务长老赵看着一艘巨型客轮缓缓靠港，船上载着从半人马座回来的10万游客。"今天有500艘船要起降，"他说。港口24小时不停运转，是太阳系最繁忙的地方。',
    prompt: 'interstellar spaceport, massive space harbor at Neptune orbit, overwhelming epic scale, megastructure, thousands of ships docking, gateway to the galaxy, hard sci-fi, space traffic, 8k',
    style_tag: '太空歌剧'
  },
  {
    name: '生态恢复站',
    category: '环境巨构',
    source: 'preset',
    setting_desc: '修复被破坏的行星生态的巨型设施，可在数十年内将荒漠变为绿洲。站点配备大气改造器、土壤修复器和气候控制器，是行星地球化的先锋。',
    copywriting_md: '生态学家苏菲看着火星的红色地表逐渐变绿。"再过50年，这里可以不用穿宇航服，"她说。她的工作是让死去的星球复活，为人类创造新的家园。',
    prompt: 'ecological restoration station, terraforming a dead planet, overwhelming epic scale, megastructure, atmosphere processors and climate controllers, planet becoming green, hard sci-fi, planetary engineering, 8k',
    style_tag: '太空歌剧'
  },
  {
    name: '星际监狱',
    category: '社会巨构',
    source: 'preset',
    setting_desc: '关押最危险罪犯的巨型监狱设施，建在黑洞附近的极端环境中。监狱利用时间膨胀效应，让囚犯在主观上度过数百年，而外界只过了几年。',
    copywriting_md: '狱警老陈在监狱巡逻，这里的囚犯已经在主观上服刑了100年。"对他们来说，这是一辈子，"他说。监狱外只过了10年，但囚犯已经充分"反思"了自己的罪行。',
    prompt: 'interstellar prison near a black hole, maximum security facility using time dilation, overwhelming epic scale, megastructure, prisoners serving subjective centuries, hard sci-fi, cosmic punishment, 8k',
    style_tag: '赛博朋克'
  },
  {
    name: '能量护盾',
    category: '防御巨构',
    source: 'preset',
    setting_desc: '保护重要设施免受攻击的能量护盾发生器，可产生抵挡核打击的防护罩。护盾直径可达数百公里，是军事防御的终极形态。',
    copywriting_md: '护盾操作员小陈启动防护罩，一道能量屏障笼罩了整个城市。"可以抵挡1000枚核弹，"他说。护盾技术让人类城市在星际战争中安然无恙。',
    prompt: 'energy shield generator, massive protective force field covering a city, overwhelming epic scale, megastructure, energy barrier visualization, hard sci-fi, planetary defense, 8k',
    style_tag: '硬科幻'
  },
  {
    name: '星际农场群',
    category: '资源采集',
    source: 'preset',
    setting_desc: '在彗星上建立的自动化农业系统群，利用彗星的冰和矿物质种植转基因作物。农场覆盖整个柯伊伯带，为外太阳系殖民地提供食物。',
    copywriting_md: '农场主老李在彗星温室里收割着巨型番茄，这些作物在低重力下长得比地球大5倍。"太空农业产量是地球的20倍，"他说。他的农场群养活了1000万人，而他自己从未见过地球的阳光。',
    prompt: 'interstellar farm cluster on comets, automated agriculture in Kuiper belt, overwhelming epic scale, megastructure, greenhouses on icy bodies, crops in low gravity, hard sci-fi, space farming, 8k',
    style_tag: '太空歌剧'
  },
  {
    name: '量子计算机群',
    category: '计算巨构',
    source: 'preset',
    setting_desc: '利用量子效应进行超高速计算的巨型计算机群，计算能力超过宇宙中所有经典计算机总和。计算机冷却系统延伸至冥王星轨道，是信息时代的巅峰。',
    copywriting_md: '程序员小吴"接入"量子计算机，他的思维在量子态中展开。"一个问题还没算完，所有可能的答案已经同时出现，"他描述。他的身体在地球，意识已在量子世界中工作了一周。',
    prompt: 'quantum computer cluster, massive quantum computing installation, overwhelming epic scale, megastructure, quantum state visualization, cooling systems extending to Pluto, hard sci-fi, quantum technology, 8k',
    style_tag: '赛博朋克'
  },
  {
    name: '星际图书馆',
    category: '文化巨构',
    source: 'preset',
    setting_desc: '保存人类所有文明成果的巨型图书馆，建在稳定的拉格朗日点。馆内存储了地球所有文明的文献、艺术、音乐，以及殖民各星系的文化遗产。',
    copywriting_md: '馆员小林在图书馆中漫步，这里存储着人类5000年的智慧。"这本书记载了21世纪的互联网文化，"她指着一个数据晶体。她的职责是确保文明的火种永不熄灭。',
    prompt: 'interstellar library at Lagrange point, massive archive of human civilization, overwhelming epic scale, megastructure, data crystals storing all knowledge, hard sci-fi, cultural heritage, 8k',
    style_tag: '太空歌剧'
  },
  {
    name: '物质重组器群',
    category: '制造巨构',
    source: 'preset',
    setting_desc: '在原子层面重组物质结构的巨型制造设施群，可将任何废料转化为所需材料。重组器占地50平方公里，日产量超过一个大陆的工业产出。',
    copywriting_md: '工程师老李将一吨核废料送入重组器，另一端输出了高纯度黄金。"原子只是重新排列，"他解释。重组器群已经将地球的核废料全部转化为有用材料，净化了被污染的环境。',
    prompt: 'matter reconfigurer cluster, atomic-level matter restructuring, overwhelming epic scale, megastructure, waste transforming into valuable materials, hard sci-fi, nanotechnology, 8k',
    style_tag: '硬科幻'
  },
  {
    name: '星际导航仪群',
    category: '导航巨构',
    source: 'preset',
    setting_desc: '为银河系内航行提供精确定位的巨型导航设施群，由10亿个量子信标组成。导航仪可精确到米级定位银河系内任何位置，是星际旅行的基础设施。',
    copywriting_md: '导航员小陈校准着信标网络，确保每艘飞船都能精确定位。"误差小于1米，"他说，"即使在10万光年外。"他的工作是为星际航行提供"GPS"服务。',
    prompt: 'interstellar navigation instrument cluster, billion quantum beacons across the galaxy, overwhelming epic scale, megastructure, precise positioning visualization, hard sci-fi, galactic GPS, 8k',
    style_tag: '硬科幻'
  },
  {
    name: '能量储存环群',
    category: '能源巨构',
    source: 'preset',
    setting_desc: '储存巨量能量的环形设施群，直径100公里，可储存相当于一颗恒星输出100年的能量。储存环是星际文明的能量银行，确保能源供应稳定。',
    copywriting_md: '工程师老赵监控着储存环的能量水平，这里储存的能量够太阳系使用一万年。"这是人类文明的「存款」，"他说。储存环群收集了数千年的多余能量，以备不时之需。',
    prompt: 'energy storage ring cluster, massive circular facilities storing stellar energy, overwhelming epic scale, megastructure, energy containment visualization, hard sci-fi, energy banking, 8k',
    style_tag: '硬科幻'
  },
  {
    name: '星际大学群',
    category: '文化巨构',
    source: 'preset',
    setting_desc: '培养星际时代顶尖人才的巨型教育机构群，建在中性轨道上，可容纳50万学生。大学拥有模拟各种极端环境的训练设施，是人类的智慧摇篮。',
    copywriting_md: '学生小林在黑洞模拟区训练，这里的引力环境模拟黑洞边缘。"毕业后我要去银河中心探险，"她说。大学群已经培养了上百万星际精英，他们引领着人类文明的未来。',
    prompt: 'interstellar university cluster, massive educational facilities in neutral orbit, overwhelming epic scale, megastructure, students training in extreme environments, hard sci-fi, future education, 8k',
    style_tag: '太空歌剧'
  },
  {
    name: '物质传输站群',
    category: '交通巨构',
    source: 'preset',
    setting_desc: '实现太阳系内 instant 物质传输的站点网络群，通过量子扫描和重组实现 instant 传输。传输站遍布各殖民地，将旅行时间从数月缩短到数秒。',
    copywriting_md: '小吴走进地球传输站，一秒后出现在木星站。"感觉像做梦，"他说。他的行李已经先一步到达，在木星的家中等着他。传输技术让太阳系变成了一个"家庭"。',
    prompt: 'matter transmission station cluster, quantum teleportation across solar system, overwhelming epic scale, megastructure, instant transportation visualization, hard sci-fi, futuristic transport, 8k',
    style_tag: '赛博朋克'
  },
  {
    name: '能量转换器群',
    category: '能源巨构',
    source: 'preset',
    setting_desc: '将各种形式的能量相互转换的巨型设施群，可将物质100%转化为能量，也可将能量转化为物质。转换器是能源技术的终极形态。',
    copywriting_md: '工程师苏菲看着一克物质完全转化为能量，释放的能量相当于一颗核弹。"E=mc²的完美诠释，"她说。转换器群让人类掌握了物质与能量的奥秘。',
    prompt: 'energy converter cluster, converting matter to energy and vice versa, overwhelming epic scale, megastructure, mass-energy equivalence visualization, hard sci-fi, ultimate energy technology, 8k',
    style_tag: '硬科幻'
  },
  {
    name: '星际医院群',
    category: '医疗巨构',
    source: 'preset',
    setting_desc: '为整个星系提供顶级医疗服务的巨型设施群，可容纳50万患者。医院拥有意识上传、身体克隆、基因修复等技术，是生命的最后堡垒。',
    copywriting_md: '医生老李刚完成一例意识上传手术，患者的意识已转移到新的克隆身体。"死亡已成为可选，"他说。医院群让人类实现了生物学上的永生。',
    prompt: 'interstellar hospital cluster, advanced medical centers serving the galaxy, overwhelming epic scale, megastructure, consciousness transfer pods, hard sci-fi, medical immortality, 8k',
    style_tag: '太空歌剧'
  },
  {
    name: '物质打印机群',
    category: '制造巨构',
    source: 'preset',
    setting_desc: '在原子层面打印任何物体的巨型3D打印设施群，可制造从食物到飞船的任何东西。打印机占地10平方公里，是后稀缺社会的核心设施。',
    copywriting_md: '小吴在打印机前输入设计图，一小时后一艘小型飞船出现。"这是用原子打印的，"他说。打印机群让制造变得像下载文件一样简单，人类不再需要传统工厂。',
    prompt: 'matter printer cluster, atomic-level 3D printing of any object, overwhelming epic scale, megastructure, molecular assembly visualization, hard sci-fi, post-scarcity manufacturing, 8k',
    style_tag: '硬科幻'
  },
  {
    name: '星际码头群',
    category: '交通巨构',
    source: 'preset',
    setting_desc: '太阳系最大的货运港口群，可同时处理上万艘货船的装卸。码头建在土星轨道，利用土星环的物质作为补给，是星际贸易的枢纽。',
    copywriting_md: '码头工人老赵指挥着货船装卸，每天处理数万吨货物。"这些货物来自银河系各地，"他说。码头群是太阳系最繁忙的地方，连接着人类文明的各个角落。',
    prompt: 'interstellar dock cluster, massive cargo ports at Saturn orbit, overwhelming epic scale, megastructure, thousands of cargo ships, Saturn rings as backdrop, hard sci-fi, space trade hub, 8k',
    style_tag: '太空歌剧'
  },
  {
    name: '生态修复站群',
    category: '环境巨构',
    source: 'preset',
    setting_desc: '修复被破坏的行星生态的巨型设施群，可在数十年内将死寂星球变为宜居世界。站点配备完整的生态工程系统，是行星地球化的先锋。',
    copywriting_md: '生态学家苏菲看着火星的大气逐渐变厚。"再过100年，这里可以呼吸，"她说。她的工作是让死去的星球复活，为人类创造新的家园。',
    prompt: 'ecological restoration station cluster, terraforming dead planets into habitable worlds, overwhelming epic scale, megastructure, atmosphere generation, planet transformation, hard sci-fi, planetary engineering, 8k',
    style_tag: '太空歌剧'
  },
  {
    name: '能量护盾网群',
    category: '防御巨构',
    source: 'preset',
    setting_desc: '保护整个星系的能量护盾网络群，由上千个护盾发生器组成，可抵挡超新星爆发级别的攻击。护盾网是文明安全的最终保障。',
    copywriting_md: '护盾操作员小陈监控着护盾网络，确保每个节点正常运行。"可以抵挡银河系级别的灾难，"他说。护盾网群让人类文明在宇宙中安然无恙。',
    prompt: 'energy shield network cluster, galaxy-wide protective force fields, overwhelming epic scale, megastructure, shield generators across star system, hard sci-fi, galactic defense, 8k',
    style_tag: '硬科幻'
  },
  {
    name: '星际牧场群',
    category: '资源采集',
    source: 'preset',
    setting_desc: '在小行星带上建立的巨型畜牧业基地群，利用改造后的小行星作为牧场。牧场覆盖数百万平方公里，为太阳系提供肉类和奶制品。',
    copywriting_md: '牧民老李在低重力小行星上放牧着转基因牛，这些动物在太空环境中长得比地球大3倍。"太空牧场产量是地球的10倍，"他说。他的牧场群养活了1000万人，而他自己从未见过地球的草原。',
    prompt: 'interstellar ranch cluster, massive livestock facilities on asteroids, overwhelming epic scale, megastructure, animals grazing on modified asteroids, low gravity farming, hard sci-fi, space agriculture, 8k',
    style_tag: '太空歌剧'
  },
  {
    name: '量子通信网群',
    category: '通信巨构',
    source: 'preset',
    setting_desc: '利用量子纠缠实现超光速通信的网络群，由上百万个量子中继站组成。通信网覆盖人类殖民的所有星系，实现实时跨星际交流。',
    copywriting_md: '通信员小赵监控着量子网络流量，每秒有 EB 级数据穿越数千光年。"半人马座殖民地发来视频，"AI说。她接通后，看到了8光年外的同事，画面清晰得仿佛就在对面。',
    prompt: 'quantum communication network cluster, faster-than-light communication via quantum entanglement, overwhelming epic scale, megastructure, data streams across galaxy, hard sci-fi, interstellar internet, 8k',
    style_tag: '硬科幻'
  },
  {
    name: '星际研究院群',
    category: '文化巨构',
    source: 'preset',
    setting_desc: '进行前沿科学研究的巨型研究机构群，建在中性轨道上，可容纳10万科学家。研究院拥有各种极端环境模拟设施，是科学的圣殿。',
    copywriting_md: '研究员苏菲在黑洞模拟区工作，这里的引力环境模拟黑洞边缘。"我们可能发现新的物理定律，"她说。研究院群汇集了人类最聪明的头脑，探索宇宙的奥秘。',
    prompt: 'interstellar research institute cluster, massive scientific facilities in neutral orbit, overwhelming epic scale, megastructure, extreme environment simulations, hard sci-fi, scientific discovery, 8k',
    style_tag: '硬科幻'
  },
  {
    name: '能量传输阵列群',
    category: '能源巨构',
    source: 'preset',
    setting_desc: '通过微波在星系内无线传输能量的巨型阵列群，将能量从生产地传输到消费地。阵列覆盖数千光年，让能量成为真正的"免费"资源。',
    copywriting_md: '工程师老赵调整着传输阵列，将能量从银河中心传输到边缘殖民地。"这束能量将穿越5万光年，"他说。接收站将把微波转化为电能，为遥远的殖民地提供能源。',
    prompt: 'energy transmission array cluster, wireless power transfer across galaxy via microwaves, overwhelming epic scale, megastructure, energy beams crossing interstellar space, hard sci-fi, wireless energy, 8k',
    style_tag: '硬科幻'
  },
  {
    name: '时间实验室群',
    category: '物理巨构',
    source: 'preset',
    setting_desc: '研究时间操控的实验设施群，利用黑洞附近的极端时间膨胀效应进行实验。实验室本身建在多个黑洞轨道上，是时间物理学的圣地。',
    copywriting_md: '物理学家苏菲在实验室工作了一年，外界已过去100年。"这里的时间流速不同，"她说。她的研究可能让人类掌握时间旅行的秘密，虽然她自己已经错过了整个世纪。',
    prompt: 'time laboratory cluster orbiting multiple black holes, studying time manipulation, overwhelming epic scale, megastructure, time distortion visualization, hard sci-fi, temporal physics, 8k',
    style_tag: '硬科幻'
  },
  {
    name: '星际医疗站群',
    category: '医疗巨构',
    source: 'preset',
    setting_desc: '为偏远星系提供医疗服务的巨型设施群，可容纳10万患者。医疗站拥有最先进的医疗技术，包括远程手术、基因修复、意识备份等。',
    copywriting_md: '医生老李刚完成一例远程手术，他在地球操控机器人为1000光年外的患者手术。"延迟只有1秒，"他说。医疗站群让人类在宇宙任何角落都能获得顶级医疗。',
    prompt: 'interstellar medical station cluster, advanced healthcare facilities for remote galaxies, overwhelming epic scale, megastructure, remote surgery pods, hard sci-fi, medical technology, 8k',
    style_tag: '太空歌剧'
  },
  {
    name: '物质合成阵列群',
    category: '制造巨构',
    source: 'preset',
    setting_desc: '将能量直接转化为物质的巨型合成设施阵列群，可制造任何需要的物品。阵列覆盖整个星系，是后稀缺社会的物质基础。',
    copywriting_md: '小吴在合成阵列前输入指令，一秒后一份美味的晚餐出现。"这是用能量直接合成的，"他说。合成阵列群让物质匮乏成为历史，人类不再为生存而争斗。',
    prompt: 'matter synthesis array cluster, converting energy directly into matter across galaxy, overwhelming epic scale, megastructure, molecular assembly visualization, hard sci-fi, post-scarcity society, 8k',
    style_tag: '硬科幻'
  },
  {
    name: '星际交通枢纽群',
    category: '交通巨构',
    source: 'preset',
    setting_desc: '银河系最大的交通中转站群，可同时处理上百万艘飞船的起降。枢纽建在银河中心，是通往银河系各臂的门户。',
    copywriting_md: '枢纽管理员老赵看着全息星图，上百万个光点代表正在进出的飞船。"每天处理500万艘船，"他说。枢纽群是银河系最繁忙的地方，连接着人类文明的每一个角落。',
    prompt: 'interstellar transport hub cluster, massive transit stations at galactic center, overwhelming epic scale, megastructure, millions of ships docking, gateway to the galaxy, hard sci-fi, space traffic control, 8k',
    style_tag: '太空歌剧'
  },
  {
    name: '生态改造站群',
    category: '环境巨构',
    source: 'preset',
    setting_desc: '将不宜居星球改造为宜居世界的巨型设施群，可在数百年内完成行星地球化。站点配备大气生成器、海洋填充器和生态系统构建器。',
    copywriting_md: '改造工程师苏菲看着火星的红色地表逐渐被蓝色海洋覆盖。"再过500年，这里将是第二个地球，"她说。她的工作是为人类创造新的家园，虽然她自己看不到完成的那天。',
    prompt: 'ecological transformation station cluster, terraforming planet into habitable world, overwhelming epic scale, megastructure, atmosphere generators and ocean fillers, planet transformation, hard sci-fi, planetary engineering, 8k',
    style_tag: '太空歌剧'
  },
  {
    name: '防御护盾网群',
    category: '防御巨构',
    source: 'preset',
    setting_desc: '保护人类殖民地免受各种威胁的能量护盾网络群，由上万个护盾发生器组成。护盾网可抵挡从小行星撞击到超新星爆发的各种威胁。',
    copywriting_md: '护盾操作员小陈监控着护盾网络，确保每个殖民地都有防护。"可以抵挡任何已知威胁，"他说。护盾网群让人类在危险的宇宙中安居乐业。',
    prompt: 'defense shield network cluster, protective energy shields around colonies, overwhelming epic scale, megastructure, shield generators protecting planets, hard sci-fi, planetary defense, 8k',
    style_tag: '硬科幻'
  },
  {
    name: '星际渔场群',
    category: '资源采集',
    source: 'preset',
    setting_desc: '在气态巨行星大气层中养殖太空生物的巨型渔场群，利用行星大气中的有机物养殖可食用的太空鱼类。渔场覆盖整个木星大气层。',
    copywriting_md: '渔民老李在木星大气层中捕捞太空鱼，这些生物在高压环境中长到数十米长。"木星渔场产量是地球海洋的100倍，"他说。他的渔场群养活了10亿人，而他自己从未见过地球的海洋。',
    prompt: 'interstellar fishery cluster, massive aquaculture in gas giant atmosphere, overwhelming epic scale, megastructure, space creatures in Jupiter atmosphere, hard sci-fi, space fishing, 8k',
    style_tag: '太空歌剧'
  },
  {
    name: '量子计算阵列群',
    category: '计算巨构',
    source: 'preset',
    setting_desc: '利用量子效应进行超高速计算的巨型计算机阵列群，计算能力超过宇宙中所有经典计算机总和。阵列冷却系统延伸至奥尔特云。',
    copywriting_md: '程序员小吴"接入"量子阵列，他的思维在量子态中展开。"所有可能的答案同时出现，"他描述。他的身体在地球，意识已在量子世界中工作了一周。',
    prompt: 'quantum computing array cluster, massive quantum computing installations, overwhelming epic scale, megastructure, quantum state visualization, cooling to Oort cloud, hard sci-fi, quantum technology, 8k',
    style_tag: '赛博朋克'
  },
  {
    name: '星际档案馆群',
    category: '文化巨构',
    source: 'preset',
    setting_desc: '保存人类所有文明成果的巨型档案馆群，建在稳定的拉格朗日点以确保长期保存。馆内存储了地球所有文明的文献、艺术、音乐。',
    copywriting_md: '档案员小林在档案馆中漫步，这里存储着人类5000年的智慧。"这份文件来自21世纪的互联网，"她指着一个数据晶体。她的职责是确保文明的记忆永不消失。',
    prompt: 'interstellar archive cluster, massive repositories of human civilization at Lagrange points, overwhelming epic scale, megastructure, data crystals storing all knowledge, hard sci-fi, cultural preservation, 8k',
    style_tag: '太空歌剧'
  },
  {
    name: '物质重组阵列群',
    category: '制造巨构',
    source: 'preset',
    setting_desc: '在原子层面重组物质结构的巨型制造设施阵列群，可将任何废料转化为所需材料。阵列覆盖整个星系，日产量超过整个银河系的工业产出。',
    copywriting_md: '工程师老李将一吨核废料送入重组阵列，另一端输出了高纯度黄金。"原子只是重新排列，"他解释。重组阵列群已经将银河系的废料全部转化为有用材料。',
    prompt: 'matter reconfiguration array cluster, atomic-level matter restructuring across galaxy, overwhelming epic scale, megastructure, waste transforming into valuable materials, hard sci-fi, nanotechnology, 8k',
    style_tag: '硬科幻'
  },
  {
    name: '星际定位系统群',
    category: '导航巨构',
    source: 'preset',
    setting_desc: '为银河系内航行提供精确定位的巨型导航系统群，由100亿个量子信标组成。定位系统可精确到毫米级定位银河系内任何位置。',
    copywriting_md: '导航员小陈校准着信标网络，确保每艘飞船都能精确定位。"误差小于1毫米，"他说，"即使在10万光年外。"他的工作是为星际航行提供"GPS"服务。',
    prompt: 'interstellar positioning system cluster, 10 billion quantum beacons across galaxy, overwhelming epic scale, megastructure, precise positioning visualization, hard sci-fi, galactic GPS, 8k',
    style_tag: '硬科幻'
  },
  {
    name: '能量储存阵列群',
    category: '能源巨构',
    source: 'preset',
    setting_desc: '储存巨量能量的环形设施阵列群，每个环直径1000公里，可储存相当于一颗恒星输出1000年的能量。阵列是星际文明的能量银行。',
    copywriting_md: '工程师老赵监控着储存阵列的能量水平，这里储存的能量够银河系使用一亿年。"这是文明的「存款」，"他说。储存阵列群收集了数千年的多余能量，以备不时之需。',
    prompt: 'energy storage array cluster, massive circular facilities storing stellar energy, overwhelming epic scale, megastructure, energy containment visualization, hard sci-fi, energy banking, 8k',
    style_tag: '硬科幻'
  },
  {
    name: '星际学府群',
    category: '文化巨构',
    source: 'preset',
    setting_desc: '培养星际时代顶尖人才的巨型教育机构群，建在中性轨道上，可容纳100万学生。学府拥有模拟各种极端环境的训练设施。',
    copywriting_md: '学生小林在黑洞模拟区训练，这里的引力环境模拟黑洞边缘。"毕业后我要去银河中心探险，"她说。学府群已经培养了上千万星际精英，他们引领着人类文明的未来。',
    prompt: 'interstellar academy cluster, massive educational facilities in neutral orbit, overwhelming epic scale, megastructure, students training in extreme environments, hard sci-fi, future education, 8k',
    style_tag: '太空歌剧'
  },
  {
    name: '物质传输网络群',
    category: '交通巨构',
    source: 'preset',
    setting_desc: '实现银河系内 instant 物质传输的站点网络群，通过量子扫描和重组实现 instant 传输。网络覆盖人类殖民的所有星系。',
    copywriting_md: '小吴走进地球传输站，一秒后出现在银河边缘的殖民地。"感觉像做梦，"他说。传输网络群让人类在银河系内 instant 移动，距离不再是障碍。',
    prompt: 'matter transmission network cluster, quantum teleportation across galaxy, overwhelming epic scale, megastructure, instant transportation visualization, hard sci-fi, futuristic transport, 8k',
    style_tag: '赛博朋克'
  },
  {
    name: '能量转换阵列群',
    category: '能源巨构',
    source: 'preset',
    setting_desc: '将各种形式的能量相互转换的巨型设施阵列群，可将物质100%转化为能量，也可将能量转化为物质。阵列是能源技术的终极形态。',
    copywriting_md: '工程师苏菲看着一克物质完全转化为能量，释放的能量相当于一颗恒星。"E=mc²的完美诠释，"她说。转换阵列群让人类掌握了物质与能量的奥秘。',
    prompt: 'energy conversion array cluster, converting matter to energy and vice versa, overwhelming epic scale, megastructure, mass-energy equivalence visualization, hard sci-fi, ultimate energy technology, 8k',
    style_tag: '硬科幻'
  },
  {
    name: '星际医疗中心群',
    category: '医疗巨构',
    source: 'preset',
    setting_desc: '为整个银河系提供顶级医疗服务的巨型设施群，可容纳100万患者。中心拥有意识上传、身体克隆、基因修复等技术。',
    copywriting_md: '医生老李刚完成一例意识上传手术，患者的意识已转移到新的克隆身体。"死亡已成为可选，"他说。医疗中心群让人类实现了生物学上的永生。',
    prompt: 'interstellar medical center cluster, advanced healthcare facilities serving the galaxy, overwhelming epic scale, megastructure, consciousness transfer pods, hard sci-fi, medical immortality, 8k',
    style_tag: '太空歌剧'
  },
  {
    name: '物质打印阵列群',
    category: '制造巨构',
    source: 'preset',
    setting_desc: '在原子层面打印任何物体的巨型3D打印设施阵列群，可制造从食物到飞船的任何东西。阵列覆盖整个星系，是后稀缺社会的核心。',
    copywriting_md: '小吴在打印阵列前输入设计图，一小时后一艘星际飞船出现。"这是用原子打印的，"他说。打印阵列群让制造变得像下载文件一样简单。',
    prompt: 'matter printing array cluster, atomic-level 3D printing across galaxy, overwhelming epic scale, megastructure, molecular assembly visualization, hard sci-fi, post-scarcity manufacturing, 8k',
    style_tag: '硬科幻'
  },
  {
    name: '星际货运港群',
    category: '交通巨构',
    source: 'preset',
    setting_desc: '银河系最大的货运港口群，可同时处理上百万艘货船的装卸。港口建在银河中心，是星际贸易的枢纽。',
    copywriting_md: '码头工人老赵指挥着货船装卸，每天处理数百万吨货物。"这些货物来自银河系各地，"他说。港口群是银河系最繁忙的地方，连接着人类文明的各个角落。',
    prompt: 'interstellar cargo port cluster, massive freight harbors at galactic center, overwhelming epic scale, megastructure, millions of cargo ships, hard sci-fi, space trade hub, 8k',
    style_tag: '太空歌剧'
  },
  {
    name: '生态恢复阵列群',
    category: '环境巨构',
    source: 'preset',
    setting_desc: '修复被破坏的行星生态的巨型设施阵列群，可在数十年内将死寂星球变为宜居世界。阵列配备完整的生态工程系统。',
    copywriting_md: '生态学家苏菲看着火星的大气逐渐变厚。"再过100年，这里可以呼吸，"她说。她的工作是让死去的星球复活，为人类创造新的家园。',
    prompt: 'ecological restoration array cluster, terraforming dead planets into habitable worlds, overwhelming epic scale, megastructure, atmosphere generation, planet transformation, hard sci-fi, planetary engineering, 8k',
    style_tag: '太空歌剧'
  },
  {
    name: '能量护盾阵列群',
    category: '防御巨构',
    source: 'preset',
    setting_desc: '保护整个银河系的能量护盾阵列群，由上百万个护盾发生器组成，可抵挡星系级别的威胁。护盾阵列是文明安全的最终保障。',
    copywriting_md: '护盾操作员小陈监控着护盾阵列，确保每个节点正常运行。"可以抵挡银河系级别的灾难，"他说。护盾阵列群让人类文明在宇宙中安然无恙。',
    prompt: 'energy shield array cluster, galaxy-wide protective force fields, overwhelming epic scale, megastructure, shield generators across galaxy, hard sci-fi, galactic defense, 8k',
    style_tag: '硬科幻'
  },
  {
    name: '星际牧场群群',
    category: '资源采集',
    source: 'preset',
    setting_desc: '在小行星带上建立的巨型畜牧业基地群群，利用改造后的小行星作为牧场。牧场群覆盖数亿平方公里，为银河系提供肉类和奶制品。',
    copywriting_md: '牧民老李在低重力小行星上放牧着转基因牛，这些动物在太空环境中长得比地球大10倍。"太空牧场产量是地球的100倍，"他说。他的牧场群群养活了100亿人。',
    prompt: 'interstellar ranch cluster of clusters, massive livestock facilities on asteroids, overwhelming epic scale, megastructure, animals grazing on modified asteroids, low gravity farming, hard sci-fi, space agriculture, 8k',
    style_tag: '太空歌剧'
  },
  {
    name: '量子通信阵列群',
    category: '通信巨构',
    source: 'preset',
    setting_desc: '利用量子纠缠实现超光速通信的巨型阵列群，由上亿个量子中继站组成。通信阵列覆盖整个银河系，实现实时跨星系交流。',
    copywriting_md: '通信员小赵监控着量子阵列流量，每秒有 ZB 级数据穿越数万光年。"银河边缘殖民地发来视频，"AI说。她接通后，看到了5万光年外的同事。',
    prompt: 'quantum communication array cluster, faster-than-light communication via quantum entanglement, overwhelming epic scale, megastructure, data streams across galaxy, hard sci-fi, interstellar internet, 8k',
    style_tag: '硬科幻'
  },
  {
    name: '星际研究中心群',
    category: '文化巨构',
    source: 'preset',
    setting_desc: '进行前沿科学研究的巨型研究机构群，建在银河中心黑洞附近，可容纳100万科学家。研究中心拥有各种极端环境模拟设施。',
    copywriting_md: '研究员苏菲在黑洞模拟区工作，这里的引力环境模拟银河中心黑洞。"我们可能发现新的物理定律，"她说。研究中心群汇集了人类最聪明的头脑。',
    prompt: 'interstellar research center cluster, massive scientific facilities near galactic center black hole, overwhelming epic scale, megastructure, extreme environment simulations, hard sci-fi, scientific discovery, 8k',
    style_tag: '硬科幻'
  },
  {
    name: '能量传输网络群',
    category: '能源巨构',
    source: 'preset',
    setting_desc: '通过微波在银河系内无线传输能量的巨型网络群，将能量从生产地传输到消费地。网络覆盖整个银河系，让能量成为真正的"免费"资源。',
    copywriting_md: '工程师老赵调整着传输网络，将能量从银河中心传输到边缘殖民地。"这束能量将穿越10万光年，"他说。接收站将把微波转化为电能。',
    prompt: 'energy transmission network cluster, wireless power transfer across galaxy via microwaves, overwhelming epic scale, megastructure, energy beams crossing galactic space, hard sci-fi, wireless energy, 8k',
    style_tag: '硬科幻'
  },
  {
    name: '时间研究中心群',
    category: '物理巨构',
    source: 'preset',
    setting_desc: '研究时间操控的实验设施群，利用银河中心黑洞的极端时间膨胀效应进行实验。研究中心建在多个超大质量黑洞轨道上。',
    copywriting_md: '物理学家苏菲在研究中心工作了一年，外界已过去1000年。"这里的时间流速不同，"她说。她的研究可能让人类掌握时间旅行的秘密。',
    prompt: 'time research center cluster orbiting supermassive black holes, studying time manipulation, overwhelming epic scale, megastructure, time distortion visualization, hard sci-fi, temporal physics, 8k',
    style_tag: '硬科幻'
  },
  {
    name: '星际医疗网络群',
    category: '医疗巨构',
    source: 'preset',
    setting_desc: '为整个银河系提供医疗服务的巨型设施网络群，可容纳上千万患者。网络拥有最先进的医疗技术，包括意识上传、身体克隆、基因修复等。',
    copywriting_md: '医生老李刚完成一例远程手术，他在地球操控机器人为10万光年外的患者手术。"延迟只有1秒，"他说。医疗网络群让人类在宇宙任何角落都能获得顶级医疗。',
    prompt: 'interstellar medical network cluster, advanced healthcare facilities across galaxy, overwhelming epic scale, megastructure, remote surgery pods, hard sci-fi, medical technology, 8k',
    style_tag: '太空歌剧'
  },
  {
    name: '物质合成网络群',
    category: '制造巨构',
    source: 'preset',
    setting_desc: '将能量直接转化为物质的巨型合成设施网络群，可制造任何需要的物品。网络覆盖整个银河系，是后稀缺社会的物质基础。',
    copywriting_md: '小吴在合成网络前输入指令，一秒后一份美味的晚餐出现。"这是用能量直接合成的，"他说。合成网络群让物质匮乏成为历史。',
    prompt: 'matter synthesis network cluster, converting energy directly into matter across galaxy, overwhelming epic scale, megastructure, molecular assembly visualization, hard sci-fi, post-scarcity society, 8k',
    style_tag: '硬科幻'
  },
  {
    name: '星际交通网络群',
    category: '交通巨构',
    source: 'preset',
    setting_desc: '银河系最大的交通中转站网络群，可同时处理上亿艘飞船的起降。网络建在银河各臂的枢纽点，是通往银河系各处的门户。',
    copywriting_md: '网络管理员老赵看着全息星图，上亿个光点代表正在进出的飞船。"每天处理5000万艘船，"他说。网络群是银河系最繁忙的地方。',
    prompt: 'interstellar transport network cluster, massive transit stations across galaxy, overwhelming epic scale, megastructure, millions of ships docking, gateway to the galaxy, hard sci-fi, space traffic control, 8k',
    style_tag: '太空歌剧'
  },
  {
    name: '生态改造阵列群',
    category: '环境巨构',
    source: 'preset',
    setting_desc: '将不宜居星球改造为宜居世界的巨型设施阵列群，可在数百年内完成行星地球化。阵列覆盖整个银河系，可同时改造上万颗星球。',
    copywriting_md: '改造工程师苏菲看着一颗红色星球逐渐被蓝色海洋覆盖。"再过500年，这里将是新的地球，"她说。她的工作是为人类创造新的家园。',
    prompt: 'ecological transformation array cluster, terraforming planets across galaxy, overwhelming epic scale, megastructure, atmosphere generators and ocean fillers, planet transformation, hard sci-fi, planetary engineering, 8k',
    style_tag: '太空歌剧'
  },
  {
    name: '防御护盾阵列群',
    category: '防御巨构',
    source: 'preset',
    setting_desc: '保护人类殖民地免受各种威胁的能量护盾阵列群，由上百万个护盾发生器组成。阵列可抵挡从小行星撞击到超新星爆发的各种威胁。',
    copywriting_md: '护盾操作员小陈监控着护盾阵列，确保每个殖民地都有防护。"可以抵挡任何已知威胁，"他说。护盾阵列群让人类在危险的宇宙中安居乐业。',
    prompt: 'defense shield array cluster, protective energy shields around colonies, overwhelming epic scale, megastructure, shield generators protecting planets, hard sci-fi, planetary defense, 8k',
    style_tag: '硬科幻'
  },
  {
    name: '星际渔场网络群',
    category: '资源采集',
    source: 'preset',
    setting_desc: '在气态巨行星大气层中养殖太空生物的巨型渔场网络群，利用行星大气中的有机物养殖可食用的太空鱼类。渔场网络覆盖整个银河系的气态巨行星。',
    copywriting_md: '渔民老李在木星大气层中捕捞太空鱼，这些生物在高压环境中长到数百米长。"银河渔场产量是地球海洋的1000倍，"他说。他的渔场网络群养活了1000亿人。',
    prompt: 'interstellar fishery network cluster, massive aquaculture in gas giant atmospheres, overwhelming epic scale, megastructure, space creatures in planetary atmospheres, hard sci-fi, space fishing, 8k',
    style_tag: '太空歌剧'
  },
  {
    name: '量子计算网络群',
    category: '计算巨构',
    source: 'preset',
    setting_desc: '利用量子效应进行超高速计算的巨型计算机网络群，计算能力超过宇宙中所有经典计算机总和。网络冷却系统延伸至银河系边缘。',
    copywriting_md: '程序员小吴"接入"量子网络，他的思维在量子态中展开。"所有可能的答案同时出现，"他描述。他的身体在地球，意识已在量子世界中工作了一周。',
    prompt: 'quantum computing network cluster, massive quantum computing installations, overwhelming epic scale, megastructure, quantum state visualization, cooling to galactic edge, hard sci-fi, quantum technology, 8k',
    style_tag: '赛博朋克'
  },
  {
    name: '星际档案网络群',
    category: '文化巨构',
    source: 'preset',
    setting_desc: '保存人类所有文明成果的巨型档案网络群，分布在银河系各处的稳定拉格朗日点。网络存储了地球所有文明的文献、艺术、音乐。',
    copywriting_md: '档案员小林在档案网络中漫步，这里存储着人类5000年的智慧。"这份文件来自21世纪的互联网，"她指着一个数据晶体。她的职责是确保文明的记忆永不消失。',
    prompt: 'interstellar archive network cluster, massive repositories of human civilization across galaxy, overwhelming epic scale, megastructure, data crystals storing all knowledge, hard sci-fi, cultural preservation, 8k',
    style_tag: '太空歌剧'
  },
  {
    name: '物质重组网络群',
    category: '制造巨构',
    source: 'preset',
    setting_desc: '在原子层面重组物质结构的巨型制造设施网络群，可将任何废料转化为所需材料。网络覆盖整个银河系，日产量超过整个宇宙的工业产出。',
    copywriting_md: '工程师老李将一吨核废料送入重组网络，另一端输出了高纯度黄金。"原子只是重新排列，"他解释。重组网络群已经将宇宙的废料全部转化为有用材料。',
    prompt: 'matter reconfiguration network cluster, atomic-level matter restructuring across galaxy, overwhelming epic scale, megastructure, waste transforming into valuable materials, hard sci-fi, nanotechnology, 8k',
    style_tag: '硬科幻'
  },
  {
    name: '星际定位网络群',
    category: '导航巨构',
    source: 'preset',
    setting_desc: '为银河系内航行提供精确定位的巨型导航网络群，由1000亿个量子信标组成。定位网络可精确到纳米级定位银河系内任何位置。',
    copywriting_md: '导航员小陈校准着信标网络，确保每艘飞船都能精确定位。"误差小于1纳米，"他说，"即使在10万光年外。"他的工作是为星际航行提供"GPS"服务。',
    prompt: 'interstellar positioning network cluster, 100 billion quantum beacons across galaxy, overwhelming epic scale, megastructure, precise positioning visualization, hard sci-fi, galactic GPS, 8k',
    style_tag: '硬科幻'
  },
  {
    name: '能量储存网络群',
    category: '能源巨构',
    source: 'preset',
    setting_desc: '储存巨量能量的环形设施网络群，每个环直径10000公里，可储存相当于一颗恒星输出10000年的能量。网络是星际文明的能量银行。',
    copywriting_md: '工程师老赵监控着储存网络的能量水平，这里储存的能量够银河系使用一亿年。"这是文明的「存款」，"他说。储存网络群收集了数千年的多余能量。',
    prompt: 'energy storage network cluster, massive circular facilities storing stellar energy, overwhelming epic scale, megastructure, energy containment visualization, hard sci-fi, energy banking, 8k',
    style_tag: '硬科幻'
  },
  {
    name: '星际学院网络群',
    category: '文化巨构',
    source: 'preset',
    setting_desc: '培养星际时代顶尖人才的巨型教育机构网络群，分布在银河系各处，可容纳1000万学生。网络拥有模拟各种极端环境的训练设施。',
    copywriting_md: '学生小林在黑洞模拟区训练，这里的引力环境模拟黑洞边缘。"毕业后我要去银河中心探险，"她说。学院网络群已经培养了上亿星际精英。',
    prompt: 'interstellar academy network cluster, massive educational facilities across galaxy, overwhelming epic scale, megastructure, students training in extreme environments, hard sci-fi, future education, 8k',
    style_tag: '太空歌剧'
  },
  {
    name: '物质传输系统群',
    category: '交通巨构',
    source: 'preset',
    setting_desc: '实现银河系内 instant 物质传输的站点系统群，通过量子扫描和重组实现 instant 传输。系统覆盖人类殖民的所有星系，让距离消失。',
    copywriting_md: '小吴走进地球传输站，一秒后出现在银河边缘的殖民地。"感觉像做梦，"他说。传输系统群让人类在银河系内 instant 移动。',
    prompt: 'matter transmission system cluster, quantum teleportation across galaxy, overwhelming epic scale, megastructure, instant transportation visualization, hard sci-fi, futuristic transport, 8k',
    style_tag: '赛博朋克'
  },
  {
    name: '能量转换网络群',
    category: '能源巨构',
    source: 'preset',
    setting_desc: '将各种形式的能量相互转换的巨型设施网络群，可将物质100%转化为能量，也可将能量转化为物质。网络是能源技术的终极形态。',
    copywriting_md: '工程师苏菲看着一克物质完全转化为能量，释放的能量相当于一颗恒星。"E=mc²的完美诠释，"她说。转换网络群让人类掌握了物质与能量的奥秘。',
    prompt: 'energy conversion network cluster, converting matter to energy and vice versa, overwhelming epic scale, megastructure, mass-energy equivalence visualization, hard sci-fi, ultimate energy technology, 8k',
    style_tag: '硬科幻'
  },
  {
    name: '星际医疗综合体群',
    category: '医疗巨构',
    source: 'preset',
    setting_desc: '为整个银河系提供顶级医疗服务的巨型综合体群，可容纳1000万患者。综合体拥有意识上传、身体克隆、基因修复等技术。',
    copywriting_md: '医生老李刚完成一例意识上传手术，患者的意识已转移到新的克隆身体。"死亡已成为可选，"他说。医疗综合体群让人类实现了生物学上的永生。',
    prompt: 'interstellar medical complex cluster, advanced healthcare facilities serving the galaxy, overwhelming epic scale, megastructure, consciousness transfer pods, hard sci-fi, medical immortality, 8k',
    style_tag: '太空歌剧'
  },
  {
    name: '物质打印网络群',
    category: '制造巨构',
    source: 'preset',
    setting_desc: '在原子层面打印任何物体的巨型3D打印设施网络群，可制造从食物到飞船的任何东西。网络覆盖整个银河系，是后稀缺社会的核心。',
    copywriting_md: '小吴在打印网络前输入设计图，一小时后一艘星际飞船出现。"这是用原子打印的，"他说。打印网络群让制造变得像下载文件一样简单。',
    prompt: 'matter printing network cluster, atomic-level 3D printing across galaxy, overwhelming epic scale, megastructure, molecular assembly visualization, hard sci-fi, post-scarcity manufacturing, 8k',
    style_tag: '硬科幻'
  },
  {
    name: '星际货运网络群',
    category: '交通巨构',
    source: 'preset',
    setting_desc: '银河系最大的货运港口网络群，可同时处理上亿艘货船的装卸。网络建在银河各臂的枢纽点，是星际贸易的枢纽。',
    copywriting_md: '码头工人老赵指挥着货船装卸，每天处理数百万吨货物。"这些货物来自银河系各地，"他说。港口网络群是银河系最繁忙的地方。',
    prompt: 'interstellar cargo network cluster, massive freight harbors across galaxy, overwhelming epic scale, megastructure, millions of cargo ships, hard sci-fi, space trade hub, 8k',
    style_tag: '太空歌剧'
  },
  {
    name: '生态恢复网络群',
    category: '环境巨构',
    source: 'preset',
    setting_desc: '修复被破坏的行星生态的巨型设施网络群，可在数十年内将死寂星球变为宜居世界。网络覆盖整个银河系，可同时恢复上万颗星球。',
    copywriting_md: '生态学家苏菲看着火星的大气逐渐变厚。"再过100年，这里可以呼吸，"她说。她的工作是让死去的星球复活，为人类创造新的家园。',
    prompt: 'ecological restoration network cluster, terraforming dead planets across galaxy, overwhelming epic scale, megastructure, atmosphere generation, planet transformation, hard sci-fi, planetary engineering, 8k',
    style_tag: '太空歌剧'
  },
  {
    name: '能量护盾网络群',
    category: '防御巨构',
    source: 'preset',
    setting_desc: '保护整个银河系的能量护盾网络群，由上千万个护盾发生器组成，可抵挡星系级别的威胁。护盾网络是文明安全的最终保障。',
    copywriting_md: '护盾操作员小陈监控着护盾网络，确保每个节点正常运行。"可以抵挡银河系级别的灾难，"他说。护盾网络群让人类文明在宇宙中安然无恙。',
    prompt: 'energy shield network cluster, galaxy-wide protective force fields, overwhelming epic scale, megastructure, shield generators across galaxy, hard sci-fi, galactic defense, 8k',
    style_tag: '硬科幻'
  },
  {
    name: '星际牧场网络群',
    category: '资源采集',
    source: 'preset',
    setting_desc: '在小行星带上建立的巨型畜牧业基地网络群，利用改造后的小行星作为牧场。网络覆盖整个银河系的小行星带，为银河系提供肉类和奶制品。',
    copywriting_md: '牧民老李在低重力小行星上放牧着转基因牛，这些动物在太空环境中长得比地球大100倍。"银河牧场产量是地球的1000倍，"他说。他的牧场网络群养活了万亿人。',
    prompt: 'interstellar ranch network cluster, massive livestock facilities on asteroids, overwhelming epic scale, megastructure, animals grazing on modified asteroids, low gravity farming, hard sci-fi, space agriculture, 8k',
    style_tag: '太空歌剧'
  },
  {
    name: '量子通信网络群',
    category: '通信巨构',
    source: 'preset',
    setting_desc: '利用量子纠缠实现超光速通信的巨型网络群，由上万亿个量子中继站组成。通信网络覆盖整个银河系，实现实时跨星系交流。',
    copywriting_md: '通信员小赵监控着量子网络流量，每秒有 YB 级数据穿越数十万光年。"银河边缘殖民地发来视频，"AI说。她接通后，看到了10万光年外的同事。',
    prompt: 'quantum communication network cluster, faster-than-light communication via quantum entanglement, overwhelming epic scale, megastructure, data streams across galaxy, hard sci-fi, interstellar internet, 8k',
    style_tag: '硬科幻'
  },
  {
    name: '星际研究网络群',
    category: '文化巨构',
    source: 'preset',
    setting_desc: '进行前沿科学研究的巨型研究机构网络群，建在银河系各处的极端环境中，可容纳1000万科学家。网络拥有各种极端环境模拟设施。',
    copywriting_md: '研究员苏菲在黑洞模拟区工作，这里的引力环境模拟银河中心黑洞。"我们可能发现新的物理定律，"她说。研究网络群汇集了人类最聪明的头脑。',
    prompt: 'interstellar research network cluster, massive scientific facilities across galaxy, overwhelming epic scale, megastructure, extreme environment simulations, hard sci-fi, scientific discovery, 8k',
    style_tag: '硬科幻'
  },
  {
    name: '能量传输系统群',
    category: '能源巨构',
    source: 'preset',
    setting_desc: '通过微波在银河系内无线传输能量的巨型系统群，将能量从生产地传输到消费地。系统覆盖整个银河系，让能量成为真正的"免费"资源。',
    copywriting_md: '工程师老赵调整着传输系统，将能量从银河中心传输到边缘殖民地。"这束能量将穿越10万光年，"他说。接收站将把微波转化为电能。',
    prompt: 'energy transmission system cluster, wireless power transfer across galaxy via microwaves, overwhelming epic scale, megastructure, energy beams crossing galactic space, hard sci-fi, wireless energy, 8k',
    style_tag: '硬科幻'
  },
  {
    name: '时间研究网络群',
    category: '物理巨构',
    source: 'preset',
    setting_desc: '研究时间操控的实验设施网络群，利用银河系各处黑洞的极端时间膨胀效应进行实验。网络建在多个超大质量黑洞轨道上。',
    copywriting_md: '物理学家苏菲在研究网络工作了一年，外界已过去10000年。"这里的时间流速不同，"她说。她的研究可能让人类掌握时间旅行的秘密。',
    prompt: 'time research network cluster orbiting supermassive black holes, studying time manipulation, overwhelming epic scale, megastructure, time distortion visualization, hard sci-fi, temporal physics, 8k',
    style_tag: '硬科幻'
  },
  {
    name: '星际医疗系统群',
    category: '医疗巨构',
    source: 'preset',
    setting_desc: '为整个银河系提供医疗服务的巨型设施系统群，可容纳上亿患者。系统拥有最先进的医疗技术，包括意识上传、身体克隆、基因修复等。',
    copywriting_md: '医生老李刚完成一例远程手术，他在地球操控机器人为100万光年外的患者手术。"延迟只有1秒，"他说。医疗系统群让人类在宇宙任何角落都能获得顶级医疗。',
    prompt: 'interstellar medical system cluster, advanced healthcare facilities across galaxy, overwhelming epic scale, megastructure, remote surgery pods, hard sci-fi, medical technology, 8k',
    style_tag: '太空歌剧'
  },
  {
    name: '物质合成系统群',
    category: '制造巨构',
    source: 'preset',
    setting_desc: '将能量直接转化为物质的巨型合成设施系统群，可制造任何需要的物品。系统覆盖整个银河系，是后稀缺社会的物质基础。',
    copywriting_md: '小吴在合成系统前输入指令，一秒后一份美味的晚餐出现。"这是用能量直接合成的，"他说。合成系统群让物质匮乏成为历史。',
    prompt: 'matter synthesis system cluster, converting energy directly into matter across galaxy, overwhelming epic scale, megastructure, molecular assembly visualization, hard sci-fi, post-scarcity society, 8k',
    style_tag: '硬科幻'
  },
  {
    name: '星际交通系统群',
    category: '交通巨构',
    source: 'preset',
    setting_desc: '银河系最大的交通中转站系统群，可同时处理上亿艘飞船的起降。系统建在银河各臂的枢纽点，是通往银河系各处的门户。',
    copywriting_md: '系统管理员老赵看着全息星图，上亿个光点代表正在进出的飞船。"每天处理5亿艘船，"他说。系统群是银河系最繁忙的地方。',
    prompt: 'interstellar transport system cluster, massive transit stations across galaxy, overwhelming epic scale, megastructure, millions of ships docking, gateway to the galaxy, hard sci-fi, space traffic control, 8k',
    style_tag: '太空歌剧'
  },
  {
    name: '生态改造系统群',
    category: '环境巨构',
    source: 'preset',
    setting_desc: '将不宜居星球改造为宜居世界的巨型设施系统群，可在数百年内完成行星地球化。系统覆盖整个银河系，可同时改造上百万颗星球。',
    copywriting_md: '改造工程师苏菲看着一颗红色星球逐渐被蓝色海洋覆盖。"再过500年，这里将是新的地球，"她说。她的工作是为人类创造新的家园。',
    prompt: 'ecological transformation system cluster, terraforming planets across galaxy, overwhelming epic scale, megastructure, atmosphere generators and ocean fillers, planet transformation, hard sci-fi, planetary engineering, 8k',
    style_tag: '太空歌剧'
  },
  {
    name: '防御护盾系统群',
    category: '防御巨构',
    source: 'preset',
    setting_desc: '保护人类殖民地免受各种威胁的能量护盾系统群，由上千万个护盾发生器组成。系统可抵挡从小行星撞击到超新星爆发的各种威胁。',
    copywriting_md: '护盾操作员小陈监控着护盾系统，确保每个殖民地都有防护。"可以抵挡任何已知威胁，"他说。护盾系统群让人类在危险的宇宙中安居乐业。',
    prompt: 'defense shield system cluster, protective energy shields around colonies, overwhelming epic scale, megastructure, shield generators protecting planets, hard sci-fi, planetary defense, 8k',
    style_tag: '硬科幻'
  },
  {
    name: '星际渔场系统群',
    category: '资源采集',
    source: 'preset',
    setting_desc: '在气态巨行星大气层中养殖太空生物的巨型渔场系统群，利用行星大气中的有机物养殖可食用的太空鱼类。系统覆盖整个银河系的气态巨行星。',
    copywriting_md: '渔民老李在木星大气层中捕捞太空鱼，这些生物在高压环境中长到数公里长。"银河渔场产量是地球海洋的10000倍，"他说。他的渔场系统群养活了万亿人。',
    prompt: 'interstellar fishery system cluster, massive aquaculture in gas giant atmospheres, overwhelming epic scale, megastructure, space creatures in planetary atmospheres, hard sci-fi, space fishing, 8k',
    style_tag: '太空歌剧'
  },
  {
    name: '量子计算系统群',
    category: '计算巨构',
    source: 'preset',
    setting_desc: '利用量子效应进行超高速计算的巨型计算机系统群，计算能力超过宇宙中所有经典计算机总和。系统冷却系统延伸至银河系边缘。',
    copywriting_md: '程序员小吴"接入"量子系统，他的思维在量子态中展开。"所有可能的答案同时出现，"他描述。他的身体在地球，意识已在量子世界中工作了一周。',
    prompt: 'quantum computing system cluster, massive quantum computing installations, overwhelming epic scale, megastructure, quantum state visualization, cooling to galactic edge, hard sci-fi, quantum technology, 8k',
    style_tag: '赛博朋克'
  },
  {
    name: '星际档案系统群',
    category: '文化巨构',
    source: 'preset',
    setting_desc: '保存人类所有文明成果的巨型档案系统群，分布在银河系各处的稳定拉格朗日点。系统存储了地球所有文明的文献、艺术、音乐。',
    copywriting_md: '档案员小林在档案系统中漫步，这里存储着人类5000年的智慧。"这份文件来自21世纪的互联网，"她指着一个数据晶体。她的职责是确保文明的记忆永不消失。',
    prompt: 'interstellar archive system cluster, massive repositories of human civilization across galaxy, overwhelming epic scale, megastructure, data crystals storing all knowledge, hard sci-fi, cultural preservation, 8k',
    style_tag: '太空歌剧'
  },
  {
    name: '物质重组系统群',
    category: '制造巨构',
    source: 'preset',
    setting_desc: '在原子层面重组物质结构的巨型制造设施系统群，可将任何废料转化为所需材料。系统覆盖整个银河系，日产量超过整个宇宙的工业产出。',
    copywriting_md: '工程师老李将一吨核废料送入重组系统，另一端输出了高纯度黄金。"原子只是重新排列，"他解释。重组系统群已经将宇宙的废料全部转化为有用材料。',
    prompt: 'matter reconfiguration system cluster, atomic-level matter restructuring across galaxy, overwhelming epic scale, megastructure, waste transforming into valuable materials, hard sci-fi, nanotechnology, 8k',
    style_tag: '硬科幻'
  },
  {
    name: '星际定位系统群',
    category: '导航巨构',
    source: 'preset',
    setting_desc: '为银河系内航行提供精确定位的巨型导航系统群，由1万亿个量子信标组成。定位系统可精确到皮米级定位银河系内任何位置。',
    copywriting_md: '导航员小陈校准着信标系统，确保每艘飞船都能精确定位。"误差小于1皮米，"他说，"即使在10万光年外。"他的工作是为星际航行提供"GPS"服务。',
    prompt: 'interstellar positioning system cluster, 1 trillion quantum beacons across galaxy, overwhelming epic scale, megastructure, precise positioning visualization, hard sci-fi, galactic GPS, 8k',
    style_tag: '硬科幻'
  },
  {
    name: '能量储存系统群',
    category: '能源巨构',
    source: 'preset',
    setting_desc: '储存巨量能量的环形设施系统群，每个环直径10万公里，可储存相当于一颗恒星输出10万年的能量。系统是星际文明的能量银行。',
    copywriting_md: '工程师老赵监控着储存系统的能量水平，这里储存的能量够银河系使用一亿年。"这是文明的「存款」，"他说。储存系统群收集了数千年的多余能量。',
    prompt: 'energy storage system cluster, massive circular facilities storing stellar energy, overwhelming epic scale, megastructure, energy containment visualization, hard sci-fi, energy banking, 8k',
    style_tag: '硬科幻'
  },
  {
    name: '星际学院系统群',
    category: '文化巨构',
    source: 'preset',
    setting_desc: '培养星际时代顶尖人才的巨型教育机构系统群，分布在银河系各处，可容纳1亿学生。系统拥有模拟各种极端环境的训练设施。',
    copywriting_md: '学生小林在黑洞模拟区训练，这里的引力环境模拟黑洞边缘。"毕业后我要去银河中心探险，"她说。学院系统群已经培养了上亿星际精英。',
    prompt: 'interstellar academy system cluster, massive educational facilities across galaxy, overwhelming epic scale, megastructure, students training in extreme environments, hard sci-fi, future education, 8k',
    style_tag: '太空歌剧'
  },
  {
    name: '物质传输网络系统群',
    category: '交通巨构',
    source: 'preset',
    setting_desc: '实现银河系内 instant 物质传输的站点网络系统群，通过量子扫描和重组实现 instant 传输。网络覆盖人类殖民的所有星系，让距离消失。',
    copywriting_md: '小吴走进地球传输站，一秒后出现在银河边缘的殖民地。"感觉像做梦，"他说。传输网络系统群让人类在银河系内 instant 移动。',
    prompt: 'matter transmission network system cluster, quantum teleportation across galaxy, overwhelming epic scale, megastructure, instant transportation visualization, hard sci-fi, futuristic transport, 8k',
    style_tag: '赛博朋克'
  },
  {
    name: '能量转换系统群',
    category: '能源巨构',
    source: 'preset',
    setting_desc: '将各种形式的能量相互转换的巨型设施系统群，可将物质100%转化为能量，也可将能量转化为物质。系统是能源技术的终极形态。',
    copywriting_md: '工程师苏菲看着一克物质完全转化为能量，释放的能量相当于一颗恒星。"E=mc²的完美诠释，"她说。转换系统群让人类掌握了物质与能量的奥秘。',
    prompt: 'energy conversion system cluster, converting matter to energy and vice versa, overwhelming epic scale, megastructure, mass-energy equivalence visualization, hard sci-fi, ultimate energy technology, 8k',
    style_tag: '硬科幻'
  },
  {
    name: '星际医疗系统群',
    category: '医疗巨构',
    source: 'preset',
    setting_desc: '为整个银河系提供顶级医疗服务的巨型系统群，可容纳10亿患者。系统拥有意识上传、身体克隆、基因修复等技术。',
    copywriting_md: '医生老李刚完成一例意识上传手术，患者的意识已转移到新的克隆身体。"死亡已成为可选，"他说。医疗系统群让人类实现了生物学上的永生。',
    prompt: 'interstellar medical system cluster, advanced healthcare facility serving the galaxy, overwhelming epic scale, megastructure, consciousness transfer pods, hard sci-fi, medical immortality, 8k',
    style_tag: '太空歌剧'
  },
  {
    name: '物质打印系统群',
    category: '制造巨构',
    source: 'preset',
    setting_desc: '在原子层面打印任何物体的巨型3D打印设施系统群，可制造从食物到飞船的任何东西。系统覆盖整个银河系，是后稀缺社会的核心。',
    copywriting_md: '小吴在打印系统前输入设计图，一小时后一艘星际飞船出现。"这是用原子打印的，"他说。打印系统群让制造变得像下载文件一样简单。',
    prompt: 'matter printing system cluster, atomic-level 3D printing across galaxy, overwhelming epic scale, megastructure, molecular assembly visualization, hard sci-fi, post-scarcity manufacturing, 8k',
    style_tag: '硬科幻'
  },
  {
    name: '星际货运系统群',
    category: '交通巨构',
    source: 'preset',
    setting_desc: '银河系最大的货运港口系统群，可同时处理上亿艘货船的装卸。系统建在银河各臂的枢纽点，是星际贸易的枢纽。',
    copywriting_md: '码头工人老赵指挥着货船装卸，每天处理数百万吨货物。"这些货物来自银河系各地，"他说。港口系统群是银河系最繁忙的地方。',
    prompt: 'interstellar cargo system cluster, massive freight harbors across galaxy, overwhelming epic scale, megastructure, millions of cargo ships, hard sci-fi, space trade hub, 8k',
    style_tag: '太空歌剧'
  },
  {
    name: '生态恢复系统群',
    category: '环境巨构',
    source: 'preset',
    setting_desc: '修复被破坏的行星生态的巨型设施系统群，可在数十年内将死寂星球变为宜居世界。系统覆盖整个银河系，可同时恢复上百万颗星球。',
    copywriting_md: '生态学家苏菲看着火星的大气逐渐变厚。"再过100年，这里可以呼吸，"她说。她的工作是让死去的星球复活，为人类创造新的家园。',
    prompt: 'ecological restoration system cluster, terraforming dead planets across galaxy, overwhelming epic scale, megastructure, atmosphere generation, planet transformation, hard sci-fi, planetary engineering, 8k',
    style_tag: '太空歌剧'
  },
  {
    name: '能量护盾系统群',
    category: '防御巨构',
    source: 'preset',
    setting_desc: '保护整个银河系的能量护盾系统群，由上亿个护盾发生器组成，可抵挡星系级别的威胁。护盾系统是文明安全的最终保障。',
    copywriting_md: '护盾操作员小陈监控着护盾系统，确保每个节点正常运行。"可以抵挡银河系级别的灾难，"他说。护盾系统群让人类文明在宇宙中安然无恙。',
    prompt: 'energy shield system cluster, galaxy-wide protective force fields, overwhelming epic scale, megastructure, shield generators across galaxy, hard sci-fi, galactic defense, 8k',
    style_tag: '硬科幻'
  },
  {
    name: '星际牧场系统群',
    category: '资源采集',
    source: 'preset',
    setting_desc: '在小行星带上建立的巨型畜牧业基地系统群，利用改造后的小行星作为牧场。系统覆盖整个银河系的小行星带，为银河系提供肉类和奶制品。',
    copywriting_md: '牧民老李在低重力小行星上放牧着转基因牛，这些动物在太空环境中长得比地球大1000倍。"银河牧场产量是地球的10000倍，"他说。他的牧场系统群养活了万亿人。',
    prompt: 'interstellar ranch system cluster, massive livestock facilities on asteroids, overwhelming epic scale, megastructure, animals grazing on modified asteroids, low gravity farming, hard sci-fi, space agriculture, 8k',
    style_tag: '太空歌剧'
  },
  {
    name: '量子通信系统群',
    category: '通信巨构',
    source: 'preset',
    setting_desc: '利用量子纠缠实现超光速通信的巨型系统群，由上万亿个量子中继站组成。通信系统覆盖整个银河系，实现实时跨星系交流。',
    copywriting_md: '通信员小赵监控着量子系统流量，每秒有 ZB 级数据穿越数十万光年。"银河边缘殖民地发来视频，"AI说。她接通后，看到了10万光年外的同事。',
    prompt: 'quantum communication system cluster, faster-than-light communication via quantum entanglement, overwhelming epic scale, megastructure, data streams across galaxy, hard sci-fi, interstellar internet, 8k',
    style_tag: '硬科幻'
  },
  {
    name: '星际研究系统群',
    category: '文化巨构',
    source: 'preset',
    setting_desc: '进行前沿科学研究的巨型研究机构系统群，建在银河系各处的极端环境中，可容纳1亿科学家。系统拥有各种极端环境模拟设施。',
    copywriting_md: '研究员苏菲在黑洞模拟区工作，这里的引力环境模拟银河中心黑洞。"我们可能发现新的物理定律，"她说。研究系统群汇集了人类最聪明的头脑。',
    prompt: 'interstellar research system cluster, massive scientific facilities across galaxy, overwhelming epic scale, megastructure, extreme environment simulations, hard sci-fi, scientific discovery, 8k',
    style_tag: '硬科幻'
  },
  {
    name: '能量传输网络系统群',
    category: '能源巨构',
    source: 'preset',
    setting_desc: '通过微波在银河系内无线传输能量的巨型网络系统群，将能量从生产地传输到消费地。网络覆盖整个银河系，让能量成为真正的"免费"资源。',
    copywriting_md: '工程师老赵调整着传输网络，将能量从银河中心传输到边缘殖民地。"这束能量将穿越10万光年，"他说。接收站将把微波转化为电能。',
    prompt: 'energy transmission network system cluster, wireless power transfer across galaxy via microwaves, overwhelming epic scale, megastructure, energy beams crossing galactic space, hard sci-fi, wireless energy, 8k',
    style_tag: '硬科幻'
  },
  {
    name: '时间研究系统群',
    category: '物理巨构',
    source: 'preset',
    setting_desc: '研究时间操控的实验设施系统群，利用银河系各处黑洞的极端时间膨胀效应进行实验。系统建在多个超大质量黑洞轨道上。',
    copywriting_md: '物理学家苏菲在研究系统工作了一年，外界已过去10万年。"这里的时间流速不同，"她说。她的研究可能让人类掌握时间旅行的秘密。',
    prompt: 'time research system cluster orbiting supermassive black holes, studying time manipulation, overwhelming epic scale, megastructure, time distortion visualization, hard sci-fi, temporal physics, 8k',
    style_tag: '硬科幻'
  },
  {
    name: '星际医疗网络系统群',
    category: '医疗巨构',
    source: 'preset',
    setting_desc: '为整个银河系提供医疗服务的巨型设施网络系统群，可容纳10亿患者。网络拥有最先进的医疗技术，包括意识上传、身体克隆、基因修复等。',
    copywriting_md: '医生老李刚完成一例远程手术，他在地球操控机器人为1000万光年外的患者手术。"延迟只有1秒，"他说。医疗网络系统群让人类在宇宙任何角落都能获得顶级医疗。',
    prompt: 'interstellar medical network system cluster, advanced healthcare facilities across galaxy, overwhelming epic scale, megastructure, remote surgery pods, hard sci-fi, medical technology, 8k',
    style_tag: '太空歌剧'
  },
  {
    name: '物质合成网络系统群',
    category: '制造巨构',
    source: 'preset',
    setting_desc: '将能量直接转化为物质的巨型合成设施网络系统群，可制造任何需要的物品。网络覆盖整个银河系，是后稀缺社会的物质基础。',
    copywriting_md: '小吴在合成网络前输入指令，一秒后一份美味的晚餐出现。"这是用能量直接合成的，"他说。合成网络系统群让物质匮乏成为历史。',
    prompt: 'matter synthesis network system cluster, converting energy directly into matter across galaxy, overwhelming epic scale, megastructure, molecular assembly visualization, hard sci-fi, post-scarcity society, 8k',
    style_tag: '硬科幻'
  },
  {
    name: '星际交通网络系统群',
    category: '交通巨构',
    source: 'preset',
    setting_desc: '银河系最大的交通中转站网络系统群，可同时处理上亿艘飞船的起降。网络建在银河各臂的枢纽点，是通往银河系各处的门户。',
    copywriting_md: '网络系统管理员老赵看着全息星图，上亿个光点代表正在进出的飞船。"每天处理50亿艘船，"他说。网络系统群是银河系最繁忙的地方。',
    prompt: 'interstellar transport network system cluster, massive transit stations across galaxy, overwhelming epic scale, megastructure, millions of ships docking, gateway to the galaxy, hard sci-fi, space traffic control, 8k',
    style_tag: '太空歌剧'
  },
  {
    name: '生态改造网络系统群',
    category: '环境巨构',
    source: 'preset',
    setting_desc: '将不宜居星球改造为宜居世界的巨型设施网络系统群，可在数百年内完成行星地球化。网络覆盖整个银河系，可同时改造上千万颗星球。',
    copywriting_md: '改造工程师苏菲看着一颗红色星球逐渐被蓝色海洋覆盖。"再过500年，这里将是新的地球，"她说。她的工作是为人类创造新的家园。',
    prompt: 'ecological transformation network system cluster, terraforming planets across galaxy, overwhelming epic scale, megastructure, atmosphere generators and ocean fillers, planet transformation, hard sci-fi, planetary engineering, 8k',
    style_tag: '太空歌剧'
  },
  {
    name: '防御护盾网络系统群',
    category: '防御巨构',
    source: 'preset',
    setting_desc: '保护人类殖民地免受各种威胁的能量护盾网络系统群，由上亿个护盾发生器组成。网络可抵挡从小行星撞击到超新星爆发的各种威胁。',
    copywriting_md: '护盾操作员小陈监控着护盾网络，确保每个殖民地都有防护。"可以抵挡任何已知威胁，"他说。护盾网络系统群让人类在危险的宇宙中安居乐业。',
    prompt: 'defense shield network system cluster, protective energy shields around colonies, overwhelming epic scale, megastructure, shield generators protecting planets, hard sci-fi, planetary defense, 8k',
    style_tag: '硬科幻'
  },
  {
    name: '星际渔场网络系统群',
    category: '资源采集',
    source: 'preset',
    setting_desc: '在气态巨行星大气层中养殖太空生物的巨型渔场网络系统群，利用行星大气中的有机物养殖可食用的太空鱼类。系统覆盖整个银河系的气态巨行星。',
    copywriting_md: '渔民老李在木星大气层中捕捞太空鱼，这些生物在高压环境中长到数十公里长。"银河渔场产量是地球海洋的10万倍，"他说。他的渔场网络系统群养活了万亿人。',
    prompt: 'interstellar fishery network system cluster, massive aquaculture in gas giant atmospheres, overwhelming epic scale, megastructure, space creatures in planetary atmospheres, hard sci-fi, space fishing, 8k',
    style_tag: '太空歌剧'
  },
  {
    name: '量子计算网络系统群',
    category: '计算巨构',
    source: 'preset',
    setting_desc: '利用量子效应进行超高速计算的巨型计算机网络系统群，计算能力超过宇宙中所有经典计算机总和。网络冷却系统延伸至银河系边缘。',
    copywriting_md: '程序员小吴"接入"量子网络，他的思维在量子态中展开。"所有可能的答案同时出现，"他描述。他的身体在地球，意识已在量子世界中工作了一周。',
    prompt: 'quantum computing network system cluster, massive quantum computing installations, overwhelming epic scale, megastructure, quantum state visualization, cooling to galactic edge, hard sci-fi, quantum technology, 8k',
    style_tag: '赛博朋克'
  },
  {
    name: '星际档案网络系统群',
    category: '文化巨构',
    source: 'preset',
    setting_desc: '保存人类所有文明成果的巨型档案网络系统群，分布在银河系各处的稳定拉格朗日点。网络存储了地球所有文明的文献、艺术、音乐。',
    copywriting_md: '档案员小林在档案网络中漫步，这里存储着人类5000年的智慧。"这份文件来自21世纪的互联网，"她指着一个数据晶体。她的职责是确保文明的记忆永不消失。',
    prompt: 'interstellar archive network system cluster, massive repositories of human civilization across galaxy, overwhelming epic scale, megastructure, data crystals storing all knowledge, hard sci-fi, cultural preservation, 8k',
    style_tag: '太空歌剧'
  },
  {
    name: '物质重组网络系统群',
    category: '制造巨构',
    source: 'preset',
    setting_desc: '在原子层面重组物质结构的巨型制造设施网络系统群，可将任何废料转化为所需材料。网络覆盖整个银河系，日产量超过整个宇宙的工业产出。',
    copywriting_md: '工程师老李将一吨核废料送入重组网络，另一端输出了高纯度黄金。"原子只是重新排列，"他解释。重组网络系统群已经将宇宙的废料全部转化为有用材料。',
    prompt: 'matter reconfiguration network system cluster, atomic-level matter restructuring across galaxy, overwhelming epic scale, megastructure, waste transforming into valuable materials, hard sci-fi, nanotechnology, 8k',
    style_tag: '硬科幻'
  },
  {
    name: '星际定位网络系统群',
    category: '导航巨构',
    source: 'preset',
    setting_desc: '为银河系内航行提供精确定位的巨型导航网络系统群，由10万亿个量子信标组成。定位网络可精确到飞米级定位银河系内任何位置。',
    copywriting_md: '导航员小陈校准着信标网络，确保每艘飞船都能精确定位。"误差小于1飞米，"他说，"即使在10万光年外。"他的工作是为星际航行提供"GPS"服务。',
    prompt: 'interstellar positioning network system cluster, 10 trillion quantum beacons across galaxy, overwhelming epic scale, megastructure, precise positioning visualization, hard sci-fi, galactic GPS, 8k',
    style_tag: '硬科幻'
  },
  {
    name: '能量储存网络系统群',
    category: '能源巨构',
    source: 'preset',
    setting_desc: '储存巨量能量的环形设施网络系统群，每个环直径100万公里，可储存相当于一颗恒星输出100万年的能量。网络是星际文明的能量银行。',
    copywriting_md: '工程师老赵监控着储存网络的能量水平，这里储存的能量够银河系使用一亿年。"这是文明的「存款」，"他说。储存网络系统群收集了数千年的多余能量。',
    prompt: 'energy storage network system cluster, massive circular facilities storing stellar energy, overwhelming epic scale, megastructure, energy containment visualization, hard sci-fi, energy banking, 8k',
    style_tag: '硬科幻'
  },
  {
    name: '星际学院网络系统群',
    category: '文化巨构',
    source: 'preset',
    setting_desc: '培养星际时代顶尖人才的巨型教育机构网络系统群，分布在银河系各处，可容纳10亿学生。网络拥有模拟各种极端环境的训练设施。',
    copywriting_md: '学生小林在黑洞模拟区训练，这里的引力环境模拟黑洞边缘。"毕业后我要去银河中心探险，"她说。学院网络系统群已经培养了上亿星际精英。',
    prompt: 'interstellar academy network system cluster, massive educational facilities across galaxy, overwhelming epic scale, megastructure, students training in extreme environments, hard sci-fi, future education, 8k',
    style_tag: '太空歌剧'
  },
  {
    name: '物质传输系统网络群',
    category: '交通巨构',
    source: 'preset',
    setting_desc: '实现银河系内 instant 物质传输的站点系统网络群，通过量子扫描和重组实现 instant 传输。系统覆盖人类殖民的所有星系，让距离消失。',
    copywriting_md: '小吴走进地球传输站，一秒后出现在银河边缘的殖民地。"感觉像做梦，"他说。传输系统网络群让人类在银河系内 instant 移动。',
    prompt: 'matter transmission system network cluster, quantum teleportation across galaxy, overwhelming epic scale, megastructure, instant transportation visualization, hard sci-fi, futuristic transport, 8k',
    style_tag: '赛博朋克'
  },
  {
    name: '能量转换网络系统群',
    category: '能源巨构',
    source: 'preset',
    setting_desc: '将各种形式的能量相互转换的巨型设施网络系统群，可将物质100%转化为能量，也可将能量转化为物质。网络是能源技术的终极形态。',
    copywriting_md: '工程师苏菲看着一克物质完全转化为能量，释放的能量相当于一颗恒星。"E=mc²的完美诠释，"她说。转换网络系统群让人类掌握了物质与能量的奥秘。',
    prompt: 'energy conversion network system cluster, converting matter to energy and vice versa, overwhelming epic scale, megastructure, mass-energy equivalence visualization, hard sci-fi, ultimate energy technology, 8k',
    style_tag: '硬科幻'
  },
  {
    name: '星际医疗综合体系统群',
    category: '医疗巨构',
    source: 'preset',
    setting_desc: '为整个银河系提供顶级医疗服务的巨型综合体系统群，可容纳10亿患者。综合体拥有意识上传、身体克隆、基因修复等技术。',
    copywriting_md: '医生老李刚完成一例意识上传手术，患者的意识已转移到新的克隆身体。"死亡已成为可选，"他说。医疗综合体系统群让人类实现了生物学上的永生。',
    prompt: 'interstellar medical complex system cluster, advanced healthcare facility serving the galaxy, overwhelming epic scale, megastructure, consciousness transfer pods, hard sci-fi, medical immortality, 8k',
    style_tag: '太空歌剧'
  },
  {
    name: '物质打印网络系统群',
    category: '制造巨构',
    source: 'preset',
    setting_desc: '在原子层面打印任何物体的巨型3D打印设施网络系统群，可制造从食物到飞船的任何东西。网络覆盖整个银河系，是后稀缺社会的核心。',
    copywriting_md: '小吴在打印网络前输入设计图，一小时后一艘星际飞船出现。"这是用原子打印的，"他说。打印网络系统群让制造变得像下载文件一样简单。',
    prompt: 'matter printing network system cluster, atomic-level 3D printing across galaxy, overwhelming epic scale, megastructure, molecular assembly visualization, hard sci-fi, post-scarcity manufacturing, 8k',
    style_tag: '硬科幻'
  },
  {
    name: '星际货运网络系统群',
    category: '交通巨构',
    source: 'preset',
    setting_desc: '银河系最大的货运港口网络系统群，可同时处理上亿艘货船的装卸。网络建在银河各臂的枢纽点，是星际贸易的枢纽。',
    copywriting_md: '码头工人老赵指挥着货船装卸，每天处理数百万吨货物。"这些货物来自银河系各地，"他说。港口网络系统群是银河系最繁忙的地方。',
    prompt: 'interstellar cargo network system cluster, massive freight harbors across galaxy, overwhelming epic scale, megastructure, millions of cargo ships, hard sci-fi, space trade hub, 8k',
    style_tag: '太空歌剧'
  },
  {
    name: '生态恢复网络系统群',
    category: '环境巨构',
    source: 'preset',
    setting_desc: '修复被破坏的行星生态的巨型设施网络系统群，可在数十年内将死寂星球变为宜居世界。网络覆盖整个银河系，可同时恢复上千万颗星球。',
    copywriting_md: '生态学家苏菲看着火星的大气逐渐变厚。"再过100年，这里可以呼吸，"她说。她的工作是让死去的星球复活，为人类创造新的家园。',
    prompt: 'ecological restoration network system cluster, terraforming dead planets across galaxy, overwhelming epic scale, megastructure, atmosphere generation, planet transformation, hard sci-fi, planetary engineering, 8k',
    style_tag: '太空歌剧'
  },
  {
    name: '能量护盾网络系统群',
    category: '防御巨构',
    source: 'preset',
    setting_desc: '保护整个银河系的能量护盾网络系统群，由上亿个护盾发生器组成，可抵挡星系级别的威胁。护盾网络是文明安全的最终保障。',
    copywriting_md: '护盾操作员小陈监控着护盾网络，确保每个节点正常运行。"可以抵挡银河系级别的灾难，"他说。护盾网络系统群让人类文明在宇宙中安然无恙。',
    prompt: 'energy shield network system cluster, galaxy-wide protective force fields, overwhelming epic scale, megastructure, shield generators across galaxy, hard sci-fi, galactic defense, 8k',
    style_tag: '硬科幻'
  },
  {
    name: '星际牧场网络系统群',
    category: '资源采集',
    source: 'preset',
    setting_desc: '在小行星带上建立的巨型畜牧业基地网络系统群，利用改造后的小行星作为牧场。网络覆盖整个银河系的小行星带，为银河系提供肉类和奶制品。',
    copywriting_md: '牧民老李在低重力小行星上放牧着转基因牛，这些动物在太空环境中长得比地球大10000倍。"银河牧场产量是地球的100万倍，"他说。他的牧场网络系统群养活了万亿人。',
    prompt: 'interstellar ranch network system cluster, massive livestock facilities on asteroids, overwhelming epic scale, megastructure, animals grazing on modified asteroids, low gravity farming, hard sci-fi, space agriculture, 8k',
    style_tag: '太空歌剧'
  },
  {
    name: '量子通信网络系统群',
    category: '通信巨构',
    source: 'preset',
    setting_desc: '利用量子纠缠实现超光速通信的巨型网络系统群，由上万亿个量子中继站组成。通信网络覆盖整个银河系，实现实时跨星系交流。',
    copywriting_md: '通信员小赵监控着量子网络流量，每秒有 YB 级数据穿越数十万光年。"银河边缘殖民地发来视频，"AI说。她接通后，看到了10万光年外的同事。',
    prompt: 'quantum communication network system cluster, faster-than-light communication via quantum entanglement, overwhelming epic scale, megastructure, data streams across galaxy, hard sci-fi, interstellar internet, 8k',
    style_tag: '硬科幻'
  },
  {
    name: '星际研究网络系统群',
    category: '文化巨构',
    source: 'preset',
    setting_desc: '进行前沿科学研究的巨型研究机构网络系统群，建在银河系各处的极端环境中，可容纳10亿科学家。网络拥有各种极端环境模拟设施。',
    copywriting_md: '研究员苏菲在黑洞模拟区工作，这里的引力环境模拟银河中心黑洞。"我们可能发现新的物理定律，"她说。研究网络系统群汇集了人类最聪明的头脑。',
    prompt: 'interstellar research network system cluster, massive scientific facilities across galaxy, overwhelming epic scale, megastructure, extreme environment simulations, hard sci-fi, scientific discovery, 8k',
    style_tag: '硬科幻'
  },
  {
    name: '能量传输系统网络群',
    category: '能源巨构',
    source: 'preset',
    setting_desc: '通过微波在银河系内无线传输能量的巨型系统网络群，将能量从生产地传输到消费地。系统覆盖整个银河系，让能量成为真正的"免费"资源。',
    copywriting_md: '工程师老赵调整着传输系统，将能量从银河中心传输到边缘殖民地。"这束能量将穿越10万光年，"他说。接收站将把微波转化为电能。',
    prompt: 'energy transmission system network cluster, wireless power transfer across galaxy via microwaves, overwhelming epic scale, megastructure, energy beams crossing galactic space, hard sci-fi, wireless energy, 8k',
    style_tag: '硬科幻'
  },
  {
    name: '时间研究网络系统群',
    category: '物理巨构',
    source: 'preset',
    setting_desc: '研究时间操控的实验设施网络系统群，利用银河系各处黑洞的极端时间膨胀效应进行实验。网络建在多个超大质量黑洞轨道上。',
    copywriting_md: '物理学家苏菲在研究网络工作了一年，外界已过去100万年。"这里的时间流速不同，"她说。她的研究可能让人类掌握时间旅行的秘密。',
    prompt: 'time research network system cluster orbiting supermassive black holes, studying time manipulation, overwhelming epic scale, megastructure, time distortion visualization, hard sci-fi, temporal physics, 8k',
    style_tag: '硬科幻'
  },
  {
    name: '星际医疗系统网络群',
    category: '医疗巨构',
    source: 'preset',
    setting_desc: '为整个银河系提供医疗服务的巨型设施系统网络群，可容纳100亿患者。系统拥有最先进的医疗技术，包括意识上传、身体克隆、基因修复等。',
    copywriting_md: '医生老李刚完成一例远程手术，他在地球操控机器人为1亿光年外的患者手术。"延迟只有1秒，"他说。医疗系统网络群让人类在宇宙任何角落都能获得顶级医疗。',
    prompt: 'interstellar medical system network cluster, advanced healthcare facilities across galaxy, overwhelming epic scale, megastructure, remote surgery pods, hard sci-fi, medical technology, 8k',
    style_tag: '太空歌剧'
  },
  {
    name: '物质合成系统网络群',
    category: '制造巨构',
    source: 'preset',
    setting_desc: '将能量直接转化为物质的巨型合成设施系统网络群，可制造任何需要的物品。系统覆盖整个银河系，是后稀缺社会的物质基础。',
    copywriting_md: '小吴在合成系统前输入指令，一秒后一份美味的晚餐出现。"这是用能量直接合成的，"他说。合成系统网络群让物质匮乏成为历史。',
    prompt: 'matter synthesis system network cluster, converting energy directly into matter across galaxy, overwhelming epic scale, megastructure, molecular assembly visualization, hard sci-fi, post-scarcity society, 8k',
    style_tag: '硬科幻'
  },
  {
    name: '星际交通系统网络群',
    category: '交通巨构',
    source: 'preset',
    setting_desc: '银河系最大的交通中转站系统网络群，可同时处理上亿艘飞船的起降。系统建在银河各臂的枢纽点，是通往银河系各处的门户。',
    copywriting_md: '系统网络管理员老赵看着全息星图，上亿个光点代表正在进出的飞船。"每天处理50亿艘船，"他说。系统网络群是银河系最繁忙的地方。',
    prompt: 'interstellar transport system network cluster, massive transit stations across galaxy, overwhelming epic scale, megastructure, millions of ships docking, gateway to the galaxy, hard sci-fi, space traffic control, 8k',
    style_tag: '太空歌剧'
  },
  {
    name: '生态改造系统网络群',
    category: '环境巨构',
    source: 'preset',
    setting_desc: '将不宜居星球改造为宜居世界的巨型设施系统网络群，可在数百年内完成行星地球化。系统覆盖整个银河系，可同时改造上亿颗星球。',
    copywriting_md: '改造工程师苏菲看着一颗红色星球逐渐被蓝色海洋覆盖。"再过500年，这里将是新的地球，"她说。她的工作是为人类创造新的家园。',
    prompt: 'ecological transformation system network cluster, terraforming planets across galaxy, overwhelming epic scale, megastructure, atmosphere generators and ocean fillers, planet transformation, hard sci-fi, planetary engineering, 8k',
    style_tag: '太空歌剧'
  },
  {
    name: '防御护盾系统网络群',
    category: '防御巨构',
    source: 'preset',
    setting_desc: '保护人类殖民地免受各种威胁的能量护盾系统网络群，由上亿个护盾发生器组成。系统可抵挡从小行星撞击到超新星爆发的各种威胁。',
    copywriting_md: '护盾操作员小陈监控着护盾系统，确保每个殖民地都有防护。"可以抵挡任何已知威胁，"他说。护盾系统网络群让人类在危险的宇宙中安居乐业。',
    prompt: 'defense shield system network cluster, protective energy shields around colonies, overwhelming epic scale, megastructure, shield generators protecting planets, hard sci-fi, planetary defense, 8k',
    style_tag: '硬科幻'
  },
  {
    name: '星际渔场系统网络群',
    category: '资源采集',
    source: 'preset',
    setting_desc: '在气态巨行星大气层中养殖太空生物的巨型渔场系统网络群，利用行星大气中的有机物养殖可食用的太空鱼类。网络覆盖整个银河系的气态巨行星。',
    copywriting_md: '渔民老李在木星大气层中捕捞太空鱼，这些生物在高压环境中长到数百公里长。"银河渔场产量是地球海洋的100万倍，"他说。他的渔场系统网络群养活了万亿人。',
    prompt: 'interstellar fishery system network cluster, massive aquaculture in gas giant atmospheres, overwhelming epic scale, megastructure, space creatures in planetary atmospheres, hard sci-fi, space fishing, 8k',
    style_tag: '太空歌剧'
  },
  {
    name: '量子计算系统网络群',
    category: '计算巨构',
    source: 'preset',
    setting_desc: '利用量子效应进行超高速计算的巨型计算机系统网络群，计算能力超过宇宙中所有经典计算机总和。系统冷却系统延伸至银河系边缘。',
    copywriting_md: '程序员小吴"接入"量子系统，他的思维在量子态中展开。"所有可能的答案同时出现，"他描述。他的身体在地球，意识已在量子世界中工作了一周。',
    prompt: 'quantum computing system network cluster, massive quantum computing installations, overwhelming epic scale, megastructure, quantum state visualization, cooling to galactic edge, hard sci-fi, quantum technology, 8k',
    style_tag: '赛博朋克'
  },
  {
    name: '星际档案系统网络群',
    category: '文化巨构',
    source: 'preset',
    setting_desc: '保存人类所有文明成果的巨型档案系统网络群，分布在银河系各处的稳定拉格朗日点。系统存储了地球所有文明的文献、艺术、音乐。',
    copywriting_md: '档案员小林在档案系统中漫步，这里存储着人类5000年的智慧。"这份文件来自21世纪的互联网，"她指着一个数据晶体。她的职责是确保文明的记忆永不消失。',
    prompt: 'interstellar archive system network cluster, massive repositories of human civilization across galaxy, overwhelming epic scale, megastructure, data crystals storing all knowledge, hard sci-fi, cultural preservation, 8k',
    style_tag: '太空歌剧'
  },
  {
    name: '物质重组系统网络群',
    category: '制造巨构',
    source: 'preset',
    setting_desc: '在原子层面重组物质结构的巨型制造设施系统网络群，可将任何废料转化为所需材料。系统覆盖整个银河系，日产量超过整个宇宙的工业产出。',
    copywriting_md: '工程师老李将一吨核废料送入重组系统，另一端输出了高纯度黄金。"原子只是重新排列，"他解释。重组系统网络群已经将宇宙的废料全部转化为有用材料。',
    prompt: 'matter reconfiguration system network cluster, atomic-level matter restructuring across galaxy, overwhelming epic scale, megastructure, waste transforming into valuable materials, hard sci-fi, nanotechnology, 8k',
    style_tag: '硬科幻'
  },
  {
    name: '星际定位系统网络群',
    category: '导航巨构',
    source: 'preset',
    setting_desc: '为银河系内航行提供精确定位的巨型导航系统网络群，由100万亿个量子信标组成。定位系统可精确到阿米级定位银河系内任何位置。',
    copywriting_md: '导航员小陈校准着信标系统，确保每艘飞船都能精确定位。"误差小于1阿米，"他说，"即使在10万光年外。"他的工作是为星际航行提供"GPS"服务。',
    prompt: 'interstellar positioning system network cluster, 100 trillion quantum beacons across galaxy, overwhelming epic scale, megastructure, precise positioning visualization, hard sci-fi, galactic GPS, 8k',
    style_tag: '硬科幻'
  },
  {
    name: '能量储存系统网络群',
    category: '能源巨构',
    source: 'preset',
    setting_desc: '储存巨量能量的环形设施系统网络群，每个环直径1000万公里，可储存相当于一颗恒星输出1000万年的能量。系统是星际文明的能量银行。',
    copywriting_md: '工程师老赵监控着储存系统的能量水平，这里储存的能量够银河系使用一亿年。"这是文明的「存款」，"他说。储存系统网络群收集了数千年的多余能量。',
    prompt: 'energy storage system network cluster, massive circular facilities storing stellar energy, overwhelming epic scale, megastructure, energy containment visualization, hard sci-fi, energy banking, 8k',
    style_tag: '硬科幻'
  },
  {
    name: '星际学院系统网络群',
    category: '文化巨构',
    source: 'preset',
    setting_desc: '培养星际时代顶尖人才的巨型教育机构系统网络群，分布在银河系各处，可容纳100亿学生。系统拥有模拟各种极端环境的训练设施。',
    copywriting_md: '学生小林在黑洞模拟区训练，这里的引力环境模拟黑洞边缘。"毕业后我要去银河中心探险，"她说。学院系统网络群已经培养了上亿星际精英。',
    prompt: 'interstellar academy system network cluster, massive educational facilities across galaxy, overwhelming epic scale, megastructure, students training in extreme environments, hard sci-fi, future education, 8k',
    style_tag: '太空歌剧'
  }
];
