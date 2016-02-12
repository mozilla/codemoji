(function (window, Cryptoloji, undefined) {
  'use strict'
  
  Cryptoloji.states.decrypt = {
    enter: function () {
      $(".decryption").addClass("section-show")
      Cryptoloji.stateman.emit('header:show')
    },
    leave: function () {
      $(".decryption").removeClass("section-show")
    }
  }

})(window, window.Cryptoloji); 
