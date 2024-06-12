function tabWza(id, className, hdClassName) {
    var $hdLi = $(id).find(hdClassName || '.hd li')
    className = className || '.bd .wza-list'
    var $bdList = $(id).find(className)
    if($bdList.length != $hdLi.length) return;
    $hdLi.each(function(index) {
        var $a = $(this).find('a:eq(0)')
        if($a.length > 0) {
            $a.focus(function(e) {
                e = $(this).mouseover()
                $(this).bind('keydown.wza_tab', function(e) {
                    if(!e.ctrlKey && !e.altKey && e.keyCode === 9) {
                        var $curList = $bdList.eq(index)
                        if($curList.find('a').length < -1) {
                            $hdLi.eq(index + 1).find('a:eq(0)').focus()
                            return false
                        }
                        $curList.find('a:eq(0)').focus()
                        return false
                    }
                })
            })
            $a.blur(function() {
                $(this).unbind('keydown.wza_tab')
            })
        }
    })
    $bdList.each(function(index) {
        if(index + 1 == $bdList.length) return;
        var $curList = $(this)
        var $li = $curList.find('li')
        var endTabLen = $li.length;
        $li.eq(endTabLen - 1).find('a:eq(0)').focus(function() {
            $(this).bind('keydown.wza_tab_leave', function(e) {
                if(!e.ctrlKey && !e.altKey && e.keyCode === 9) {
                    $hdLi.eq(index + 1).find('a:eq(0)').focus()
                    return false;
                }
            })
        })
        $li.eq(endTabLen - 1).find('a:eq(0)').blur(function() {
            $(this).unbind('keydown.wza_tab_leave')
        })
    })
}




function tabWza2($bindId, $firstId, $lastId, callback) {
    $bindId.focus(function(e) {
        e = $(this).mouseover()
        $(this).bind('keydown.wza_tab', function(e) {
            if(!e.ctrlKey && !e.altKey && e.keyCode === 9) {
                if($firstId.length > 0) $firstId.focus()
                return false;
            }
        })
    })
    $bindId.blur(function() {
        $(this).unbind('keydown.wza_tab')
    })
    if(typeof callback != 'function') return
    $lastId.focus(function(e) {
        e = $(this).mouseover()
        $(this).bind('keydown.wza_tab_leave', function(e) {
            if(!e.ctrlKey && !e.altKey && e.keyCode === 9) {
                callback()
                return false
            }
        })
    })
    $lastId.blur(function() {
        $(this).unbind('keydown.wza_tab_leave')
    })
}
function tabWza3($bindId, $nextId) {
    $bindId.focus(function(e) {
        e = $(this).mouseover()
        $(this).bind('keydown.wza_tab_leave', function(e) {
            if(!e.ctrlKey && !e.altKey && e.keyCode === 9) {
                $nextId.focus()
                return false
            }
        })
    })
    $bindId.blur(function() {
        $(this).unbind('keydown.wza_tab_leave')
    })
}

$('input[type="checkbox"]').each(function() {
    var $this = $(this)
    $this.focus(function(e) {
        if($this.is(":hidden")) return;
        $this.bind('keydown.wza', function(e) {
            if(!e.ctrlKey && !e.altKey && !e.shiftKey && e.keyCode == 13) {
                $this.prop('checked', true)
            }
        })
    })
    $this.blur(function(){
        $this.unbind('keydown.wza')
    })
})

/**
 * 2023年4月11日 新增了解绑操作
 * @param {} id tab父节点
 * @param {*} className 切换主体节点元素
 * @param {*} hdClassName 切换导航节点元素
 * @returns 
 */
function unbindTabWza(id, className, hdClassName) {
    var $hdLi = $(id).find(hdClassName || '.hd li')
    className = className || '.bd .wza-list'
    var $bdList = $(id).find(className)
    if($bdList.length != $hdLi.length) return;
    $hdLi.each(function(index) {
        var $a = $(this).find('a:eq(0)')
        if($a.length > 0) {
            $a.unbind("focus");
            $a.unbind("keydown.wza_tab");
            $a.unbind("blur");
        }
    })
    $bdList.each(function(index) {
        if(index + 1 == $bdList.length) return;
        var $curList = $(this)
        var $li = $curList.find('li')
        var endTabLen = $li.length;
        $li.eq(endTabLen - 1).find('a:eq(0)').unbind("focus");
        $li.eq(endTabLen - 1).find('a:eq(0)').unbind("keydown.wza_tab_leave");
        $li.eq(endTabLen - 1).find('a:eq(0)').unbind("blur");
    })
}


/**
 * 2023年4月11日 优化了图片新闻tab切换时导航元素无法及时响应效果
 * @param {*} id    tab父节点
 * @param {*} bdClassName   切换主体节点元素
 * @param {*} hdClassName   切换导航节点元素
 */
function tabWzaForPicList(id, bdClassName, hdClassName) {
    var $bdList = $(id).find(bdClassName);
    $bdList.each(function(index) {
        $(this).find("a").eq(0).blur(function(){
            $(id).find(hdClassName).eq(index+1).trigger("click");
            $(id).find(bdClassName+" a").eq(index+1).focus();
        })
    })
}

