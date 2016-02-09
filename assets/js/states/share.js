(function (window, Cryptoloji, undefined) {
  'use strict'
  
  Cryptoloji.states.share = {
    enter: function () {
      $(".section_share").addClass("section-show")
    },
    leave: function () {
      $(".section_share").removeClass("section-show")
    }
  }

})(window, window.Cryptoloji); 
