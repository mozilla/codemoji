(function (window, Cryptoloji, $, undefined) {

  var keyModal = null

  Cryptoloji.UI.KeyModal = function createKeyModal (selector) {
    if (!keyModal) {
      keyModal = new KeyModal(selector)
    }
    return keyModal
  }

  function KeyModal (selector) {
    var self = this
    self.mainSelector = selector
    self.$element = $(selector)
    // if instace .fill() has been called
    self.filled = false
    self.currentSelection = null

    _setupGlobalHandler()

    var h = $('.section_main.encryption .header').height() + $('.section_main.encryption .main_content_top').height()
    $('.main_key_modal').css({height: h, y:-h-50})


    $('.main_key_modal_emoji_container', self.$element).on('click', '.key', self.onClick.bind(this))
    return self
  }

  KeyModal.prototype.addClickHandler = function addClickHandler (selector) {
    var self = this
    $(selector).click(_clickHandler)
    return self
  }

  KeyModal.prototype.close = function close () {
    var self = this
    $('body').removeClass('main_key_modal-open')
    Cryptoloji.stateman.emit('encrypt:show-share')
    var h = $('.main_key_modal').height()
    if (h > 0) {
      $('.main_key_modal').transition({y:-h, duration:750, easing:'easeInOutExpo'})
    }
    return self
  }

  KeyModal.prototype.fill = function fill (emojis) {
    var self = this
    // if element has been filled once, avoid filling again
    if (!self.filled) {
      self.filled = true
      var text = ''
      _.each(emojis, function(codePoint) { text += _createKeyElement(String.fromCodePoint(codePoint)) })
      $('.main_key_modal_emoji_container', self.$element).append(text)
    }
    return self
  }

  KeyModal.prototype.onClick = function onClick (event) {
    var self = this
    // get key value
    var key = $(event.target).closest('.key').attr('key')
    // trigger select
    self.select(key)
    return self
  }

  KeyModal.prototype.select = function select (key) {
    var self = this
    // select only if not already selected ( we are notifying subscribers of
    // element selection, so we should assure to avoid "false positives" and
    // event loops )
    if (self.currentSelection !== key) {
      // reset and clean selection
      self.resetSelection()
      // store current key
      self.currentSelection = key
      // DOM selection
      $('.main_key_modal_emoji_container .key[key="' + key + '"]', self.$element).addClass('selected')
      // notify
      Cryptoloji.stateman.emit('keymodal:key-chosen', key)
    }
    return self
  }

  KeyModal.prototype.resetSelection = function resetSelection () {
    var self = this
    self.currentSelection = null
    $('.main_key_modal_emoji_container .key', self.$element).removeClass('selected')
    return self
  }

  function _createKeyElement (key) {
    return '<p class="key" key="' + key + '">' + Cryptoloji.UI.toTwemoji(key) + '</p>'
  }

  function _clickHandler (event) {
      event.stopPropagation()
      if ($('body').hasClass('main_key_modal-open')) {
        keyModal.close()
      } else {
        var modal_height = 0
        if (Cryptoloji.stateman.is('encrypt')) {
          modal_height = $('.section_main.encryption .header').height() + $('.section_main.encryption .main_content_top').height()
          $('.main_key_modal').css('height', modal_height)
        } else {
          modal_height = $('.section_main.decryption .header').height() + $('.section_main.decryption .main_content_top').height()
          $('.main_key_modal').css('height', modal_height)
        }
        // hide share button when you open the key modal to choose a new key
        Cryptoloji.stateman.emit('encrypt:hide-share')
        $('body').addClass('main_key_modal-open')

        $('.main_key_modal').transition({y:0, duration:750, easing:'easeInOutExpo'})
      }
    }

  function _setupGlobalHandler () {
    $('body').click(function (event) {
      if ($('body').hasClass('main_key_modal-open') && !$(event.target.closest('.main_key_modal')).is('.main_key_modal')) {
        if (keyModal) {
          keyModal.close()
        }
      }
    })
  }

})(window, window.Cryptoloji, window.jQuery);
