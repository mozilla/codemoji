(function (window, Cryptoloji, undefined) {
  'use strict'
  
  Cryptoloji.states.landing = {
    enter: function () {

      $(".section_landing").addClass("section-show")
    },
    leave: function () {
      $(".section_landing").removeClass("section-show")
    }
  }

})(window, window.Cryptoloji); 







