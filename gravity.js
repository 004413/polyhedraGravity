var CANVAS_HORZ_SIZE = 2500;
var CANVAS_VERT_SIZE = 800;
var LEFT_MARGIN = 60;
var BOT_MARGIN = 60;
var TOP_MARGIN = 100;
var RIGHT_MARGIN = 60;
var LINE_WIDTH = 5;
var EDGE_LINE_WIDTH = 3;
var TEXT_VERT_SIZE = 12
var canvas = Raphael(0,0,CANVAS_HORZ_SIZE,CANVAS_VERT_SIZE);
var background = canvas.rect(0,0,CANVAS_HORZ_SIZE,CANVAS_VERT_SIZE).attr({'fill':'#000000'});

var secants = {'tetraVertex':3,'tetraEdge':Math.sqrt(3),'cubeVertex':Math.sqrt(3),'cubeEdge':Math.sqrt(2),'octaVertex':Math.sqrt(3),'octaEdge':Math.sqrt(3/2),'dodecaVertex':Math.sqrt(15-6*Math.sqrt(5)),'dodecaEdge':Math.sqrt((5-Math.sqrt(5))/2),'icosaVertex':Math.sqrt(15-6*Math.sqrt(5)),'icosaEdge':(Math.sqrt(15)-Math.sqrt(3))/2};
var colors = {'tetraVertex':'#FF0000','tetraEdge':'#FF0000','cubeVertex':'#00FF00','cubeEdge':'#00FF00','octaVertex':'#00FF00','octaEdge':'#00FF00','dodecaVertex':'#0000FF','dodecaEdge':'#0000FF','icosaVertex':'#0000FF','icosaEdge':'#0000FF'};
var fullText1 = {'tetraVertex':'Tetrahedron','tetraEdge':'Tetrahedron','cubeVertex':'Cube/Octahedron','cubeEdge':'Cube','octaVertex':'Octahedron','octaEdge':'Octahedron','dodecaVertex':'Dodecahedron','dodecaEdge':'Dodecahedron','icosaVertex':'Icosahedron','icosaEdge':'Icosahedron'};
var fullText2 = {'tetraVertex':'Vertex','tetraEdge':'Edge Center','cubeVertex':'Vertex','cubeEdge':'Edge Center','octaVertex':'Vertex','octaEdge':'Edge Center','dodecaVertex':'Vertex','dodecaEdge':'Edge Center','icosaVertex':'Vertex','icosaEdge':'Edge Center'};
var fullText3 = {'tetraVertex':'1.231 (70.5\xB0)','tetraEdge':'0.955 (54.7\xB0)','cubeVertex':'0.955 (54.7\xB0)','cubeEdge':'0.785 (45\xB0)','octaVertex':'0.955 (54.7\xB0)','octaEdge':'0.616 (35.3\xB0)','dodecaVertex':'0.652 (37.4\xB0)','dodecaEdge':'0.554 (31.7\xB0)','icosaVertex':'0.652 (37.4\xB0)','icosaEdge':'0.365 (20.9\xB0)'};
var textDeviation = {'tetraVertex':0,'tetraEdge':0,'cubeVertex':0,'cubeEdge':0,'octaVertex':0,'octaEdge':0,'dodecaVertex':45,'dodecaEdge':-25,'icosaVertex':45,'icosaEdge':0};
var textVertDeviation = {'tetraVertex':0,'tetraEdge':-2*TEXT_VERT_SIZE,'cubeVertex':0,'cubeEdge':0,'octaVertex':0,'octaEdge':0,'dodecaVertex':0,'dodecaEdge':0,'icosaVertex':0,'icosaEdge':0};

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

var linesToDraw = ['cubeVertex','tetraVertex','tetraEdge','cubeEdge','octaEdge','icosaVertex','dodecaEdge','icosaEdge'];

