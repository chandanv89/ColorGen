
/* colourBrightness.js by @jamiebrittain */
(function(e){
   e.fn.colourBrightness=function(){
      var e,t,n,r,i=this.css("background-color");
      if(i.match(/^rgb/)){
         i=i.match(/rgb\(([^)]+)\)/)[1];
         i=i.split(/ *, */).map(Number);
         e=i[0];
         t=i[1];
         n=i[2]
      }else if("#"==i[0]&&7==i.length){
         e=parseInt(i.slice(1,3),16);
         t=parseInt(i.slice(3,5),16);
         n=parseInt(i.slice(5,7),16)
      }else if("#"==i[0]&&4==i.length){
         e=parseInt(i[1]+i[1],16);
         t=parseInt(i[2]+i[2],16);
         n=parseInt(i[3]+i[3],16)
      }
      r=(e*299+t*587+n*114)/1e3;
      r<125 ? this.removeClass("light").addClass("dark") : this.removeClass("dark").addClass("light")
   }
})(jQuery);

/* selectText.js by @jamiebrittain */
!function(e){
   e.fn.selectText=function(){
      var e=this[0];
      if(document.body.createTextRange){
         var t=document.body.createTextRange();
         t.moveToElementText(e),t.select()
      }else if(window.getSelection){
         var n=window.getSelection(),
         t=document.createRange();
         t.selectNodeContents(e),
         n.removeAllRanges(),
         n.addRange(t)
      }
   }
}(jQuery);

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

window.onload = function(){
   document.body.style.overflow = "hidden";
   $("body").css('height', $(window).height()).css('width', $(window).width());
   
   $("body").on('keypress', function(e){
      if("32" == e.keyCode){
         var color = generateColor();
         updateColor(color);
      }
   });

   $("#color").on("click", function(e){
      $(this).selectText();
   });
}