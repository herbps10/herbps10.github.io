var width  = 800;
var height = 800;

var NUM_NODES = 100;
var LINKS_PER_NODE = 1;
var NODE_RADIUS_OFFSET = 5;

var color = d3.scale.category20();

var force = d3.layout.force()
  .charge(-120)
  .nodes([])
  .linkDistance(30)
  .size([width, height])
  .on("tick", tick);

var svg = d3.select("#graph-container").append("svg")
  .attr("width", width)
  .attr("height", height);

var link_container = svg.append("g");
var node_container = svg.append("g");

var nodes = force.nodes();
var links = force.links();
var link = link_container.selectAll("line.link");
var node = node_container.selectAll("circle.node");

restart();

for(var i = 0; i < 2; i++) {
  nodes[i] = { name: i, degree: 0};

  restart();
}


links.push({ source: 0, target: 1 });
var links_added = 2;

nodes[0].degree = 1;
nodes[1].degree = 1;

var current_node_index = 2;
var current_links_added = 2;

window.setTimeout("timed_add_nodes()", 1000);

function timed_add_nodes() {
  for(var i = 0; i < 1; i++) {
    if(current_node_index == NUM_NODES) return;

    add_node(current_node_index, current_links_added);

    current_node_index += 1;
    current_links_added += 2;

    restart();
  }

  window.setTimeout("timed_add_nodes();", 15);
}


function add_node(i, links_added) {
  nodes[i] = { name: i, degree: 0 };
   
  for(var j = 0; j < LINKS_PER_NODE; j++) {
    var target;
    var random_number = Math.random() * links_added;

    for(var n = 0; n < i; n++) {
      if(random_number < nodes[n].degree) {
        target = n;

        break;
      }

      random_number -= nodes[n].degree;
    }

    links.push({ source: i, target: target });
    nodes[i].degree += 1;
    nodes[target].degree += 1;

  }
}


function tick() {
  link.attr("x1", function(d) { return d.source.x })
    .attr("y1", function(d) { return d.source.y })
    .attr("x2", function(d) { return d.target.x })
    .attr("y2", function(d) { return d.target.y });

  node.attr("cx", function(d) { return d.x })
    .attr("cy", function(d) { return d.y });
}

function restart() {
  link = link.data(links);
  link.enter()
    .append("line")
    .attr("class", "link")
    .style("stroke-width", 1);

  node = node.data(nodes);
  node.enter()
    .append("circle")
    .attr("class", "node")
    .attr("r", function(d) { return Math.pow(d.degree, 0.75) + NODE_RADIUS_OFFSET; } )
    .style("fill", function(d) { return color(d.degree) })
    .call(force.drag);

  node.attr("r", function(d) { return Math.pow(d.degree, 0.75) + NODE_RADIUS_OFFSET; } );
  node.style("fill", function(d) { return color(d.degree) });


  force.start();
}
