    var tree1 = {x_pos:100, y_pos: floorPos_y-20, width:5, height:20};
    var tree2 = {x_pos: 200, y_pos: floorPos_y-20, width:5, height:20};
    var tree3 = {x_pos:600, y_pos: floorPos_y-20, width:5, height: 20};
    var tree4 = {x_pos: 500, y_pos: floorPos_y-20, width:5, height:20};
    var tree5 = {x_pos: 150, y_pos: floorPos_y-60, width:10, height:40}; //bigger tree
    var tree6 = {x_pos: 550, y_pos: floorPos_y-60, width:10, height:40}; //bigger tree

 trees = [tree1, tree2, tree3, tree4, tree5, tree6];

drawTrees();

function drawTrees() {
    for (var i=0; i< trees.length; i++){
        var tree = trees[i];
        drawTree(tree); 
    }
}

function drawTree(tree) {
    fill(205, 92, 92);
    rect(tree.x_pos, tree.y_pos, tree.width, tree.height);
    rect(tree.x_pos, tree.y_pos, tree.width, tree.height);
    rect(tree.x_pos, tree.y_pos, tree.width, tree.height);
    rect(tree.x_pos, tree.y_pos, tree.width, tree.height);
    rect(tree.x_pos, tree.y_pos, tree.width, tree.height);
    rect(tree.x_pos, tree.y_pos, tree.width, tree.height);
    
    fill(26, 93, 31);
    ellipse(tree.x_pos, tree.y_pos-20, tree.width*10, tree.height*3);
    ellipse(tree.x_pos +3, tree.y_pos-20, tree.width*10, tree.height*3);
    ellipse(tree.x_pos +3, tree.y_pos-20, tree.width*10, tree.height*3);
    ellipse(tree.x_pos +3, tree.y_pos-20, tree.width*10, tree.height*3);
    ellipse(tree.x_pos +3, tree.y_pos-20, tree.width*10, tree.height*3);
    ellipse(tree.x_pos +3, tree.y_pos-20, tree.width*10, tree.height*3);
    
    fill(230, 230, 250);
    arc(tree.x_pos +2.5, tree.y_pos-20, tree.width*10, tree.height*3, -HALF_PI, HALF_PI);
    arc(tree.x_pos +2.5, tree.y_pos-20, tree.width*10, tree.height*3, -HALF_PI, HALF_PI);
    arc(tree.x_pos +2.5, tree.y_pos-20, tree.width*10, tree.height*3, -HALF_PI, HALF_PI);
    arc(tree.x_pos +2.5, tree.y_pos-20, tree.width*10, tree.height*3, -HALF_PI, HALF_PI);
    arc(tree.x_pos +2.5, tree.y_pos-20, tree.width*10, tree.height*3, -HALF_PI, HALF_PI);
    arc(tree.x_pos +2.5, tree.y_pos-20, tree.width*10, tree.height*3, -HALF_PI, HALF_PI);
}

//clouds

    var cloud1 = {x_pos:200, y_pos:floorPos_y-232};
    var cloud2 = {x_pos:480, y_pos:floorPos_y-282};
    var cloud3 = {x_pos:780, y_pos:floorPos_y-242};
    var cloud4 = {x_pos:1000, y_pos:floorPos_y-292};
    var cloud5 = {x_pos:1200, y_pos:floorPos_y-242};
    var cloud6 = {x_pos:1400, y_pos:floorPos_y-262};

 clouds = [cloud1, cloud2, cloud3, cloud4, cloud5, cloud6];

//collectables
var collectable1 = {x_pos:475, y_pos:floorPos_y-70, isFound: false};
    var collectable2 = {x_pos:350, y_pos:floorPos_y-100, isFound: false};
    var collectable3 = {x_pos:700, y_pos:floorPos_y-75, isFound: false};
    var collectable4 = {x_pos:850, y_pos:floorPos_y-110, isFound: false};
    collectables = [collectable1, collectable2, collectable3, collectable4];

 var canyon1 = {x_pos:250, width: 150};
    var canyon2 = {x_pos:800, width: 150};
    canyons = [canyon1, canyon2];