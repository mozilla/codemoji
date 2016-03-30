(function (window, Cryptoloji, $, undefined) {

  var keysliders = {}

  Cryptoloji.UI.Keyslider = function createKeyslider (name, selector) {
    if (!keysliders[name]) 
      keysliders[name] = new Keyslider(name, selector)
    return keysliders[name]
  }

  var Keyslider = function Keyslider (name, selector) {
    var self = this
    self.$element = $(selector)

    // if instace .fill() has been called
    self.filled = false

    self.$element.on('click', '.key', self.onClick.bind(this))

    var keysliderMore = {
      width: 5.5,
      margin: 0.5
    }
    $('.keyslider_content', self.$element).css('padding-right', keysliderMore.width + keysliderMore.margin + 'rem')
    var offset = Cryptoloji.utils.remToPx(keysliderMore.width);


    $('.keyslider', self.$element).on('scroll', function() {
      if ($('.keyslider')[0].scrollWidth - $('.keyslider')[0].offsetWidth <= $('.keyslider', self.$element).scrollLeft() + offset){
        self.$element.addClass("main_keyslider_plus-show")
        $('.main_keyslider_plus', self.$element).css('width', keysliderMore.width + 'rem')
      }
    })

    return self
  }

  Keyslider.prototype.addKey = function addKey (key) {
    var self = this
    if ($('.keyslider .key[key="' + key + '"]', self.$element).length < 1)
      $('.keyslider_content', self.$element).append(_createKeyElement(key))
    return self
  }

  Keyslider.prototype.fill = function fill (emojis) {
    var self = this
    if (self.filled) return
    self.filled = true
    
    var text = ''
    _.each(emojis, function(codePoint) { text += _createKeyElement(String.fromCodePoint(codePoint)) })
    $('.keyslider_content', self.$element).append(text)
  }

  Keyslider.prototype.onClick = function onClick (event) {
    var self = this
    var key = $(event.target).closest('.key').attr('key')
    self.select(key)
  }

  Keyslider.prototype.select = function select (key) {
    var self = this
    self.resetSelection()
    $('.keyslider .key[key="' + key + '"]', self.$element).addClass('selected')
    Cryptoloji.stateman.emit('keyslider:key-chosen', key)
    return self
  }

  Keyslider.prototype.resetSelection = function resetSelection () {
    var self = this
    $('.key', self.$element).removeClass('selected')
    return self
  }

  Keyslider.prototype.scrollToSelectedKey = function scrollToSelectedKey () {
    var value = $('.keyslider .selected', $('.section-show')).position().left - Cryptoloji.utils.remToPx(1.7)
    $('.keyslider', $('.section-show')).animate({ scrollLeft: value }, 500)
  }

  function _createKeyElement (key) {
    return '<p class="key" key="' + key + '">' + Cryptoloji.UI.toTwemoji(key) + '</p>'
  }
  
})(window, window.Cryptoloji, window.jQuery); 
