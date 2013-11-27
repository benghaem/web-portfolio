//Global Vars
var xdiff = 30;
var drawwait =100;
var drawtime =null;
var ctx = null;
var ctxc = null;
var canvas = null;
var canvasc =null;
var valcheck = null;
var maxseg = null;
var drawtimer;
var rtimer;
var csegs = 0;
var cstartCord=new Array(0, 0)
var lastCord=new Array(null,null);
var currentCord= new Array(0,0);
var startCord= new Array(0,250);
var midCord= new Array(null,null)
var fcount = 0;


//Generate a new y Value
function ygen() {
    var rratio = Math.floor((Math.random() * 100)) / 100;
    var fratio = rratio + (Math.round(Math.random()));
    if (fratio == 0) {
        ygen();
    }
    $(".debug").append("First: " + rratio);
    $(".debug").append("/Corrected: " + fratio);



    valcheck = lastCord[1] * fratio;
    $(".debug").append("/Final: " + valcheck);


    if (valcheck <= 125) {
        $(".debug").append("FAIL");
        ygen();
    }
    if (valcheck >= 375) {
        $(".debug").append("FAIL");
        ygen();
    }

    currentCord[1] = valcheck;
   
}

//update xcord
function xupdate() {
    currentCord[0] = lastCord[0] + xdiff;
}

//find midpoint for curve
function midupdate(){
	//xmidpoint
	midCord[0]=(lastCord[0]+currentCord[0])/2
	//ymidpoint
	midCord[1]=(lastCord[1]+currentCord[1])/2
}

function draw() {
    canvas = document.getElementById('background');
    if (canvas.getContext) {
        ctx = canvas.getContext('2d');
        ctx.beginPath();
        ctx.lineWidth = 3;
        ctx.moveTo(lastCord[0], lastCord[1]);
        ctx.lineTo(currentCord[0], currentCord[1]);
        ctx.closePath();
        ctx.strokeStyle = 'rgb(255,' + Math.floor(155 - 2.3 * csegs) + ',' + Math.floor(75 - 1.7 * (csegs)) + ')';
        ctx.stroke();
        ctx.strokeRect(currentCord[0] - 4, currentCord[1] - 4, 8, 8);
		if (csegs == 0){
    		cstartCord[0] = lastCord[0];
    		cstartCord[1] = lastCord[1];
    		$(".debugcurve").append(cstartCord[1])
    		$(".debugcurve").append(cstartCord[0])
        }
        midupdate()
        drawcurve()

		lastCord[0] = currentCord[0];
    	lastCord[1] = currentCord[1];

        csegs = csegs + 1;
        $(".debugsegs").append(csegs+" ");

    }
}
function drawcurve() {
    canvasc = document.getElementById('backgroundc');
    ctxc = canvasc.getContext('2d');
	ctxc.beginPath();
	ctxc.lineWidth = 3;
	ctxc.moveTo(cstartCord[0], cstartCord[1]);
    ctxc.quadraticCurveTo(lastCord[0], lastCord[1], midCord[0], midCord[1]);
    ctxc.strokeStyle = 'rgb(255,' + Math.floor(155 - 2.3 * csegs) + ',' + Math.floor(75 - 1.7 * (csegs)) + ')';
   	ctxc.stroke();
	cstartCord[0] = midCord[0];
    cstartCord[1] = midCord[1];


}

function fdraw() {
    ygen();
    xupdate();
    draw();
}

function tdraw() {
    ygen();
    xupdate();
    draw();
    if (csegs == maxseg) {
        clearTimeout(drawtimer);
        return;
    }
    drawtimer = setTimeout("tdraw()", drawwait);
}

function redraw(){
	tdraw();
	csegs = 0;
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctxc.clearRect(0, 0, canvas.width, canvas.height);
	lastCord[0] = startCord[0];
    lastCord[1] = startCord[1];
    $(".debug").empty();
    $(".debugsegs").empty()
    $(".debugcurve").empty()
	rtimer = setTimeout("redraw()", drawtime);

}

function clearall(){
    csegs = 0;
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctxc.clearRect(0, 0, canvas.width, canvas.height);
    lastCord[0] = startCord[0];
    lastCord[1] = startCord[1];
    $(".debug").empty();
    $(".debugsegs").empty()
}

$(document).ready(function() {
	$("#backgroundc").hide()
	$("#debugoutput").hide()
    canvasc = document.getElementById('backgroundc');
    $(canvasc).attr('width', $('body').width())
    if (canvasc.getContext) {
        ctxc = canvasc.getContext('2d');
    }
    canvas = document.getElementById('background');
    $(canvas).attr('width', $('body').width())
    if (canvas.getContext) {
        ctx = canvas.getContext('2d');
    }
    $(".debug").append(canvas.height);
    maxseg = Math.floor(canvas.width / xdiff)+1;
    $(".debug").append(maxseg);
    $(".debug").append(canvas.width);

    lastCord[1] = startCord[1];
    redraw();
    drawtime=(maxseg*drawwait)+2000
    $("#play").hide()
    $("#draw").click(function() {
        $(".debug").empty();
        ygen();
        xupdate();
        draw();
    })

    $("#drawa").click(function() {
		clearall()
        redraw();
    })
    $("#cdelay").click(function() {
    	var promptout=prompt("Segment Delay(ms)",drawwait)
    	if (promptout!=null){
    	drawwait= promptout
    	}
    	drawtime=(maxseg*drawwait)+2000
    })
    
    $("#freeze").click(function(){
    	clearTimeout(drawtimer);
        clearTimeout(rtimer);
    })

    $("#debug").click(function() {
		$("#debugoutput").toggle();
    })

    $("#stoggle").click(function() {
		$("#backgroundc").toggle();
		$("#background").toggle();
    })


    $("#drawf").click(function() {
        var i = 0;
		clearall()
        $(".debug").empty();
        for (i = 0; i <= maxseg; i++) {
            fdraw();
        }

    })

    $("#clear").click(function() {
		clearall()
		clearTimeout(drawtimer);
        clearTimeout(rtimer);
    });


})