(function(window, document, undefined){

	var make_map = (function(error, data, data_quake){

		console.log(data_quake);

	  	var width = 460,
	      	height = 300
	      	set_scale = 1;

	  	var projection = d3.geo.mercator()
	      	.center([0, 0])
	      	.scale((width) / 2 / Math.PI)
	      	.rotate([180,0])
	      	.translate([width / 2, height / 2]);

	  	var path = d3.geo.path()
	      	.projection(projection);

	  	var svg = d3.select("#map").append("svg")
	      	.attr("width", width)
	      	.attr("height", height)
	      	.append("g");

	    //create a svg path using the geo data
    	svg.selectAll("path")
      		.data(topojson.feature(data, data.objects.countries).features)
    	.enter()
      		.append("path")
      	.attr("d", path)
      	.attr("class", "country");

/*      	//Add Circles to the map to represent the earthquakes
      	//Using the Magnitude for the size
      	var circles = svg.selectAll("circle")   
			       .data(data_quake.features)
		      .enter()
			       .append("circle");

       circles.attr("cx", function (d) { return projection(d.geometry.coordinates)[0]; })
       			.attr("cy", function (d) {  return projection(d.geometry.coordinates)[1]; })
       			.attr("r", function (d) { return (d.properties.mag * 2)/set_scale; })
       			.attr("fill",  "#657536")
       			.attr("stroke", "black")
       			.attr("opacity", "0.5");

       	//create a pan and zoom function on the map
       	var zoom = d3.behavior.zoom()
    		.on("zoom",function() {
        		svg.attr("transform","translate("+ 
            	d3.event.translate.join(",")+")scale("+d3.event.scale+")");
            	//capture the current scale value
            	set_scale = d3.event.scale;
        		//pan and scale the map
        		svg.selectAll("path")  
            		.attr("d", path.projection(projection)); 
            	//scale the circles
            	circles.attr("r", function (d) { return (d.properties.mag * 2)/set_scale; })
            		.attr("stroke-width", function(d) {return 1/set_scale;})
		    });
    	 //call the zoom function
		    svg.call(zoom)*/
	});

	queue()
		.defer(d3.json, "data_map/world.json")
		.defer(d3.json, "data_quake/earthquake.json")
		.await(make_map);

})(this, document);