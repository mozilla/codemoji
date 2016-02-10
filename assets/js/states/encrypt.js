(function (window, Cryptoloji, undefined) {
  'use strict'
  
  Cryptoloji.states.encrypt = {
    enter: function () {
      $(".encryption").addClass("section-show")

      $('.encryption .main_content_top_input').bind('input propertychange', function() {
        Cryptoloji.UI.encryptText()
      })

      // show share button at proper time
      Cryptoloji.stateman.on('encrypt:show-share', function() {
        $('.header_share').fadeIn()
      })
    },
    leave: function () {
      $(".encryption").removeClass("section-show")
      Cryptoloji.stateman.off('encrypt')
    }
  }

})(window, window.Cryptoloji); 
