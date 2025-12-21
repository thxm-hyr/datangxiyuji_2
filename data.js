// 《大唐西域记》国家地理数据
const countriesData = [
    {
        id: 1,
        name: '阿耆尼国',
        modernName: '焉耆回族自治县',
        country: '中国',
        lat: 42.06,
        lng: 86.57,
        description: '玄奘西行离开唐朝疆域后到达的第一个国家',
        modernLocation: '古阿耆尼国，即今中国新疆维吾尔自治区焉耆回族自治县一带',
        images: ['1.古阿耆尼国——博格达沁古城遗址.webp', '1.古阿耆尼国——七个星佛寺遗址.webp']
    },
    {
        id: 2,
        name: '屈支国',
        modernName: '库车市',
        country: '中国',
        lat: 41.72,
        lng: 82.94,
        description: '西域大国，佛教音乐艺术发达',
        modernLocation: '古屈支国的核心区域位于今天中国新疆维吾尔自治区库车市及周边地区',
        images: ['2.古屈支国——克孜尔石窟.webp', '2.古屈支国——苏巴什佛寺遗址.webp']
    },
    {
        id: 3,
        name: '跋禄迦国',
        modernName: '阿克苏地区',
        country: '中国',
        lat: 41.28,
        lng: 80.27,
        description: '位于屈支国以西的国家',
        modernLocation: '古跋禄迦国对应今新疆阿克苏地区温宿县一带',
        images: ['3.古跋禄迦国——温宿故城遗址.webp']
    },
    {
        id: 4,
        name: '素叶水城',
        modernName: '托克马克市',
        country: '吉尔吉斯斯坦',
        lat: 42.82,
        lng: 75.30,
        description: '碎叶城，唐代重要边城',
        modernLocation: '古素叶水城遗址位于今吉尔吉斯斯坦共和国楚河州的托克马克市附近',
        images: ['4.古素叶水城——碎叶城.webp']
    },
    {
        id: 5,
        name: '呾逻私城',
        modernName: '托克马克市',
        country: '吉尔吉斯斯坦',
        lat: 42.82,
        lng: 75.30,
        description: '丝绸之路重要城市',
        modernLocation: '古呾逻私城位于今吉尔吉斯斯坦托克马克市附近',
        images: []
    },
    {
        id: 6,
        name: '白水城',
        modernName: '奇姆肯特市',
        country: '哈萨克斯坦',
        lat: 42.30,
        lng: 69.60,
        description: '丝绸之路上的重要城市',
        modernLocation: '古白水城位于今哈萨克斯坦奇姆肯特市一带',
        images: []
    },
    {
        id: 7,
        name: '恭御城',
        modernName: '突厥斯坦市',
        country: '哈萨克斯坦',
        lat: 43.30,
        lng: 68.25,
        description: '中亚古城',
        modernLocation: '古恭御城可能位于今哈萨克斯坦突厥斯坦市附近',
        images: []
    },
    {
        id: 8,
        name: '笯赤建国',
        modernName: '卡尔希市',
        country: '乌兹别克斯坦',
        lat: 38.86,
        lng: 65.79,
        description: '中亚绿洲国家',
        modernLocation: '古笯赤建国核心区域位于今乌兹别克斯坦共和国的卡什卡河州',
        images: []
    },
    {
        id: 9,
        name: '赭时国',
        modernName: '塔什干市',
        country: '乌兹别克斯坦',
        lat: 41.30,
        lng: 69.24,
        description: '石国，现代塔什干的前身',
        modernLocation: '古赭时国核心区域位于今乌兹别克斯坦共和国的塔什干州及周边',
        images: []
    },
    {
        id: 10,
        name: '飒秣建国',
        modernName: '撒马尔罕市',
        country: '乌兹别克斯坦',
        lat: 39.65,
        lng: 66.96,
        description: '康国，丝绸之路重要枢纽',
        modernLocation: '古飒秣建国即今乌兹别克斯坦撒马尔罕市',
        images: ['12.古飒秣建国——古尔-埃米尔陵墓.webp', '12.古飒秣建国——雷吉斯坦广场.webp', '12.古飒秣建国——沙赫静达陵墓群.webp']
    },
    {
        id: 11,
        name: '弭秣贺国',
        modernName: '卡塔库尔干',
        country: '乌兹别克斯坦',
        lat: 39.90,
        lng: 66.26,
        description: '米国，撒马尔罕附近小国',
        modernLocation: '古代弭秣贺国中心区域位于今乌兹别克斯坦共和国的撒马尔罕州东部',
        images: []
    },
    {
        id: 12,
        name: '劫布呾那国',
        modernName: '纳沃伊市',
        country: '乌兹别克斯坦',
        lat: 40.10,
        lng: 65.38,
        description: '曹国，中亚小国',
        modernLocation: '古劫布呾那国位于今乌兹别克斯坦纳沃伊市一带',
        images: []
    },
    {
        id: 13,
        name: '屈霜你迦国',
        modernName: '布哈拉地区',
        country: '乌兹别克斯坦',
        lat: 39.50,
        lng: 63.85,
        description: '何国，布哈拉附近国家',
        modernLocation: '古屈霜你迦国位于今乌兹别克斯坦布哈拉地区',
        images: []
    },
    {
        id: 14,
        name: '喝捍国',
        modernName: '克尔米涅',
        country: '乌兹别克斯坦',
        lat: 40.20,
        lng: 64.80,
        description: '东安国，粟特地区国家',
        modernLocation: '古喝捍国位于今乌兹别克斯坦布哈拉市东北方向的克尔米涅附近',
        images: []
    },
    {
        id: 15,
        name: '捕喝国',
        modernName: '布哈拉市',
        country: '乌兹别克斯坦',
        lat: 39.77,
        lng: 64.42,
        description: '安国，中亚重要城市',
        modernLocation: '古捕喝国即今乌兹别克斯坦布哈拉市',
        images: ['17.古捕喝国——布哈拉历史中心（1）.webp', '17.古捕喝国——布哈拉历史中心（2）.webp', '17.古捕喝国——雅克城堡.webp']
    },
    {
        id: 16,
        name: '伐地国',
        modernName: '布哈拉西部',
        country: '乌兹别克斯坦',
        lat: 39.50,
        lng: 63.00,
        description: '西安国，布哈拉以西国家',
        modernLocation: '古伐地国位于今乌兹别克斯坦共和国西南部布哈拉以西地区',
        images: []
    },
    {
        id: 17,
        name: '货利习弥伽国',
        modernName: '希瓦市',
        country: '乌兹别克斯坦',
        lat: 41.55,
        lng: 60.63,
        description: '花剌子模，阿姆河下游古国',
        modernLocation: '古代货利习弥伽国（花剌子模）的核心区域横跨今天乌兹别克斯坦和土库曼斯坦两国',
        images: ['19.古货利习弥伽国——库尼亚-乌尔根奇遗址.webp', '19.古货利习弥伽国——希瓦古城.webp']
    },
    {
        id: 18,
        name: '羯霜那国',
        modernName: '沙赫里萨布兹',
        country: '乌兹别克斯坦',
        lat: 39.05,
        lng: 66.83,
        description: '史国，撒马尔罕以南国家',
        modernLocation: '古羯霜那国位于今乌兹别克斯坦的沙赫里萨布兹（Shahrisabz）',
        images: ['20.古羯霜那国——阿克-萨莱宫遗址.webp', '20.古羯霜那国——贾汗吉尔陵墓.webp', '20.古羯霜那国——科克-古姆巴兹清真寺.webp', '20.古羯霜那国——沙赫里萨布兹历史中心（1）.webp', '20.古羯霜那国——沙赫里萨布兹历史中心（2）.webp']
    },
    {
        id: 19,
        name: '睹货逻国',
        modernName: '阿富汗北部',
        country: '阿富汗',
        lat: 37.00,
        lng: 66.50,
        description: '吐火罗，中亚古国',
        modernLocation: '古睹货逻国位于今阿富汗共和国北部地区',
        images: ['21.古睹货逻国——法雅兹特佩佛教遗址.jpg', '21.古睹货逻国——铁门关遗址.webp']
    },
    {
        id: 20,
        name: '呾蜜国',
        modernName: '铁尔梅兹市',
        country: '阿富汗',
        lat: 37.22,
        lng: 67.27,
        description: '阿姆河北岸重要城市',
        modernLocation: '古呾蜜国位于今乌兹别克斯坦边境城市铁尔梅兹及其周边的考古区',
        images: ['22.古呾蜜国——卡拉特佩（Kara Tepe）佛教寺院遗址（1）.jpg', '22.古呾蜜国——卡拉特佩（Kara Tepe）佛教寺院遗址（2）.jpg']
    },
    {
        id: 21,
        name: '赤鄂衍那国',
        modernName: '德瑙市',
        country: '塔吉克斯坦',
        lat: 38.33,
        lng: 69.03,
        description: '石汗那，中亚小国',
        modernLocation: '古赤鄂衍那国位于今乌兹别克斯坦最南端的苏尔汉河州东南部',
        images: []
    },
    {
        id: 22,
        name: '忽露摩国',
        modernName: '苏尔汉河州',
        country: '乌兹别克斯坦',
        lat: 37.50,
        lng: 67.20,
        description: '中亚小国',
        modernLocation: '古忽露摩国位于今天乌兹别克斯坦共和国南部的苏尔汉河州西南部',
        images: []
    },
    {
        id: 23,
        name: '愉漫国',
        modernName: '朱兹詹省',
        country: '阿富汗',
        lat: 36.70,
        lng: 65.20,
        description: '中亚小国',
        modernLocation: '古愉漫国位于今天阿富汗共和国北部的朱兹詹省或法里亚布省东部',
        images: []
    },
    {
        id: 24,
        name: '鞠和衍那国',
        modernName: '巴尔赫省',
        country: '阿富汗',
        lat: 37.10,
        lng: 67.10,
        description: '中亚小国',
        modernLocation: '古鞠和衍那国位于今天阿富汗共和国北部，阿姆河南岸的平原地带',
        images: []
    },
    {
        id: 25,
        name: '镬沙国',
        modernName: '哈特隆州',
        country: '塔吉克斯坦',
        lat: 37.50,
        lng: 68.50,
        description: '中亚小国',
        modernLocation: '古镬沙国最有可能位于今天塔吉克斯坦共和国西南部的哈特隆州北部',
        images: []
    },
    {
        id: 26,
        name: '拘谜陀国',
        modernName: '塔什库尔干塔吉克自治县',
        country: '中国',
        lat: 37.77,
        lng: 75.23,
        description: '帕米尔高原山国',
        modernLocation: '古拘谜陀国位于今天的帕米尔高原',
        images: ['28.古拘迷陀国——塔什库尔干石头城.webp']
    },
    {
        id: 27,
        name: '䌸伽浪国',
        modernName: '巴尔赫省',
        country: '阿富汗',
        lat: 36.80,
        lng: 66.80,
        description: '缚伽浪，中亚小国',
        modernLocation: '古代缚伽浪国位于今天阿富汗共和国北部，巴尔赫省与朱兹詹省交界的山区',
        images: []
    },
    {
        id: 28,
        name: '纥露悉泯健国',
        modernName: '巴尔赫省',
        country: '阿富汗',
        lat: 37.00,
        lng: 66.00,
        description: '中亚小国',
        modernLocation: '古纥露悉泯健国应位于今天阿富汗共和国的北部地区',
        images: []
    },
    {
        id: 29,
        name: '忽懔国',
        modernName: '朱兹詹省',
        country: '阿富汗',
        lat: 36.90,
        lng: 65.50,
        description: '中亚小国',
        modernLocation: '古代忽懔国最有可能位于今天阿富汗共和国北部的朱兹詹省或巴尔赫省西部',
        images: []
    },
    {
        id: 30,
        name: '缚喝国',
        modernName: '巴尔赫市',
        country: '阿富汗',
        lat: 36.75,
        lng: 66.90,
        description: '安国，中亚佛教中心',
        modernLocation: '古代缚喝国（安国）即世界历史上著名的古城巴尔赫（Balkh）',
        images: ['32.古缚喝国——巴尔赫古城的绿色清真寺.jpg']
    },
    {
        id: 31,
        name: '锐秣陀国',
        modernName: '巴尔赫省',
        country: '阿富汗',
        lat: 36.60,
        lng: 66.20,
        description: '中亚小国',
        modernLocation: '古代锐秣陀国最有可能位于今天阿富汗共和国北部的巴尔赫省或朱兹詹省的山区',
        images: []
    },
    {
        id: 32,
        name: '胡实健国',
        modernName: '巴米扬省',
        country: '阿富汗',
        lat: 35.80,
        lng: 66.00,
        description: '中亚小国',
        modernLocation: '古胡实健国位于今天阿富汗共和国中西部地区',
        images: []
    },
    {
        id: 33,
        name: '呾剌健国',
        modernName: '赫拉特市',
        country: '阿富汗',
        lat: 34.34,
        lng: 62.20,
        description: '中亚古城',
        modernLocation: '古呾剌健国位于今天阿富汗共和国西部的赫拉特省东部',
        images: ['35.古呾剌健国——赫拉特.webp']
    },
    {
        id: 34,
        name: '揭职国',
        modernName: '巴尔赫省',
        country: '阿富汗',
        lat: 36.50,
        lng: 66.50,
        description: '中亚小国',
        modernLocation: '古揭职国位于今天阿富汗共和国北部地区',
        images: ['36.古揭职国——哈达佛寺遗址.webp']
    },
    {
        id: 35,
        name: '梵衍那国',
        modernName: '巴米扬省',
        country: '阿富汗',
        lat: 34.83,
        lng: 67.82,
        description: '巴米扬，佛教艺术中心',
        modernLocation: '古代梵衍那国的核心即举世闻名的巴米扬河谷，位于今天阿富汗共和国中部的巴米扬省',
        images: ['37.梵衍那国——巴米杨山谷.webp']
    },
    {
        id: 36,
        name: '滥波国',
        modernName: '拉格曼省',
        country: '阿富汗',
        lat: 34.50,
        lng: 70.00,
        description: '迦毕试国以北的小国',
        modernLocation: '古滥波国位于今阿富汗共和国东部的拉格曼省一带',
        images: []
    },
    {
        id: 37,
        name: '迦毕试国',
        modernName: '帕尔万省',
        country: '阿富汗',
        lat: 35.00,
        lng: 69.20,
        description: '贵霜帝国夏都，丝绸之路十字路口',
        modernLocation: '古代迦毕试国的核心区域位于今阿富汗共和国东部的帕尔万省，其都城即著名的贝格拉姆遗址',
        images: ['38.古迦毕试国——贝格拉姆遗址.webp']
    },
    {
        id: 38,
        name: '那揭罗曷国',
        modernName: '贾拉拉巴德市',
        country: '阿富汗',
        lat: 34.43,
        lng: 70.45,
        description: '佛教圣地，有著名的佛影窟',
        modernLocation: '古那揭罗曷国位于今阿富汗共和国东部的楠格哈尔省，都城在贾拉拉巴德附近',
        images: []
    }
];

