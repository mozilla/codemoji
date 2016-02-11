(function (window, Cryptoloji, undefined) {
  'use strict'
  
  Cryptoloji.states.encrypt = {
    enter: function () {
      $(".encryption").addClass("section-show")

      // animate input placeholder text
      animateInputPlaceholder()

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

  function animateInputPlaceholder () {
    // store current placeholder
    var encryptionInputPlaceholder = $('#encryption_input').attr('placeholder')
    // remove it for a cleaner start
    $('#encryption_input').attr('placeholder', '')
    // typify placeholder
    $('#encryption_input').typed({
      strings: [encryptionInputPlaceholder],
      typeSpeed: 10,
      contentType: 'text',
      showCursor: false,
      attr: 'placeholder',
      callback: function () {
        // everything back to normal please
        setTimeout(function () { $('body').removeClass('main_content_top_input-first') }, 1000)          
      }
    })
  }

})(window, window.Cryptoloji); 
