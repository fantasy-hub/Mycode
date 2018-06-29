<template>
	<div class="banner">
        <ul class="clearfix">
            <li><img src="http://cdn.jirengu.com/book.jirengu.com/img/26.jpg" alt=""/>
            	<div class="text-box">
                	<h2>桂林，山美水美人更美</h2>
                    <p>张春丽 / 文</p>
                </div>
            </li>
            <li><img src="http://cdn.jirengu.com/book.jirengu.com/img/25.jpg" alt=""/>
            	<div class="text-box">
                	<h2>清华女博士遭诈骗1800万</h2>
                    <p>王凯歌 / 文</p>
                </div>
            </li>
            <li><img src="http://cdn.jirengu.com/book.jirengu.com/img/24.jpg" alt=""/>
            	<div class="text-box">
                	<h2>你永远不知道花开的名字</h2>
                    <p>邹志凯 / 文</p>
                </div>
            </li>
            <li><img src="http://cdn.jirengu.com/book.jirengu.com/img/23.jpg" alt=""/>
            	<div class="text-box">
                	<h2>弟弟辍学，姐姐一个人担起家里重任</h2>
                    <p>魔礼海 / 文</p>
                </div>
            </li>
        </ul>
        <ol>
            <li class="active"></li>
            <li></li>
            <li></li>
            <li></li>
        </ol>
    </div>
</template>
<script>
	export default {
		mounted(){
			this.fnSlider();
		},
		methods:{
			fnSlider(){
				$(function (){
					var mySwipe=new Swipe($('.banner')[0],{
						auto:2000,
						continuous:true,
						stopPropation:true,
						callback:function (index,element){
							$('.banner ol li').removeClass('active');
							$('.banner ol li').eq(index).addClass('active');
						}
					});
				});
			}
		}
	}
</script>