(function (window, Cryptoloji, undefined) {
  'use strict'
  
  Cryptoloji.states.landing = {
    enter: function () {

      $(".section_landing").addClass("section-show")
      Cryptoloji.stateman.emit('footer:show') 
    },
    leave: function () {
      $(".section_landing").removeClass("section-show")
      Cryptoloji.stateman.emit('footer:hide') 
    }
  }

})(window, window.Cryptoloji); 







