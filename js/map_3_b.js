(function(window, document, undefined){

	var make_map = (function(data){

		var text_box = $( '#box' );

		var radius_scale = function(data){
			return d3.scale.linear().domain([0, d3.max(data, function(d){return d.properties.mag;})]).range([1, 10]);
		}

		var color_scale = function(data){
			return d3.scale.linear().domain([0, d3.max(data, function(d){return d.properties.mag;})]).range(['yellow', 'red']);
		}

		var map = L.map('map_leaflet').setView([32.546813 , -1.054688], 1),
        mapLink = 
            '<a href="http://openstreetmap.org">OpenStreetMap</a>';
        L.tileLayer(
            'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; ' + mapLink + ' Contributors',
            maxZoom: 12,
            minZoom:1
            }).addTo(map);

        // new L.Control.Zoom({ position: 'topright' }).addTo(map);

        // Initialize the SVG layer
		map._initPathRoot() 

		 // We pick up the SVG from the map object
		var svg = d3.select("#map_leaflet").select("svg"),
		g = svg.append("g");	

		data.forEach(function(entry) {
		   entry.LatLng = new L.LatLng(entry.geometry.coordinates[1],
		      entry.geometry.coordinates[0])
		  })	

		var radius = radius_scale(data);
		var color = color_scale(data);
		  
		var feature = g.selectAll("circle")
		   .data(data)
		   .enter().append("circle")
		   .style("stroke", "black")  
		   .style("opacity", .8) 
		   .style("fill", function(d){ return color(d.properties.mag);}) 
		   .attr("r", function(d){ return radius(d.properties.mag);})
		   .attr("class", "earthquake_circle")
   			.on("click", function(d){
   		
   				$(text_box).empty();
   				$('<p>').text('magnitude: ' + d.properties.mag).appendTo(text_box);
   	 			$('<p>').text('Location: ' ).appendTo(text_box);
   			}); 

   			$(text_box).css({
   				"width": "460px",
   				"height": "auto"
   			})

		map.on("viewreset", update);
		update();

		function update() {
		   	feature.attr("transform", 
		   	function(d) { 
		       	return "translate("+ 
		    	map.latLngToLayerPoint(d.LatLng).x +","+ 
		    	map.latLngToLayerPoint(d.LatLng).y +")";
		    })
		}
     });
	$.getJSON('data_quake/earthquake.json',function(data){		
		make_map(data.features);
	});
})(this, document);