// JavaScript Document
//Timeline Script by Benjamin Ghaemmaghami

//global vars
var bcount=8;
var srtp=1;
var ctype=1;
var limg=null;
var lastcid=null;
var maxw=null;
var maxs=null;
var contentopen=false;
var imageon=true;
//global functions

function tidefine(){
	$('.timeitem').each(function(){
	var cid = $(this).attr('id');
	var fid = '#' + cid;
	if (ctype==1){
		$(fid).load("ajax/tl1/index.html "+fid);
	}
	if (ctype==2){
		$(fid).load("ajax/tl2/index.html "+fid);
		}
	if (ctype==3){
		$(fid).load("ajax/tl3/index.html "+fid);
	}
								 });
}

function getVals(){
var bValues = $('#boxcount').val();
bcount= parseInt(bValues);
clcr();

}

function divdefine(){
for(var i = 0; i < bcount; i++) {
	$('.timelinehold').append('<div class="timeitem"></div>');
	}
	$('.timeitem').attr("id", function (arr) {
  	return "tl-itm" + (arr+srtp);
	})							
}

function imgSizer(){			
				//Find image size
				var imgw= (this).naturalWidth;
				var imgh= (this).naturalHeight;
				//Resize based on size
				var maxh=250
				
				var	ratio = Math.min( maxw/imgw, maxh/imgh );
				var	rimgw = Math.round(ratio * imgw);
				var	rimgh = Math.round(ratio * imgh);
				
				if (imgw>imgh){
					$(this).css('width', rimgw+'px');
					$(this).css('height', 'auto');

				}
				else if (imgw<maxw && imgh<250){
				
				}
				else{
					//$(this).attr('height', 250);
					$(this).css('width', rimgw+'px');
					$(this).css('height', 'auto');
				}
				
				//Find top padding for centering
				var imgspc= Math.floor((275-rimgh)/2);
					$('div.imga').css('padding-top', imgspc);
				
				
				//Add image to page after load
					$('div.imga').append(limg);
				
				//Image info for testing
				//$('div.info').append(imgw+ " x " +imgh);
				//$('div.info').append("<p>" +rimgw+ " x " +rimgh+ "</p>");
				//$('div.info').append("<p>"+ ratio +"</p>");
				//})
}

function trefresh(){
	$('div.timeitem').empty();
	$('div.timeitem').attr("id", null);
	$('div.timelinehold').empty();
	$('#textarea').empty();
	divdefine();
	tidefine();
}

function transition(){
	$('div.timelinehold').slideToggle(450, function() {trefresh()}).delay(500);
	$('div.timelinehold').slideToggle(450);
		
}

function pageResize(){
var pagewidth= bcount*140 + 100
var ratio= (pagewidth-100)/3

$('.pagewrapper').css('width', pagewidth+"px");
$('div.info').css('width', (ratio*2)+"px");
$('div.imghld').css('width', (ratio)+"px");
$('div.imga').css('width', (ratio-50)+"px")
maxw= ratio-50
}

function fullResize(){
	pageResize();
	srtp=1;
	trefresh();
	transition();
		//$('#menu').append(maxs);
		//$('#menu').append(srtp);
}

function smax(){
	var extra= Math.ceil(12/bcount)
	maxs= bcount*extra+1
	//$('#menu').append(maxs);
}

function clct(){
	$('div.info').delay(200).slideUp(400);
	$('div.imghld').delay(200).slideUp(500, function(){transition()});
	$('div.imga').empty().hide();
	$('#textarea').empty().hide();
	lastcid=null;
	contentopen=false;
}

function clcnt(){
	$('div.info').delay(200).slideUp(400);
	$('div.imghld').delay(200).slideUp(500);
	$('div.imga').empty().hide();
	$('#textarea').empty().hide();
	lastcid=null;
	contentopen=false;
}

function clcr(){
	$('div.info').delay(200).slideUp(400);
	$('div.imghld').delay(200).slideUp(500, function(){fullResize()});
	$('div.imga').empty().hide();
	$('#textarea').empty().hide();
	lastcid=null;
	contentopen=false;
}


