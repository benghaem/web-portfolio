function getBottomDist(){var e=$(".blogSidebarTracker").offset(),t=$(document).height()-e.top-$(".blogSidebar").height();return t}function toggleNavigation(e){pageStatus.naviActive=-1*pageStatus.naviActive+1,naviContainCacheVal.animate({top:-1*naviContainCacheVal.position().top-(naviContainCacheVal.outerHeight()-Math.round(($(window).height()-naviContainCacheVal.outerHeight())/2))},e)}function createModal(e,t,a,n,i){"text"==n&&($(".modalHelper").append('<div class="modal modalText '+a+'"><h1>'+e+"</h1><p>"+t+"</p></div>"),console.log("text modal created!"),$(".modalText").load(function(){centerModal()})),"image"==n&&($(".modalHelper").append('<div class="modal modalImage '+a+'"><img src="'+i+'" alt="'+t+'" class="modalTrueImage"><h1>'+e+"</h1></div>"),console.log("image modal created!"),$(".modalTrueImage").load(function(){resizeModalImage(.8*$(window).width(),.7*$(window).height()),centerModal()})),"prompt"==n&&(pageStatus.promptActive=1,$(".modalHelper").append('<div class="modal modalPrompt '+a+'"><h1>'+e+"</h1><p>"+t+'<button id ="'+i[0]+'">'+i[2]+'</button><button id ="'+i[1]+'">'+i[3]+"</button></p></div>"),console.log("prompt modal created!")),centerModal(),openModal()}function resizeModalImage(e,t){var a=$(".modalTrueImage").width(),n=$(".modalTrueImage").height();e>=a&&t>=n||(a>=n&&($(".modalTrueImage").css("width",e+"px"),$(".modalTrueImage").css("height","auto")),a===n&&($(".modalTrueImage").css("width","auto"),$(".modalTrueImage").css("height",t+"px")),n>=a&&($(".modalTrueImage").css("width","auto"),$(".modalTrueImage").css("height",t+"px")))}function openModal(){1!=pageStatus.modalActive&&($(".modalHelper").fadeIn(300),$(".modalBlackout").fadeIn(300),$(".effectContain").toggleClass("pageEffect"),pageStatus.modalActive=1)}function closeModal(){1===pageStatus.modalActive&&($(".effectContain").toggleClass("pageEffect"),$(".modalHelper").fadeOut(),$(".modalBlackout").fadeToggle(300,function(){$(".modal").remove()}),pageStatus.modalActive=0,pageStatus.albumActive=!1)}function centerModal(){$(".modal").css("top",Math.round(($(window).height()-$(".modal").outerHeight())/2)),$(".modal").css("left",Math.round(($(window).width()-$(".modal").outerWidth())/2))}function showcaseSlideTo(e){$(".showcasePageHold").stop(!0,!0),$(".showcaseActive").stop(!0,!0),e>5&&(e=5),1>e&&(e=1),pageStatus.slideLocation=-1*e*$(".showcasePage").width()+$(".showcasePage").width(),$(".showcasePageHold").animate({left:pageStatus.slideLocation}),$(".showcaseActive").animate({left:(e-1)*$(".showcaseImageCenter").width()/5}),$(".cssWindowOutside").fadeTo(400,1)}function getPageColor(){for(var e=styleVars.colorClasses.length-1;e>=0;e--)if(1==naviToggleCacheVal.hasClass(styleVars.colorClasses[e]))return styleVars.colorClasses[e]}$(document).ready(function(){$(".blogArchivePanelHidden").hide(),$(".blogSidebarReserve").css("height",$(".mainContain").height()-30),$(".blogArchiveToggle").click(function(){var e=$(this).data("year"),t=$(".blogArchiveSlider").position().left;t=-1*(t+$(".blogArchiveSlider").width()/2),$("."+e+"CalHidden").show(),$(".blogArchiveSlider").animate({left:-1*$(".blogArchiveSlider").width()/2},400,function(){})}),$(".blogArchiveReturn").click(function(){$(".blogArchiveSlider").animate({left:"0"},400,function(){$(".blogArchivePanelHidden").hide()})}),$(window).scroll(function(){getBottomDist(window)<=180?$(".blogSidebar").addClass("blogSidebarAbsolute"):$(".blogSidebar").removeClass("blogSidebarAbsolute")})}),function(){var e=/\blang(?:uage)?-(?!\*)(\w+)\b/i,t=self.Prism={util:{type:function(e){return Object.prototype.toString.call(e).match(/\[object (\w+)\]/)[1]},clone:function(e){var a=t.util.type(e);switch(a){case"Object":var n={};for(var i in e)e.hasOwnProperty(i)&&(n[i]=t.util.clone(e[i]));return n;case"Array":return e.slice()}return e}},languages:{extend:function(e,a){var n=t.util.clone(t.languages[e]);for(var i in a)n[i]=a[i];return n},insertBefore:function(e,a,n,i){i=i||t.languages;var o=i[e],r={};for(var s in o)if(o.hasOwnProperty(s)){if(s==a)for(var l in n)n.hasOwnProperty(l)&&(r[l]=n[l]);r[s]=o[s]}return i[e]=r},DFS:function(e,a){for(var n in e)a.call(e,n,e[n]),"Object"===t.util.type(e)&&t.languages.DFS(e[n],a)}},highlightAll:function(e,a){for(var n,i=document.querySelectorAll('code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code'),o=0;n=i[o++];)t.highlightElement(n,e===!0,a)},highlightElement:function(n,i,o){for(var r,s,l=n;l&&!e.test(l.className);)l=l.parentNode;if(l&&(r=(l.className.match(e)||[,""])[1],s=t.languages[r]),s){n.className=n.className.replace(e,"").replace(/\s+/g," ")+" language-"+r,l=n.parentNode,/pre/i.test(l.nodeName)&&(l.className=l.className.replace(e,"").replace(/\s+/g," ")+" language-"+r);var c=n.textContent;if(c){c=c.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/\u00a0/g," ");var d={element:n,language:r,grammar:s,code:c};if(t.hooks.run("before-highlight",d),i&&self.Worker){var g=new Worker(t.filename);g.onmessage=function(e){d.highlightedCode=a.stringify(JSON.parse(e.data),r),t.hooks.run("before-insert",d),d.element.innerHTML=d.highlightedCode,o&&o.call(d.element),t.hooks.run("after-highlight",d)},g.postMessage(JSON.stringify({language:d.language,code:d.code}))}else d.highlightedCode=t.highlight(d.code,d.grammar,d.language),t.hooks.run("before-insert",d),d.element.innerHTML=d.highlightedCode,o&&o.call(n),t.hooks.run("after-highlight",d)}}},highlight:function(e,n,i){return a.stringify(t.tokenize(e,n),i)},tokenize:function(e,a){var n=t.Token,i=[e],o=a.rest;if(o){for(var r in o)a[r]=o[r];delete a.rest}e:for(var r in a)if(a.hasOwnProperty(r)&&a[r]){var s=a[r],l=s.inside,c=!!s.lookbehind,d=0;s=s.pattern||s;for(var g=0;g<i.length;g++){var u=i[g];if(i.length>e.length)break e;if(!(u instanceof n)){s.lastIndex=0;var h=s.exec(u);if(h){c&&(d=h[1].length);var m=h.index-1+d,h=h[0].slice(d),p=h.length,f=m+p,E=u.slice(0,m+1),b=u.slice(f+1),T=[g,1];E&&T.push(E);var v=new n(r,l?t.tokenize(h,l):h);T.push(v),b&&T.push(b),Array.prototype.splice.apply(i,T)}}}}return i},hooks:{all:{},add:function(e,a){var n=t.hooks.all;n[e]=n[e]||[],n[e].push(a)},run:function(e,a){var n=t.hooks.all[e];if(n&&n.length)for(var i,o=0;i=n[o++];)i(a)}}},a=t.Token=function(e,t){this.type=e,this.content=t};if(a.stringify=function(e,n,i){if("string"==typeof e)return e;if("[object Array]"==Object.prototype.toString.call(e))return e.map(function(t){return a.stringify(t,n,e)}).join("");var o={type:e.type,content:a.stringify(e.content,n,i),tag:"span",classes:["token",e.type],attributes:{},language:n,parent:i};"comment"==o.type&&(o.attributes.spellcheck="true"),t.hooks.run("wrap",o);var r="";for(var s in o.attributes)r+=s+'="'+(o.attributes[s]||"")+'"';return"<"+o.tag+' class="'+o.classes.join(" ")+'" '+r+">"+o.content+"</"+o.tag+">"},!self.document)return self.addEventListener("message",function(e){var a=JSON.parse(e.data),n=a.language,i=a.code;self.postMessage(JSON.stringify(t.tokenize(i,t.languages[n]))),self.close()},!1),void 0;var n=document.getElementsByTagName("script");n=n[n.length-1],n&&(t.filename=n.src,document.addEventListener&&!n.hasAttribute("data-manual")&&document.addEventListener("DOMContentLoaded",t.highlightAll))}(),Prism.languages.markup={comment:/&lt;!--[\w\W]*?-->/g,prolog:/&lt;\?.+?\?>/,doctype:/&lt;!DOCTYPE.+?>/,cdata:/&lt;!\[CDATA\[[\w\W]*?]]>/i,tag:{pattern:/&lt;\/?[\w:-]+\s*(?:\s+[\w:-]+(?:=(?:("|')(\\?[\w\W])*?\1|\w+))?\s*)*\/?>/gi,inside:{tag:{pattern:/^&lt;\/?[\w:-]+/i,inside:{punctuation:/^&lt;\/?/,namespace:/^[\w-]+?:/}},"attr-value":{pattern:/=(?:('|")[\w\W]*?(\1)|[^\s>]+)/gi,inside:{punctuation:/=|>|"/g}},punctuation:/\/?>/g,"attr-name":{pattern:/[\w:-]+/g,inside:{namespace:/^[\w-]+?:/}}}},entity:/&amp;#?[\da-z]{1,8};/gi},Prism.hooks.add("wrap",function(e){"entity"===e.type&&(e.attributes.title=e.content.replace(/&amp;/,"&"))}),Prism.languages.css={comment:/\/\*[\w\W]*?\*\//g,atrule:{pattern:/@[\w-]+?.*?(;|(?=\s*{))/gi,inside:{punctuation:/[;:]/g}},url:/url\((["']?).*?\1\)/gi,selector:/[^\{\}\s][^\{\};]*(?=\s*\{)/g,property:/(\b|\B)[\w-]+(?=\s*:)/gi,string:/("|')(\\?.)*?\1/g,important:/\B!important\b/gi,ignore:/&(lt|gt|amp);/gi,punctuation:/[\{\};:]/g},Prism.languages.markup&&Prism.languages.insertBefore("markup","tag",{style:{pattern:/(&lt;|<)style[\w\W]*?(>|&gt;)[\w\W]*?(&lt;|<)\/style(>|&gt;)/gi,inside:{tag:{pattern:/(&lt;|<)style[\w\W]*?(>|&gt;)|(&lt;|<)\/style(>|&gt;)/gi,inside:Prism.languages.markup.tag.inside},rest:Prism.languages.css}}}),Prism.languages.css.selector={pattern:/[^\{\}\s][^\{\}]*(?=\s*\{)/g,inside:{"pseudo-element":/:(?:after|before|first-letter|first-line|selection)|::[-\w]+/g,"pseudo-class":/:[-\w]+(?:\(.*\))?/g,"class":/\.[-:\.\w]+/g,id:/#[-:\.\w]+/g}},Prism.languages.insertBefore("css","ignore",{hexcode:/#[\da-f]{3,6}/gi,entity:/\\[\da-f]{1,8}/gi,number:/[\d%\.]+/g,"function":/(attr|calc|cross-fade|cycle|element|hsla?|image|lang|linear-gradient|matrix3d|matrix|perspective|radial-gradient|repeating-linear-gradient|repeating-radial-gradient|rgba?|rotatex|rotatey|rotatez|rotate3d|rotate|scalex|scaley|scalez|scale3d|scale|skewx|skewy|skew|steps|translatex|translatey|translatez|translate3d|translate|url|var)/gi}),Prism.languages.clike={comment:{pattern:/(^|[^\\])(\/\*[\w\W]*?\*\/|(^|[^:])\/\/.*?(\r?\n|$))/g,lookbehind:!0},string:/("|')(\\?.)*?\1/g,"class-name":{pattern:/((?:(?:class|interface|extends|implements|trait|instanceof|new)\s+)|(?:catch\s+\())[a-z0-9_\.\\]+/gi,lookbehind:!0,inside:{punctuation:/(\.|\\)/}},keyword:/\b(if|else|while|do|for|return|in|instanceof|function|new|try|throw|catch|finally|null|break|continue)\b/g,"boolean":/\b(true|false)\b/g,"function":{pattern:/[a-z0-9_]+\(/gi,inside:{punctuation:/\(/}},number:/\b-?(0x[\dA-Fa-f]+|\d*\.?\d+([Ee]-?\d+)?)\b/g,operator:/[-+]{1,2}|!|&lt;=?|>=?|={1,3}|(&amp;){1,2}|\|?\||\?|\*|\/|\~|\^|\%/g,ignore:/&(lt|gt|amp);/gi,punctuation:/[{}[\];(),.:]/g},Prism.languages.javascript=Prism.languages.extend("clike",{keyword:/\b(var|let|if|else|while|do|for|return|in|instanceof|function|new|with|typeof|try|throw|catch|finally|null|break|continue)\b/g,number:/\b-?(0x[\dA-Fa-f]+|\d*\.?\d+([Ee]-?\d+)?|NaN|-?Infinity)\b/g}),Prism.languages.insertBefore("javascript","keyword",{regex:{pattern:/(^|[^/])\/(?!\/)(\[.+?]|\\.|[^/\r\n])+\/[gim]{0,3}(?=\s*($|[\r\n,.;})]))/g,lookbehind:!0}}),Prism.languages.markup&&Prism.languages.insertBefore("markup","tag",{script:{pattern:/(&lt;|<)script[\w\W]*?(>|&gt;)[\w\W]*?(&lt;|<)\/script(>|&gt;)/gi,inside:{tag:{pattern:/(&lt;|<)script[\w\W]*?(>|&gt;)|(&lt;|<)\/script(>|&gt;)/gi,inside:Prism.languages.markup.tag.inside},rest:Prism.languages.javascript}}}),Prism.languages.php=Prism.languages.extend("clike",{keyword:/\b(and|or|xor|array|as|break|case|cfunction|class|const|continue|declare|default|die|do|else|elseif|enddeclare|endfor|endforeach|endif|endswitch|endwhile|extends|for|foreach|function|include|include_once|global|if|new|return|static|switch|use|require|require_once|var|while|abstract|interface|public|implements|extends|private|protected|parent|static|throw|null|echo|print|trait|namespace|use|final|yield|goto|instanceof|finally|try|catch)\b/gi,constant:/\b[A-Z0-9_]{2,}\b/g}),Prism.languages.insertBefore("php","keyword",{delimiter:/(\?>|&lt;\?php|&lt;\?)/gi,variable:/(\$\w+)\b/gi,"package":{pattern:/(\\|namespace\s+|use\s+)[\w\\]+/g,lookbehind:!0,inside:{punctuation:/\\/}}}),Prism.languages.insertBefore("php","operator",{property:{pattern:/(->)[\w]+/g,lookbehind:!0}}),Prism.languages.markup&&(Prism.hooks.add("before-highlight",function(e){"php"===e.language&&(e.tokenStack=[],e.code=e.code.replace(/(?:&lt;\?php|&lt;\?|<\?php|<\?)[\w\W]*?(?:\?&gt;|\?>)/gi,function(t){return e.tokenStack.push(t),"{{{PHP"+e.tokenStack.length+"}}}"}))}),Prism.hooks.add("after-highlight",function(e){if("php"===e.language){for(var t,a=0;t=e.tokenStack[a];a++)e.highlightedCode=e.highlightedCode.replace("{{{PHP"+(a+1)+"}}}",Prism.highlight(t,e.grammar,"php"));e.element.innerHTML=e.highlightedCode}}),Prism.hooks.add("wrap",function(e){"php"===e.language&&"markup"===e.type&&(e.content=e.content.replace(/(\{\{\{PHP[0-9]+\}\}\})/g,'<span class="token php">$1</span>'))}),Prism.languages.insertBefore("php","comment",{markup:{pattern:/(&lt;|<)[^?]\/?(.*?)(>|&gt;)/g,inside:Prism.languages.markup},php:/\{\{\{PHP[0-9]+\}\}\}/g})),Prism.languages.scss=Prism.languages.extend("css",{comment:{pattern:/(^|[^\\])(\/\*[\w\W]*?\*\/|\/\/.*?(\r?\n|$))/g,lookbehind:!0},atrule:/@[\w-]+(?=\s+(\(|\{|;))/gi,url:/([-a-z]+-)*url(?=\()/gi,selector:/([^@;\{\}\(\)]?([^@;\{\}\(\)]|&amp;|\#\{\$[-_\w]+\})+)(?=\s*\{(\}|\s|[^\}]+(:|\{)[^\}]+))/gm}),Prism.languages.insertBefore("scss","atrule",{keyword:/@(if|else if|else|for|each|while|import|extend|debug|warn|mixin|include|function|return)|(?=@for\s+\$[-_\w]+\s)+from/i}),Prism.languages.insertBefore("scss","property",{variable:/((\$[-_\w]+)|(#\{\$[-_\w]+\}))/i}),Prism.languages.insertBefore("scss","ignore",{placeholder:/%[-_\w]+/i,statement:/\B!(default|optional)\b/gi,"boolean":/\b(true|false)\b/g,"null":/\b(null)\b/g,operator:/\s+([-+]{1,2}|={1,2}|!=|\|?\||\?|\*|\/|\%)\s+/g}),Prism.languages.bash=Prism.languages.extend("clike",{comment:{pattern:/(^|[^"{\\])(#.*?(\r?\n|$))/g,lookbehind:!0},string:{pattern:/("|')(\\?[\s\S])*?\1/g,inside:{property:/\$([a-zA-Z0-9_#\?\-\*!@]+|\{[^\}]+\})/g}},keyword:/\b(if|then|else|elif|fi|for|break|continue|while|in|case|function|select|do|done|until|echo|exit|return|set|declare)\b/g}),Prism.languages.insertBefore("bash","keyword",{property:/\$([a-zA-Z0-9_#\?\-\*!@]+|\{[^}]+\})/g}),Prism.languages.insertBefore("bash","comment",{important:/(^#!\s*\/bin\/bash)|(^#!\s*\/bin\/sh)/g}),Prism.languages.c=Prism.languages.extend("clike",{keyword:/\b(asm|typeof|inline|auto|break|case|char|const|continue|default|do|double|else|enum|extern|float|for|goto|if|int|long|register|return|short|signed|sizeof|static|struct|switch|typedef|union|unsigned|void|volatile|while)\b/g,operator:/[-+]{1,2}|!=?|&lt;{1,2}=?|&gt;{1,2}=?|\-&gt;|={1,2}|\^|~|%|(&amp;){1,2}|\|?\||\?|\*|\//g}),Prism.languages.insertBefore("c","keyword",{property:/#\s*[a-zA-Z]+/g}),Prism.languages.cpp=Prism.languages.extend("c",{keyword:/\b(alignas|alignof|asm|auto|bool|break|case|catch|char|char16_t|char32_t|class|compl|const|constexpr|const_cast|continue|decltype|default|delete|delete\[\]|do|double|dynamic_cast|else|enum|explicit|export|extern|float|for|friend|goto|if|inline|int|long|mutable|namespace|new|new\[\]|noexcept|nullptr|operator|private|protected|public|register|reinterpret_cast|return|short|signed|sizeof|static|static_assert|static_cast|struct|switch|template|this|thread_local|throw|try|typedef|typeid|typename|union|unsigned|using|virtual|void|volatile|wchar_t|while)\b/g,operator:/[-+]{1,2}|!=?|&lt;{1,2}=?|&gt;{1,2}=?|\-&gt;|:{1,2}|={1,2}|\^|~|%|(&amp;){1,2}|\|?\||\?|\*|\/|\b(and|and_eq|bitand|bitor|not|not_eq|or|or_eq|xor|xor_eq)\b/g}),Prism.languages.python={comment:{pattern:/(^|[^\\])#.*?(\r?\n|$)/g,lookbehind:!0},string:/("|')(\\?.)*?\1/g,keyword:/\b(as|assert|break|class|continue|def|del|elif|else|except|exec|finally|for|from|global|if|import|in|is|lambda|pass|print|raise|return|try|while|with|yield)\b/g,"boolean":/\b(True|False)\b/g,number:/\b-?(0x)?\d*\.?[\da-f]+\b/g,operator:/[-+]{1,2}|=?&lt;|=?&gt;|!|={1,2}|(&){1,2}|(&amp;){1,2}|\|?\||\?|\*|\/|~|\^|%|\b(or|and|not)\b/g,ignore:/&(lt|gt|amp);/gi,punctuation:/[{}[\];(),.:]/g},Prism.languages.sql={comment:{pattern:/(^|[^\\])(\/\*[\w\W]*?\*\/|((--)|(\/\/)).*?(\r?\n|$))/g,lookbehind:!0},string:/("|')(\\?.)*?\1/g,keyword:/\b(ACTION|ADD|AFTER|ALGORITHM|ALTER|ANALYZE|APPLY|AS|AS|ASC|AUTHORIZATION|BACKUP|BDB|BEGIN|BERKELEYDB|BIGINT|BINARY|BIT|BLOB|BOOL|BOOLEAN|BREAK|BROWSE|BTREE|BULK|BY|CALL|CASCADE|CASCADED|CASE|CHAIN|CHAR VARYING|CHARACTER VARYING|CHECK|CHECKPOINT|CLOSE|CLUSTERED|COALESCE|COLUMN|COLUMNS|COMMENT|COMMIT|COMMITTED|COMPUTE|CONNECT|CONSISTENT|CONSTRAINT|CONTAINS|CONTAINSTABLE|CONTINUE|CONVERT|CREATE|CROSS|CURRENT|CURRENT_DATE|CURRENT_TIME|CURRENT_TIMESTAMP|CURRENT_USER|CURSOR|DATA|DATABASE|DATABASES|DATETIME|DBCC|DEALLOCATE|DEC|DECIMAL|DECLARE|DEFAULT|DEFINER|DELAYED|DELETE|DENY|DESC|DESCRIBE|DETERMINISTIC|DISABLE|DISCARD|DISK|DISTINCT|DISTINCTROW|DISTRIBUTED|DO|DOUBLE|DOUBLE PRECISION|DROP|DUMMY|DUMP|DUMPFILE|DUPLICATE KEY|ELSE|ENABLE|ENCLOSED BY|END|ENGINE|ENUM|ERRLVL|ERRORS|ESCAPE|ESCAPED BY|EXCEPT|EXEC|EXECUTE|EXIT|EXPLAIN|EXTENDED|FETCH|FIELDS|FILE|FILLFACTOR|FIRST|FIXED|FLOAT|FOLLOWING|FOR|FOR EACH ROW|FORCE|FOREIGN|FREETEXT|FREETEXTTABLE|FROM|FULL|FUNCTION|GEOMETRY|GEOMETRYCOLLECTION|GLOBAL|GOTO|GRANT|GROUP|HANDLER|HASH|HAVING|HOLDLOCK|IDENTITY|IDENTITY_INSERT|IDENTITYCOL|IF|IGNORE|IMPORT|INDEX|INFILE|INNER|INNODB|INOUT|INSERT|INT|INTEGER|INTERSECT|INTO|INVOKER|ISOLATION LEVEL|JOIN|KEY|KEYS|KILL|LANGUAGE SQL|LAST|LEFT|LIMIT|LINENO|LINES|LINESTRING|LOAD|LOCAL|LOCK|LONGBLOB|LONGTEXT|MATCH|MATCHED|MEDIUMBLOB|MEDIUMINT|MEDIUMTEXT|MERGE|MIDDLEINT|MODIFIES SQL DATA|MODIFY|MULTILINESTRING|MULTIPOINT|MULTIPOLYGON|NATIONAL|NATIONAL CHAR VARYING|NATIONAL CHARACTER|NATIONAL CHARACTER VARYING|NATIONAL VARCHAR|NATURAL|NCHAR|NCHAR VARCHAR|NEXT|NO|NO SQL|NOCHECK|NOCYCLE|NONCLUSTERED|NULLIF|NUMERIC|OF|OFF|OFFSETS|ON|OPEN|OPENDATASOURCE|OPENQUERY|OPENROWSET|OPTIMIZE|OPTION|OPTIONALLY|ORDER|OUT|OUTER|OUTFILE|OVER|PARTIAL|PARTITION|PERCENT|PIVOT|PLAN|POINT|POLYGON|PRECEDING|PRECISION|PREV|PRIMARY|PRINT|PRIVILEGES|PROC|PROCEDURE|PUBLIC|PURGE|QUICK|RAISERROR|READ|READS SQL DATA|READTEXT|REAL|RECONFIGURE|REFERENCES|RELEASE|RENAME|REPEATABLE|REPLICATION|REQUIRE|RESTORE|RESTRICT|RETURN|RETURNS|REVOKE|RIGHT|ROLLBACK|ROUTINE|ROWCOUNT|ROWGUIDCOL|ROWS?|RTREE|RULE|SAVE|SAVEPOINT|SCHEMA|SELECT|SERIAL|SERIALIZABLE|SESSION|SESSION_USER|SET|SETUSER|SHARE MODE|SHOW|SHUTDOWN|SIMPLE|SMALLINT|SNAPSHOT|SOME|SONAME|START|STARTING BY|STATISTICS|STATUS|STRIPED|SYSTEM_USER|TABLE|TABLES|TABLESPACE|TEMPORARY|TEMPTABLE|TERMINATED BY|TEXT|TEXTSIZE|THEN|TIMESTAMP|TINYBLOB|TINYINT|TINYTEXT|TO|TOP|TRAN|TRANSACTION|TRANSACTIONS|TRIGGER|TRUNCATE|TSEQUAL|TYPE|TYPES|UNBOUNDED|UNCOMMITTED|UNDEFINED|UNION|UNPIVOT|UPDATE|UPDATETEXT|USAGE|USE|USER|USING|VALUE|VALUES|VARBINARY|VARCHAR|VARCHARACTER|VARYING|VIEW|WAITFOR|WARNINGS|WHEN|WHERE|WHILE|WITH|WITH ROLLUP|WITHIN|WORK|WRITE|WRITETEXT)\b/gi,"boolean":/\b(TRUE|FALSE|NULL)\b/gi,number:/\b-?(0x)?\d*\.?[\da-f]+\b/g,operator:/\b(ALL|AND|ANY|BETWEEN|EXISTS|IN|LIKE|NOT|OR|IS|UNIQUE|CHARACTER SET|COLLATE|DIV|OFFSET|REGEXP|RLIKE|SOUNDS LIKE|XOR)\b|[-+]{1}|!|=?&lt;|=?&gt;|={1}|(&amp;){1,2}|\|?\||\?|\*|\//gi,ignore:/&(lt|gt|amp);/gi,punctuation:/[;[\]()`,.]/g},Prism.languages.ruby=Prism.languages.extend("clike",{comment:/#[^\r\n]*(\r?\n|$)/g,keyword:/\b(alias|and|BEGIN|begin|break|case|class|def|define_method|defined|do|each|else|elsif|END|end|ensure|false|for|if|in|module|new|next|nil|not|or|raise|redo|require|rescue|retry|return|self|super|then|throw|true|undef|unless|until|when|while|yield)\b/g,builtin:/\b(Array|Bignum|Binding|Class|Continuation|Dir|Exception|FalseClass|File|Stat|File|Fixnum|Fload|Hash|Integer|IO|MatchData|Method|Module|NilClass|Numeric|Object|Proc|Range|Regexp|String|Struct|TMS|Symbol|ThreadGroup|Thread|Time|TrueClass)\b/,constant:/\b[A-Z][a-zA-Z_0-9]*[?!]?\b/g}),Prism.languages.insertBefore("ruby","keyword",{regex:{pattern:/(^|[^/])\/(?!\/)(\[.+?]|\\.|[^/\r\n])+\/[gim]{0,3}(?=\s*($|[\r\n,.;})]))/g,lookbehind:!0},variable:/[@$&]+\b[a-zA-Z_][a-zA-Z_0-9]*[?!]?\b/g,symbol:/:\b[a-zA-Z_][a-zA-Z_0-9]*[?!]?\b/g}),function(){function e(e,t){return Array.prototype.slice.call((t||document).querySelectorAll(e))}function t(e,t,a){for(var n,i=t.replace(/\s+/g,"").split(","),o=+e.getAttribute("data-line-offset")||0,r=parseFloat(getComputedStyle(e).lineHeight),s=0;n=i[s++];){n=n.split("-");var l=+n[0],c=+n[1]||l,d=document.createElement("div");d.textContent=Array(c-l+2).join(" \r\n"),d.className=(a||"")+" line-highlight",d.setAttribute("data-start",l),c>l&&d.setAttribute("data-end",c),d.style.top=(l-o-1)*r+"px",(e.querySelector("code")||e).appendChild(d)}}function a(){var a=location.hash.slice(1);e(".temporary.line-highlight").forEach(function(e){e.parentNode.removeChild(e)});var n=(a.match(/\.([\d,-]+)$/)||[,""])[1];if(n&&!document.getElementById(a)){var i=a.slice(0,a.lastIndexOf(".")),o=document.getElementById(i);o&&(o.hasAttribute("data-line")||o.setAttribute("data-line",""),t(o,n,"temporary "),document.querySelector(".temporary.line-highlight").scrollIntoView())}}if(window.Prism){var n=(crlf=/\r?\n|\r/g,0);Prism.hooks.add("after-highlight",function(i){var o=i.element.parentNode,r=o&&o.getAttribute("data-line");o&&r&&/pre/i.test(o.nodeName)&&(clearTimeout(n),e(".line-highlight",o).forEach(function(e){e.parentNode.removeChild(e)}),t(o,r),n=setTimeout(a,1))}),addEventListener("hashchange",a)}}(),Prism.hooks.add("after-highlight",function(e){var t=e.element.parentNode;if(t&&/pre/i.test(t.nodeName)&&-1!==t.className.indexOf("line-numbers")){var a,n=1+e.code.split("\n").length;lines=new Array(n),lines=lines.join("<span></span>"),a=document.createElement("span"),a.className="line-numbers-rows",a.innerHTML=lines,t.hasAttribute("data-start")&&(t.style.counterReset="linenumber "+(parseInt(t.getAttribute("data-start"),10)-1)),e.element.appendChild(a)}});var pageStatus={};pageStatus.naviActive=0,pageStatus.promptActive=0,pageStatus.modalActive=0,pageStatus.slideLocation=1,pageStatus.AlbumActive=!1;var styleVars={};styleVars.colorClasses=["CCmutedRed","CCmutedBlue","CCmutedGreen","CCmutedOrange","CCmutedPurple"],styleVars.colorValues=["#FF5E5E","#F3B6FA","#FFBE69","#61C758","#99E4F0"],$(document).ready(function(){console.log("Welcome to benghaem.com"),mainContainCacheVal=$(".mainContain"),naviContainCacheVal=$(".naviContain"),naviToggleCacheVal=$(".naviToggle"),mainContainCacheVal.css("min-height",$(window).height()-$(".footer").height()-85),naviContainCacheVal.css("left",Math.round(($(window).width()-naviContainCacheVal.outerWidth())/2)),$(".modalBlackout").click(function(){1!=pageStatus.promptActive&&closeModal(),0!=pageStatus.naviActive&&toggleNavigation(600)}),$(".naviToggle ul li").mouseenter(function(){color=$(this).data("color"),color=styleVars.colorValues[color-1],naviToggleCacheVal.css("background-color",color),naviToggleCacheVal.css("transition-duration","600ms")}),$(".naviToggle ul").mouseleave(function(){naviToggleCacheVal.removeAttr("style")}),$(".contactOpen").click(function(){createModal("contact","Feel free to contact me with work or questions at: <a href='mailto:contact@benghaem.com'>contact@benghaem.com</a>",getPageColor(),"text")}),$(".cssWindowDot:nth-child(1)").click(function(){$(this).parent().fadeTo(400,0)}),$(document).keydown(function(e){27===e.which&&closeModal(),37===e.which&&pageStatus.albumActive===!0&&albumModal.previous(),39===e.which&&pageStatus.albumActive===!0&&albumModal.next()})}),$(window).resize(function(){0!=pageStatus.naviActive&&naviContainCacheVal.css("top",Math.round(($(window).height()-naviContainCacheVal.outerHeight())/2)),0!=pageStatus.modalActive&&(resizeModalImage(.8*$(window).width(),.7*$(window).height()),centerModal()),naviContainCacheVal.css("left",Math.round($(window).width()-naviContainCacheVal.outerWidth())/2),mainContainCacheVal.css("min-height",$(window).height()-$(".footer").height()-95),showcaseSlideTo(1)});var albumModal=function(){function e(e,t){l=e,c=parseInt(t),$("img").each(function(){null!=$(this).data("album")&&(elementName=$(this).data("album"),l===elementName&&r.push($(this).attr("src")))}),s=r.length,o()}function t(){console.log(this)}function a(e){c=e,o()}function n(){c+=1,o()}function i(){c-=1,o()}function o(){c>s&&(c=1),0>=c&&(c=s),$(".modal").remove(),$(".modalHelper").append('<div class="modal modalImage"><div class="albumNav" onclick="albumModal.previous()">&lt;</div><img src="'+r[c-1]+'" alt="'+l+'" class="modalTrueImage"><div class="albumNav" onclick="albumModal.next()">&gt;</div></div>'),$(".modalTrueImage").load(function(){resizeModalImage(.8*$(window).width(),.7*$(window).height()),centerModal()}),openModal(),pageStatus.albumActive=!0}var r=[],s=null,l=null,c=null;return{createTag:e,createSib:t,changeTo:a,next:n,previous:i}}();