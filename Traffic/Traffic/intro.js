// init controller
var controller = new ScrollMagic.Controller({
    globalSceneOptions: {
        triggerHook: "onEnter", 
        duration: "200%"
    }
});

// Controller
var controller = new ScrollMagic.Controller();
 
// // build intro scenes
$(function () { // wait for document ready
    // Intro scenes
    var scene00 = new ScrollMagic.Scene({triggerElement: ".intro_title", offset: 150, duration: 1450})
        .setClassToggle(".introObjDiv", "zap") // hide phere
        .addIndicators({name: "hide sphere"})
        .addTo(controller);

    var scroll = new ScrollMagic.Scene({triggerElement: ".intro_title", offset: 150, duration: 1450})
        .setClassToggle("#arrow", "zap") // scroll caret
        .addIndicators({name: "hide caret"})
        .addTo(controller);

    var scene01a = new ScrollMagic.Scene({triggerElement: ".intro_title", offset: 150, duration: 1450})
        .setClassToggle(".introTitle", "hide") // hide title
        .addIndicators({name: "hide title"})
        .addTo(controller);

    var scene01b = new ScrollMagic.Scene({triggerElement: ".intro_title", offset: 150, duration: 1450})
        .setClassToggle("#introText0", "hide") // hide text0
        .addIndicators({name: "hide text0"})
        .addTo(controller);

    var scene02a = new ScrollMagic.Scene({triggerElement: ".intro_title", offset: 400, duration: 400})
        .setClassToggle("#introText1", "show") // show text1
        .addIndicators({name: "show text1"})
        .addTo(controller);

    var scene02b = new ScrollMagic.Scene({triggerElement: ".intro_title", offset: 450, duration: 350})
        .setClassToggle("#g-sources", "show") // show sources svg
        .addIndicators({name: "show sources drawing"})
        .addTo(controller);

    var scene03 = new ScrollMagic.Scene({triggerElement: ".intro_title", offset: 850, duration: 410})
        .setClassToggle("#introText2", "show") // show text2 
        .addIndicators({name: "show text2"})
        .addTo(controller);    

    var scene04a = new ScrollMagic.Scene({triggerElement: ".intro_title", offset: 900, duration: 700})
        .setClassToggle("#g-anatomy", "show") // show anatomy
        .addIndicators({name: "show anatomy"})
        .addTo(controller);

    var scene04b = new ScrollMagic.Scene({triggerElement: ".intro_title", offset: 1000, duration: 210})
        .setClassToggle("#g-cluster", "show") // show cluster 
        .addIndicators({name: "show cluster"})
        .addTo(controller);

    // Specify bezier for the cluster path
    var bezier = [
        { x: 650, y: 1110 },
        { x: 750, y: 1110 },
        { x: 750, y: 1200 }
    ];
   
    var tween = new TimelineMax()    
        .add(TweenMax.to($("#g-cluster"), 1, { css:{
            bezier:{
                curviness: 1.25, 
                values: bezier,
                autoRotate: true,
                type: 'thru'
            }, 
            ease:Power1.easeInOut
        }}));

        // .add(TweenMax.to($("#g-cluster"), 2, {css:{bezier:flightpath.looping}, ease:Power1.easeInOut}))
        // .add(TweenMax.to($("#g-cluster"), 1, {css:{bezier:flightpath.leave, ease:Power1.easeInOut}}));

    var scene05 = new ScrollMagic.Scene({triggerElement: ".intro", offset: 1550, duration: 300})
        .setPin(".intro")
        .setTween(tween)
        .addIndicators({name: "move cluster"}) // move cluster
        .addTo(controller);

    var scene05a = new ScrollMagic.Scene({triggerElement: ".intro", offset: 1600, duration: 250})
        .setClassToggle("#g-cluster2", "show") // show cluster 2
        .addIndicators({name: "show cluster2"})
        .addTo(controller);

    var scene05b = new ScrollMagic.Scene({triggerElement: ".intro", offset: 1650, duration: 200})
        .setClassToggle("#g-cluster3", "show") // show cluster 3
        .addIndicators({name: "show cluster3"})
        .addTo(controller);

    var scene05c = new ScrollMagic.Scene({triggerElement: ".intro", offset: 1700, duration: 150})
        .setClassToggle("#g-cluster4", "show") // show cluster 4
        .addIndicators({name: "show cluster4"})
        .addTo(controller);

    var scene06 = new ScrollMagic.Scene({triggerElement: ".intro_title", offset: 1300, duration: 300})
        .setClassToggle("#introText3", "show") // show text3 
        .addIndicators({name: "show text3"})
        .addTo(controller);

    var scene07 = new ScrollMagic.Scene({triggerElement: ".intro_title", offset: 1300, duration: 300})
        .setClassToggle("#anatomyLabel", "show") // show anatomy label
        .addIndicators({name: "show anatomy label"})
        .addTo(controller);

    // remove indicators - uncomment when done
    // scene00.removeIndicators();
    // scene01a.removeIndicators();
    // scene01b.removeIndicators();
    // scene02a.removeIndicators();
    // scene02b.removeIndicators();
    // scene03.removeIndicators();
    // scene04a.removeIndicators();
    // scene04b.removeIndicators();
    // scene05.removeIndicators();
    // scene05a.removeIndicators();
    // scene05b.removeIndicators();
    // scene05c.removeIndicators();
    // scene06.removeIndicators();
    // scene07.removeIndicators();

});

