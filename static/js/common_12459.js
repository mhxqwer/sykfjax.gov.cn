function siteSearch(){
    var siteSearchList_inner=[
        {
            desc:"全省",
            searchUrl:"https://www.fujian.gov.cn/ssp/main/index.html",
            paramObj:{
                siteId:'ff808081624641aa0162476c0e0e0055',
                isMain:'1'
            },
            hashObj:{
                keyWord:'$SearchKeyWord$'
            }
        },
        {
            desc:"站群",
            searchUrl:"https://www.quanzhou.gov.cn/so/s",
            paramObj:{
                tab:'qs',
                qt:'$SearchKeyWord$'
            },
            hashObj:{
            }
        },
        {
            desc:"本站",
            searchUrl:"http://www.fjax.gov.cn/ssp/main/index.html",
            paramObj:{
                siteId:'000000008abc1f0a018acbf5cdbe00f8'
            },
            hashObj:{
                keyWord:'$SearchKeyWord$'
            }
        },
        
    ]
    avalon.each(siteSearchList_inner,function($index,$item){
        if($("#siteSearchTypeRes").val()==$item.desc){
            open(($item.searchUrl+"?"+$.param($item.paramObj)+"#"+$.param($item.hashObj)).replace("%24SearchKeyWord%24",avalon.vmodels.searchWordNotice.searchWord));
            //avalon.log(($item.searchUrl+"?"+$.param($item.paramObj)+"#"+$.param($item.hashObj)).replace("%24SearchKeyWord%24",avalon.vmodels.searchWordNotice.searchWord));
        }
    })
    return false;
}


//判断是否被iframe嵌套
function isInnerIframe() {
return top.location==location?false:true;
}

//判断如果是政府信息公开，移除头部中的菜单栏
var winUrl=window.location.href;
var _xxgkUrl="http://www.fjax.gov.cn/zwgk/zfxxgkzl/".replace(location.protocol,"").replace("//","").replace(location.host,"");
if(winUrl.indexOf(_xxgkUrl)>-1){
        $(".banner_header").remove();//移除主站头部菜单栏，可根据实际样式名调整
}

var w = $(window).innerWidth();
if( $(".wrap").hasClass("page_bg") && w>992 ){
        $("#aged_link2").remove();
}else{
        $("#aged_link1").remove();
}

//初始化无障碍、适老版准备工作
function initBfreeMode(){
    var bFreeMode= getCookie("BFree");
    var defaultSuperslideObj={
        effect:"left",
        autoPlay:true
    }
    //进入适老版
    if (bFreeMode) {
        //页面进入无障碍模式进行的一系列操作
        if(bFreeMode=='1'){
        }
        //页面进入适老版模式进行的一系列操作
        if(bFreeMode=='2'){
            document.querySelector("html").classList.add("slb");
        }
        //无障碍、适老版共同执行的一系列操作
        defaultSuperslideObj.effect="fade";
        defaultSuperslideObj.autoPlay=false;

    }
    window.defaultSuperslideObj=defaultSuperslideObj;
    window.bFreeMode=bFreeMode;
    $("#barrierFreeBtn").click(function () {
        setTimeout(function(){
            window.location.reload();
        },500)
    })


}

initBfreeMode();

function getCookie(name) {
  var value = "; " + document.cookie;
  var parts = value.split("; " + name + "=");
  if (parts.length === 2) {
    return parts.pop().split(";").shift();
  }
}

/**
 * 生成随机uuid
*/
function generateUUID() {
  let d = new Date().getTime();
  if (typeof performance !== 'undefined' && typeof performance.now === 'function'){
      d += performance.now(); // use high-precision timer if available
  }
  let uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      let r = (d + Math.random()*16)%16 | 0;
      d = Math.floor(d/16);
      return (c=='x' ? r : (r&0x3|0x8)).toString(16);
  });
  return uuid;
}


$(function(){

    var fujianSearchId = 'ff808081624641aa0162476c0e0e0055';
    var zhanqunSearchId = '2c9d02866787ab22016787b129ae0032';
    var siteSearchId = '000000008abc1f0a018acbf5cdbe00f8';
    var siteKeyWord1 =  $('#siteKeyWord1');
    var isMain = $("#isMain");
    var siteId1 = $('#siteId1');
    $('#siteSearchType li').on("click", function () {
        var text = $(this).text();
        switch (text){
            case '全省':
                siteId1.attr('name', 'siteId1');
                isMain.attr('name', 'isMain');
                siteId1.val(fujianSearchId);
                siteId1.prop("name", "siteId");
                isMain.val("1");
                $('#searchForm').attr('action', 'https://www.fujian.gov.cn/ssp/main/index.html');
                $('#siteSearchTypeRes').val('全省');
		siteKeyWord1.attr('name', 'key');
                break;
            case '站群':
                siteId1.attr('name', '');
                isMain.attr('name', 'tab');
                isMain.val('qs');
                $('#searchForm').attr('action', 'http://www.quanzhou.gov.cn/so/s');
                $('#siteSearchTypeRes').val('站群');
		siteKeyWord1.attr('name', 'qt');
                break;
            default:
                siteId1.attr('name', 'siteId');
                isMain.attr('name', 'isMain');
                siteId1.val(siteSearchId);
                $('#searchForm').attr('action', '/ssp/main/index.html');
                $('#siteSearchTypeRes').val('本站');
		siteKeyWord1.attr('name', 'key');
                isMain.val("0");
                break;

        }
    })
	
    var date = new Date(),
    year = date.getFullYear(),
    month = date.getMonth() + 1,
    week =  date.getDay(),
    day = date.getDate()
    var weekday=new Array(7);
    weekday[0]="星期日";
    weekday[1]="星期一";
    weekday[2]="星期二";
    weekday[3]="星期三";
    weekday[4]="星期四";
    weekday[5]="星期五";
    weekday[6]="星期六";
    month = month > 9 ? month : '0' + month
    day = day > 9 ? day : '0' + day
    var todayHTML = year +'年'+ month +'月'+ day +'日&emsp;'+ weekday[week]
    $('#todayHeader').html(todayHTML)
    $('#todayHeader1').html(todayHTML)

    /**
     * 无障碍注册
     * @type {BarrierFree}
     */

    var bf = new BarrierFree({
		api: 'https://barrier-free.terton.com.cn/barrier-free/aip/fuzhou/speech.jhtml',
		//tip: true,
                tip:isInnerIframe()?false:true,
        callback: function(state) {
            if(state === 2) {
                $('html').addClass('slb')
                var oldModeMenu="";
                oldModeMenu += "<div class=\"rig-fix2 bf-pass bf-ignore\" id=\"oldOtherEvent\" ><ul class=\"wxmz wxmz1\" ><li event-type=\"zoomIn\"><a href=\"javascript:;\" ><span class=\"slb-rig01\"><\/span><p>页面放大<\/p><\/a><\/li><li event-type=\"zoomOut\"><a href=\"javascript:;\" >";
                oldModeMenu += "            <span class=\"slb-rig02\"><\/span>";
                oldModeMenu += "            <p>页面缩小<\/p>";
                oldModeMenu += "        <\/a><\/li>";
                oldModeMenu += "        <li event-type=\"caption\"><a href=\"javascript:;\" >";
                oldModeMenu += "            <span class=\"slb-rig03\"><\/span>";
                oldModeMenu += "            <p>显示屏<\/p>";
                oldModeMenu += "        <\/a><\/li>";
                oldModeMenu += "        <li event-type=\"readThrough\"><a href=\"javascript:;\" >";
                oldModeMenu += "            <span class=\"slb-rig04\"><\/span>";
                oldModeMenu += "            <p>阅读方式<\/p>";
                oldModeMenu += "        <\/a><\/li>";
                oldModeMenu += "        <li event-type=\"close\"><a href=\"javascript:;\">";
                oldModeMenu += "            <span class=\"slb-rig05\"><\/span>";
                oldModeMenu += "            <p>退出<\/p>";
                oldModeMenu += "        <\/a><\/li>";
                oldModeMenu += "    <\/ul>";
                oldModeMenu += "<\/div>";
                oldModeMenu += "";
                $(document.body).append($(oldModeMenu))
                $("#oldOtherEvent li").on('click', function(e) {
                    e.stopPropagation()
                    if(!bf) return;
                    var eventType = $(this).attr("event-type")
                    if(eventType == 'close') {
                        bf.close()
                        return;
                    }
                    bf.register(eventType)
                })
                $("#Elderly").html('退出长者模式');
                $("#Elderly").css("display","block");
            }
        }
    })
    $('#Elderly').click(function() {
		/* 修复了进入适老版之后superslide元素异常问题,改用页面重载的方式  begin  */
		var _isInitOldVertion=$.cookie("BFree");
		bf.change(2);
		if(!_isInitOldVertion){
			window.location.reload();
		}
		/* 修复了进入适老版之后superslide元素异常问题,改用页面重载的方式  end  */
    })
    // 无障碍tab切换


    $('.menu_hd li').each(function(index) {
        var $this = $(this)
        var $liA = $(this).children('a');
        var $liWrap = $('.menu_bd .row').eq(index).find('a')
        $liA.focus(function(e) {
            // $('.nav_21 li').eq(index - 1).trigger('mouseleave')
            e = $this.trigger('mouseover')
            if($liWrap.length > 0) {
                $(this).bind('keydown.wza_tab', function (e) {
                    if (!e.ctrlKey && !e.altKey && e.keyCode === 9) {
                        $liWrap.eq(0).focus()
                        return false
                    }
                })
            }
        })
        $liA.blur(function() {
            $(this).unbind('keydown.wza_tab')
        })
        var $curA = $liWrap
        var endTabLen = $curA.length - 1;
        $curA.eq(endTabLen).focus(function () {
            $(this).bind('keydown.wza_tab_leave', function (e) {
                if (!e.ctrlKey && !e.altKey && e.keyCode === 9) {
                    $('.menu_base li').eq(index + 1).children('a').focus()
                    return false;
                }
            })
        })
        $curA.eq(endTabLen).blur(function() {

            $(this).unbind('keydown.wza_tab_leave')
        })
    })
    // 无障碍tab友情链接
    var $yqljLi = $('#out_links').children('ul').children('li');
    $yqljLi.children('p').attr('tabindex', 0);
    $yqljLi.children('p').click(function(e) {
        e.stopPropagation()
    });
    $yqljLi.each(function(index) {
        var $this = $(this);
        var $yqljP = $this.children('p');
        var $link = $this.find('li');
        var endTabLen = $link.length - 1;
        $yqljP.focus(function(e) {

            if(!$(this).parent().hasClass("on")){
                e = $(this).click();
            }

            
            if($link.length > 0) {
                $(this).bind('keydown.wza_tab', function (e) {
                    if (!e.ctrlKey && !e.altKey && e.keyCode === 9) {
                        $link.eq(0).find('a:eq(0)').focus()
                        return false
                    }
                })
            }
        })
        $link.eq(endTabLen).focus(function() {
            $(this).bind('keydown.wza_tab_leave', function (e) {
                if (!e.ctrlKey && !e.altKey && e.keyCode === 9) {
                    if(index != $yqljLi.length - 1) {
                        $yqljLi.eq(index + 1).children('p').focus()
                    } else {
                       // $this.removeClass('on').children('.yqlj_con1').slideUp()
                    }
                    return false;
                }
            })
        })

        if((index+1)==$yqljLi.length){
            $link.eq(endTabLen).find("a").blur(function() {
                $('.out_links>ul>li>div').hide();
            })
        }

    })
})

