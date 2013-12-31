var naviActive = 0
var promptActive = 0 
var modalActive = 0
//global color classes for navigation and other dynamic elements
var colorClasses = ["CCmutedRed","CCmutedBlue","CCmutedGreen","CCmutedOrange","CCmutedPurple"]
//raw color values for the color clasess ** consider transitioning to dynamic
var colorValues = ["#FF5E5E","#F3B6FA","#FFBE69","#61C758","#99E4F0"]
var slideLocation = 1



$( document ).ready(function() {
mainContainCacheVal = $('.mainContain');
naviContainCacheVal = $('.naviContain');
naviToggleCacheVal = $('.naviToggle');

	//force footer to bottom
	mainContainCacheVal.css("min-height", ($(window).height()-245/*footer height*/));

	//place static items
	naviContainCacheVal.css("left", Math.round(($(window).width()-naviContainCacheVal.outerWidth())/2));

	//statements that allow the user to close various modals via the modal helper element
	$('.modalBlackout').click(
		function () {
			//if the modal helper is active any click will close it and empty any modals within. other if statements are povided for special use cases 
			if (promptActive !=1){
				closeModal()
				}
			//close the navigation
			if (naviActive != 0){
				toggleNavigation(600)
			}
	})
	//swap the navigation color to the color provided in the html data element. This effect uses the transition property of css for the animation
	$('.naviToggle ul li').mouseenter(
		function () {
    		color = $(this).data("color")
    		color = colorValues[color-1]
    		naviToggleCacheVal.css("background-color", color)
    		naviToggleCacheVal.css("transition-duration", "600ms")
  		})
	//shortcuts back to default by removing all style elements
  	$('.naviToggle ul').mouseleave(	
  		function () {
  			naviToggleCacheVal.removeAttr("style")
  		})
  		
  	//activate the contact modal
  	$('.contactOpen').click(function(){
  		createModal("contact","Feel free to contact me with work or questions at: <a href='mailto:contact@benghaem.com'>contact@benghaem.com</a>",getPageColor(),"text")
  	})

  	$(".cssWindowDot:nth-child(1)").click(function(){
  		$(this).parent().fadeTo(400,0.00)
  	})
  	
})

//this is nessasary to ensure that modals stay centered while the window is resized. Unfortunately CPU intensive. Possiblly offer toggle for slower computers?
$(window).resize(function () {
	//center by finding the remaining space avaiable and divide by 2
	if (naviActive != 0){
		naviContainCacheVal.css("top", Math.round(($(window).height()-naviContainCacheVal.outerHeight())/2));
	}
	if (modalActive != 0){
		resizeModalImage($(window).width() * .8,$(window).height() * .7) //.8 and .7 are the maximum % width and % height
		$('.modal').css("top", Math.round(($(window).height()-$('.modal').outerHeight())/2));
		$('.modal').css("left", Math.round(($(window).width()-$('.modal').outerWidth())/2));
	}
	naviContainCacheVal.css("left", Math.round(($(window).width()-naviContainCacheVal.outerWidth()))/2);
	// naviToggleCacheVal.css("left", Math.round(($(window).width()-naviToggleCacheVal.width())/2));
	mainContainCacheVal.css("min-height", ($(window).height()-245));
	showcaseSlideTo(1);
})


//speed values in ms
function toggleNavigation(speed){
	naviActive = naviActive * -1 + 1
	//this function toggles the position through the use of the offset property. Offset gives the postion realative to the window from the top left corner of the element. To move off the page we simply multiply that offset by -1 to ignore the space above the element and then subtract the height of the element to move it offscreen. When off the screen the offset is equal to the negative height and is thus rendered postive by the -1 multiplication. The height is then subtracted yeilding 0 and causing the element to return to its inital location.
	naviContainCacheVal.animate({
		top: (naviContainCacheVal.position().top*-1 - (naviContainCacheVal.outerHeight()- Math.round(($(window).height()-naviContainCacheVal.outerHeight())/2)))}, speed
	)
}

