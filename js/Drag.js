var box=document.getElementById("box");
	
document.onmousemove=function(ev){
	cursor(ev);
}
	
box.onmousedown=function(ev){
	//鼠标按下时的起始坐标
	var x=ev.clientX;
	var y=ev.clientY;
	//鼠标按下时起始坐标与box最外层的坐标差
	var disX=ev.clientX-getPos(box).left;
	var disY=ev.clientY-getPos(box).top;
	//鼠标按下时box的width、height、left、top
	var w=box.clientWidth;
	var h=box.clientHeight;
	var l=box.style.left;
	var t=box.style.top;
	var minSize=100;
	document.onmousemove=function(ev){
		var newWidth;
		var newHeight;
		var newLeft;
		var newTop;
		
		//上
		if(box.style.cursor=='n-resize'){
			newHeight=h-(ev.clientY-y);
			if(newHeight>minSize){
				newTop=ev.clientY-disY;
			}
		}
		//右
		if(box.style.cursor=='e-resize'){
			newWidth=w+(ev.clientX-x);
			newLeft=l;
		}
		//下
		if(box.style.cursor=='s-resize'){
			newHeight=h+(ev.clientY-y);
			newTop=t;
		}
		//左
		if(box.style.cursor=='w-resize'){
			newWidth=w-(ev.clientX-x);
			if(newWidth>minSize){
				newLeft=ev.clientX-disX;
			}					
		}
		//右上
		if(box.style.cursor=='ne-resize'){
			newWidth=w+(ev.clientX-x);
			newHeight=h-(ev.clientY-y);
			newLeft=l;
			if(newHeight>minSize){
				newTop=ev.clientY-disY;
			}
		}
		//右下
		if(box.style.cursor=='se-resize'){
			newWidth=w+(ev.clientX-x);
			newHeight=h+(ev.clientY-y);
			newLeft=l;
			newTop=t;
		}
		//左下
		if(box.style.cursor=='sw-resize'){
			newWidth=w-(ev.clientX-x);
			newHeight=h+(ev.clientY-y);
			if(newWidth>minSize){
				newLeft=ev.clientX-disX;
			}
			newTop=t;
		}
		//左上
		if(box.style.cursor=='nw-resize'){
			newWidth=w-(ev.clientX-x);
			newHeight=h-(ev.clientY-y);
			if(newWidth>minSize){
				newLeft=ev.clientX-disX;
			}
			if(newHeight>minSize){
				newTop=ev.clientY-disY;
			}
		}
		newWidth=newWidth<minSize?minSize:newWidth;
		newHeight=newHeight<minSize?minSize:newHeight;
		
		box.style.width=newWidth+'px';
		box.style.height=newHeight+'px';
		box.style.left=newLeft+'px';
		box.style.top=newTop+'px';
		
		//拖拽
		if(box.style.cursor==''){
			box.style.left=ev.clientX-disX+'px';
			box.style.top=ev.clientY-disY+'px';
		}
		
	}
	document.onmouseup=function(){
		document.onmousemove=function(ev){
			cursor(ev);
		}
	}
	return false;
}
	
function cursor(event){
	box.style.cursor='';
	var disX=event.clientX;
	var disY=event.clientY;
	var w=box.clientWidth;
	var h=box.clientHeight;
	var borderWidth=1/2*(box.offsetHeight-box.clientHeight);
	
	var disTop=Math.abs(getPos(box).top-disY);
	var disRight=Math.abs(getPos(box).right-disX);
	var disBottom=Math.abs(getPos(box).bottom-disY);
	var disLeft=Math.abs(getPos(box).left-disX);
	
	box.style.cursor=disTop<=borderWidth?'n-resize':box.style.cursor;								//上
	box.style.cursor=disRight<=borderWidth?'e-resize':box.style.cursor;								//右
	box.style.cursor=disBottom<=borderWidth?'s-resize':box.style.cursor;							//下
	box.style.cursor=disLeft<=borderWidth?'w-resize':box.style.cursor;								//左
	box.style.cursor=disRight<=borderWidth&&disTop<=borderWidth?'ne-resize':box.style.cursor;		//右上
	box.style.cursor=disRight<=borderWidth&&disBottom<=borderWidth?'se-resize':box.style.cursor;	//右下
	box.style.cursor=disLeft<=borderWidth&&disBottom<=borderWidth?'sw-resize':box.style.cursor;		//左下
	box.style.cursor=disLeft<=borderWidth&&disTop<=borderWidth?'nw-resize':box.style.cursor;		//左上			
}

function getPos(obj){
	return obj.getBoundingClientRect();
}