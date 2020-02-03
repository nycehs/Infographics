
var scoreArray = [], qCount = 0;

function Question(num, answer, desc){
	this.q_div = d3.select(".q");
	this.q_num = num;
	this.answer = answer;
	this.desc = desc;
	this.q_div.append("div").attr("class", "instanceDiv question" + this.q_num);
}

Question.prototype.appendNum = function(){
	d3.select(".question"+this.q_num + "")
		.append("div").attr("class", "q_num")
		.text("Question " + this.q_num + " of 5")
		.attr("class", "questionNum");
}

Question.prototype.appendQ = function(text){
	d3.select(".question"+this.q_num + "")
		.append("div").attr("class", "question q" + this.q_num)
		.text(text);
}
var counter = 0;
Question.prototype.appendAnswers = function(id, text){
	var answer = d3.select(".question"+this.q_num + "")
		.append("div").attr("class", "answers")
		.attr("id", id).text(text);

	var q_num = this.q_num;
	var score = 0;
	var correctAnswer = this.answer, descText = this.desc, 
		timesIcon = "<i class='fa fa-times' aria-hidden='true'></i> ",
		checkIcon = "<i class='fa fa-check' aria-hidden='true'></i> ";

	answer.on("mouseover", function(){ $(this).addClass("hovered"); });
	answer.on("mouseout", function(){ $(this).removeClass("hovered"); });	
	answer.on("click", function (e) {
         //changed
	      counter = counter + 1;
	     //changed end
		$(this).addClass("click-tracking").attr("data-action", "answers").attr("data-label", "answer clicked"); // analytics???
		if (this.id === correctAnswer) {
		    //changed
		    _gaq.push(['_trackEvent', 'Answer', 'Correct', 'Heat']);
		    //changed end
			clickEventAddStyle($(this), "correct", checkIcon);
			clickEventAddDesc($(this), descText);
			d3.select("#graph" + q_num).style("display", "block");
			score = 1;
		} 
		else {
		    //changed
		    _gaq.push(['_trackEvent', 'Answer', 'Incorrect', 'Heat']);
		    //changed end
			// if user selects a wrong answer, addClass("incorrect") to that div
			clickEventAddStyle($(this), "incorrect", timesIcon);			

			// ...and find the correctAnswer div and addClass("correct") to that div
			var correct = $(this).siblings("#" + correctAnswer);
			clickEventAddStyle(correct, "correct", checkIcon)
			clickEventAddDesc(correct, descText);
			d3.select("#graph" + q_num).style("display", "block");
			score = 0;
		}

		// deactivate click event
		$(this).addClass("deactivate");
		$(this).siblings(".answers").addClass("deactivate");
	    //changed
		if (counter == 5)
		{
		    _gaq.push(['_trackEvent', 'Answer', 'Finish', 'Heat']);
		}
	    //changed end
		// get the score
		scoreArray.push(score);
		var totalScore = scoreArray.reduce(function(a, b){ return a + b; });
		// var points = Math.round(100 / qCount); 
		// $(".your-score").text((totalScore * points));
		$(".your-score").html((totalScore + " of " + qCount));
		if(totalScore >= 4) $(".message").html("<span>Great job!</span><br>You know a lot about staying safe in extreme summer heat!");
		else if(totalScore === 3) $(".message").html("<span>Well done!</span><br>You now know more about how to stay safe in extreme summer heat!");
		else $(".message").html("<span>Good try!</span><br>You now know more about how to stay safe in extreme summer heat!");
	});

}

function clickEventAddStyle(element, style, icon){
	element.addClass(style);
	element.html(icon + " " + element.html());
}

function clickEventAddDesc(element, desc){
	// assuming there are always 3 answer choices (a, b, c)
	if((element).attr("id") === "c") element.after("<div class='desc'>" + desc + "</div>");
	else element.siblings("#c").after("<div class='desc'>" + desc + "</div>");
}

Question.prototype.appendGraph = function(){
	d3.select(".question"+this.q_num + "")
		.append("div")
		.attr("class", "graph col-xs-12 col-md-12")
		.attr("id", "graph" + this.q_num)
		.style("display", "none");
}

