(function(){
    // // build section2 scenes
    // $(function () { // wait for document ready

    //  var scene0a = new ScrollMagic.Scene({triggerElement: ".section2", offset: 0, duration: 530})
    //         .setClassToggle("#slide2Text", "show") // show slide2 text
    //         .addIndicators({name: "show slide2 title"})
    //         .addTo(controller);

    //     // var scene0b = new ScrollMagic.Scene({triggerElement: ".section2", offset: 30, duration: 530})
    //     //     .setClassToggle("#slide2Text", "show") // show slide2 text
    //     //     .addIndicators({name: "show slide2 text"})
    //     //     .addTo(controller);

    //     var scene1 = new ScrollMagic.Scene({triggerElement: ".section2", offset: 0, duration: 530})
    //         .setClassToggle("#slide2Graph", "show") // show slide2 graph
    //         .addIndicators({name: "show slide2 div"})
    //         .addTo(controller);
     
    // // remove previously added indicators - uncomment when done
    // // scene0a.removeIndicators();
    // // scene0b.removeIndicators();
    // // scene1.removeIndicators();

    // });


    /////////////////////////////////////////////////////////////////////////

    // SCENE TWO ////////////////////////////////////////////////////////////

    /////////////////////////////////////////////////////////////////////////

    // slide2 headline
    var slide2Div = d3.select(".section2"),
        slide2Text = slide2Div.append("div")
            .attr("class", "col-xs-12 col-sm-4 col-md-4")
            .attr("id", "slide2Text")
            .style("margin-top", "50px")
            .style("font-weight", 300);

    var text_large = "Major sources of PM2.5 in NYC",
        text_small = "<span style='font-weight: bold'>17%</span> of all emissions come from traffic.<br/> Touch the chart to see source contributions.";

    var slide2title = slide2Text.append("h1").text(text_large),
        slide2text = slide2Text.append("h3").html(text_small);

    // slide 2 div container 
    var slide2Graph = slide2Div.append("div")
        .attr("class", "col-xs-12 col-sm-8 col-md-8")
        .attr("id", "slide2Graph")
        //.style("margin-top", "50px")
        .style("font-family", "'Open Sans', sans-serif")
        .style("font-weight", 300);

    // donut chart adapted from http://bl.ocks.org/metmajer/5480307
    var margin = {top: 20, right: 20, bottom: 20, left: 20};

    var width = 500-margin.left - margin.right,
        height = 500 - margin.top - margin.bottom,
        radius = (Math.min(width, height) / 2) - 10;

    var formatNumber = d3.format(",d");

    var percentBase = 100;

    var x = d3.scale.linear()
        .range([0, 2 * Math.PI]);

    var y = d3.scale.linear()
        .range([0, radius]);

    var partition = d3.layout.partition()
        .value(function(d) { return d.size; });

    // responsive svg
    var svg2 = d3.select("#slide2Graph").append("svg")
        .attr("class", "svg2")
        .attr("width", '60%')
      //  .attr("height", '60%')
        .attr("height", '900px')
        .attr('viewBox','0 0 '+Math.min(width,height)+' '+Math.min(width,height))
        .attr('preserveAspectRatio','xMinYMin')
        .append("g")
        .attr("transform", "translate(" + Math.min(width,height) / 2 + "," + Math.min(width,height) / 2 + ")");

    var arc = d3.svg.arc()
        .startAngle(function(d) { return Math.max(0, Math.min(2 * Math.PI, x(d.x))); })
        .endAngle(function(d) { return Math.max(0, Math.min(2 * Math.PI, x(d.x + d.dx))); })
        .innerRadius(function(d) { return Math.max(0, y(d.y)); })
        .outerRadius(function(d) { return Math.max(0, y(d.y + (d.dy))); });

    
    // tooltip
    var tooltip = d3.select("body").append("div")   
        .attr("class", "tooltip")               
        .style("opacity", 0);

    d3.json("sources.json", function(error, root) {
        if (error) throw error;

        //console.log(root);

        var g = svg2.selectAll("path")
            .data(partition.nodes(root))
            .enter().append("g");

        var path = g.append("path")
            .attr("d", arc)
            .style("fill", function(d) { 
                return d.name == 'Traffic' || d.name == "Trucks" || d.name == "Buses" || d.name == "Cars" ? d.color : d.name == "Sources" ? "#d8c51d": "grey"; })
            .style("stroke", "white")
            .style("stroke-width", "1px")
            //.on("click", click)
            .on("mouseover", function(d,i) {
                d3.select(this).style("cursor", "pointer")
                //tooltip.text(d.name + " " + d.percent)
                var totalSize = path.node().__data__.value;
                var percentage = Math.round(((100 * d.value / totalSize) * 100) / percentBase);

                // var number = (d.value/totalSize) * 100;
                // var rounded = Math.round(number * 10 ) / (percentBase / 10);
                // percentage = Math.round(((d.value/totalSize) * 100) * 10 ) / (percentBase / 10);
                // console.log(number, rounded, percentage);

                var percentageString = percentage + "%";
                if (d.name == "Sources") return null;
                tooltip.text(d.name +" "+percentageString)
                    .style("opacity", 0.8)
                    .style("left", (d3.event.pageX)+0 + "px") 
                    .style("top", (d3.event.pageY)-0 + "px");
                if (d.name == "Sources"){
                    return null;
                }
            })
            .on("mouseout", function(d) {  
                d3.select(this).style("cursor", "default")    
                tooltip.style("opacity", 0); 
            });

            
        var text = g.append("text")
            //.attr("transform", function(d) { return "rotate(" + computeTextRotation(d) + ")"; }) 
            .attr("transform", function(d) { 
                return "translate(" + arc.centroid(d) + ")rotate(" + computeTextRotation(d) + ")"; 
            })
            // .attr("text-anchor", function(d){
            //     return computeTextRotation(d) > 180 ? "end" : "start"; 
            // })
            .attr("text-anchor", "middle")
            .attr("dx", "0") // margin
            .attr("dy", ".35em") // vertical-align
            //.text(function(d) { return d.name != "Sources" ? d.name : null; })
            .text(function(d) {
                return d.name == "Commercial Cooking" ? "Cooking" : d.name == "Natural Gas" ? "Gas" : 
                d.name == "Construction Dust" ? "Construction Dust" : d.name == "Residual Oil" ? "Residual Oil" : 
                d.name == "Distillate Oil" ? "Distillate Oil" : d.name == "Non-Road" ? "Non Road" : 
                d.name == "Non Road Equipment" ? "Non Road Equipment" : d.name == "Marine Vessels" ? "Marine Vessels" : 
                d.name == "Electric Generation" ? "Electric Generation" : d.name == "Road Dust" ? "Road Dust" : 
                d.name == "Sources" ? null : d.name;      
            })
            .style("font-size", "10px")
            .style("font-weight", "bold")
            .style("fill", "#0a2538")
            .call(wrap,50);

        function wrap(text, width) {
              text.each(function() {
                var text = d3.select(this),
                    words = text.text().split(/\s+/).reverse(),
                    word,
                    line = [],
                    lineNumber = 0,
                    lineHeight = .4, // ems
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


        function click(d) {
            percentBase = parseFloat(d.percent.split("%")[0]);            
            if(d.name == "Sources") percentBase = 100;
            console.log(percentBase)
            // fade out all text elements
            text.transition().attr("opacity", 0);

            path.transition()
                .duration(750)
                .attrTween("d", arcTween(d))
                .each("end", function(e, i) {
                    // check if the animated element's data e lies within the visible angle span given in d
                    if (e.x >= d.x && e.x < (d.x + d.dx)) {
                        // get a selection of the associated text element
                        var arcText = d3.select(this.parentNode).select("text");
                        // fade in the text element and recalculate positions
                        arcText.transition().duration(300)
                            .attr("opacity", 1)
                            //.attr("transform", function() { return "rotate(" + computeTextRotation(e) + ")" })
                            .attr("transform", function(d) {
                                return "translate(" + arc.centroid(d) + ")rotate(" + computeTextRotation(d) + ")";
                            })
                            // .attr("text-anchor", function(d) {
                            //     return computeTextRotation(d) > 180 ? "end" : "start";
                            // })
                            .attr("text-anchor", "middle");
                    }
                });
        }

        // var legendData = [
        //     { "name": "Traffic Sources", "color": "#16c1d3" },
        //     { "name": "Building Sources", "color": "#1ead5e" },
        //     { "name": "Electric Generation Sources", "color": "#c95b55" },       
        //     { "name": "Road Dust Sources", "color": "#dd7812" },
        //     { "name": "Non-Road Sources", "color": "#7f7975" },
        //     { "name": "Other Sources", "color": "#5e5ea5" }
        // ];
            
        // // responsive legend container
        // var legend = d3.select("#slide2Text").append("div")
        //     //.classed("svg-container-legend", true) 
        //     .append("svg");
        //     // .attr("preserveAspectRatio", "xMinYMin meet")
        //     // .attr("viewBox", "0 0 463.9 200.2") 
        //     // .classed("svg-content-responsive", true);

        // // draw legend boxes
        // var legendBox = legend.selectAll("rect")
        //     .data(legendData)
        //     .enter()
        //     .append("g")
        //     .append("rect")
        //     .attr("y", function (d, i) { return (i+1) * 18; })            
        //     .attr("x", 0)
        //     .attr("class", "legendBox")
        //     .style("fill", function(d) { return d.color; });

        // //label legend boxes
        // var legendLabel = legend.selectAll("text")
        //     .data(legendData)
        //     .enter()                        
        //     .append("text")
        //     .attr("y", function (d, i) { return (i+1) * 18; })
        //     .attr("x", 20)
        //     .attr("dy", ".70em")
        //     .attr("class", "legendLabel")
        //     .text(function(d) { return d.name; }); 

    });


    d3.select(self.frameElement).style("height", height + "px");

    // Interpolate the scales!
    function arcTween(d) {
      var xd = d3.interpolate(x.domain(), [d.x, d.x + d.dx]),
          yd = d3.interpolate(y.domain(), [d.y, 1]),
          yr = d3.interpolate(y.range(), [d.y ? 20 : 0, radius]);
      return function(d, i) {
        return i
            ? function(t) { return arc(d); }
            : function(t) { x.domain(xd(t)); y.domain(yd(t)).range(yr(t)); return arc(d); };
      };
    }

    function computeTextRotation(d) {
        //return (x(d.x + d.dx / 2) - Math.PI / 2) / Math.PI * 180;
        var ang = (x(d.x + d.dx / 2) - Math.PI / 2) / Math.PI * 180;
        return (ang > 90) ? 180 + ang : ang;
    }


})();