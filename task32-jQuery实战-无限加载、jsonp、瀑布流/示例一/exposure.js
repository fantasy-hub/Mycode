/*曝光组件
用于初始化#load元素
调用方式：Exposure.init($('#load'), function(){});
*/
var Exposure = {
    //$target即传入的#load标记位
    init: function ($target, handler) {
        //绑定属性
        this.$c = $(window);
        this.$target = $target;
        this.handler = handler;
        console.log($target); //传入的$('#load')的jquery对象。init [div#load, context: document, selector: "#load"]
        console.log(this);  //Exposure对象

        //调用方法bind(); checkShow();
        this.bind();
        this.checkShow();
    },

    bind: function () {

        var me = this,
            timer = null,
            interval = 100;
        console.log(me); //Exposure对象

        $(window).on('scroll', function (e) {
            timer && clearTimeout(timer);
            timer = setTimeout(function () {
                me.checkShow();
            }, interval);
        });

    },

    //当滚动窗口时检查$target是否存在
    checkShow: function () {

        var me = this;
        console.log(me); //Exposure对象

        //this.$target 调用each();方法  
        this.$target.each(function () {
            console.log(this); //$target 即Dom节点：<div id="load">隐藏标记位</div>

            var $cur = $(this);
            console.log($cur); //将Dom节点转换成jquery对象。init [div#load, context: div#load]
            if (me.isShow($cur)) {
                /*&& 符号前面的意思是检验me.handler是否存在。
                如果存在，就在当前(this)作用域执行me.handler，传入参数this*/
                me.handler && me.handler.call(this, this);
                // $cur.data('loaded', true);
            }
        });
    },

    isShow: function ($el) {

        var scrollH = this.$c.scrollTop(),
            winH = this.$c.height(),
            top = $el.offset().top;

        if (top < winH + scrollH) {
            return true;
        } else {
            return false;
        }
    }

    // hasLoaded: function ($el) {
    //     if ($el.data('loaded')) {
    //         return true;
    //     } else {
    //         return false;
    //     }
    // }

}