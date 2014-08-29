(function(window, document, undefined){

	var make_map = (function(error, data, data_quake){

		var text_box = $( '#box' );

	  	var width = 460,
	      	height = 300;

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

    	svg.selectAll("path")
      		.data(topojson.feature(data, data.objects.countries).features)
    	.enter()
      		.append("path")
      	.attr("d", path)
      	.attr("class", "country");

      	var circles = svg.selectAll("circle")   
			.data(data_quake.features)
		.enter()
			.append("circle");

       circles.attr("cx", function (d) { return projection(d.geometry.coordinates)[0]; })
       			.attr("cy", function (d) {  return projection(d.geometry.coordinates)[1]; })
       			.attr("r", function (d) { return d.properties.mag * 2; })
       			.attr("fill", "#657536")
       			.attr("stroke", "black")
       			.attr("opacity", "0.5")
       			.on("click", function(d){
       				$(text_box).empty();
       				$('<p>').text('magnitude: ' + d.properties.mag).appendTo(text_box);
       	 			$('<p>').text('Location: ' ).appendTo(text_box);
       			});

		$( text_box ).css({
			"width": width,
			"height": "auto"
		});

	});

	queue()
		.defer(d3.json, "data_map/world.json")
		.defer(d3.json, "data_quake/earthquake.json")
		.await(make_map);

})(this, document);