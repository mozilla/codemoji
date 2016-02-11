(function (window, Cryptoloji, undefined) {
  'use strict'
  
  Cryptoloji.states.loading = {
    enter: function () {
      $(".section_loading").addClass("section-show")
      Cryptoloji.stateman.emit('header:hide')

      setTimeout(function(){
        Cryptoloji.stateman.go('home')
      }, 1000)
    },
    leave: function () {
      $(".section_loading").removeClass("section-show")
    }
  }

})(window, window.Cryptoloji); 
