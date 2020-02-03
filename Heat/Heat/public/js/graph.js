var graph1 = d3.select("#graph1")
	.html("<p>Unfortunately, not everyone has air conditioning or can afford to use it. The chart below shows that New Yorkers living in the poorest neighborhoods have less air conditioning than New Yorkers living in wealthier neighborhoods.<br/><br/>\
		<b>Households Without Air Conditioning in 2014 by Neighborhood Poverty</b></p>"),
	graph1Image = d3.select("#graph1").append("div").attr("class", "graph1Img"),
	graph2 = d3.select("#graph2").html(""),
	graph3 = d3.select("#graph3")
		.html("<p>Unfortunately, not all older adults have air conditioning. As this map shows, the presence of air conditioning varies by neighborhood. <br/><br/><b>Adults 65+ Reporting Air Conditioning in the Home, 2013</b></p>"),
	graph3Image = d3.select("#graph3").append("div").attr("class", "graph3Img"),
	graph4 = d3.select("#graph4")
		.html("<p>This map shows that residents of some neighborhoods are more vulnerable to heat than residents of other communities.<br/><br/><b>Heat Vulnerability Risk, 2010</b></p>"),
	graph4Image = d3.select("#graph4").append("div").attr("class", "graph4Img"),
	graph5 = d3.select("#graph5").html("<p><span>Be a Buddy!</span></p>"),
	graph5Image = d3.select("#graph5")
		.append("div").attr("class", "graph5Img");


// var tooltip = d3.select("body").append("div")   
// 	.attr("class", "tooltip")               
// 	.style("opacity", 0);

// var veryLow = "#ddf2ee", low = "#bde5de", medium = "#8cd3c9", high = "#2db5a8", veryHigh = "#1b9385";  


// // GRAPH 2: HEAT EVENTS VS HEAT HOSP
// var heatEventsHospData = "public/data/heat_events_and_heat_hosp.csv";
// var margin = {top: 30, right: 40, bottom: 30, left: 40},
// 	// width = 350 - margin.left - margin.right,
// 	width = graph2.node().clientWidth - margin.left - margin.right,
// 	height = 300 - margin.top - margin.bottom;

// var x = d3.scaleTime().range([0, width]);
// var y0 = d3.scaleLinear().range([height, 0]);
// var y1 = d3.scaleLinear().range([height, 0]);
  
// var svg2 = d3.select("#graph2")
// 	.append("svg")
// 	.attr("width", width + margin.left + margin.right)
// 	.attr("height", height + margin.top + margin.bottom)
// 	.append("g")
// 	.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// var parseTime = d3.timeParse("%Y");



// // GRAPH 3: ADULTS 65+ WITH AC
// var ac65Data = "public/data/ac_over_65_projected.json";
// var projection = d3.geoMercator()
// 	.center([-73.94, 40.70])
// 	.scale(30000)
// 	.translate([(width) / 2, (height) / 2]);

// var path = d3.geoPath().projection(projection);     

// var margin = {top: 30, right: 40, bottom: 30, left: 40},
// 	width = graph3.node().clientWidth - margin.left - margin.right,
// 	height = 300 - margin.top - margin.bottom;

// var svg3 = d3.select("#graph3")
// 	.append("svg")
// 	.attr("width", width + margin.left + margin.right)
// 	.attr("height", height + margin.top + margin.bottom)
// 	.append("g")
// 	.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// var ac65 = d3.json(ac65Data, function(err, data) {
// 	if(err) throw err;

// 	var ac65Features = topojson.feature(data, data.objects.ac_over_65_projected).features;
// 	// console.log(ac65Features);

// 	ac65Features.forEach(function(d){
// 		d.value = +d.properties.data_value;
// 		d.uhfCode = +d.properties.UHF34_CODE;
// 		d.uhfName = d.properties.UHF_NAME;
// 		d.notes = d.properties.notes;
// 	});
	
// 	var min = d3.min(ac65Features, function(d) { return d.value; });
// 	var max = d3.max(ac65Features, function(d) { return d.value; });
	
