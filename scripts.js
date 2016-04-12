d3.selection.prototype.moveToFront = function() {
  return this.each(function(){
    this.parentNode.appendChild(this);
  });
};

var svg = d3.select("body")
	.append("svg")
	.attr("width", 700)
	.attr("height", 500)
	.attr("id", "svg1");

var counter = 0;
var circles = [];

var drag = d3.behavior.drag()
	.on("dragstart", function dragHandler() {
		d3.event.sourceEvent.stopPropagation();
	})
	.on("drag", dragmove);

function dragmove(d) {
	var x = d3.event.x;
	var y = d3.event.y;
	d3.select(this).attr("transform", "translate(" + x + "," + y +")");

	if (d3.select(this).attr("class") == "first") {
		line.attr("x1", x);
		line.attr("y1", y);
	} else {
		line.attr("x2", x);
		line.attr("y2", y);
	}
}

svg.on("click", function clickHandler() {
	var x = d3.event.x;
	var y = d3.event.y;

	var g = svg.append("g")
		.attr("transform", "translate(" + x + "," + y + ")")
		.attr("id", "id" + counter)
		.call(drag)
		.append("circle").attr({
			r: 20,
		})
		.style("fill", "#F00");

	counter++;

	if (counter > 1) {
		var g1 = d3.select("#id" + (counter - 2));
		var g2 = d3.select("#id" + (counter - 1));

	
		var line = svg.append("line")
			.style("stroke", "black")
			.attr("x1", d3.transform(g1.attr("transform")).translate[0])
			.attr("y1", d3.transform(g1.attr("transform")).translate[1])
			.attr("x2", d3.transform(g2.attr("transform")).translate[0])
			.attr("y2", d3.transform(g2.attr("transform")).translate[1]);

		g1.moveToFront();
		g2.moveToFront();		
	}

}) 