(function (window, Cryptoloji, undefined) {
  'use strict'
  var timeline = new TimelineLite({onComplete: function() {
    //loop the animation
    this.restart()
  }});
  
  Cryptoloji.states.onboarding = {}
  Cryptoloji.states.onboarding.root = {
    enter: function () {
      Cryptoloji.stateman.go('onboarding.step1')
      Cryptoloji.stateman.emit('header:show')
    }
  }

  function next_slide(n){
    return {
      enter: function () {

        if(n != 1){
          Cryptoloji.UI.slideLeftNext($('[slide-num="'+n+'"]'),.5)
        } else {
          $('[slide-num="'+n+'"]').addClass("section-show")
        }
        $('[slide-num="'+n+'"]').on("click", function(){
          Cryptoloji.stateman.go('onboarding.step'+(n+1))
        })
        Cryptoloji.UI.paginationLogic(n)

        if (n === 1) {
          //Set the array to be passed to the animation function with the name of the four groups we want to animate
          var svg_elements = []
          svg_elements.push("#onboarding_slide_1_encrypted_hello g")
          svg_elements.push("#onboarding_slide_1_encrypted_hello_2 g")
          svg_elements.push("#onboarding_slide_1_encrypted_hello_3 g")
          svg_elements.push("#onboarding_slide_1_encrypted_hello_4 g")
          if (_.indexOf(Cryptoloji.UI.svg_loaded, "assets/svg/slide01.svg") == -1) {
            Cryptoloji.stateman.on('svg:loaded', function(path) {
              if (path === "assets/svg/slide01.svg") {
                Cryptoloji.UI.animate_onboarding(svg_elements)
              }
            })
          }
          else {
            Cryptoloji.UI.animate_onboarding(svg_elements)
          }
        }

        if (n === 2) {
          //Set the array to be passed to the animation function with the name of the four groups we want to animate
          var svg_elements = []
          svg_elements.push("#onboarding_slide_2_encrypted_hello>g")
          svg_elements.push("#onboarding_slide_2_encrypted_hello_2>g")
          svg_elements.push("#onboarding_slide_2_encrypted_hello_3>g")
          svg_elements.push("#onboarding_slide_2_encrypted_hello_4>g")
          if (_.indexOf(Cryptoloji.UI.svg_loaded, "assets/svg/slide02.svg") == -1) {
            Cryptoloji.stateman.on('svg:loaded', function(path) {
              if (path === "assets/svg/slide02.svg") {
                Cryptoloji.UI.animate_onboarding(svg_elements)
              }
            })
          }
          else {
            Cryptoloji.UI.animate_onboarding(svg_elements)
          }
        }

        if (n === 3) {
          timeline.clear()
          $('#slide_4_plain_text > path').each(function(i) {
            TweenLite.set($('#slide_4_plain_text > path')[i], {opacity: 0.0})
          })

          timeline.to($("#slide_4_plain_text > path")[0], 0.1, {opacity: 1.0})
          timeline.to($("#slide_4_plain_text > path")[1], 0.1, {opacity: 1.0})
          timeline.to($("#slide_4_plain_text > path")[2], 0.1, {opacity: 1.0})

        }

        if (n === 4) {
          timeline.clear()
          timeline.to($("#slide_4_emoji_2"), 0.3, {opacity: 0.2})
          timeline.to($("#slide_4_emoji_2"), 0.3, {opacity: 1.0})
          //timeline.to($("#slide_4_emoji_2"), 1, {scale: 1.5})
        }

        if (n === 5) {
          timeline.clear()
          timeline.to($("#slide_5_emoji_selector"), 1.5, {delay: 1, x: "-73", transformOrigin:'50% 50%'})
          timeline.to($("#slide_5_emoji_selector"), 0.0, {delay: 1, x: "77", transformOrigin:'50% 50%'})
          timeline.to($("#slide_5_emoji_selector"), 1.5, {delay: 1, x: "0rem", transformOrigin:'50% 50%'})
        }
      },
      leave: function () {
        // $('[slide-num="'+n+'"]').removeClass("section-show")
        
        Cryptoloji.UI.slideLeft($('[slide-num="'+n+'"]'),.5)
      }
    }
  }
  function to_encrypt(n){
    return {
      enter: function () {
        $('[slide-num="'+n+'"]').addClass("section-show")
        $('[slide-num="'+n+'"]').on("click", function(){
          Cryptoloji.stateman.go("encrypt")
        })
      },
      leave: function () {
        $('[slide-num="'+n+'"]').removeClass("section-show")
        Cryptoloji.stateman.emit('header:hide')
      }
    }
  }

  Cryptoloji.states.onboarding.step1 = next_slide(1)
  Cryptoloji.states.onboarding.step2 = next_slide(2)
  Cryptoloji.states.onboarding.step3 = next_slide(3)
  Cryptoloji.states.onboarding.step4 = next_slide(4)
  Cryptoloji.states.onboarding.step5 = next_slide(5)
  Cryptoloji.states.onboarding.step6 = next_slide(6)
  Cryptoloji.states.onboarding.step7 = next_slide(7)
  Cryptoloji.states.onboarding.step8 = to_encrypt(8)


})(window, window.Cryptoloji); 







