(function (window, Cryptoloji, undefined) {
  'use strict'
  
  Cryptoloji.states.credits = {
    enter: function () {
      $(".credits_section").addClass("section-show")
      $(".credits_section .mozilla_button").on("click", function(){
        Cryptoloji.stateman.go(Cryptoloji.stateman.previous.name)
      })
    },
    leave: function () {
      $(".credits_section").removeClass("section-show")
    }
  }

})(window, window.Cryptoloji); 
