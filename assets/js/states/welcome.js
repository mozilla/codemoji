(function (window, Cryptoloji, undefined) {
  'use strict'
    
  

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
        $('#footer').transition({y:0, duration:1000, delay:750, easing:'easeInOutExpo'})
        $('#mainHeaderBig').transition({y:0, duration:1000, delay:500, easing:'easeInOutExpo'})

        LogoHeaderAnimation.enter('#welcome_header')

        if (Cryptoloji.visitor.alreadySeen()) {
          Cryptoloji.stateman.go('encrypt')
          return
        }

      },10)

    },
    leave: function () {

      LogoHeaderAnimation.exit('#welcome_header')

      $('#mainHeaderBig').transition({y:-300, duration:500, easing:'easeInOutExpo'})

      $('#body_landing').transition({opacity:0, duration:500, complete:function(){
        $(".section_welcome").removeClass("section-show")
      }})
      Cryptoloji.stateman.emit('footer:hide') 
      
    }
  }

})(window, window.Cryptoloji); 
 
