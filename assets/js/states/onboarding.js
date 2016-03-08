(function (window, Cryptoloji, undefined) {
  'use strict'
  var timeline = new TimelineLite({onComplete: function() {
    //loop the animation
    //this.restart()
  }});
  var chosen_key = 0;
  
  // 
  // go directly to step 1
  // 
  Cryptoloji.states.onboarding = {}
  Cryptoloji.states.onboarding.root = {
    enter: function () {
      Cryptoloji.stateman.go('onboarding.step4')
    }
  }

  // function
  // 
  
  function slideLogic (n) {

      Cryptoloji.UI.paginationLogic(n)
      switch (n) {

        case 1:
            animate_slide1()
          break

        case 2:
            animate_slide2()
          break

        case 3:
            animate_slide3()
          break
          
        case 4:
          animate_slide_4()
          break

        case 5:
          animate_slide_5()
          break

        case 6:
          animate_slide_6()
          break

        case 7:
          animate_slide_7()
          break
      }
  }

  function next_slide(n){
    return {
      enter: function () {
        // display cross-slide elements
        $('.section_onboarding_wrapper').addClass("section-show")

        // display current slide content
        $('[slide-num="'+n+'"]').addClass("section-show")

        // display header
        Cryptoloji.stateman.emit('header:show')

        // load next slide button logic
        $('#next_button_onboarding').on("click", function(){
          Cryptoloji.stateman.go('onboarding.step'+(n+1))
        })
        
        slideLogic (n)
      },
      leave: function () {
        $('[slide-num="'+n+'"]').removeClass("section-show")
        $('.section_onboarding_wrapper').removeClass("section-show")
      }
    }
  }

  function to_encrypt(n){
    return {
      enter: function () {

        TweenLite.set($('.svg_wrapper_pagination'), {opacity: 0})
        TweenLite.set($('.onboarding_skip_button'), {opacity: 0})
        TweenLite.to($('#next_button_onboarding'), 0.5, {delay: 1, opacity: 1})
        $('[slide-num="'+n+'"]').addClass("section-show")
        $('#next_button_onboarding').text('Go for it!').on("click", function(){
          TweenLite.to($('[slide-num="'+n+'"]'), 1, {y: "-100%", onComplete: function() {
            TweenLite.to($('#next_button_onboarding'), 0, {opacity: 0})
            Cryptoloji.stateman.go("encrypt")
          }})
          
        })
      },
      leave: function () {
        $('[slide-num="'+n+'"]').removeClass("section-show")
        $('.section_onboarding_wrapper').removeClass("section-show")
        Cryptoloji.stateman.emit('header:hide')
      }
    }
  }

  function animate_slide1() {
    var svg_elements = []    
    _.times(4, function(i){
      svg_elements.push("#onboarding_slide_1_encrypted_hello_" + (i+1) + ">g")
    })  
    Cryptoloji.UI.animate_onboarding(svg_elements)
    timeline.clear()
    timeline.set($('#onboarding_slide_1_text'), {opacity: 0})
    timeline.set($('#next_button_onboarding'), {opacity: 0})
    timeline.to($('#onboarding_slide_1_text'), .5, {delay: 4.8, opacity: 1})
    .to($('#next_button_onboarding'), 1, {opacity: 1})
  }

  function animate_slide2() {
    var svg_elements = []    
    _.times(4, function(i){
      svg_elements.push("#onboarding_slide_2_encrypted_hello_" + (i+1) + ">g")
    })         
    Cryptoloji.UI.animate_onboarding(svg_elements)
    timeline.clear()
    timeline.set($('#onboarding_slide_2_text'), {opacity: 0})
    timeline.set($('#next_button_onboarding'), {opacity: 0})
    timeline.to($('#onboarding_slide_2_text'), .5, {delay: 2.8, opacity: 1})
    .to($('#next_button_onboarding'), 1, {opacity: 1})
  }

  function animate_slide3() {
    timeline.clear()
    timeline.set($('#next_button_onboarding'), {opacity: 0})
    timeline.set($('#onboarding_slide_3_plain_text > g'), {opacity: 0.0})
    timeline.set($('#onboarding_slide_3_plain_text_bg'), {y: -300})
    timeline.set($('#onboarding_slide_3_text'), {opacity: 0})

    timeline.to($("#onboarding_slide_3_plain_text_bg"), 1, {y: 0})
    $("#onboarding_slide_3_plain_text > g").each(function(i){
    timeline.to($(this), .1, {delay: 0.05 , opacity: 1.0})
    })
    timeline.to($('#onboarding_slide_3_text'), 0.5, {opacity: 1})
    .to($('#next_button_onboarding'), 0.5, {opacity: 1})
  }

  function animate_slide_4() {
    timeline.clear()
    timeline.set($('#onboarding_slide_4_plain_text > g'), {opacity: 1})
    timeline.set($('#onboarding_slide_4_emoji_1 > g'), {opacity: 0})
    timeline.set($('#onboarding_slide_4_emoji_2 > g'), {opacity: 0})
    timeline.set($('#onboarding_slide_4_emoji_3 > g'), {opacity: 0})
    timeline.set($('#onboarding_slide_4_emoji_selector'), {opacity: 0})
    timeline.set($('#onboarding_slide_4_encrypted_emoji_1 > g'), {opacity: 0})
    timeline.set($('#onboarding_slide_4_encrypted_emoji_2 > g'), {opacity: 0})
    timeline.set($('#onboarding_slide_4_encrypted_emoji_3 > g'), {opacity: 0})
    timeline.set($('#onboarding_slide_4_text_tutor'), {opacity: 0})
    timeline.set($('#next_button_onboarding'), {opacity: 0})
    var num_of_interaction = 0

    //Playground on click events
    $('#onboarding_slide_4_emoji_1').on('click', function() {
      timeline.to($('#onboarding_slide_4_emoji_selector'), 0.5, {x: '-95rem', onComplete: function() {
        scrumbletext('#onboarding_slide_4_encrypted_emoji_1 > g', 0.0)
      }})
      
      chosen_key = 0
    })

    $('#onboarding_slide_4_emoji_2').on('click', function() {
     timeline.to($('#onboarding_slide_4_emoji_selector'), 0.5, {x: 0, onComplete: function() {
        scrumbletext('#onboarding_slide_4_encrypted_emoji_2 > g', 0.0)
      }})
      chosen_key = 1
    })

    $('#onboarding_slide_4_emoji_3').on('click', function() {
      timeline.to($('#onboarding_slide_4_emoji_selector'), 0.5, {x: '95rem', onComplete: function() {
        scrumbletext('#onboarding_slide_4_encrypted_emoji_3 > g', 0.0)
      }})
      chosen_key = 2
    })
    
    //Animation
    timeline.to('#onboarding_slide_4_emoji_1 > g', 1, {opacity: 1})
    .to($('#onboarding_slide_4_emoji_2 > g'), 1, {opacity: 1})
    .to($('#onboarding_slide_4_emoji_3 > g'), 1, {opacity: 1})
    .to($('#onboarding_slide_4_emoji_selector'), 1, {opacity: 1})

    .to($('#onboarding_slide_4_emoji_selector'), 0.5, {x: '-95rem', onComplete: function() {
      scrumbletext('#onboarding_slide_4_encrypted_emoji_1 > g', 0.0)
    }})
    .to($('#onboarding_slide_4_emoji_selector'), 0.5, {delay: 2, x: "95rem", onComplete: function() {
      scrumbletext('#onboarding_slide_4_encrypted_emoji_3 > g', 1.0)
    }})
    .to($('#onboarding_slide_4_emoji_selector'), 0.5, {delay: 3, x: 0, onComplete: function() {
      scrumbletext('#onboarding_slide_4_encrypted_emoji_2 > g', 1.0)
    }})
    .to($('#onboarding_slide_4_text_tutor'), 0.5, {opacity: 1})
    .to($('#next_button_onboarding'), 0.5, {opacity: 1})

    // $('#onboarding_slide_4_plain_text > g').each(function(i) {
    //   timeline.to($(this), 0.5, {opacity: 0})
    // })
  }

  function scrumbletext(emoji_group, start_delay) {
    TweenLite.set($('#onboarding_slide_4_plain_text > g'), {opacity: 1})
    TweenLite.set($('#onboarding_slide_4_encrypted_emoji_1 > g'), {opacity: 0})
    TweenLite.set($('#onboarding_slide_4_encrypted_emoji_2 > g'), {opacity: 0})
    TweenLite.set($('#onboarding_slide_4_encrypted_emoji_3 > g'), {opacity: 0})
    $($(emoji_group).get().reverse()).each(function(i) {
     TweenLite.to($(this), 0.5, {delay: start_delay + i * 0.1,  opacity: 1})
    })
    $('#onboarding_slide_4_plain_text > g').each(function(i) {
      TweenLite.to($(this), 0.5, {delay: start_delay + i * 0.1,  opacity: 0})
    })
  }

  function animate_slide_5() {
    timeline.clear()
    timeline.set($('#next_button_onboarding'), {opacity: 0})
    timeline.set($('#onboarding_slide_5_text'), {opacity: 0})
    timeline.set($('#onboarding_slide_5_plain_text'), {opacity: 0})
    timeline.set($('#onboarding_slide_5_encrypted_emoji_1'), {opacity: 0})
    timeline.set($('#onboarding_slide_5_encrypted_emoji_2'), {opacity: 0})
    timeline.set($('#onboarding_slide_5_encrypted_emoji_3'), {opacity: 0})
    timeline.set($('#onboarding_slide_5_delivered_text'), {y: 100, opacity: 0})
    timeline.set($('#slide_5_bubble_white_text_bg'), {y: 80, opacity: 0})
    timeline.set($('#slide_5_bubble_white_text'), {opacity: 0})
    timeline.set($('#slide_5_bubble_white_dots_bg'), {opacity: 0})

    //Set the visible encrypted text following what the user chose on slide 4
    switch(chosen_key) {
      case 0:
          timeline.set($('#onboarding_slide_5_encrypted_emoji_1'), {opacity: 1})
        break

      case 1:
        timeline.set($('#onboarding_slide_5_encrypted_emoji_2'), {opacity: 1})
        break

      case 2:
        timeline.set($('#onboarding_slide_5_encrypted_emoji_3'), {opacity: 1})
        break
    }
    
    timeline.to($('#onboarding_slide_5_delivered_text'), 0.5, {delay: 0.5, y: 0, opacity: 1})
    .to($('#slide_5_bubble_white_dots_bg'), 0.5, {delay: 0.5, y: 0, opacity: 1})
    .to($('#slide_5_bubble_white_dots > circle')[0], 0.05, {y: -5})
    .to($('#slide_5_bubble_white_dots > circle')[1], 0.05, {y: -5})
    .to($('#slide_5_bubble_white_dots > circle')[2], 0.05, {y: -5})
    .to($('#slide_5_bubble_white_dots > circle')[0], 0.05, {y: 0})
    .to($('#slide_5_bubble_white_dots > circle')[1], 0.05, {y: 0})
    .to($('#slide_5_bubble_white_dots > circle')[2], 0.05, {y: 0})
    .to($('#slide_5_bubble_white_dots > circle')[0], 0.05, {y: -5})
    .to($('#slide_5_bubble_white_dots > circle')[1], 0.05, {y: -5})
    .to($('#slide_5_bubble_white_dots > circle')[2], 0.05, {y: -5})
    .to($('#slide_5_bubble_white_dots > circle')[0], 0.05, {y: 0})
    .to($('#slide_5_bubble_white_dots > circle')[1], 0.05, {y: 0})
    .to($('#slide_5_bubble_white_dots > circle')[2], 0.05, {y: 0})
    .to($('#slide_5_bubble_white_dots_bg'), 0.1, {opacity: 0})
    .to($('#slide_5_bubble_white_dots'), 0.1, {y: 0, opacity: 0})
    .to($('#slide_5_bubble_white_text_bg'), 0.5, {y: 0, opacity: 1})
    .to($('#slide_5_bubble_white_text'), 0.5, {opacity: 1})
    .to($('#onboarding_slide_5_text'), 0.5, {opacity: 1})
    .to($('#next_button_onboarding'), 0.5, {opacity: 1})
  }

  function animate_slide_6() {
    timeline.clear()
    timeline.set($('#next_button_onboarding'), {opacity: 0})
    timeline.set($('#onboarding_slide_6_plain_text'), {opacity: 0})
    timeline.set($('#onboarding_slide_6_text'), {opacity: 0})
    timeline.set($('#onboarding_slide_6_encrypted_emoji_1'), {opacity: 0})
    timeline.set($('#onboarding_slide_6_encrypted_emoji_2'), {opacity: 0})
    timeline.set($('#onboarding_slide_6_encrypted_emoji_3'), {opacity: 0})
    timeline.set($('#onboarding_slide_6_delivered_text'), {opacity: 0})
    timeline.set($('#onboarding_slide_6_mais_bubble'), {y: 100, opacity: 0})
    timeline.set($('#onboarding_slide_6_mais'), {opacity: 0})
    timeline.set($('#onboarding_slide_6_smile'), {y: 100, opacity: 0})
    timeline.set($('#onboarding_slide_6_smile_content'), {opacity: 0})

    //Set the visible encrypted text following what the user chose on slide 4
    switch(chosen_key) {
      case 0:
          timeline.set($('#onboarding_slide_6_encrypted_emoji_1'), {opacity: 1})
        break

      case 1:
        timeline.set($('#onboarding_slide_6_encrypted_emoji_2'), {opacity: 1})
        break

      case 2:
        timeline.set($('#onboarding_slide_6_encrypted_emoji_3'), {opacity: 1})
        break
    }

    timeline.to($('#onboarding_slide_6_mais_bubble'), 0.5, {delay: 0.5, y: 0, opacity: 1})
    .to($('#onboarding_slide_6_mais'), 0.5, {opacity: 1})
    .to($('#onboarding_slide_6_delivered_text'), 0, {opacity: 1})
    .to($('#onboarding_slide_6_smile'), 0.5, {y: 0, opacity: 1})
    .to($('#onboarding_slide_6_smile_content'), 0.5, {opacity: 1})
    .to($('#onboarding_slide_6_graphic'), 0.5, {delay: 0.5, y: -130})
    .to($('#onboarding_slide_6_text'), 0.5, {opacity: 1})
    .to($('#next_button_onboarding'), 0.5, {opacity: 1, onComplete: function() {
    }})
  }

  Cryptoloji.states.onboarding.step1 = next_slide(1)
  Cryptoloji.states.onboarding.step2 = next_slide(2)
  Cryptoloji.states.onboarding.step3 = next_slide(3)
  Cryptoloji.states.onboarding.step4 = next_slide(4)
  Cryptoloji.states.onboarding.step5 = next_slide(5)
  Cryptoloji.states.onboarding.step6 = next_slide(6)
  Cryptoloji.states.onboarding.step7 = to_encrypt(7)
  // Cryptoloji.states.onboarding.step7 = next_slide(7)
  // Cryptoloji.states.onboarding.step8 = to_encrypt(8)


})(window, window.Cryptoloji); 







