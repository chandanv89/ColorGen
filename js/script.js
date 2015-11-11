
/* colourBrightness.js by @jamiebrittain | minified on http://javascript-minifier.com */
!function(s){s.fn.colourBrightness=function(){var s,a,e,r,t=this.css("background-color");t.match(/^rgb/)?(t=t.match(/rgb\(([^)]+)\)/)[1],t=t.split(/ *, */).map(Number),s=t[0],a=t[1],e=t[2]):"#"==t[0]&&7==t.length?(s=parseInt(t.slice(1,3),16),a=parseInt(t.slice(3,5),16),e=parseInt(t.slice(5,7),16)):"#"==t[0]&&4==t.length&&(s=parseInt(t[1]+t[1],16),a=parseInt(t[2]+t[2],16),e=parseInt(t[3]+t[3],16)),r=(299*s+587*a+114*e)/1e3,125>r?this.removeClass("light").addClass("dark"):this.removeClass("dark").addClass("light")}}(jQuery);

/* selectText.js by @jamiebrittain | minified on http://jscompress.com */
!function(e){e.fn.selectText=function(){var e=this[0];if(document.body.createTextRange){var t=document.body.createTextRange();t.moveToElementText(e),t.select()}else if(window.getSelection){var n=window.getSelection(),t=document.createRange();t.selectNodeContents(e),n.removeAllRanges(),n.addRange(t)}}}(jQuery);

var generateColor = function(){
   var hexChars = "0123456789ABCDEF";
   var hexStr = "#";
      
   for(var i=0; i<6; i++)
      hexStr += hexChars[Math.ceil(Math.random()*1000)%16];

   return hexStr;
}

var updateUrl = function(color){
   var url = window.location.href || "";
   
   if(url.search(/#/) != '-1')
      url = url.replace(url.substr(url.search(/#/),url.length), color);
   //window.location.replace('.html', 'index.html/' + url);
}

var updateColor = function(color){
   $("#color p").html(color).css('fontFamily', 'Consolas, Monospace').css('fontSize', '48px');
   $("#canvas").css('backgroundColor',color).colourBrightness();
      
   updateUrl(color);
}

var init = function(){
   document.body.style.overflow = "hidden";
   $("body").css('height', $(window).height()).css('width', $(window).width());
   $("#canvas").css('backgroundColor',generateColor()).colourBrightness();
}

window.onload = function(){
   var color = "";
   init();
   
   $("body").on('keypress', function(e){
      if(e.keyCode){
         color = generateColor();
         updateColor(color);
      }
   });

   $("#color").on("click", function(e){
      $(this).selectText();
   });
}