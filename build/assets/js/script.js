function toggleNavigation(t){pageStatus.naviActive=-1*pageStatus.naviActive+1,naviContainCacheVal.animate({top:-1*naviContainCacheVal.position().top-(naviContainCacheVal.outerHeight()-Math.round(($(window).height()-naviContainCacheVal.outerHeight())/2))},t)}function createModal(t,e,n,i,a){"text"==i&&($(".modalHelper").append('<div class="modal modalText '+n+'"><h1>'+t+"</h1><p>"+e+"</p></div>"),console.log("text modal created!"),$(".modalText").load(function(){centerModal()})),"image"==i&&($(".modalHelper").append('<div class="modal modalImage '+n+'"><img src="'+a+'" alt="'+e+'" class="modalTrueImage"><h1>'+t+"</h1></div>"),console.log("image modal created!"),$(".modalTrueImage").load(function(){resizeModalImage(.8*$(window).width(),.7*$(window).height()),centerModal()})),"prompt"==i&&(pageStatus.promptActive=1,$(".modalHelper").append('<div class="modal modalPrompt '+n+'"><h1>'+t+"</h1><p>"+e+'<button id ="'+a[0]+'">'+a[2]+'</button><button id ="'+a[1]+'">'+a[3]+"</button></p></div>"),console.log("prompt modal created!")),centerModal(),openModal()}function resizeModalImage(t,e){var n=$(".modalTrueImage").width(),i=$(".modalTrueImage").height();t>=n&&e>=i||(n>=i&&($(".modalTrueImage").css("width",t+"px"),$(".modalTrueImage").css("height","auto")),n===i&&($(".modalTrueImage").css("width","auto"),$(".modalTrueImage").css("height",e+"px")),i>=n&&($(".modalTrueImage").css("width","auto"),$(".modalTrueImage").css("height",e+"px")))}function openModal(){1!=pageStatus.modalActive&&($(".modalHelper").fadeIn(300),$(".modalBlackout").fadeIn(300),$(".effectContain").toggleClass("pageEffect"),pageStatus.modalActive=1)}function closeModal(){1===pageStatus.modalActive&&($(".effectContain").toggleClass("pageEffect"),$(".modalHelper").fadeOut(),$(".modalBlackout").fadeToggle(300,function(){$(".modal").remove()}),pageStatus.modalActive=0,pageStatus.albumActive=!1)}function centerModal(){$(".modal").css("top",Math.round(($(window).height()-$(".modal").outerHeight())/2)),$(".modal").css("left",Math.round(($(window).width()-$(".modal").outerWidth())/2))}function showcaseSlideTo(t){$(".showcasePageHold").stop(!0,!0),$(".showcaseActive").stop(!0,!0),t>5&&(t=5),1>t&&(t=1),pageStatus.slideLocation=-1*t*$(".showcasePage").width()+$(".showcasePage").width(),$(".showcasePageHold").animate({left:pageStatus.slideLocation}),$(".showcaseActive").animate({left:(t-1)*$(".showcaseImageCenter").width()/5}),$(".cssWindowOutside").fadeTo(400,1)}function getPageColor(){for(var t=styleVars.colorClasses.length-1;t>=0;t--)if(1==naviToggleCacheVal.hasClass(styleVars.colorClasses[t]))return styleVars.colorClasses[t]}var pageStatus={};pageStatus.naviActive=0,pageStatus.promptActive=0,pageStatus.modalActive=0,pageStatus.slideLocation=1,pageStatus.AlbumActive=!1;var styleVars={};styleVars.colorClasses=["CCmutedRed","CCmutedBlue","CCmutedGreen","CCmutedOrange","CCmutedPurple"],styleVars.colorValues=["#FF5E5E","#F3B6FA","#FFBE69","#61C758","#99E4F0"],$(document).ready(function(){console.log("Welcome to benghaem.com"),mainContainCacheVal=$(".mainContain"),naviContainCacheVal=$(".naviContain"),naviToggleCacheVal=$(".naviToggle"),mainContainCacheVal.css("min-height",$(window).height()-$(".footer").height()-85),naviContainCacheVal.css("left",Math.round(($(window).width()-naviContainCacheVal.outerWidth())/2)),$(".modalBlackout").click(function(){1!=pageStatus.promptActive&&closeModal(),0!=pageStatus.naviActive&&toggleNavigation(600)}),$(".naviToggle ul li").mouseenter(function(){color=$(this).data("color"),color=styleVars.colorValues[color-1],naviToggleCacheVal.css("background-color",color),naviToggleCacheVal.css("transition-duration","600ms")}),$(".naviToggle ul").mouseleave(function(){naviToggleCacheVal.removeAttr("style")}),$(".contactOpen").click(function(){createModal("contact","Feel free to contact me with work or questions at: <a href='mailto:contact@benghaem.com'>contact@benghaem.com</a>",getPageColor(),"text")}),$(".cssWindowDot:nth-child(1)").click(function(){$(this).parent().fadeTo(400,0)}),$(document).keydown(function(t){27===t.which&&closeModal(),37===t.which&&pageStatus.albumActive===!0&&albumModal.previous(),39===t.which&&pageStatus.albumActive===!0&&albumModal.next()})}),$(window).resize(function(){0!=pageStatus.naviActive&&naviContainCacheVal.css("top",Math.round(($(window).height()-naviContainCacheVal.outerHeight())/2)),0!=pageStatus.modalActive&&(resizeModalImage(.8*$(window).width(),.7*$(window).height()),centerModal()),naviContainCacheVal.css("left",Math.round($(window).width()-naviContainCacheVal.outerWidth())/2),mainContainCacheVal.css("min-height",$(window).height()-$(".footer").height()-95),showcaseSlideTo(1)});var albumModal=function(){function t(t,e){c=t,l=parseInt(e),$("img").each(function(){null!=$(this).data("album")&&(elementName=$(this).data("album"),c===elementName&&r.push($(this).attr("src")))}),s=r.length,o()}function e(){console.log(this)}function n(t){l=t,o()}function i(){l+=1,o()}function a(){l-=1,o()}function o(){l>s&&(l=1),0>=l&&(l=s),$(".modal").remove(),$(".modalHelper").append('<div class="modal modalImage"><div class="albumNav" onclick="albumModal.previous()">&lt;</div><img src="'+r[l-1]+'" alt="'+c+'" class="modalTrueImage"><div class="albumNav" onclick="albumModal.next()">&gt;</div></div>'),$(".modalTrueImage").load(function(){resizeModalImage(.8*$(window).width(),.7*$(window).height()),centerModal()}),openModal(),pageStatus.albumActive=!0}var r=[],s=null,c=null,l=null;return{createTag:t,createSib:e,changeTo:n,next:i,previous:a}}();