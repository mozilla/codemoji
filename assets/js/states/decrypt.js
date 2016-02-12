(function (window, Cryptoloji, undefined) {
  'use strict'
  
  // save reference to correct key
  var correctKey = null
  // last selected key was wrong?
  var wrongKey = false

  Cryptoloji.states.decrypt = {
    enter: function (options) {
      Cryptoloji.stateman.emit('header:show')

      Cryptoloji.UI.Keyslider('decrypt', '#decryption_keyslider')
        .fill(_.take(emojiList, 10))
      
      $(".decryption").addClass("section-show")


      Cryptoloji.Api.getMessage(options.param.id)
        .then(function (result) {
          Cryptoloji.UI.showDecryptableText(result.message)
          correctKey = result.key
        })  
        .catch(function () { alert('cannot retrieve from server') })   

      Cryptoloji.stateman.on('keyslider:key-chosen', function (key) {
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

      // show reply button at proper time
      Cryptoloji.stateman.on('decrypt:show-reply', function() {
        if (!wrongKey)
          $('#decryption_reply_button').fadeIn()
      })

      // wrong key handler
      Cryptoloji.stateman.on('decrypt:wrong-key', function () {
        console.log('wrong key')
      })

      // right key handler
      Cryptoloji.stateman.on('decrypt:right-key', function () {
        console.log('right key')
      })
    },
    leave: function () {
      $(".decryption").removeClass("section-show")
      // unregister listeners
      Cryptoloji.stateman.off('decrypt')
      Cryptoloji.stateman.off('keyslider')
    }
  }

})(window, window.Cryptoloji); 
