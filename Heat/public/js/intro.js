var titleDiv = d3.select(".intro").append("div").attr("class", "intro_text");
var imgDiv = d3.select(".intro").append("div").attr("class", "intro_img");

var title = titleDiv.append("text").attr("class", "title")
	.html("<h2>Take Our <br><span>Extreme Heat</span><br>Safety Quiz!</h2>");
var subtitle = titleDiv.append("text").attr("class", "subtitle")
	.html("<h4>As our climate changes, we can expect to see heat waves that are hotter, \
        longer and more frequent. Press <span class='start2'>start</span> to test your knowledge on how to stay safe when it’s hot. </h4>");

var ac = imgDiv.append("div").attr("class", "ac")
	.html("<img src='public/images/ac.png' align='middle'>");

var startButton = ac.append("div").attr("class", "start")
	.html("START");

$(".start, .start2").on("click", function(e){
	e.preventDefault();
	var height = $(".intro").height() + 70;
	// var height = "1100px";
	$("html, body").animate({
		scrollTop: height,
		complete: function(){
		}
	}, 1400);
});






