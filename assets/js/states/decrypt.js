(function (window, Cryptoloji, undefined) {
  'use strict'
  
  // save reference to correct key
  var correctKey = null
  // last selected key was wrong?
  var wrongKey = false

  Cryptoloji.states.decrypt = {
    enter: function () {
      Cryptoloji.stateman.emit('header:show')
      $(".decryption").addClass("section-show")

      // will be retrieved from promise
      Cryptoloji.UI.showDecryptableText('😱😥😦😰 😦😰 😸 😪😢😰😰😸😤😢')
      correctKey = '😻'

      // show reply button at proper time
      Cryptoloji.stateman.on('decrypt:show-reply', function() {
        if (!wrongKey) {
          $('#decryption_reply_button').fadeIn()
        }
      })

      // notify wrong key
      Cryptoloji.stateman.on('decrypt:key-chosen', function (key) {
        if (key !== correctKey) {
          wrongKey = true
          Cryptoloji.stateman.emit('decrypt:wrong-key')
        } else {
          wrongKey = false
          Cryptoloji.stateman.emit('decrypt:right-key')
        }
      })

      Cryptoloji.stateman.on('decrypt:wrong-key', function () {
        console.log('wrong key')
      })
      Cryptoloji.stateman.on('decrypt:right-key', function () {
        console.log('right key')
      })
    },
    leave: function () {
      $(".decryption").removeClass("section-show")
    }
  }

})(window, window.Cryptoloji); 
