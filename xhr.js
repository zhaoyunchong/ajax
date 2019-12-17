const ajax=function(options={}){
	options.type=(options.type||"GET").toUpperCase();//toUpperCase 转换成大写
	let data=[];
	for(let i in options.data){
		data.push(encodeURIComponent(i)+'='+encodeURIComponent(options.data[i]));
	}
	data.join('&');
	var xhr=new XMLHttpRequest();
	xhr.onreadystatechange=function(){
		if(xhr.readyState==4){
			const status=xhr.status;
			if(status>=200&&status<300){
				var result=options.success&&options.success(JSON.parse(xhr.responseText),xhr.responseXML);
				return result;
			}else{
				options.error&&options.error(status);
			}
		}
	}
	if(options.type=='GET'){
		xhr.open('GET',options.url+'?'+data,true)
		xhr.send(null);
	}else if(options.type=='POST'){
		xhr.open('POST',options.url,true);
		xhr.setRequestHeader('Context-Type','application/x-www-form-urlencoded');
		xhr.send(data);
	}
}