(function (window, Cryptoloji, undefined) {
  'use strict'
  
  Cryptoloji.states.more = {
    enter: function () {
      $(".section_more").addClass("section-show")
    },
    leave: function () {
      $(".section_more").removeClass("section-show")
    }
  }

})(window, window.Cryptoloji); 
