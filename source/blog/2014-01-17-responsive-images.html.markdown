---
title: content based responsive images
date: 2014-01-17 17:00 UTC
tags: Development
colorClass: CCmutedGreen
headerImg: True
imgWrapLoc: 75
comments: true
---

Responsive images are a hard problem to completely solve. Some options retain the entire image while reducing size while others create new images for each resolution. I propose that a solution based on content is necessary so that the general structure of the page can be kept the same for both desktop and mobile viewersREADMORE.

Below I showcase a few of the options available for responsive images as well as example code snippets. 

###Option 1: Proportional CSS Resize

Resize based on the image proportion as the page gets smaller with a CSS property such as:

<pre class="line-numbers">
<code class="language-css">.dumbResize{
	width: 100%;
}</code>
</pre>

However, this property fails to preserve the height of the image and can leave mobile viewers with extremely small images, two behaviors that should be avoided if possible.

###Option 2: CSS Media Queries

Different images for each page width using CSS media queries.  
For example:

<pre class="line-numbers">
<code class="language-css">/*Image for normal display*/
.resizeImage{
	background: url(awesomeImage.jpg) no-repeat center;
}

/*Image for tablet display*/
@media (max-width : 768px){
.resizeImage{
	background: url(awesomeImage_1080.jpg) no-repeat center;
}</code>
</pre>

This CSS changes the image based on screen width. This solution works well, but requires significantly more setup time to create new images and write media queries. It is also limited to one image per class and could run into problems on dynamically generated pages.

###Option 3: Content Based Horizontal Resize (CSS Only)  

This solution resizes an image toward a percentage-based center as the width of the viewport decreases. This solution is specifically suited for variable width pages such as blogs that need to be viewed across devices. My algorithm solves the problem of images that overflow from their viewport as width decreases, consequently causing the image to lose its primary focus of interest. The algorithm corrects the image position so that the viewport centers the desired point of interest.  

View the [Live Demo](http://benghaem.com/testbed/responsive-image-demo/) or look at the images on [benghaem/blog/](http://benghaem.com/blog/)

The base code is as follows:  

####CSS
<pre class="line-numbers">
<code class="language-css">.exampleImageWrap{
	margin-left: calc(('imageWidth[px]' - 100%) *-('location%'));
}

.container{
    width: 100%;
    overflow: hidden;
    max-width: imageWidth[px];
}</code>
</pre>
  
####HTML

<pre class="line-numbers">
<code class="language-markup">&lt;div class="container"&gt;
	&lt;img class="exampleImageWrap"&gt;&lt;img&gt;
&lt;/div&gt;</code>
</pre>

<p></p>

####The Image Wrap:

The image wrap requires a single property, but the magic comes from the CSS calculation.

<pre class="line-numbers">
<code class="language-css">margin-left: calc((320px - 100%) *-(.25));</code>
</pre>

imageWidth[px] is replaced with the image width ex: "320px" and location% is replaced with a value that corresponds to the target location on the image. Half way across the image would be .5, a fourth from the left would be .25, and so on.  

So why does this work? When the browser calculates the operation it will use the container width for the 100% value. Because the container is also 100% this will then scale the calculation based on the available width for the container. This is important because we want the container to resize, but we always want the image to stay at a fixed width. The image width - the container width = the current amount of the image that will be overflowing from the container. This value is then multiplied by the negative percentage given resulting in a final negative "margin-left" value. Margin-left then moves the image away from the center of the container to align it with the new calculated center.  

Another way to think about this is as a limit. As x (100%) approaches 0 (zero container width) margin-left approaches the image width * the location percentage. This value will then be used to move the image outside of the viewport by that amount. 

For example, take the code above. When 100% reaches 0 the calculated value will be -80px or 1/4th of the image width that will be moved to the left of the image. Leaving that 25% location at the center of the (now zero) viewport.

Again please view the [Live Demo](http://benghaem.com/testbed/responsive-image-demo/) if this was confusing.

####The Container:

The container is simple and the properties are pretty self explanatory.  

* Width is 100% (or any other percentage) so that it will scale with the page.  
* Overflow is hidden so that the image is not shown outside of the container when it shrinks.  
* Max-width (optional) insures that the image width is the maximum that the container will expand to.

####Drawbacks:
1. Requires a fixed image width for each class used. This should not be a problem as assets should be created specifically for this use, but it is something to keep in mind.

2. Each scaling location requires its own class; I recommend creating around five or so for common locations ex: 25%, 33%, 50%, 66%, and 75%.

3. Because this property relies on css calc() it is not supported in all browsers. Currently [caniuse.com](http://caniuse.com/calc) reports 72% global compatibility with IE 8 or lower unsupported. If compatibility is an issue for your users remember that the property degrades gracefully to simply no image repositioning, or check out the javascript version below.

###Option 4: Content Based Horizontal Resize (JS + CSS)

This is the same solution as above, but using jQuery to control the margin on resize. This solution does not require a fixed image size and uses an html-data attribute to control sliding location. Use this solution if you want greater compatibility or would like to define location with html-data attributes.

####CSS
<pre class="line-numbers">
<code class="language-css">.container{
    width: 100%;
    overflow: hidden;
    max-width: imageWidth[px];
}</code>
</pre>

####HTML

<pre class="line-numbers">
<code class="language-markup">&lt;div class="container" data-location="25"&gt;
	&lt;img&gt;&lt;/img&gt;
&lt;/div&gt;</code>
</pre>

####Javascript (Requires jQuery)

<pre class="line-numbers">
<code class="language-javascript">$(window).resize(function(){
	$('.container').each(function(){
        var imageCache = $(this).children('img') /*Select first img element*/
		var location = $(this).data("location")/100 /*Convert to decimal*/
		var imageWidth = imageCache.width()
		var containerWidth = $(this).width() 
		var marginCorrect = (imageWidth-containerWidth)*-location
		imageCache.css("margin-left", marginCorrect+"px")
	})
})</code>
</pre>

####Javascript Concise

<pre class="line-numbers">
<code class="language-javascript">$(window).resize(function(){
	$('.container').each(function(){
        var imageCache = $(this).children('img') /*Select img element*/
		imageCache.css("margin-left", ((imageCache.width())-($(this).width()))*-($(this).data("location")/100)+"px")
	})
})</code>
</pre>

####Drawbacks:

1.  Updating on window resize can be CPU intensive  

2.  Likely slightly less efficient than the CSS solution because of jQuery's overhead

###Final Thoughts

Responsive images are a great way to enhance a mobile or desktop site. The main goal of a responsive image should be to display the same content across devices and the 3rd and 4th options are superior in this regard. Focusing on content takes marginally more time during development, but ensures that the user has a positive experience. Using dynamic resizing saves time, as a content center can be quickly identified by the developer, and the browser/scripting can be relied upon to center the image. Also, this same method could be extended to center images properly in two dimensions instead of just one.

Any questions can be directed to the comments section below.