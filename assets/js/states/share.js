(function (window, Cryptoloji, undefined) {
  'use strict'
  
  Cryptoloji.states.share = {
    enter: function () {
       $(".section_share").show()
    },
    leave: function () {
       $(".section_share").hide()
    }
  }

})(window, window.Cryptoloji); 
