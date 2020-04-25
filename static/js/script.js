
var width = 1000,
    height = 600;

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
        .attr("r", 5)
        .attr("fill", "black")
        .attr("transform", (d) => "translate(" + projection([d.longitude, d.latitude]) + ")");
    // draw the line
    var line = svg.selectAll(".line")
        .data(dataAir.links)
        .enter().append("line")
        .attr("class", "line")
        .style("stroke", "#ccc")
        .style("stroke-width", 1)
        .attr("x1", (d) => projection([dataAir.nodes[d.source].longitude, dataAir.nodes[d.source].latitude])[0])
        .attr("y1", (d) => projection([dataAir.nodes[d.source].longitude, dataAir.nodes[d.source].latitude])[1])
        .attr("x2", (d) => projection([dataAir.nodes[d.target].longitude, dataAir.nodes[d.target].latitude])[0])
        .attr("y2", (d) => projection([dataAir.nodes[d.target].longitude, dataAir.nodes[d.target].latitude])[1]);

}