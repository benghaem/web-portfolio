function toggleNavigation(e){pageStatus.naviActive=-1*pageStatus.naviActive+1,naviContainCacheVal.animate({top:-1*naviContainCacheVal.position().top-(naviContainCacheVal.outerHeight()-Math.round(($(window).height()-naviContainCacheVal.outerHeight())/2))},e)}function createModal(e,t,a,i,o){"text"==i&&($(".modalHelper").append('<div class="modal modalText '+a+'"><h1>'+e+"</h1><p>"+t+"</p></div>"),console.log("text modal created!"),$(".modalText").load(function(){centerModal()})),"image"==i&&($(".modalHelper").append('<div class="modal modalImage '+a+'"><img src="'+o+'" alt="'+t+'" class="modalTrueImage"><h1>'+e+"</h1></div>"),console.log("image modal created!"),$(".modalTrueImage").load(function(){resizeModalImage(.8*$(window).width(),.7*$(window).height()),centerModal()})),"prompt"==i&&(pageStatus.promptActive=1,$(".modalHelper").append('<div class="modal modalPrompt '+a+'"><h1>'+e+"</h1><p>"+t+'<button id ="'+o[0]+'">'+o[2]+'</button><button id ="'+o[1]+'">'+o[3]+"</button></p></div>"),console.log("prompt modal created!")),centerModal(),openModal()}function resizeModalImage(e,t){var a=$(".modalTrueImage").width(),i=$(".modalTrueImage").height();e>=a&&t>=i||(a>=i&&($(".modalTrueImage").css("width",e+"px"),$(".modalTrueImage").css("height","auto")),a===i&&($(".modalTrueImage").css("width","auto"),$(".modalTrueImage").css("height",t+"px")),i>=a&&($(".modalTrueImage").css("width","auto"),$(".modalTrueImage").css("height",t+"px")))}function openModal(){1!=pageStatus.modalActive&&($(".modalHelper").fadeIn(300),$(".modalBlackout").fadeIn(300),$(".effectContain").toggleClass("pageEffect"),pageStatus.modalActive=1)}function closeModal(){1===pageStatus.modalActive&&($(".effectContain").toggleClass("pageEffect"),$(".modalHelper").fadeOut(),$(".modalBlackout").fadeToggle(300,function(){$(".modal").remove()}),pageStatus.modalActive=0,pageStatus.albumActive=!1)}function centerModal(){$(".modal").css("top",Math.round(($(window).height()-$(".modal").outerHeight())/2)),$(".modal").css("left",Math.round(($(window).width()-$(".modal").outerWidth())/2))}function showcaseSlideTo(e){$(".showcasePageHold").stop(!0,!0),$(".showcaseActive").stop(!0,!0),e>5&&(e=5),1>e&&(e=1),pageStatus.slideLocation=-1*e*$(".showcasePage").width()+$(".showcasePage").width(),$(".showcasePageHold").animate({left:pageStatus.slideLocation}),$(".showcaseActive").animate({left:(e-1)*$(".showcaseImageCenter").width()/5}),$(".cssWindowOutside").fadeTo(400,1)}function getPageColor(){for(var e=styleVars.colorClasses.length-1;e>=0;e--)if(1==naviToggleCacheVal.hasClass(styleVars.colorClasses[e]))return styleVars.colorClasses[e]}var pageStatus={};pageStatus.naviActive=0,pageStatus.promptActive=0,pageStatus.modalActive=0,pageStatus.slideLocation=1,pageStatus.AlbumActive=!1;var styleVars={};styleVars.colorClasses=["CCmutedRed","CCmutedBlue","CCmutedGreen","CCmutedOrange","CCmutedPurple"],styleVars.colorValues=["#FF5E5E","#F3B6FA","#FFBE69","#61C758","#99E4F0"],$(document).ready(function(){console.log("Welcome to benghaem.com"),mainContainCacheVal=$(".mainContain"),naviContainCacheVal=$(".naviContain"),naviToggleCacheVal=$(".naviToggle"),mainContainCacheVal.css("min-height",$(window).height()-$(".footer").height()-95),naviContainCacheVal.css("left",Math.round(($(window).width()-naviContainCacheVal.outerWidth())/2)),$(".modalBlackout").click(function(){1!=pageStatus.promptActive&&closeModal(),0!=pageStatus.naviActive&&toggleNavigation(600)}),$(".naviToggle ul li").mouseenter(function(){color=$(this).data("color"),color=styleVars.colorValues[color-1],naviToggleCacheVal.css("background-color",color),naviToggleCacheVal.css("transition-duration","600ms")}),$(".naviToggle ul").mouseleave(function(){naviToggleCacheVal.removeAttr("style")}),$(".contactOpen").click(function(){createModal("contact","Feel free to contact me with work or questions at: <a href='mailto:contact@benghaem.com'>contact@benghaem.com</a>",getPageColor(),"text")}),$(".cssWindowDot:nth-child(1)").click(function(){$(this).parent().fadeTo(400,0)}),$(document).keydown(function(e){27===e.which&&closeModal(),37===e.which&&pageStatus.albumActive===!0&&albumModal.previous(),39===e.which&&pageStatus.albumActive===!0&&albumModal.next()})}),$(window).resize(function(){0!=pageStatus.naviActive&&naviContainCacheVal.css("top",Math.round(($(window).height()-naviContainCacheVal.outerHeight())/2)),0!=pageStatus.modalActive&&(resizeModalImage(.8*$(window).width(),.7*$(window).height()),centerModal()),naviContainCacheVal.css("left",Math.round($(window).width()-naviContainCacheVal.outerWidth())/2),mainContainCacheVal.css("min-height",$(window).height()-$(".footer").height()-95),showcaseSlideTo(1)});var albumModal=function(){function e(e,t){c=e,l=parseInt(t),$("img").each(function(){null!=$(this).data("album")&&(elementName=$(this).data("album"),c===elementName&&r.push($(this).attr("src")))}),s=r.length,n()}function t(){console.log(this)}function a(e){l=e,n()}function i(){l+=1,n()}function o(){l-=1,n()}function n(){l>s&&(l=1),0>=l&&(l=s),$(".modal").remove(),$(".modalHelper").append('<div class="modal modalImage"><div class="albumNav" onclick="albumModal.previous()">&lt;</div><img src="'+r[l-1]+'" alt="'+c+'" class="modalTrueImage"><div class="albumNav" onclick="albumModal.next()">&gt;</div></div>'),$(".modalTrueImage").load(function(){resizeModalImage(.8*$(window).width(),.7*$(window).height()),centerModal()}),openModal(),pageStatus.albumActive=!0}var r=[],s=null,c=null,l=null;return{createTag:e,createSib:t,changeTo:a,next:i,previous:o}}();