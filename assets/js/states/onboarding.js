(function (window, Cryptoloji, undefined) {
  'use strict'

  Cryptoloji.states.onboarding = {}

  Cryptoloji.states.onboarding.root = {
    enter: function () {
      Cryptoloji.stateman.go('onboarding/step1')
    }
  }
  
  Cryptoloji.states.onboarding.step1 = {
    enter: function () {
      $(".section_onboarding_step1").addClass("section-show")
    },
    leave: function () {
      $(".section_onboarding_step1").removeClass("section-show")
    }
  }

  Cryptoloji.states.onboarding.step2 = {
    enter: function () {
      $(".section_onboarding_step2").addClass("section-show")
    },
    leave: function () {
      $(".section_onboarding_step2").removeClass("section-show")
    }
  }

  Cryptoloji.states.onboarding.step3 = {
    enter: function () {
      $(".section_onboarding_step3").addClass("section-show")
    },
    leave: function () {
      $(".section_onboarding_step3").removeClass("section-show")
    }
  }
})(window, window.Cryptoloji); 







