(function (window, Cryptoloji, undefined) {
  'use strict'

  Cryptoloji.states.onboarding = {}
  Cryptoloji.states.onboarding.root = {
    enter: function () {
      Cryptoloji.stateman.go('onboarding.step1')
      Cryptoloji.stateman.emit('header:show')
    }
  }

  var svg_elements = []
  svg_elements.push("#onboarding_slide_1_encrypted_hello>g")
  svg_elements.push("#onboarding_slide_1_encrypted_hello_2>g")
  svg_elements.push("#onboarding_slide_1_encrypted_hello_3>g")
  svg_elements.push("#onboarding_slide_1_encrypted_hello_4>g")

  function next_slide(n){
    return {
      enter: function () {
        $('[slide-num="'+n+'"]').addClass("section-show")
        $('[slide-num="'+n+'"]').on("click", function(){
          Cryptoloji.stateman.go('onboarding.step'+(n+1))
        })

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
      },
      leave: function () {
        $('[slide-num="'+n+'"]').removeClass("section-show")
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







