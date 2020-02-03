(function(){
    // // build section5a scenes
    // $(function () { // wait for document ready

    // 	var scene0 = new ScrollMagic.Scene({triggerElement: ".section5a", offset: 0, duration: 930})
    //         .setClassToggle("#slide5aText", "show") // show slide5a text
    //         .addIndicators({name: "show slide5a title"})
    //         .addTo(controller);

    //     var scene1 = new ScrollMagic.Scene({triggerElement: ".section5a", offset: 200, duration: 730})
    //         .setClassToggle("#slide5aGraph", "show") // show slide5a graph
    //         .addIndicators({name: "show slide5a div"})
    //         .addTo(controller);
     
    // // remove previously added indicators - uncomment when done
    // // scene0.removeIndicators();
    // // scene1.removeIndicators();

    // });


    /////////////////////////////////////////////////////////////////////////

    // SCENE FIVE-A /////////////////////////////////////////////////////////

    /////////////////////////////////////////////////////////////////////////

    // slide5 headline
    var slide5aDiv = d3.select(".section5a"),
        slide5aText = slide5aDiv.append("div")
            .attr("class", "col-xs-12 col-sm-4 col-md-4")
            .attr("id", "slide5aText")
            .style("margin-top", "50px")
            .style("color", "#0a2538")
            .style("font-weight", 300);

    var text_large = "PM2.5 and related health problems from traffic are highest in the poorest neighborhoods",
        text_small = "this is some text. <br/> \
    	<span>this is a span</span>";

    var slide5atitle = slide5aText.append("h1").html(text_large);
        
    // add dropdown element
    var array = ["All Traffic sources", "Trucks + Buses"];

    var dropDown = d3.select("#slide5aText").append("select")
        .attr("class", "selectpicker")
        .attr("data-style", "btn-primary")
        .attr("name", "Select an item");

    var options = dropDown.selectAll("option")
        .data(array)
        .enter()
        .append("option");

    var optionText = options.text(function (d) { return d; })
        .attr("value", function (d) { return d; });

    

    var slide5atext = slide5aText.append("h3")
        //.html(text_small);

    // slide5 div container 
    var slide5aGraph = slide5aDiv.append("div")
        .attr("class", "col-xs-12 col-sm-8 col-md-8")
        .attr("id", "slide5aGraph")
        .style("margin-top", "50px")
        .style("font-family", "'Open Sans', sans-serif")
        .style("font-weight", 300);


    var width = 960,
        height = 500;


    // responsive svg
    var svg5a = d3.select("#slide5aGraph").append("div")
        .attr("class", "responsive5aImg")
        .style("margin-top", "50px");
 
    // Show all traffic drawing
    function img01() {
        d3.select(".responsive5aImg").html("<img src='5a-02.png'>");

        slide5atext.html("PM2.5 levels from all traffic sources are \
            <span style='color:#ffffff;font-weight:bold;'>50% higher</span> in high poverty neighborhoods \
            relative to low poverty neighborhoods");
    }

    // show buses + trucks
    function img02() {
        d3.select(".responsive5aImg").html("<img src='5a-03.png'>");

        slide5atext.html("PM2.5 levels from trucks and buses are \
            <span style='color:#ffffff;font-weight:bold;'>70% higher</span> in high poverty neighborhoods \
            relative to low poverty neighborhoods");
    }
    

    dropDown.on("change", menuUpdate);

    function menuUpdate() {
        //get the data value and index from the event
        var selectedValue = d3.event.target.value;
        var selectedIndex = d3.event.target.selectedIndex;

        if (selectedValue == array[0]) {                        
            d3.selectAll(".img2").remove();
            img01();  
        } else if (selectedValue == array[1]) {                        
            d3.selectAll(".img1").remove();
            img02();  
        }          
    }
    
    window.onload = img01();

   
})();

