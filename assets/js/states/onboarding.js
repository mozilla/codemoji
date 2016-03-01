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

  function animate_onboarding1_() {
    var tl = new TimelineLite({onComplete: function() {
      this.restart()
    }});
    var animation_duration = 0.5
    var animation_delay = 0.5

    //Set initial state
    //First encryption letters
    tl.to($("#onboarding_slide_1_encrypted_hello g"), 0.0, {y: -105, opacity: 0.0})
    //Second encryption letters
    .to($("#onboarding_slide_1_encrypted_hello_2 g"), 0.0, {y: -105, opacity: 0.0})
    //Third encryption letters
    .to($("#onboarding_slide_1_encrypted_hello_3 g"), 0.0, {y: -105, opacity: 0.0})
    tl.stop()

    for (var i=0; i<5; i++) {
      var element = $($("#onboarding_slide_1_encrypted_hello g")[0]).attr("id")
      console.log(element)
      tl.to($($("#onboarding_slide_1_encrypted_hello g")[i]), animation_duration, {x: 0, opacity: 1.0})
    }
    tl.play()
  }
  function animate_onboarding1() {
    var tl = new TimelineLite({onComplete: function() {
      this.restart()
    }});
    var animation_duration = 0.25
    var animation_delay = 0.5
    //Set initial state
    //First encryption letters
    tl.to($("#onboarding_slide_1_encrypted_hello g"), 0.0, {y: -60, opacity: 0.0})
    //Second encryption letters
    .to($("#onboarding_slide_1_encrypted_hello_2 g"), 0.0, {y: -60, opacity: 0.0})
    //Third encryption letters
    .to($("#onboarding_slide_1_encrypted_hello_3 g"), 0.0, {y: -60, opacity: 0.0})


    //Lines
    .to($("#onboarding_slide1_line_5"), 0.0, {x: -60, opacity: 0.0})
    .to($("#onboarding_slide1_line_4"), 0.0, {x: -60, opacity: 0.0})
    .to($("#onboarding_slide1_line_3"), 0.0, {x: -60, opacity: 0.0})
    .to($("#onboarding_slide1_line_2"), 0.0, {x: -60, opacity: 0.0})
    .to($("#onboarding_slide1_line_1"), 0.0, {x: -60, opacity: 0.0})


    //Animation 1
    .to($("#onboarding_slide1_line_5"), animation_duration, {x: 0, opacity: 1.0})
    .to($("#onboarding_slide_1_encrypted_B1"), animation_duration, {y: 0, opacity: 1.0})
    .to($("#onboarding_slide1_line_4"), animation_duration, {x: 0, opacity: 1.0})
    .to($("#onboarding_slide_1_encrypted_B2"), animation_duration, {y: 0, opacity: 1.0})
    .to($("#onboarding_slide1_line_3"), animation_duration, {x: 0, opacity: 1.0})
    .to($("#onboarding_slide_1_encrypted_B3"), animation_duration, {y: 0, opacity: 1.0})
    .to($("#onboarding_slide1_line_2"), animation_duration, {x: 0, opacity: 1.0})
    .to($("#onboarding_slide_1_encrypted_B4"), animation_duration, {y: 0, opacity: 1.0})
    .to($("#onboarding_slide1_line_1"), animation_duration, {x: 0, opacity: 1.0})
    .to($("#onboarding_slide_1_encrypted_B5"), animation_duration, {y: 0, opacity: 1.0})
    
    .to($("#onboarding_slide1_line_1"), animation_duration, {delay: animation_delay, x: 60, opacity: 0.0})
    .to($("#onboarding_slide_1_encrypted_B5"), animation_duration, {y: 60, opacity: 0.0})
    .to($("#onboarding_slide1_line_2"), animation_duration, {x: 60, opacity: 0.0})
    .to($("#onboarding_slide_1_encrypted_B4"), animation_duration, {y: 60, opacity: 0.0})
    .to($("#onboarding_slide1_line_3"), animation_duration, {x: 60, opacity: 0.0})
    .to($("#onboarding_slide_1_encrypted_B3"), animation_duration, {y: 60, opacity: 0.0})
    .to($("#onboarding_slide1_line_4"), animation_duration, {x: 60, opacity: 0.0})
    .to($("#onboarding_slide_1_encrypted_B2"), animation_duration, {y: 60, opacity: 0.0})
    .to($("#onboarding_slide1_line_5"), animation_duration, {x: 60, opacity: 0.0})
    .to($("#onboarding_slide_1_encrypted_B1"), animation_duration, {y: 60, opacity: 0.0})
    .to($("#onboarding_slide_1_encrypted_B1"), animation_duration, {delay: animation_delay, y: 60, opacity: 0.0})

    //Animation 2
    .to($("#onboarding_slide1_line_5"), animation_duration, {x: 0, opacity: 1.0})
    .to($("#onboarding_slide_1_encrypted_B1_2"), animation_duration, {y: 0, opacity: 1.0})
    .to($("#onboarding_slide1_line_4"), animation_duration, {x: 0, opacity: 1.0})
    .to($("#onboarding_slide_1_encrypted_B2_2"), animation_duration, {y: 0, opacity: 1.0})
    .to($("#onboarding_slide1_line_3"), animation_duration, {x: 0, opacity: 1.0})
    .to($("#onboarding_slide_1_encrypted_B3_2"), animation_duration, {y: 0, opacity: 1.0})
    .to($("#onboarding_slide1_line_2"), animation_duration, {x: 0, opacity: 1.0})
    .to($("#onboarding_slide_1_encrypted_B4_2"), animation_duration, {y: 0, opacity: 1.0})
    .to($("#onboarding_slide1_line_1"), animation_duration, {x: 0, opacity: 1.0})
    .to($("#onboarding_slide_1_encrypted_B5_2"), animation_duration, {y: 0, opacity: 1.0})
    
    .to($("#onboarding_slide1_line_1"), animation_duration, {delay: animation_delay, x: 60, opacity: 0.0})
    .to($("#onboarding_slide_1_encrypted_B5_2"), animation_duration, {y: 60, opacity: 0.0})
    .to($("#onboarding_slide1_line_2"), animation_duration, {x: 60, opacity: 0.0})
    .to($("#onboarding_slide_1_encrypted_B4_2"), animation_duration, {y: 60, opacity: 0.0})
    .to($("#onboarding_slide1_line_3"), animation_duration, {x: 60, opacity: 0.0})
    .to($("#onboarding_slide_1_encrypted_B3_2"), animation_duration, {y: 60, opacity: 0.0})
    .to($("#onboarding_slide1_line_4"), animation_duration, {x: 60, opacity: 0.0})
    .to($("#onboarding_slide_1_encrypted_B2_2"), animation_duration, {y: 60, opacity: 0.0})
    .to($("#onboarding_slide1_line_5"), animation_duration, {x: 60, opacity: 0.0})
    .to($("#onboarding_slide_1_encrypted_B1_2"), animation_duration, {y: 60, opacity: 0.0})
    .to($("#onboarding_slide_1_encrypted_B1_2"), animation_duration, {delay: animation_delay, y: 60, opacity: 0.0})

    //Animation 3
    .to($("#onboarding_slide1_line_5"), animation_duration, {x: 0, opacity: 1.0})
    .to($("#onboarding_slide_1_encrypted_B1_3"), animation_duration, {y: 0, opacity: 1.0})
    .to($("#onboarding_slide1_line_4"), animation_duration, {x: 0, opacity: 1.0})
    .to($("#onboarding_slide_1_encrypted_B2_3"), animation_duration, {y: 0, opacity: 1.0})
    .to($("#onboarding_slide1_line_3"), animation_duration, {x: 0, opacity: 1.0})
    .to($("#onboarding_slide_1_encrypted_B3_3"), animation_duration, {y: 0, opacity: 1.0})
    .to($("#onboarding_slide1_line_2"), animation_duration, {x: 0, opacity: 1.0})
    .to($("#onboarding_slide_1_encrypted_B4_3"), animation_duration, {y: 0, opacity: 1.0})
    .to($("#onboarding_slide1_line_1"), animation_duration, {x: 0, opacity: 1.0})
    .to($("#onboarding_slide_1_encrypted_B5_3"), animation_duration, {y: 0, opacity: 1.0})
    
    .to($("#onboarding_slide1_line_1"), animation_duration, {delay: animation_delay, x: 60, opacity: 0.0})
    .to($("#onboarding_slide_1_encrypted_B5_3"), animation_duration, {y: 60, opacity: 0.0})
    .to($("#onboarding_slide1_line_2"), animation_duration, {x: 60, opacity: 0.0})
    .to($("#onboarding_slide_1_encrypted_B4_3"), animation_duration, {y: 60, opacity: 0.0})
    .to($("#onboarding_slide1_line_3"), animation_duration, {x: 60, opacity: 0.0})
    .to($("#onboarding_slide_1_encrypted_B3_3"), animation_duration, {y: 60, opacity: 0.0})
    .to($("#onboarding_slide1_line_4"), animation_duration, {x: 60, opacity: 0.0})
    .to($("#onboarding_slide_1_encrypted_B2_3"), animation_duration, {y: 60, opacity: 0.0})
    .to($("#onboarding_slide1_line_5"), animation_duration, {x: 60, opacity: 0.0})
    .to($("#onboarding_slide_1_encrypted_B1_3"), animation_duration, {y: 60, opacity: 0.0})
    .to($("#onboarding_slide_1_encrypted_B1_3"), animation_duration, {delay: animation_delay, y: 60, opacity: 0.0})

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







