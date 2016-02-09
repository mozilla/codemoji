(function (window, Cryptoloji, undefined) {
  'use strict'
  
  console.log(Cryptoloji)

  Cryptoloji.states.welcome = {
    enter: function () {
      $(".section_welcome").show()
    },
    leave: function () {
      $(".section_welcome").hide()
    }
  }

})(window, window.Cryptoloji); 
