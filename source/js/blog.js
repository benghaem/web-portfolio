//Benjamin Ghaemmaghami 2014

$( document ).ready(function() {
//hide calendar elements
	$('.blogArchivePanelHidden').hide()

	//extend blogsidebar to page height
	$('.blogSidebarReserve').css('height',$('.mainContain').height()-30/*Get height without margins*/);

  	//toggle the month calendar elements on the blog pages
  	$('.blogArchiveToggle').click(function(){
  		//get year html-data element
  		var panelYear = $(this).data("year")

  		//get panel location
  		var diff = $('.blogArchiveSlider').position().left;
  		//toggle panel location based on width of element
  		diff = (diff + $('.blogArchiveSlider').width()/2) *-1

  		$('.'+panelYear+'CalHidden').show()
  		$('.blogArchiveSlider').animate({
  			left: -1*$('.blogArchiveSlider').width()/2},
  			400, function() {
  			/* stuff to do after animation is complete */
  		});
  	})

  	$('.blogArchiveReturn').click(function() {
		$('.blogArchiveSlider').animate({
  			left: "0"},
  			400, function() {
  			$('.blogArchivePanelHidden').hide()
  		});
  	});

  	$(window).scroll(function() {
	if (getBottomDist(window) <= 209 /*Footer total height inc. margin*/) {
		$('.blogSidebar').addClass('blogSidebarAbsolute');
	}
	else {
		$('.blogSidebar').removeClass('blogSidebarAbsolute');
	};
	});

})

function getBottomDist(){
	var offset = $('.blogSidebarTracker').offset()
	var bottomDist = $(document).height() - offset.top - $('.blogSidebar').height()
	return bottomDist
	};