for(var i=0;i<linesToDraw.length;i++){
  var horizDeviation = LEFT_MARGIN+Math.sqrt(Math.pow(secants[linesToDraw[i]]*(CANVAS_VERT_SIZE-BOT_MARGIN-TOP_MARGIN),2)-Math.pow(CANVAS_VERT_SIZE-BOT_MARGIN-TOP_MARGIN,2));
  if(linesToDraw[i].contains('Edge')){
    var lineDrawn = canvas.path(parseLine(LEFT_MARGIN,CANVAS_VERT_SIZE-BOT_MARGIN,horizDeviation,TOP_MARGIN)).attr({'stroke-width':LINE_WIDTH-2}).attr({'stroke-linecap':'round'}).attr({'arrow-end':'classic-medium-medium'}).attr({'stroke':colors[linesToDraw[i]]});
  }else{
    var lineDrawn = canvas.path(parseLine(LEFT_MARGIN,CANVAS_VERT_SIZE-BOT_MARGIN,horizDeviation,TOP_MARGIN)).attr({'stroke-width':LINE_WIDTH}).attr({'stroke-linecap':'round'}).attr({'arrow-end':'classic-medium-medium'}).attr({'stroke':colors[linesToDraw[i]]});
  }
  var lineLabel1 = canvas.text(horizDeviation+textDeviation[linesToDraw[i]],TOP_MARGIN-4*TEXT_VERT_SIZE+textVertDeviation[linesToDraw[i]],fullText1[linesToDraw[i]]).attr({'stroke':colors[linesToDraw[i]]}).attr({'font-family':'Ubuntu'});
  var lineLabel2 = canvas.text(horizDeviation+textDeviation[linesToDraw[i]],TOP_MARGIN-3*TEXT_VERT_SIZE+textVertDeviation[linesToDraw[i]],fullText2[linesToDraw[i]]).attr({'stroke':colors[linesToDraw[i]]}).attr({'font-family':'Ubuntu'});
  if(linesToDraw[i]!='tetraEdge'){
    var lineLabel3 = canvas.text(horizDeviation+textDeviation[linesToDraw[i]],TOP_MARGIN-2*TEXT_VERT_SIZE+textVertDeviation[linesToDraw[i]],fullText3[linesToDraw[i]]).attr({'stroke':colors[linesToDraw[i]]}).attr({'font-family':'Ubuntu'});
    var lineLabel4 = canvas.text(horizDeviation+textDeviation[linesToDraw[i]],TOP_MARGIN-TEXT_VERT_SIZE+textVertDeviation[linesToDraw[i]],'from the normal').attr({'stroke':colors[linesToDraw[i]]}).attr({'font-family':'Ubuntu'});
  }
}
var normal = canvas.path(parseLine(LEFT_MARGIN,CANVAS_VERT_SIZE-BOT_MARGIN,LEFT_MARGIN,TOP_MARGIN)).attr({'stroke-width':LINE_WIDTH}).attr({'stroke-linecap':'round'}).attr({'arrow-end':'classic-medium-medium'}).attr({'stroke':'#FFFFFF'}); 
var normalLabel = canvas.text(LEFT_MARGIN,TOP_MARGIN-TEXT_VERT_SIZE,'Normal').attr({'stroke':'#FFFFFF'}).attr({'font-family':'Ubuntu'});
var ground = canvas.path(parseLine(LEFT_MARGIN,CANVAS_VERT_SIZE-BOT_MARGIN,CANVAS_HORZ_SIZE-RIGHT_MARGIN,CANVAS_VERT_SIZE-BOT_MARGIN)).attr({'stroke-width':LINE_WIDTH}).attr({'stroke-linecap':'round'}).attr({'stroke':'#FFFFFF'}); 
var dodecaText = canvas.text(LEFT_MARGIN+Math.sqrt(Math.pow(secants['dodecaVertex']*(CANVAS_VERT_SIZE-BOT_MARGIN-TOP_MARGIN),2)-Math.pow(CANVAS_VERT_SIZE-BOT_MARGIN-TOP_MARGIN,2))+textDeviation['dodecaVertex'],TOP_MARGIN-5*TEXT_VERT_SIZE,'Dodecahedron/').attr({'stroke':colors['dodecaVertex']});