function isMobile() {//判断访问终端
    var browser = {
        versions: function () {
            var u = navigator.userAgent,
                app = navigator.appVersion;
            return { //移动终端浏览器版本信息
                trident: u.indexOf('Trident') > -1, //IE内核
                presto: u.indexOf('Presto') > -1, //opera内核
                webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
                gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
                mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
                ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
                android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器
                iPhone: u.indexOf('iPhone') > -1, //是否为iPhone或者QQHD浏览器
                iPad: u.indexOf('iPad') > -1, //是否iPad
                webApp: u.indexOf('Safari') == -1, //是否web应该程序，没有头部与底部
                weixin: u.indexOf('MicroMessenger') > -1, //是否微信
                qq: u.match(/\sQQ/i) == " qq" //是否QQ
            };
        }(),
        language: (navigator.browserLanguage || navigator.language).toLowerCase()
    }
    if (browser.versions.mobile || browser.versions.ios || browser.versions.android || browser.versions.iPhone || browser.versions.iPad) {
        return true;
    } else {
        return false;
    }
}



//收藏本站
function AddFavorite(sURL, sTitle) {
    sURL = encodeURI(sURL);
    try {
        window.external.addFavorite(sURL, sTitle);
    } catch (e) {
        try {
        window.sidebar.addPanel(sTitle, sURL, "");
        } catch (e) {
        alertMsg("加入收藏失败，请使用Ctrl+D进行添加,或手动在浏览器里进行设置.");
        }
    }
}

//设为首页
function SetHome(url) {
    if (document.all) {
        document.body.style.behavior = 'url(#default#homepage)';
        document.body.setHomePage(url);
    } else {
        alertMsg("您好,您的浏览器不支持自动设置页面为首页功能,请您手动在浏览器里设置该页面为首页!");
    }
}

function searchIsTrim() {
    if ($("input[name='key']").val().replace(/\s/g, "") == '') {
        alertMsg("请输入关键字!!");
        return false;
    } else {
        return true;
    }
}

function alertMsg(alertMsg) {
    require(['dialog'], function (dialog) {
        var msg = dialog({
        title: '提示信息',
        content: '',
        width: '20em',
        id: 'infoMsg',
        cancelValue: '确定',
        cancel: function () {
            this.close();
            return false;
        }
        });
        msg.content(alertMsg ? alertMsg : '').show();
    })
}

function seriesLoadScripts(scripts, callback) {
    if (typeof (scripts) != "object") var scripts = [scripts];
    var HEAD = document.getElementsByTagName("head").item(0) || document.documentElement;
    var s = new Array(), last = scripts.length - 1, recursiveLoad = function (i) {
        // 递归
        s[i] = document.createElement("script");
        s[i].setAttribute("type", "text/javascript");
        s[i].onload = s[i].onreadystatechange = function () {
            if (!/*@cc_on!@*/0 || this.readyState == "loaded" || this.readyState == "complete") {
                this.onload = this.onreadystatechange = null; this.parentNode.removeChild(this);
                if (i != last) recursiveLoad(i + 1); else if (typeof (callback) == "function") callback();
            }
        }
        s[i].setAttribute("src", scripts[i]);
        HEAD.appendChild(s[i]);
    };
    recursiveLoad(0);
}

