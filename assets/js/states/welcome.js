(function (window, Cryptoloji, undefined) {
  'use strict'
    
  function triggerLogoAnimation () {
    TweenLite.set($("#final_emoji_1"),{opacity: 0})
    TweenLite.set($("#final_emoji_2"),{opacity: 0})

    TweenLite.set($("#animation1"),{display: 'block'})
    TweenLite.set($("#animation2"),{display: 'block'})
    TweenLite.set($("#animation1 > g"),{opacity: 0})
    TweenLite.set($("#animation2 > g"),{opacity: 0})

    $("#animation1 > g").each(function(d){
        popEmoji(this,d)
    })
    $("#animation2 > g").each(function(d){
        popEmoji(this,d)
    })

    function popEmoji(el,i) {
      var speed = .8
      var general_delay = 1.5
      TweenLite.from(el, speed/4, {
        scale: 2, 
        transformOrigin: 'center center',
        delay: i * speed + general_delay + speed/4
      })
      TweenLite.to(el, speed/4, {
        opacity: 1, 
        delay: i * speed + general_delay
      })
      if(i + 1 < $("#animation1 > g").length){
        TweenLite.to(el, speed/4, {
          opacity: 0, 
          delay: i * speed + general_delay + 3 * speed/4
        })
      }
    }
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

      triggerLogoAnimation()

      setTimeout(function(){
        $('#body_landing').transition({opacity:1, duration:250})
            $('#body_landing').children().each(function(i, e){
              $(e).transition({opacity:1, delay:i*125, duration:500})
            })
            $('#mainHeaderBig').transition({y:0, duration:1000, delay:500, easing:'easeInOutExpo'})
            $('#footer').transition({y:0, duration:1000, delay:750, easing:'easeInOutExpo'})
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
 
