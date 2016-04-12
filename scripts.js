d3.selection.prototype.moveToFront = function() {
  return this.each(function(){
    this.parentNode.appendChild(this);
  });
};

var svg = d3.select("#drawArea")
	.append("svg")
	.attr("width", 700)
	.attr("height", 500)
	.attr("id", "svg1");

var counter = 0;
var connections = [];
var radius = 20;

var drag = d3.behavior.drag()
	.on("dragstart", function dragHandler() {
		d3.event.sourceEvent.stopPropagation();
	})
	.on("drag", dragmove);

function dragmove(d) {
	var x = d3.event.x;
	var y = d3.event.y;
	d3.select(this).attr("transform", "translate(" + x + "," + y +")");
	var selected = this;

	d3.selectAll(".line").each(function (d, i) {
		if (collideLine(selected, this) == "x1") {
			d3.select(this).attr("x1", x);
			d3.select(this).attr("y1", y);
		} else if (collideLine(selected, this) == "x2") {
			d3.select(this).attr("x2", x);
			d3.select(this).attr("y2", y);
		}

	}); 
		//line.attr("x1", x);
		//line.attr("y1", y);

}

svg.on("click", function clickHandler() {

	var x = d3.event.x;
	var y = d3.event.y;
	var x2 = x + radius;
	var y2 = y + radius;

	var nodes = d3.selectAll("node");

	if (collideMouse(x, y, x2, y2, radius)) {

	} else {
	var g = svg.append("g")
		.attr("transform", "translate(" + x + "," + y + ")")
		.attr("id", "id" + counter)
		.attr("class", "node")
		.call(drag)
		.append("circle").attr({
			r: radius,
		})
		.style("fill", "#3333ff");

	counter++;

	if (counter > 1) {
		var g1 = d3.select("#id" + (counter - 2));
		var g2 = d3.select("#id" + (counter - 1));

	
		var line = svg.append("line")
			.style("stroke", "black")
			.attr("id", "line" + (counter - 2))
			.attr("class", "line")
			.attr("x1", d3.transform(g1.attr("transform")).translate[0])
			.attr("y1", d3.transform(g1.attr("transform")).translate[1])
			.attr("x2", d3.transform(g2.attr("transform")).translate[0])
			.attr("y2", d3.transform(g2.attr("transform")).translate[1]);

		g1.moveToFront();
		g2.moveToFront();

		connections.push([g1, g2, line]);		
	}

	d3.selectAll('.node').on("mouseenter", function() {
		d3.select(this).style("stroke", "#ff33ff");
		d3.select(this).style("stroke-width", 3);
	});

	d3.selectAll('.node').on("mouseleave", function() {
		d3.select(this).style("stroke", "none");
	});					
	}

}); 

function collideMouse(x, y, x2, y2, radius) {
	var colliding = false;

	d3.selectAll('.node').each(function(d, i) {
		var trans = d3.transform(d3.select(this).attr("transform")).translate,
			nx1 = trans[0],
			nx2 = trans[0] + radius,
			ny1 = trans[1],
			ny2 = trans[1] + radius;

		if (!(x > nx2 || x2 < nx1 || y > ny2 || y2 < ny1))
			colliding = true; 
	}) 

	return colliding;
}

function collideLine(object1, line) {
	var colliding = "";

	var trans = d3.transform(d3.select(object1).attr("transform")).translate,
		x1 = trans[0],
		x2 = trans[0] + radius,
		y1 = trans[1],
		y2 = trans[1] + radius;
	var obj2 = d3.select(line);

	if (!(obj2.attr("x1") > x2 || obj2.attr("y1") > y2)) {
		colliding = "x1";
	} else if (!(obj2.attr("x2") > x2 || obj2.attr("y2") > y2)) {
		colliding = "x2";
	}

	return colliding;

}