/* 已加载文件缓存列表,用于判断文件是否已加载过，若已加载则不再次加载*/
var classcodes = [];
window.Import = {
    /*加载一批文件，_files:文件路径数组,可包括js,css,less文件,succes:加载成功回调函数*/
    LoadFileList: function (_files, succes) {
        var FileArray = [];
        if (typeof _files === "object") {
            FileArray = _files;
        } else {
            /*如果文件列表是字符串，则用,切分成数组*/
            if (typeof _files === "string") {
                FileArray = _files.split(",");
            }
        }
        if (FileArray != null && FileArray.length > 0) {
            var LoadedCount = 0;
            for (var i = 0; i < FileArray.length; i++) {
                loadFile(FileArray[i], function () {
                    LoadedCount++;
                    if (LoadedCount == FileArray.length) {
                        succes();
                    }
                });
            }
        }
        /*加载JS文件,url:文件路径,success:加载成功回调函数*/
        function loadFile(url, success) {
            if (!FileIsExt(classcodes, url)) {
                var ThisType = GetFileType(url);
                var fileObj = null;
                fileObj = document.createElement('script');
                fileObj.src = url;
                success = success || function () { };
                fileObj.onload = fileObj.onreadystatechange = function () {
                    if (!this.readyState || 'loaded' === this.readyState || 'complete' === this.readyState) {
                        success();
                        classcodes.push(url)
                    }
                }
                document.getElementsByTagName('head')[0].appendChild(fileObj);
            } else {
                success();
            }
        }
        /*获取文件类型,后缀名，小写*/
        function GetFileType(url) {
            if (url != null && url.length > 0) {
                return url;
            }
            return "";
        }
        /*文件是否已加载*/
        function FileIsExt(FileArray, _url) {
            if (FileArray != null && FileArray.length > 0) {
                var len = FileArray.length;
                for (var i = 0; i < len; i++) {
                    if (FileArray[i] == _url) {
                        return true;
                    }
                }
            }
            return false;
        }
    }
}

;!(function(win){
    win.loadScripts=function(options){
        if(options.url){
			scripts.load(options);
        }
        else{
			alert("请输入需要动态加载js的路径!")
        }
    }
    var scripts={};
    //添加额外的属性
    scripts.attr=function(ele,obj){
        if(typeof obj=='object'){
            for(var name in obj){
                ele.setAttribute(name,obj[name]);
            }
        }else{
            return;
        }
    }
    scripts.load=function(options){
        var script=options.url,id=options.id,callback=options.callback,_obj=options.attr;
        if(typeof(script) != "object") var script = [script];
        var HEAD = document.getElementsByTagName("head").item(0) || document.documentElement;
        var s = new Array(), last = script.length - 1, recursiveLoad = function(i) {
            // 递归
            s[i] = document.createElement("script");
            s[i].setAttribute("type","text/javascript");
            if(id){
                s[i].setAttribute("id",id);
            }
            if(_obj && typeof  _obj=='object'){

                scripts.attr(s[i],_obj);
            }
            s[i].onload = s[i].onreadystatechange = function() {

                if(!/*@cc_on!@*/0 || this.readyState == "loaded" || this.readyState == "complete") {
                    this.onload = this.onreadystatechange = null; this.parentNode.removeChild(this);
                    if(i != last) recursiveLoad(i + 1); else if(typeof(callback) == "function") callback();
                }
            }
            s[i].setAttribute("src",script[i]);
            HEAD.appendChild(s[i]);
        }
        recursiveLoad(0);
    }
}(window))


$(function(){
    $(window).scroll(function() {
        var ua = navigator.userAgent.toLowerCase();
        if(ua.match(/iPad/i)=="ipad" || ua.match(/Mobile/i)=="mobile") {
        }else{
            $(this).scrollTop() > 150 ? $(".header_21_con1").addClass('fixed') : $(".header_21_con1").removeClass('fixed');
        }
    });
})

jQuery(function(){//点击链接时 判断是否是外链，如果是弹出提示框
    jQuery(document).undelegate("a")
    jQuery(document).delegate("a", "click", function(event) {
        var iCurrHerf = jQuery(this).attr('href');
        var iCurrId = jQuery(this).attr("id");
        if(iCurrHerf){
            if(iCurrHerf.indexOf(window.location.host)!=-1||iCurrHerf.indexOf("www.12371.cn")!=-1){
                return true;
            }
            if(iCurrId!="outLinkA"){
                if(iCurrHerf.indexOf(".cn") >= 0 || iCurrHerf.indexOf(".com") >= 0 || iCurrHerf.indexOf(".net") >= 0 || iCurrHerf.indexOf(".org") >= 0) {
                    if(iCurrHerf.indexOf("cn/") >= 0 || iCurrHerf.indexOf(".com") >= 0) {
                        iCurrHerf = iCurrHerf.substr(0, iCurrHerf.indexOf("cn/"));
                    } else if(iCurrHerf.indexOf("cn:") >= 0) {
                        iCurrHerf = iCurrHerf.substr(0, iCurrHerf.indexOf("cn:"));
                    }
                    if(!(iCurrHerf.indexOf(".gov.") > 0) || (iCurrHerf.indexOf(".net") > 0) || (iCurrHerf.indexOf(".org") > 0)) {
                        event.preventDefault();
                        var iPs = '您打开的是外部链接，该网页链接是非政府网站链接，请注意甄别、确保上网安全。'
                        jQuery('body').append('<div class="otherlink-bg"></div><div class="otherlink-pop"><a href="javascript:;" class="closeBtn offBtn">×</a><h2>' + iPs + '</h2><p class="btns"><a href="javascript:;" class="closeBtn">放弃</a><a href="' + jQuery(this).attr('href') + '" id="outLinkA" class="toOtherLink" tag="' + jQuery(this).attr('href') + '" target="_blank">继续访问</a></p></div>')
                        setTimeout(function() {
                            jQuery('.otherlink-bg').addClass('in');
                            jQuery('.otherlink-pop').addClass('in');
                        }, 300)

                        jQuery('.otherlink-pop a.closeBtn').click(function() {

                            jQuery('.otherlink-bg').removeClass('in')
                            jQuery('.otherlink-pop').removeClass('in');
                            setTimeout(function() {
                                jQuery('.otherlink-bg').remove();
                                jQuery('.otherlink-pop').remove();
                            }, 300)
                        })
                        jQuery('.otherlink-pop a.toOtherLink').click(function() {
                            jQuery('.otherlink-bg').hide();
                            jQuery('.otherlink-pop').hide();

                        })

                    }
                }
            }
        }
    })
})

//详情页面字体大小切换begin
function fontZoomA() {
    document.getElementById('fontzoom').style.fontSize = '14px';
    document.getElementById('fontzoom').style.lineHeight = '28px';
    allChanges("12px", "26px");
}

function fontZoomB() {
    document.getElementById('fontzoom').style.fontSize = '16px';
    document.getElementById('fontzoom').style.lineHeight = '32px';
    allChanges("16px", "32px");
}

function fontZoomC() {
    document.getElementById('fontzoom').style.fontSize = '18px';
    document.getElementById('fontzoom').style.lineHeight = '36px';
    allChanges("20px", "30px");
}

function allChanges(_fontSize, _lineHeight) {
    var allSpan = document.getElementById('fontzoom').getElementsByTagName('span');
    var allDiv = document.getElementById('fontzoom').getElementsByTagName('div');
    for (var i = 0; i < allSpan.length; i++) {
        allSpan.item(i).style.fontSize = _fontSize;
        allSpan.item(i).style.lineHeight = _lineHeight;
    }
    for (var i = 0; i < allDiv.length; i++) {
        allDiv.item(i).style.fontSize = _fontSize;
        allDiv.item(i).style.lineHeight = _lineHeight;
    }
}
//详情页面字体大小切换end

//一号登录窗开关
function showLoginConfirmHtml(){
    $('.popupmask').toggle();
    $('.popup').toggle();
}

function login() {
    window.location.href ="/uc/login/login?redirtUrl=http://www.fjax.gov.cn/uc/login/noseLogin?redirtUrl="+encodeURI(encodeURI(window.location.href));
}

function resiter() {
    window.location.href = "https://mztapp.fujian.gov.cn:8304/dataset/UnifiedController/goRegist.do?returnurl="+encodeURI(encodeURI(window.location.href)) + "&callerCode=Q9QP5Mznsc4rS9lk8t5sW4pj1byW8maZKBuAselxg";
}


