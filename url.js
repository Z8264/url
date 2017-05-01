

!function(){
	
	window.url={};
	//查询name参数对应的值。
	url.get=function(name,encoded){
		//处理name中带有[]格式的数据名称，避免与正则表达式冲突
		name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
		var regex,results,value;
		regex = new RegExp("[\\?&]" + name + "=([^&#]*)");
		results = regex.exec(location.search);
		//是否存在匹配结果
		if(results!=null){
			//url中+表示空格，处理url中的空格
			value = results[1].replace(/\+/g, " ");
            //是否返回编码值
            value = encoded? value : decodeURIComponent(value);
            return value;
		}

		return undefined;
	}
	//getAll
	url.getAll=function(str){
			
		// if(!location.search) return ;
		
		// var arr = location.search.replace(/^\?/g, "").split('&');
		var arr=str.split('&');
		var data = {};
		var name,value,index;
		for(var i=0;i<arr.length;i++){
			index = arr[i].indexOf('=');
			if(index == -1){
				index = arr[i].length;
				value = true;
			}else{
				value = decodeURIComponent(arr[i].slice(index + 1));
			}
			name=decodeURIComponent(arr[i].slice(0,index));
			if(name){
				data[name]=value;
			}
		}
		return data;
	}

	//hash
	url.hash = function(str){
		if(str === undefined){
			return location.hash.substring(1);
		}else{
			return location.hash=str;
		}
	}
}();