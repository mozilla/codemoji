(function (window, Cryptoloji, undefined) {
  'use strict'
  
  // save reference to correct key
  var correctKey = null
  // last selected key was wrong?
  var wrongKey = false

  Cryptoloji.states.decrypt = {
    canEnter: function () {
      // verify a message is present in the storage
      if (_.isUndefined(Cryptoloji.storage.get('message')) || _.isEmpty(Cryptoloji.storage.get('message'))) {
        // if not redirect to not found state
        Cryptoloji.stateman.go('welcome')
      }
    },
    enter: function (options) {

      $('.decrypt_feedback').css({y:200})
      
      // Cryptoloji.stateman.emit('header:show')
      Cryptoloji.stateman.emit('footer:show') 

      // transition 
      Cryptoloji.UI.encryptionEnteringTransition('decryption')

      // if we should serve a smaller version
      if (!Cryptoloji.mq.matches) {
        Cryptoloji.UI.Keyslider('decrypt', '#decryption_keyslider')
          .fill(keysliderEmojiList)
      }
      $(".decryption").addClass("section-show")

      initFromStorage()

      Cryptoloji.stateman.on('keyslider:key-chosen', function (key) {
        // select corresponding emoji in keymodal
        Cryptoloji.UI.KeyModal().select(key)
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
      Cryptoloji.stateman.on('decrypt:show-reply', function(key) {
        if (key !== correctKey) {
          wrongKey = true
          Cryptoloji.stateman.emit('decrypt:wrong-key')
        } else {
          wrongKey = false
          Cryptoloji.stateman.emit('decrypt:right-key')
        }
      })

      // wrong key handler
      Cryptoloji.stateman.on('decrypt:wrong-key', function () {
        console.log('wrong key')
        $('.main_share').removeClass('main_share-visible')

        var y = $('.decrypt_feedback').css('y')
        if(y == '0px'){
          $('.decrypt_feedback').css({scale:1.1})
          $('.decrypt_feedback').transition({duration:1000, scale:1, easing:'easeOutExpo'})
        }else{
          $('.decrypt_feedback').transition({duration:1000, y:0, easing:'easeInOutExpo'})
        }
      })

      // right key handler
      Cryptoloji.stateman.on('decrypt:right-key', function () {
        console.log('right key')
        $('body').removeClass('main_key_modal-open')

        $('.decrypt_feedback').transition({duration:1000, y:200, easing:'easeInOutExpo'})

        TweenLite.from($('.main_content_bottom'), .75, {backgroundColor:'#FAFAFA', ease:Expo.easeInOut})

        $('.main_share').addClass('main_share-visible')
      })
    },
    leave: function () {
      $(".decryption").removeClass("section-show")
      Cryptoloji.stateman.emit('footer:hide')
      Cryptoloji.UI.KeyModal().close()
      // unregister listeners
      Cryptoloji.stateman.off('decrypt')
      Cryptoloji.stateman.off('keyslider')
      Cryptoloji.stateman.off('keypanel')
      Cryptoloji.stateman.off('keymodal')
      $('.section_more').removeClass('section-show')
      // reset current object before proceeding
      Cryptoloji.current = { input: null, output: null, key: null }
      // reset main share
      $('.main_share').removeClass('main_share-visible')
    }
  }

  function scrollToSelectedKey () {
    var value = $('.keyslider .selected', $('.section-show')).position().left - Cryptoloji.utils.remToPx(1.7)
    $('.keyslider', $('.section-show')).animate({ scrollLeft: value }, 500)
  }

  function initFromStorage () {
    Cryptoloji.UI.showDecryptableText(Cryptoloji.storage.get('message'))
    correctKey = Cryptoloji.storage.get('key')
    CryptoLib.generateEmojiSubsetFrom(correctKey)
  }

})(window, window.Cryptoloji); 
