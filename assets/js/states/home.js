(function (window, Cryptoloji, undefined) {
  'use strict'
  
  Cryptoloji.states.home = {
    enter: function () {
      $(".section_home").show()
    },
    leave: function () {
      $(".section_home").hide()
    }
  }

})(window, window.Cryptoloji); 
