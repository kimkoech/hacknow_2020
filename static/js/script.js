
var width = 1000,
    height = 800;

var svg = d3.select("#chart-area").append("svg")
    .attr("width", width)
    .attr("height", height);

//Define map projection
var projection = d3.geoMercator()
// var projection = d3.geoOrthographic()
    // .center([width/2, height/2])
    .translate([width/2, height/2])
    .scale([100]);
//Define path generator
var path = d3.geoPath()
    .projection(projection);

// Load data parallel
queue()
    .defer(d3.json, "/static/data/world-110m.json")
    .defer(d3.json, "/static/data/airports.json")
    .await(createVisualization);

function createVisualization(error, dataMap, dataAir) {
    console.log(dataMap);
    console.log(dataAir);
    // Convert TopoJSON to GeoJSON (target object = 'states')
    var country = topojson.feature(dataMap, dataMap.objects.countries).features;

    // Render the U.S. by using the path generator
    svg.selectAll("path")
        .data(country)
        .enter().append("path")
        .attr("class", "map")
        .attr("d", path);
    // Create circle
    svg.selectAll(".airport")
        .data(dataAir.nodes)
        .enter().append("circle")
        .attr("class", "airport")
        .attr("r", 3)
        .attr("fill", "black")
        .attr("transform", (d) => "translate(" + projection([d.longitude, d.latitude]) + ")");

}