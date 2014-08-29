(function(window, document, undefined){

	var make_map = (function(error, data){

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

	});

	queue()
		.defer(d3.json, "data_map/world.json")
		.await(make_map);

})(this, document);