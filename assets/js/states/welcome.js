(function (window, Cryptoloji, undefined) {
  'use strict'
  
  console.log(Cryptoloji)

  Cryptoloji.states.welcome = {
    enter: function () {
      $(".section_welcome").addClass("section-show")
    },
    leave: function () {
      $(".section_welcome").removeClass("section-show")
    }
  }

})(window, window.Cryptoloji); 
