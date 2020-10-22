//创建一个服务器http://127.0.0.1:3000
var app = require('http').createServer();//引入http模块，并创建
var io = require('socket.io')(app);//引入socket.io模块
var PORT = 3000;//端口
var people= 0;//在线人数，0是客服
var users=[];
var userid=''
var i=0;
var server=''
app.listen(PORT);//监听
var aa=0
var bb=[];
io.on('connection',function(socket){
	var user='用户'
	people++;


    //小程序连接成功后emit发送消息(显示在页面)
	socket.on('message2',function(ss){     
		var a=0;
		io.emit('message3',ss);
		socket.nickname = ss;
		for(var j=0;j<=users.length;j++){
			if(users[j]==ss){
				a++;
			}
		}
		if(a==0){
			users.push(ss);
		}
		io.emit("people",users.length);	
		console.log(users)
		io.emit('userArr',users);
		userid=ss;
	})

    //客服上线emit发送消息(显示在页面)
	socket.on('kfenter',function(zz){
		//io.emit('message3'," 欢迎"+zz);        
		io.emit('message22'," 欢迎"+zz);
		bb.push(zz);
		if(bb.length>=2){
           io.emit('aa',1);
		}
		if(users[0]){
			io.emit('message3',users[0]);
		}
		socket.nickname=zz;
		server=zz;
		io.emit("ed",users);
	})

//接受用户(小程序)的话   显示在页面端
	socket.on('message',function(str){          
		// console.log(str)
		if(str.nameid == users[0]){
			//io.emit('message',socket.nickname+' 说: '+str.body);
			io.emit('message11',str);
		}else{
			var dui=users.length-1;
				io.emit('message4',users)
		}	

	})

//客服的话发送给用户(小程序)    显示在小程序和页面两端
	socket.on('message1',function(str){               
		// console.log(str)
		// console.log(str.userid)
		// console.log(str.body1)
		if(str.userid==users[0]){
			io.emit('message1',str)
		}
	})

//(显示在页面)
	socket.on('disconnect',function(){                   
		io.emit('left',socket.nickname)
		if(socket.nickname==server){
			bb.pop();
		}else{
			for(var j=0;j<users.length;j++){
				if(users[j]==socket.nickname){
					for(var k=j;k<users.length;k++){
						if(users[k+1]){
							users[k]=users[k+1];
						}else{
							users[k]={};
							users.pop();
						}
						
					}
					
				}
			}
		}
		// console.log(users)
		people--;
	})
})

console.log("正在监听:"+PORT)