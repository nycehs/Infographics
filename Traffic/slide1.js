(function(){
    // build section1 scenes
    $(function () { // wait for document ready

    	var scene1 = new ScrollMagic.Scene({triggerElement: ".section1", offset: 30, duration: 530})
            .setClassToggle("#slide1Title", "show") // show slide1 title
            .addIndicators({name: "show slide1 title"})
            .addTo(controller);

        var scene2 = new ScrollMagic.Scene({triggerElement: ".section1", offset: 100, duration: 460})
            .setClassToggle("#slide1Text", "show") // show slide1 subtitle
            .addIndicators({name: "show slide1 subtitle"})
            .addTo(controller);

        var scene3 = new ScrollMagic.Scene({triggerElement: ".section1", offset: 300, duration: 260})
            .setClassToggle("#stats", "show") // show stats
            .addIndicators({name: "show stats"})
            .addTo(controller);

    // remove previously added indicators - uncomment when done
    // scene1.removeIndicators();
    // scene2.removeIndicators();
    // scene3.removeIndicators();

    });


    /////////////////////////////////////////////////////////////////////////

    // SCENE ONE ////////////////////////////////////////////////////////////

    /////////////////////////////////////////////////////////////////////////

    // slide1 headline
    var slide1Div = d3.select(".section1");
    var text_large = "In New York City,",
        text_small = "current PM2.5 levels contribute to <br/> \
    	<span>2300</span> deaths and <span>6300</span> emergency department visits and hospitalizations <br/> \
    	for respiratory and cardiovascular disease each year.";

    var slide1title = slide1Div.append("h1").attr("id", "slide1Title").text(text_large),
        slide1text = slide1Div.append("h3").attr("id", "slide1Text").html(text_small);

    // div container for stats contents
    var stats = slide1Div.append("div")
        .attr("class", "col-xs-12 col-sm-12 colmd-12")
        .attr("id", "stats")
        .style("font-family", "'Open Sans', sans-serif")
        .style("font-weight", 300);

    // div for stats title + graphic
    var statsDiv = stats.append("div")
        .attr("class", "death col-xs-12 col-sm-6 col-sm-offset-3 col-md-6 col-md-offset-3");

    var statsText = "PM2.5 in NYC causes:";
    statsDiv.append("h3").html(statsText)
        .style("font-family", "'EB Garamond', serif")
        .style("opacity", 0.8);

    // Death + ED Visits stats charts
    // var svg = statsDiv.append("svg")
    //     .attr("class", "stats")
    //     .attr("width", "450px")
    //     .attr("height", "400px");

    var width = 500, height = 500;

    // responsive svg
    var svg1 = d3.select(".death").append("svg")
        .style("margin-top", "-70px")
        .attr("width", '100%')
       // .attr("height", '100%')
        .attr("height", '800px')
        .attr('viewBox','200 150 '+Math.min(width,height)+' '+Math.min(width,height))
        .attr('preserveAspectRatio','xMinYMin')
        .append("g")
        .attr("transform", "translate(" + Math.min(width,height) / 2 + "," + Math.min(width,height) / 2 + ")");


    var data = [ 
            { "r": 6, "x":180, "label": "Asthma" }, 
            { "r": 5, "x": 60, "label": "Deaths" },
            { "r": 2.1, "x": 280, "label": "Respiratory" }, 
            { "r": 1.1, "x": 370, "label": "Cardiovascular" }];

    var g = svg1.selectAll("g")
        .data(data);

    var g_enter = g.enter()
        .append("g")
        .attr("transform", function(d) { return "translate(" + d.x +", 80)"})

    var circles = g_enter
        .append("circle")
        .attr("r", function(d) { return d.r*10; })
        .style("stroke", "#16c1d3")
        .style("fill", "none")
        .style("stroke-width", "2px");

    // circle labels - label
    var circleLabel = g_enter.append("text")
        .attr("dx", function(d) { return -20; })
        .attr("dy", function(d) {
            return d.label == "Respiratory" || d.label == "Cardiovascular" ? 40 : 3;
        })
        .text(function(d){ return d.label; })
        .style("fill", "#16c1d3");

    // circle labels - %
    var circleLabel2 = g_enter.append("text")
        .attr("dx", function(d) { return -20; })
        .attr("dy", function(d) {
            return d.label == "Respiratory" || d.label == "Cardiovascular" ? 58 : 20;
        })
        .text(function(d) { return d.r + "%"; })
        .style("fill", "#c92b2b");

    // dashed leader lines
    var line = g_enter.append("line")
        .attr({
            x1: 0,
            // y1: 50,
            x2: 0,
            y2: 150,
            stroke: "white",
            fill: "none"
        })
        .attr("y1", function(d) { return d.r == 5 ? 50 : d.r == 6 ? 60 : 65; })
        .attr("y2", function(d) { return d.r == 2.1 || d.r == 1.1 ? 100 : 150; })
        .style("stroke-width", "1")
        .style("stroke-dasharray", ("3, 3"));

    var desc1 = "1 in 20 deaths";
    var desc2a = "About 1 in 17 asthma";
    var desc2b = "emergency room visits";
    var desc3 = "About 1 in 31 hospitalizations";

    // 1st line of description
    var description = g_enter.append("text")
        .attr("dx", function(d) { return -30; })
        .attr("dy", function(d) { return d.r == 5 || d.r == 6 ? 162 : 112; })
        .text(function(d) { return d.r == 5 ? desc1 : d.r == 6 ? desc2a : d.r == 2.1 ? desc3 : ""; })
        .style("fill", "white")
        .style("opacity", 0.8);

    // 2nd line of description (only for asthma)
    var descriptionWrap = g_enter.append("text")
        .attr("dx", function(d) { return -30; })
        .attr("dy", function(d) { return d.r == 6 ? 178 : 0; })   
        .text(function(d) { return d.r == 6 ? desc2b : ""; })
        .style("fill", "white")
        .style("opacity", 0.8);

})();