/////////////////////////////////////////////////////////////////////////

// INTRO SCENE //////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////////

var introText0 = "Fine particulate matter (PM2.5) are tiny airborne solid and liquid particles \
                less than 2.5 microns in diameter.";
var introText1 = "<h1>Sources of PM2.5</h1>PM2.5 in NYC comes from inside and outside the city from all kinds of \
                combustion activity, including the burning of fuel in <span>vehicles</span>, <span>buildings</span>, \
                <span>power plants</span>, and <span>construction equipment</span>, as well as \
                <span>commercial cooking</span> and <span>industrial activities</span>. \
                PM2.5 can either come directly from these sources or be formed in the atmosphere from other pollutants.";
var introText2 = "<h1>Health effects of PM2.5</h1>PM2.5 is the most harmful urban air pollutant, \
                small enough to penetrate deep into the lungs \
                and enter the bloodstream,";
var introText3 = "resulting in adverse <span>respiratory</span> and <span>cardiovascular</span> health outcomes \
                and contributing to an increased risk of <span>death</span> and \
                <span>lower life expectancy</span>.";



// Moving particles animation background
var w = 1400,
    h = 2000;
    
var svg = d3.select(".intro").append("svg")
    .attr("width", w)
    .attr("height", h);

var circle = svg.selectAll("circle")
    .data(d3.range(200).map(function() {
        return {
            x: w * Math.random(),
            y: h * Math.random(),
            dx: Math.random() - 0.5,
            dy: Math.random() - 0.5
        };
    }))
    .enter().append("circle")
    .attr("r", function(d) { return Math.floor((Math.random() * 5) + 1); })
    .attr("class", "particles");

d3.timer(function() {
    circle
        .attr("cx", function(d) { d.x += d.dx; if (d.x > w) d.x -= w; else if (d.x < 0) d.x += w; return d.x; })
        .attr("cy", function(d) { d.y += d.dy; if (d.y > h) d.y -= h; else if (d.y < 0) d.y += h; return d.y; });
});

// Intro title + text area div
var introDiv = d3.select(".intro").append("div")
    .attr("class", "intro_title col-xs-12 col-md-4 col-sm-4");

var introGraphicDiv = d3.select(".intro").append("div")
    .attr("class", "intro_graphic col-xs-12 col-md-8 col-sm-8");

// Intro title
var introTitle = introDiv.append("h1")
    .attr("class", "introTitle")
    .html("What is PM2.5?");

var delay = 2000;

// Intro text ZERO
var introText0 = introDiv.append("h3")
    .style("opacity", 0)
    .attr("id", "introText0")
    .text(introText0)     
    .transition().delay(200).duration(delay)
    .style("opacity", 1)

// Create div + svg area for spherical models
var introObj1 = introDiv.append("div")
    .attr("class", "introObjDiv")
    .attr("width", "100%")
    .append("svg")
    .attr("width", 300)
    .attr("height", 100);

var particle = "particle-01.svg";

// PM2.5 sphere
var pm25sphere = introObj1
    .append("svg:image")
    .style("opacity", 0)
    .attr("xlink:href", particle)
    .attr("width", 30)
    .attr("height", 30)
    .attr("x", 85)
    .attr("y", 35)
    .transition().delay(300).duration(delay)
    .style("opacity", 1);

// Red blood cell circle
var rbcCircle = introObj1.append("circle")
    .style("opacity", 0)
    .attr({
        cx: "100px",
        cy: "50px",
        r: "40px",
        fill: "none",
        stroke: "white"
    })
    .style("stroke-dasharray", ("3, 3"))
    .transition().delay(delay/4).duration(delay)
    .style("opacity", 1);

