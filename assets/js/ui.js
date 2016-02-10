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
    event.stopPropagation()
    var $self = $(event.target).closest('.key')
    var key = $self.attr('key')
    $self.addClass('selected')
    _keySelect(key)
    encryptText()
  }
  function _decryptionKeySelect(event) {
    $('.decryption .key').removeClass('selected')
    event.stopPropagation()
    var $self = $(event.target).closest('.key')
    var key = $self.attr('key')
    $self.addClass('selected')
    _keySelect(key)
    // decryptText()
  }

  //////////////////////////////////////////////////////////////////////////////
  //
  // public methods
  //
  
  function encryptText() {
    if (Cryptoloji.Encrypter.key) {
      var text = $('.encryption .main_content_top_input').val()
      if (text !== '') {
        console.debug('Chosen text:', text)
        text = Cryptoloji.encrypt(text)
        console.debug('Encrypted text:', text)
        text = Cryptoloji.twemoji(text)
        $('.encryption .main_content_bottom_input').html(text)
        $('.share_message_item').html(text)
      }
    }
  }
  
  function fillEncryptionKeyslider(emojiList) {
    var text = ''
    _.each(emojiList, function(elem) {
      text += _createKeyElement(elem)
    })
    $('#encryption_key_modal_open').before(text)
    $('#encryption_keyslider').on('click', '.key', _encryptionKeySelect)
  }

  function fillDecryptionKeyslider(emojiList) {
    var text = ''
    _.each(emojiList, function(elem) {
      text += _createKeyElement(elem)
    })
    $('#decryption_key_modal_open').before(text)
    $('#decryption_keyslider').on('click', '.key', _decryptionKeySelect)
  }

  function fillKeymodal (emojiList) {
    var text = ''
    _.each(emojiList, function(elem) {
      text += _createKeyElement(elem)
    })
    $(".main_key_modal_1").append(text)
  }



  //////////////////////////////////////////////////////////////////////////////

  Cryptoloji.UI = {
    encryptText: encryptText,
    fillEncryptionKeyslider: fillEncryptionKeyslider,
    fillDecryptionKeyslider: fillDecryptionKeyslider,
    fillKeymodal: fillKeymodal,
  }
  
})(window, window.Cryptoloji, jQuery); 
