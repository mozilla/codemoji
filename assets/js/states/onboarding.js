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
      Cryptoloji.stateman.go('onboarding.step1')
    }
  }

  // function
  // 
  
  function slideLogic (n) {

      paginationLogic(n)
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

        // correct assign to-state for next button
        $('#next_button_onboarding').attr('to-state', 'onboarding.step'+(n+1))

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
    wordLetterScrumblingAnimation(svg_elements)
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
    wordLetterScrumblingAnimation(svg_elements)
    timeline.clear()
    timeline.set($('#onboarding_slide_2_text'), {opacity: 0})
    timeline.set($('#next_button_onboarding'), {opacity: 0})
    timeline.to($('#onboarding_slide_2_text'), .5, {delay: 2.8, opacity: 1})
    .to($('#next_button_onboarding'), 1, {opacity: 1})
  }

  function animate_slide3() {
    timeline.clear()
    timeline.set($('#next_button_onboarding'), {scale: 1.2, opacity: 0})
    timeline.set($('#onboarding_slide_3_plain_text > g'), {opacity: 0.0})
    timeline.set($('#onboarding_slide_3_plain_text_bg'), {y: -300})
    timeline.set($('#onboarding_slide_3_text'), {opacity: 0})

    timeline.to($("#onboarding_slide_3_plain_text_bg"), 0.5, {ease: Bounce.easeOut, y: 0})
    $("#onboarding_slide_3_plain_text > g").each(function(i){
      timeline.to($(this), .02, {opacity: 1.0})
    })
    timeline.to($('#onboarding_slide_3_text'), 0.5, {opacity: 1})
    .to($('#next_button_onboarding'), 0.1, {scale: 1, opacity: 1})
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
    .to($('#onboarding_slide_4_text_tutor'), 0.5, {delay: 3, opacity: 1})
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

  function paginationLogic (slide) {
    // console.log(">>>>>>>>",slide, $('.pagination_emoji>g'))
    TweenLite.set($('.pagination_emoji>g'), {opacity: "0"})
    TweenLite.set($('.svg_wrapper_pagination .pagination_emoji_'+slide), {opacity: "1"})
  }

  // Step1, Step2 multiple word scrambling animation
  var wordLetterScrumblingAnimationTimeline = null
  function wordLetterScrumblingAnimation (elements) {
    var timeline = wordLetterScrumblingAnimationTimeline

    //Prevent istanciating multiple timelines
    if (!timeline) {
      timeline = new TimelineLite({onComplete: function() {
        //loop the animation
        this.restart()
      }});
    }

    //Clear the timeline in case we are creating the animation for a different slide
    timeline.clear()

    //Duration of a single letter transition
    var animation_duration = 0.2
    var animation_delay = .8
    var y_transform = 20
    
    //First svg group containing encrypted letter
    var first_group = $($(elements[0]))
    //Second svg group containing encrypted letter
    var second_group = $($(elements[1]))
    //Third svg group containing encrypted letter
    var third_group = $($(elements[2]))
    //Fourth svg group containing encrypted letter (the same as the third one to get a perfect loop)
    var fourth_group = $($(elements[3]))

    //Set initial state
    timeline.set(first_group, {y: -60, opacity: 0.0})
    //Second encryption letters
    .set(second_group, {y: -60, opacity: 0.0})
    //Third encryption letters
    .set(third_group, {y: 0, opacity: 1.0})
    //Third encryption letters bis
    .set(fourth_group, {y: -60, opacity: 0.0})


    //First encrypted word animation
    .to(third_group[4], animation_duration, {delay: animation_delay, y: y_transform, opacity: 0.0})
    .to(first_group[4], animation_duration, {y: 0, opacity: 1.0})
    .to(third_group[3], animation_duration, {y: y_transform, opacity: 0.0})
    .to(first_group[3], animation_duration, {y: 0, opacity: 1.0})
    .to(third_group[2], animation_duration, {y: y_transform, opacity: 0.0})
    .to(first_group[2], animation_duration, {y: 0, opacity: 1.0})
    .to(third_group[1], animation_duration, {y: y_transform, opacity: 0.0})
    .to(first_group[1], animation_duration, {y: 0, opacity: 1.0})
    .to(third_group[0], animation_duration, {y: y_transform, opacity: 0.0})
    .to(first_group[0], animation_duration, {y: 0, opacity: 1.0})
    
    // //Second encrypted word animation
    .to(first_group[4], animation_duration, {delay: animation_delay, y: y_transform, opacity: 0.0})
    .to(second_group[4], animation_duration, {y: 0, opacity: 1.0})
    .to(first_group[3], animation_duration, {y: y_transform, opacity: 0.0})
    .to(second_group[3], animation_duration, {y: 0, opacity: 1.0})
    .to(first_group[2], animation_duration, {y: y_transform, opacity: 0.0})
    .to(second_group[2], animation_duration, {y: 0, opacity: 1.0})
    .to(first_group[1], animation_duration, {y: y_transform, opacity: 0.0})
    .to(second_group[1], animation_duration, {y: 0, opacity: 1.0})
    .to(first_group[0], animation_duration, {y: y_transform, opacity: 0.0})
    .to(second_group[0], animation_duration, {y: 0, opacity: 1.0})
    
    // //Third encrypted word animation
    .to(second_group[4], animation_duration, {delay: animation_delay, y: y_transform, opacity: 0.0})
    .to(fourth_group[4], animation_duration, {y: 0, opacity: 1.0})
    .to(second_group[3], animation_duration, {y: y_transform, opacity: 0.0})
    .to(fourth_group[3], animation_duration, {y: 0, opacity: 1.0})
    .to(second_group[2], animation_duration, {y: y_transform, opacity: 0.0})
    .to(fourth_group[2], animation_duration, {y: 0, opacity: 1.0})
    .to(second_group[1], animation_duration, {y: y_transform, opacity: 0.0})
    .to(fourth_group[1], animation_duration, {y: 0, opacity: 1.0})
    .to(second_group[0], animation_duration, {y: y_transform, opacity: 0.0})
    .to(fourth_group[0], animation_duration, {y: 0, opacity: 1.0})
    
    //Set a delay before looping
    .to(fourth_group, 0.0, {delay: animation_delay, y: y_transform, opacity: 0.0})

  }


  Cryptoloji.states.onboarding.step1 = next_slide(1)
  Cryptoloji.states.onboarding.step2 = next_slide(2)
  Cryptoloji.states.onboarding.step3 = next_slide(3)
  Cryptoloji.states.onboarding.step4 = next_slide(4)
  Cryptoloji.states.onboarding.step5 = next_slide(5)
  Cryptoloji.states.onboarding.step6 = next_slide(6)
  Cryptoloji.states.onboarding.step7 = to_encrypt(7)


})(window, window.Cryptoloji); 







