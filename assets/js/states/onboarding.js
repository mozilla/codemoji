(function (window, Cryptoloji, undefined) {
  'use strict'
  var timeline = new TimelineLite({onComplete: function() {
    //loop the animation
    //this.restart()
  }});
  var chosenKey = 2;
  var slide1LetterScrambleAnimation = null
  var slide2LetterScrambleAnimation = null
  var slide1Timeline = null
  var slide2Timeline = null
  var slide3Timeline = null
  var slide4Timeline = null
  var slide5Timeline = null
  var slide6Timeline = null
  var slide7Timeline = null
  
  // 
  // go directly to step 1
  // 
  Cryptoloji.states.onboarding = {}
  Cryptoloji.states.onboarding.root = {
    enter: function () {
      // go to step1 if we are headering to root state
      if (Cryptoloji.stateman.current.name === 'onboarding') {
        Cryptoloji.stateman.go('onboarding.step1')
      }

      // display cross-slide elements
      $('.section_onboarding_wrapper').addClass('section-show')
    },
    leave: function () {
      // hide cross-slide elements
      $('.section_onboarding_wrapper').removeClass('section-show')
    }
  }

  function buildSlide (n, animateFn) {
    return {
      enter: function () {
        // display current slide content
        $('[slide-num="'+n+'"]').addClass('section-show')
        // display header
        Cryptoloji.stateman.emit('header:show')
        // correct assign to-state for next button
        $('#next_button_onboarding').attr('to-state', 'onboarding.step'+(n+1))
        // update pagination
        paginationLogic(n)
        // run slide animate function
        animateFn()
      },
      leave: function () {
        $('[slide-num="'+n+'"]').removeClass('section-show')
      }
    }
  }

  function to_encrypt () {
    return {
      enter: function () {
        slide7Timeline.play()
        $('[slide-num="7"]').addClass('section-show')
        $('#next_button_onboarding').text('Go for it!').click(function(){
          TweenLite.to($('[slide-num="7"]'), 1, {y: '-100%', onComplete: function() {
            TweenLite.to('#next_button_onboarding', 0, { opacity: 0 })
            Cryptoloji.stateman.go('encrypt')
          }})
        })
      },
      leave: function () {
        $('[slide-num="7"]').removeClass('section-show')
        Cryptoloji.stateman.emit('header:hide')
      }
    }
  }

  function animate_slide1() {
    slide1LetterScrambleAnimation.play()
    slide1Timeline.play()
  }

  function animate_slide2() {
    slide2LetterScrambleAnimation.play()
    slide2Timeline.play()
  }

  function animate_slide3() {
    slide3Timeline.play()
  }

  function animate_slide4() {
    slide4Timeline.play()

    // Playground on click events
    $('#onboarding_slide_4_emoji_1').on('click', function() {
      changeScrambledTextAnimation(1, '#onboarding_slide_4_encrypted_emoji_'+chosenKey, '#onboarding_slide_4_encrypted_emoji_1')
      chosenKey = 1
    })
    $('#onboarding_slide_4_emoji_2').on('click', function() {
      changeScrambledTextAnimation(2, '#onboarding_slide_4_encrypted_emoji_'+chosenKey, '#onboarding_slide_4_encrypted_emoji_2')
      chosenKey = 2
    })
    $('#onboarding_slide_4_emoji_3').on('click', function() {
      changeScrambledTextAnimation(3, '#onboarding_slide_4_encrypted_emoji_'+chosenKey, '#onboarding_slide_4_encrypted_emoji_3')
      chosenKey = 3
    })
  }

  function animate_slide5() {
    slide5Timeline.play()
  }

  function animate_slide6() {
    slide6Timeline.play()
  }

  function paginationLogic (slide) {
    TweenLite.set($('.pagination_emoji>g'), {opacity: "0"})
    TweenLite.set($('.svg_wrapper_pagination .pagination_emoji_'+slide), {opacity: "1"})
  }

  function buildScrambleTextAnimation (emojiGroup) {
    return new TimelineLite()
      .add([
        new TimelineLite().staggerTo($(emojiGroup).get().reverse(), 0.5, { opacity: 1 }, 0.05),
        new TimelineLite().staggerTo('#onboarding_slide_4_plain_text > g', 0.5, {  opacity: 0 }, 0.05),
      ], '+=0', 'start')
  }
  function changeScrambledTextAnimation (chosenKey, previousEmojiGroup, nextEmojiGroup) {
    var selectorX = '0'
    if (chosenKey === 1) selectorX = '-95rem'
    else if (chosenKey === 3) selectorX = '95rem'

    return new TimelineLite()
      .to('#onboarding_slide_4_emoji_selector', 0.5, { delay: 0.2, x: selectorX })
      .add([
        new TimelineLite().staggerTo($(previousEmojiGroup + ' > g').get().reverse(), 0.5, { opacity: 0 }, 0.05),
        buildScrambleTextAnimation(nextEmojiGroup + ' > g')
      ], '+=0', 'start')
  }

  function buildTextButtonAnimationTimeline (start_delay_text, start_delay_button, onboardingText) {
    return new TimelineLite({ paused: true })
      .set(onboardingText, { opacity: 0 })
      .set('#next_button_onboarding', { scale: 1.2, opacity: 0 })
      .to(onboardingText, .5, { delay: start_delay_text, opacity: 1 })
      .to('#next_button_onboarding', 0.1, { delay: start_delay_button, scale: 1, opacity: 1 })
  }

  function buildLetterScramblingAnimationTimeline (elements) {
    var timeline = new TimelineLite({
      paused: true,
      onComplete: function () {
        //loop the animation
        this.restart()
      }
    })

    //Duration of a single letter transition
    var animation_duration = 0.1
    var animation_delay = .5
    var y_transform = 20
    
    //First svg group containing encrypted letter
    var first_group = $(elements[0])
    //Second svg group containing encrypted letter
    var second_group = $(elements[1])
    //Third svg group containing encrypted letter
    var third_group = $(elements[2])
    //Fourth svg group containing encrypted letter (the same as the third one to get a perfect loop)
    var fourth_group = $(elements[3])

    //Set initial state
    timeline
      // First encryption letters setup
      .set(first_group, {y: -60, opacity: 0.0})
      // Second encryption letters setup
      .set(second_group, {y: -60, opacity: 0.0})
      // Third encryption letters setup
      .set(third_group, {y: 0, opacity: 1.0})
      // Third encryption letters bis setup
      .set(fourth_group, {y: -60, opacity: 0.0})
      // First encrypted letters animation
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
      // Second encrypted letters animation
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
      // /hird encrypted letters animation
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
      // Set a delay before looping
      .to(fourth_group, 0.0, {delay: animation_delay, y: y_transform, opacity: 0.0})

    return timeline
  }

  $(document).ready(function () {
    var slide1SvgElements = []
    _.times(4, function(i) { slide1SvgElements.push("#onboarding_slide_1_encrypted_hello_" + (i+1) + ">g") })  
    slide1LetterScrambleAnimation = buildLetterScramblingAnimationTimeline (slide1SvgElements)
    var slide2SvgElements = []
    _.times(4, function(i) { slide2SvgElements.push("#onboarding_slide_2_encrypted_hello_" + (i+1) + ">g") }) 
    slide2LetterScrambleAnimation = buildLetterScramblingAnimationTimeline (slide2SvgElements)

    slide1Timeline = buildTextButtonAnimationTimeline(1.6, .9, '#onboarding_slide_1_text')
    slide2Timeline = buildTextButtonAnimationTimeline(1.6, .9, '#onboarding_slide_2_text')

    slide3Timeline = new TimelineLite({ paused: true })
      .set('#next_button_onboarding', { scale: 1.2, opacity: 0 })
      .set('#onboarding_slide_3_plain_text > g', { opacity: 0 })
      .set('#onboarding_slide_3_plain_text_bg', { y: -300 })
      .set('#onboarding_slide_3_text', { opacity: 0 })
      .to('#onboarding_slide_3_plain_text_bg', 0.5, { ease: Bounce.easeOut, y: 0 })
      .staggerTo('#onboarding_slide_3_plain_text > g', .02, { opacity: 1.0 }, .02)
      .to('#onboarding_slide_3_text', 0.1, { delay: 0.3, opacity: 1 })
      .to('#next_button_onboarding', 0.1, { delay: 0.3, scale: 1, opacity: 1 })

    slide4Timeline = new TimelineLite({ paused: true })
      .set('#next_button_onboarding', { scale: 1.2, opacity: 0 })
      .set('#onboarding_slide_4_plain_text > g', { opacity: 1 })
      .set('#onboarding_slide_4_emoji_1 > g', { scale: 1.2, opacity: 0 })
      .set('#onboarding_slide_4_emoji_2 > g', { scale: 1.2, opacity: 0 })
      .set('#onboarding_slide_4_emoji_3 > g', { scale: 1.2, opacity: 0 })
      .set('#onboarding_slide_4_emoji_selector', { x: '95rem', opacity: 0 })
      .set('#onboarding_slide_4_encrypted_emoji_1 > g', {opacity: 0 })
      .set('#onboarding_slide_4_encrypted_emoji_2 > g', {opacity: 0 })
      .set('#onboarding_slide_4_encrypted_emoji_3 > g', {opacity: 0 })
      .set('#onboarding_slide_4_text_tutor', { opacity: 0 })
      .set('#next_button_onboarding', { scale: 1.2, opacity: 0 })
      .to('#onboarding_slide_4_emoji_1 > g', 0.3, { ease: Bounce.easeOut, scale: 1, opacity: 1 })
      .to('#onboarding_slide_4_emoji_2 > g', 0.3, { ease: Bounce.easeOut, scale: 1, opacity: 1 })
      .to('#onboarding_slide_4_emoji_3 > g', 0.3, { ease: Bounce.easeOut, scale: 1, opacity: 1 })
      .to('#onboarding_slide_4_emoji_selector', 0.3, { ease: Bounce.easeOut, x: 0, opacity: 1 })
      // animate selector 2nd to 1st
      .to('#onboarding_slide_4_emoji_selector', 0.5, { delay: 0.2, x: '-95rem' })
      .add(buildScrambleTextAnimation('#onboarding_slide_4_encrypted_emoji_1 > g'))
      // animate selector 1st to 3rd
      .add(changeScrambledTextAnimation(3, '#onboarding_slide_4_encrypted_emoji_1', '#onboarding_slide_4_encrypted_emoji_3'))
      // animate selector 3rd to 2nd
      .add(changeScrambledTextAnimation(2, '#onboarding_slide_4_encrypted_emoji_3', '#onboarding_slide_4_encrypted_emoji_2'))
      // show text
      .to('#onboarding_slide_4_text_tutor', 0.02, { delay: 0.8, opacity: 1 })
      // show next button
      .to('#next_button_onboarding', 0.1, { delay: 0.2, scale: 1, opacity: 1 })

    slide5Timeline = new TimelineLite({ paused: true })
      .set('#next_button_onboarding', { scale: 1.2, opacity: 0 })
      .set('#onboarding_slide_5_text', { opacity: 0 })
      .set('#onboarding_slide_5_plain_text', { opacity: 0 })
      .set('#onboarding_slide_5_encrypted_emoji_1', { opacity: 0 })
      .set('#onboarding_slide_5_encryptedemoji_2', { opacity: 0 })
      .set('#onboarding_slide_5_encrypted_emoji_3', { opacity: 0 })
      .set('#onboarding_slide_5_delivered_text', { y: 100, opacity: 0 })
      .set('#slide_5_bubble_white_text_bg', { y: 80, opacity: 0 })
      .set('#slide_5_bubble_white_text', { opacity: 0 })
      .set('#slide_5_bubble_white_dots_bg', { y: 100, opacity: 0 })
      .set('#onboarding_slide_5_encrypted_emoji_'+ chosenKey, {opacity: 1 })
      .set('#slide_5_bubble_white_dots  ci rcle', {scale: 1.2, opacity: 0 })
      .to('#onboarding_slide_5_delivered_text', 0.3, { delay: 0.5, ease: Bounce.easeOut, y: 0, opacity: 1 })
      .to('#slide_5_bubble_white_dots_bg', 0.3, { delay: 0.5, ease: Bounce.easeOut, y: 0, opacity: 1 })
      .to('#slide_5_bubble_white_dots > circle', 0.3, { ease: Bounce.easeOut, scale: 1, opacity: 1 })
      .to('#slide_5_bubble_white_dots > circle:nth-child(1)', 0.05, { delay: 0.5, y: -5 })
      .to('#slide_5_bubble_white_dots > circle:nth-child(2)', 0.05, { y: -5 })
      .to('#slide_5_bubble_white_dots > circle:nth-child(3)', 0.05, { y: -5 })
      .to('#slide_5_bubble_white_dots > circle:nth-child(1)', 0.05, { y: 0 })
      .to('#slide_5_bubble_white_dots > circle:nth-child(2)', 0.05, { y: 0 })
      .to('#slide_5_bubble_white_dots > circle:nth-child(3)', 0.05, { y: 0 })
      .to('#slide_5_bubble_white_dots > circle:nth-child(1)', 0.05, { y: -5 })
      .to('#slide_5_bubble_white_dots > circle:nth-child(2)', 0.05, { y: -5 })
      .to('#slide_5_bubble_white_dots > circle:nth-child(3)', 0.05, { y: -5 })
      .to('#slide_5_bubble_white_dots > circle:nth-child(1)', 0.05, { y: 0 })
      .to('#slide_5_bubble_white_dots > circle:nth-child(2)', 0.05, { y: 0 })
      .to('#slide_5_bubble_white_dots > circle:nth-child(3)', 0.05, { y: 0 })
      .to('#slide_5_bubble_white_dots > circle:nth-child(1)', 0.05, { y: -5 })
      .to('#slide_5_bubble_white_dots > circle:nth-child(2)', 0.05, { y: -5 })
      .to('#slide_5_bubble_white_dots > circle:nth-child(3)', 0.05, { y: -5 })
      .to('#slide_5_bubble_white_dots > circle:nth-child(1)', 0.05, { y: 0 })
      .to('#slide_5_bubble_white_dots > circle:nth-child(2)', 0.05, { y: 0 })
      .to('#slide_5_bubble_white_dots > circle:nth-child(3)', 0.05, { y: 0 })
      .to('#slide_5_bubble_white_dots > circle', 0.0, { y: 0, opacity: 0 })
      .to('#slide_5_bubble_white_dots_bg', 0.3, { ease: Bounce.easeIn, y: -100, opacity: 0 })
      .to('#slide_5_bubble_white_text_bg', 0.5, { delay: 0.5, ease: Bounce.easeOut, y: 0, opacity: 1 })
      .to('#slide_5_bubble_white_text', 0.5, { opacity: 1 })
      .to('#onboarding_slide_5_text', 0.5, { opacity: 1 })
      .to('#next_button_onboarding', 0.1, { scale: 1, opacity: 1 })

    slide6Timeline = new TimelineLite({ paused: true })
      .set('#next_button_onboarding', { scale: 1.2, opacity: 0 })
      .set('#onboarding_slide_6_plain_text', { opacity: 0 })
      .set('#onboarding_slide_6_text', { opacity: 0 })
      .set('#onboarding_slide_6_encrypted_emoji_1', { opacity: 0 })
      .set('#onboarding_slide_6_encrypted_emoji_2', { opacity: 0 })
      .set('#onboarding_slide_6_encrypted_emoji_3', { opacity: 0 })
      .set('#onboarding_slide_6_delivered_text', { y: 100, opacity: 0 })
      .set('#onboarding_slide_6_mais_bubble', { y: 100, opacity: 0 })
      .set('#onboarding_slide_6_mais', { opacity: 0 })
      .set('#onboarding_slide_6_smile', { y: 100, opacity: 0 })
      .set('#onboarding_slide_6_smile_content', { opacity: 0 })
      .set('#onboarding_slide_6_encrypted_emoji_' + chosenKey, { opacity: 1 })
      .to('#onboarding_slide_6_mais_bubble', 0.5, { delay: 0.5, ease: Bounce.easeOut, y: 0, opacity: 1 })
      .to('#onboarding_slide_6_mais', 0.1, { opacity: 1 })
      .to('#onboarding_slide_6_delivered_text', 0.2, { delay: 0.5, ease: Bounce.easeOut, y: 0, opacity: 1 })
      .to('#onboarding_slide_6_smile', 0.5, { delay: 0.5, ease: Bounce.easeOut, y: 0, opacity: 1 })
      .to('#onboarding_slide_6_smile_content', 0.1, { opacity: 1 })
      .to('#onboarding_slide_6_graphic', 0.5, { delay: 0.5, y: -130 })
      .to('#onboarding_slide_6_text', 0.5, { opacity: 1 })
      .to('#next_button_onboarding', 0.1, { scale: 1, opacity: 1 })

    slide7Timeline = new TimelineLite({ paused: true })
      .set('.svg_wrapper_pagination', { opacity: 0 })
      .set('.onboarding_skip_button', { opacity: 0 })
      .to('#next_button_onboarding', 0.5, { delay: 1, opacity: 1 })
  })

  function commonSlideEnterBehaviour(n) {
    // display current slide content
    $('[slide-num="'+n+'"]').addClass('section-show')
    // display header
    Cryptoloji.stateman.emit('header:show')
    // correct assign to-state for next button
    $('#next_button_onboarding').attr('to-state', 'onboarding.step'+(n+1))
    // update pagination
    paginationLogic(n)
  }

  //Cryptoloji.states.onboarding.step1 = buildSlide(1, animate_slide1)
  Cryptoloji.states.onboarding.step1 = {
    enter: function() {
      commonSlideEnterBehaviour(1)
      slide1LetterScrambleAnimation.play()
      slide1Timeline.play()
    },
    leave: function() {
      return new Promise(function (resolve, reject) {
        var fade_duration = 0.5
        new TimelineLite()
          .to('#onboarding_slide_1_encrypted_hello_1', fade_duration, { opacity: 0 })
          .to('#onboarding_slide_1_encrypted_hello_2', fade_duration, { opacity: 0 }, 0)
          .to('#onboarding_slide_1_encrypted_hello_3', fade_duration, { opacity: 0 }, 0)
          .to('#onboarding_slide_1_encrypted_hello_4', fade_duration, { opacity: 0 }, 0)
          .to('#next_button_onboarding', fade_duration, { opacity: 0 }, 0)
          .to('#onboarding_slide_1_text', fade_duration, { opacity: 0 , onComplete: function() {
            $('[slide-num="1"]').removeClass('section-show')
            resolve()
          }}, 0)
      })
    }
  }

  Cryptoloji.states.onboarding.step2 = buildSlide(2, animate_slide2)
  Cryptoloji.states.onboarding.step3 = buildSlide(3, animate_slide3)
  Cryptoloji.states.onboarding.step4 = buildSlide(4, animate_slide4)
  Cryptoloji.states.onboarding.step5 = buildSlide(5, animate_slide5)
  Cryptoloji.states.onboarding.step6 = buildSlide(6, animate_slide6)
  Cryptoloji.states.onboarding.step7 = to_encrypt()


})(window, window.Cryptoloji); 







