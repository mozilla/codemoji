(function (window, Cryptoloji, undefined) {
  'use strict'
  
  Cryptoloji.states.home = {
    enter: function () {
      $(".section_home").addClass("section-show")
      Cryptoloji.stateman.emit('header:show')
    },
    leave: function () {
      $(".section_home").removeClass("section-show")
    }
  }

})(window, window.Cryptoloji); 
