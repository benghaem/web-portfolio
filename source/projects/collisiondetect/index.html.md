---
title: Collision Detection
fullTitle: Javascript Collision Detection
colorClass: CCmutedOrange
date: Summer 2012
type: HTML, Javascript
---

The idea to create a collision detection example in HTML5's &lt;canvas&gt; element began in the summer of 2012 when I was asked if I could make a billiards simulation/game. I quickly moved away from that idea through development and decided that instead I simply wanted to see how many particles I could collide at a reasonable (30+) framerate on semi-recent hardware. The final product works very well with particle counts up to 1000 after which the space is filled too densely for the particles to bounce accurately.

The main logic that powers the collisions is as follows:

<pre class="line-numbers">
<code class="language-javascript">function chkInside(xpos1, ypos1, xpos2, ypos2, w2, h2){
		if(((xpos1 >= xpos2) &amp;&amp; (xpos1 &lt;= xpos2+w2)) &amp;&amp; ((ypos1 >= ypos2) &amp;&amp; (ypos1 &lt;= ypos2+h2))){
			return true;
		}
		else{
			return false;
		}</code>
</pre>

While this logic is effective for checking if a rectangle is within another rectangle, it is far too simplistic and cannot be effectively moved to other non-rectangular shapes, or rectangles that have been rotated in some manner. Because of this, all elements in the scene must have either horizontal or vertical edges.