// 	svg3.append("g")
// 		.attr("class", "g-ac65")
// 		.selectAll("path")
// 		.data(ac65Features)
// 		.enter()
// 		.append("path")
// 		.attr("class", "ac65")
// 		.attr("d", path)
// 		.style("stroke", "white")   
// 		.style("fill", function(d){
// 		return d.value < 69 ? "#ccc" : d.value >= 69 && d.value < 76 ? veryLow : d.value < 88 ? low : d.value < 92 ? medium : d.value < 94 ? high : veryHigh;
// 	  	})
// 		.style("cursor", "pointer")
// 		.on("mouseover", function(d,i){
// 			tooltip.style("opacity", 0.8)
// 				.style("left", (d3.event.pageX)+0 + "px") 
// 				.style("top", (d3.event.pageY)-0 + "px")
// 				.style("display", "inline-block");
// 			tooltip.html(d.uhfName + "<br/>" + d.value + "%");
// 		})
// 		.on("mouseout", function(d){ tooltip.style("display", "none"); });

// });

// var legend3 = svg3.append("svg").attr("class", "legend3")
// 	.append("g")
// 	.attr("transform", "translate(0, 0)");



// var legendData3 = [
// 	{ name: "> 69%", color: veryLow },
// 	{ name: "> 76%", color: low },
// 	{ name: "> 88%", color: medium },
// 	{ name: "> 92%", color: high },
// 	{ name: "> 94%", color: veryHigh }
// ];

// var legendBox3 = legend3.selectAll("rect")
// 	.data(legendData3)
// 	.enter()
// 	.append("g")
// 	.append("rect")
// 	.attr("height", 14)
// 	.attr("width", 14)
// 	.attr("y", function (d, i) { return (i+1) * 18; })            
// 	.attr("x", 0)
// 	.attr("class", "legendBox3")
// 	.style("fill", function(d) { return d.color; });

// var legendLabel3 = legend3.selectAll("text")
// 	.data(legendData3)
// 	.enter()                        
// 	.append("text")
// 	.attr("y", function (d, i) { return (i+1) * 18; })
// 	.attr("x", 20)
// 	.attr("dy", ".70em")
// 	.attr("class", "legendLabel3")
// 	.text(function(d) { return d.name; }); 




// // GRAPH 1: DISPARITY 
// var disparityData = "public/data/disparities.csv";

// var margin = { top: 30, right: 40, bottom: 30, left: 40 },
// 	width = graph1.node().clientWidth - margin.left - margin.right,
// 	height = 300 - margin.top - margin.bottom;

// var xx = d3.scaleBand().rangeRound([0, width]).padding(0.5);
// var yy = d3.scaleLinear().range([height, 0]);

// var svg1 = d3.select("#graph1")
// 	.append("svg")
// 	.attr("width", width + margin.left + margin.right)
// 	.attr("height", height + margin.top + margin.bottom)
// 	.append("g")
// 	.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// var disparity = d3.csv(disparityData, function(err, data){
// 	if(err) throw err;
// 	// console.log(data);

// 	data.forEach(function(d){
// 		d.value = +d.value;
// 	});

// 	xx.domain(data.map(function(d) { return d.poverty; }));
// 	// yy.domain([0, d3.max(data, function(d) { return d.value; })]);
//     yy.domain([0, 20]);

// 	var bar = svg1.selectAll(".bar")
// 		.data(data)
// 		.enter().append("rect")
// 		.attr("class", "bar")
// 		.style("fill", function(d){
// 			return d.poverty === "Low Poverty" ? low : high;
// 		})
// 		.attr("x", function(d) { return xx(d.poverty); })
// 		.attr("width", xx.bandwidth())
// 		.attr("y", function(d) { return yy(d.value); })
// 		.attr("height", function(d) { return height - yy(d.value); })
// 		.style("cursor", "pointer")
// 		.on("mouseover", function(d,i){
// 			tooltip.style("opacity", 0.8)
// 				.style("left", (d3.event.pageX)+0 + "px") 
// 				.style("top", (d3.event.pageY)-0 + "px")
// 				.style("display", "inline-block");
// 			tooltip.html(d.poverty + "<br/>" + d.value + "%");
// 		})
// 		.on("mouseout", function(d){ tooltip.style("display", "none"); });

// 	svg1.append("g")
// 		.attr("class", "poverty")
// 		.attr("transform", "translate(0," + height + ")")
// 		.call(d3.axisBottom(xx))
// 		.append("text")
// 		.attr("x", width)
// 		.attr("dy", "-0.5em")
// 		.attr("text-anchor", "end")
// 		.text("Neighborhoods")
// 		.style("fill", "black");

