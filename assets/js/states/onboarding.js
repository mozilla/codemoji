(function (window, Cryptoloji, undefined) {
  'use strict'

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
        $('[slide-num="'+n+'"]').addClass("section-show")
        $('[slide-num="'+n+'"]').on("click", function(){
          Cryptoloji.stateman.go('onboarding.step'+(n+1))
        })

        if (n === 1) {
          if (_.indexOf(Cryptoloji.UI.svg_loaded, "assets/svg/slide01.svg") == -1) {
            Cryptoloji.stateman.on('svg:loaded', function(path) {
              if (path === "assets/svg/slide01.svg") {
                animate_onboarding1()
              }
            })
          }
          else {
            animate_onboarding1()
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

  function animate_onboarding1() {
    console.log('animate')
    var tl = new TimelineLite();
    //Set initial state
    tl.to($("#onboarding_slide_1_A1"), 0.0, {x: -200, y: -200.0})
    .to($("#onboarding_slide_1_A2"), 0.0, {x: -200, y: -200.0})
    .to($("#onboarding_slide_1_A3"), 0.0, {x: -200, y: -200.0})
    .to($("#onboarding_slide_1_A4"), 0.0, {x: -200, y: -200.0})
    .to($("#onboarding_slide_1_A5"), 0.0, {x: -200, y: -200.0})
    .to($("#onboarding_slide_1_A2"), 0.0, {x: -200, y: -200.0})
    .to($("#onboarding_slide_1_encrypted_B1"), 0.0, {y: -205})
    .to($("#onboarding_slide_1_encrypted_B2"), 0.0, {y: -205})
    .to($("#onboarding_slide_1_encrypted_B3"), 0.0, {y: -205})
    .to($("#onboarding_slide_1_encrypted_B4"), 0.0, {y: -205})
    .to($("#onboarding_slide_1_encrypted_B5"), 0.0, {y: -205})
    .to($("#onboarding_slide1_line_1"), 0.0, {y: -205})
    .to($("#onboarding_slide1_line_2"), 0.0, {y: -205})
    .to($("#onboarding_slide1_line_3"), 0.0, {y: -205})
    .to($("#onboarding_slide1_line_4"), 0.0, {y: -205})
    .to($("#onboarding_slide1_line_5"), 0.0, {y: -205})
    .to($("#onboarding_slide_1_text"), 0.0, {opacity: 0.0})

    //Animation
    tl.to($("#onboarding_slide_1_A1"), 0.25, {x: 0.0, y: 0.0})
    .to($("#onboarding_slide_1_A2"), 0.25, {x: 0.0, y: 0.0})
    .to($("#onboarding_slide_1_A4"), 0.25, {x: 0.0, y: 0.0})
    .to($("#onboarding_slide_1_A3"), 0.25, {x: 0.0, y: 0.0})
    .to($("#onboarding_slide_1_A5"), 0.25, {x: 0.0, y: 0.0})
    .to($("#onboarding_slide_1_A1"), 0.1, {scale: 1.5, rotation: 360, transformOrigin: "50% 50%"})
    .to($("#onboarding_slide_1_A1"), 0.1, {scale: 1.0, rotation: -360, transformOrigin: "50% 50%"})
    .to($("#onboarding_slide1_line_5"), 0.1, {y: 0.0})
    .to($("#onboarding_slide_1_encrypted_B1"), 0.1, {y: 0.0})
    .to($("#onboarding_slide_1_A2"), 0.1, {scale: 1.5, rotation: 360, transformOrigin: "50% 50%"})
    .to($("#onboarding_slide_1_A2"), 0.1, {scale: 1.0, rotation: -360, transformOrigin: "50% 50%"})
    .to($("#onboarding_slide1_line_4"), 0.1, {y: 0.0})
    .to($("#onboarding_slide_1_encrypted_B2"), 0.1, {y: 0.0})
    .to($("#onboarding_slide_1_A4"), 0.1, {scale: 1.5, rotation: 360, transformOrigin: "50% 50%"})
    .to($("#onboarding_slide_1_A4"), 0.1, {scale: 1.0, rotation: -360, transformOrigin: "50% 50%"})
    .to($("#onboarding_slide1_line_3"), 0.1, {y: 0.0})
    .to($("#onboarding_slide_1_encrypted_B3"), 0.1, {y: 0.0})
    .to($("#onboarding_slide_1_A3"), 0.1, {scale: 1.5, rotation: 360, transformOrigin: "50% 50%"})
    .to($("#onboarding_slide_1_A3"), 0.1, {scale: 1.0, rotation: -360, transformOrigin: "50% 50%"})
    .to($("#onboarding_slide1_line_2"), 0.1, {y: 0.0})
    .to($("#onboarding_slide_1_encrypted_B4"), 0.1, {y: 0.0})
    .to($("#onboarding_slide_1_A5"), 0.1, {scale: 1.5, rotation: 360, transformOrigin: "50% 50%"})
    .to($("#onboarding_slide_1_A5"), 0.1, {scale: 1.0, rotation: -360, transformOrigin: "50% 50%"})
    .to($("#onboarding_slide1_line_1"), 0.1, {y: 0.0})
    .to($("#onboarding_slide_1_encrypted_B5"), 0.1, {y: 0.0})
    .to($("#onboarding_slide_1_text"), 1.0, {opacity: 1.0})
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