$(function(){

    var type = "10";
    var qzlogin = false;
    var isfav = false;
    setTimeout(function () {
        var cspucToken = $.cookie("cspucToken");
        if (cspucToken) {
            $.ajax({
                url: "/uc/login/isLogin",
                dataType: "json",
                type: "get",
                //jsonpCallback:"jsonpCallback",
                success: function (data) {
                    if (data.data) { //登录
                        qzlogin = true;
                        var _userInfoStr="<a href='/uc/'>【" +data.data.user_account +"】</a><em class='ydd-none_2021'>|</em><a href='/uc/login/logout?redirtUrl=" +encodeURI(window.location.href) + "'>退出</a>";
                        $(".h18user").html(_userInfoStr);
                        avalon.vmodels.windowRoot.sm4UserStr=data.user;
                    } else {
                        qzlogin = false;
                    }
                },
                error: function (data) {
                    alert("请求失败！");
                }
            });
        }

        if($('#fav').length>=1){


        $.ajax({
            url: "/uc/v1/apis/isConllect",
            dataType: "json",
            type: "post",
            data: {
                url: window.location.href,
                random: Math.random()
            },
            success: function (data) {
                if (data.isConllect) { //已收藏
                    isfav = true;
                    $('#fav').html('<i class="trt-iconfont trt-icon-shoucang"></i>');
                    $('#fav').attr("title","取消收藏");
                    //$('#fav').css("display","inline-block");

                    $('#fav2').html('<i class="trt-iconfont trt-icon-shoucang"></i>已收藏');
                    $('#fav2').attr("title","取消收藏");
                } else {
                    isfav = false;
                    $('#fav').html('<i class="trt-iconfont trt-icon-shoucang"></i>');
                    $('#fav').attr("title","收藏");
                    //$('#fav').css("display","inline-block");

                    $('#fav2').html('<i class="trt-iconfont trt-icon-shoucang"></i>收藏');
                    $('#fav2').attr("title","收藏");
                }
            },
            error: function (data) {
                console.info("请求失败！");
            }
        });

        }


    }, 2000);
    $('#fav,#fav2').click(function () {
        if (!qzlogin) {
            showLoginConfirmHtml();
        } else {
            if (!isfav && qzlogin) {
                $.ajax({
                    url: "/uc/v1/apis/addCollection",
                    dataType: "json",
                    type: "post",
                    data: {
                        title: title,
                        type: type,
                        url: window.location.href,
                        random: Math.random()
                    },
                    success: function (data) {
                        if (!data.error) {
                            alert("收藏成功！")
                            $('#fav').html('<i class="trt-iconfont  trt-icon-shoucang"></i>');
                            $('#fav').attr("title","取消收藏");

                            
                            $('#fav2').html('<i class="trt-iconfont trt-icon-shoucang"></i>已收藏');
                            $('#fav2').attr("title","取消收藏");
                            isfav = true;
                        }
                    },
                    error: function (data) {
                        console.info("请求失败！");
                    }
                });
            } else if (isfav && qzlogin) {
                var mymessage = confirm("确定是否要取消收藏？");
                if (mymessage == true) { //点击确定，取消收藏
                    $.ajax({
                        url: "/uc/v1/apis/deleteCollection",
                        dataType: "json",
                        type: "post",
                        data: {
                            url: window.location.href,
                            random: Math.random()
                        },
                        success: function (data) {
                            if (!data.error) {
                                alert("取消收藏成功！")
                                $('#fav').html('<i class="trt-iconfont  trt-icon-shoucang"></i>');
                                $('#fav').attr("title","收藏");

                                $('#fav2').html('<i class="trt-iconfont trt-icon-shoucang"></i>收藏');
                                $('#fav2').attr("title","收藏");
                                isfav = false;
                            }
                        },
                        error: function (data) {

                            console.info("请求失败！");
                        }
                    });
                } else if (mymessage == false) {
                }
            }

        }
    });
	//流量统计
	loadScripts({url:'/visitor/hm.js'});


	loadScripts({//纠错
		url:'https://zfwzgl.www.gov.cn/exposure/jiucuo.js',
		id:'_jiucuo_',
		attr:{
			sitecode:'3505240010'
		},
		callback:function(){
		}
	})

	//文章页面访问量
	try {
		if(DOCID){
			jQuery.ajax({
				url: '/visitor/stat/doc/visit.xhtml?siteId=59&docId='+DOCID,
				type:'post',
				dataType:'json',
				success:function(msg){
					if(msg.result ==true){
						var vm=msg.count;
						$("#xlcount").html(vm);
					}
				}
			});
		}
	} catch (error) {

	}
})


//头部菜单选中判断及切换begin 
var _menuObj={
    _menuIndex:-1,
    _menuUrl:location.href,
    _menuList:[
	"/zwgk/",
    "/jdhy/",
    "/wsbs/",
    "/hdjl/",
	"/zjax/"
    ]
}
for (var index = 0; index < _menuObj._menuList.length; index++) {
    var element = _menuObj._menuList[index];
    if(_menuObj._menuUrl.indexOf(element)!=-1){
        _menuObj._menuIndex=index;
    }
}
_menuObj._menuIndex=_menuObj._menuIndex==-1? 0:_menuObj._menuIndex+1;
$("#topMenu_xmb li").eq(_menuObj._menuIndex).addClass("on");
jQuery(".menu_hov").slide({titCell:".menu_hd li",mainCell:".menu_bd",defaultIndex:0,returnDefault:true,titOnClassName:"active"});
//头部菜单选中判断及切换end 

//头部检索框输入提示
avalon.define("searchWordNotice", function($scope) {
		$scope.rows=[];
		$scope.searchWord="";
		$scope.doSearch=true;
		$scope.showNotice=false;

		$scope.getWordNotice=function(){
			$scope.rows.clear();
			this.getJson(function(res){
				//  2023年11月8日 新增热搜词 begin
				avalon.vmodels.searchWordNotice.toggleKeyWord();
				//  2023年11月8日 新增热搜词 end
				$scope.rows.clear();
				if(res.datas.length>=1){
				$scope.showNotice=true;
				res['rows']=res.datas;
				for (var index = 0; index < res.rows.length; index++) {
					var element = res.rows[index];
					element['name']=element['wordName'];
					$scope.rows.push(element);
				}
				}
			})
		}

		$scope.getJson=function(callback){
			if(!$scope.searchWord) return;
			if(!$scope.doSearch) return;
			var _xmb_timeStr=new Date().getTime();
			$.post("/ssp/search/api/word?time="+_xmb_timeStr, 
				{
				keyWord: $scope.searchWord,
				pageSize:10,
                //修改此处siteId即可
				siteId: '000000008ab5b860018ab75dc02e0065',
				rows:10,
				},
				function (response, textStatus, jqXHR) {
				callback(response);
				},
				"json"
			);
		}

		$scope.selectWord=function(el){
			$scope.rows.clear();
			$scope.doSearch=false;
			$scope.searchWord=el.name;
		}

		$scope.activeDoSearch=function(){
			$scope.showNotice=true;
			$scope.doSearch=true;
		}
//  2023年11月8日 新增热搜词 begin
		// 回显类型 
		$scope.toggleObj={
			history:true,
			hotWord:true,
			keyWord:false
		}
		// 切换到热搜词显示
		$scope.toggleHotWord=function(){
			$scope.toggleObj.history=true;
			$scope.toggleObj.hotWord=true;
			$scope.toggleObj.keyWord=false;
		}
		// 切换到关键词显示
		$scope.toggleKeyWord=function(){
			$scope.toggleObj.history=false;
			$scope.toggleObj.hotWord=false;
			$scope.toggleObj.keyWord=true;
		}


		// 热词
		$scope.hotWords=[];

		$scope.setDefHotWord=function(){
			$scope.hotWords=[];
			var defHotWordArr=''.split(";");
			var arr_temp=[];
			for (var index = 0; index < defHotWordArr.length; index++) {
				var element = defHotWordArr[index];
				arr_temp.push({
					name:element
				});
			}
			$scope.hotWords=arr_temp;
			if(defHotWordArr.length==1&&!defHotWordArr[0]){
				$scope.getHotWord();
			}
		}


        $scope.getHotWord=function(){
			var _xmb_timeStr=new Date().getTime();
            $.post("/ssp/search/api/hot/word?time="+_xmb_timeStr, 
				{
					//修改此处siteId即可
					siteId: '000000008abc1f0a018acbf5cdbe00f8',
					rows:10,
				},
				function (response, textStatus, jqXHR) {

					response['rows']=[];
				    if(!response.error){
						for (var index = 0; index < response.datas.length; index++) {
							var element = response.datas[index];
							response['rows'].push({
								name:element
							})
						}
						$scope.hotWords=response.rows.slice(0,5);
					}
					if($scope.hotWords.length==0){
						// 默认关键词赋值代码块
					}
			},
				"json"
			);
        }

		$scope.setDefHotWord();
		

//  2023年11月8日 新增热搜词 end
		
});


