(function (window, Cryptoloji, $, undefined) {
  
  var sharers = {}

  Cryptoloji.UI.Sharer = function createSharer (name, selector) {
    if (!sharers[name]) 
      sharers[name] = new Sharer(name, selector)
    return sharers[name]
  }

  function Sharer (name, selector) {
    var self = this
    self.name = name
    self.$element = $(selector)

    self.openWindow = true
    self.shareLink = null
    self.params = {}
    self.separator = '?'

    return self
  }

  Sharer.prototype.addParam = function addParam (name, value) {
    var self = this
    self.params[name] = value
    return self
  }

  Sharer.prototype.bind = function bind () {
    var self = this
    self.$element.on('click', self.onClick.bind(self))
    return self
  }

  Sharer.prototype.onClick = function onClick (event) {
    var self = this

    if (self.shareLink) {
      var i = 575,
          n = 350,
          r = screen.width / 2 - i / 2,
          s = screen.height / 2 - n / 2;

      var link = self.shareLink + self.separator
      var keys = _.keys(self.params)
      _.each(keys, function (key, idx) {
        link += key + '=' + encodeURIComponent(self.params[key])
        if (idx < keys.length - 1)
          link += '&'
      })
      console.log('share link:', link)
      if (self.openWindow) {
        event.preventDefault()
        window.open(link, 
          "_blank", 
          "height=" + n + ",width=" + i + ",top=" + s + ",left=" + r)
      } else {
        self.$element.attr('href', link)
      }
    }

    return self
  }

  Sharer.prototype.sameWindow = function sameWindow () {
    var self = this
    self.openWindow = false
    return self
  }

  Sharer.prototype.setShareLink = function setShareLink (link) {
    var self = this
    self.shareLink = link
    return self
  }

  Sharer.prototype.unbind = function unbind () {
    var self = this
    self.$element.off()
  }

  Sharer.prototype.setSeparator = function setSeparator (sep) {
    var self = this
    self.separator = sep
    return self
  }

})(window, window.Cryptoloji, window.jQuery); 
