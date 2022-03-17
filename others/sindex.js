//document.write('<p>username</p><input id="username" placeholder="请输入用户名,lenth<=9" type="username" name="username" maxlength=9/><br/><p>password</p><input id="password" type="password" placeholder="亲输入密码" name="password" /><br/><input type="submit" value="登录" onclick="hold()"/><br/>');

//var name = document.getElementById("Name").innerHTML;
//var password = document.getElementById("Password").innerHTML;
function first(){
	var name = "用户名";
	var password = "密码";
	document.getElementById("Name").innerHTML=name;
	document.getElementById("Password").innerHTML=password;
	//var names = document.getElementById("Names").innerHTML;
	//var passwords = document.getElementById("Passwords").innerHTML;
	var names = '<input id="username" placeholder="请输入用户名,lenth<=9" type="username" name="username" maxlength=9/>';
	var passwords = '<input id="password" type="password" placeholder="请输入密码" name="password" />'
	document.getElementById("Names").innerHTML=names;
	document.getElementById("Passwords").innerHTML=passwords;
	var bo = '<input type="submit" value="登录" onclick="hold()"/>';
	document.getElementById("button").innerHTML=bo;
}
function checkpassworld(x){
	var userName = document.getElementById("username").value;
	var userPassworld = document.getElementById("password").value;
	if(userName=="不要看不存在的风景"&&userPassworld=="不要想不存在的人"){//你能看到这里？哈哈，就是简单的前端加密。
		linkjump("indexx.html");
	}
	else if(x<18){
		output("密码错误!!!")
	}
	else {
		linkjump("indexx.html");
	}
}
function linkjump(str){
	window.location.href=str;
}
function output(str){
	window.alert(str);
}
function hold(){
	var x=document.getElementById("n").innerHTML;
	x++;
	document.getElementById("n").innerHTML=x;
	checkpassworld(x);
}