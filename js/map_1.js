(function(window, document, undefined){

  var width = 460,
      height = 300;

  var projection = d3.geo.mercator()
      .center([0, 0])
      .scale((width) / 2 / Math.PI)
      .rotate([0,0])
      .translate([width / 2, height / 2]);

  var path = d3.geo.path()
      .projection(projection);

  var svg = d3.select("#map").append("svg")
      .attr("width", width)
      .attr("height", height)
      .append("g");

  // load the geojson file for the world and display the map
  d3.json("data_map/world.json", function(error, data) {

    //have a look at the data in the console
    console.log(data)

    ////UNCOMMENT CODE
    // svg.selectAll("path")
    //   .data(topojson.feature(data, data.objects.countries).features)
    // .enter()
    //   .append("path")
    //   .attr("d", path)
    //   .attr("class", "country");

    ////add styles with d3
    // svg.attr('fill', '#C39A74')
    //     .attr('stroke', 'blue')
    //     .attr('stroke-width', '0.3');

  });
})(this, document);