// 	svg1.append("g")
// 		.attr("class", "poverty")
// 		.call(d3.axisLeft(yy))
// 		.append("text")
// 		.attr("transform", "rotate(-90)")
// 		.attr("y", 6)
// 		.attr("dy", "0.5em")
// 		.attr("text-anchor", "end")
// 		.text("% of Households")
// 		.style("fill", "black");
 
//     svg1.append("g")
//         .attr("class", "label")
//         .selectAll("text")
//         .data(data)
//         .enter().append("text")
//         .attr("class", "label")
//         .text(function(d){ return Math.round(d.value) })
//         .attr("text-anchor", "middle")
//         .attr("x", function(d, i){
//             return xx(d.poverty) + (xx.bandwidth() / 2);
//         })  
//         .attr("y", function(d){
//             return yy(d.value) + 10;
//         })
//         .attr("dy", ".75em");

// })




// // GRAPH 4: HVI
// var hviData = "public/data/hvi_projected.json";

// var margin = {top: 30, right: 40, bottom: 30, left: 40},
// 	width = graph1.node().clientWidth - margin.left - margin.right,
// 	height = 300 - margin.top - margin.bottom;

// var svg4 = d3.select("#graph4")
// 	.append("svg")
// 	.attr("width", width + margin.left + margin.right)
// 	.attr("height", height + margin.top + margin.bottom)
// 	.append("g")
// 	.attr("transform", "translate(" + margin.left + "," + margin.top + ")")
// 	.style("border", "solid 1px black");

// var hvi = d3.json(hviData, function(err, data) {
// 	if(err) throw err;

// 	var hviFeatures = topojson.feature(data, data.objects.hvi_projected).features;
// 	// console.log(hviFeatures);

// 	hviFeatures.forEach(function(d){
// 		d.value = +d.properties.data_value;
// 		d.cdName = d.properties.geography_;
// 		d.notes = d.properties.notes;
// 	});
	
// 	var min = d3.min(hviFeatures, function(d) { return d.value; });
// 	var max = d3.max(hviFeatures, function(d) { return d.value; });
// 	// console.log(min, max);  // 0, 5

// 	svg4.append("g")
// 		.attr("class", "g-hvi")
// 		.selectAll("path")
// 		.data(hviFeatures)
// 		.enter()
// 		.append("path")
// 		.attr("class", "hvi")
// 		.attr("d", path)
// 		.style("stroke", "white")   
// 		.style("fill", function(d){
// 			return d.value === 0 ? "#ccc" : d.value === 1 ? veryLow : d.value === 2 ? low : d.value === 3 ? medium : d.value === 4 ? high : veryHigh; 
// 		})
// 		.style("cursor", "pointer")
// 		.on("mouseover", function(d,i){
// 			tooltip.style("opacity", 0.8)
// 				.style("left", (d3.event.pageX)+0 + "px") 
// 				.style("top", (d3.event.pageY)-0 + "px")
// 				.style("display", "inline-block");
// 			tooltip.html(d.cdName.split("(")[0] + "<br/>" + d.value);
// 		})
// 		.on("mouseout", function(d){ tooltip.style("display", "none"); });
	
// });

// var legend4 = svg4.append("svg").attr("class", "legend4");
// var legendData4 = [
// 	{ name: "1 (Low)", color: veryLow },
// 	{ name: "2", color: low },
// 	{ name: "3", color: medium },
// 	{ name: "4", color: high },
// 	{ name: "5 (High)", color: veryHigh }
// ];

// var legendBox4 = legend4.selectAll("rect")
// 	.data(legendData4)
// 	.enter()
// 	.append("g")
// 	.append("rect")
// 	.attr("height", 14)
// 	.attr("width", 14)
// 	.attr("y", function (d, i) { return (i+1) * 18; })            
// 	.attr("x", 0)
// 	.attr("class", "legendBox4")
// 	.style("fill", function(d) { return d.color; });

// var legendLabel4 = legend4.selectAll("text")
// 	.data(legendData4)
// 	.enter()                        
// 	.append("text")
//     .attr("text-anchor", "start")
// 	.attr("y", function (d, i) { return (i+1) * 18; })
// 	.attr("x", 20)
// 	.attr("dy", ".70em")
// 	.attr("class", "legendLabel4")
// 	.text(function(d) { return d.name; }); 

