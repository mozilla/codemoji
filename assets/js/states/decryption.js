(function (window, Cryptoloji, undefined) {

  Cryptoloji.states.decryption = {}

  Cryptoloji.states.decryption.root = {
    url: 'decryption/:id',
    enter: function (options) {
      console.debug('message id is:', options.param.id)

      Cryptoloji.Api.getMessage(options.param.id)
        .then(function (result) {
          console.log(result)
          Cryptoloji.current.input = result.message
          Cryptoloji.current.correctKey = result.key
          Cryptoloji.stateman.go('decryption.welcome')
        })  
        .catch(function () { alert('cannot retrieve from server') })  
    },
    leave: function () {
      Cryptoloji.current.input = null
      Cryptoloji.current.correctKey = null
    }
  }

  Cryptoloji.states.decryption.welcome = {
    enter: function () {
      $('.section_decryption_welcome').addClass('section-show')
      Cryptoloji.stateman.emit('footer:show')
      $('#decryption_welcome_encrypted_message')
        .animate({ opacity: 0 }, 0)
        .queue(function() { $(this).html(Cryptoloji.UI.toTwemoji(Cryptoloji.current.input)).dequeue() })
        .delay(2000)
        .animate({ opacity: 1 }, 1200)
    },
    leave: function () {
      $('.section_decryption_welcome').removeClass('section-show')
      Cryptoloji.stateman.emit('footer:hide')
    }
  }

  // last selected key was wrong?
  var wrongKey = false

  Cryptoloji.states.decryption.decrypt = {
    enter: function () {
      Cryptoloji.UI.Keyslider('decrypt', '#decryption_keyslider')
        .fill(_.take(EmojiList, 10))

      $('#decryption_input').html(Cryptoloji.UI.toTwemoji(Cryptoloji.current.input))
      
      // if we should serve a smaller version
      if (!Cryptoloji.mq.matches) {

        Cryptoloji.stateman.on('keyslider:key-chosen', function (key) {
          // select corresponding emoji in keymodal
          Cryptoloji.UI.KeyModal().select(key)

          _checkDecryptionKey(key)
          Cryptoloji.UI.selectKey(key)
          Cryptoloji.UI.decryptText()
        })
        Cryptoloji.stateman.on('keymodal:key-chosen', function (key) {
          Cryptoloji.UI.Keyslider('decrypt')
            .resetSelection()
            .addKey(key).select(key)
          _scrollToSelectedKey()
          Cryptoloji.UI.selectKey(key)
          Cryptoloji.UI.decryptText()
        })

        // right key handler
        Cryptoloji.stateman.on('decrypt:right-key', function () {
          console.log('right key')
          $('body').removeClass('main_key_modal-open')
        })
      } else {
        Cryptoloji.stateman.on('keypanel:key-chosen', function (key) {
          _checkDecryptionKey(key)
          Cryptoloji.UI.selectKey(key)
          $('#decryption_selected_key').html(Cryptoloji.UI.toTwemoji(key))
          Cryptoloji.UI.decryptText()
        })
      }

      $(".section_main.decryption").addClass("section-show")

      // show reply button at proper time
      Cryptoloji.stateman.on('decrypt:show-reply', function() {
        if (!wrongKey) {
          // temp fix need to be reviewed
          $('#decryption_reply_button').css('display', 'block')
          $('#decryption_reply_button').addClass('main_share-open')
          $('#decryption_reply_button').fadeIn()
        } else {
          // temp fix need to be reviewed
          $('#decryption_reply_button').css('display', 'none')
          $('#decryption_reply_button').removeClass('main_share-open')
        }
      }) 

      // wrong key handler
      Cryptoloji.stateman.on('decrypt:wrong-key', function () {
        console.log('wrong key')
      })
    },
    leave: function () {
      $(".section_main.decryption").removeClass("section-show")
      // unregister listeners
      Cryptoloji.stateman.off('decrypt')
      Cryptoloji.stateman.off('keyslider')
    }
  }

  function _checkDecryptionKey (key) {
    if (key !== Cryptoloji.current.correctKey) {
      wrongKey = true
      Cryptoloji.stateman.emit('decrypt:wrong-key')
    } else {
      wrongKey = false
      Cryptoloji.stateman.emit('decrypt:right-key')
    }
  }

  function _scrollToSelectedKey () {
    var value = $('.keyslider .selected', $('.section-show')).position().left - Cryptoloji.utils.remToPx(1.7)
    $('.keyslider', $('.section-show')).animate({ scrollLeft: value }, 500)
  }

})(window, window.Cryptoloji); 
