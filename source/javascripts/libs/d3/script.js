// I. ORIGINAL BAR GRAPH

    // var dataset = [];
    // for (var i = 0; i < 25; i++) {  
    //     var newNumber = Math.round(Math.random() * 30); 
    //     dataset.push(newNumber); 
    // }

    // d3.select("body").selectAll("div")
    //   .data(dataset)
    //   .enter()
    //   .append("div")
    //   .attr("class", "bar")
    //   .style("height", function(d) {
    //     var barHeight = d * 5;
    //     return barHeight + "px";
    //   });
    //   // .append("p")
    //   // .text(function(d){
    //   //   return d;
    //   // });


// II. CIRCLE DATA
    // var svgWidth = 1400;
    // var svgHeight = 500;

    // // var dataset = [ 5, 10, 15, 20, 25 ];
    // var dataset = [];
    // for (var i = 0; i < 25; i++) {  
    //     var newNumber = Math.round(Math.random() * 30); 
    //     dataset.push(newNumber); 
    // }


    // var svg = d3.select("body")
    //             .append("svg")
    //             .attr("width", svgWidth)
    //             .attr("height", svgHeight);

    // var circles = svg.selectAll("circle")
    //                 .data(dataset)
    //                 .enter()
    //                 .append("circle");

    // circles.attr("cx", function(d, i) {
    //             return (i * 50) + 25;
    //         })
    //        .attr("cy", svgHeight/2)
    //        .attr("r", function(d) {
    //             return d;
    //        })
    //        .attr("class", "circle-data")
    //        .text(function(d){ return d });

// III. FINAL IMPROVED BAR GRAPH
// var dataset = [ 5, 10, 13, 19, 21, 25, 22, 18, 15, 13, 11, 12, 15, 20, 18, 17, 16, 18, 23, 25 ];
var dataset = [
["May 13", 0],
["May 14", 0],
["May 15", 7],
["May 16", 35], 
["May 17", 5], 
["May 18", 1], 
["May 19", 113], 
["May 20", 23], 
["May 21", 42], 
["May 22", 4], 
["May 23", 0], 
["May 24", 0], 
["May 25", 1], 
["May 26", 14], 
["May 27", 4], 
["May 28", 22], 
["May 29", 56], 
["May 30", 0], 
["May 31", 6], 
["June 1", 7], 
["June 2", 5], 
["June 3", 5], 
["June 4", 14], 
["June 5", 2], 
["June 6", 2], 
["June 7", 6], 
["June 8", 5], 
["June 9", 34], 
["June 10", 13], 
["June 11", 5], 
["June 12", 10] ]
var svgWidth = 500;
var svgHeight = 400;
var barPadding = 1;

var svg = d3.select(".entry-content")
            .append("svg")
            .attr("width", svgWidth)
            .attr("height", svgHeight);

svg.selectAll("rect")
    .data(dataset)
    .enter()
    .append("rect")
    .attr("class","bar")
    .attr("data-date", function(d) {return d[0];})
    .attr("x", function(d, i) {
      return i * (svgWidth / dataset.length);
    })
    .attr("width", svgWidth / dataset.length - barPadding)
    .attr("height", function(d) {
      return (d[1] * 3) + 30;
    })
    .attr("y", function(d){
      return svgHeight - (d[1] * 3) - 10;
    });

svg.selectAll("text")
    .data(dataset)
    .enter()
    .append("text")
    .text(function(d) {
      return d[1];
    })
    .attr("x", function(d, i) {
      return (i * (svgWidth / dataset.length)) + (svgWidth / dataset.length - barPadding) / 2;
    })
    .attr("y", function(d) {
      return svgHeight - (d[1] * 3);
    })
    .attr("class","bar-text")
    .attr("text-anchor", "middle");

$('.bar').hover(function(){
  var currentBar = this
  console.log(currentBar)
  $('p.date').text(currentBar.getAttribute("data-date"))
})