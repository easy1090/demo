
//因为scipte写在文档底部  其实$(document).ready可以不写的
$(document).ready(function(){
  var container= $(".container"),
  	  ul=container.find(".inner"),
  	  nav =container.find(".nav span"),
  	  eachWidth=ul.find("li").eq(0).width(),
  	  timer=null;
  	  iNow = 0;


//鼠标在图片上时候停止,鼠标移出时候自动播放
	container.hover(function(){  //$(selector).hover(inFunction,outFunction)
		clearInterval(timer);
	},Autoplay);


	//点击切换
	  	  nav.on('click',function(){
	  	  	
	  	  	var me=$(this),
	  	  		index =me.index();//获得第一个匹配元素相对于其同胞元素的 index 位置。

	  	  		iNow=index;
	  	  	
	  	  	ul.animate({
	  	  		"left":-eachWidth*iNow
	  	  	})

	  	  	nav.removeClass("active");
	  	  	me.addClass('active');  	 	
	  	  });


	//自动切换

	Autoplay();
	function Autoplay(){
		var tag=0;
		timer =setInterval(function(){
			ul.animate({
				'margin-left':'-'+eachWidth+'px'

			},'slow',
			function(){
				tag++;
				if(tag>=ul.children('li').length){tag=0;}
				$('.nav').children('span').eq(tag-1).removeClass("active");
				$('.nav').children('span').eq(tag).addClass("active");
				var me=ul.children('li').first();
				var lastone=ul.children('li').last();
				ul.css({'margin-left':0}).children('li').last().after(
					ul.children('li').first()
					);



			}
			);

		},3000);
	}

});


