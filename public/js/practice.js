/*--for json file for csv use d3.--d3.json("path", funciton(data) {
// data references the data in the file.
  var canvas = d3.select("body").append("svg")
    .attr("width", 500)
    .attr("height", 500)

    canvas.selectAll("rect")
      .data(data)
      .enter()
        .append("rect")
        //d references properties in json object.
        .attr("width", function(d) { return d.age * 10}) // to make bars bigger ignore 10
        .attr("height", 50)
        .attr("y", funciton(d, i) {return i * 50; })
        .attr("fill", "blue");
        canvas.selectAll("text")
          .data(data)
          .append("text")
          .attr("fill", "white")
          .attr("y", funciton(d, i) {return i * 50 + 24; })
          .text(function (d) { return d.name }) // d is property in json object

  })


 */

  // var d3.json("/json/criminal.json", function(error, data){

 //  })
 // });
