(function (window, Cryptoloji, undefined) {
  'use strict'
  
  console.log(Cryptoloji)

  Cryptoloji.states.welcome = {
    enter: function () {
      // fix height
      $("body").css("height",$(window).innerHeight())

      Cryptoloji.stateman.emit('header:hide')
      
      $(".section_welcome").addClass("section-show")
    },
    leave: function () {
      $(".section_welcome").removeClass("section-show")
      $(".header").show()
    }
  }

})(window, window.Cryptoloji); 
