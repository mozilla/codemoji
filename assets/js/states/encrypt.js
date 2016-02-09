(function (window, Cryptoloji, undefined) {
  'use strict'
  
  Cryptoloji.states.encrypt = {
    enter: function () {
      $(".encryption").addClass("section-show")
    },
    leave: function () {
      $(".encryption").removeClass("section-show")
    }
  }

})(window, window.Cryptoloji); 
