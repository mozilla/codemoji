(function (window, Cryptoloji, $, undefined) {
  
  var keyPanel = {}

  Cryptoloji.UI.KeyPanel = function createKeyPanel (name, selector) {
    if (!keyPanel[name]) 
      keyPanel[name] = new KeyPanel(name, selector)
    return keyPanel[name]
  }

  function KeyPanel (selector) {
    var self = this
    self.mainSelector = selector
    self.$element = $(selector)
    // if instace .fill() has been called
    self.filled = false
    self.currentSelection = null

    $('.main_key_panel_emoji_container', self.$element).on('click', '.key', self.onClick.bind(this))
    return self
  }

  KeyPanel.prototype.fill = function fill (emojis) {
    var self = this
    // if element has been filled once, avoid filling again
    if (!self.filled) {
      self.filled = true
      var text = ''
      _.each(emojis, function(codePoint) { text += _createKeyElement(String.fromCodePoint(codePoint)) })
      $('.main_key_panel_emoji_container', self.$element).append(text)
    }
    return self
  }

  KeyPanel.prototype.onClick = function onClick (event) {
    var self = this
    // get key value
    var key = $(event.target).closest('.key').attr('key')
    // trigger select
    self.select(key)
    return self
  }

  KeyPanel.prototype.select = function select (key) {
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
      $('.main_key_panel_emoji_container .key[key="' + key + '"]', self.$element).addClass('selected')
      // notify
      Cryptoloji.stateman.emit('keypanel:key-chosen', key)
    }
    return self
  }

  var _tooltipTimeout = null
  KeyPanel.prototype.tooltipAnimation = function tooltipAnimation (key) {
    // get the selected key
    key = $('.main_key_panel_emoji_container .key[key="' + key + '"]', self.$element).addClass('notext')
    var x = key.offset().left
    var y = key.offset().top

    // aggiorna Cryptoloji.UI.tooltipPosition
    if ( Cryptoloji.UI.tooltipPosition.top === 0 && Cryptoloji.UI.tooltipPosition.left === 0){
      TweenLite.set($("#tooltip_panel"), {display: "block", opacity: 1})
      TweenLite.to($("#tooltip_panel"), 0, {x: x - 70,y: y - 85})
      Cryptoloji.UI.tooltipPosition.top = y
      Cryptoloji.UI.tooltipPosition.left = x
    } else {
      TweenLite.set($("#tooltip_panel"), {display: "block", opacity: 1})
      TweenLite.to($("#tooltip_panel"), .4, {x: x - 70,y: y - 85})
    }
    if (_tooltipTimeout) {
      clearTimeout(_tooltipTimeout)
    }
    $("#encryption_keypanel .main_key_panel_emoji_container").bind("scroll", function () {
      TweenLite.to($("#tooltip_panel"), .3, {opacity: 0, onComplete: function(){
        TweenLite.set($("#tooltip_panel"), {display: "none"})
        Cryptoloji.UI.tooltipPosition = { top : 0, left: 0}
      }})
    })
    _tooltipTimeout = setTimeout(function() {
      TweenLite.to($("#tooltip_panel"), 1, {opacity: 0, onComplete: function(){
        TweenLite.set($("#tooltip_panel"), {display: "none"})
        Cryptoloji.UI.tooltipPosition = { top : 0, left: 0}
      }})
    }, 2000);
  }

  KeyPanel.prototype.resetSelection = function resetSelection () {
    var self = this
    self.currentSelection = null
    $('.main_key_panel_emoji_container .key', self.$element).removeClass('selected')
    $('.main_key_panel_emoji_container .key', self.$element).removeClass('notext')
    return self
  }

  function _createKeyElement (key) {
    return '<p class="key" key="' + key + '">' + Cryptoloji.UI.toTwemoji(key) + '</p>'
  }

})(window, window.Cryptoloji, window.jQuery); 