function createModal(title, text, color, style, extra){
//title--title of the modal (optional) use "" if title is unneeded
//text-- text within modal (optional) use "" if text is unneeded
//color--addtional color class to match menu/current page. Defined via css. Single rule classes reccomended
//style-- text,image,prompt,custom
//extra-- this attribute changes based on the style /extra-text: extra has no effect/ /extra-image: extra is the image url, title serves as the caption and text is the alt-text/ /extra-prompt: extra is an array of addtional values [button 1 identifier, button 2 identifier, button 1 text, button 2 text]/ /extra-custom: extra is the css class to be added to the modal/

//note that a modal is active for any functions that may need that information
modalActive = 1

if (style == "text"){
	$('.modalHelper').append('<div class="modal modalText '+color+'"><h1>'+title+'</h1><p>'+text+'</p></div>')
	console.log('text modal created!')
	$('.modalText').load(function() {
		$('.modal').css("top", Math.round(($(window).height()-$('.modal').outerHeight())/2));
		$('.modal').css("left", Math.round(($(window).width()-$('.modal').outerWidth())/2));
	})
}
if (style == "image"){
	$('.modalHelper').append('<div class="modal modalImage '+color+'"><img src="'+ extra +'" alt="'+text+'" class="modalTrueImage"><h1>'+title+'</h1></div>')
	console.log('image modal created!')
	$(".modalTrueImage").load(function() {
		resizeModalImage($(window).width() * .8, $(window).height() * .7) //.8 and .7 are the maximum % width and % height
		$('.modal').css("top", Math.round(($(window).height()-$('.modal').outerHeight())/2));
		$('.modal').css("left", Math.round(($(window).width()-$('.modal').outerWidth())/2));
	})
}
if (style == "prompt"){
	promptActive = 1
	$('.modalHelper').append('<div class="modal modalPrompt '+color+'"><h1>'+title+'</h1><p>'+text+'<button id ="'+extra[0]+'">'+extra[2]+'</button><button id ="'+extra[1]+'">'+extra[3]+'</button></p></div>')
	console.log('prompt modal created!')
}

$('.modal').css("top", Math.round(($(window).height()-$('.modal').outerHeight())/2));
$('.modal').css("left", Math.round(($(window).width()-$('.modal').outerWidth())/2));
//the helper holds the modal items and the blackout causes the screen to be obscured
$('.modalHelper').fadeIn(300)
$('.modalBlackout').fadeIn(300)
$('.effectContain').toggleClass('pageEffect')
}

function resizeModalImage(maxwidth,maxheight){
//resize image based on two max values -- should be rewritted so that it can be run on any image not just image modals
	var imageWidth= $(".modalTrueImage").width();
	var imageHeight= $(".modalTrueImage").height();
	console.log(imageWidth,imageHeight,maxwidth,maxheight)
	//if dimension is too large-->reset to largest possible size while prioritizing width
	if (imageWidth >= imageHeight){
		$(".modalTrueImage").css('width', maxwidth+"px");
		$(".modalTrueImage").css('height', 'auto');

	}
	else{
		$(".modalTrueImage").css('width', 'auto');
		$(".modalTrueImage").css('height', maxheight+"px");	
	}
}
function closeModal(){
	//when called fade out both the helper element and the blackout element then remove all elements within the helper
	$('.effectContain').toggleClass('pageEffect')
	$('.modalHelper').fadeOut()
	$('.modalBlackout').fadeToggle(300, function(){
		$('.modal').remove()
		modalActive = 0
	})
}

function showcaseSlideTo(location){
	//clear animation
	$('.showcasePageHold').stop(true, true)
	$('.showcaseActive').stop(true, true)
	//if location given is out of range reset it to the respective edge
	if (location > 5){
		location = 5
	}
	if (location < 1){ 
		location = 1
	}
	slideLocation = location * $('.showcasePage').width() * -1 +$('.showcasePage').width()//width of the page element
	$('.showcasePageHold').animate({
		left: slideLocation
	})
	$('.showcaseActive').animate({
		left: (location-1) * $('.showcaseImageCenter').width()/5});
	$('.cssWindowOutside').fadeTo(400,1)
}

function getPageColor(){
	for (var i = colorClasses.length - 1; i >= 0; i--) {
		if (naviToggleCacheVal.hasClass(colorClasses[i])==true)
			return colorClasses[i]
	};
}
;
