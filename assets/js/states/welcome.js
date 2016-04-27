(function (window, Cryptoloji, undefined) {
  'use strict'
    
  function triggerLogoAnimation () {

    TweenLite.set($("#animation1"),{display: 'block'})
    TweenLite.set($("#animation2"),{display: 'block'})
    TweenLite.set($("#animation1 > g"),{opacity: 0, scale: 1.6, rotation: Math.random() * 360, transformOrigin: 'center center'})
    TweenLite.set($("#animation2 > g"),{opacity: 0, scale: 1.6, rotation: Math.random() * 360, transformOrigin: 'center center'})
    TweenLite.set($("#animation1 > #start_o"),{opacity: 1, scale: 1})
    TweenLite.set($("#animation2 > #start_o"),{opacity: 1, scale: 1})

    _animate("#animation1 > g", .3, .8, 3)
    _animate("#animation2 > g", .3, .95, 3)

    function _animate (group, startTime, delay, elements) {
      function _reduceto (array, num) {
        var arr = array.toArray()
        var temp_o = arr.shift()
        var temp_f = arr.pop()
        if (arr.length > num) {
          // shuffle
          var j, x, i;
          for (i = arr.length; i; i -= 1) {
              j = Math.floor(Math.random() * i);
              x = arr[i - 1];
              arr[i - 1] = arr[j];
              arr[j] = x;
          }
          // get n elements
          arr = arr.splice(0, num)
        }
        // re add first and last elements
        arr.unshift(temp_o)
        arr.push(temp_f)
        return arr
      }

      group = _reduceto($(group), elements)
      $(group).each(function (d, elem) {
        TweenLite.to(elem, .3, {
          opacity: 1,
          delay: startTime + (d+1) * delay
        })
        TweenLite.to(elem, .8, {
          scale: 1,
          rotation: 0,
          delay: startTime + (d+1) * delay,
          ease: Elastic.easeInOut,
          onComplete: function () {
            if (elem !== _.last($(group))) {
              TweenLite.to(elem, .4, {
                scale: 0,
                ease: Expo.easeInOut
              })
            }
          }
        })
      })
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

      

      setTimeout(function(){
        $('#body_landing').transition({opacity:1, duration:250})
        $('#body_landing').children().each(function(i, e){
          $(e).transition({opacity:1, delay:i*125, duration:500})
        })
        $('#footer').transition({y:0, duration:1000, delay:750, easing:'easeInOutExpo'})
        $('#mainHeaderBig').transition({y:0, duration:1000, delay:500, easing:'easeInOutExpo'})

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
 
