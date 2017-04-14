var w = d3.select('#title-section').node().getBoundingClientRect().width,
  h = w/3,
  nodes = [],
  node;

var vis = d3.select("#stars").append("svg:svg")
  .attr("width", w)
  .attr("height", h);

var force = d3.layout.force()
  .gravity(0.06)
  .charge(-40)
  .nodes(nodes)
  .size([w, h]);

force.on("tick", function(e) {
  vis.selectAll("polygon")
    .attr("transform", function(d) {
      return "translate(" + d.x + "," + d.y + ")";
    });
});

setInterval(function() {

  // Define shape size.
  nodes.push({
    size: Math.random() * 30 + 10
  });

  // Restart the layout.
  force.start();

  vis.selectAll("polygon")
    .data(nodes)
    .enter().append("polygon")
    .attr("points", function(d) {
      return CalculateStarPoints(-30, 0, 5, d.size, d.size / 2);
    })
    .style('fill', 'black')
    .style('fill-opacity', '0.9')
    .call(force.drag);

}, 1000);


function CalculateStarPoints(centerX, centerY, arms, outerRadius, innerRadius) {
  var results = "";
  var angle = 2 * Math.PI / arms;
  var rot = 2 * Math.PI * Math.random();

  for (var i = 0; i < 2 * arms; i++) {
    var r = (i & 1) == 0 ? outerRadius : innerRadius;
    var pointX = centerX + Math.cos(i * angle + rot) * r;
    var pointY = centerY + Math.sin(i * angle + rot) * r;
    // Our first time we simply append the coordinates, subsequet times
    // we append a ", " to distinguish each coordinate pair.
    if (i == 0) {
      results = pointX + "," + pointY;
    } else {
      results += ", " + pointX + "," + pointY;
    }
  }
  return results;
}
