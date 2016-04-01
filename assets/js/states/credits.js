(function (window, Cryptoloji, undefined) {
  'use strict'
  
  Cryptoloji.states.credits = {
    enter: function () {
      $(".credits_section").addClass("section-show")
      $(".credits_section .mozilla_button").on("click", function(){
        var prev = Cryptoloji.stateman.previous.name
        if(prev){
          Cryptoloji.stateman.go(prev)
        } else {
          Cryptoloji.stateman.go("welcome")
        }
      })
    },
    leave: function () {
      $(".credits_section").removeClass("section-show")
      $(".credits_section .mozilla_button").off("click")
    }
  }

})(window, window.Cryptoloji); 
