(function (window, Cryptoloji, undefined) {
  'use strict'
  
  Cryptoloji.states.encrypt = {
    enter: function () {
      console.log('bau')
      console.log($('.encryption'))
      $(".encryption").show()
    },
    leave: function () {
       $(".encryption").hide()
    }
  }

})(window, window.Cryptoloji); 
