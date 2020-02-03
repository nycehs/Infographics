(function(){
    // // build section5 scenes
    // $(function () { // wait for document ready
    // 	var scene0 = new ScrollMagic.Scene({triggerElement: ".section5", offset: 0, duration: 530})
    //         .setClassToggle("#slide5Text", "show") // show slide5 text
    //         .addIndicators({name: "show slide5 title"})
    //         .addTo(controller);

    //     var scene1 = new ScrollMagic.Scene({triggerElement: ".section5", offset: 0, duration: 530})
    //         .setClassToggle("#slide5MiddleDiv", "show") // show slide5 middle div
    //         .addIndicators({name: "show slide5 middle div"})
    //         .addTo(controller);

    //     var scene1 = new ScrollMagic.Scene({triggerElement: ".section5", offset: 0, duration: 530})
    //         .setClassToggle("#slide5Graph", "show") // show slide5 graph
    //         .addIndicators({name: "show slide5 div"})
    //         .addTo(controller);
     
    // // remove previously added indicators - uncomment when done
    // // scene0.removeIndicators();
    // // scene1.removeIndicators();

    // });


    /////////////////////////////////////////////////////////////////////////

    // SCENE FIVE ///////////////////////////////////////////////////////////

    /////////////////////////////////////////////////////////////////////////

    // slide5 headline
    var slide5Div = d3.select(".section5");

    var slide5LeftDiv = slide5Div.append("div")
        .attr("class", "leftDiv col-xs-12 col-md-4 col-sm-4");

    var slide5RightDiv = slide5Div.append("div")
        .attr("class", "rightDiv col-xs-12 col-md-8 col-sm-8");

    var slide5Text = slide5LeftDiv.append("div")
            .attr("class", "col-xs-6 col-sm-6 col-md-6")
            .attr("id", "slide5Text")
            .style("margin-top", "0px")
            .style("color", "#0a2538")
            .style("font-weight", 300);

    
    var slide5MiddleDiv = slide5LeftDiv.append("div")
            .attr("class", "col-xs-6 col-sm-6 col-md-6")
            .attr("id", "slide5MiddleDiv")
            .style("margin-top", "0px")
            .style("color", "#0a2538")
            .style("font-weight", 300);

    var slide5MiddleDiv2 = slide5RightDiv.append("div")
            .attr("class", "col-xs-4 col-sm-2 col-md-2")
            .attr("id", "slide5MiddleDiv2")
            .style("margin-top", "0px")
            .style("color", "#0a2538")
            .style("font-weight", 300);

    // slide5 div container 
    var slide5Graph = slide5RightDiv.append("div")
        .attr("class", "col-xs-8 col-sm-10 col-md-10")
        .attr("id", "slide5Graph")
        .attr("height", '700px')
        .style("margin-top", "50px")
        .style("font-family", "'Open Sans', sans-serif")
        .style("font-weight", 300);


    var text_large = "How is your neighborhood affected?",
        text_small = "Hover on map to see your area.";

    var slide5title = slide5Text.append("h2").text(text_large),
        slide5text = slide5Text.append("h4").html(text_small);

    // responsive map legend container
    var legend5_map = d3.select("#slide5Text").append("div")
        .append("svg")
        .attr("class", "legend5");


    // legend for brown color scheme    
    var legendData5_map = [
        { "name": "4 (Very High Poverty Level)", "color": "#d0743c" },
        { "name": "3 (High Poverty Level)", "color": "#db8f65" },
        { "name": "2 (Mid Poverty Level)", "color": "#ddac92" },
        { "name": "1 (Low Poverty Level)", "color": "#dbd7c3" }
    ];

   
    // draw map legend boxes
    var legendBox5_map = legend5_map.selectAll("rect")
        .data(legendData5_map)
        .enter()
        .append("g")
        .append("rect")
        .attr("y", function (d, i) { return (i+1) * 18; })            
        .attr("x", 0)
        .attr("class", "legendBox5")
        .style("fill", function(d) { return d.color; });

    //label legend boxes
    var legendLabel5_map = legend5_map.selectAll("text")
        .data(legendData5_map)
        .enter()                        
        .append("text")
        .attr("y", function (d, i) { return (i+1) * 18; })
        .attr("x", 20)
        .attr("dy", ".70em")
        .attr("class", "legendLabel5")
        .html(function(d) { return d.name; }); 
    

    // poverty map
    var width = 960,
        height = 500;

    // var svg5 = d3.select("#slide5Graph").append("svg")
    //     .attr("width", width)
    //     .attr("height", height);

    var svg5 = d3.select("#slide5Graph").append("div")
        .classed("svg-container", true) //container class to make it responsive
        .append("svg")
        .attr("preserveAspectRatio", "xMinYMin meet")
        // .attr("width", '100%')
         .attr("height", '700px')
        .attr('viewBox','100 0 660 600')
        .classed("svg-content-responsive", true); 

    var color = d3.scale.threshold()
        .domain([1, 10, 50, 100, 1000])
        .range(["#fef0d9","#fdd49e","#fdbb84","#fc8d59","#e34a33","#b30000"]);


    var projection = d3.geo.mercator()
        .center([-73.94, 40.70])
        .scale(50000)
        .translate([(width) / 2, (height)/2]);

    var path = d3.geo.path()
        .projection(projection);

    // tooltip
    var tooltip = d3.select("body").append("div")   
        .attr("class", "tooltip")               
        .style("opacity", 0);

    // responsive hovered element container
    // var hoverDiv = d3.select("#slide5MiddleDiv2").append("div")
    //     .attr("class", "hoverDiv")
    //     .classed("svg-container-legend", true) 
    //     .append("svg")
    //     .attr("class", "slide5mapLegend")
    //     .attr("preserveAspectRatio", "xMinYMin meet")
    //     .attr("viewBox", "0 0 200 200") 
    //     .classed("svg-content-responsive", true);


    // set up for stacked bar
    // var middleSvg = slide5MiddleDiv.append("text").text("this is middle div");
    var margin = {top: 0, right: 0, bottom: 0, left: 20};

    var causes = ["asthma", "cardio", "death", "resp"];

    var y = d3.scale.ordinal()
        .rangeRoundBands([height, 0], 0.1);

    var x = d3.scale.linear()
        .rangeRound([0, width/4]);

    //var barColor = d3.scale.category10();
    // var barColorRange = ["#16c1d3", "#d8c51d", "#5e5ea5", "#c92b2b"];
    // var barColor = d3.scale.ordinal().range(barColorRange);  
    var barColor = d3.scale.ordinal()
        .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b"]);

    var xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom");

    var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left");


    var w = 300, h = 800;

    // var svgStacked = d3.select("#slide5MiddleDiv").append("svg")
    //     .attr("width", w + margin.left + margin.right)
    //     .attr("height", h + margin.top + margin.bottom)
    //     .append("g")
    //     .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var svgStacked = d3.select("#slide5MiddleDiv").append("div")
               
        .classed("svg-container", true) //container class to make it responsive
        .append("svg")
        .attr("preserveAspectRatio", "xMinYMin meet")
        .attr("height", '800px')
        .attr("viewBox", "0 0 300 800")
        .classed("svg-content-responsive", true); 


    // read data
    d3.json("poverty2.json", function(error, data) {
        if (error) throw error;

        //console.log(data);

        //unpack the topojson and return it as geojson so that the browser knows what to do
        var povertyFeatures = topojson.feature(data, data.objects.poverty).features; 
        console.log(povertyFeatures);

        povertyFeatures.forEach(function(d) {
            d.poverty = +d.properties.Poverty_Ep;
            d.uhfCode = +d.properties.UHFCODE;
            d.uhf = d.properties.UHF_NEIGHB;
            d.asthma = Math.round(d.properties.EDAsthmaRa * 10) / 10;
            d.death = Math.round(d.properties.MortalityR * 10) / 10;
            d.cardio = Math.round(d.properties.HACardRate * 10) / 10;
            d.resp = Math.round(d.properties.HARespRate * 10) / 10;
        });

        // color palette
        var veryHigh = "#d0743c", high = "#db8f65", mid = "#ddac92", low = "#dbd7c3";
        var asthma = "#6b486b", cardio = "#b29a38", resp = "#d1c44e", death = "#a05d56";

        // poverty choropleth map
        svg5.append("g")    
            .attr("class", "poverty-container")
            .selectAll("path")
            .data(povertyFeatures)
            .enter()
            .append("path")
            .attr("class", "g-poverty")
            .attr("d", path)
            .style("stroke", "#1ead5e")
            .style("fill", function(d){
                return d.poverty == 4 ? veryHigh : 
                    d.poverty == 3 ? high :
                    d.poverty == 2 ? mid :
                    d.poverty == 1 ? low :
                     "#ccc";
            })
            .on("mouseover", function(d, i){
                d3.select("#slide5MiddleDiv2")
                    .html("<h3><span>" + d.uhf + "</span></h3><h4>Poverty Level: <span>" + d.poverty + "</span><hr/></h4><h5>"
                        + "<span class='asthma'>&#9608;</span> Asthma ED Visits: <span>" + d.asthma + "</span><br />"
                        + "<span class='death'>&#9608;</span> Deaths: <span>" + d.death + "</span><br />"
                        + "<span class='cardio'>&#9608;</span> Cardiovascular Hospitalizations: <span>" + d.cardio + "</span><br />"
                        + "<span class='resp'>&#9608;</span> Respiratory Hospitalizations: <span>" + d.resp + "</span><br/>(in rate per 100k)</h5>");                
                d3.select(this).transition()
                    .ease("quad")
                    .duration("200")
                    .style("opacity", "0.6");
                // get the active id to highligth the right bar
                //var id = povertyFeatures[i].uhf;  
                var elements = document.querySelectorAll(':hover');
                var l = elements.length;
                var l = l-1;
                var id = elements[l].__data__.uhf;  
                //console.log(id, d.uhf); 
                // select every bars to update opacities                
                d3.selectAll(".slide5bars")
                    .style("opacity", function(d) {
                        return d.uhf == id ? 1 : 0.3;
                    })
            })
            .on("mouseout", function(d) {      
                d3.select("#slide5MiddleDiv2").html("");
                d3.select(this).transition()
                    .ease("quad")
                    .duration("200")
                    .style("opacity", "1");
                d3.selectAll(".slide5bars").style("opacity", 1);
            });

        // stacked bar chart adopted from https://bl.ocks.org/mbostock/3886208  
        // and http://plnkr.co/edit/Y33oYNB9de9xiq1pnl0Q?p=preview 
        barColor.domain(d3.keys(povertyFeatures[0]).filter(function(key) { 
            return key == "asthma" || key =="cardio" || key == "resp" || key == "death"; 
        }));

        povertyFeatures.forEach(function(d) {
            var y0 = 0;
                d.impacts = barColor.domain().map(function(name) { 
                    return {name: name, y0: y0, y1: y0 += +d[name], uhf: d.uhf, poverty: d.poverty}; 
                });
                d.total = d.impacts[d.impacts.length - 1].y1;
        });

        povertyFeatures.sort(function(a, b) { return b.poverty - a.poverty; });

        y.domain(povertyFeatures.map(function(d) { return d.uhf; }));
        x.domain([0, d3.max(povertyFeatures, function(d) { return d.total; })]);

        svgStacked.append("g")
            // .attr("class", "x axis")
            .style("display", "none")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis);

        svgStacked.append("g")
            //.attr("class", "y axis")
            .style("display", "none")
            .call(yAxis)
            .append("text");

        // // poverty level background
        // var rect1 = svgStacked.append("rect")
        //     .attr({ x: 0, y: 25, width: 240, height: 65 })
        //     .attr("class", "povertyRect")
        //     .style("fill", low);

        // var rect2 = svgStacked.append("rect")
        //     .attr({ x: 0, y: 90, width: 240, height: 210 })
        //     .attr("class", "povertyRect")
        //     .style("fill", mid);

        // var rect3 = svgStacked.append("rect")
        //     .attr({ x: 0, y: 300, width: 240, height: 110 })
        //     .attr("class", "povertyRect")
        //     .style("fill", high);

        // var rect4 = svgStacked.append("rect")
        //     .attr({ x: 0, y: 410, width: 240, height: 76 })
        //     .attr("class", "povertyRect")
        //     .style("fill", veryHigh);

        // stacked bars
        var bars = svgStacked.selectAll(".uhf")
            .data(povertyFeatures)
            .enter().append("g")
            .attr("class", "g")
            .attr("transform", function(d) { return "translate(0," + y(d.uhf) + ")"; });

        bars.selectAll("rect")
            .data(function(d) { return d.impacts; })
            .enter().append("rect")
            .attr("class", "slide5bars")
            .attr("height", y.rangeBand())
            .attr("x", function(d) { return x(d.y0); })
            .attr("width", function(d) { return x(d.y1) - x(d.y0); })
            //.style("fill", function(d) { return color(d.name); });
            .style("fill", function(d) { 
                return d.name == "asthma" ? asthma : 
                d.name == "cardio" ? cardio : 
                d.name == "resp" ? resp : death;
            })
            .on("mouseover", function(d,i){
                tooltip.style("opacity", 0.8)
                .style("left", (d3.event.pageX)+0 + "px") 
                .style("top", (d3.event.pageY)-0 + "px")
                .style("display", "inline-block");

                var val = d.y1-d.y0;
                tooltip.html(d.uhf + "<br/>Poverty Level: " + d.poverty);                 
            })
            .on("mouseout", function(d) {      
                tooltip.style("display", "none");
            });

        // poverty lines
        var line1 = svgStacked.append("line")
            .attr({ x1: 0, y1: 90, x2: 260, y2: 90 })
            .attr("class", "povertyLines");

        var line2 = svgStacked.append("line")
            .attr({ x1: 0, y1: 300, x2: 260, y2: 300 })
            .attr("class", "povertyLines");

        var line3 = svgStacked.append("line")
            .attr({ x1: 0, y1: 410, x2: 260, y2: 410 })
            .attr("class", "povertyLines");

        var line4 = svgStacked.append("line")
            .attr({ x1: 0, y1: 485, x2: 260, y2: 485 })
            .attr("class", "povertyLines");

        // poverty line texts
        var text1 = svgStacked.append("text")
            .attr({"dx": 260, "dy": 86 })
            .text("Low Poverty")
            .attr("class", "povertyLineText");
            //.style("text-anchor", "end");

        var text2 = svgStacked.append("text")
            .attr({"dx": 260, "dy": 296 })
            .text("Mid Poverty")
            .attr("class", "povertyLineText");

        var text3 = svgStacked.append("text")
            .attr({"dx": 260, "dy": 406 })
            .text("High Poverty")
            .attr("class", "povertyLineText");

        var text4 = svgStacked.append("text")
            .attr({"dx": 260, "dy": 479 })
            .text("Very High Poverty")
            .attr("class", "povertyLineText");
    
    });




})();

