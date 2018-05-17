let channelUrl = 'https://www.twitch.tv/';
let twitchUrl = 'https://wind-bow.glitch.me/twitch-api/streams/';
let callbackUrl = '?callback=?';
let channels = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"];
let flag=0;

$(document).ready(display());

function display(){
	channels.forEach(function(channel){
		var finalUrl=twitchUrl+channel+callbackUrl;
		console.log(finalUrl);
		$.getJSON(finalUrl, channel, function(json){
	var availability=false;
	if(json.stream===null||json.stream===undefined){
		//console.log("offline");
	}else{
		availability=true;
	}
	var logo = "", nameOfChannel = "", nameOfShow = "-";
	if(availability){
		logo = json.stream.channel.logo;
		nameOfChannel = json.stream.channel.display_name;
		nameOfShow = json.stream.game;
	}else{
		logo = "https://is4-ssl.mzstatic.com/image/thumb/Purple118/v4/9f/81/6b/9f816bf4-21bd-e275-40bf-568fee131baf/mzl.spoleoyd.png/1200x630wa.jpg";//TODO: add default icon
		nameOfChannel = channel;
		nameOfShow = "<i>No Show Available</i><br><b>Offline</b>";
	}
	putIntoHTML(logo,nameOfChannel,nameOfShow);
});
	});
}

function putIntoHTML(logo,nameOfChannel,nameOfShow){
	var output1 = document.getElementById("output1");
	var output2 = document.getElementById("output2");
	var HTML = "<a target= \"blank\" href =\""+channelUrl+nameOfChannel+"\"><div class=\"col-md-2 cardView\"><div id=\"image\" class=\"row logo\"><img src=\""+logo+"\"></div> <div class=\"row heading\"><h4>"+nameOfChannel+"</h4></div> <div class=\"row heading\"><h5>"+nameOfShow+"</h5></div> </div></a>"
	flag++;
	if(flag<=4){
		output1.innerHTML+=HTML;
	}else{
		output2.innerHTML+=HTML;
	}
	colouringDiv();
	console.log(flag);
}

function colouringDiv(){
	var colours=["red","green","yellow","blue","pink"];
	var divisions=document.getElementsByClassName('cardView');
	for(var i in divisions){
		console.log(Math.random()*256);
		var r = Math.random()*256;
		var g = Math.random()*256;
		var b = Math.random()*256;
		divisions[i].style.backgroundColor="rgb("+r+","+g+","+b+")";
	}
}

/*
function collectData(channel){
	var finalUrl=twitchUrl+channel+callbackUrl;
	console.log(finalUrl);
	$.getJSON(finalUrl, useAPI);
}

function useAPI(json){
	var availability=false;
	if(json.stream===null||json.stream===undefined){
		//console.log("offline");
	}else{
		availability=true;
	}
	var logo = "", nameOfChannel = "", nameOfShow = "-";
	if(availability){
		logo = json.stream.channel.logo;
		nameOfChannel = json.stream.channel.display_name;
		nameOfShow = json.stream.game;
	}else{
		logo = "";//TODO: add default icon
		nameOfChannel = channel;
		nameOfShow = "<i>No Show Available</i>";
	}
	putIntoHTML(logo,nameOfChannel,nameOfShow);
}
*///In the ForEach function, only IIFE seems to work, and not seperate functions.
