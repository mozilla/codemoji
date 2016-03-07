(function (window, Cryptoloji, undefined) {
  'use strict'
  
  Cryptoloji.states.landing = {
    canEnter: function () {
      console.log(Cryptoloji.storage.get('message'))
      // verify a message is present in the storage
      if (_.isUndefined(Cryptoloji.storage.get('message')) || _.isEmpty(Cryptoloji.storage.get('message'))) {
        // if not redirect to not found state
        Cryptoloji.stateman.go('404')
      }
    },
    enter: function () {
      fillMessage()

      $(".section_landing").addClass("section-show")
      Cryptoloji.stateman.emit('footer:show') 
    },
    leave: function () {
      $(".section_landing").removeClass("section-show")
      Cryptoloji.stateman.emit('footer:hide') 
    }
  }

  function fillMessage () {
    var message = Cryptoloji.storage.get('message')
    $('#landing_encrypted_message').html(Cryptoloji.UI.toTwemoji(message))
  }

})(window, window.Cryptoloji); 







