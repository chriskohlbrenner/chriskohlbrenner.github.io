// IV. SCATTERPLOT
// var dataset = [
//   [ 5,     20 ],
//   [ 480,   90 ],
//   [ 250,   50 ],
//   [ 100,   33 ],
//   [ 330,   95 ],
//   [ 410,   12 ],
//   [ 475,   44 ],
//   [ 25,    67 ],
//   [ 85,    21 ],
//   [ 196,   88 ],
//   [ 409,   72 ],
//   [ 132,   26 ],
//   [ 345,   50 ],
//   [ 444,   83 ],
//   [ 231,   98 ],
//   [ 67,    8 ],
//   [ 400,    150 ],
// ];
var dataset = [];
var numDataPoints = 50;
var xRange = Math.random() * 1000;
var yRange = Math.random() * 1000;
for (var i = 0; i < numDataPoints; i++) {
    var newNumber1 = Math.round(Math.random() * xRange);
    var newNumber2 = Math.round(Math.random() * yRange);
    dataset.push([newNumber1, newNumber2]);
}

var svgWidth = 500;
var svgHeight = 400;
var padding = 40;
var xScale = d3.scale.linear()
                     .domain([0, d3.max(dataset, function(d) { return d[0]; })])
                     .range([padding, svgWidth - padding]);
var yScale = d3.scale.linear()
                     .domain([0, d3.max(dataset, function(d) { return d[1]; })])
                     .range([svgHeight - padding, padding]);
var rScale = d3.scale.linear()
                     .domain([0, d3.max(dataset, function(d) { return d[1]; })])
                     .range([5, 25]);
var xAxis = d3.svg.axis()
                  .scale(xScale)
                  .orient("bottom");
var yAxis = d3.svg.axis()
                  .scale(yScale)
                  .orient("left")
                  .ticks(5);


var svg = d3.select(".entry-content")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight)
  .attr("id", "scatterplot");

svg.selectAll("circle")
  .data(dataset)
  .enter()
  .append("circle")
  .attr("index", function(d, i){ return i; })
  .attr("data-values", function(d) {return d;})
  .attr("cx", function(d) {
    return xScale(d[0]);
  })
  .attr("cy", function(d) {
    return yScale(d[1]);
  })
  .attr("r", function(d){
    return rScale(d[1]);
  });

svg.selectAll("text")
  .data(dataset)
  .enter()
  .append("text")
  .text(function(d){ return d; })
  .attr("x", function(d) {
    return xScale(d[0]);
  })
  .attr("y", function(d) {
    return yScale(d[1]);
  })
  .attr("class", "scatterplot-text");

$('circle').hover(function(){
  var currentCircle = this
  $('p.coords').text(currentCircle.getAttribute("data-values"))
})

svg.append("g")
    .attr("class", "axis")
    .attr("transform", "translate(0," + (svgHeight - padding) + ")")
    .call(xAxis);

svg.append("g")
    .attr("class", "axis")
    .attr("transform", "translate(" + padding + ",0)")
    .call(yAxis);