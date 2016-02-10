(function (window, Cryptoloji, undefined) {
  'use strict'
  
  Cryptoloji.states.loading = {
    enter: function () {
      $(".section_loading").addClass("section-show")
      $(".header").hide()
    },
    leave: function () {
      $(".section_loading").removeClass("section-show")
    }
  }

})(window, window.Cryptoloji); 
