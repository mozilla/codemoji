(function (window, Cryptoloji, $, undefined) {

  var keysliders = {}

  Cryptoloji.UI.Keyslider = function createKeyslider (name, selector) {
    keysliders[name] = new Keyslider(name, selector)
    return keysliders[name]
  }

  var Keyslider = function Keyslider (name, selector) {
    var self = this
    console.debug('creating keyslider ' + name + ' on ' + selector)
    self.$element = $(selector)

    // if instace .fill() has been called
    self.filled = false

    self.$element.on('click', '.key', self.onClick)
    
    $('.keyslider', self.$element).on('scroll', function() {
      if (!self.$element.hasClass('main_keyslider_plus-show')){
        self.$element.addClass("main_keyslider_plus-show")
      }
    })

    return self
  }

  Keyslider.prototype.fill = function fill (emojis) {
    var self = this
    if (self.filled) return
    self.filled = true
    
    var text = ''
    _.each(emojis, function(elem) {
      text += _createKeyElement(elem)
    })
    $('.keyslider_content', self.$element).append(text)
  }

  Keyslider.prototype.onClick = function onClick (event) {
    var self = this
    $('.key', self.$element).removeClass('selected')
    var $self = $(event.target).closest('.key')
    var key = $self.attr('key')
    $self.addClass('selected')
    Cryptoloji.stateman.emit('keyslider:key-chosen', key)
  }

  function _createKeyElement (key) {
    return '<p class="key" key="' + key + '">' + Cryptoloji.twemoji(key) + '</p>'
  }
  
})(window, window.Cryptoloji, window.jQuery); 
