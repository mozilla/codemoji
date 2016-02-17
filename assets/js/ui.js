(function (window, Cryptoloji, $, twemoji, undefined) {

  /*
    methods prefixed with _ are "private"
    to see exposed method goto bottom :)
  */

  //////////////////////////////////////////////////////////////////////////////
  //
  // public methods
  //

  function decryptText () {
    var text = $('#decryption_input').attr('text')
    Cryptoloji.current.input = text

    console.debug('Chosen text:', Cryptoloji.current.input)
    text = CryptoLib.decrypt(Cryptoloji.current.input, Cryptoloji.current.key)
    console.debug('Decrypted text:', text)
    Cryptoloji.current.output = text
    $('#decryption_output').removeClass('placeholdit').text(text)
    Cryptoloji.stateman.emit('decrypt:show-reply')
  }
  
  function encryptText() {
    if (Cryptoloji.current.key) {
      var text = $('#encryption_input').val()
      if (text !== '' && !/^\s+$/.test(text)) {
        Cryptoloji.current.input = text
        Cryptoloji.stateman.emit('encrypt:hide-output-placeholder')
        console.debug('Chosen text:', text)
        text = CryptoLib.encrypt(Cryptoloji.current.input, Cryptoloji.current.key)
        console.debug('Encrypted text:', text)
        Cryptoloji.current.output = text
        text = toTwemoji(text)
        $('#encryption_output').html(text)
        $('.share_message_item').html(text)
        Cryptoloji.stateman.emit('encrypt:show-share')
      }
    }
  }

  function handleHeader () {
    Cryptoloji.stateman.on('header:show', function () {
      $("#header").show()
    })
    Cryptoloji.stateman.on('header:hide', function () {
      $("#header").hide()
    })
  }

  function selectKey (key) {
    Cryptoloji.current.key = key
    console.debug('Chosen key', key)
    $(".share_key_emoji-item").html(toTwemoji(key))
  }

  function showDecryptableText (text) {
    $('#decryption_input').html(toTwemoji(text))
                          .attr('text', text)
  }




  

  function handleSvgLoading () {
    function loadSvg (element, path) {
      $.get(path)
       .done(function (result) {
          // console.log(result)
          $(element).append(result.documentElement)
          Cryptoloji.stateman.emit('svg:loaded', path)
        })
       .fail(function () {
          console.error(this)
        })
    }
    $("div[data-svg*='assets/svg']").each(function () {
      var self = this
      var path = $(self).attr('data-svg')
      // console.log(self, path)
      loadSvg(self, path)
    })

  }

  function toTwemoji (text) {
    return twemoji.parse(text, {
      folder: 'svg',
      ext:    '.svg'
    })
  }

  //////////////////////////////////////////////////////////////////////////////

  Cryptoloji.UI = {
    decryptText: decryptText,
    encryptText: encryptText,
    handleHeader: handleHeader,
    handleSvgLoading: handleSvgLoading,
    selectKey: selectKey,
    showDecryptableText: showDecryptableText,
    toTwemoji: toTwemoji
  }
  
})(window, window.Cryptoloji, window.jQuery, window.twemoji);
