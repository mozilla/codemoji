(function (window, Cryptoloji, undefined) {
  
  Cryptoloji.decrypt = function decrypt (text, key) {
    return this.Encrypter.decrypt(text, key)
  }

  Cryptoloji.encrypt = function encrypt (text, key) {
    return this.Encrypter.encrypt(text, key)
  }
  
  Cryptoloji.twemoji = function twemoji (text) {
    return window.twemoji.parse(text, {
      folder: 'svg',
      ext:    '.svg'
    })
  }

  Cryptoloji.use_key = function use_key (key) {
    return this.Encrypter.key = key
  }

})(window, window.Cryptoloji); 
