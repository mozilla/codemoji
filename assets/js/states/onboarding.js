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
    var tl = new TimelineLite({onComplete: function() {
      this.restart()
    }});

    var animation_duration = 0.1
    var animation_delay = 0.8
    //Set initial state
    //First encryption letters
    tl.to($("#onboarding_slide_1_encrypted_hello g"), 0.0, {y: -60, opacity: 0.0})
    //Second encryption letters
    .to($("#onboarding_slide_1_encrypted_hello_2 g"), 0.0, {y: -60, opacity: 0.0})
    //Third encryption letters
    .to($("#onboarding_slide_1_encrypted_hello_3 g"), 0.0, {y: 0, opacity: 1.0})
    //Third encryption letters bis
    .to($("#onboarding_slide_1_encrypted_hello_4 g"), 0.0, {y: -60, opacity: 0.0})


    //Animation 1
    .to($("#onboarding_slide_1_encrypted_B1"), animation_duration, {y: 0, opacity: 1.0})
    .to($("#onboarding_slide_1_encrypted_B1_3"), animation_duration, {y: 60, opacity: 0.0})
    .to($("#onboarding_slide_1_encrypted_B2"), animation_duration, {y: 0, opacity: 1.0})
    .to($("#onboarding_slide_1_encrypted_B2_3"), animation_duration, {y: 60, opacity: 0.0})
    .to($("#onboarding_slide_1_encrypted_B3"), animation_duration, {y: 0, opacity: 1.0})
    .to($("#onboarding_slide_1_encrypted_B3_3"), animation_duration, {y: 60, opacity: 0.0})
    .to($("#onboarding_slide_1_encrypted_B4"), animation_duration, {y: 0, opacity: 1.0})
    .to($("#onboarding_slide_1_encrypted_B4_3"), animation_duration, {y: 60, opacity: 0.0})
    .to($("#onboarding_slide_1_encrypted_B5"), animation_duration, {y: 0, opacity: 1.0})
    .to($("#onboarding_slide_1_encrypted_B5_3"), animation_duration, {y: 60, opacity: 0.0})
    
    .to($("#onboarding_slide_1_encrypted_B1_2"), animation_duration, {delay: animation_delay , y: 0, opacity: 1.0})
    .to($("#onboarding_slide_1_encrypted_B1"), animation_duration, {y: 60, opacity: 0.0})
    .to($("#onboarding_slide_1_encrypted_B2_2"), animation_duration, {y: 0, opacity: 1.0})
    .to($("#onboarding_slide_1_encrypted_B2"), animation_duration, {y: 60, opacity: 0.0})
    .to($("#onboarding_slide_1_encrypted_B3_2"), animation_duration, {y: 0, opacity: 1.0})
    .to($("#onboarding_slide_1_encrypted_B3"), animation_duration, {y: 60, opacity: 0.0})
    .to($("#onboarding_slide_1_encrypted_B4_2"), animation_duration, {y: 0, opacity: 1.0})
    .to($("#onboarding_slide_1_encrypted_B4"), animation_duration, {y: 60, opacity: 0.0})
    .to($("#onboarding_slide_1_encrypted_B5_2"), animation_duration, {y: 0, opacity: 1.0})
    .to($("#onboarding_slide_1_encrypted_B5"), animation_duration, {y: 60, opacity: 0.0})

    .to($("#onboarding_slide_1_encrypted_B1_4"), animation_duration, {delay: animation_delay , y: 0, opacity: 1.0})
    .to($("#onboarding_slide_1_encrypted_B1_2"), animation_duration, {y: 60, opacity: 0.0})
    .to($("#onboarding_slide_1_encrypted_B2_4"), animation_duration, {y: 0, opacity: 1.0})
    .to($("#onboarding_slide_1_encrypted_B2_2"), animation_duration, {y: 60, opacity: 0.0})
    .to($("#onboarding_slide_1_encrypted_B3_4"), animation_duration, {y: 0, opacity: 1.0})
    .to($("#onboarding_slide_1_encrypted_B3_2"), animation_duration, {y: 60, opacity: 0.0})
    .to($("#onboarding_slide_1_encrypted_B4_4"), animation_duration, {y: 0, opacity: 1.0})
    .to($("#onboarding_slide_1_encrypted_B4_2"), animation_duration, {y: 60, opacity: 0.0})
    .to($("#onboarding_slide_1_encrypted_B5_4"), animation_duration, {y: 0, opacity: 1.0})
    .to($("#onboarding_slide_1_encrypted_B5_2"), animation_duration, {y: 60, opacity: 0.0})
    //Set a delay before looping
    .to($("#onboarding_slide_1_encrypted_hello_4 g"), 0.0, {delay: animation_delay, y: -60, opacity: 0.0})

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