avalon.vmodels.searchWordNotice.$watch("searchWord",function(n,o){
	if(!n){
		avalon.vmodels.searchWordNotice.rows.clear();
			//  2023年11月8日 新增热搜词 begin
			avalon.vmodels.searchWordNotice.toggleHotWord();
			//  2023年11月8日 新增热搜词 end
		return;
	};
	avalon.vmodels.searchWordNotice.getWordNotice();
})

/*$(document).click(function(e){
	avalon.vmodels.searchWordNotice.showNotice=false;
})*/
$(".search_area .input_inner").blur(function(){
   setTimeout(function(){avalon.vmodels.searchWordNotice.showNotice=false;},800)
   
});


//页面滚动时，头部菜单特效begin
// $(window).scroll(function() {
// 	var ua = navigator.userAgent.toLowerCase();
// 	if(ua.match(/iPad/i)=="ipad" || ua.match(/Mobile/i)=="mobile") {

// 	}
// 	else{
// 		$(this).scrollTop() > 150 ? $(".header").addClass('fixed') : $(".header").removeClass('fixed');
// 		$(this).scrollTop() > 150 ? $('.rig-fix2').show() : $('.rig-fix2').hide();
// 		$(this).scrollTop() > 150 ? $('.page_bg').css({'background-position':'center top'}) : $('.page_bg').css({'background-position':'center 1.28rem'})
// 	}
// });
//页面滚动时，头部菜单特效end

// 主体页面特效切换begin
var ua = navigator.userAgent.toLowerCase();
if(ua.match(/iPad/i)=="ipad" || ua.match(/Mobile/i)=="mobile") {
	$('.out_links li p').click(function(){
		$('body').css({"overflow":"hidden"})
		$(this).next('div').show().css({"position":"fixed"});
		$(this).parent().siblings().find('div').hide().css({"position":"absolute"});
		$('.out_links_bg').show()
		$('.out_links_close').show();
	})
	$('.out_links_close').click(function(){
		$('body').css({"overflow":"inherit"})
		$('.out_links_bg').hide()
		$('.out_links_close').hide();
		$(this).prev('ul').find('div').hide();
	})
}
else{

    $('.out_links>ul>li>p').click(function(){
        var _tempParentNode=$(this).parent();
        if(_tempParentNode.hasClass("on")){
            return false;
        }
        if(!_tempParentNode.hasClass("on")){
            $(this).next('div').slideToggle();
            $(this).parent().addClass("on").siblings().removeClass("on");
            $(this).parent().siblings().find('div').hide();
        }
        return false;
    })

	$(document).click(function(){
		$('.out_links>ul>li').removeClass("on");
		$('.out_links>ul>li>div').hide()
	})

	/*$('.out_links li p').click(function(e){
		e && e.preventDefault();
		$(this).next('div').slideToggle();
		$(this).parent().siblings().find('div').hide();
		return false;
	})
    $(".out_links li p").focus(function(){
        $(this).trigger("click");
    })
*/
}
jQuery(".tabs").each(function(i,o){
	if(!$(o).hasClass("tabs_dynamic")){
		jQuery(this).slide({titCell: ".tabs_hd li", mainCell:".tabs_bd", effect:defaultSuperslideObj.effect, targetCell:".tabs_hd .more a"});
	}
	//优化了tab键访问引导
	var _tempTagId=$(o).attr("id");
	if(!_tempTagId){
		_tempTagId= generateUUID();
		$(o).attr("id",_tempTagId);
		tabWza("#"+_tempTagId, '.tabs_bd .list_base',  '.tabs_hd li')
	}
	//优化了tab键访问引导
})
	/*$('.search_area .input_select>.input_inner').click(function(){
		$('.search_content').slideToggle();
	})*/

	$('.input_select .select_group .input_inner').on('click',function(e){
		if (!$(this).hasClass('curr')) {
			$(this).addClass('curr');
			$(this).next().next(".select_dropdown").slideDown();
		} else {
			$(this).removeClass('curr');
			$(this).next().next(".select_dropdown").slideUp();
		}
		e.stopPropagation();//该方法将停止事件的传播，阻止它被分派到其他 Document 节点
	})
	$('.select_dropdown li').on('click',function(e){
		var _this = $(this);
		$(this).parent().parent().prevAll('.input_inner').attr("value",_this.attr('data-value'));
		$(this).addClass('selected').siblings().removeClass('selected');
		$('.input_dropdown .input_inner').removeClass('on');
		$(".select_dropdown").slideUp();
		e.stopPropagation();
	});
	$(document).bind("click",function(){
		$('.input_dropdown .input_inner').removeClass('on');
		$(".select_dropdown").slideUp();   //点击的不是#selected和它的子元素，隐藏下拉菜单
	})
jQuery(".dropdown_toggle").click(function(){$(".dropdown_menu").slideToggle();});

/* 首页轮播 */	
$(".slideBox_02").slide({ titCell:".num", mainCell:".pic",effect:"left",autoPage:"<li>$</li>", autoPlay:true,trigger:"click"});

/* 轮播--右边切换 */	
$(".tabs_inner").slide({titCell: ".tabs_inner_hd li", mainCell:".tabs_inner_bd", effect:"left"});

/* 重点公开领域 */
$(".icon_list_group_07").slide({titCell:".hd",mainCell:".bd .ulWrap",prevCell:".prev_an",nextCell:".next_an", autoPage:true,effect:"left",pnLoop:"false",autoPlay:false,vis:1});
/* 办事服务 */
$(".sideMen").slide({titCell:"h3", targetCell:"dl",defaultIndex:0,delayTime:300,/* returnDefault:true */});

