(function (window, Cryptoloji, undefined) {
  'use strict'
  
  Cryptoloji.states.encrypt = {
    enter: function () {
      $(".encryption").addClass("section-show")

      // show share button on <encryption> input focus
      $('.encryption .main_content_top_input').on('focus', function() {
        $('.header_share').fadeIn()
      })
      $('.encryption .main_content_top_input').bind('input propertychange', function() {
        Cryptoloji.UI.encryptText()
      })
    },
    leave: function () {
      $(".encryption").removeClass("section-show")
      $('.header_share').fadeOut()
    }
  }

})(window, window.Cryptoloji); 
