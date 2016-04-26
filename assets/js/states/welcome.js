(function (window, Cryptoloji, undefined) {
  'use strict'
    
  function triggerLogoAnimation () {

    TweenLite.set($("#animation1"),{display: 'block'})
    TweenLite.set($("#animation2"),{display: 'block'})
    TweenLite.set($("#animation1 > g"),{opacity: 0, scale:3, transformOrigin: 'center center'})
    TweenLite.set($("#animation2 > g"),{opacity: 0, scale:3, transformOrigin: 'center center'})

    var del = 2

    $("#animation1 > g").each(function(d){
        TweenLite.to($(this), .4, {
          scale: 1, opacity:1, 
          transformOrigin: 'center center',
          delay: del + d*1.2
        })
        
        if(d + 1 < $("#animation1 > g").length){
          TweenLite.to($(this), .3, {
            opacity:0, 
            delay: del + d*1.2 + 1
          })
        }
    })

    $("#animation2 > g").each(function(d){
        TweenLite.to($(this), .4, {
          scale: 1, opacity:1, 
          transformOrigin: 'center center',
          delay: del + d*1.4
        })
        
        if(d + 1 < $("#animation1 > g").length){
          TweenLite.to($(this), .3, {
            opacity:0, 
            delay: del + d*1.4 + 1
          })
        }
    })

    
  }

  ////////////////////////////////////////////////////////////

  Cryptoloji.states.welcome = {
    enter: function () {

      Cryptoloji.stateman.emit('header:hide')
      Cryptoloji.stateman.emit('footer:show') 

      $(".section_welcome").addClass("section-show")

      $('#mainHeaderBig').css({y:-300})
      $('#footer').css({y:200})
      $('#body_landing').children().each(function(i, e){
        $(e).css({opacity:0})
      })

      

      setTimeout(function(){
        $('#body_landing').transition({opacity:1, duration:250})
            $('#body_landing').children().each(function(i, e){
              $(e).transition({opacity:1, delay:i*125, duration:500})
            })
            $('#mainHeaderBig').transition({y:0, duration:1000, delay:500, easing:'easeInOutExpo'})
            $('#footer').transition({y:0, duration:1000, delay:750, easing:'easeInOutExpo'})

            triggerLogoAnimation()
      },0)

    },
    leave: function () {

      $('#mainHeaderBig').transition({y:-300, duration:500, easing:'easeInOutExpo'})

      $('#body_landing').transition({opacity:0, duration:500, complete:function(){
        $(".section_welcome").removeClass("section-show")
      }})
      Cryptoloji.stateman.emit('footer:hide') 
      
    }
  }

})(window, window.Cryptoloji); 
 
