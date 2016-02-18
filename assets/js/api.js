(function (window, Cryptoloji, $, undefined) {

  function getMessage (id) {
    return Q.promise(function (resolve, reject) {
      var url = 'backend' + escape(id)
      url = 'backend/GET-message-id.json' // only for DEV
      $.get(url)
        .done(function (result) {
          // console.log(result)
          CryptoLib.generateEmojiSubsetFrom(result.key)
          resolve(result)
        })
        .fail(function () {
          console.error(this)
          reject()
        })
    })
  }

  Cryptoloji.Api = {
    getMessage: getMessage
  }
  
})(window, window.Cryptoloji, window.jQuery, window.Q); 