var w = $(window).innerWidth();
if(w>992){
	if(!$('html').hasClass('slb')){
		$(".piclink_group_08").slide({titCell:".num", mainCell:".bd ul",effect:"left",vis:4,scroll:4,autoPage:"<li></li>",delayTime:800,trigger:"click",pnLoop:false,easing:"easeOutCirc"});
		$(".picture_group_07").slide({ mainCell:".bd ul", effect:"left",vis:4,scroll:1,autoPage:true,delayTime:800,trigger:"click",easing:"easeOutCirc"});
		$(".icon_list_group_01").slide({ mainCell:".bd ul", effect:"left",vis:5,scroll:1,autoPage:true,delayTime:800,trigger:"click",easing:"easeOutCirc"});
		$(".pic_list_group_03").slide({ mainCell:".bd ul", effect:"left",vis:4,scroll:1,autoPage:true,delayTime:800,trigger:"click",easing:"easeOutCirc"});
	}
	else{
		$(".piclink_group_08").slide({titCell:".num", mainCell:".bd ul",effect:"left",vis:2,scroll:2,autoPage:"<li></li>",delayTime:800,trigger:"click",pnLoop:false,easing:"easeOutCirc"});
		$(".picture_group_07").slide({ mainCell:".bd ul", effect:"left",vis:2,scroll:1,autoPage:true,delayTime:800,trigger:"click",easing:"easeOutCirc"});
		$(".icon_list_group_01").slide({ mainCell:".bd ul", effect:"left",vis:2,scroll:1,autoPage:true,delayTime:800,trigger:"click",easing:"easeOutCirc"});
	}

}
else if(w>640 && w<991){
	$(".piclink_group_08").slide({titCell:".num",mainCell:".bd ul", effect:"left",vis:2,scroll:2,autoPage:"<li></li>",delayTime:800,trigger:"click",pnLoop:false,easing:"easeOutCirc"});
	jQuery(".picture_group_07").slide({ mainCell:".bd ul", effect:"left",vis:2,scroll:1,autoPage:true,delayTime:800,trigger:"click",easing:"easeOutCirc"});
	$(".icon_list_group_01").slide({ mainCell:".bd ul", effect:"left",vis:3,scroll:1,autoPage:true,delayTime:800,trigger:"click",easing:"easeOutCirc"});
	$(".pic_list_group_03").slide({ mainCell:".bd ul", effect:"left",vis:2,scroll:1,autoPage:true,delayTime:800,trigger:"click",easing:"easeOutCirc"});
}
else{
	$(".piclink_group_08").slide({titCell:".num",mainCell:".bd ul", effect:"left",vis:1,scroll:1,autoPage:"<li></li>",delayTime:800,trigger:"click",pnLoop:false,easing:"easeOutCirc"});
	jQuery(".picture_group_07").slide({ mainCell:".bd ul", effect:"left",vis:1,scroll:1,autoPage:true,delayTime:800,trigger:"click",easing:"easeOutCirc"});
	$(".icon_list_group_01").slide({ mainCell:".bd ul", effect:"left",vis:1,scroll:1,autoPage:true,delayTime:800,trigger:"click",easing:"easeOutCirc"});
	$(".pic_list_group_03").slide({ mainCell:".bd ul", effect:"left",vis:1,scroll:1,autoPage:true,delayTime:800,trigger:"click",easing:"easeOutCirc"});
}
$(".multipleColumn").slide({titCell:".num",mainCell:".bd .ulWrap", effect:"leftLoop",autoPage:"<li></li>",autoPlay:true,vis:1});
jQuery(".tab_slide").slide({titCell:".tab_base li",mainCell:".tab_base_content"});
jQuery('.leader_more').click(function(){ $(this).next('ul').slideToggle(); });
$('.tree_02 .tree_item>h3,.tree_02 .tree_item li>a').click(function() {
	if(!$(this).parent().hasClass('on')){
		$(this).parent().addClass('on').siblings().removeClass('on').children('ul').slideUp(0);
		$(this).next('ul').slideDown();
	}
	else{
		$(this).parent().removeClass('on').children('ul').slideUp(0);
	}
})
if(w<992){
	$('.tree_02 .tree_icon').click(function(){
		if(!$(this).find('i').hasClass('icon-dacha')){
			$(this).css({"position":"fixed","z-index":1000,"right":".2rem","top":".2rem"})
			$(this).next('ul').css({"right":0});
			$(this).find('i').addClass('icon-dacha');
			$('body').css({"height":'100%','overflow':'hidden'})
		}
		else{
			$(this).css({"position":"absolute","z-index":4,"right":"0rem","top":"0rem"})
			$(this).next('ul').css({"right":"100%"});
			$(this).find('i').removeClass('icon-dacha');
			$('body').removeAttr('style');
		}
	})
	jQuery(".word_group_02").slide({titCell: ".num", mainCell:".bd .ulWrap", effect:"left", delayTime:800,pnLoop:false,autoPage:"<li></li>",trigger:"click",easing:"easeOutCubic" });
	jQuery(".word_group_07").slide({titCell: ".num", mainCell:".bd .ulWrap", effect:"left", delayTime:800,pnLoop:false,autoPage:"<li></li>",trigger:"click",easing:"easeOutCubic" });
}else{
	jQuery(".word_group_02").slide({titCell: ".num", mainCell:".bd .ulWrap", effect:"left",autoPage:"<li></li>",delayTime:800,trigger:"click",easing:"easeOutCirc"});
	jQuery(".word_group_07").slide({titCell: ".num", mainCell:".bd .ulWrap", effect:"left",autoPage:"<li></li>",delayTime:800,trigger:"click",easing:"easeOutCirc"});
}
// 主体页面特效切换begin

//繁体版begin
// -------------- 以下参数大部分可以更改 --------------------
//s = simplified 简体中文 t = traditional 繁体中文 n = normal 正常显示
var zh_default = 'n'; //默认语言，请不要改变
var zh_choose = 'n'; //当前选择
var zh_expires = 7; //cookie过期天数
var zh_class = 'zh_click'; //链接的class名，id为class + s/t/n 之一
var zh_style_active = 'color:#000;'; //当前选择的链接式样
var zh_style_inactive = 'color:#000;'; //非当前选择的链接式样
var zh_browserLang = ''; //浏览器语言
var zh_autoLang_t = true; //浏览器语言为繁体时自动进行操作
var zh_autoLang_s = false; //浏览器语言为简体时自动进行操作
var zh_autoLang_alert = true; //自动操作后是否显示提示消息
//自动操作后的提示消息
var zh_autoLang_msg = '';
var zh_autoLang_checked = 0; //次检测浏览器次数,第一次写cookie为1,提示后为2,今后将不再提示


//判断浏览器语言的正则,ie为小写,ff为大写
var zh_langReg_t = /^zh-tw|zh-hk$/i;
var zh_langReg_s = /^zh-cn$/i;