// line + text for the pm2.5 sphere
var pmLine = introObj1.append("line")
    .style("opacity", 0)
    .attr({
        x1: 100,
        y1: 50,
        x2: 180,
        y2: 20,
        stroke: "white",
        fill: "none"
    })
    .style("stroke-width", "1")
    .transition().delay(delay/4).duration(delay)
    .style("opacity", 1);

var pmText = introObj1.append("text")
    .style("opacity", 0)
    .attr({
        x: 181,
        y: 25,
        fill: "white"
    })
    .style("text-anchor", "start")
    .text("Size of PM2.5")
    .transition().delay(delay/4).duration(delay)
    .style("opacity", 1);

// line + text for the red blood cell circle
var rbcLine = introObj1.append("line")
    .style("opacity", 0)
    .attr({
        x1: 140,
        y1: 50,
        x2: 180,
        y2: 50,
        stroke: "white",
        fill: "none"
    })
    .style("stroke-width", "1")
    .transition().delay(delay/4).duration(delay)
    .style("opacity", 1);

var rbcText = introObj1.append("text")
    .style("opacity", 0)
    .attr({
        x: 181,
        y: 55,
        fill: "white"
    })
    .style("text-anchor", "start")
    .text("Size of red blood cell")
    .transition().delay(delay/4).duration(delay)
    .style("opacity", 1);

// // scroll down arrow
 var caret = d3.select(".cover").append("div")
     .attr("id", "arrow")
     .attr("class", "bounce")
     .append("a")
     .attr("class", "glyphicon glyphicon-arrow-down")
     .style("font-size", "2em");
 

// Intro text ONE
var introText1 = introDiv.append("h3")
    .attr("id", "introText1")
    .html(introText1)
    .style("padding-top", "400px");
    
// Show sources drawing
var sources = svg
    .append("svg")
    .attr("id", "g-sources")
    .append("svg:image")
    .attr("xlink:href", "sources.svg")
    .attr("width", 109 * 4)
    .attr("height", 150 * 4)
    .attr("x", 620)
    .attr("y", 800);

// Intro text TWO
var introText2 = introDiv.append("h3")
    .attr("id", "introText2")
    .html(introText2)
    .style("padding-top", "900px");   

// Show anatomy image
var introObj2 = svg
    .append("svg")
    .attr("id", "g-anatomy")
    .append("svg:image")
    .attr("xlink:href", "anatomy.svg")
    .attr("width", 109 * 4)
    .attr("height", 150 * 4)
    .attr("x", 620)
    .attr("y", 1300);

var introObj3= svg
    .append("svg")
    .attr("id", "g-anatomy2")
    .append("svg:image")
    .attr("xlink:href", "anatomy.svg")
    .attr("width", 109 * 4)
    .attr("height", 150 * 4)
    .attr("x", 620)
    .attr("y", 1300);
// Show cluster image
var cluster = svg
    .append("svg")
    .attr("id", "g-cluster")
    .append("svg:image")
    .attr("xlink:href", "cluster.svg")
    .attr("width", 30)
    .attr("height", 30)
    .attr("x", 690)
    .attr("y", 1500);

var cluster2 = svg
    .append("svg")
    .attr("id", "g-cluster2")
    .append("svg:image")
    .attr("xlink:href", "cluster.svg")
    .attr("width", 30)
    .attr("height", 30)
    .attr("x", 810)
    .attr("y", 1540);

var cluster3 = svg
    .append("svg")
    .attr("id", "g-cluster3")
    .append("svg:image")
    .attr("xlink:href", "cluster.svg")
    .attr("width", 30)
    .attr("height", 30)
    .attr("x", 815)
    .attr("y", 1650);
 
 var cluster4 = svg
    .append("svg")
    .attr("id", "g-cluster4")
    .append("svg:image")
    .attr("xlink:href", "cluster.svg")
    .attr("width", 30)
    .attr("height", 30)
    .attr("x", 760)
    .attr("y", 1730);
 
 
// Intro text THREE
var introText3 = introDiv.append("h3")
    .attr("id", "introText3")
    .html(introText3)
    .style("padding-top", "1300px"); 

// Show anatomy labels
var anatomyLabel = svg
    .append("svg")
    .attr("id", "anatomyLabel")
    .append("svg:image")
    .attr("xlink:href", "anatomy-label.svg")
    .attr("width", 109 * 4)
    .attr("height", 150 * 4)
    .attr("x", 620)
    .attr("y", 1300);

// // Intro text SCROLLDOWN
// var scroll1 = introDiv.append("a")
//     .style("opacity", 0)
//     .attr("id", "scroll")
//     .html("SCROLL DOWN TO CONTINUE")     
//     .transition().delay(delay/2).duration(delay)
//     .style("opacity", 1)
//     .style("color", "grey");




