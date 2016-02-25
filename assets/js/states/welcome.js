(function (window, Cryptoloji, undefined) {
  'use strict'
  
  console.log(Cryptoloji)

  Cryptoloji.states.welcome = {
    enter: function () {

      Cryptoloji.stateman.emit('header:hide')
      Cryptoloji.stateman.emit('footer:show') 
      
      $(".section_welcome").addClass("section-show")
    },
    leave: function () {
      $(".section_welcome").removeClass("section-show")
      Cryptoloji.stateman.emit('footer:hide') 
    }
  }

})(window, window.Cryptoloji); 
 
