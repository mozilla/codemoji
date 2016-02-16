(function (window, Cryptoloji, $, undefined) {
  
  var keyModal = null

  Cryptoloji.UI.KeyModal = function createKeyModal (selector) {
    if (!keyModal) 
      keyModal = new KeyModal(selector)
    return keyModal
  }

  function KeyModal (selector) {
    var self = this
    self.mainSelector = selector
    console.debug('creating KeyModal on ' + selector)
    self.$element = $(selector)
    // if instace .fill() has been called
    self.filled = false
    self.currentSelection = null

    _setupGlobalHandler()

    $('.main_key_modal_emoji_container', self.$element).on('click', '.key', self.onClick.bind(this))
    return self
  }

  KeyModal.prototype.addClickHandler = function addClickHandler (selector) {
    var self = this
    console.debug('attach click handler ' + selector + ' on ' + self.mainSelector)
    $(selector).click(_clickHandler)
    return self
  }

  KeyModal.prototype.close = function close () {
    var self = this
    $('body').removeClass('main_key_modal-open')
    return self
  }

  KeyModal.prototype.fill = function fill (emojis) {
    var self = this
    if (self.filled) return
    self.filled = true
    
    var text = ''
    _.each(emojis, function(elem) {
      text += _createKeyElement(elem)
    })
    $('.main_key_modal_emoji_container', self.$element).append(text)
    return self
  }

  KeyModal.prototype.onClick = function onClick (event) {
    var self = this
    var key = $(event.target).closest('.key').attr('key')
    self.select(key)
    return self
  }

  KeyModal.prototype.select = function select (key) {
    var self = this
    // select only if not already selected ( we are notifying subscribers of 
    // element selection, so we should assure to avoid "false positives" and 
    // event loops )
    if (self.currentSelection != key) {
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
    return '<p class="key" key="' + key + '">' + Cryptoloji.twemoji(key) + '</p>'
  }

  function _clickHandler (event) {
      event.stopPropagation()
      if ($('body').hasClass('main_key_modal-open')) {
        keyModal.close()
      } else {
        if (Cryptoloji.stateman.is('encrypt')) {
          $('.main_key_modal').css("height", $('.section_main.encryption .main_content_top').height())
        } else {
          $('.main_key_modal').css("height", $('.section_main.decryption .main_content_top').height())
        }
        $('body').addClass('main_key_modal-open')
      }
    }

  function _setupGlobalHandler () {
    $('body').click(function(event) { 
      if($('body').hasClass('main_key_modal-open') && !$(event.target.closest('.main_key_modal')).is('.main_key_modal')) {
        if (keyModal) {
          keyModal.close()
        }
      }        
    })
  }

})(window, window.Cryptoloji, window.jQuery); 
