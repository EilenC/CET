/**
 * Created by Ling on 5/13/15.
 */
/**
 ***************************** 通用对话框*************************
 */
(function ($) {
    var elemDialog, elemOverlay, elemContent, elemTitle,
        inited = false,
        body = document.compatMode && document.compatMode !== 'BackCompat' ?
            document.documentElement : document.body,
        cssFixed;

    function init() {
        if ($('.box-overlay').length == 0) {
            createOverlay();
            createDialog();
        }
    }

    function createOverlay() {
        if (!elemOverlay) {
            elemOverlay = $('<div class="box-overlay"></div>');
        }
        $('.dialog-cont').append(elemOverlay);
    }

    function createDialog() {
        if (!elemDialog) {
            elemDialog = $('<div class="dialog">' +
            '<div class="dialog-content"></div>' +
            '</div>');
        }

        elemContent = $('.dialog-content', elemDialog);
        $('.dialog-cont').append(elemDialog);
        elemDialog.fadeIn(300)
    }

    function open() {
        elemDialog.fadeIn();
        elemOverlay.fadeIn(function(){
            $('select').hide();
        });
    }

    function close() {
        elemDialog.fadeOut();
        if (elemOverlay)elemOverlay.fadeOut(function(){
            elemContent.empty();
            $('select').show();
        });

    }

    function setHtml(html) {
        elemContent.html(html);
    }

    var Dialog = {
        loading: function () {
            this.open("<p class='dialog-loading'></p>");
        },
        success: function (tip) {
            var successTips = tip || "操作成功!";
            this.open("<p class='dialog-success'>" + successTips + "</p>");
            setTimeout(function () {
                $.Dialog.close();
            }, parseInt(arguments[1]) || 2000)
        },
        fail: function (tip) {
            var failTips = tip || "操作失败!";
            this.open("<p class='dialog-fail'>" + failTips + "</p>");
            setTimeout(function () {
                $.Dialog.close();
            }, parseInt(arguments[1]) || 2000)
        },
        open: function (html) {
            init();
            setHtml(html);
            open();
        },
        close: close
    };

    $.extend({Dialog: Dialog});
})(jQuery);
/**
 ***************************** MAIN *************************
 */
