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
		.attr("class", "first")
		.call(drag)
		.append("circle").attr({
			r: 20,
		})
		.style("fill", "#F00");

	circles.push(g);

	if (circles.length > 1) {
		var g1 = circles[circles.length - 2];
		var g2 = circles[circles.length - 1];
		console.log(g1.attr("width"));
	
		var line = svg.append("line")
			.style("stroke", "black")
			.attr("x1", g1.attr("width"))
			.attr("y1", g1.attr("height"))
			.attr("x2", g2.attr("width"))
			.attr("y2", g2.attr("height"));		
	}

}) 