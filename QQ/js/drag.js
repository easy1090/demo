function getByClass(clsName,parent){
	var oParent=parent?document.getElementById(parent):document, //parent为真，则取父元素的id;不为真，则为document。
		eles=[],//因为父元素下有很多的class，所以要建个数组储存。
		elements=oParent.getElementsByTagName('*');

	for (var i = 0; i < elements.length; i++) {
		if(elements[i].className==clsName){
			eles.push(elements[i]);
		}
	}
	return eles;
}

window.onload=drag;

function drag(argument) {
	// body...
	var oTitle=getByClass('login_logo_webqq','loginPanel')[0];
	//拖拽
	oTitle.onmousedown=fnDown;
	//关闭
	var oClose=document.getElementById('ui_boxyClose');
	oClose.onclick=function(){
		document.getElementById('loginPanel').style.display="none";
	}
	//切换状态
	var loginState=document.getElementById('loginState'),
		stateList=document.getElementById('loginStatePanel'),
		lis=stateList.getElementsByTagName('li'),
		stateTxt=document.getElementById('login2qq_state_txt');
		loginStateShow=document.getElementById('loginStateShow');

		loginState.onclick=function(event){
				//阻止冒泡
			event=event||window.event;   
			if (event.stopPropagation) {
				event.stopPropagation();
			}else{
				event.cancelBubble=true;
			}

			stateList.style.display='block';	

	}

	//鼠标滑过，离开和点击状态列表时
	for(var i=0,l=lis.length;i<lis.length;i++){
		lis[i].onmouseover=function(){
			this.style.background='#567';
		}
		lis[i].onmouseout=function(){
			this.style.background='#fff';
		}
		lis[i].onclick=function(event){
			//阻止冒泡
			event=event||window.event;   
			if (event.stopPropagation) {
				event.stopPropagation();
			}else{
				event.cancelBubble=true;
			}

			var id=this.id;
			stateList.style.display='none';
			
			stateTxt.innerHTML=getByClass('stateSelect_text',id)[0].innerHTML;//????????????????为什么是数组？
			loginStateShow.className='login-state-show '+id;
			


		}
	}

	document.onclick=function(){
		stateList.style.display='none';
	}

}

function fnDown(event) {
	// body...
	event=event||window.event;
	var oDrag=document.getElementById('loginPanel');
	//光标按下时，光标和面板之间的距离
	disX=event.clientX-oDrag.offsetLeft,
	disY=event.clientY-oDrag.offsetTop;

	document.title=event.clientY-disY;
	document.onmousemove=function (event) {
		// body...
		
	var	winW=document.documentElement.clientWidth-10||document.body.clientWidth-10,
		winH=document.documentElement.clientHeight||document.body.clientHeight,
		l=event.clientX-disX,
		t=event.clientY-disY;
		maxW=winW-oDrag.offsetWidth,	
		maxH=winH-oDrag.offsetHeight;

		event=event||window.event;
		
		if (l<0) {
			l=0;
		}else if (l>maxW) {
			l=maxW;
		}
			if (t<10) {
			t=10;
		}else if (t>maxH) {
			t=maxH;
		}
		oDrag.style.left=l+'px';
		oDrag.style.top=t+'px';
	}

	document.onmouseup=function(event){
		document.onmousemove=null;
		document.onmouseup=null;
	}
}