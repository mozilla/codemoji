(function (window, Cryptoloji, undefined) {
  'use strict'
  
  // save reference to correct key
  var correctKey = null
  // last selected key was wrong?
  var wrongKey = false

  Cryptoloji.states.decrypt = {
    enter: function (options) {
      // Cryptoloji.stateman.emit('header:show')
      Cryptoloji.stateman.emit('footer:show') 

      // if we should serve a smaller version
      if (!Cryptoloji.mq.matches) {
        Cryptoloji.UI.Keyslider('decrypt', '#decryption_keyslider')
          .fill(_.take(EmojiList, 10))
      }
      $(".decryption").addClass("section-show")


      Cryptoloji.Api.getMessage(options.param.id)
        .then(function (result) {
          Cryptoloji.UI.showDecryptableText(result.message)
          correctKey = result.key
        })  
        .catch(function () { alert('cannot retrieve from server') })   

      Cryptoloji.stateman.on('keyslider:key-chosen', function (key) {
        // select corresponding emoji in keymodal
        Cryptoloji.UI.KeyModal().select(key)

        if (key !== correctKey) {
          wrongKey = true
          Cryptoloji.stateman.emit('decrypt:wrong-key')
        } else {
          wrongKey = false
          Cryptoloji.stateman.emit('decrypt:right-key')
        }
        Cryptoloji.UI.selectKey(key)
        Cryptoloji.UI.decryptText()
      })
      Cryptoloji.stateman.on('keymodal:key-chosen', function (key) {
        Cryptoloji.UI.Keyslider('decrypt')
          .resetSelection()
          .addKey(key).select(key)
        scrollToSelectedKey()
        Cryptoloji.UI.selectKey(key)
        Cryptoloji.UI.decryptText()
      })
      Cryptoloji.stateman.on('keypanel:key-chosen', function (key) {
        Cryptoloji.UI.Keyslider('decrypt')
          .resetSelection()
        Cryptoloji.UI.selectKey(key)
        $('#decryption_selected_key').html(Cryptoloji.UI.toTwemoji(key))
        Cryptoloji.UI.decryptText()
      })

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

      // right key handler
      Cryptoloji.stateman.on('decrypt:right-key', function () {
        console.log('right key')
        $('body').removeClass('main_key_modal-open')
      })
    },
    leave: function () {
      $(".decryption").removeClass("section-show")
      // unregister listeners
      Cryptoloji.stateman.off('decrypt')
      Cryptoloji.stateman.off('keyslider')
    }
  }

  function scrollToSelectedKey () {
    var value = $('.keyslider .selected', $('.section-show')).position().left - Cryptoloji.utils.remToPx(1.7)
    $('.keyslider', $('.section-show')).animate({ scrollLeft: value }, 500)
  }

})(window, window.Cryptoloji); 
