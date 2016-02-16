(function (window, Cryptoloji, undefined) {
  'use strict'
  
  Cryptoloji.states.onboarding = {
    enter: function () {

      Cryptoloji.stateman.on('svg:loaded', function(p){
        if(p == 'assets/svg/onboarding_bottom.svg'){
          Cryptoloji.buildSlider('.slider_wrapper')
        }
      })

      // need a better way to handle this
      if(!Cryptoloji.onBoardingSlider) Cryptoloji.buildSlider('.slider_wrapper')
      
      $(".section_onboarding").addClass("section-show")
    },
    leave: function () {
      $(".section_onboarding").removeClass("section-show")
    }
  }

})(window, window.Cryptoloji); 







