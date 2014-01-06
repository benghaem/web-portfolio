//Benjamin Ghaemmaghami 2014

//global page status namespace
var pageStatus = {};
pageStatus.naviActive = 0;
pageStatus.promptActive = 0; 
pageStatus.modalActive = 0;
pageStatus.slideLocation = 1;
pageStatus.AlbumActive = false;

//style global vars container
var styleVars = {};
//global color classes for navigation and other dynamic elements
styleVars.colorClasses = ["CCmutedRed","CCmutedBlue","CCmutedGreen","CCmutedOrange","CCmutedPurple"];
//raw color values for the color clasess ** consider transitioning to dynamic
styleVars.colorValues = ["#FF5E5E","#F3B6FA","#FFBE69","#61C758","#99E4F0"];


$( document ).ready(function() {
console.log("Welcome to benghaem.com")
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
			if (pageStatus.promptActive !=1){
				closeModal()
				}
			//close the navigation
			if (pageStatus.naviActive != 0){
				toggleNavigation(600)
			}
	})
	//swap the navigation color to the color provided in the html data element. This effect uses the transition property of css for the animation
	$('.naviToggle ul li').mouseenter(
		function () {
    		color = $(this).data("color")
    		color = styleVars.colorValues[color-1]
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

  	//easter egg remove css window if red button is clicked
  	$(".cssWindowDot:nth-child(1)").click(function(){
  		$(this).parent().fadeTo(400,0.00)
  	})

  	//close modal when escape key is pressed
  	$(document).keydown(function(event) {
  		if (event.which === 27){
  			closeModal();
  		}
  		if (event.which === 37 && pageStatus.albumActive === true){
  			albumModal.previous();
  		}
  		if (event.which === 39 && pageStatus.albumActive === true){
  			albumModal.next();
  		}
  	}) 

})

//this is nessasary to ensure that modals stay centered while the window is resized. Unfortunately CPU intensive. Possiblly offer toggle for slower computers?
$(window).resize(function () {
	//center by finding the remaining space avaiable and divide by 2
	if (pageStatus.naviActive != 0){
		naviContainCacheVal.css("top", Math.round(($(window).height()-naviContainCacheVal.outerHeight())/2));
	}
	if (pageStatus.modalActive != 0){
		resizeModalImage($(window).width() * .8,$(window).height() * .7) //.8 and .7 are the maximum % width and % height
		centerModal()
	}
	naviContainCacheVal.css("left", Math.round(($(window).width()-naviContainCacheVal.outerWidth()))/2);
	// naviToggleCacheVal.css("left", Math.round(($(window).width()-naviToggleCacheVal.width())/2));
	mainContainCacheVal.css("min-height", ($(window).height()-245));
	showcaseSlideTo(1);
})


//speed values in ms
function toggleNavigation(speed){
	pageStatus.naviActive = pageStatus.naviActive * -1 + 1
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

	if (style == "text"){
		$('.modalHelper').append('<div class="modal modalText '+color+'"><h1>'+title+'</h1><p>'+text+'</p></div>')
		console.log('text modal created!')
		$('.modalText').load(function() {
			centerModal()
		})
	}

	if (style == "image"){
		$('.modalHelper').append('<div class="modal modalImage '+color+'"><img src="'+ extra +'" alt="'+text+'" class="modalTrueImage"><h1>'+title+'</h1></div>')
		console.log('image modal created!')
		$(".modalTrueImage").load(function() {
			resizeModalImage($(window).width() * .8, $(window).height() * .7) //.8 and .7 are the maximum % width and % height
			centerModal()
		})
	}

	if (style == "prompt"){
		pageStatus.promptActive = 1
		$('.modalHelper').append('<div class="modal modalPrompt '+color+'"><h1>'+title+'</h1><p>'+text+'<button id ="'+extra[0]+'">'+extra[2]+'</button><button id ="'+extra[1]+'">'+extra[3]+'</button></p></div>')
		console.log('prompt modal created!')
	}

	centerModal()
	openModal()
}

