(function (window, Cryptoloji, undefined) {
  'use strict'
  
  Cryptoloji.states.onboarding = {}

  Cryptoloji.states.onboarding.watermelon = {
    enter: function () {
      Cryptoloji.UI.buildSlider('.slider_wrapper')
      $(".section_onboarding").addClass("section-show")
    },
    leave: function () {
      $(".section_onboarding").removeClass("section-show")
    }
  }

})(window, window.Cryptoloji); 







