(function (window, Cryptoloji, undefined) {
  'use strict'
  
  console.log(Cryptoloji)

  Cryptoloji.states.welcome = {
    enter: function () {
      // fix height
      $("body").css("height",$(window).innerHeight())
      
      $(".section_welcome").addClass("section-show")
      $(".header").hide()
    },
    leave: function () {
      $(".section_welcome").removeClass("section-show")
      $(".header").show()
    }
  }

})(window, window.Cryptoloji); 
