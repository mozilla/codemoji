(function (window, Cryptoloji, $, undefined) {

  /*
    methods prefixed with _ are "private"
    to see exposed method goto bottom :)
  */

  function _createKeyElement (key) {
    return '<p class="key" key="' + key + '">' + Cryptoloji.twemoji(key) + '</p>'
  }
  //
  // Encrypt / key select
  //
  function _keySelect(key) {
    Cryptoloji.use_key(key)
    console.debug('Chosen key', key)
    $(".share_key_emoji-item").html(Cryptoloji.twemoji(key))
  }
  function _encryptionKeySelect(event) {
    $('.encryption .key').removeClass('selected')
    var $self = $(event.target).closest('.key')
    var key = $self.attr('key')
    $self.addClass('selected')
    _keySelect(key)
    encryptText()
  }
  function _decryptionKeySelect(event) {
    $('.decryption .key').removeClass('selected')
    var $self = $(event.target).closest('.key')
    var key = $self.attr('key')
    $self.addClass('selected')
    _keySelect(key)
    Cryptoloji.stateman.emit('decrypt:key-chosen', key)
    decryptText()
  }

  //////////////////////////////////////////////////////////////////////////////
  //
  // public methods
  //

  function decryptText () {
    var text = $('#decryption_input').attr('text')
    console.debug('Chosen text:', text)
    text = Cryptoloji.decrypt(text)
    console.debug('Decrypted text:', text)
    $('#decryption_output').removeClass('placeholdit').text(text)
    Cryptoloji.stateman.emit('decrypt:show-reply')
  }

  function emptyEncryptInput () {
    $('#encryption_input').val('')
  }

  function emptyEncryptOutput () {
    $('#encryption_output').html('').addClass('placeholdit')
    $('.share_message_item').html('')
  }
  
  function encryptText() {
    if (Cryptoloji.Encrypter.key) {
      var text = $('.encryption .main_content_top_input').val()
      if (text !== '' && !/^\s+$/.test(text)) {
        Cryptoloji.stateman.emit('encrypt:hide-output-placeholder')
        console.debug('Chosen text:', text)
        text = Cryptoloji.encrypt(text)
        console.debug('Encrypted text:', text)
        text = Cryptoloji.twemoji(text)
        $('.encryption .main_content_bottom_input').html(text)
        $('.share_message_item').html(text)
        Cryptoloji.stateman.emit('encrypt:show-share')
      } else {
        emptyEncryptOutput()
      }
    }
  }

  function encryptionInputCounter(textMaxSize) {
    $('#encryption_input_count').text(textMaxSize)
    $('#encryption_input').on('input propertychange', function (event) {
      var textSize = $('#encryption_input').val().length
      $('#encryption_input_count').text(textMaxSize-textSize)
    })
  }
  
  function fillEncryptionKeyslider(emojiList) {
    var text = ''
    _.each(emojiList, function(elem) {
      text += _createKeyElement(elem)
    })
    $('.section_main.encryptiony .keyslider_content').append(text)
    $('#encryption_keyslider').on('click', '.key', _encryptionKeySelect)
  }

  function fillDecryptionKeyslider(emojiList) {
    var text = ''
    _.each(emojiList, function(elem) {
      text += _createKeyElement(elem)
    })
    $('.section_main.decryption .keyslider_content').append(text)
    // $('#decryption_key_modal_open').before(text)
    $('#decryption_keyslider').on('click', '.key', _decryptionKeySelect)
  }

  function fillKeymodal (emojiList) {
    var text = ''
    _.times(20, function () {
      _.each(emojiList, function(elem) {
        text += _createKeyElement(elem)
      })
    })
    $(".main_key_modal_emoji_container").append(text)
  }

  function handleKeymodal () {
    $('body').click(function(event) { 
      if($('body').hasClass('main_key_modal-open') && !$(event.target.closest('.main_key_modal')).is('.main_key_modal')) {
        $('body').removeClass('main_key_modal-open')
      }        
    })

    function clickHandler (event) {
      event.stopPropagation()
      if ($('body').hasClass('main_key_modal-open')) {
        $('body').removeClass('main_key_modal-open')
      } else {
        if (Cryptoloji.stateman.current && Cryptoloji.stateman.current.name === 'encrypt') {
          $('.main_key_modal').css("height", $('.section_main.encryption .main_content_top').height())
        } else {
          $('.main_key_modal').css("height", $('.section_main.decryption .main_content_top').height())
        }
        $('body').addClass('main_key_modal-open')
      }
    }

    $('#encryption_key_modal_open').click(clickHandler)
    $('#decryption_key_modal_open').click(clickHandler)

    $('.main_key_modal_emoji_container').on('click', '.key', function (event) {
      // remove selected from keyslider
      $('.keyslider .key').removeClass('selected')
      var $self = $(event.target).closest('.key')
      var key = $self.attr('key')
      $self.addClass('selected')
      _keySelect(key)
      if (Cryptoloji.stateman.current && Cryptoloji.stateman.current.name === 'encrypt') {
        encryptText()
      } else {
        Cryptoloji.stateman.emit('decrypt:key-chosen', key)
        decryptText()
      }

    })
  }

  function handleKeysliderMore () {
    $('.keyslider').on("scroll", function(){
      if (!$('body').hasClass("main_keyslider_plus-show")){
        $('body').addClass("main_keyslider_plus-show")
      }
    })
  }

  function handleHeader () {
    Cryptoloji.stateman.on('header:show', function () {
      $("#header").show()
    })
    Cryptoloji.stateman.on('header:hide', function () {
      $("#header").hide()
    })
  }

  function showDecryptableText (text) {
    $('#decryption_input').html(Cryptoloji.twemoji(text))
                          .attr('text', text)
  }

  //////////////////////////////////////////////////////////////////////////////

  Cryptoloji.UI = {
    decryptText: decryptText,
    emptyEncryptInput: emptyEncryptInput,
    emptyEncryptOutput: emptyEncryptOutput,
    encryptText: encryptText,
    encryptionInputCounter: encryptionInputCounter,
    fillEncryptionKeyslider: fillEncryptionKeyslider,
    fillDecryptionKeyslider: fillDecryptionKeyslider,
    fillKeymodal: fillKeymodal,
    handleKeymodal: handleKeymodal,
    handleKeysliderMore: handleKeysliderMore,
    handleHeader: handleHeader,
    showDecryptableText: showDecryptableText,
  }
  
})(window, window.Cryptoloji, jQuery); 