//简体繁体对照字表,可以自行替换
var zh_s = '皑蔼碍爱翱袄奥坝罢摆败颁办绊帮绑镑谤剥饱宝报鲍辈贝钡狈备惫绷笔毕毙闭边编贬变辩辫鳖瘪濒滨宾摈饼拨钵铂驳卜补参蚕残惭惨灿苍舱仓沧厕侧册测层诧搀掺蝉馋谗缠铲产阐颤场尝长偿肠厂畅钞车彻尘陈衬撑称惩诚骋痴迟驰耻齿炽冲虫宠畴踌筹绸丑橱厨锄雏础储触处传疮闯创锤纯绰辞词赐聪葱囱从丛凑窜错达带贷担单郸掸胆惮诞弹当挡党荡档捣岛祷导盗灯邓敌涤递缔点垫电淀钓调迭谍叠钉顶锭订东动栋冻斗犊独读赌镀锻断缎兑队对吨顿钝夺鹅额讹恶饿儿尔饵贰发罚阀珐矾钒烦范贩饭访纺飞废费纷坟奋愤粪丰枫锋风疯冯缝讽凤肤辐抚辅赋复负讣妇缚该钙盖干赶秆赣冈刚钢纲岗皋镐搁鸽阁铬个给龚宫巩贡钩沟构购够蛊顾剐关观馆惯贯广规硅归龟闺轨诡柜贵刽辊滚锅国过骇韩汉阂鹤贺横轰鸿红后壶护沪户哗华画划话怀坏欢环还缓换唤痪焕涣黄谎挥辉毁贿秽会烩汇讳诲绘荤浑伙获货祸击机积饥讥鸡绩缉极辑级挤几蓟剂济计记际继纪夹荚颊贾钾价驾歼监坚笺间艰缄茧检碱硷拣捡简俭减荐槛鉴践贱见键舰剑饯渐溅涧浆蒋桨奖讲酱胶浇骄娇搅铰矫侥脚饺缴绞轿较秸阶节茎惊经颈静镜径痉竞净纠厩旧驹举据锯惧剧鹃绢杰洁结诫届紧锦仅谨进晋烬尽劲荆觉决诀绝钧军骏开凯颗壳课垦恳抠库裤夸块侩宽矿旷况亏岿窥馈溃扩阔蜡腊莱来赖蓝栏拦篮阑兰澜谰揽览懒缆烂滥捞劳涝乐镭垒类泪篱离里鲤礼丽厉励砾历沥隶俩联莲连镰怜涟帘敛脸链恋炼练粮凉两辆谅疗辽镣猎临邻鳞凛赁龄铃凌灵岭领馏刘龙聋咙笼垄拢陇楼娄搂篓芦卢颅庐炉掳卤虏鲁赂禄录陆驴吕铝侣屡缕虑滤绿峦挛孪滦乱抡轮伦仑沦纶论萝罗逻锣箩骡骆络妈玛码蚂马骂吗买麦卖迈脉瞒馒蛮满谩猫锚铆贸么霉没镁门闷们锰梦谜弥觅绵缅庙灭悯闽鸣铭谬谋亩钠纳难挠脑恼闹馁腻撵捻酿鸟聂啮镊镍柠狞宁拧泞钮纽脓浓农疟诺欧鸥殴呕沤盘庞国爱赔喷鹏骗飘频贫苹凭评泼颇扑铺朴谱脐齐骑岂启气弃讫牵扦钎铅迁签谦钱钳潜浅谴堑枪呛墙蔷强抢锹桥乔侨翘窍窃钦亲轻氢倾顷请庆琼穷趋区躯驱龋颧权劝却鹊让饶扰绕热韧认纫荣绒软锐闰润洒萨鳃赛伞丧骚扫涩杀纱筛晒闪陕赡缮伤赏烧绍赊摄慑设绅审婶肾渗声绳胜圣师狮湿诗尸时蚀实识驶势释饰视试寿兽枢输书赎属术树竖数帅双谁税顺说硕烁丝饲耸怂颂讼诵擞苏诉肃虽绥岁孙损笋缩琐锁獭挞抬摊贪瘫滩坛谭谈叹汤烫涛绦腾誊锑题体屉条贴铁厅听烃铜统头图涂团颓蜕脱鸵驮驼椭洼袜弯湾顽万网韦违围为潍维苇伟伪纬谓卫温闻纹稳问瓮挝蜗涡窝呜钨乌诬无芜吴坞雾务误锡牺袭习铣戏细虾辖峡侠狭厦锨鲜纤咸贤衔闲显险现献县馅羡宪线厢镶乡详响项萧销晓啸蝎协挟携胁谐写泻谢锌衅兴汹锈绣虚嘘须许绪续轩悬选癣绚学勋询寻驯训讯逊压鸦鸭哑亚讶阉烟盐严颜阎艳厌砚彦谚验鸯杨扬疡阳痒养样瑶摇尧遥窑谣药爷页业叶医铱颐遗仪彝蚁艺亿忆义诣议谊译异绎荫阴银饮樱婴鹰应缨莹萤营荧蝇颖哟拥佣痈踊咏涌优忧邮铀犹游诱舆鱼渔娱与屿语吁御狱誉预驭鸳渊辕园员圆缘远愿约跃钥岳粤悦阅云郧匀陨运蕴酝晕韵杂灾载攒暂赞赃脏凿枣灶责择则泽贼赠扎札轧铡闸诈斋债毡盏斩辗崭栈战绽张涨帐账胀赵蛰辙锗这贞针侦诊镇阵挣睁狰帧郑证织职执纸挚掷帜质钟终种肿众诌轴皱昼骤猪诸诛烛瞩嘱贮铸筑驻专砖转赚桩庄装妆壮状锥赘坠缀谆浊兹资渍踪综总纵邹诅组钻致钟么为只凶准启板里雳余链泄';
var zh_t = '皚藹礙愛翺襖奧壩罷擺敗頒辦絆幫綁鎊謗剝飽寶報鮑輩貝鋇狽備憊繃筆畢斃閉邊編貶變辯辮鼈癟瀕濱賓擯餅撥缽鉑駁蔔補參蠶殘慚慘燦蒼艙倉滄廁側冊測層詫攙摻蟬饞讒纏鏟産闡顫場嘗長償腸廠暢鈔車徹塵陳襯撐稱懲誠騁癡遲馳恥齒熾沖蟲寵疇躊籌綢醜櫥廚鋤雛礎儲觸處傳瘡闖創錘純綽辭詞賜聰蔥囪從叢湊竄錯達帶貸擔單鄲撣膽憚誕彈當擋黨蕩檔搗島禱導盜燈鄧敵滌遞締點墊電澱釣調叠諜疊釘頂錠訂東動棟凍鬥犢獨讀賭鍍鍛斷緞兌隊對噸頓鈍奪鵝額訛惡餓兒爾餌貳發罰閥琺礬釩煩範販飯訪紡飛廢費紛墳奮憤糞豐楓鋒風瘋馮縫諷鳳膚輻撫輔賦複負訃婦縛該鈣蓋幹趕稈贛岡剛鋼綱崗臯鎬擱鴿閣鉻個給龔宮鞏貢鈎溝構購夠蠱顧剮關觀館慣貫廣規矽歸龜閨軌詭櫃貴劊輥滾鍋國過駭韓漢閡鶴賀橫轟鴻紅後壺護滬戶嘩華畫劃話懷壞歡環還緩換喚瘓煥渙黃謊揮輝毀賄穢會燴彙諱誨繪葷渾夥獲貨禍擊機積饑譏雞績緝極輯級擠幾薊劑濟計記際繼紀夾莢頰賈鉀價駕殲監堅箋間艱緘繭檢堿鹼揀撿簡儉減薦檻鑒踐賤見鍵艦劍餞漸濺澗漿蔣槳獎講醬膠澆驕嬌攪鉸矯僥腳餃繳絞轎較稭階節莖驚經頸靜鏡徑痙競淨糾廄舊駒舉據鋸懼劇鵑絹傑潔結誡屆緊錦僅謹進晉燼盡勁荊覺決訣絕鈞軍駿開凱顆殼課墾懇摳庫褲誇塊儈寬礦曠況虧巋窺饋潰擴闊蠟臘萊來賴藍欄攔籃闌蘭瀾讕攬覽懶纜爛濫撈勞澇樂鐳壘類淚籬離裏鯉禮麗厲勵礫曆瀝隸倆聯蓮連鐮憐漣簾斂臉鏈戀煉練糧涼兩輛諒療遼鐐獵臨鄰鱗凜賃齡鈴淩靈嶺領餾劉龍聾嚨籠壟攏隴樓婁摟簍蘆盧顱廬爐擄鹵虜魯賂祿錄陸驢呂鋁侶屢縷慮濾綠巒攣孿灤亂掄輪倫侖淪綸論蘿羅邏鑼籮騾駱絡媽瑪碼螞馬罵嗎買麥賣邁脈瞞饅蠻滿謾貓錨鉚貿麽黴沒鎂門悶們錳夢謎彌覓綿緬廟滅憫閩鳴銘謬謀畝鈉納難撓腦惱鬧餒膩攆撚釀鳥聶齧鑷鎳檸獰甯擰濘鈕紐膿濃農瘧諾歐鷗毆嘔漚盤龐國愛賠噴鵬騙飄頻貧蘋憑評潑頗撲鋪樸譜臍齊騎豈啓氣棄訖牽扡釺鉛遷簽謙錢鉗潛淺譴塹槍嗆牆薔強搶鍬橋喬僑翹竅竊欽親輕氫傾頃請慶瓊窮趨區軀驅齲顴權勸卻鵲讓饒擾繞熱韌認紉榮絨軟銳閏潤灑薩鰓賽傘喪騷掃澀殺紗篩曬閃陝贍繕傷賞燒紹賒攝懾設紳審嬸腎滲聲繩勝聖師獅濕詩屍時蝕實識駛勢釋飾視試壽獸樞輸書贖屬術樹豎數帥雙誰稅順說碩爍絲飼聳慫頌訟誦擻蘇訴肅雖綏歲孫損筍縮瑣鎖獺撻擡攤貪癱灘壇譚談歎湯燙濤縧騰謄銻題體屜條貼鐵廳聽烴銅統頭圖塗團頹蛻脫鴕馱駝橢窪襪彎灣頑萬網韋違圍爲濰維葦偉僞緯謂衛溫聞紋穩問甕撾蝸渦窩嗚鎢烏誣無蕪吳塢霧務誤錫犧襲習銑戲細蝦轄峽俠狹廈鍁鮮纖鹹賢銜閑顯險現獻縣餡羨憲線廂鑲鄉詳響項蕭銷曉嘯蠍協挾攜脅諧寫瀉謝鋅釁興洶鏽繡虛噓須許緒續軒懸選癬絢學勳詢尋馴訓訊遜壓鴉鴨啞亞訝閹煙鹽嚴顔閻豔厭硯彥諺驗鴦楊揚瘍陽癢養樣瑤搖堯遙窯謠藥爺頁業葉醫銥頤遺儀彜蟻藝億憶義詣議誼譯異繹蔭陰銀飲櫻嬰鷹應纓瑩螢營熒蠅穎喲擁傭癰踴詠湧優憂郵鈾猶遊誘輿魚漁娛與嶼語籲禦獄譽預馭鴛淵轅園員圓緣遠願約躍鑰嶽粵悅閱雲鄖勻隕運蘊醞暈韻雜災載攢暫贊贓髒鑿棗竈責擇則澤賊贈紮劄軋鍘閘詐齋債氈盞斬輾嶄棧戰綻張漲帳賬脹趙蟄轍鍺這貞針偵診鎮陣掙睜猙幀鄭證織職執紙摯擲幟質鍾終種腫衆謅軸皺晝驟豬諸誅燭矚囑貯鑄築駐專磚轉賺樁莊裝妝壯狀錐贅墜綴諄濁茲資漬蹤綜總縱鄒詛組鑽緻鐘麼為隻兇準啟闆裡靂餘鍊洩';
String.prototype.tran = function () {
    var s1, s2;
    if (zh_choose == 't') {
        s1 = zh_s;
        s2 = zh_t;
    } else if (zh_choose == 's') {
        s1 = zh_t;
        s2 = zh_s;
    } else {
        return this;
    }
    var a = '';
    var l = this.length;
    for (var i = 0; i < this.length; i++) {
        var c = this.charAt(i);
        var p = s1.indexOf(c)
        a += p < 0 ? c : s2.charAt(p);
    }
    return a;
}
function setCookie(name, value) {
    var argv = setCookie.arguments;
    var argc = setCookie.arguments.length;
    var expires = (argc > 2) ? argv[2] : null;
    if (expires != null) {
        var LargeExpDate = new Date();
        LargeExpDate.setTime(LargeExpDate.getTime() + (expires * 1000 * 3600 * 24));
    }
    //document.cookie = name + "=" + escape (value)+((expires == null) ? "" : ("; expires=" +LargeExpDate.toGMTString()));                        //单页面设置cookie
    document.cookie = name + "=" + escape(value) + ((expires == null) ? "" : ("; expires=" + LargeExpDate.toGMTString())) + ";path=/;";               //全站设置cookie
}
function getCookie(Name) {
    var search = Name + "="
    if (document.cookie.length > 0) {
        offset = document.cookie.indexOf(search);
        if (offset != -1) {
            offset += search.length;
            end = document.cookie.indexOf(";", offset);
            if (end == -1) end = document.cookie.length;
            return unescape(document.cookie.substring(offset, end));
        } else {
            return '';
        }
    }
}


