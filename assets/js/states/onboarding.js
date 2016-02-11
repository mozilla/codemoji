(function (window, Cryptoloji, undefined) {
  'use strict'
  
  Cryptoloji.states.onboarding = {}

  Cryptoloji.states.onboarding.root = {
    enter: function () {
      $(".section_onboarding").addClass("section-show")
    },
    leave: function () {
      $(".section_onboarding").removeClass("section-show")
    }
  }

  Cryptoloji.states.onboarding.watermelon = {
    enter: function () {
      $(".section_onboarding").addClass("section-show").addClass("step-0")
      var i = 0
      $(".section_onboarding").on("click", function(){
         if(i < 4){
           $(".section_onboarding").removeClass("step-"+ parseInt(i)).addClass("step-"+ parseInt(i + 1))
           i = i + 1
         }
      })
    },
    leave: function () {
      $(".section_onboarding").removeClass("step-4").removeClass("section-show")
    }
  }

})(window, window.Cryptoloji); 