$(document).ready(function (){


//generate bcount based on window size

var windoww=$('body').width();
//$('#menu').append(windoww);

if (windoww<=800){
	bcount=5;
	$('#boxcount').val(bcount);
	}
else if(windoww<=1024){
	bcount=6
	$('#boxcount').val(bcount);	
	}
else if(windoww<=1280){
	bcount=8
	$('#boxcount').val(bcount);	
	}
else if(windoww>=1680){
	bcount=10
	$('#boxcount').val(bcount);
	}

//Resize based on bcount
pageResize();

//Activate Timeline Changer
$('#timelines>a').click(function(){
		var aid= $(this).attr('id');
		
		if (aid=="time1"){
			ctype=1;
			if (contentopen=true){
				clcnt();
			}
			trefresh();
		}
		if (aid=="time2"){
			ctype=2;
			if (contentopen=true){
				clcnt();
			}
			trefresh();
		}
		if (aid=="time3"){
			ctype=3;
			if (contentopen=true){
				clcnt();
			}
			trefresh();
		}
});

//Check/uncheck checkboxes
$(function(){
    $('#animationcheck').attr('checked', true);
	$('#imagecheck').attr('checked', true);
});

var toggleFx = function(){
  $.fx.off = !$.fx.off;
};
var toggleImgs = function(){
  imageon = (imageon != true);
};
$('#animationcheck').change(toggleFx);
$('#imagecheck').change(toggleImgs);

//Define ids for divs
divdefine();

//Hide unneeded divs
$('#menu').hide();
$('div.info').hide();
$('div.imghld').hide();

//hide timelines if needed
$('#timelines').hide();

//fade control on menutoggle

$('#menuToggle').fadeTo(0, 0.5)
$('#menuToggle').mouseout(function(){
	$(this).stop(true, true);
	$(this).fadeTo('fast',0.5)});
$('#menuToggle').mouseover(function(){$(this).fadeTo('fast',1)});


//Define titles
tidefine();

//Activate Scrolling	
	$('div.movebutton#right').click(function(){
		srtp= srtp+bcount;
		smax();
		if (srtp>maxs-bcount){
			srtp=maxs;
		}
		else{
		if(contentopen=true){
		clct();
		}
		else{
		transition();
		}
		}		
		//$('div.header').append(srtp);
		});
	
	$('div.movebutton#left').click(function(){
		srtp= srtp-bcount;
		if (srtp<1){
			srtp= 1;
		}
		else{
		if(contentopen=true){
		clct();
		}
		else{
		transition();
		}
		}
		//$('div.header').append(srtp);
			});

//Display options menu onClick
$('#menuToggle').click(function(){
	$('#menu').slideToggle(200);
								});


$('body').on("click", ".timeitemcurrent", function (){
		$('div.info').stop(true, true);
		$('div.imghld').stop(true, true);
		$('.timeitemcurrent').attr('class', "timeitem");
		$('div.info').delay(200).slideUp(400);
		$('div.imghld').delay(200).slideUp(500);
		$('div.imga').empty().hide();
		$('#textarea').empty().hide();
		lastcid=null;
		contentopen=false;
		
		})
//Display content onClick	
$('body').on("click", ".timeitem", function (){
		$('div.info').stop(true, true);
		$('div.imghld').stop(true, true);
		var cid = $(this).attr('id');
		var fid = '#' + cid;
		var pid = cid + ".jpg";	
		var itmc = $(this).attr('class')
		
		if(lastcid!=cid && contentopen==true){
		$('.timeitemcurrent').attr('class', "timeitem");
		$('div.info').delay(200).slideUp(400);
		$('div.imghld').delay(200).slideUp(500);
		$('div.imga').empty().hide();
		$('#textarea').empty().hide();
		
		lastcid=null;
		contentopen=false;
		
		}
		if(lastcid==cid){
		$('.timeitemcurrent').attr('class', "timeitem");	
		$('div.info').delay(200).slideUp(400);
		$('div.imghld').delay(200).slideUp(500);
		$('div.imga').empty();
		lastcid=null;
		contentopen=false;
		}
		else{
		//Define image needed
		if (imageon==true){
		if (ctype==1){
		limg = $("<img />").attr('src', 'imgs/ld/' +pid).attr('class', "imga").load(imgSizer);
		}
		if (ctype==2){
		limg = $("<img />").attr('src', 'imgs/ld2/' +pid).attr('class', "imga").load(imgSizer);
		}
		if (ctype==3){
		limg = $("<img />").attr('src', 'imgs/ld3/' +pid).attr('class', "imga").load(imgSizer);
		}
		}
		else{
		}
		
		//Load text content based on content var
		if (ctype==1){
			$('#textarea').load("ajax/content1/index.html "+fid).delay(400);
		}
		if (ctype==2){
			$('#textarea').load("ajax/content2/index.htmll "+fid).delay(400);
		}
		if (ctype==3){
			$('#textarea').load("ajax/content3/index.html "+fid).delay(400);
		}
				
		$('div.info').delay(100).slideDown(500, function(){$('#textarea').show()});
		$('div.imghld').delay(200).slideDown(500, function(){$('div.imga').show()});
		lastcid=cid;
		contentopen=true;
		$(fid).attr('class', "timeitemcurrent");
		//When mouse leaves area hide content
		//$(fid).mouseleave(function (){
		//$('div.info').delay(200).slideUp(400);
		//$('div.imghld').delay(200).slideUp(500);
		//$('div.imga').empty();
		//lastcid=null
									
		//	})
		}
		});

$("select").change(function(){
getVals();
}

							)})