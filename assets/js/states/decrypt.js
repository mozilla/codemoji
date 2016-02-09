(function (window, Cryptoloji, undefined) {
  'use strict'
  
  Cryptoloji.states.decrypt = {
    enter: function () {
       $(".decryption").show()
    },
    leave: function () {
       $(".decryption").hide()
    }
  }

})(window, window.Cryptoloji); 
