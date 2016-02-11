(function (window, Cryptoloji, undefined) {
  'use strict'
  
  Cryptoloji.states.encrypt = {
    enter: function () {
      $(".encryption").addClass("section-show")

      var encryptionInputPlaceholder = 'Type here your message'
      $('#encryption_input').typed({
        strings: [encryptionInputPlaceholder, '^'],
        typeSpeed: 10,
        contentType: 'text',
        showCursor: false,
        backSpeed: 10,
        backDelay: 1000,
        // attr: 'placeholder',
        callback: function () {
          $('#encryption_input').attr('placeholder', encryptionInputPlaceholder)
          $('#encryption_input').text('')
        }
      })

      $('.encryption .main_content_top_input').bind('input propertychange', function() {
        Cryptoloji.UI.encryptText()
      })

      // show share button at proper time
      Cryptoloji.stateman.on('encrypt:show-share', function() {
        $('#encryption_share_button').fadeIn()
      })
    },
    leave: function () {
      $('.encryption').removeClass('section-show')
      Cryptoloji.stateman.off('encrypt')
    }
  }

})(window, window.Cryptoloji); 