function zh_tranBody(obj) {
    document.title = document.title.tran();
    var o = (typeof (obj) == "object") ? obj.childNodes : document.body.childNodes;
    for (var i = 0; i < o.length; i++) {
        var c = o.item(i);
        if ('||BR|HR|TEXTAREA|SCRIPT|'.indexOf("|" + c.tagName + "|") > 0) continue;
        if (c.className == zh_class) {
            if (c.id == zh_class + '_' + zh_choose) {
                c.setAttribute('style', zh_style_active);
                c.style.cssText = zh_style_active;
            } else {
                c.setAttribute('style', zh_style_inactive);
                c.style.cssText = zh_style_inactive;
            }
            continue;
        }
        if (c.title != '' && c.title != null) c.title = (c.title + '').tran();
        if (c.alt != '' && c.alt != null) c.alt = c.alt.tran();
        if (c.tagName == "INPUT" && c.value != '' && c.type != 'text' && c.type != 'hidden' && c.type != 'password') c.value = c.value.tran();
        if (c.nodeType == 3) {
            c.data = c.data.tran();
        } else {
            zh_tranBody(c);
        }
    }
}

function zh_tran(go) {
    if (go) zh_choose = go;
        setCookie('zh_choose', zh_choose, zh_expires);
    if (go == 'n') {
        window.location.reload();
    } else {
        zh_tranBody();
    }
/***************** 2021年10月8日 begin *************************/
    if(zh_choose==="t"){
        $("#zh_click_s").show();
        $("#zh_click_t").hide();
    }
    if(zh_choose==="s"){
        $("#zh_click_t").show();
        $("#zh_click_s").hide();
    }
    /***************** 2021年10月8日 end *************************/
}

function zh_getLang() {
    if (getCookie('zh_choose')) {
        zh_choose = getCookie('zh_choose');
        return true;
    }
    if (!zh_autoLang_t && !zh_autoLang_s) return false;
    if (getCookie('zh_autoLang_checked')) return false;
    if (navigator.language) {
        zh_browserLang = navigator.language;
    } else if (navigator.browserLanguage) {
        zh_browserLang = navigator.browserLanguage;
    }
    if (zh_autoLang_t && zh_langReg_t.test(zh_browserLang)) {
        zh_choose = 't';
    } else if (zh_autoLang_s && zh_langReg_s.test(zh_browserLang)) {
        zh_choose = 's';
    }
    zh_autoLang_checked = 1;
    setCookie('zh_choose', zh_choose, zh_expires);
    if (zh_choose == zh_default) return false;
    return true;
}


function zh_init() {
    zh_getLang();
    c = document.getElementById(zh_class + '_' + zh_choose);
    if (zh_choose != zh_default) {
        if (window.onload) {
            window.onload_before_zh_init = window.onload;
            window.onload = function () {
                zh_tran(zh_choose);
                if (getCookie('zh_autoLang_check')) { alert(zh_autoLang_msg); };
                window.onload_before_zh_init();
            };
        } else {
            window.onload = function () {
                zh_tran(zh_choose);
                if (getCookie('zh_autoLang_check')) { alert(zh_autoLang_msg); };
            };
        }
    }
    /***************** 2021年10月8日 begin *************************/
    if(zh_choose=="t"){
        $("#zh_click_s").show();
    }
    if(zh_choose=="s"||zh_choose=="n"){
        $("#zh_click_t").show();
    }
    /***************** 2021年10月8日 end *************************/
}
zh_init();
//繁体版end