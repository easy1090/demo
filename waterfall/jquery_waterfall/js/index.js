$(window).on("load",function(){
waterfall('main','pin');
var dataArr={data:[{'src':'0.jpg'},{'src':'1.jpg'},{'src':'2.jpg'},{'src':'3.jpg'},{'src':'4.jpg'},{'src':'5.jpg'},{'src':'6.jpg'},{'src':'7.jpg'},{'src':'8.jpg'},{'src':'9.jpg'},{'src':'10.jpg'}]}
window.onscroll=function(){
	if(checkOnscorll()){
		$.each(dataArr.data,function (index,value) {
		// body...
	var oPin=$('<div>').addClass('pin').appendTo('#main'),
		oBox=$('<div>').addClass('box').appendTo(oPin),
		oImg=$('<img>').attr('src','./images/'+$(value).attr('src')).appendTo(oBox);

		waterfall('main','pin');
		})
}
};
})

/*waterfall函数：将图片改为瀑布流式分布。parent：父亲id；pin：元素class；*/
function waterfall(parent,pin) {
	// body...

	var oMain=$('#'+parent),
		pinLis=$('#main>div'),
		oPinWid = pinLis.eq(0).outerWidth();

	var cols = Math.floor($(window).width()/oPinWid),
		heightArr=[];
	
	oMain.css({
		'width':oPinWid*cols,
		  'margin': '0 auto'
	});
	
	pinLis.each(function(index,value){
		var heightOne=pinLis.eq(index).outerHeight();
		
		if (index<cols) {
			heightArr[index]=heightOne;
		
		}else{
			var minH=Math.min.apply(null,heightArr);
			var minIn=$.inArray(minH,heightArr);
			$(value).css({
				'position':'absolute',
				'top':minH,
				'left':pinLis.eq(minIn).position().left
				
			});

			heightArr[minIn]=minH+pinLis.eq(index).outerHeight();
		}
		}	
	)

}

function checkOnscorll(){//pin：元素的class；
	var lastPinH=$('#main>div').last().get(0).offsetTop+(Math.floor($('#main>div').last().height()/2)),
		scrollH=$(window).scrollTop(),
		winH=$(document).width();

	 return (lastPinH < scrollH + winH ) ? true : false;
}