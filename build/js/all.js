$( document ).ready(function() {
//hide calendar elements
	$('.blogArchivePanelHidden').hide()

	//extend blogsidebar to page height
	$('.blogSidebarReserve').css('height',$('.mainContain').height());

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
/**
 * Prism: Lightweight, robust, elegant syntax highlighting
 * MIT license http://www.opensource.org/licenses/mit-license.php/
 * @author Lea Verou http://lea.verou.me
 */
(function(){var e=/\blang(?:uage)?-(?!\*)(\w+)\b/i,t=self.Prism={util:{type:function(e){return Object.prototype.toString.call(e).match(/\[object (\w+)\]/)[1]},clone:function(e){var n=t.util.type(e);switch(n){case"Object":var r={};for(var i in e)e.hasOwnProperty(i)&&(r[i]=t.util.clone(e[i]));return r;case"Array":return e.slice()}return e}},languages:{extend:function(e,n){var r=t.util.clone(t.languages[e]);for(var i in n)r[i]=n[i];return r},insertBefore:function(e,n,r,i){i=i||t.languages;var s=i[e],o={};for(var u in s)if(s.hasOwnProperty(u)){if(u==n)for(var a in r)r.hasOwnProperty(a)&&(o[a]=r[a]);o[u]=s[u]}return i[e]=o},DFS:function(e,n){for(var r in e){n.call(e,r,e[r]);t.util.type(e)==="Object"&&t.languages.DFS(e[r],n)}}},highlightAll:function(e,n){var r=document.querySelectorAll('code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code');for(var i=0,s;s=r[i++];)t.highlightElement(s,e===!0,n)},highlightElement:function(r,i,s){var o,u,a=r;while(a&&!e.test(a.className))a=a.parentNode;if(a){o=(a.className.match(e)||[,""])[1];u=t.languages[o]}if(!u)return;r.className=r.className.replace(e,"").replace(/\s+/g," ")+" language-"+o;a=r.parentNode;/pre/i.test(a.nodeName)&&(a.className=a.className.replace(e,"").replace(/\s+/g," ")+" language-"+o);var f=r.textContent;if(!f)return;f=f.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/\u00a0/g," ");var l={element:r,language:o,grammar:u,code:f};t.hooks.run("before-highlight",l);if(i&&self.Worker){var c=new Worker(t.filename);c.onmessage=function(e){l.highlightedCode=n.stringify(JSON.parse(e.data),o);t.hooks.run("before-insert",l);l.element.innerHTML=l.highlightedCode;s&&s.call(l.element);t.hooks.run("after-highlight",l)};c.postMessage(JSON.stringify({language:l.language,code:l.code}))}else{l.highlightedCode=t.highlight(l.code,l.grammar,l.language);t.hooks.run("before-insert",l);l.element.innerHTML=l.highlightedCode;s&&s.call(r);t.hooks.run("after-highlight",l)}},highlight:function(e,r,i){return n.stringify(t.tokenize(e,r),i)},tokenize:function(e,n,r){var i=t.Token,s=[e],o=n.rest;if(o){for(var u in o)n[u]=o[u];delete n.rest}e:for(var u in n){if(!n.hasOwnProperty(u)||!n[u])continue;var a=n[u],f=a.inside,l=!!a.lookbehind,c=0;a=a.pattern||a;for(var h=0;h<s.length;h++){var p=s[h];if(s.length>e.length)break e;if(p instanceof i)continue;a.lastIndex=0;var d=a.exec(p);if(d){l&&(c=d[1].length);var v=d.index-1+c,d=d[0].slice(c),m=d.length,g=v+m,y=p.slice(0,v+1),b=p.slice(g+1),w=[h,1];y&&w.push(y);var E=new i(u,f?t.tokenize(d,f):d);w.push(E);b&&w.push(b);Array.prototype.splice.apply(s,w)}}}return s},hooks:{all:{},add:function(e,n){var r=t.hooks.all;r[e]=r[e]||[];r[e].push(n)},run:function(e,n){var r=t.hooks.all[e];if(!r||!r.length)return;for(var i=0,s;s=r[i++];)s(n)}}},n=t.Token=function(e,t){this.type=e;this.content=t};n.stringify=function(e,r,i){if(typeof e=="string")return e;if(Object.prototype.toString.call(e)=="[object Array]")return e.map(function(t){return n.stringify(t,r,e)}).join("");var s={type:e.type,content:n.stringify(e.content,r,i),tag:"span",classes:["token",e.type],attributes:{},language:r,parent:i};s.type=="comment"&&(s.attributes.spellcheck="true");t.hooks.run("wrap",s);var o="";for(var u in s.attributes)o+=u+'="'+(s.attributes[u]||"")+'"';return"<"+s.tag+' class="'+s.classes.join(" ")+'" '+o+">"+s.content+"</"+s.tag+">"};if(!self.document){self.addEventListener("message",function(e){var n=JSON.parse(e.data),r=n.language,i=n.code;self.postMessage(JSON.stringify(t.tokenize(i,t.languages[r])));self.close()},!1);return}var r=document.getElementsByTagName("script");r=r[r.length-1];if(r){t.filename=r.src;document.addEventListener&&!r.hasAttribute("data-manual")&&document.addEventListener("DOMContentLoaded",t.highlightAll)}})();;
Prism.languages.markup={comment:/&lt;!--[\w\W]*?-->/g,prolog:/&lt;\?.+?\?>/,doctype:/&lt;!DOCTYPE.+?>/,cdata:/&lt;!\[CDATA\[[\w\W]*?]]>/i,tag:{pattern:/&lt;\/?[\w:-]+\s*(?:\s+[\w:-]+(?:=(?:("|')(\\?[\w\W])*?\1|\w+))?\s*)*\/?>/gi,inside:{tag:{pattern:/^&lt;\/?[\w:-]+/i,inside:{punctuation:/^&lt;\/?/,namespace:/^[\w-]+?:/}},"attr-value":{pattern:/=(?:('|")[\w\W]*?(\1)|[^\s>]+)/gi,inside:{punctuation:/=|>|"/g}},punctuation:/\/?>/g,"attr-name":{pattern:/[\w:-]+/g,inside:{namespace:/^[\w-]+?:/}}}},entity:/&amp;#?[\da-z]{1,8};/gi};Prism.hooks.add("wrap",function(e){e.type==="entity"&&(e.attributes.title=e.content.replace(/&amp;/,"&"))});;
Prism.languages.css={comment:/\/\*[\w\W]*?\*\//g,atrule:{pattern:/@[\w-]+?.*?(;|(?=\s*{))/gi,inside:{punctuation:/[;:]/g}},url:/url\((["']?).*?\1\)/gi,selector:/[^\{\}\s][^\{\};]*(?=\s*\{)/g,property:/(\b|\B)[\w-]+(?=\s*:)/ig,string:/("|')(\\?.)*?\1/g,important:/\B!important\b/gi,ignore:/&(lt|gt|amp);/gi,punctuation:/[\{\};:]/g};Prism.languages.markup&&Prism.languages.insertBefore("markup","tag",{style:{pattern:/(&lt;|<)style[\w\W]*?(>|&gt;)[\w\W]*?(&lt;|<)\/style(>|&gt;)/ig,inside:{tag:{pattern:/(&lt;|<)style[\w\W]*?(>|&gt;)|(&lt;|<)\/style(>|&gt;)/ig,inside:Prism.languages.markup.tag.inside},rest:Prism.languages.css}}});;
Prism.languages.clike={comment:{pattern:/(^|[^\\])(\/\*[\w\W]*?\*\/|(^|[^:])\/\/.*?(\r?\n|$))/g,lookbehind:!0},string:/("|')(\\?.)*?\1/g,"class-name":{pattern:/((?:(?:class|interface|extends|implements|trait|instanceof|new)\s+)|(?:catch\s+\())[a-z0-9_\.\\]+/ig,lookbehind:!0,inside:{punctuation:/(\.|\\)/}},keyword:/\b(if|else|while|do|for|return|in|instanceof|function|new|try|throw|catch|finally|null|break|continue)\b/g,"boolean":/\b(true|false)\b/g,"function":{pattern:/[a-z0-9_]+\(/ig,inside:{punctuation:/\(/}}, number:/\b-?(0x[\dA-Fa-f]+|\d*\.?\d+([Ee]-?\d+)?)\b/g,operator:/[-+]{1,2}|!|&lt;=?|>=?|={1,3}|(&amp;){1,2}|\|?\||\?|\*|\/|\~|\^|\%/g,ignore:/&(lt|gt|amp);/gi,punctuation:/[{}[\];(),.:]/g};
;
Prism.languages.javascript=Prism.languages.extend("clike",{keyword:/\b(var|let|if|else|while|do|for|return|in|instanceof|function|new|with|typeof|try|throw|catch|finally|null|break|continue)\b/g,number:/\b-?(0x[\dA-Fa-f]+|\d*\.?\d+([Ee]-?\d+)?|NaN|-?Infinity)\b/g});Prism.languages.insertBefore("javascript","keyword",{regex:{pattern:/(^|[^/])\/(?!\/)(\[.+?]|\\.|[^/\r\n])+\/[gim]{0,3}(?=\s*($|[\r\n,.;})]))/g,lookbehind:!0}});Prism.languages.markup&&Prism.languages.insertBefore("markup","tag",{script:{pattern:/(&lt;|<)script[\w\W]*?(>|&gt;)[\w\W]*?(&lt;|<)\/script(>|&gt;)/ig,inside:{tag:{pattern:/(&lt;|<)script[\w\W]*?(>|&gt;)|(&lt;|<)\/script(>|&gt;)/ig,inside:Prism.languages.markup.tag.inside},rest:Prism.languages.javascript}}});
;
Prism.hooks.add("after-highlight",function(e){var t=e.element.parentNode;if(!t||!/pre/i.test(t.nodeName)||t.className.indexOf("line-numbers")===-1){return}var n=1+e.code.split("\n").length;var r;lines=new Array(n);lines=lines.join("<span></span>");r=document.createElement("span");r.className="line-numbers-rows";r.innerHTML=lines;if(t.hasAttribute("data-start")){t.style.counterReset="linenumber "+(parseInt(t.getAttribute("data-start"),10)-1)}e.element.appendChild(r)})
;
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
	showcaseSlideTo(1)
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
