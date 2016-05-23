(function (window, Cryptoloji, undefined) {
  'use strict'

  Cryptoloji.states.onboarding = {}
  Cryptoloji.states.onboarding.root = {
    enter: function () {

      $('.next_button_onboarding').css('display', 'none')

      $('#main_section_onboarding_wrapper').addClass('section-show')

      // go to step1 if we are headering to root state
      if (Cryptoloji.stateman.current.name === 'onboarding') {
        Cryptoloji.stateman.go('onboarding.step1')
      }

    },
    leave: function () {
      // hide cross-slide elements
      $('#main_section_onboarding_wrapper').removeClass('section-show')
    }
  }

  function paginationLogic (slide) {
    var emoji = $('#pagination #emo > g');
    TweenLite.to(emoji, .3, {opacity: 0, scale:.1, transformOrigin: "center center"})

    var dot = $(emoji[slide-1])
    TweenLite.to(dot, .4, {opacity: 1, scale: 1, transformOrigin: "center center"})
  }


  function showNextBtn(){
    $('.next_button_onboarding').css('display', 'inherit')
    TweenLite.set($('.next_button_onboarding'), {opacity:0, scale:1.3, transformOrigin:'center center', overwrite:true})
    TweenLite.to($('.next_button_onboarding'), 1, {opacity:1, scale:1, transformOrigin:'center center', ease:Expo.easeInOut})
  }

  function simpleHideNextBtn(){
    TweenLite.to($('.next_button_onboarding'), .75, {opacity:0, scale:1.3, transformOrigin:'center center', ease:Expo.easeInOut, overwrite:true})
  }

  function endOut(n, resolve){
    $('[slide-num="'+n+'"]').removeClass('section-show')
    $('.next_button_onboarding').css('display', 'none')
    resolve()
  }

  



  function commonSlideEnterBehaviour(n) {
    $('[slide-num="'+n+'"]').addClass('section-show')

    // display header
    Cryptoloji.stateman.emit('header:show')
    
    $('#next_button_onboarding').attr('to-state', 'onboarding.step'+(n+1))
    
    paginationLogic(n)
  }

  var timer = null;

  Cryptoloji.states.onboarding.step1 = {
    enter: function() {
      commonSlideEnterBehaviour(1)
      OnBoardingAnimations.scene_01.enter(showNextBtn)
    },
    leave: function() {
      clearTimeout(timer)
      return new Promise(function(resolve, reject) {
        simpleHideNextBtn();
        OnBoardingAnimations.scene_01.exit(function(){
          endOut(1, resolve)
        })
      })
    }
  }

  Cryptoloji.states.onboarding.step2 = {
    enter: function() {
      commonSlideEnterBehaviour(2)
      OnBoardingAnimations.scene_02.enter(showNextBtn)
    },
    leave: function() {
      return new Promise(function(resolve, reject) {
        simpleHideNextBtn();
        OnBoardingAnimations.scene_02.exit(function(){
          endOut(2, resolve)
        })
      })
    }
  }
  
  Cryptoloji.states.onboarding.step3 = {
    enter: function() {
      commonSlideEnterBehaviour(3)
      OnBoardingAnimations.scene_03.enter(showNextBtn)
    },
    leave: function() {
      return new Promise(function(resolve, reject) {
        simpleHideNextBtn();
        OnBoardingAnimations.scene_03.exit(function(){
          endOut(3, resolve)
        })
      })
    }
  }

  Cryptoloji.states.onboarding.step4 = {
    enter: function() {
      commonSlideEnterBehaviour(4)
      OnBoardingAnimations.scene_04.enter(showNextBtn)
    },
    leave: function() {
      return new Promise(function(resolve, reject) {
        simpleHideNextBtn();
        OnBoardingAnimations.scene_04.exit(function(){
          endOut(4, resolve)
        })
      })
    }
  }

  Cryptoloji.states.onboarding.step5 = {
    enter: function() {
      commonSlideEnterBehaviour(5)

      $('#next_button_onboarding').text('Next')
      $('#next_button_onboarding').off()


      OnBoardingAnimations.scene_05.enter(showNextBtn)
    },
    leave: function() {
      return new Promise(function(resolve, reject) {
        simpleHideNextBtn();
        OnBoardingAnimations.scene_05.exit(function(){
          endOut(5, resolve)
        })
      })
    }
  }

  Cryptoloji.states.onboarding.step6 = {
    enter: function() {
      commonSlideEnterBehaviour(6)

      $('#next_button_onboarding').text('Next')

      OnBoardingAnimations.scene_06.enter(showNextBtn)
    },
    leave: function() {
      return new Promise(function(resolve, reject) {
        simpleHideNextBtn();
        OnBoardingAnimations.scene_06.exit(function(){
          endOut(6, resolve)
        })
      })
    }
  }
  Cryptoloji.states.onboarding.step7 = {
    enter: function () {
      commonSlideEnterBehaviour(7)

      TweenLite.to($('.svg_wrapper_pagination'), 1, {opacity:0})
      TweenLite.to($('.onboarding_skip_button'), 1, {delay:.2, opacity:0})

      $('#next_button_onboarding').text('I understand')
      $('#next_button_onboarding').click(function(){
        Cryptoloji.stateman.go('encrypt')
        return false;
      })
      OnBoardingAnimations.scene_07.enter(showNextBtn)
    },
    leave: function () {
      return new Promise(function(resolve, reject) {
        simpleHideNextBtn();
        OnBoardingAnimations.scene_07.exit(function(){
          Cryptoloji.visitor.countVisit()
          Cryptoloji.stateman.emit('header:hide')
          endOut(7, resolve)
        })
      })
    }
  }


})(window, window.Cryptoloji); 







