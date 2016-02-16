(function (window, Cryptoloji, undefined) {
  'use strict'

  Cryptoloji.states.encrypt = {
    enter: function () {
      Cryptoloji.stateman.emit('header:show')

      Cryptoloji.UI.Keyslider('encrypt', '#encryption_keyslider')
        .fill(_.take(emojiList, 10))

      Cryptoloji.UI.CharCounter('encrypt', '#encryption_input_count')
        .setMaxSize(Cryptoloji.settings.inputMaxSize)
        .attachTo('#encryption_input')

      $(".encryption").addClass("section-show")

      // animate input placeholder text
      animateInputPlaceholder()

      // encrypt text on input
      $('#encryption_input').bind('input propertychange', function() {
        Cryptoloji.UI.encryptText()
      })

      Cryptoloji.stateman.on('keyslider:key-chosen', function (key) {
        // select corresponding emoji in keymodal
        Cryptoloji.UI.KeyModal().select(key)
        
        if ($('#encryption_input').val().length == 0) {
          $('body').addClass('main_content_top_input-first')
          animateInputPlaceholder(["You've picked a key.", "Write your message here to see it encrypted."])
        }
        Cryptoloji.UI.selectKey(key)
        Cryptoloji.UI.encryptText()
      })
      Cryptoloji.stateman.on('keymodal:key-chosen', function (key) {
        Cryptoloji.UI.Keyslider('encrypt')
          .resetSelection()
          .addKey(key).select(key)
        scrollToSelectedKey()
        Cryptoloji.UI.selectKey(key)
        Cryptoloji.UI.encryptText()
      })

      // show share button at proper time
      Cryptoloji.stateman.on('encrypt:show-share', function() {
        $('#encryption_share_button').addClass('main_share-open')
      })

      // show/hide bottom placeholder text
      Cryptoloji.stateman.on('encrypt:hide-output-placeholder', function () {
        $('.main_content_bottom_input').html('').removeClass('placeholdit')
      })

      // empty input field
      $('#encryption_input_cleaner').on('click', function () {
        emptyInput()
        emptyOutput()
        Cryptoloji.UI.CharCounter('encrypt').resetCount()
      })

      // show input related UI elements
      $('#encryption_input').on('focus', function () {
        $('#encryption_input_cleaner').show()
        $('#encryption_input_count').show()
      })
    },
    leave: function () {
      Cryptoloji.UI.KeyModal().close()
      $('.encryption').removeClass('section-show')
      Cryptoloji.stateman.off('encrypt')
      Cryptoloji.stateman.off('keyslider')
    }
  }

  function animateInputPlaceholder (text) {
    // store current placeholder
    var encryptionInputPlaceholder = text ? text : $('#encryption_input').attr('placeholder')
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

  function emptyInput () {
    $('#encryption_input').val('')
    $('#encryption_input_cleaner').hide()
    $('#encryption_input_count').hide()
    $('#encryption_share_button').removeClass('main_share-open')
  }

  function emptyOutput () {
    $('#encryption_output').html('').addClass('placeholdit')
    $('.share_message_item').html('')
  }

  function scrollToSelectedKey () {
    var value = $('.keyslider .selected', $('.section-show')).position().left - Cryptoloji.utils.remToPx(1.7)
    $('.keyslider', $('.section-show')).animate({ scrollLeft: value }, 500)
  }

})(window, window.Cryptoloji); 
