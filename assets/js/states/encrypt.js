(function (window, Cryptoloji, $, _, theaterJS, undefined) {
  'use strict'

  Cryptoloji.states.encrypt = {
    enter: function () {
      var theater = theaterJS()

      // Cryptoloji.stateman.emit('header:show')
      Cryptoloji.stateman.emit('footer:show')
      Cryptoloji.stateman.emit('header:hide')

      // transition
      if (Cryptoloji.stateman.previous.name !== 'share' &&
          Cryptoloji.stateman.previous.name !== 'captcha') {
        Cryptoloji.UI.encryptionEnteringTransition('encryption')
      }

      Cryptoloji.UI.CharCounter('encrypt', '#encryption_input_count')
        .setMaxSize(Cryptoloji.settings.inputMaxSize)
        .attachTo('#encryption_input')

      // if we should serve a smaller version
      if (!Cryptoloji.mq.matches) {
        animateInputPlaceholder(theater)

        Cryptoloji.UI.Keyslider('encrypt', '#encryption_keyslider')
          .fill(_.take(EmojiList, 10))

        Cryptoloji.stateman.on('keyslider:key-chosen', function (key) {
          // select corresponding emoji in keymodal
          Cryptoloji.UI.KeyModal().select(key)

          if ($('#encryption_input').val().length === 0) {
            var newplaceholder = ['You\'ve picked a key. ', 500, '\nWrite your message here to see it in cipher.', 400]
            animateInputPlaceholder(theater, newplaceholder)
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
      } else {
        Cryptoloji.stateman.on('keypanel:key-chosen', function (key) {
          $('body').addClass('main_content_top_input-first')
          setTimeout(function () {
            $('body').removeClass('main_content_top_input-first')
          }, 800)
          Cryptoloji.UI.selectKey(key)
          $('#encryption_selected_key').html(Cryptoloji.UI.toTwemoji(key))
          // coachmark error
          if (_.isEmpty($('#encryption_input').val())) {
            Cryptoloji.UI.KeyPanel('encrypt').tooltipAnimation(key)
          } else {
            Cryptoloji.UI.encryptText()
          }
        })
      }

      $('.encryption').addClass('section-show')

      // encrypt text on input
      $('#encryption_input').bind('input propertychange', function () {
        Cryptoloji.UI.encryptText()
        if (_.isEmpty($('#encryption_input').val())) {
          emptyOutput()
        }
      })

      // show share button at proper time
      Cryptoloji.stateman.on('encrypt:show-share', function () {
        var text = $('#encryption_input').val()
        // if want to show the share button only if key modal is closed
        // if (!$('body').hasClass('main_key_modal-open')) {}
        if (!_.isEmpty(text)) {
          $('#encryption_share_button').addClass('main_share-open')
        }
      })
      Cryptoloji.stateman.on('encrypt:hide-share', function () {
        $('#encryption_share_button').removeClass('main_share-open')
      })

      Cryptoloji.stateman.on('encrypt:animate-input-placeholder', function () {
        animateInputPlaceholder(theater)
      })
      // show/hide bottom placeholder text
      Cryptoloji.stateman.on('encrypt:hide-output-placeholder', function () {
        $('.main_content_bottom_input').removeClass('placeholdit')
      })

      // empty input field
      $('#encryption_input_cleaner').on('click', function () {
        emptyInput()
        emptyOutput()
        Cryptoloji.UI.CharCounter('encrypt').resetCount()
      })

      // show input related UI elements
      $('#encryption_input').on('focus', function () {
        $('#encryption_input_cleaner').hide()
        $('#encryption_input_count').show()
      })
      $('#encryption_input').on('blur', function () {
        var text = $('#encryption_input').val()
        if (!_.isEmpty(text)) {
          $('#encryption_input_cleaner').show()
        }
      })
    },
    leave: function () {
      // Cryptoloji.stateman.emit('header:hide')
      Cryptoloji.stateman.emit('footer:hide')
      Cryptoloji.UI.KeyModal().close()
      // $('.encryption').removeClass('section-show')
      Cryptoloji.stateman.off('encrypt')
      Cryptoloji.stateman.off('keyslider')
      Cryptoloji.stateman.off('keypanel')
      Cryptoloji.stateman.off('keymodal')
      $('.section_more').removeClass('section-show')
    }
  }

  function animateInputPlaceholder (theater, text) {
    // store current placeholder
    var inputElem = $('#encryption_input')
    var encryptionInputPlaceholder = text ? text : inputElem.attr('placeholder')

    // typify placeholder (if it'is not playing yet)
    if (theater.status !== 'playing') {
      theater
        .addActor('inputPlaceholder', {speed: 1.3, accuracy: 1}, function (displayValue) {
          inputElem.attr('placeholder', displayValue)
        })
        .on('type:start', function () {
          $('body').addClass('main_content_top_input-first')
          // remove current placeholder for a cleaner start
          inputElem.attr('placeholder', '')
        })
        .addScene('inputPlaceholder:', encryptionInputPlaceholder)
        .addScene(function (done) {
          setTimeout(function () {
            $('body').removeClass('main_content_top_input-first')
            done()
          }, 400)
        })
    }
  }

  function emptyInput () {
    $('#encryption_input').val('')
    $('#encryption_input_cleaner').hide()
    $('#encryption_input_count').hide()
  }

  function emptyOutput () {
    $('#encryption_output > .emojis_output').html('')
    $('#encryption_output > .bluebox_output').html('')
    $('#encryption_output').addClass('placeholdit')
    $('.share_message_item').html('')
    $('#encryption_share_button').removeClass('main_share-open')
  }

  function scrollToSelectedKey () {
    var value = $('.keyslider .selected', $('.section-show')).position().left - Cryptoloji.utils.remToPx(1.7)
    $('.keyslider', $('.section-show')).animate({ scrollLeft: value }, 500)
  }

})(window, window.Cryptoloji, window.jQuery, window._, window.theaterJS);
