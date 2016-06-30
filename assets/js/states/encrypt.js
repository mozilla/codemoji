(function (window, Cryptoloji, $, _, theaterJS, undefined) {
  'use strict'

  Cryptoloji.states.encrypt = {
    enter: function () {
      var theater = theaterJS()

      $('.coachmark').hide()
      if (!_.isEmpty(Cryptoloji.current.output)) {
        $('.main_share').addClass('main_share-visible')
      }

      if (Cryptoloji.stateman.previous.name === 'welcome'){
        $('#encryptHeader').css({y:-300})
        setTimeout(function(){
              $('#encryptHeader').transition({y:0, duration:1000, delay:250, easing:'easeInOutExpo'})
        },0)
      }

      // Cryptoloji.stateman.emit('header:show')
      Cryptoloji.stateman.emit('footer:show')
      Cryptoloji.stateman.emit('header:hide')

      // transition
      if (Cryptoloji.stateman.previous.name !== 'share') {
        Cryptoloji.UI.encryptionEnteringTransition('encryption')
      } else if (Cryptoloji.mq.matches){
        $('.coachmark').show()
      }
      if (Cryptoloji.mq.matches) {
        $('.encryption_help_button').show()
        TweenLite.to($('.encryption_help_button'), 1.25, {opacity: 1, ease:Elastic.easeInOut})
      }

      Cryptoloji.UI.CharCounter('encrypt', '#encryption_input_count')
        .setMaxSize(Cryptoloji.settings.inputMaxSize)
        .attachTo('#encryption_input')

      // if we should serve a smaller version
      if (!Cryptoloji.mq.matches) {
        animateInputPlaceholder(theater)

        Cryptoloji.UI.Keyslider('encrypt', '#encryption_keyslider')
          .fill(keysliderEmojiList)

        Cryptoloji.stateman.on('keyslider:key-chosen', function (key) {
          if ($('#encryption_input').val().length === 0) {
            var newplaceholder = ['You\'ve picked a key. ', 500, '\nWrite your message here to see it in cipher.', 400]
            animateInputPlaceholder(theater, newplaceholder)
            Cryptoloji.stateman.emit('encrypt:key_soon')
          }
          // check if the key is already being selected
          // this avoid multiple call from slider and modal
          var currkey = Cryptoloji.current.key
          if (Cryptoloji.current.key !== key) {
            Cryptoloji.UI.selectKey(key)

            Cryptoloji.stateman.emit('encrypt:key', currkey)

            // select corresponding emoji in keymodal
            Cryptoloji.UI.KeyModal().select(key)

            Cryptoloji.UI.encryptText()
          }
        })

        Cryptoloji.stateman.on('keymodal:key-chosen', function (key) {
          // check if the key is already being selected
          // this avoid multiple call from slider and modal
          var currkey = Cryptoloji.current.key
          if (Cryptoloji.current.key !== key) {
            Cryptoloji.UI.selectKey(key)

            Cryptoloji.stateman.emit('encrypt:key', currkey)

            Cryptoloji.UI.Keyslider('encrypt')
              .resetSelection()
              .addKey(key).select(key).scrollToSelectedKey()

            Cryptoloji.UI.encryptText()
          }
        })
      } else {
        Cryptoloji.stateman.on('keypanel:key-chosen', function (key) {
          var currkey = Cryptoloji.current.key
          Cryptoloji.UI.selectKey(key)
          Cryptoloji.stateman.emit('encrypt:key', currkey)
          $('#encryption_selected_key').html(Cryptoloji.UI.toTwemoji(key))
          // coachmark error
          if (_.isEmpty($('#encryption_input').val())) {
            $('body').addClass('main_content_top_input-first')
            setTimeout(function () {
              $('body').removeClass('main_content_top_input-first')
              $('#encryption_input').focus()
            }, 800)
            Cryptoloji.UI.KeyPanel('encrypt').tooltipAnimation(key)
          } else {
            Cryptoloji.UI.encryptText()
          }
        })
      }

      $('.encryption').addClass('section-show')

      // encrypt text on input
      $('#encryption_input').bind('input propertychange', _.debounce(function () {
        Cryptoloji.UI.encryptText()
        if (_.isEmpty($('#encryption_input').val())) {
          emptyOutput()
        }
      }, 350))

      // show share button at proper time
      Cryptoloji.stateman.on('encrypt:show-share', function () {
        var text = $('#encryption_input').val()
        // if want to show the share button only if key modal is closed
        // if (!$('body').hasClass('main_key_modal-open')) {}
        if (!_.isEmpty(text)) {
          $('.main_share').addClass('main_share-visible')
        }
      })
      Cryptoloji.stateman.on('encrypt:hide-share', function () {
        $('.main_share').removeClass('main_share-visible')
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
      $('.encryption').removeClass('section-show')
      Cryptoloji.stateman.off('encrypt')
      Cryptoloji.stateman.off('keyslider')
      Cryptoloji.stateman.off('keypanel')
      Cryptoloji.stateman.off('keymodal')
      TweenLite.to($('.encryption_help_button'), 1.25, {opacity: 0, ease:Elastic.easeInOut, onComplete: function () {
        $('.encryption_help_button').hide()
      }})
      $('.section_more').removeClass('section-show')
      // reset main share
      $('.main_share').removeClass('main_share-visible')
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
    $('.main_share').removeClass('main_share-visible')
  }

})(window, window.Cryptoloji, window.jQuery, window._, window.theaterJS);
