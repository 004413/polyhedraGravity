var CANVAS_HORZ_SIZE = 2500;
var CANVAS_VERT_SIZE = 800;
var LEFT_MARGIN = 60;
var BOT_MARGIN = 60;
var TOP_MARGIN = 60;
var RIGHT_MARGIN = 60;
var LINE_WIDTH = 3;
var TEXT_VERT_SIZE = 12
var canvas = Raphael(0,0,CANVAS_HORZ_SIZE,CANVAS_VERT_SIZE);

var secants = {'tetraVertex':3,'tetraEdge':Math.sqrt(3),'cubeVertex':Math.sqrt(3),'cubeEdge':Math.sqrt(2),'octaVertex':Math.sqrt(3),'octaEdge':Math.sqrt(3/2),'dodecaVertex':Math.sqrt(15-6*Math.sqrt(5)),'dodecaEdge':Math.sqrt((5-Math.sqrt(5))/2),'icosaVertex':Math.sqrt(15-6*Math.sqrt(5)),'icosaEdge':(Math.sqrt(15)-Math.sqrt(3))/2};
var colors = {'tetraVertex':'#FF0000','tetraEdge':'#FF0000','cubeVertex':'#008000','cubeEdge':'#008000','octaVertex':'#008000','octaEdge':'#008000','dodecaVertex':'#0000FF','dodecaEdge':'#0000FF','icosaVertex':'#0000FF','icosaEdge':'#0000FF'};
var fullText1 = {'tetraVertex':'Tetrahedron','tetraEdge':'Tetrahedron','cubeVertex':'Cube','cubeEdge':'Cube','octaVertex':'Octahedron','octaEdge':'Octahedron','dodecaVertex':'Dodecahedron','dodecaEdge':'Dodecahedron','icosaVertex':'Icosahedron','icosaEdge':'Icosahedron'};
var fullText2 = {'tetraVertex':'Vertex','tetraEdge':'Edge Center','cubeVertex':'Vertex','Vertex':'EdgeCenter','octaVertex':'Vertex','octaEdge':'Edge Center','dodecaVertex':'Vertex','dodecaEdge':'Edge Center','icosaVertex':'Vertex','icosaEdge':'Edge Center'};

/* produces string to represent a line from (x1,y1) to (x2,y2) */
function parseLine(x1,y1,x2,y2){
  var lineString = "m";
  lineString += x1;
  lineString += ",";
  lineString += y1;
  lineString += "l";
  lineString += x2-x1;
  lineString += ",";
  lineString += y2-y1;
  return lineString;
}

var linesToDraw = ['tetraVertex','tetraEdge','cubeEdge','octaEdge','dodecaVertex','dodecaEdge','icosaEdge'];

for(var i=0;i<linesToDraw.length;i++){
  var horizDeviation = LEFT_MARGIN+Math.sqrt(Math.pow(secants[linesToDraw[i]]*(CANVAS_VERT_SIZE-BOT_MARGIN-TOP_MARGIN),2)-Math.pow(CANVAS_VERT_SIZE-BOT_MARGIN-TOP_MARGIN,2));
  var lineDrawn = canvas.path(parseLine(LEFT_MARGIN,CANVAS_VERT_SIZE-BOT_MARGIN,horizDeviation,TOP_MARGIN)).attr({'stroke-width':LINE_WIDTH}).attr({'stroke-linecap':'round'}).attr({'stroke':colors[linesToDraw[i]]});
  var lineLabel1 = canvas.text(horizDeviation,TOP_MARGIN-3.5*TEXT_VERT_SIZE,fullText1[linesToDraw[i]]).attr({'stroke':colors[linesToDraw[i]]});
  var lineLabel2 = canvas.text(horizDeviation,TOP_MARGIN-2.5*TEXT_VERT_SIZE,fullText2[linesToDraw[i]]).attr({'stroke':colors[linesToDraw[i]]});
}
var normal = canvas.path(parseLine(LEFT_MARGIN,CANVAS_VERT_SIZE-BOT_MARGIN,LEFT_MARGIN,TOP_MARGIN)).attr({'stroke-width':LINE_WIDTH}).attr({'stroke-linecap':'round'}); 
var ground = canvas.path(parseLine(LEFT_MARGIN,CANVAS_VERT_SIZE-BOT_MARGIN,CANVAS_HORZ_SIZE-RIGHT_MARGIN,CANVAS_VERT_SIZE-BOT_MARGIN)).attr({'stroke-width':LINE_WIDTH}).attr({'stroke-linecap':'round'}); 