//Album Modal namespace
var albumModal = function(){
	var albumArray = []
	var arraySize = null;
	var currentAlbum = null;
	var currentImage = null;

	//searches entire page for img elements with matching tag
	function createFromTag(albumName,startImg){
		currentAlbum = albumName;
		currentImage = parseInt(startImg);
		$( "img" ).each(function(index,el) {
			if ( $(this).data("album") != null ){
				elementName = $(this).data("album")
				if (currentAlbum === elementName){
					albumArray.push($(this).attr("src"))
				}
			}
		});
		arraySize = albumArray.length
		activateOnPage();
	}

	//uses ALL img chilren elements
	function createFromSiblings(){
		//pageStatus.modalActive = 1
		console.log(this)
	}

	function changeTo(location){
		currentImage = location
		activateOnPage()
	}

	function next(){
		currentImage = currentImage + 1
		
		activateOnPage()
	}

	function previous(){
		currentImage = currentImage-1
		activateOnPage()
	}

	function activateOnPage(){
		//check current image value
		if (currentImage > arraySize){
			currentImage = 1
		}
		if (currentImage <= 0){
			currentImage = arraySize
		}
		//clear modal from helper
		$('.modal').remove();
		//add new modal
		$('.modalHelper').append('<div class="modal modalImage"><div class="albumNav" onclick="albumModal.previous()">&lt;</div><img src="'+ albumArray[currentImage-1] +'" alt="'+currentAlbum+'" class="modalTrueImage"><div class="albumNav" onclick="albumModal.next()">&gt;</div></div>')
		//when image loads resize
		$(".modalTrueImage").load(function() {
			resizeModalImage($(window).width() * .8, $(window).height() * .7) //.8 and .7 are the maximum % width and % height
			centerModal()
		})
		openModal()
		pageStatus.albumActive = true
	}

	//return elements match external functions to internal
	return{
		createTag:createFromTag,
		createSib:createFromSiblings,
		changeTo:changeTo,
		next:next,
		previous:previous,
	}
}();

function resizeModalImage(maxWidth,maxHeight){
//resize image based on two max values -- should be rewritted so that it can be run on any image not just image modals
	var imageWidth= $(".modalTrueImage").width();
	var imageHeight= $(".modalTrueImage").height();
	// console.log(imageWidth,imageHeight,maxWidth,maxHeight)
	//if dimension is too large-->reset to largest possible size while prioritizing width
	if (imageWidth <= maxWidth && imageHeight <= maxHeight){
		return
	}
	if (imageWidth >= imageHeight){
		$(".modalTrueImage").css('width', maxWidth+"px");
		$(".modalTrueImage").css('height', 'auto');
	}
	if (imageWidth === imageHeight){
		$(".modalTrueImage").css('width', 'auto');
		$(".modalTrueImage").css('height', maxHeight+"px");	
	}
	if (imageWidth <= imageHeight){
		$(".modalTrueImage").css('width', 'auto');
		$(".modalTrueImage").css('height', maxHeight+"px");	
	}
}
function openModal(){
	//the helper holds the modal items and the blackout causes the screen to be obscured
	if (pageStatus.modalActive != 1){
		$('.modalHelper').fadeIn(300);
		$('.modalBlackout').fadeIn(300);
		$('.effectContain').toggleClass('pageEffect');
		pageStatus.modalActive = 1;
	}
}

function closeModal(){
	//when called fade out both the helper element and the blackout element then remove all elements within the helper
	if (pageStatus.modalActive === 1){
	$('.effectContain').toggleClass('pageEffect')
	$('.modalHelper').fadeOut()
	$('.modalBlackout').fadeToggle(300, function(){
		$('.modal').remove()
	});
	pageStatus.modalActive = 0
	pageStatus.albumActive = false
	}
}

function centerModal(){
	$('.modal').css("top", Math.round(($(window).height()-$('.modal').outerHeight())/2));
	$('.modal').css("left", Math.round(($(window).width()-$('.modal').outerWidth())/2));
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
	pageStatus.slideLocation = location * $('.showcasePage').width() * -1 +$('.showcasePage').width()//width of the page element
	$('.showcasePageHold').animate({
		left: pageStatus.slideLocation
	})
	$('.showcaseActive').animate({
		left: (location-1) * $('.showcaseImageCenter').width()/5});
	$('.cssWindowOutside').fadeTo(400,1)
}

function getPageColor(){
	for (var i = styleVars.colorClasses.length - 1; i >= 0; i--) {
		if (naviToggleCacheVal.hasClass(styleVars.colorClasses[i])==true)
			return styleVars.colorClasses[i]
	};
}