(function ($, Vue) {
    if(!$){console.log('warning: jQuery not loaded!')}
    if(!Vue){console.log('warning: Vuejs not loaded!')}

    var schoolJSONStr = '{"青海":[63,["青海师范大学","青海民族大学","青海大学医学院","青海大学"]],"辽宁":[21,["鞍山师范学院","渤海船舶职业学院","渤海大学","朝阳师范高等专科学校","朝阳师范高等专科学校阜新校区","大连财经学院","大连大学","大连东软信息学院","大连翻译职业学院","大连枫叶职业技术学院","大连工业大学","大连工业大学艺术与信息工程学院","大连海事大学","大连海洋大学","大连海洋大学应用技术学院","大连交通大学","大连科技学院","大连理工大学","大连理工大学城市学院","大连民族学院","大连软件职业学院","大连外国语大学","大连医科大学","大连医科大学中山学院","大连艺术学院","大连职业技术学院","东北财经大学","东北财经大学营口校区","东北大学","抚顺师范高等专科学校","抚顺职业技术学院","阜新高等专科学校","海军大连舰艇学院","锦州师范高等专科学校","辽东学院","辽河石油职业技术学院","辽宁财贸学院","辽宁城市建设职业技术学院","辽宁传媒学院","辽宁大学","辽宁地质工程职业学院","辽宁对外经贸学院","辽宁工程技术大学","辽宁工程职业学院","辽宁工业大学","辽宁广告职业学院","辽宁何氏医学院","辽宁机电职业技术学院","辽宁建筑职业学院","辽宁金融职业学院","辽宁经济职业技术学院","辽宁警察学院","辽宁科技大学","辽宁科技大学营口校区","辽宁科技学院","辽宁理工职业学院","辽宁林业职业技术学院","辽宁民族师范高等专科学校","辽宁轻工职业学院","辽宁商贸职业学院","辽宁省交通高等专科学校","辽宁师范大学","辽宁师范大学海华学院","辽宁石化职业技术学院","辽宁石油化工大学","辽宁石油化工大学营口校区","辽宁水利职业学院","辽宁铁道职业技术学院","辽宁卫生职业技术学院","辽宁现代服务职业技术学院","辽宁医学院","辽宁政法职业学院","辽宁职业学院","辽宁中医药大学","辽宁中医药大学杏林学院","辽宁装备制造职业技术学院","辽阳职业技术学院","鲁迅美术学院","鲁迅美术学院大连校区","盘锦职业技术学院","沈阳北软信息职业技术学院","沈阳城市建设学院","沈阳城市学院","沈阳大学","沈阳工程学院","沈阳工学院","沈阳工业大学","沈阳航空航天大学","沈阳航空航天大学北方科技学院","沈阳航空职业技术学院","沈阳化工大学","沈阳化工大学科亚学院","沈阳建筑大学","沈阳理工大学","沈阳农业大学","沈阳炮兵学院","沈阳师范大学","沈阳体育学院","沈阳药科大学","沈阳医学院","沈阳音乐学院","沈阳职业技术学院","铁岭师范高等专科学校","铁岭卫生职业学院","武警沈阳指挥学院","营口理工学院","营口职业技术学院","中国科学院研究生院","中国刑事警察学院","中国医科大学","中国医科大学临床医药学院"]],"贵州":[52,["遵义医学院","遵义师范学院","兴义民族师范学院","铜仁学院","黔南民族职业技术学院","黔南民族医学高等专科学校","黔南民族师范学院","黔东南民族职业技术学院","六盘水师范学院","凯里学院","贵州职业技术学院","贵州师范学院","贵州师范大学","贵州商业高等专科学校","贵州理工学院","贵州交通职业技术学院","贵州航天职业技术学院","贵州工程应用技术学院","贵州电子信息职业技术学院","贵州大学","贵州财经大学","贵阳中医学院","贵阳医学院","贵阳学院","安顺学院"]],"北京":[11,["北方工业大学","北京城市学院","北京大学","北京大学医学部","北京第二外国语学院","北京电影学院","北京电子科技学院","北京服装学院","北京工商大学","北京工商大学嘉华学院","北京工业大学","北京工业大学耿丹学院","北京航空航天大学","北京化工大学","北京建筑大学","北京交通大学","北京警察学院","北京科技大学","北京理工大学","北京联合大学","北京联合大学商务学院","北京联合大学生化学学院","北京联合大学师范学院","北京联合大学应用文理学院","北京林业大学","北京农学院","北京青年政治学院","北京师范大学","北京石油化工学院","北京体育大学","北京外国语大学","北京舞蹈学院","北京物资学院","北京协和医学院","北京信息科技大学","北京印刷学院","北京邮电大学","北京邮电大学世纪学院","北京语言大学","北京中医药大学","对外经济贸易大学","防化学院","国际关系学院","华北电力大学","清华大学","首都经济贸易大学","首都师范大学","首都师范大学科德学院","首都体育学院","首都医科大学","外交学院","武警警种学院","武警特种警察学院","中国传媒大学","中国地质大学","中国矿业大学（北京）","中国劳动关系学院","中国农业大学","中国青年政治学院","中国人民大学","中国人民公安大学","中国石油大学（北京）","中国戏曲学院","中国政法大学","中华女子学院","中央财经大学","中央美术学院","中央民族大学","中央戏剧学院","中央音乐学院","装备学院","装甲兵工程学院"]],"广西":[45,["玉林师范学院","右江民族医学院","梧州学院","钦州学院","南宁职业技术学院","南宁学院","南宁地区教育学院","柳州职业技术学院","柳州铁道职业技术学院","柳州师范高等专科学校","贺州学院","河池学院","桂林医学院","桂林师范高等专科学校","桂林旅游高等专科学校","桂林理工大学南宁分校","桂林理工大学博文管理学院","桂林理工大学","桂林航天工业学院","桂林电子科技大学职业技术学院","桂林电子科技大学信息科技学院","桂林电子科技大学","广西中医药大学赛恩斯新医药学院","广西中医药大学","广西职业技术学院","广西幼儿师范高等专科学校","广西英华国际职业学院","广西艺术学院","广西医科大学","广西卫生职业技术学院","广西外国语学院","广西水利电力职业技术学院","广西师范学院师园学院","广西师范学院","广西师范大学漓江学院","广西师范大学","广西生态工程职业技术学院","广西农业职业技术学院","广西民族师范学院","广西民族大学相思湖学院","广西民族大学","广西科技大学鹿山学院","广西科技大学","广西经贸职业技术学院","广西经济管理干部学院","广西教育学院","广西交通职业技术学院","广西建设职业技术学院","广西机电职业技术学院","广西国际商务职业技术学院","广西工业职业技术学院","广西大学行健文理学院","广西财经学院","北京航空航天大学北海学院","北海职业学院","百色学院"]],"广东":[44,["暨南大学","遵义医学院珠海校区","自然地理与资源环境专业（自然地理方向）","自然地理与资源环境专业(资源环境方向)","自动化类","自动化","资源环境与城乡规划管理(经济地理与城乡区","资源环境与城乡规划管理(城市水资源与环境)","资讯管理学院","仲恺农业工程学院","肿瘤学","肿瘤防治中心","中英翻译","中医学","中药学","中山职业技术学院","中山医学院","中山眼科中心","中山大学新华学院","中山大学南方学院","中山大学博雅学院","中葡翻譯","中葡翻译","中国哲学","中国语言文学系","中国古典文献学","中共广东省委党校","中法核工程与技术学院","政治与公共事务管理学院","哲学系","哲学(博雅)","哲学","肇庆医学高等专科学校","肇庆学院","预防医学","有机化学","应用心理学","应用气象学","应用经济","应用化学","艺术学－艺术设计","艺术(艺术设计专业)","移动信息工程学院","医学检验","药学院","药学","药剂学","阳江职业技术学院","亚太研究院","学士学位","行政管理(国防生)","行政管理","星海音乐学院","信息与计算科学","信息显示与光电技术","信息科学与技术学院","信息管理与信息系统","信息安全（国防生）","信息安全","心理学系","心理学类","新闻学","新闻传播学类","新闻传播学","西班牙语","物流管理（岭南学院）","物理学","物理科学与工程技术学院","五邑大学","无线电物理","无机化学","文化遗产管理","文化产业管理","微电子学","微电子科学与工程（与香港理工大学联合培养","微电子科学与工程","网络与新媒体","网络工程","外国语学院","外国语","图书情报与档案管理类","统计学","通信与信息系统","特种作战学院","孙逸仙纪念医院","私立华联学院","顺德职业技术学院","水文与水资源工程","数学与应用数学","数学与计算科学学院","数学类","市场营销(国商)","世界史","生物医学工程","生物系统工程","生物科学类","生物科学","生物技术（生物技术及应用基地班）","生物技术","生物工程","生态学","生命科学学院","深圳职业技术学院","深圳信息职业技术学院","深圳大学","设计艺术学","设计艺术","社会学与人类学学院","社会学类","社会学","社会科学学院","社会科学教育学院","社会工作","韶关学院","汕尾职业技术学院","汕头职业技术学院","汕头大学","软件学院","软件工程（国防生）","软件工程(移动信息工程)","软件工程(通信软件)(国防生)","软件工程(数字媒体)","软件工程(嵌入式软件与系统)","软件工程(计算机应用软件)","软件工程(电子政务)","软件工程","日语","人文学院","人文地理与城乡规划","人文地理学","人力资源管理（管理学院）","人类学类","人类学","热能与动力工程","清远职业技术学院","清华大学深圳研究生院","气象学","农业昆虫与害虫防治","能源与动力工程","内科学","南华工商学院","南海资源开发与保护协同创新中心","南方医科大学","南方科技大学","民族学","茂名职业技术学院","逻辑学","罗定职业技术学院","旅游学院(澳门)","旅游学院","旅游企业管理","旅游零售及市场推广管理","旅游会展及节目管理","旅游管理类（旅游学院）","旅游管理（与美国俄克拉荷马州立大学联合培","旅游管理（国际旅游方向）","旅游管理(旅游学院)","旅游管理(管理学院)","流体力学","岭南学院","岭南师范学院","临床医学（八年制）-物","临床医学（八年制）-化","临床医学(五年制)","临床医学(八年制)-生","临床医学","历史学系","历史学","理学(信息科技)","理学","理论与应用力学","口腔医学(五年制)","口腔医学(七年制)","口腔医学","空間設計","科技学院","考古学","康复治疗学","酒店管理","经济学类（岭南学院）","经济学类（国际商学院）","经济学","金融学","金融硕士","揭阳职业技术学院","教育学院","教育学","教育硕士(现代教育技术)","交通工程","江门职业技术学院","嘉应学院","计算机类","计算机科学与技术","吉林大学珠海学院","基础心理学","会展经济与管理（与澳大利亚昆士兰大学联合","会计学(国商)","会计学","惠州学院","惠州卫生职业技术学院","惠州经济职业技术学院","环境科学与工程学院","环境科学与工程类","环境科学","环境工程","化学与化学工程学院","化学生物学","化学类","化学工程与工艺","化学（与香港理工大学联合培养）","化学","华南师范大学增城学院","华南师范大学","华南农业大学珠江学院","华南农业大学","华南理工大学广州学院","华南理工大学","护理学院","护理学","护理","河源职业技术学院","核工程与核技术（中法合作）","核工程与核技术","汉语言文学","韩山师范学院","海洋学院","海洋科学","海军陆战学院","哈工大深圳研究生院","国际政治","国际商学院","国际旅游管理","国际款待与旅游业管理","国际款待与旅游管理","国际款待及旅游业管理","国际经济与商法","国际经济与贸易（岭南学院）","国际汉语学院","国际汉语教育","国际关系","贵州民族大学","广州珠江职业技术学院","广州中医药大学","广州医科大学","广州现代信息工程职业技术学院","广州铁路职业技术学院","广州体育学院","广州松田职业学院","广州涉外经济职业技术学院","广州南洋理工职业学院","广州民航职业技术学院","广州美术学院","广州科技职业技术学院","广州科技贸易职业学院","广州康大职业技术学院","广州华夏职业学院","广州华商职业学院","广州华南商贸职业学院","广州华立科技职业学院","广州航海学院","广州广播电视大学","广州工商学院","广州工程技术职业学院","广州番禺职业技术学院","广州大学松田学院","广州大学市政技术学院","广州大学华软软件学院","广州大学纺织服装学院","广州大学","广州城市职业学院","广州城建职业学院","广西大学","广东职业技术学院","广东邮电职业技术学院","广东医学院","广东药学院","广东行政职业学院","广东新安职业技术学院","广东文艺职业学院","广东文理职业学院","广东外语艺术职业学院","广东外语外贸大学南国商学院","广东外语外贸大学","广东松山职业技术学院","广东水利电力职业技术学院","广东食品药品职业学院","广东石油化工学院高州师范学院","广东石油化工学院","广东轻工职业技术学院","广东青年职业学院","广东培正学院","广东女子职业技术学院","广东农工商职业技术学院","广东南方职业学院","广东岭南职业技术学院","广东理工职业学院","广东理工学院","广东科学技术职业学院","广东科贸职业学院","广东科技学院","广东警官学院","广东金融学院","广东交通职业技术学院","广东建设职业技术学院","广东技术师范学院天河学院","广东技术师范学院","广东机电职业技术学院","广东环境保护工程职业学院","广东海洋大学寸金学院","广东海洋大学","广东工业大学华立学院","广东工业大学","广东工商职业学院","广东工贸职业技术学院","广东东软学院","广东第二师范学院","广东创新科技职业学院","广东财经大学华商学院","广东财经大学","广东白云学院","光信息科学与技术","光华口腔医学院","光电信息科学与工程专业（信息显示与光电技","光电信息科学与工程专业（光信息科学与技术","管理学院","管理学","管理科学与工程类（岭南学院）","公共行政管理","公共卫生学院","公共卫生硕士","公共事业管理(体育事业管理)","公共管理类","公共关系学","公共关系","工学院","工商管理学院","工商管理硕士","工商管理类（国际商学院）","工商管理类（管理学院）","工商管理（市场学）","工商管理(国商)","工商管理","工程硕士(水利工程)","工程硕士(生物医学工程)","工程硕士(软件工程)","工程硕士(集成电路工程)","工程硕士(环境工程)","工程硕士(化学工程)","工程硕士(电子与通信工程)","工程热物理","高分子化学与物理","高等教育学","附属第一医院（第一临床学院）","附属第五医院（珠海医院）（第五临床学院）","附属第三医院（第三临床学院）","附属第六医院","佛山职业技术学院","佛山科学技术学院","翻译学院","法语","法医学","法学院","法学","法律","俄语","东莞职业技术学院","东莞理工学院城市学院","东莞理工学院","电子信息类","电子信息科学与技术（与香港中文大学联合培","电子信息科学与技术","电子商务（管理学院）","电子商务","电子科技大学中山学院","电脑学","地质学","地质工程","地图学与地理信息系统","地球信息科学与技术","地球科学与地质工程学院","地理信息系统(测绘工程)","地理信息系统","地理信息科学专业（遥感与地理信息系统方向","地理信息科学专业（测绘工程方向）","地理科学与规划学院","地理科学类","地理科学","德语","档案学","大气科学类","大气科学","慈善及公益管理","传播与设计学院","传播学（政务传播方向）","传播学（影像传播方向）","传播学","城乡规划","城市规划","超级计算学院","餐饮管理","材料物理","材料化学","北京师范大学珠海分校","北京师范大学-香港浸会大学联合国际学院","北京理工大学珠海学院","北京大学深圳研究生院","保密管理","澳门理工学院","澳门科技大学","澳门镜湖护理学院","澳门大学","澳门城市大学"]],"上海":[31,["第二军医大学","东华大学","复旦大学","华东理工大学","华东师范大学","华东政法大学","南京政治学院上海校区","上海邦德职业技术学院","上海财经大学","上海城市管理职业技术学院","上海出版印刷高等专科学校","上海大学","上海第二工业大学","上海电机学院","上海电力学院","上海电影艺术职业学院","上海电子信息职业技术学院","上海东海职业技术学院","上海对外经贸大学","上海工程技术大学","上海工会管理职业学院","上海工商外国语职业学院","上海工艺美术职业学院","上海海关学院","上海海事大学","上海海事职业技术学院","上海海洋大学","上海济光职业技术学院","上海健康职业技术学院","上海建峰职业技术学院","上海建桥学院","上海交通大学","上海交通大学医学院","上海交通职业技术学院","上海金融学院","上海考区四","上海科学技术职业学院","上海理工大学","上海立达职业技术学院","上海立信会计学院","上海旅游高等专科学校","上海民航职业技术学院","上海民远职业技术学院","上海农林职业技术学院","上海欧华职业技术学院","上海杉达学院","上海商学院","上海师范大学","上海师范大学天华学院","上海视觉艺术学院","上海思博职业技术学院","上海体育学院","上海体育职业学院","上海外国语大学","上海外国语大学贤达经济人文学院","上海戏剧学院","上海新侨职业技术学院","上海兴韦信息技术职业学院","上海行健职业学院","上海医疗器械高等专科学校","上海医药高等专科学校","上海音乐学院","上海应用技术学院","上海震旦职业学院","上海政法学院","上海中侨职业技术学院","上海中医药大学","同济大学","同济大学浙江学院（沪西校区）","中国美术学院上海设计学院"]],"海南":[46,["三亚学院","三亚理工职业学院","三亚航空旅游职业学院","三亚城市职业学院","琼州学院","琼台师范高等专科学校","海南职业技术学院","海南政法职业学院","海南医学院","海南外国语职业学院","海南师范大学","海南软件职业技术学院","海南科技职业学院","海南经贸职业技术学院","海南工商职业学院","海南大学","海口经济学院"]],"甘肃":[62,["西北师范大学知行学院","西北师范大学","西北民族大学","武威职业学院","天水师范学院","平凉医学高等专科学校","陇南师范高等专科学校","陇东学院","兰州资源环境职业技术学院","兰州职业技术学院","兰州文理学院","兰州外语职业学院","兰州石化职业技术学院","兰州商学院陇桥学院","兰州商学院长青学院","兰州商学院","兰州理工大学技术工程学院","兰州理工大学","兰州交通大学博文学院","兰州交通大学","兰州工业学院","兰州大学","兰州城市学院","酒泉职业技术学院","河西学院","甘肃中医学院","甘肃政法学院","甘肃有色冶金职业技术学院","甘肃农业职业技术学院","甘肃农业大学","甘肃民族师范学院","甘肃交通职业技术学院","甘肃工业职业技术学院","定西师范高等专科学校"]],"山东":[37,["滨州学院","滨州医学院","滨州医学院烟台校区","滨州职业学院","德州学院","东营职业学院","哈尔滨工业大学（威海）","哈尔滨理工大学荣成学院","海军航空工程学院","菏泽学院","菏泽医学专科学校","济南大学","济南大学泉城学院","济南幼儿师范高等专科学校","济南职业学院","济宁学院","济宁医学院","济宁医学院日照校区","聊城大学","聊城大学东昌学院","临沂大学","鲁东大学","齐鲁工业大学","齐鲁理工学院","齐鲁师范学院","青岛滨海学院","青岛大学","青岛港湾职业技术学院","青岛工学院","青岛黄海学院","青岛酒店管理职业技术学院","青岛科技大学","青岛科技大学高密校区","青岛理工大学","青岛理工大学(A)","青岛理工大学琴岛学院","青岛农业大学","青岛农业大学海都学院","青岛远洋船员职业学院","青岛职业技术学院","曲阜师范大学","曲阜师范大学日照校区","日照职业技术学院","山东财经大学","山东财经大学东方学院","山东城市建设职业学院","山东大学","山东大学（威海）","山东工商学院","山东工艺美术学院","山东管理学院","山东广播电视大学","山东建筑大学","山东交通学院","山东交通学院海运学院","山东经贸职业学院","山东警察学院","山东科技大学","山东科技大学（济南）","山东科技大学泰山科技学院","山东理工大学","山东农业大学","山东农业工程学院","山东女子学院","山东青年政治学院","山东商业职业技术学院","山东省经济管理干部学院","山东师范大学","山东水利职业学院","山东体育学院","山东体育学院日照校区","山东外国语职业学院","山东外贸职业学院","山东外事翻译职业学院（济南）","山东外事翻译职业学院（威海）","山东万杰医学院","山东现代职业学院（37028）","山东协和学院","山东医学高等专科学校","山东艺术学院","山东英才学院","山东政法学院","山东中医药大学","泰山学院","泰山医学院","威海职业(技术)学院","潍坊工程职业学院","潍坊科技学院","潍坊学院","潍坊医学院","烟台大学","烟台大学文经学院","烟台南山学院","枣庄学院","中国海洋大学","中国石油大学（华东）青岛校区","中国石油大学胜利学院","淄博师范高等专科学校","淄博职业学院"]],"江西":[36,["东华理工大学","东华理工大学南昌校区","赣南师范学院","赣南师范学院科技学院","赣南医学院","赣西科技职业学院","赣州师范高等专科学校","华东交通大学","华东交通大学理工学院","江西财经大学","江西财经职业学院","江西服装学院","江西工程学院","江西工程职业学院","江西工贸职业技术学院","江西工业工程职业技术学院","江西工业职业技术学院","江西航空职业技术学院","江西环境工程职业学院","江西交通职业技术学院","江西经济管理干部学院","江西警察学院","江西科技师范大学","江西科技师范大学理工学院","江西科技学院","江西科技职业学院","江西理工大学","江西理工大学南昌校区","江西理工大学应用科学学院","江西旅游商贸职业学院","江西农业大学","江西青年职业学院","江西生物科技职业学院","江西省农业工程职业学院","江西省直属考点","江西师范大学","江西师范大学科技学院","江西司法警官职业学院","江西外语外贸职业学院","江西先锋软件职业技术学院","江西现代职业技术学院","江西信息应用职业技术学院","江西冶金职业技术学院","江西医学高等专科学校","江西应用技术职业学院","江西应用科技学院","江西制造职业技术学院","江西中医药大学","江西中医药大学科技学院","江西中医药高等专科学校","井冈山大学","景德镇陶瓷学院","景德镇学院","九江学院","九江职业大学","九江职业技术学院","南昌大学","南昌大学抚州医学院","南昌大学科学技术学院","南昌大学医学院","南昌工程学院","南昌工学院","南昌航空大学","南昌教育学院","南昌理工学院","南昌师范高等专科学校","南昌师范学院","南昌职业学院","萍乡学院","上饶师范学院","新余学院","宜春学院","宜春职业技术学院","鹰潭职业技术学院"]],"宁夏":[64,["中国矿业大学银川学院","银川能源学院","宁夏职业技术学院","宁夏医科大学","宁夏司法警官职业学院","宁夏师范学院","宁夏民族职业技术学院","宁夏理工学院","宁夏建设职业技术学院","宁夏大学","宁夏财经职业技术学院","北方民族大学"]],"福建":[35,["福建船政交通职业学院","福建电力职业技术学院","福建对外经济贸易职业技术学院","福建对外经济贸易职业技术学院财茂校区","福建工程学院","福建华南女子职业学院","福建江夏学院","福建警察学院","福建林业职业技术学院","福建农林大学","福建农林大学安溪茶学院","福建农林大学东方学院","福建农业职业技术学院","福建商业高等专科学校","福建生物工程职业技术学院","福建省闽北职业技术学院","福建师范大学","福建师范大学福清分校","福建师范大学闽南科技学院","福建水利电力职业技术学院","福建卫生职业技术学院","福建信息职业技术学院","福建医科大学","福建幼儿师范高等专科学校","福建中医药大学","福州大学","福州大学厦门工艺美术学院","福州大学阳光学院","福州大学至诚学院","福州海峡职业技术学院","福州科技职业技术学院","福州黎明职业技术学院","福州软件职业技术学院","福州外语外贸学院","福州英华职业学院","福州职业技术学院","华侨大学","华侨大学厦门工学院","华侨大学厦门校区","集美大学","集美大学诚毅学院","黎明职业大学","龙岩学院","闽江师范高等专科学校","闽江学院","闽南理工学院","闽南师范大学","闽西职业技术学院","宁德师范学院","宁德职业技术学院","莆田学院","泉州纺织服装职业学院","泉州工艺美术职业学院","泉州海洋职业学院","泉州华光职业学院","泉州经贸职业技术学院","泉州理工职业学院","泉州轻工职业学院","泉州师范学院","泉州师范学院软件学院","泉州信息工程学院","泉州医学高等专科学校","泉州幼儿师范高等专科学校","三明学院","三明职业技术学院","武夷学院","厦门安防科技职业学院","厦门城市职业学院","厦门大学","厦门大学嘉庚学院","厦门东海职业技术学院","厦门海洋职业技术学院","厦门华天涉外职业技术学院","厦门华厦职业学院","厦门理工学院","厦门南洋职业学院","厦门软件职业技术学院","厦门兴才职业技术学院","厦门医学高等专科学校","仰恩大学","漳州城市职业学院","漳州理工职业学院","漳州卫生职业学院","漳州职业技术学院","中国科学院福建物质结构研究所","湄洲湾职业技术学院"]],"河北":[13,["白求恩医务士官学校","保定学院","保定职业技术学院","北华航天工业学院","北京交通大学海滨学院","北京中医药大学东方学院","渤海石油职业学院","泊头职业学院","沧州师范学院","沧州医学高等专科学校","沧州职业技术学院","承德护理职业学院","承德石油高等专科学校","承德医学院","东北大学秦皇岛分校","防灾科技学院","邯郸学院","邯郸职业技术学院","河北北方学院","河北传媒学院","河北大学","河北大学人民武装学院","河北工程大学","河北工程技术高专","河北工程技术学院","河北工业大学","河北工业职业技术学院","河北广播电视大学","河北机电职业技术学院","河北建筑工程学院","河北金融学院","河北经贸大学","河北科技大学","河北科技大学唐山分院","河北科技师范学院","河北科技学院","河北劳动关系学院","河北联合大学","河北联合大学秦皇岛分院","河北旅游职业学院","河北美术学院","河北民族师范学院","河北能源职业技术学院","河北农业大学","河北农业大学渤海校区","河北农业大学海洋学院","河北女子职业技术学院","河北软件职业技术学院","河北师范大学","河北司法警官职业学院","河北体育学院","河北外国语学院","河北外国语职业学院","河北医科大学","河北医科大学石油临床医学院","河北艺术职业学院","河北远东职业技术学院","河北政法职业学院","河北中医学院","衡水学院","衡水学院分院","衡水职业技术学院","华北电力大学","华北科技学院","交通运输部管理干部学院","军械工程学院","廊坊师范学院","廊坊职业技术学院","南京炮兵学院廊坊校区","秦皇岛职业技术学院","石家庄城市经济职业学院","石家庄工程职业学院","石家庄工商职业学院","石家庄机械化步兵学院","石家庄经济学院","石家庄经济学院华信学院","石家庄科技信息职业学院","石家庄人民医学高等专科学校","石家庄铁道大学","石家庄信息工程职业学院","石家庄学院","石家庄邮电职业技术学院","石家庄幼儿师范高等专科学校","石家庄职业技术学院","唐山工业职业技术学院","唐山科技职业技术学院","唐山师范学院","唐山学院","唐山职业技术学院","武警石家庄士官学校","邢台学院","邢台医学高等专科学校","邢台职业技术学院","宣化科技职业学院","燕京理工学院","燕山大学","张家口学院","张家口职业技术学院","中国地质大学长城学院","中国环境管理干部学院","中国人民武装警察部队学院","中央司法警官学院","总参谋部通信训练基地"]],"西藏":[54,["西藏大学"]],"吉林":[22,["白城师范学院","白城医学高等专科学校","北华大学","长春大学","长春工程学院","长春工业大学","长春光华学院","长春建筑学院","长春金融高等专科学校","长春科技学院","长春理工大学","长春理工大学光电信息学院","长春汽车工业高等专科学校","长春师范大学","长春医学高等专科学校","长春职业技术学院","长春中医药大学","东北电力大学","东北师范大学","东北师范大学人文学院","吉林财经大学","吉林大学","吉林电子信息职业技术学院","吉林动画学院","吉林工程技术师范学院","吉林工程职业学院","吉林工商学院","吉林工业职业技术学院","吉林华桥外国语学院","吉林化工学院","吉林建筑大学","吉林交通职业技术学院","吉林警察学院","吉林科技职业技术学院","吉林农业大学","吉林农业科技学院","吉林省教育学院","吉林省经济管理干部学院","吉林师范大学","吉林司法警官职业学院","吉林体育学院","吉林铁道职业技术学院","吉林医药学院","吉林艺术学院","空军航空大学","辽源职业技术学院","四平职业大学","通化师范学院","延边大学","装甲兵技术学院"]],"黑龙江":[23,["大庆高职高专","大庆师范学院","大兴安岭职业学院","东北林业大学","东北农业大学","东北农业大学成栋学院","东北石油大学","东北石油大学秦皇岛分校","哈尔滨高职高专","哈尔滨工程大学","哈尔滨工业大学","哈尔滨华德学院","哈尔滨剑桥学院","哈尔滨金融学院","哈尔滨科学技术职业学院","哈尔滨科研院所","哈尔滨理工大学","哈尔滨商业大学","哈尔滨师范大学","哈尔滨石油学院","哈尔滨体育学院","哈尔滨学院","哈尔滨医科大学","哈尔滨医科大学大庆校区","黑河学院","黑龙江八一农垦大学","黑龙江财经学院","黑龙江大学","黑龙江大学伊春分校","黑龙江东方学院","黑龙江工程学院","黑龙江工业学院","黑龙江广播电视大学","黑龙江建筑职业技术学院","黑龙江科技大学","黑龙江煤炭职业技术学院","黑龙江农业经济职业学院","黑龙江外国语学院","黑龙江中医药大学","佳木斯大学","牡丹江大学","牡丹江师范学院","牡丹江市高职高专考生","牡丹江医学院","齐齐哈尔大学","齐齐哈尔高职高专","齐齐哈尔医学院","绥化学院","伊春职业学院"]],"湖南":[43,["保险职业学院","常德职业技术学院","长沙电力职业技术学院","长沙航空职业技术学院","长沙环境保护职业技术学院","长沙理工大学","长沙民政职业技术学院","长沙南方职业学院","长沙商贸旅游职业技术学院","长沙师范学院","长沙学院","长沙医学院","国防科学技术大学","衡阳财经工业职业技术学院","衡阳师范学院","湖南安全技术职业学院","湖南财政经济学院","湖南城建职业技术学院","湖南城市学院","湖南大学","湖南大众传媒职业技术学院","湖南第一师范学院","湖南都市职业学院","湖南工程学院","湖南工学院","湖南工业大学","湖南工业职业技术学院","湖南环境生物职业技术学院","湖南交通工程学院","湖南交通职业技术学院","湖南警察学院","湖南科技大学","湖南科技学院","湖南科技职业学院","湖南理工学院","湖南理工职业技术学院","湖南农业大学","湖南女子学院","湖南人文科技学院","湖南商务职业技术学院","湖南商学院","湖南涉外经济学院","湖南生物机电职业技术学院","湖南师范大学","湖南铁道职业技术学院","湖南铁路科技职业技术学院","湖南外国语职业学院","湖南外贸职业学院","湖南网络工程职业学院","湖南文理学院","湖南现代物流职业技术学院","湖南信息学院","湖南信息职业技术学院","湖南医药学院","湖南邮电职业技术学院","湖南中医药大学","湖南中医药高等专科学校","怀化学院","吉首大学","娄底职业技术学院","南华大学","邵阳学院","邵阳医学高等专科学校","湘南学院","湘潭大学","湘潭职业技术学院","永州职业技术学院","岳阳职业技术学院","张家界航空工业职业技术学院","中南大学","中南林业科技大学"]],"天津":[12,["北京科技大学天津学院","海军工程大学勤务学院","军事交通学院","南开大学","南开大学滨海学院","天津滨海职业学院","天津渤海职业技术学院","天津财经大学","天津财经大学珠江学院","天津城建大学","天津城市建设管理职业技术学院","天津城市职业学院","天津大学","天津大学仁爱学院","天津电子信息职业技术学院","天津工程职业技术学院","天津工业大学","天津公安警官职业学院","天津广播电视大学","天津广播影视职业学院","天津国土资源和房屋职业学院","天津海运职业学院","天津机电职业技术学院","天津交通职业学院","天津开发区职业技术学院","天津科技大学","天津理工大学","天津理工大学中环信息学院","天津美术学院","天津农学院","天津青年职业学院","天津轻工职业技术学院","天津商务职业学院","天津商业大学","天津商业大学宝德学院","天津生物工程职业技术学院","天津师范大学","天津师范大学津沽学院","天津石油职业技术学院","天津体育学院","天津体育学院运动与文化艺术学院","天津天狮学院","天津铁道职业技术学院","天津外国语大学","天津外国语大学滨海外事学院","天津现代职业技术学院","天津冶金职业技术学院","天津医科大学","天津医科大学临床医学院","天津医学高等专科学校","天津音乐学院","天津职业大学","天津职业技术师范大学","天津中德职业技术学院","天津中医药大学","武警后勤学院","武警指挥学院","中国民航大学"]],"内蒙古":[15,["赤峰学院","河套学院","呼和浩特民族学院","呼和浩特职业学院","呼伦贝尔学院","集宁师范学院","内蒙古财经大学","内蒙古大学","内蒙古电子信息职业技术学院","内蒙古工业大学","内蒙古建筑职业技术学院","内蒙古科技大学","内蒙古科技大学包头师范学院","内蒙古科技大学包头医学院","内蒙古民族大学","内蒙古农业大学","内蒙古师范大学","内蒙古师范大学鸿德学院","内蒙古医科大学"]],"安徽":[34,["安徽财经大学","安徽财贸职业学院","安徽城市管理职业学院","安徽大学","安徽大学江淮学院","安徽电气工程职业技术学院","安徽电子信息职业技术学院","安徽工程大学","安徽工贸职业技术学院","安徽工商职业学院","安徽工业大学","安徽工业大学工商学院","安徽工业经济职业技术学院","安徽工业职业技术学院","安徽广播影视职业技术学院","安徽国防科技职业学院","安徽国际商务职业学院","安徽机电职业技术学院","安徽建筑大学","安徽交通职业技术学院","安徽经济管理干部学院","安徽警官职业学院","安徽科技学院","安徽理工大学","安徽林业职业技术学院","安徽旅游职业学院","安徽绿海商务职业学院","安徽农业大学","安徽农业大学经济技术学院","安徽汽车职业技术学院","安徽三联学院","安徽商贸职业技术学院","安徽涉外经济职业学院","安徽审计职业学院","安徽师范大学","安徽水利水电职业技术学院","安徽外国语学院","安徽文达信息工程学院","安徽新华学院","安徽新闻出版职业技术学院","安徽冶金科技职业学院","安徽医科大学","安徽医学高等专科学校","安徽邮电职业技术学院","安徽职业技术学院","安徽中澳科技职业学院","安徽中医药大学","安徽中医药高等专科学校","安庆师范学院","安庆医药高等专科学校","安庆职业技术学院","蚌埠经济技术职业学院","蚌埠汽车士官学校","蚌埠学院","蚌埠医学院","巢湖学院","池州学院","池州职业技术学院","滁州学院","滁州职业技术学院","阜阳师范学院","阜阳职业技术学院","合肥滨湖职业技术学院","合肥财经职业学院","合肥工业大学","合肥共达职业技术学院","合肥经济技术职业学院","合肥师范学院","合肥通用职业技术学院","合肥信息技术职业学院","合肥学院","合肥幼儿师范高等专科学校","合肥职业技术学院","河海大学文天学院","淮北师范大学","淮北职业技术学院","淮南联合大学","淮南师范学院","淮南职业技术学院","黄山学院","徽商职业学院","解放军电子工程学院","解放军陆军军官学院","六安职业技术学院","马鞍山师范高等专科学校","马鞍山职业技术学院","宿州学院","桐城师范高等专科学校","铜陵学院","铜陵职业技术学院","皖南医学院","皖西卫生职业学院","皖西学院","万博科技职业学院","芜湖职业技术学院","宣城职业技术学院","中国科学技术大学苏州研究院","中国人民解放军装甲兵学院","亳州师范高等专科学校","亳州职业技术学院"]],"陕西":[61,["榆林学院","杨凌职业技术学院","延安大学","咸阳师范学院","西京学院","西藏民族学院","西北政法大学","西北农林科技大学","西北工业大学","西北大学","西安邮电大学","西安医学院","西安文理学院","西安外事学院","西安外国语大学","西安通信学院","西安体育学院","西安思源学院","西安石油大学","西安培华学院","西安欧亚学院","西安美术学院","西安理工大学","西安建筑科技大学","西安航空职业技术学院","西安航空学院","西安工业大学","西安工程大学","西安翻译学院","西安电子科技大学","西安电力高等专科学校","西安财经学院","武警工程大学","渭南师范学院","商洛学院","陕西中医学院","陕西师范大学","陕西理工学院","陕西科技大学","陕西警官职业学院","陕西国际商贸学院","陕西工业职业技术学院","陕西服装工程学院","空军工程大学","第四军医大学","第二炮兵工程大学","长安大学","宝鸡文理学院","安康学院"]],"山西":[14,["长治学院","长治医学院","晋中学院","吕梁学院","山西财经大学","山西财政税务专科学校","山西传媒学院","山西大同大学","山西大学","山西大学商务学院","山西工程职业技术学院","山西工商学院","山西警官高等专科学校","山西农业大学","山西农业大学信息学院","山西师范大学","山西医科大学","山西医科大学汾阳学院","山西中医学院","太原大学外语师范学院","太原工业学院","太原科技大学","太原理工大学","太原理工大学阳泉学院","太原师范学院","太原学院","忻州师范学院","运城学院","中北大学"]],"新疆":[65,["伊犁师范学院","新疆职业大学","新疆应用职业技术学院","新疆艺术学院","新疆医科大学","新疆天山职业技术学院","新疆师范大学","新疆轻工职业技术学院","新疆农业职业技术学院","新疆农业大学","新疆教育学院","新疆工程学院","新疆大学","新疆财经大学","武警乌鲁木齐指挥学院","乌鲁木齐职业大学","塔里木大学","石河子大学商学院","石河子大学","克拉玛依电大","喀什师范学院","昌吉学院"]],"四川":[51,["泸州职业技术学院","泸州医学院","中国民用航空飞行学院","宜宾职业技术学院","宜宾学院","雅安职业技术学院","西南石油大学","西南民族大学","西南科技大学城市学院","西南科技大学","西南交通大学希望学院","西南交通大学","西南财经大学天府学院","西南财经大学","西华师范大学","西华大学","西昌学院","武警警官学院","四川中医药高等专科学校","四川职业技术学院","四川音乐学院绵阳艺术学院","四川音乐学院","四川文理学院","四川文化产业职业学院","四川外国语大学成都学院","四川托普信息技术职业学院","四川天一学院","四川水利职业技术学院","四川师范大学文理学院","四川师范大学成都学院","四川师范大学","四川商务职业学院","四川农业大学","四川民族学院","四川旅游学院","四川理工学院","四川科技职业学院","四川警察学院","四川交通职业技术学院","四川建筑职业技术学院","四川化工职业技术学院","四川航天职业技术学院","四川国际标榜职业学院","四川工业管理职业学院","四川工商职业技术学院","四川工程职业技术学院","四川电力职业技术学院","四川大学锦江学院","四川大学锦城学院","四川大学","四川传媒学院","四川城市职业学院","四川长江职业学院","四川财经职业学院","攀枝花学院","内江职业技术学院","内江师范学院","南充职业技术学院","绵阳职业技术学院","绵阳师范学院","眉山职业技术学院","乐山职业技术学院","乐山师范学院","电子科技大学成都学院","电子科技大学","达州职业技术学院","川北医学院","成都中医药大学","成都职业技术学院","成都医学院","成都学院","成都信息工程学院银杏酒店管理学院","成都信息工程学院","成都体育学院","成都师范学院","成都农业科技职业学院","成都理工大学工程技术学院","成都理工大学","成都航空职业技术学院","成都工业学院","成都纺织高等专科学校","成都东软学院","阿坝师范高等专科学校"]],"重庆":[50,["重师涉外商贸学院","重庆邮电大学移通学院","重庆邮电大学","重庆医药高等专科学校","重庆医科大学","重庆信息技术职业学院","重庆文理学院","重庆通信学院","重庆水利电力职业技术学院","重庆市委党校","重庆师范大学","重庆三峡学院","重庆人文科技学院","重庆理工大学","重庆科技学院","重庆警察学院","重庆交通大学","重庆航天职业技术学院","重庆海联学院","重庆工商职业学院","重庆工商大学融智学院","重庆工商大学派斯学院","重庆工商大学","重庆工程职业技术学院","重庆工程学院","重庆房地产职业学院","重庆电子工程职业学院","重庆电力高等专科学校","重庆第二师范学院","重庆大学城市科技学院","重庆大学","重庆传媒职业学院","重庆城市管理职业学院","西南政法大学","西南大学","四川外语学院重庆南方翻译学院","四川外国语大学","四川美术学院","解放军后勤工程学院","第三军医大学","长江师范学院"]],"湖北":[42,["长江大学","长江大学(武汉)","长江职业学院","鄂州职业大学","国防信息学院","海军工程大学","汉口学院","湖北大学","湖北大学知行学院","湖北第二师范学院","湖北工程学院","湖北工业大学","湖北工业大学商贸学院","湖北工业职业技术学院","湖北广播电视大学","湖北经济学院","湖北警官学院","湖北科技学院","湖北理工学院","湖北美术学院","湖北民族学院","湖北汽车工业学院","湖北三峡职业技术学院","湖北师范学院","湖北文理学院","湖北医药学院","湖北职业技术学院","湖北中医药大学","湖北中医药高等专科学校","华中科技大学","华中科技大学同济医学院","华中科技大学文华学院","华中科技大学武昌分校","华中农业大学","华中农业大学楚天学院","华中师范大学","华中师范大学武汉传媒学院","黄冈科技职业学院","黄冈师范学院","黄冈职业技术学院","江汉大学","江汉大学文理学院","荆楚理工学院","荆州教育学院","荆州理工职业学院","荆州职业技术学院","军事经济学院","空军预警学院","三峡大学","三峡旅游职业技术学院","随州职业技术学院","武昌工学院","武昌理工学院","武昌职业学院","武汉城市职业学院","武汉船舶职业技术学院","武汉大学","武汉东湖学院","武汉纺织大学","武汉工程大学","武汉工程大学邮电与信息工程学院","武汉工程科技学院","武汉工程职业技术学院","武汉工商学院","武汉交通职业学院","武汉科技大学","武汉科技大学城市学院","武汉理工大学","武汉理工大学华夏学院","武汉轻工大学","武汉软件工程职业学院","武汉商贸职业学院","武汉商学院","武汉生物工程学院","武汉体育学院","武汉铁路职业技术学院","武汉信息传播职业技术学院","武汉音乐学院","武汉职业技术学院","仙桃职业学院","咸宁职业技术学院","襄阳职业技术学院","郧阳师范高等专科学校","中国地质大学（武汉）","中南财经政法大学","中南财经政法大学武汉学院","中南民族大学"]],"江苏":[32,["北京大学","常熟理工学院","常州大学","常州纺织服装职业技术学院","常州工程职业技术学院","常州工学院","常州机电职业技术学院","常州轻工职业技术学院","常州信息职业技术学院","东南大学","东南大学成贤学院","硅湖职业技术学院","河海大学","淮安信息职业技术学院","淮海工学院","淮阴工学院","淮阴师范学院","建东职业技术学院","江海职业技术学院","江南大学","江苏财经职业技术学院","江苏城市职业学院","江苏大学","江苏第二师范学院","江苏工程职业技术学院","江苏海事职业技术学院","江苏建康职业学院","江苏建筑职业技术学院","江苏经贸职业技术学院","江苏警官学院","江苏科技大学","江苏科技大学苏州理工学院","江苏理工学院","江苏农林职业技术学院","江苏农牧学院","江苏商贸职业学院","江苏省青年管理干部学院","江苏师范大学","江苏食品药品职业技术学院","江苏信息职业技术学院","江阴职业技术学院","解放军国际关系学院","解放军理工大学","金肯职业技术学院","金陵科技学院","金山职业技术学院","九州职业技术学院","空军勤务学院","昆山登云科技职业学院","连云港师范高等专科学校","连云港职业技术学院","明达职业技术学院","南京财经大学","南京城市职业学院","南京大学","南京大学金陵学院","南京工程学院","南京工业大学","南京工业职业技术学院","南京航空航天大学","南京航空航天大学金城学院","南京化工职业技术学院","南京机电职业技术学院","南京交通职业技术学院","南京理工大学","南京理工大学泰州科技学院","南京理工大学紫金学院","南京林业大学","南京陆军指挥学院","南京旅游职业学院","南京农业大学","南京炮兵学院","南京森林警察学院","南京审计学院","南京师范大学","南京师范大学泰州学院","南京师范大学中北学院","南京特殊教育职业技术学院","南京体育学院","南京铁道职业技术学院","南京晓庄学院","南京信息工程大学","南京信息职业技术学院","南京医科大学","南京医科大学康达学院","南京艺术学院","南京邮电大学","南京邮电大学通达学院","南京政治学院","南京中医药大学","南京中医药大学翰林学院","南通大学","南通航运职业技术学院","南通理工学院","南通农业职业技术学院","南通师范高等专科学校","南通职业大学","如皋高等师范学校","三江学院","沙洲职业工学院","苏州大学","苏州港大思培科技职业学院","苏州工业园区服务外包职业学院","苏州工业园区职业技术学院","苏州工业职业技术学院","苏州工艺美术职业技术学院","苏州健雄职业技术学院","苏州经贸职业技术学院","苏州科技学院","苏州农业职业技术学院","苏州市职业大学","苏州托普信息职业技术学院","苏州卫生职业技术学院","苏州信息职业技术学院","宿迁高等师范学校","宿迁学院","泰州学院","泰州职业技术学院","无锡城市职业技术学院","无锡工艺职业技术学院","无锡科技职业学院","无锡南洋职业技术学院","无锡商业职业技术学院","无锡太湖学院","无锡职业技术学院","西安交通大学","徐州高等师范学校","徐州工程学院","徐州工业职业技术学院","徐州医学院","徐州幼儿师范高等专科学校","盐城工学院","盐城工业职业技术学院","盐城师范学院","盐城卫生职业技术学院","炎黄职业技术学院","扬州大学","扬州工业职业技术学院","扬州市职业大学","应天职业技术学院","镇江船艇学院","镇江高等专科学校","正德职业技术学院","中国传媒大学南广学院","中国科学技术大学苏州研究院","中国矿业大学","中国人民大学","中国药科大学","钟山职业技术学院"]],"河南":[41,["安阳工学院","安阳师范学院","安阳师范学院人文管理学院","安阳幼儿师范高等专科学校","河南财经政法大学","河南财政税务高等专科学校","河南城建学院","河南大学","河南工程学院","河南工业大学","河南工业职业技术学院","河南化工职业学院","河南机电高等专科学校","河南检察职业学院","河南建筑职业技术学院","河南交通职业技术学院","河南教育学院","河南经贸职业学院","河南警察学院","河南科技大学","河南科技学院","河南理工大学","河南理工万方科技学院","河南牧业经济学院","河南农业大学","河南农业职业学院","河南商业高等专科学校","河南师范大学","河南师范大学新联学院","河南师范大学新联学院（郑州校区）","河南医学高等专科学校","河南职业技术学院","河南质量工程职业学院","河南中医学院","鹤壁职业技术学院","华北水利水电大学","黄河科技学院","黄河水利职业技术学院","黄淮学院","济源职业技术学院","焦作大学","焦作师范高等专科学校","解放军外国语学院","解放军信息工程大学","开封大学","开封教育学院","洛阳理工学院","洛阳师范学院","南阳理工学院","南阳师范学院","南阳医学高等专科学校","平顶山工业职业技术学院","平顶山教育学院","平顶山学院","三门峡职业技术学院","商丘工学院","商丘师范学院","商丘学院","商丘医学高等专科学校","商丘职业技术学院","新乡学院","新乡医学院","新乡医学院三全学院","新乡职业技术学院","信阳农林学院","信阳师范学院","信阳师范学院华锐学院","信阳职业技术学院","许昌学院","许昌职业技术学院","郑州城市职业学院","郑州成功财经学院","郑州大学","郑州大学软件技术学院","郑州大学体育学院","郑州大学西亚斯国际学院","郑州电力高等专科学校","郑州电力职业技术学院","郑州航空工业管理学院","郑州华信学院","郑州经贸职业学院","郑州科技学院","郑州旅游职业学院","郑州轻工业学院","郑州轻工业学院民族职业学院","郑州升达经贸管理学院","郑州师范学院","郑州铁路职业技术学院","郑州信息科技职业学院","郑州幼儿师范高等专科学校","郑州澍青医学高等专科学校","中原工学院","中原工学院信息商务学院","中州大学","周口科技职业学院","周口师范学院","周口职业技术学院","驻马店职业技术学院","漯河医学高等专科学校","漯河职业技术学院","濮阳职业技术学院"]],"浙江":[33,["公安海警学院","杭州电子科技大学","杭州电子科技大学继续教育学院","杭州科技职业技术学院","杭州师范大学","杭州万向职业技术学院","杭州职业技术学院","湖州师范学院","湖州职业技术学院（湖州电大）","嘉兴广播电视大学","嘉兴南洋职业技术学院","嘉兴学院","嘉兴职业技术学院","金华广播电视大学","金华教育学院","金华职业技术学院","丽水学院","丽水职业技术学院","宁波城市职业技术学院","宁波大红鹰学院","宁波大学","宁波大学成人教育学院","宁波工程学院","宁波广播电视大学","宁波教育学院","宁波诺丁汉大学","宁波卫生职业技术学院","宁波职业技术学院","上海财经大学浙江学院","绍兴文理学院","绍兴职业技术学院","台州广播电视大学","台州科技职业学院","台州学院","台州职业技术学院","同济大学浙江学院","温州大学","温州大学城市学院","温州科技职业学院","温州医科大学","温州职业技术学院","义乌工商职业技术学院","浙江财经大学","浙江长征职业技术学院","浙江传媒学院","浙江大学","浙江大学城市学院","浙江大学宁波理工学院","浙江电大工商学院","浙江东方职业技术学院","浙江纺织服装职业技术学院","浙江工贸职业技术学院","浙江工商大学","浙江工商职业技术学院","浙江工业大学","浙江工业大学之江学院","浙江工业职业技术学院","浙江广厦建设职业技术学院","浙江国际海运职业技术学院","浙江海洋学院","浙江横店影视职业学院","浙江机电职业技术学院","浙江建设职业技术学院","浙江交通职业技术学院","浙江金融职业学院","浙江经济职业技术学院","浙江经贸职业技术学院","浙江警察学院","浙江警官职业学院","浙江科技学院","浙江理工大学","浙江理工大学科技与艺术学院","浙江旅游职业学院","浙江农林大学","浙江农林大学暨阳学院","浙江农业商贸职业学院","浙江商业职业技术学院","浙江师范大学","浙江树人学院","浙江水利水电学院","浙江同济科技职业学院","浙江外国语学院","浙江万里学院","浙江医学高等专科学校","浙江医药高等专科学校","浙江邮电职业技术学院","浙江育英职业技术学院","浙江越秀外国语学院","浙江中医药大学","浙师大杭州幼儿师范学院","中国计量学院","中国美术学院","衢州学院","衢州职业技术学院"]],"云南":[53,["云南中医学院","云南艺术学院","云南师范大学文理学院","云南师范大学商学院","云南师范大学","云南农业职业技术学院","云南农业大学","云南民族大学","云南林业职业技术学院","云南警官学院","云南经济管理学院","云南交通职业技术学院","云南国土资源职业学院","云南国防工业职业技术学院","云南工商学院","云南大学旅游文化学院","云南大学滇池学院","云南大学","云南财经大学","玉溪师范学院","西南林业大学","文山学院","曲靖医学高等专科学校","曲靖师范学院","普洱学院","临沧师范高等专科学校","丽江师范高等专科学校","昆明医科大学海源学院","昆明医科大学","昆明冶金高等专科学校","昆明学院","昆明民族干部学院","昆明理工大学津桥学院","昆明理工大学","红河学院","德宏师范高等专科学校","大理学院","楚雄师范学院","保山学院"]]}';

    var school = JSON.parse(schoolJSONStr),
        provinces = [{ text: "请选择省份", value: "" }];
    for(var p in school){
        provinces.push({ text: p, value: p });
    }
    var vmQuery = new Vue({
        el: "#query",
        data: {
            id: '',
            username: "",
            show: true
        },
        methods: {
            query: function(e){
                e.preventDefault();
                var _check = checkInput();
                if('151' === _check){
                    $.Dialog.fail('2015年6月的考试信息还未公布, 请关注公布时间!');
                    return false;
                }else if('id' === _check){
                    $.Dialog.fail('请输入正确的准考证号!');
                    return false;
                }else if('name' === _check){
                    $.Dialog.fail('请输入正确的姓名!');
                    return false;
                }
                $.Dialog.loading();
                var timer = setTimeout(function(){
                    $.Dialog.fail("网络超时!");
                }, 5000); //timeout

                var $data = $('#form').serialize();
                $.post('/CETQuery/Api/Index/find', $data).success(function(res){
                    clearTimeout(timer);
                    if(res.status == 0){
                        $.Dialog.success("查询成功, 载入中...");
                        $('.tabs-container, .pager').hide();
                        setTimeout(function(){
                            vmResult.tname = res.data.name;
                            vmResult.tschool = res.data.school;
                            vmResult.all = res.data.grade.all;
                            vmResult.writing = res.data.grade.writing;
                            vmResult.reading = res.data.grade.reading;
                            vmResult.listening = res.data.grade.listening;
                            vmResult.tid = vmQuery.id;
                            vmResult.ttype = get_testtype(vmQuery.id);
                            //vmResult.tname = vmQuery.username;
                            vmQuery.show = false;
                            setTimeout(function(){
                                vmResult.show = true;
                                $('.dn').removeClass('dn');
                            }, 500);
                        }, 200);
                    }else if(res.status == -3){
                        $.Dialog.fail("查无此人,请检查!")
                    }else{
                        $.Dialog.fail(res.info);
                    }
                });
            }
        }
    });

    var vmNoticketQuery = new Vue({
        el: "#noTicketForm",
        data: {
            username: "",
            province: "",
            school: "",
            type: "", //1->4级, 2->6级

            provinces: provinces,
            schools: [{text: '请先选择省份', value: ''}]
        },
        methods: {
            query: function(e){
                e.preventDefault();
                if(!this.username){
                    return $.Dialog.fail("请填写姓名!");
                }

                if(!this.province){
                    return $.Dialog.fail("请选择学校省份!");
                }

                if(!this.school){
                    return $.Dialog.fail("请选择学校!");
                }

                if(!this.type){
                    return $.Dialog.fail("请选择四/六级!");
                }

                $.post('/CETQuery/Api/Index/noTicketQuery', {
                    username: this.username,
                    province: this.province,
                    school: this.school,
                    type: this.type,
                }).success(function(res){
                    if(res.status == 0){
                        $.Dialog.success("查询成功, 载入中...");
                        $('.tabs-container, .pager').hide();
                        setTimeout(function(){
                            vmResult.tname = res.data.name;
                            vmResult.tschool = res.data.school;
                            vmResult.all = res.data.grade.all;
                            vmResult.writing = res.data.grade.writing;
                            vmResult.reading = res.data.grade.reading;
                            vmResult.listening = res.data.grade.listening;
                            vmResult.tid = res.data.tid;
                            vmResult.ttype = get_testtype(res.data.tid);
                            //vmResult.tname = vmQuery.username;
                            vmQuery.show = false;
                            setTimeout(function(){
                                vmResult.show = true;
                                $('.dn').removeClass('dn');
                            }, 500);
                        }, 200);
                    }else if(res.status == -3){
                        $.Dialog.fail("查无此人,请检查!")
                    }else{
                        $.Dialog.fail(res.info);
                    }
                }).fail(function(res){});
            }
        }
    });
    vmNoticketQuery.$watch('province', function(p){
        vmNoticketQuery['school'] = '';
        var ret;
        try{
            ret = school[p][1].map(function(_school){
                return {text: _school, value: _school};
            });
        }catch(e){
            return vmNoticketQuery['schools'] = [{text: '请先选择省份', value: ''}];
        }
        vmNoticketQuery['schools'] = ret;
    });

    var vmResult = new Vue({
        el: "#result",
        data:{
            tname: '',
            tschool: '',
            ttype: '',
            tid: '',
            all: '',
            listening: '',
            reading: '',
            writing: '',

            show: false
        },
        methods: {
            back: function(e){
                //e.preventDefault();
                //vmResult.show = false;
                //setTimeout(function(){
                //    vmResult.tname = vmResult.tschool = vmResult.all
                //        = vmResult.writing = vmResult.reading = vmResult.listening
                //        = vmResult.ttype = vmResult.tname = vmResult.tid = '';
                //    vmQuery.show = true;
                //}, 500);
                location.reload();
            }
        }
    });

    function get_testtype(tid) {
        tid += '';
        if(tid.length == 15){
            switch (tid.substr(9, 1)) {
                case "1": return "英语四级";
                case "2": return "英语六级";
                case "3": return "日语四级";
                case "4": return "日语六级";
                case "5": return "德语四级";
                case "6": return "德语六级";
                case "7": return "俄语四级";
                case "8": return "俄语六级";
                case "9": return "法语四级";
            }
        } else if (tid.length == 14)
            return "英语口语";
        return "";
    }

    function checkInput(){
        var tname = vmQuery.username,
            tid = vmQuery.id;

        var idReg = /^\d{14,15}$/,
            nameReg = /^[\u4e00-\u9fa5]{2,}$/;

        if (!nameReg.test(tname)){
            return 'name';
        }

        if (!idReg.test(tid)){
            return 'id';
        }
        if((tid.length == 15 && tid.substr(6, 3) == "151") || (tid.length == 14 && tid.substr(0, 3) != "151")){ //todo waiting for grade published
            return '151';
        }

        if(tid.length == 15 && tid.substr(6, 3) != "142" || get_testtype(tid) == ""){
            return 'id';
        }

        if(tid.length == 14 && tid.substr(0, 3) != "142"  || get_testtype(tid) == ""){
            return 'id';
        }

        return true;
    }

    var tabsSwiper = new Swiper('#tab-container', {
        speed: 500,
        onSlideChangeStart: function () {
            $(".tab .selected").removeClass('selected');
            $(".tab li").eq(tabsSwiper.activeIndex).addClass('selected');
        }
    });
    $(".tab li").on('touchstart mousedown',function(e){
        e.preventDefault()
        $(".tab .selected").removeClass('selected');
        $(this).addClass('selected');
        tabsSwiper.swipeTo( $(this).index() );
    });
    $(".tab li").click(function(e){
        e.preventDefault();
    });


    $('input, select').on('touchstart touchend touchmove mousemove', function(e){e.stopPropagation()});
})(jQuery, Vue);