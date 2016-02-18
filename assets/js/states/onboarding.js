(function (window, Cryptoloji, undefined) {
  'use strict'
  
  Cryptoloji.states.onboarding = {
    enter: function () {

      Cryptoloji.stateman.on('svg:loaded', function(p){
        if(p == 'assets/svg/onboarding_bottom.svg'){
          if(!Cryptoloji.onBoardingSlider) Cryptoloji.buildSlider('.onboarding_wrapper_ui')
        }
      })

      if(!Cryptoloji.onBoardingSlider) Cryptoloji.buildSlider('.onboarding_wrapper_ui')
      
      $(".section_onboarding").addClass("section-show")
    },
    leave: function () {
      $(".section_onboarding").removeClass("section-show")
    }
  }

})(window, window.Cryptoloji); 







