function commonColor(a){var b=/^#?([a-f\d])([a-f\d])([a-f\d])$/i;a=a.replace(b,function(a,b,c,d){return b+b+c+c+d+d});var c=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(a);return parseInt(c[1],16)+","+parseInt(c[2],16)+","+parseInt(c[3],16)}function ColorLuminance(a,b){a=String(a).replace(/[^0-9a-f]/gi,""),a.length<6&&(a=a[0]+a[0]+a[1]+a[1]+a[2]+a[2]),b=b||0;var c,d,e="#";for(d=0;3>d;d++)c=parseInt(a.substr(2*d,2),16),c=Math.round(Math.min(Math.max(0,c+c*b),255)).toString(16),e+=("00"+c).substr(c.length);return e}$("button[material]").each(function(){$(this).attr("class","material");var a=$(this).attr("material"),b=$(this).attr("color"),c=!1;if(a)c||($(this).css("background-color","rgb("+commonColor(a)+")"),$(this).css("border-bottom","2px solid rgb("+commonColor(ColorLuminance(a,-.15))+")"),b?$(this).css("color",b):$(this).css("color","#FFF"));else{var a="#AAA";$(this).css("background-color","rgb("+commonColor(a)+")"),$(this).css("border-bottom","2px solid rgb("+commonColor(ColorLuminance(a,-.15))+")")}var d=$(this).attr("raised");"undefined"!=typeof d&&d!==!1&&0!=d&&$(this).css({"box-shadow":"0px "+2*d+"px "+5*d+"px #888"})}),$("button.material").click(function(a){var b=$(this).offset().left,c=$(this).offset().top,d=$(this).width(),e=$(this).height();$(this).prepend("<span class='ripple'></span>"),d>=e?e=d:d=e;var f=a.pageX-b-d/2,g=a.pageY-c-e/2;$(".ripple").css({width:d,height:e,top:g+"px",left:f+"px"}).addClass("rippleEffect")});
$("#term")
.focus(function(){
	$(this).animate({
		borderColor: "#00bcd4"
	},250)
})
.blur(function(){
	$(this).animate({
		borderColor: "#AAA"
	},250)
})
var mvts = "";
$("#go")
.click(function(){
	mvts = $("#term").val()
	$("div.a").remove()
	$("div.wave").animate({
		height: "100%"
	}, 250, function(){
		$("div.wave").animate({
			top: "100%",
			bottom: "0"
		})
		$("div.wave").animate({
			height: "0%"
		});
		$("div.b").fadeIn(200)
	})
	go()
})
function go(){
	var canvas = document.querySelector(".preview");
	var ctx = canvas.getContext("2d");
	var x = intr(0,5)+1;
	x = "a:b:c:d:e:f".split(":")[x].toString();
	
	ctx.font = "42px Calibri";
	ctx.fillStyle = "black";
	ctx.fillText(mvts.toProperCase(), 20,50); 
	ctx.font = "28px Calibri";
	ctx.fillStyle = "black";
	
	var txt = eval("sci." + mvts.toUpperCase() + "." + x + ".txt")
	var imguri = eval("sci." + mvts.toUpperCase() + "." + x + ".img")
	
	ctx.fillText(txt, 20, canvas.height/2); 
	
	var img = new Image();
	img.onload = function() {
		ctx.drawImage(img, canvas.width - 400, canvas.height - 400);
	};
	img.src = imguri;
}
function copy(){
	var canvas = document.querySelector(".preview");
	var data = canvas.toDataURL('image/png');
	copyImage(data)
}
function intr(min,max){
	return Math.floor(Math.random()*(max-min+1)+min); 
}
function copyImage(url){
	try{
		var img = document.createElement('img');
		img.src = url;
		document.body.appendChild(img);
		var r = document.createRange();
		r.setStartBefore(img);
		r.setEndAfter(img);
		r.selectNode(img);
		var sel = window.getSelection();
		sel.addRange(r);
		document.execCommand('copy');
		img.remove();
	} catch (e) {
		alert("Error: Could not copy images:  ")
	}
}