/**
 * 2023年4月13日 优化了在线访谈tab键切换引导效果（建议采用wzaTabForIrregularNode，此方法存在局限性）
 * @param {*} idName 
 * @param {*} bdClassName 
 * @param {*} hdClassName 
 */
function wzaTabForFt(idName, bdClassName, hdClassName){
    var $hdLi = $(idName).find(hdClassName || '.tabs_header  li');
    bdClassName = bdClassName || '.tabs_content>div'
    $hdLi.each(function(index_1,o){
        //移除display: none 的节点元素干扰
        $(idName+" "+bdClassName).eq(index_1).find('*[style="display: none;"]').remove();
        $(idName +' '+hdClassName+':eq('+index_1+') a').focus(function(e) {
            $(this).bind('keydown.wza_tab', function(e) {
                if (!e.ctrlKey && !e.altKey && !e.shiftKey && e.keyCode === 9) {
                    var $tabIndex = $(idName+" "+bdClassName).eq(index_1).find('*[tabindex="0"]');
                    if($tabIndex.length > 0) {
                        $tabIndex.eq(0).focus();
                        return false;
                    }
                }
                return true;
            })
        })
        $(idName +' '+hdClassName+':eq('+index_1+') a').blur(function(e) {
            $(this).unbind('keydown.wza_tab');
        })
        if(index_1+1<$hdLi.length){
            $(idName+" "+bdClassName).eq(index_1).find('*[tabindex="0"]').last().bind('keydown.wza_tab',function(e){
                if (!e.ctrlKey && !e.altKey && !e.shiftKey && e.keyCode === 9) {
                    if(avalon.vmodels['tabZxft']){
                        avalon.vmodels.tabZxft.$tog(index_1+1);
                    }
                    $(idName +' '+hdClassName+':eq('+(index_1+1)+') a').focus()
                    return false;
                }
                return true;
            })
        }
    })
}

/**
 * 2023年4月13日 优化了无规则内容块切换引导效果
 * @param {*} idName 
 * @param {*} bdClassName 
 * @param {*} hdClassName 
 */
function wzaTabForIrregularNode(idName, bdClassName, hdClassName,triggerName){
    triggerName=triggerName? triggerName:'click';
    var $hdLi = $(idName).find(hdClassName || '.tabs_header  li');
    bdClassName = bdClassName || '.tabs_content>div'
    $hdLi.each(function(index_1,o){
        //移除display: none 的节点元素干扰
        $(idName+" "+bdClassName).eq(index_1).find('*[style="display: none;"]').remove();
        $(idName +' '+hdClassName+':eq('+index_1+') a').focus(function(e) {
            $(this).bind('keydown.wza_tab', function(e) {
                if (!e.ctrlKey && !e.altKey && !e.shiftKey && e.keyCode === 9) {
                    var $tabIndex = $(idName+" "+bdClassName).eq(index_1).find('*[tabindex="0"]');
                    if($tabIndex.length > 0) {
                        $tabIndex.eq(0).focus();
                        return false;
                    }
                }
                return true;
            })
        })
        $(idName +' '+hdClassName+':eq('+index_1+') a').blur(function(e) {
            $(this).unbind('keydown.wza_tab');
        })
        if(index_1+1<$hdLi.length){
            $(idName+" "+bdClassName).eq(index_1).find('*[tabindex="0"]').last().bind('keydown.wza_tab',function(e){
                if (!e.ctrlKey && !e.altKey && !e.shiftKey && e.keyCode === 9) {
                    //$hdLi[index_1+1].click();
                    //$hdLi.eq(index_1+1).mouseover();
                    $(idName +' '+hdClassName+':eq('+(index_1+1)+') ').trigger(triggerName);
                    $(idName +' '+hdClassName+':eq('+(index_1+1)+') a').focus()
                    return false;
                }
                return true;
            })
        }
    })
}

/**
 * 优化了无障碍模式下radio表单tab键会跳过问题
 * @param {*} className 
 */
function wzaTabForInputRadio(className){
    className=className||'.poll-item-list';
    $(className).each(function() {
        var $this = $(this)
        var $radio = $this.find('input[type="radio"]');
        var len = $radio.length;
        if(len < 1) return true;
        $radio.each(function(index) {
            var $radioThis = $(this)
            if(index === len - 1) return;
            $radioThis.focus(function(e) {
                $radioThis.bind('keydown.wza_tab', function(e) {
                    if(!e.ctrlKey && !e.altKey && e.keyCode === 9) {
                        $radio.eq(index + 1).focus()
                        return false;
                    }
                })
            })
            $radioThis.blur(function() {
                $radioThis.unbind('keydown.wza_ta')
            })
        })
    })
}

/**
 * 生成随机uuid
*/
function generateUUID() {
    var d = new Date().getTime();
    if (typeof performance !== 'undefined' && typeof performance.now === 'function'){
        d += performance.now(); // use high-precision timer if available
    }
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (d + Math.random()*16)%16 | 0;
        d = Math.floor(d/16);
        return (c=='x' ? r : (r&0x3|0x8)).toString(16);
    });
    return uuid;
}



