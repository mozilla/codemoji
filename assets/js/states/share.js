(function (window, Cryptoloji, undefined) {
  'use strict'

  var linkClipboard = null
  var keyClipboard = null

  Cryptoloji.states.share = {
    enter: function () {
      $(".section_share").addClass("section-show")
      setTimeout(function(){
        $("#share_more_arrow").addClass("shown")
      }, 0)

      // fillLinkForClipboardCopy()
      fillKeyForClipboardCopy()

      copyLinkToClipboardHandler()
      copyKeyToClipboardHandler()

      setupShareButtons()
    },
    leave: function () {
      $(".section_share").removeClass("section-show")
      linkClipboard.destroy()
      keyClipboard.destroy()

      // sharer cleanup
      Cryptoloji.UI.Sharer('facebook').unbind()
      Cryptoloji.UI.Sharer('twitter').unbind()
      Cryptoloji.UI.Sharer('gplus').unbind()
      // Cryptoloji.UI.Sharer('tumblr').unbind()
      Cryptoloji.UI.Sharer('whatsapp').unbind()
      Cryptoloji.UI.Sharer('mail').unbind()
    }
  }

  function copyLinkToClipboardHandler () {
    linkClipboard = new Clipboard('#share_copytoclipboard')

    linkClipboard.on('success', function(e) {
      e.clearSelection()

      // give feedback in place
      var oldVal = $(e.trigger).val()
      $(e.trigger).val('COPIED!')
      setTimeout(function () {
        $(e.trigger).val(oldVal)
      }, 350)
    });

    linkClipboard.on('error', function(e) {
      console.warn('using copy fallback')
      console.warn('Action:', e.action)
      console.warn('Trigger:', e.trigger)
      // select as fallback
      var input = e.trigger
      input.focus()
      input.setSelectionRange(0, 50)
    });
  }

  function copyKeyToClipboardHandler () {
    function selectText(element){
      var doc = document,
      text = doc.getElementById(element),
      range,
      selection;
      if (doc.body.createTextRange) { //ms
        range = doc.body.createTextRange();
        range.moveToElementText(text);
        range.select();
      } else if (window.getSelection) { //all others
        selection = window.getSelection();
        range = doc.createRange();
        range.selectNodeContents(text);
        selection.removeAllRanges();
        selection.addRange(range);
      }
    }

    keyClipboard = new Clipboard('#share_copykeytoclipboard')

    keyClipboard.on('success', function(e) {
      e.clearSelection()

      // give feedback in place
      var oldVal = $(e.trigger).text()
      $(e.trigger).text('COPIED!')
      setTimeout(function () {
        $(e.trigger).text(oldVal)
      }, 350)
    });

    keyClipboard.on('error', function(e) {
      console.warn('using copy fallback')
      console.warn('Action:', e.action)
      console.warn('Trigger:', e.trigger)
      // select as fallback
      selectText('share_currentkey')
    });
  }

  function fillLinkForClipboardCopy () {
    // fill copy to clipboard link input
  }

  function fillKeyForClipboardCopy () {
    $('#share_copykeytoclipboard').attr('data-clipboard-text', Cryptoloji.current.key)
  }

  function setupShareButtons () {
    Cryptoloji.UI.Sharer('facebook', '#share_button_fb')
      .setShareLink('https://www.facebook.com/sharer/sharer.php')
      .addParam('u', 'http://crypt.ji/F937U2M9')
      .bind()
    Cryptoloji.UI.Sharer('twitter', '#share_button_tw')
      .setShareLink('https://twitter.com/intent/tweet')
      .addParam('url', 'http://crypt.ji/F937U2M9')
      .addParam('text', 'a message')
      .bind()
    Cryptoloji.UI.Sharer('gplus', '#share_button_go')
      .setShareLink('https://plus.google.com/share')
      .addParam('url', 'http://crypt.ji/F937U2M9')
      .bind()
    // Cryptoloji.UI.Sharer('tumblr', '#share_button_tu')
    //   .setShareLink('https://www.tumblr.com/widgets/share/tool')
    //   .addParam('canonicalUrl', 'http://crypt.ji/F937U2M9')
    //   .addParam('posttype', 'link')
    //   .addParam('tags', 'mozilla,cryptoloji')
    //   .addParam('description', 'a message')
    //   .bind()
    Cryptoloji.UI.Sharer('whatsapp', '#share_button_wa')
      .sameWindow()
      .setShareLink('whatsapp://send')
      .addParam('text', 'http://crypt.ji/F937U2M9')
      .bind()
    Cryptoloji.UI.Sharer('mail', '#share_button_ma')
      .sameWindow()
      .setShareLink('mailto:')
      .addParam('subject', 'A secret message')
      .addParam('body', 'http://crypt.ji/F937U2M9')
      .bind()
  }

})(window, window.Cryptoloji); 
