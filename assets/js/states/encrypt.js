(function (window, Cryptoloji, undefined) {
  'use strict'

  Cryptoloji.states.encrypt = {
    enter: function () {
      $(".encryption").addClass("section-show")
      Cryptoloji.stateman.emit('header:show')

      // animate input placeholder text
      animateInputPlaceholder()

      // encrypt text on input
      $('.encryption .main_content_top_input').bind('input propertychange', function() {
        Cryptoloji.UI.encryptText()
      })

      // show share button at proper time
      Cryptoloji.stateman.on('encrypt:show-share', function() {
        $('#encryption_share_button').fadeIn()
      })

      // show/hide bottom placeholder text
      $('.main_content_bottom_input').text($('.main_content_bottom_input').attr('placeholder'))
      Cryptoloji.stateman.on('encrypt:hide-output-placeholder', function () {
        $('.main_content_bottom_input').html('').removeClass('placeholdit')
      })

      // empty input field
      $('#encryption_input_cleaner').on('click', function () {
        $('#encryption_input').val('')
      })

      // show input related UI elements
      $('#encryption_input').on('focus', function () {
        $('#encryption_input_cleaner').show()
        $('#encryption_input_count').show()
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
