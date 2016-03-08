(function (window, Cryptoloji, undefined) {
  'use strict'

  var linkClipboard = null
  var keyClipboard = null

  Cryptoloji.states.share = {
    canEnter: function () {
      // prevent user from entering a broken share without message and key 
      // informations. Redirect to encrypt state
      if (!Cryptoloji.current.key) {
        Cryptoloji.stateman.go('encrypt')
        return false
      }
      return true
    },
    enter: function () {
      $(".section_share").addClass("section-show")
      $('.section_share').css({y:window.innerHeight})
      setTimeout(function(){
        $('.section_share').transition({duration:750, y:0, easing:'easeInOutExpo', complete: function(){
          $("#share_more_arrow").addClass("shown")
        }})
      }, 0)


      // resize font based on screen height
      resizeEmojis()

      fillLinkForClipboardCopy()
      fillKeyForClipboardCopy()

      copyLinkToClipboardHandler()
      copyKeyToClipboardHandler()

      setupShareButtons()

      setShareModalCoordinates()

      handleShareModal()
    },
    leave: function () {
      // close the modal than exit
      if ($('.share_key').hasClass('share_key-open')) {
        $('.share_key').removeClass('share_key-open')
        $('.share_key').transition({duration:500, y:$('.share_key').height(), easing:'easeInOutExpo', complete: function(){
          $('.share_key_emoji-item').attr('id', '')
        }})
      }
      $('.section_share').transition({delay: 450, duration:750, y:window.innerHeight, easing:'easeInOutExpo', complete: function(){
        $('.section_share').removeClass('section-show')
      }})
      
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
    keyClipboard = new Clipboard('#share_copykeytoclipboard')

    keyClipboard.on('success', function(e) {
      console.log('success', e)
      e.clearSelection()

      // give feedback in place
      $('.share_key_emoji-item_feedback').text('COPIED!')
      setTimeout(function () {
        $('.share_key_emoji-item_feedback').text('')
      }, 350)
    });

    keyClipboard.on('error', function(e) {
      console.log('error', e)
      console.warn('using copy fallback')
      console.warn('Action:', e.action)
      console.warn('Trigger:', e.trigger)
      // select as fallback
      var keyVal = $(e.trigger).attr('data-clipboard-text')
      window.prompt('Copy the emoji', keyVal)
    });
  }

  function fillLinkForClipboardCopy () {
    // fill copy to clipboard link input
    // first store message and key
    Cryptoloji.storage.set('message', Cryptoloji.current.output)
    Cryptoloji.storage.set('key', Cryptoloji.current.key)
    // create URL
    var uri = new YouAreI(Cryptoloji.storage.getPersistedURL())
    uri.fragment('/landing')
    var shareURI = uri.toString()
    // fill link
    $('#share_copytoclipboard').attr('data-clipboard-text', shareURI)
    $('#share_copytoclipboard').val(shareURI)
  }

  function fillKeyForClipboardCopy () {
    $('.share_key_emoji-item').attr('data-clipboard-text', Cryptoloji.current.key)
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

  function resizeEmojis () {
    var emojiSize = $('body').height() / 480 * 100
    var emojiLength = 120
    if (Cryptoloji.current.output) {
      emojiLength = Cryptoloji.current.output.length
    }
    if (emojiLength == 1) {
      emojiSize = emojiSize * 12
    } else if (emojiLength >= 2 && emojiLength < 13) {
      emojiSize = emojiSize * 4
    } else if (emojiLength >= 13 && emojiLength < 20) {
      emojiSize = emojiSize * 3
    } else if (emojiLength >= 20 && emojiLength < 36) {
      emojiSize = emojiSize * 2
    } else if (emojiLength >= 36 && emojiLength < 60) {
      emojiSize = emojiSize * 1.7
    } else if (emojiLength >= 60 && emojiLength < 80) {
      emojiSize = emojiSize * 1.5
    } else if (emojiLength >= 80 && emojiLength < 100) {
      emojiSize = emojiSize * 1.2
    } else {
      emojiSize = emojiSize * 1
    }
    $('.share_message_item').css('font-size', emojiSize + '%')
  }
    var share_modal_height = 0
    var share_modal_margin = 0
  function setShareModalCoordinates () {
    // set the height and the top y coordinate to reach when share key modal is open
    // Cryptoloji.utils.remToPx(.5) is for add a margin
    // 23 is the magic number...
    share_modal_height = $('body').height() - $('.share_social_wrapper').position().top - $('.share_social_wrapper').height() + Cryptoloji.utils.remToPx(.5) + 23
    share_modal_margin = Cryptoloji.utils.remToPx(10)
    if (Cryptoloji.mq.matches) {
      share_modal_margin = Cryptoloji.utils.remToPx(15)
    }
    $('.share_key').css('height', share_modal_height)
    TweenLite.set($('.share_key'), {y: share_modal_height - share_modal_margin})
  }

  function handleShareModal () {
    $('#share_currentkey').on('click', function () {
      // open modal
      $('.share_key').addClass('share_key-open')
      TweenLite.to($('.share_key'), .75, {y: 0, ease:Expo.easeInOut, onComplete: function(){
        $('.share_key_emoji-item').attr('id', 'share_copykeytoclipboard')
      }})
    })
    $('#share_key_hide').on('click', function () {
      // close modal
      $('.share_key').removeClass('share_key-open')
      TweenLite.to($('.share_key'), .75, {y: share_modal_height - share_modal_margin, ease:Expo.easeInOut, onComplete: function(){
        $('.share_key_emoji-item').attr('id', '')
      }})
    })
  }

})(window, window.Cryptoloji); 
