(function (window, Cryptoloji, undefined) {
  'use strict'
  var timeline = new TimelineLite({onComplete: function() {
    //loop the animation
    //this.restart()
  }});
  
  // 
  // go directly to step 1
  // 
  Cryptoloji.states.onboarding = {}
  Cryptoloji.states.onboarding.root = {
    enter: function () {
      Cryptoloji.stateman.go('onboarding.step1')
    }
  }

  // function
  // 
  
  function slideLogic (n) {
      Cryptoloji.UI.paginationLogic(n)
      switch (n) {
        case 1:
              var svg_elements = []    
              _.times(4, function(i){
                svg_elements.push("#onboarding_slide_1_encrypted_hello_" + (i+1) + ">g")
              })     
              console.log("SVGS " + svg_elements)
              Cryptoloji.UI.animate_onboarding(svg_elements)
          break

        case 2:
              var svg_elements = []    
              _.times(4, function(i){
                svg_elements.push("#onboarding_slide_2_encrypted_hello_" + (i+1) + ">g")
              })         
              Cryptoloji.UI.animate_onboarding(svg_elements)
          break

        case 3:
            TweenLite.set($('#slide_3_plain_text > path'), {opacity: 0.0})
            TweenLite.set($('#slide_3_plain_text_bg'), {y: -300})
            TweenLite.to($("#slide_3_plain_text_bg"), 1, {y: 0})
            $("#slide_3_plain_text > path").each(function(i){
              var self = this
              TweenLite.to($(self), .1, {delay: i / 10 + 1 , opacity: 1.0})
            })
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
        $('[slide-num="'+n+'"]').addClass("section-show")
        $('#next_button_onboarding').on("click", function(){
          Cryptoloji.stateman.go("encrypt")
        })
      },
      leave: function () {
        $('[slide-num="'+n+'"]').removeClass("section-show")
        $('.section_onboarding_wrapper').removeClass("section-show")
        Cryptoloji.stateman.emit('header:hide')
      }
    }
  }

  function animate_slide_4() {
    timeline.clear()
    $('#slide_4_plain_text > path').each(function(i) { 
      TweenLite.set($(this), {opacity: 1.0})
    })
    $('#slide_4_encrypted_emoji > g').each(function(i) { 
      TweenLite.set($(this), {opacity: 0.0})
    })
    TweenLite.set($('#slide_4_emoji_selector'), {opacity: 0})

    TweenLite.set($("#slide_4_emoji_1"), {opacity: 0})
    TweenLite.set($("#slide_4_emoji_2"), {opacity: 0})
    TweenLite.set($("#slide_4_emoji_3"), {opacity: 0})

    TweenLite.to($("#slide_4_emoji_1"), 0.5, {delay: 1, opacity: 1})
    TweenLite.to($("#slide_4_emoji_2"), 0.5, {delay: 1, opacity: 1})
    TweenLite.to($("#slide_4_emoji_3"), 0.5, {delay: 1, opacity: 1, onComplete: function() { timeline.play()}})

    timeline.to($('#slide_4_emoji_2'), 0.3, {delay: 1.5, opacity: 0.2})
    .to($('#slide_4_emoji_2'), 0.3, {opacity: 1.0})
    .to($('#slide_4_emoji_2'), 0.3, {opacity: 0.2})
    .to($('#slide_4_emoji_2'), 0.3, {opacity: 1.0})
    .to($('#slide_4_emoji_2'), 0.3, {opacity: 0.2})
    .to($('#slide_4_emoji_2'), 0.3, {opacity: 1.0})
    .to($('#slide_4_emoji_selector'), 0.4, {opacity: 1.0})
    .to($('#slide_4_emoji_selector'), 0.5, {x: -105})
    .to($('#slide_4_emoji_selector'), 0.0, {delay: 1, x: 105})
    .to($('#slide_4_emoji_selector'), 0.5, {delay: 1, x: 0, onComplete: function() {
      var text_animation_duration = 0.1
      $('#slide_4_plain_text > path').each(function(i) {
        TweenLite.to($(this), text_animation_duration, {delay: i * text_animation_duration, opacity: 0.0})
      })

      $('#slide_4_encrypted_emoji > g').each(function(i) { 
        TweenLite.to($(this), text_animation_duration, {delay: i * text_animation_duration, opacity: 1.0})
      })
    }})
  }

  function animate_slide_5() {
    timeline.clear()
    timeline.set($('#slide_5_delivered_text'), {y: 100, opacity: 0})
    timeline.set($('#slide_5_bubble_white_text_bg'), {y: 80, opacity: 0})
    timeline.set($('#slide_5_bubble_white_text'), {opacity: 0})
    timeline.set($('#slide_5_bubble_white_dots_bg'), {opacity: 0})
    timeline.set($('#slide_5_bubble_white_dots'), {opacity: 1})

    .to($('#slide_5_delivered_text'), 0.5, {delay: 0.5, y: 0, opacity: 1})
    .to($('#slide_5_bubble_white_dots_bg'), 0.5, {delay: 0.5, y: 0, opacity: 1})
    .to($('#slide_5_bubble_white_dots > circle')[0], 0.0, {opacity: 1})
    .to($('#slide_5_bubble_white_dots > circle')[1], 0.0, {opacity: 1})
    .to($('#slide_5_bubble_white_dots > circle')[2], 0.0, {opacity: 1})
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
  }

  function animate_slide_6() {
    timeline.clear()
    timeline.set($('#slide_6_delivered_text'), {y: 100, opacity: 0})
    timeline.set($('#slide_6_bubble_white_dots_bg'), {opacity: 0})
    timeline.set($('#slide_6_bubble_white_dots'), {opacity: 0})

    TweenLite.to($('#slide_6_emoji_bg'), 0.5, {y: -150})
    TweenLite.to($('#slide_6_bubble_white_text_bg'), 0.5, {y: -150})
    TweenLite.to($('#slide_6_bubble_white_text'), 0.5, {y: -150})
    //timeline.to($('#slide_6_emoji_bg'), 0.5, {y: -200})
  }

  function animate_slide_7() {
    timeline.clear()
    timeline.set($('#slide_7_mais_bg'), {y: 150, opacity: 0})
    timeline.set($('#slide_7_mais'), {opacity: 0})
    timeline.set($('#slide_7_answer_bg'), {y: 150, opacity: 0})
    timeline.set($('#slide_7_answer_emoji'), {opacity: 0})
    timeline.set($('#slide_7_answer_text'), {opacity: 0})
    
    timeline.to($('#slide_7_mais_bg'), 0.5, {y: 0, opacity: 1})
    .to($('#slide_7_mais'), 0.5, {opacity: 1})
    .to($('#slide_7_answer_bg'), 0.5, {y: 0, opacity: 1, onComplete: function() {
      TweenLite.to($('#slide_7_answer_emoji'), 0.5, {opacity: 1})
      TweenLite.to($('#slide_7_answer_text'), 0.5, {opacity: 1})
    }})

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







