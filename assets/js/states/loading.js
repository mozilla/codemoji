(function (window, Cryptoloji, undefined) {
  'use strict'
  
  Cryptoloji.states.loading = {
    enter: function () {
      $(".section_loading").addClass("section-show")
      $(".header").hide()

      setTimeout(function(){
        Cryptoloji.stateman.go('home')
      }, 5000)
    },
    leave: function () {
      $(".section_loading").removeClass("section-show")
    }
  }

})(window, window.Cryptoloji); 
