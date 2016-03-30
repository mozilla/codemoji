;(function (window, Cryptoloji, $, undefined) {

  /*
    methods prefixed with _ are "private"
    to see exposed method goto bottom :)
  */


  //////////////////////////////////////////////////////////////////////////////
  //
  // public methods
  //

  function remToPx (input) {
    var remSize = parseFloat($("html").css("font-size"));
    return (remSize * input);
  }

  function resizeEmojis (message, size, item) {
    var emojiSize = $('body').height() / 480 * 100
    var emojiLength = 120
    if (message) {
      emojiLength = message.length
    }
    var molt = size
    if (emojiLength == 1) {
      emojiSize = emojiSize * molt * 12 
    } else if (emojiLength >= 2 && emojiLength < 13) {
      emojiSize = emojiSize * molt * 4 
    } else if (emojiLength >= 13 && emojiLength < 20) {
      emojiSize = emojiSize * molt * 3 
    } else if (emojiLength >= 20 && emojiLength < 36) {
      emojiSize = emojiSize * molt * 2 
    } else if (emojiLength >= 36 && emojiLength < 60) {
      emojiSize = emojiSize * molt * 1.7 
    } else if (emojiLength >= 60 && emojiLength < 80) {
      emojiSize = emojiSize * molt * 1.5 
    } else if (emojiLength >= 80 && emojiLength < 100) {
      emojiSize = emojiSize * molt * 1.2 
    } else {
      emojiSize = emojiSize * molt * 1 
    }
    $(item).css('font-size', emojiSize + '%')
  }


  //////////////////////////////////////////////////////////////////////////////

  Cryptoloji.utils = {
    remToPx: remToPx,
    resizeEmojis: resizeEmojis
  }
  
})(window, window.Cryptoloji, window.jQuery);
