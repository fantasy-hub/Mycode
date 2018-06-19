/*瀑布流组件
此对象编程方法入口在start
waterFall.init($('#pic-ct'));
$ct即$('#pic-ct')*/
var waterFall = {

    //初始高度 [0,0,0,0]
    //加载后高度 [20, 10, 30, 15]

    // arrColHeight: [],

    init: function ($ct) {
        //绑定属性
        this.$ct = $ct;
        this.arrColHeight = [];

        //调用方法bind(); start();
        this.bind();
        this.start();
    },

    bind: function () {
        var me = this;
        //当窗口变化，执行waterFall.start();
        $(window).on('resize', function () {
            me.start();
        });
    },

    start: function ($nodes) {
        var me = this;
        this.$items = this.$ct.find('.item');  //找li元素
        if (this.$items.length === 0) return;  //return出(undefined true false number)会终止函数的执行
        this.$ctWidth = this.$ct.width();  //得到$ct的宽度
        this.itemWidth = this.$items.outerWidth(true);  //得到li的宽度。outerWidth(true)是含外边距和边框的宽度
        this.colNum = Math.floor(this.$ctWidth / this.itemWidth);  //计算一行能放下几个li
        this.$ctWidth = this.$ct.width(this.itemWidth * this.colNum);  //用li的宽度 * 个数，重新计算$ct的宽度
        //如果li元素高度有0个 或 未传入$nodes节点。任一为真
        if (this.arrColHeight.length === 0 || !$nodes) {
            //执行初始化高度0操作 [0,0,0,0]
            this.arrColHeight = [];
            for (var i = 0; i < this.colNum; i++) {
                this.arrColHeight[i] = 0;
            }
        }

        if ($nodes) {
            console.log(this.arrColHeight.length);
            $nodes.each(function () {  //取得到的所有节点进行遍历
                var $item = $(this);
                // console.log($item);
                $item.find('img').on('load', function () {  //当所有子元素已经被完全加载完成时，load事件被发送到这个元素
                    me.placeItem($item);
                    //传null或undefined时，将是JS执行环境的全局变量。浏览器中是window，其它环境（如node）则是global。
                    me.$ct.height(Math.max.apply(this, me.arrColHeight));
                });
            });
        } else {
            this.$items.each(function () {
                var $item = $(this);
                me.placeItem($item);
            });
            console.log(me.arrColHeight);
            me.$ct.height(Math.max.apply(this, me.arrColHeight));
        }

    },

    placeItem: function ($el) {
        var obj = this.getIndexOfMin(this.arrColHeight),
            idx = obj.idx,
            min = obj.min;
        $el.css({
            left: idx * this.itemWidth,  //li宽度*索引 得到向右偏移位置
            top: min  //
        });
        this.arrColHeight[idx] += $el.outerHeight(true);
    },

    getIndexOfMin: function (arr) {
        //声明第0位，声明最小高度是0
        var idx = 0,
            min = arr[0];
        for (var i = 0; i < arr.length; i++) {
            if (arr[i] < min) {
                idx = i;
                min = arr[i];
            }
        }
        return { min: min, idx: idx };
    }
}