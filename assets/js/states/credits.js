(function (window, Cryptoloji, undefined) {
  'use strict'

  var $closeButton = $(".credits_section .svg_wrapper_x_button")
  
  Cryptoloji.states.credits = {
    enter: function () {
      $(".credits_section").addClass("section-show")
      $closeButton.on("click", function(){
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
      $closeButton.off("click")
    }
  }

})(window, window.Cryptoloji); 
