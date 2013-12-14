//javascript 2d physics engine
//Benjamin Ghaemmaghami

//how items is structured:
//items[identifier][xval,yval,xvel,yvel,xloc,yloc]

var boxw = 10
var boxh = 10
var friction = 0.001
var wallbounce =4/5
var physCan=null;
var chunkw = 100;
var chunkh = 75;


function draw(arrayname){
    var ctxc = physCan.getContext('2d');
	for (var i = 0;i < items.length;i++){
		ctxc.fillStyle = 'rgb(120,'+(i/100*50)+',210)'
		ctxc.fillRect(items[i][0], items[i][1], boxw, boxh)
	}
}
function updatePos(arrayname){
	var redraw = setTimeout("updatePos(items)",16.6)
    var ctxc = physCan.getContext('2d');
    var x=null;
    var y=null;
    ctxc.clearRect(0,0,physCan.width,physCan.height)
    var deadballs=0;
    attachLoc(true);
	for (var i = 0;i < items.length;i++){
		items[i][0] = (Math.floor((items[i][0]+items[i][2])*100))/100
		items[i][1] = (Math.floor((items[i][1]+items[i][3])*100))/100
		if (items[i][2] > 0){
			items[i][2] = items[i][2]-friction
		}
		else{
			items[i][2] = items[i][2]+friction
		}
		if (items[i][3] > 0){
			items[i][3] = items[i][3]+friction
		}
		else{
			items[i][3] = items[i][3]+friction
		}
		if ((Math.floor(items[i][2])*100==0) && (Math.floor(items[i][3])*100==0)){
			items[i][2] = 0
			items[i][3] = 0
			deadballs = deadballs+1
			if (deadballs == items.length){
    			clearTimeout(redraw);
    			console.log("Finished!")
    		}
		}

		//static walls
		if (items[i][0] > physCan.width-boxw){
			items[i][0] = physCan.width-boxw
			items[i][2] = ((Math.floor(((items[i][2])* -1)*(wallbounce)*100))/100)
		} 
		if (items[i][1] > physCan.height-boxh){
			items[i][1] = physCan.height-boxh
			items[i][3] = ((Math.floor(((items[i][3])* -1)*(wallbounce)*100))/100)
		}
		if (items[i][0] < 0){
			items[i][0] = 0
			items[i][2] = ((Math.floor(((items[i][2])* -1)*(wallbounce)*100))/100)
		} 
		if (items[i][1] < 0){
			items[i][1] = 0
			items[i][3] = (Math.floor(((items[i][3])* -1)*(wallbounce)*100))/100
		}
	}
	//calculate point intercections
	/*psudo code
	for each location{
		take each value and compare with other values within location
		reference will look like this items[value] compared to items[othervalue]
	}
	*/
	
	for (var v = 0; v < loc.length; v++){
		for (var w = 0; w < loc[v].length; w++) {
			if (loc[v][w].length == 0){
				continue;
			}
			else{
				for (var c = 0; c < loc[v][w].length; c++) {
					for (var d = 0; d < loc[v][w].length; d++) {
						if (c == d){
							continue;
						}
						var item1 = loc[v][w][c]
						var item2 = loc[v][w][d]
						if (chkOverlap(items[item1][0],items[item1][1],boxw,boxh,items[item2][0],items[item2][1],boxw,boxh)==true){
							items[item1][0] = items[item1][0]-items[item1][2]*1.5
							items[item1][1] = items[item1][1]-items[item1][3]*1.5
							var tempx = items[item1][2]
							var tempy = items[item1][3]
							items[item1][2] = items[item2][2]*.75+tempx*-.25
							items[item1][3] = items[item2][3]*.75+tempy*-.25
							items[item2][0] = items[item2][0]-items[item2][2]*1.5
							items[item2][1] = items[item2][1]-items[item2][3]*1.5
							items[item2][2] = tempx*.75+items[item2][2]*-.25
							items[item2][3] = tempy*.75+items[item2][3]*-.25
						}					
					};

					
				};
			}
		};
	}
	/*for (x = 0; x < items.length; x++) {

	if ((items[x][2] == 0) && (items[x][3] == 0)){
		continue;
		}	
		for (y = 0; y < items.length; y++) {
		if (y == x){
			continue;
		}
	
		if (chkOverlap(items[x][0],items[x][1],boxw,boxh,items[y][0],items[y][1],boxw,boxh)==true){
			//console.log("returned collison")
			items[x][0] = items[x][0]-items[x][2]*1.5
			items[x][1] = items[x][1]-items[x][3]*1.5
			var tempx = items[x][2]
			var tempy = items[x][3]
			items[x][2] = items[y][2]*.75+tempx*-.25
			items[x][3] = items[y][3]*.75+tempy*-.25
			items[y][0] = items[y][0]-items[y][2]*1.5
			items[y][1] = items[y][1]-items[y][3]*1.5
			items[y][2] = tempx*.75+items[y][2]*-.25
			items[y][3] = tempy*.75+items[y][3]*-.25
		}
		};
	
	};*/

	draw()

}
function chkOverlap(xpos1, ypos1, w1, h1, xpos2, ypos2, w2, h2){
	var c1tl = [xpos1,ypos1]
	var c1tr = [xpos1+w1,ypos1]
	var c1bl = [xpos1,ypos1+h1]
	var c1br = [xpos1+w1,ypos1+h1]
	var c2tl = [xpos2,ypos2]
	var c2tr = [xpos2+w2,ypos2]
	var c2bl = [xpos2,ypos2+h2]
	var corners1 = [c1tl,c1tr,c1bl,c1br]

	for (var i = 0; i < 4; i++) {
		if(((corners1[i][0] >= c2tl[0]) && (corners1[i][0] <= c2tr[0])) && ((corners1[i][1] >= c2tl[1]) && (corners1[i][1] <= c2bl[1]))){
			//console.log("collide-overlap")
			return true;
		}

	};
}
function chkInside(xpos1, ypos1, xpos2, ypos2, w2, h2){
		if(((xpos1 >= xpos2) && (xpos1 <= xpos2+w2)) && ((ypos1 >= ypos2) && (ypos1 <= ypos2+h2))){
		//console.log("collide-inside")
			return true;
		}
		else{
			return false;
		}
}
function attachLoc(firstrun){
	var rLenght = physCan.width/chunkw
	var cHeight = physCan.height/chunkh
	var objwithin = []
	if (firstrun==true){
		window.loc = []
		for (var x = 0; x < rLenght; x++) {
			loc[x]=[x]
			for (var y = 0; y < cHeight; y++) {
				objwithin = [];
				for (var n = 0; n < items.length; n++) {
					var ixpos = (items[n][0])
					var iypos = (items[n][1])
					if (chkInside(ixpos,iypos,chunkw*x-10,chunkh*y-10,chunkw,chunkh)==true){
						objwithin.push(n)
						items[n][4]=x
						items[n][5]=y
					}
					else{
					}
				loc[x][y]=objwithin					
				};
			};
		};

	}
	else{
		for (var n = 0; n < items.length; n++) {
			var curX = items[n][4]
			var curY = items[n][5]
			var tempnewarr = [];
			var tempoldarr = [];
			var checkvalx = [-1,0,+1,-1,+1,-1,0,+1]
			var checkvaly = [-1,-1,-1,0,0,+1,+1,+1]
			if(chkInside(items[n][0],items[n][1],chunkw*curX-10,chunkh*curY-10,chunkw,chunkh)==true){
				console.log("same")
				continue;
			}
			else{
			for (var i = 0; i < 8; i++) {
				//try{
					if(chkInside(items[n][0],items[n][1],chunkw*(curX+checkvalx[i])-10,chunkh*(curY+checkvaly[i])-10,chunkw,chunkh)==true){
					tempnewarr = loc[curX+checkvalx[i]][curY+checkvaly[i]]
					tempoldarr = loc[curX][curY]
					//var valIndex = loc[curX][curY].indexOf(n)
					loc[curX][curY] = tempoldarr.splice(valIndex,1)
					loc[curX+(checkvalx[i])][curY+(checkvaly[i])] = tempnewarr.concat(n)
					items[n][4] = curX+checkvalx[i]
					console.log("item",n)
					console.log(loc[curX+(checkvalx[i])][curY+(checkvaly[i])])
					items[n][5] = curY+checkvaly[i]
					//console.log(items[n][5])
					break;
					}
				//}
				//catch(e){
				//	console.log(e)
				//}

			};
		//debugger;
		}

		//debugger;
		}
	}
}
function randWithin(min,max){
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randSeed(boxes,maxvel){
	window.items = []
	for (var i = 0; i < boxes; i++) {
		items[i] = [randWithin(0,physCan.width),randWithin(0,physCan.height),randWithin(-maxvel,maxvel),randWithin(-maxvel,maxvel)]
	};

}

$(document).ready(function (){
	physCan = document.getElementById('physics');
    if (physCan.getContext) {
        var ctxc = physCan.getContext('2d');
        randSeed(1000,15)
        attachLoc(true)
        console.log(loc)
        //console.log(items.length)
        updatePos("items")

    console.log(items)
  	}      
})