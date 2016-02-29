(function (window, Cryptoloji, $, theaterJS, undefined) {
  'use strict'

  Cryptoloji.states.encrypt = {
    enter: function () {
      var theater = theaterJS()

      // Cryptoloji.stateman.emit('header:show')
      Cryptoloji.stateman.emit('footer:show') 

      // draft logic transition 
      if(Cryptoloji.mq.matches){
        // TweenLite.to($('.encryption .main_keyslider'), 0, {delay: 0, width: "0%"})
        // TweenLite.to($('.encryption .main_keyslider'), .5, {delay: 3, width: "35%"})

        // TweenLite.to($('.encryption .main_keyslider .main_key_panel_emoji_wrapper, .encryption .main_keyslider .main_keyslider_bottom_label'), 0, {delay: 0, opacity: "0"})
        // TweenLite.to($('.encryption .main_keyslider .main_key_panel_emoji_wrapper, .encryption .main_keyslider .main_keyslider_bottom_label'), .5, {delay: 4, opacity: ".5"})
        
        // TweenLite.to($('.encryption .main_content_bottom_input.placeholdit'), 0, {delay: 0, opacity: "0"})
        // TweenLite.to($('.encryption .main_content_bottom_input.placeholdit'), .5, {delay: 4, opacity: "1"})

        // TweenLite.to($('.encryption .main_content_bottom_label'), 0, {delay: 0, opacity: "0"})
        // TweenLite.to($('.encryption .main_content_bottom_label'), .5, {delay: 4, opacity: "1"})
      }

      Cryptoloji.UI.CharCounter('encrypt', '#encryption_input_count')
        .setMaxSize(Cryptoloji.settings.inputMaxSize)
        .attachTo('#encryption_input')

      // if we should serve a smaller version
      if (!Cryptoloji.mq.matches) {
        Cryptoloji.UI.Keyslider('encrypt', '#encryption_keyslider')
          .fill(_.take(EmojiList, 10))

        Cryptoloji.stateman.on('keyslider:key-chosen', function (key) {
          // select corresponding emoji in keymodal
          Cryptoloji.UI.KeyModal().select(key)
          
          if ($('#encryption_input').val().length == 0) {
            var newplaceholder = ['You\'ve picked a key.', 400, '\nWrite your message here to see it encrypted.', 600]
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
          if ($('#encryption_input').val().length == 0) {
            var newplaceholder = ['You\'ve picked a key.', 400, '\nWrite your message here to see it encrypted.', 600]
            animateInputPlaceholder(theater, newplaceholder)
          }
          Cryptoloji.UI.selectKey(key)
          $('#encryption_selected_key').html(Cryptoloji.UI.toTwemoji(key))
          Cryptoloji.UI.encryptText()
        })
      }

      $(".encryption").addClass("section-show")

      // animate input placeholder text
      animateInputPlaceholder(theater)

      // encrypt text on input
      $('#encryption_input').bind('input propertychange', function() {
        Cryptoloji.UI.encryptText()
        if (_.isEmpty($('#encryption_input').val())) {
          emptyOutput()
        }
      })

      // show share button at proper time
      if (!$('#encryption_share_button').hasClass('main_share-open')){
        $('#encryption_share_button').css('display', 'none')
        $('.main_keyslider_plus', self.$element).css('display', 'none')
      }
      Cryptoloji.stateman.on('encrypt:show-share', function() {
        if (!$('body').hasClass('main_key_modal-open')) {
          $('#encryption_share_button').css('display', 'block')
        }
        $('#encryption_share_button').addClass('main_share-open')
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
      $(".section_more").removeClass("section-show")
    }
  }

  function animateInputPlaceholder (theater, text) {
    // store current placeholder
    var inputElem = $('#encryption_input')
    var encryptionInputPlaceholder = text ? text : inputElem.attr('placeholder')

    // typify placeholder (if it'is not playing yet)
    if (theater.status !== 'playing') {
      theater
        .addActor('inputPlaceholder', {speed: 1.1, accuracy: 1}, function (displayValue) {
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
    $('#encryption_share_button').removeClass('main_share-open')
  }

  function emptyOutput () {
    $('#encryption_output > .emojis_output').html('')
    $('#encryption_output > .bluebox_output').html('')
    $('#encryption_output').addClass('placeholdit')
    $('.share_message_item').html('')
  }

  function scrollToSelectedKey () {
    var value = $('.keyslider .selected', $('.section-show')).position().left - Cryptoloji.utils.remToPx(1.7)
    $('.keyslider', $('.section-show')).animate({ scrollLeft: value }, 500)
  }

})(window, window.Cryptoloji, window.jQuery, window.theaterJS);
