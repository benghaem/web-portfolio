function rbThumbs(){
	$.get("../Gallery/regengallery.php", function(){
	$('body').append("Thumbnails Rebuilt")		
	})
	$.get("../Gallery/launchpage.php", function() {
	$('body').append("launchpage Rebuilt")
})

}
$(document).ready(function (){

	$(window).hashchange( function(){
		var hash = "#"+location.hash
		if (hash == "#"){
			hash = "##about"
		}
		var hash = hash.substring(2)		
 		if (hash == "portfolio"){
 			$('.current').toggleClass('current')
			$("#nav"+hash).toggleClass('current')
 			hash = "gallery/portfoliobase"

 		}
 		else if (hash.substring(0, 3) == "pt-"){
 			hash = hash.substring(3)
 			hash = "gallery/"+hash
 		}
 		else{
 			$('.current').toggleClass('current')
			$("#nav"+hash).toggleClass('current')
 			hash = "ajax/"+hash+"/index.html"
 		}
 		$(".content").hide()
		$(".content").load(hash, function(){
		$(".content").show()
		});
	});	
	
$(window).hashchange();
})