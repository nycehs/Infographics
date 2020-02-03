(function(){
    // // build section4 scenes
    // $(function () { // wait for document ready
 
    // 	var scene0 = new ScrollMagic.Scene({triggerElement: ".section4", offset: 0, duration: 530})
    //         .setClassToggle("#slide4Text", "show") // show slide4 text
    //         .addIndicators({name: "show slide4 title"})
    //         .addTo(controller);

    //     var scene1 = new ScrollMagic.Scene({triggerElement: ".section4", offset: 0, duration: 530})
    //         .setClassToggle("#slide4Graph", "show") // show slide4 graph
    //         .addIndicators({name: "show slide4 div"})
    //         .addTo(controller);
     
    // // remove previously added indicators - uncomment when done
    // // scene0.removeIndicators();
    // // scene1.removeIndicators();

    // });


    /////////////////////////////////////////////////////////////////////////

    // SCENE FOUR ///////////////////////////////////////////////////////////

    /////////////////////////////////////////////////////////////////////////

    // slide4 headline
    var slide4Div = d3.select(".section4"),
        slide4Text = slide4Div.append("div")
            .attr("class", "col-xs-12 col-sm-4 col-md-4")
            .attr("id", "slide4Text")
            .style("margin-top", "50px")
            .style("color", "#0a2538")
            .style("font-weight", 300);

    var text_large = "PM2.5 pollution from traffic contributes to adverse health effects",
        text_small = "PM2.5 pollution from traffic sources in the region contributes to \
        <span>320 premature deaths</span> and <span>870 emergency department (ED) visits and hospitalizations</span> each year.<br />\
        The largest impacts are from <span>trucks and buses</span>.";

    var slide4title = slide4Text.append("h1").text(text_large),
        slide4text = slide4Text.append("h3").html(text_small);

    // slide4 div container 
    var slide4Graph = slide4Div.append("div")
        .attr("class", "col-xs-12 col-sm-8 col-md-8")
        .attr("id", "slide4Graph")
        // .style("margin-top", "20%")
        .style("font-family", "'Open Sans', sans-serif")
        .style("font-weight", 300);


    // stacked bar chart adapted from http://bl.ocks.org/juan-cb/43f10523858abf6053ae
    var width = 700,
        height = 700;

    // var margin = {top: 10, right: 50, bottom: 50, left: 50},
    //     width = 700 - margin.left - margin.right,
    //     height = 700 - margin.top - margin.bottom;

    // var svg4 = d3.select("#slide4Graph").append("svg")
    //     .attr("width", width + margin.left + margin.right)
    //     .attr("height", height + margin.top + margin.bottom)
    //     .append("g")
    //     .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // responsive svg
    var svg = d3.select("#slide4Graph").append("svg")
        .attr("class", "svg4")
        .attr("width", '50%')
       // .attr("height", '50%')
        .attr("height", '500px')
        .attr('viewBox','180 195 '+Math.min(width+150,height+150)+' '+Math.min(width+150,height+150))
        .attr('preserveAspectRatio','xMinYMin')
        .append("g")
        .attr("transform", "translate(" + Math.min(width,height) / 3 + "," + Math.min(width,height) / 3 + ")");

    var x = d3.scale.ordinal()
        .rangeRoundBands([0, width]);

    var y = d3.scale.linear()
        .rangeRound([height, 0]);

    var xAxis = d3.svg.axis()
        .scale(x)
        .tickSize(24, 0)
        .orient("bottom");

    var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left")
        //.tickSize(0)
        .ticks(7)
        .tickSize(-width);

    // tooltip
    var tooltip = d3.select("body").append("div")   
        .attr("class", "tooltip")               
        .style("opacity", 0);
    
    var dataset = [
        {label:"ED Visits - Asthma", "Trucks and Buses":360, "Cars":190, "All": 110},
        {label:"Hospital Admissions", "Trucks and Buses":100, "Cars":60, "All": 40},
        ];

    var dataset2 = [{label:"Premature Deaths", "Trucks and Buses":170, "Cars":100, "All": 60}];
    
    var colorRange = ["#c92b2b", "#16c1d3", "#1ead5e"];
    var color = d3.scale.ordinal().range(colorRange);    

    // hospital chart  
    color.domain(d3.keys(dataset[0]).filter(function(key) { return key !== "label"; }));
    dataset.forEach(function(d) {
        var y0 = 0;
        d.values = color.domain().map(function(col) { return {col: col, y0: y0, y1: y0 += +d[col]}; });
        d.total = d.values[d.values.length - 1].y1;
    });

    x.domain(dataset.map(function(d) { return d.label; }));
    y.domain([0, d3.max(dataset, function(d) { return d.total; })]);
           
    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);


    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)
        .append("text")
        //.attr("transform", "rotate(-90)")
        .attr("y", 9)
        .attr("dy", ".71em")
        .attr("dx", "1.0em")
        .style("text-anchor", "end")
        .text("Cases");

    var bar = svg.selectAll(".label")
        .data(dataset)
        .enter().append("g")
        .attr("class", "g")
        .attr("transform", function(d) { return "translate(" + x(d.label) + ",0)"; });

    svg.selectAll(".x.axis .tick text")
        .call(wrap, x.rangeBand());
        
    var bar_enter = bar.selectAll("rect")
        .data(function(d) { return d.values; })
        .enter();

    bar_enter.append("rect")
        .attr("width", x.rangeBand()/2)
        .attr("x", function(d) { return x.rangeBand()/4; })
        .attr("y", function(d) { return y(d.y1); })
        .attr("height", function(d) { return y(d.y0) - y(d.y1); })
        .style("fill", function(d) { return color(d.col); });

    bar_enter.append("text")
        .text(function(d) { return d3.format(".2s")(d.y1-d.y0)+" cases"; })
        .attr("y", function(d) { return y(d.y1)+(y(d.y0) - y(d.y1))/2; })
        .attr("x", x.rangeBand()/2)
        .style("text-anchor", "middle")
        .style("fill", "fff")
        .style("font-size", "24px");
    
    bar.on("mouseover", function(d){
            tooltip.style("opacity", 0.8)
                .style("left", (d3.event.pageX)+0 + "px") 
                .style("top", (d3.event.pageY)-0 + "px")
                .style("display", "inline-block");
            var elements = document.querySelectorAll(':hover');
            var l = elements.length;
            var l = l-1;
            var element = elements[l].__data__;
            var percent = Math.round(((element.y1 - element.y0)/d.total)*100);
            var text1 = d.label + "<br>from " + element.col + " Traffic Outside NYC<br><span class='large'>" + percent + "%</span>";
            var text2 = d.label + "<br>from " + element.col + "<br><span class='large'>" + percent + "%</span>";
            tooltip.html(function(d){ 
                return element.col == "All" ? text1 : text2;
            })
        })

    bar.on("mouseout", function(d){
            tooltip.style("display", "none");
        })

    // chart title
    svg.append("text")
        .attr("x", width/2)             
        .attr("y", height+100)
        .attr("text-anchor", "middle")  
        .style("font-size", "30px") 
        .style("text-decoration", "none")  
        .text("Hospital and ED Visits")
        .style("fill", "#0a2538")
        .style("font-weight", 500);
 


    // death chart
    var svg4 = d3.select("#slide4Graph").append("svg")
        .attr("class", "svg4")
        .attr("width", '50%')
       // .attr("height", '50%')
         .attr("height", '500px')
        .attr('viewBox','180 195 '+Math.min(width+150,height+150)+' '+Math.min(width+150,height+150))
        .attr('preserveAspectRatio','xMinYMin')
        .append("g")
        .attr("transform", "translate(" + Math.min(width,height) / 3 + "," + Math.min(width,height) / 3 + ")");

    color.domain(d3.keys(dataset2[0]).filter(function(key) { return key !== "label"; }));
    dataset2.forEach(function(d) {
        var y0 = 0;
        d.values = color.domain().map(function(col) { return {col: col, y0: y0, y1: y0 += +d[col]}; });
        d.total = d.values[d.values.length - 1].y1;
    });

    x.domain(dataset2.map(function(d) { return d.label; }));
    y.domain([0, d3.max(dataset2, function(d) { return d.total; })]);

    svg4.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

    svg4.append("g")
        .attr("class", "y axis")
        .call(yAxis)
        .append("text")
        //.attr("transform", "rotate(-90)")
        .attr("y", 9)
        .attr("dy", ".71em")
        .attr("dx", "1.0em")
        .style("text-anchor", "end")
        .text("Cases");

    var bar4 = svg4.selectAll(".label")
        .data(dataset2)
        .enter().append("g")
        .attr("class", "g")
        .attr("transform", function(d) { return "translate(" + x(d.label) + ",0)"; });

    svg4.selectAll(".x.axis .tick text")
        .call(wrap, x.rangeBand());
        
    var bar_enter4 = bar4.selectAll("rect")
        .data(function(d) { return d.values; })
        .enter();

    bar_enter4.append("rect")
        .attr("width", x.rangeBand()/4)
        .attr("x", function(d) { return x.rangeBand()/3+25; })
        .attr("y", function(d) { return y(d.y1); })
        .attr("height", function(d) { return y(d.y0) - y(d.y1); })
        .style("fill", function(d) { return color(d.col); });

    bar_enter4.append("text")
        .text(function(d) { return d3.format(".2s")(d.y1-d.y0)+" cases"; })
        .attr("y", function(d) { return y(d.y1)+(y(d.y0) - y(d.y1))/2; })
        .attr("x", x.rangeBand()/2)
        .style("text-anchor", "middle")
        .style("fill", "#fff")
        .style("font-size", "24px");

    bar4.on("mouseover", function(d){
            tooltip.style("opacity", 0.8)
                .style("left", (d3.event.pageX)+0 + "px") 
                .style("top", (d3.event.pageY)-0 + "px")
                .style("display", "inline-block");
            var elements = document.querySelectorAll(':hover');
            var l = elements.length;
            var l = l-1;
            var element = elements[l].__data__;
            var percent = Math.round(((element.y1 - element.y0)/d.total)*100);
            var text1 = d.label + "<br>from " + element.col + " Traffic Outside NYC<br><span class='large'>" + percent + "%</span>";
            var text2 = d.label + "<br>from " + element.col + "<br><span class='large'>" + percent + "%</span>";
            tooltip.html(function(d){ 
                return element.col == "All" ? text1 : text2;
            })
        })

    bar4.on("mouseout", function(d){
            tooltip.style("display", "none");
        })

    // chart title
    svg4.append("text")
        .attr("x", width/2)             
        .attr("y", height+100)
        .attr("text-anchor", "middle")  
        .style("font-size", "30px") 
        .style("text-decoration", "none")  
        .text("Deaths")
        .style("fill", "#0a2538")
        .style("font-weight", 500);
     


    function wrap(text, width) {
      text.each(function() {
        var text = d3.select(this),
            words = text.text().split(/\s+/).reverse(),
            word,
            line = [],
            lineNumber = 0,
            lineHeight = 1.1, // ems
            y = text.attr("y"),
            dy = parseFloat(text.attr("dy")),
            tspan = text.text(null).append("tspan").attr("x", 0).attr("y", y).attr("dy", dy + "em");
        while (word = words.pop()) {
          line.push(word);
          tspan.text(line.join(" "));
          if (tspan.node().getComputedTextLength() > width) {
            line.pop();
            tspan.text(line.join(" "));
            line = [word];
            tspan = text.append("tspan").attr("x", 0).attr("y", y).attr("dy", ++lineNumber * lineHeight + dy + "em").text(word);
          }
        }
      });
    }

    var legendData4 = [
        { "name": "Trucks and buses in NYC", "color": "#c92b2b" },
        { "name": "Cars in NYC", "color": "#16c1d3" },
        { "name": "All motor vehicles outside NYC", "color": "#1ead5e" }
    ];

    // responsive legend container
    var legend4 = d3.select("#slide4Text").append("div").attr("width", "200px").attr("height", "200px")
        //.classed("svg-container-legend", true) 
        .append("svg");
        // .attr("preserveAspectRatio", "xMinYMin meet")
        // .attr("viewBox", "0 0 463.9 200.2") 
        // .classed("svg-content-responsive", true);

    // draw legend boxes
    var legendBox = legend4.selectAll("rect")
        .data(legendData4)
        .enter()
        .append("g")
        .append("rect")
        .attr("width", "15").attr("height", "15")
        .attr("y", function (d, i) { return (i+1) * 18; })            
        .attr("x", 0)
        .attr("class", "legendBox")
        .style("fill", function(d) { return d.color; });

    //label legend boxes
    var legendLabel4 = legend4.selectAll("text")
        .data(legendData4)
        .enter()                        
        .append("text")
        .attr("y", function (d, i) { return (i+1) * 18; })
        .attr("x", 20)
        .attr("dy", ".70em")
        .attr("class", "legendLabel")
        .text(function(d) { return d.name; }); 

    d3.select(self.frameElement).style("height", height + "px");


})();



