(function(){
    // // build section3 scenes
    // $(function () { // wait for document ready

    // 	var scene0 = new ScrollMagic.Scene({triggerElement: ".section3", offset: 0, duration: 530})
    //         .setClassToggle("#slide3Text", "show") // show slide3 text
    //         .addIndicators({name: "show slide3 title"})
    //         .addTo(controller);

    //     var scene1 = new ScrollMagic.Scene({triggerElement: ".section3", offset: 0, duration: 530})
    //         .setClassToggle("#slide3Graph", "show") // show slide3 graph
    //         .addIndicators({name: "show slide3 div"})
    //         .addTo(controller);
     
    // // remove previously added indicators - uncomment when done
    // // scene0.removeIndicators();
    // // scene1.removeIndicators();

    // });


    /////////////////////////////////////////////////////////////////////////

    // SCENE THREE //////////////////////////////////////////////////////////

    /////////////////////////////////////////////////////////////////////////

    // slide3 headline
    var slide3Div = d3.select(".section3"),
        slide3Text = slide3Div.append("div")
            .attr("class", "col-xs-12 col-sm-4 col-md-4")
            .attr("id", "slide3Text")
            .style("margin-top", "50px")
            .style("font-weight", 300);

    var text_large = "PM2.5 pollution from traffic is not evenly distributed throughout the city",
        text_small = "Select from the following list:";

    var slide3title = slide3Text.append("h1").text(text_large),
        slide3text = slide3Text.append("h3").html(text_small);

    // slide 3 div container 
    var slide3Graph = slide3Div.append("div")
        .attr("class", "col-xs-12 col-sm-8 col-md-8")
        .attr("id", "slide3Graph")
        //.style("margin-top", "50px")
        .style("font-family", "'Open Sans', sans-serif")
        .style("font-weight", 300);


    // add dropdown element
    var array = ["All On-Road Traffic in Region", "All On-Road Traffic Within NYC",
        "Trucks and Buses Within NYC", "Cars Within NYC", "All On-Road Traffic, Outside NYC", "PM2.5 from all sources"];

    var array2 = ["map-02.png", "map-03.png", "map-04.png", "map-05.png", "map-06.png", "map-01.png"];

    var dropDown = d3.select("#slide3Text").append("select")
        .attr("class", "selectpicker")
        .attr("data-style", "btn-primary")
        .attr("name", "Select an item");

    var options = dropDown.selectAll("option")
        .data(array)
        .enter()
        .append("option");

    var optionText = options.text(function (d) { return d; })
        .attr("value", function (d) { return d; });


    function initMap() {
        var mapArea = d3.select("#slide3Graph").append("div").attr("class", "map");
        var initImg = mapArea.html("<img src='" + array2[0] + "'>");
        legendB();
    }

    dropDown.on("change", menuUpdate);

    function menuUpdate() {
        //get the data value and index from the event
        var selectedValue = d3.event.target.value;
        var selectedIndex = d3.event.target.selectedIndex;

        if (selectedValue == array[0]) {        
            d3.select(".map").html("<img src='" + array2[0] + "'>");
            //removeLegend();
            legendB();
        } else if (selectedValue == array[1]) {
            d3.select(".map").html("<img src='" + array2[1] + "'>");
            //removeLegend();
            legendB();
        } else if (selectedValue == array[2]) {
            d3.select(".map").html("<img src='" + array2[2] + "'>");
            //removeLegend();
            legendB();
        } else if (selectedValue == array[3]) {
            d3.select(".map").html("<img src='" + array2[3] + "'>");
            //removeLegend();
            legendB();
        } else if (selectedValue == array[4]) {
            d3.select(".map").html("<img src='" + array2[4] + "'>");
            //removeLegend();
            legendB();
        } else if (selectedValue == array[5]) {
            d3.select(".map").html("<img src='" + array2[5] + "'>");
            //removeLegend();
            legendA();
        } 
           
    }

    // responsive legend container
    var legend3 = d3.select("#slide3Text").append("div")
        //.classed("svg-container-legend", true) 
        .append("svg")
        // .attr("preserveAspectRatio", "xMinYMin meet")
        // .attr("viewBox", "0 0 480 200.2") 
        // .classed("svg-content-responsive", true)
        .attr("class", "legend3");

    // legend for brown color scheme
    function legendA() {
        var legendData3a = [
            { "name": "7.17-8.09", "color": "#ffff99" },
            { "name": "8.10-8.67", "color": "#fce681" },
            { "name": "8.68-9.33", "color": "#fad06e" },
            { "name": "9.34-10.11", "color": "#f5b958" },
            { "name": "10.12-11.26", "color": "#d18b49" },
            { "name": "11.27-12.98", "color": "#ab623e" },
            { "name": "12.99-19.41", "color": "#8a3934" }
        ];

        removeLegend();

        // draw legend boxes
        var legendBox3a = legend3.selectAll("rect")
            .data(legendData3a)
            .enter()
            .append("g")
            .append("rect")
            .attr("width", "15").attr("height", "15")
            .attr("y", function (d, i) { return (i+1) * 18; })            
            .attr("x", 0)
            .attr("class", "legendBox3")
            .style("fill", function(d) { return d.color; });

        //label legend boxes
        var legendLabel3a = legend3.selectAll("text")
            .data(legendData3a)
            .enter()                        
            .append("text")
            .attr("y", function (d, i) { return (i+1) * 18; })
            .attr("x", 20)
            .attr("dy", ".70em")
            .attr("class", "legendLabel3")
        //.html(function(d) { return d.name + " &#181;g/m&sup3;"; }); 
         .text(function (d) { return d.name + $.parseHTML(" &#181;g/m&sup3;")[0].data; });
    }

    // legend for red color scheme
    function legendB() {
        var legendData3b = [
            { "name": "0.09-0.32", "color": "#ffefde" },
            { "name": "0.33-0.56", "color": "#f7d5be" },
            { "name": "0.57-0.83", "color": "#f0bba1" },
            { "name": "0.84-1.09", "color": "#e69b83" },
            { "name": "1.10-1.37", "color": "#de7e6a" },
            { "name": "1.38-1.74", "color": "#d65c51" },
            { "name": "1.75-2.60", "color": "#d13b3b" }
        ];

        removeLegend();

        // draw legend boxes
        var legendBox3b = legend3.selectAll("rect")
            .data(legendData3b)
            .enter()
            .append("g")
            .append("rect")
            .attr("width", "15").attr("height", "15")
            .attr("y", function (d, i) { return (i+1) * 18; })            
            .attr("x", 0)
            .attr("class", "legendBox3")
            .style("fill", function(d) { return d.color; });

        //label legend boxes
        var legendLabel3b = legend3.selectAll("text")
            .data(legendData3b)
            .enter()                        
            .append("text")
            
            .attr("y", function (d, i) { return (i+1) * 18; })
            .attr("x", 20)
            .attr("dy", ".70em")
            .attr("class", "legendLabel3")
        //.text(function (d) { return d.name + " &#181;g/m&sup3;"; }); µg / m³
        .text(function (d) { return d.name + $.parseHTML(" &#181;g/m&sup3;")[0].data; });
        //debugger
        //console.log($.parseHTML("&#181;g/m&sup3;"))
    }

    function removeLegend() {
        d3.selectAll(".legendBox3").remove();
        d3.selectAll(".legendLabel3").remove();
    }


    window.onload = initMap();

})();