// 玄奘西行路线顺序
const routeOrder = [
    '阿耆尼国', '屈支国', '跋禄迦国', '素叶水城', '呾逻私城', 
    '白水城', '恭御城', '笯赤建国', '赭时国', '飒秣建国',
    '弭秣贺国', '劫布呾那国', '屈霜你迦国', '喝捍国', '捕喝国',
    '伐地国', '货利习弥伽国', '羯霜那国', '睹货逻国', '呾蜜国',
    '赤鄂衍那国', '忽露摩国', '愉漫国', '鞠和衍那国', '镬沙国',
    '拘谜陀国', '䌸伽浪国', '纥露悉泯健国', '忽懔国', '缚喝国',
    '锐秣陀国', '胡实健国', '呾剌健国', '揭职国', '梵衍那国', '滥波国', '迦毕试国', '那揭罗曷国'
];

// 按照路线排序国家数据
const sortedCountries = routeOrder.map(countryName => 
    countriesData.find(country => country.name === countryName)
).filter(Boolean);

// 检查是否有国家未找到
const missingCountries = routeOrder.filter(countryName => 
    !countriesData.find(country => country.name === countryName)
);

if (missingCountries.length > 0) {
    console.warn('以下国家在数据中未找到:', missingCountries);
}

// 导出数据
console.log(`路线顺序中有 ${routeOrder.length} 个国家`);
console.log(`数据文件中有 ${countriesData.length} 个国家`);
console.log(`成功匹配了 ${sortedCountries.length} 个国家的数据`);