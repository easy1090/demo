(function (argument) {
	// body...
	var store= localStorage;
	function save(){
		var user_name=document.querySelector('.user_name'),
			user_tel = document.querySelector('.user_tel'),
			user_com=document.querySelector('.user_company'),
			obj={},
			savebtn=document.querySelector('.btnSave');

			savebtn.addEventListener("click",function(){
				var value;
					obj.name=user_name.value;
					obj.tel=user_tel.value;
					obj.com=user_com.value;
					value=JSON.stringify(obj);
					
				if (user_name.value!==""&&user_tel.value!==""&&user_com.value!=="") {
					
					store.setItem(obj.tel,value);

					alert('创建成功');
					setTimeout(function(){
						user_name.value="";
						user_tel.value="";
						user_com.value="";},
						100
						);
					
				}else{
					alert("请写完整。");
				}
			},false);


	}


	function findone(){
		var findname=document.querySelector('.findName'),
			findone=document.querySelector('.findOne'),
			showmsg = document.querySelector('.showMsg'),
			telnumber = document.querySelector('.telNumber'),
			delbtn = document.querySelector('.deleteBtn'),
			telname = document.querySelector('.telName');
		

		findone.addEventListener('click',function(){
			var number=findname.value;
			if (findname.value!=='') {
				obj = JSON.parse(store.getItem(number));

				if (obj) {
					showmsg.style.display='block';
					delbtn.style.display='block';
					telnumber.innerHTML = number;
					telname.innerHTML = obj.name;
					
				}else{
					alert('查无此人！！');
				}
			}else{
					alert('请输入要查询人的电话号码');
				}
		})

		findname.addEventListener('focus',function(){
			showmsg.style.display='none';
			findname.value='';
		});
	}


	function showMsg(){
		var showbtn=document.querySelector('.showBtn'),
			tbody = document.querySelector('tbody'),
			key ,
			obj ,
			str = '';

		showbtn.addEventListener('click',function(){
			var len = store.length;
			if (len>0) {
				for (var i = 0; i < len; i++) {
					
					 key = store.key(i);
					 
					 obj = JSON.parse(store.getItem(key));
					 str +=`<tr><td>${obj.name}</td><td>${obj.tel}</td><td>${obj.com}</td></tr>`;
					 tbody.innerHTML = str; 
				}
				 
				str = '';
			}else{
				alert('请先创建联系人');
			}
		},false);
			

	}


	function hidden(){
		var hiddenbtn = document.querySelector('.hiddenBtn'),
			tbody = document.querySelector('tbody');

		hiddenbtn.addEventListener('click',function(){
			tbody.innerHTML='';
		},false);
	

	}

	function remove(){
		var delbtn = document.querySelector('.deleteBtn'),
			user_tel = document.querySelector('.findName'),
			delkey = '',
			str = ''
			key='',
			obj='',
			tbody = document.querySelector('tbody'),
			showmsg = document.querySelector('.showMsg');

		delbtn.addEventListener('click',function(){
			delkey = user_tel.value;
			alert(user_tel.value);
			store.removeItem(delkey);
			var len = store.length;
			if (len>0) {
				for (var i = 0; i < len; i++) {
					
					 key = store.key(i);
					 
					 obj = JSON.parse(store.getItem(key));
					 str +=`<tr><td>${obj.name}</td><td>${obj.tel}</td><td>${obj.com}</td></tr>`;
					 tbody.innerHTML = str; 
				}
				 
				str = '';
			}else{tbody.innerHTML='';}
			showmsg.style.display='none';
			delbtn.style.display='none';
			user_tel.value='';
		},false);
	}

	function delall(){
		var delall_btn=document.querySelector('.delallBtn'),
			str = ''
			key='',
			obj='',
			tbody = document.querySelector('tbody');

		delall_btn.addEventListener('click',function(){
		
			var len = store.length;
			if (len>0) {

				for (var i = 0; i < len; i++) {
					key = store.key(i);
					store.removeItem(key); 
				}

			tbody.innerHTML = '';
			}
			else{alert('并没有联系人')}
		},false);
	}
	save();
	findone();
	showMsg();
	hidden();
	remove();
	delall();

})()