Question.prototype.appendAnnoyingInstruction = function(text){
	d3.select(".question"+this.q_num + "")
		.append("div")
		.attr("class", "note col-xs-12 col-md-12")
		.html(text);
}

function append(q_num, question, answer, answerA, answerB, answerC, desc){
	var q = new Question(q_num, answer, desc);
	q.appendNum();
	q.appendQ(question);
	q.appendAnswers(a, answerA);
	q.appendAnswers(b, answerB);
	q.appendAnswers(c, answerC);
	q.appendGraph();
	if(q_num !== 5) q.appendAnnoyingInstruction("<i class='fa fa-arrow-circle-down' aria-hidden='true'></i> Scroll down for the next question...");
	if(q_num === 5) q.appendAnnoyingInstruction("<i class='fa fa-arrow-circle-down' aria-hidden='true'></i> Scroll down for your score...")
	qCount ++;
}

var a = "a", b = "b", c = "c";
var q1 = { 
		q: "What is the safest way to stay cool when it’s extremely hot outside?", 
		aA: "Use an air conditioner",
		aB: "Use a fan",
		aC: "Open the windows",
		a: a,
		desc: 'Air conditioners provide the best protection from the heat, keeping you safe and comfortable. You can also save energy and money on your electricity bill by setting your air conditioner to 78°F or "low cool."'
	},

	q2 = { 
		q: "Why is it important to stay cool when it’s extremely hot outside?", 
		aA: "You take a better selfie",
		aB: "Extreme heat can cause illness and death",
		aC: "It's easier to sleep",
		a: b,
		desc: "Approximately 130 New Yorkers die each year due to heat-related issues. An average of 13 people die from heat stroke in the city each summer. Most of these deaths occur indoors. Also, about 115 New Yorkers die each summer because their existing health conditions are made worse by extreme heat. Further, 150 people are hospitalized and 450 more go to emergency departments for heat-related illnesses each summer."
	},

	q3 = { 
		q: "People at high risk for heat-related death do not have or use an air conditioner AND:", 
		aA: "Are 65 years of age and older ",
		aB: "Watch reality TV",
		aC: "Eat spicy food",
		a: a,
		desc: "Those most at risk for heat-related death do not use air conditioners AND are older adults, have chronic illnesses or severe mental health conditions, use drugs or drink excessively, or take certain medicines that impair the body’s ability to handle heat."
	},

	q4 = { 
		q: "What neighborhood factors in NYC contribute to the risk of heat-related deaths?", 
		aA: "Environmental factors, such as the amounts of green space and concrete in a neighborhood",
		aB: "Social factors, such as race and income",
		aC: "Both of the above answers",
		a: c,
		desc: "Environmental and social factors can affect risk for heat illness. To learn more, check out the Neighborhood Heat Vulnerability link at the end  of the quiz."
	},

	q5 = { 
		q: "How can you help your friends and family stay safe indoors when it's very hot outside?", 
		aA: "Make them a hot drink to encourage sweating",
		aB: "Put up thick window shades that block light",
		aC: "Check on them to make sure they're in an air-conditioned place and are well-hydrated",
		a: c,
		desc: "The best way to help those you know stay safe, especially if they are at risk of heat illness, is to “be a buddy” by checking in on them often and making sure they’re using an air-conditioner and are well hydrated. If they do not have an air conditioner, see if they qualify for a free one at the end of the quiz. In an emergency, help them get to a cooling center or another air-conditioned place, such as a library or movie theater."
	};



var question1 = append(1, q1.q, q1.a, q1.aA, q1.aB, q1.aC, q1.desc), 
	question2 = append(2, q2.q, q2.a, q2.aA, q2.aB, q2.aC, q2.desc),
	question3 = append(3, q3.q, q3.a, q3.aA, q3.aB, q3.aC, q3.desc),
	question4 = append(4, q4.q, q4.a, q4.aA, q4.aB, q4.aC, q4.desc),
	question5 = append(5, q5.q, q5.a, q5.aA, q5.aB, q5.aC, q5.desc);




