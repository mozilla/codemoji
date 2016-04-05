(function (window, Cryptoloji, undefined) {
  'use strict'

  var linkClipboard = null
  var linkClipboardCta = null
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
      $('.section_main.encryption').addClass('section-show')
      $(".section_share").addClass("section-show")
      $('.section_share').css({
             y: window.innerHeight,
        height: window.innerHeight-$('#encryptHeader').innerHeight()
      })
      setTimeout(function(){
        $('.section_share').transition({duration:750, y:$('#encryptHeader').innerHeight(), easing:'easeInOutExpo', complete: function(){
          $("#share_more_arrow").addClass("shown")
        }})
      }, 0)

      // prevent href navigation on click n share link
      $('#share_copytoclipboard').click(function (e) {
        e.preventDefault()
        $('#share_copyIosHint').css({scale:1.25, opacity:1})
        $('#share_copyIosHint').transition({scale:1, opacity:.65, duration:900, easing:'easeInOutExpo'})
      })

      // resize font based on screen height
      Cryptoloji.utils.resizeEmojis(Cryptoloji.current.output, .5, '.share_message_item')

      fillLinkForClipboardCopy()
      fillKeyForClipboardCopy()

      // don't handle copy to clipboard if ios
      if (!iosTest()) {
        copyLinkToClipboardHandler()
        copyKeyToClipboardHandler()
      }

      setupShareButtons()

      // share modal is fixed in desktop layout
      if (Cryptoloji.mq.matches) {
        $('.share_key').addClass('share_key-open')
        $('.share_key_emoji-item').attr('id', 'share_copykeytoclipboard')
      } else {
        setShareModalCoordinates()
        handleShareModal()
      }
    },
    leave: function () {
      $('.section_main.encryption').removeClass('section-show')

      // only in mobile
      if (!Cryptoloji.mq.matches) {
        // close the modal than exit
        if ($('.share_key').hasClass('share_key-open')) {
          $('.share_key').removeClass('share_key-open')
          $('.share_key').transition({duration:500, y:$('.share_key').height(), easing:'easeInOutExpo', complete: function(){
            $('.share_key_emoji-item').attr('id', '')
          }})
        }
      }
      $('.section_share').transition({delay: 0, duration:750, y:window.innerHeight, easing:'easeInOutExpo', complete: function(){
        $('.section_share').removeClass('section-show')
      }})
      
      // don't handle copy to clipboard if ios
      if (!iosTest()) {
        linkClipboard.destroy()
        keyClipboard.destroy()
      }

      // sharer cleanup
      Cryptoloji.UI.Sharer('facebook').unbind()
      Cryptoloji.UI.Sharer('twitter').unbind()
      Cryptoloji.UI.Sharer('gplus').unbind()
      Cryptoloji.UI.Sharer('whatsapp').unbind()
      Cryptoloji.UI.Sharer('mail').unbind()
      Cryptoloji.UI.Sharer('sms').unbind()

      $('#share_copytoclipboard').off()
    }
  }

  function copyLinkToClipboardHandler () {
    function _success (e) {
      console.log(e)
      e.clearSelection()

      // give feedback in place
      var oldVal = $('#share_copytoclipboard').text()
      $('#share_copytoclipboard').text('Copied!')
      $('#share_copytoclipboard').css({scale:1.25})
      $('#share_copytoclipboard').transition({scale:1, duration:900, easing:'easeInOutExpo'})
      setTimeout(function () {
        $('#share_copytoclipboard').text(oldVal)
      }, 1000)
    }
    function _error (e) {
      // select as fallback
      var textVal = $('#share_copytoclipboard').text()
      showTooltip(e.trigger, e.action)
    }

    linkClipboard = new Clipboard('#share_copytoclipboard')
    linkClipboardCta = new Clipboard('#share_copytoclipboardcta', {
      text: function(trigger) {
        // make sure to return proper content
        return $('#share_copytoclipboard').attr('data-clipboard-text')
      }
    })

    linkClipboard.on('success', _success)
    linkClipboardCta.on('success', _success)
    linkClipboard.on('error', _error)
    linkClipboardCta.on('error', _error)
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
      // select as fallback
      var keyVal = $(e.trigger).attr('data-clipboard-text')
      showTooltip(e.trigger, e.action)
    });
  }

  var _tooltipTimeout = null
  function showTooltip (elem, action) {
    // get the selected key
    var x = $(elem).offset().left
    var y = $(elem).offset().top

    var actionMsg = ''
    var actionKey = (action === 'cut' ? 'X' : 'C')

    if (iosTest()) {
      // actionMsg = 'No support :('
      return
    }
    if (/Mac/i.test(navigator.userAgent)) {
      actionMsg = 'Press ⌘-' + actionKey + ' to ' + action
    } else {
      actionMsg = 'Press Ctrl-' + actionKey + ' to ' + action
    }

    // fill the tooltip and position on the trigger elem
    $("#tooltip_share").text(actionMsg)
    TweenLite.set($("#tooltip_share"), {display: "block", opacity: 1})
    TweenLite.to($("#tooltip_share"), 0, {x: x, y: y - 165})

    if (_tooltipTimeout) {
      clearTimeout(_tooltipTimeout)
    }
    _tooltipTimeout = setTimeout(function() {
      TweenLite.to($("#tooltip_share"), 1, {opacity: 0, onComplete: function(){
        TweenLite.set($("#tooltip_share"), {display: "none"})
      }})
    }, 2000);
  }

  function fillLinkForClipboardCopy () {
    // fill copy to clipboard link input
    Cryptoloji.Api.getShortenedLink()
      .then(function (shareURI) {    
        // fill link
        $('#share_copytoclipboard').attr('data-clipboard-text', shareURI)
        $('#share_copytoclipboard').attr('href', shareURI)
        $('#share_copytoclipboard').text('This is the link to share')
        // copy link fallback if ios
        if (iosTest()) {
          $('#share_copytoclipboardcta').hide()
          $('#share_copyIosHint').show()
        }
      })
  }

  function fillKeyForClipboardCopy () {
    $('.share_key_emoji-item').attr('data-clipboard-text', Cryptoloji.current.key)
    // copy key fallback if ios
    if (iosTest()) {
      $('.share_key_emoji-item').text(Cryptoloji.current.key)
    }
  }

  function iosTest () {
    return /iPhone|iPad/i.test(navigator.userAgent)
  }

  function setupShareButtons () {
    Cryptoloji.Api.getShortenedLink()
      .then(function (shareURI) {
        Cryptoloji.UI.Sharer('facebook', '#share_button_fb')
          .setShareLink('https://www.facebook.com/sharer/sharer.php')
          .addParam('u', shareURI)
          .bind()
        Cryptoloji.UI.Sharer('twitter', '#share_button_tw')
          .setShareLink('https://twitter.com/intent/tweet')
          .addParam('url', shareURI)
          .addParam('text', 'a message')
          .bind()
        Cryptoloji.UI.Sharer('gplus', '#share_button_go')
          .setShareLink('https://plus.google.com/share')
          .addParam('url', shareURI)
          .bind()
        Cryptoloji.UI.Sharer('mail', '#share_button_ma')
          .sameWindow()
          .setShareLink('mailto:')
          .addParam('subject', 'A secret message')
          .addParam('body', shareURI)
          .bind()

        if (bowser.mobile) {
          // show whatsapp and sms on mobile only
          // see https://github.com/todotoit/cryptoloji/issues/156

          Cryptoloji.UI.Sharer('whatsapp', '#share_button_wa')
          .sameWindow()
          .setShareLink('whatsapp://send')
          .addParam('text', shareURI)
          .bind()

          if (bowser.ios) {
            // see http://stackoverflow.com/a/19126326
            // why differentation for ios is needed
            Cryptoloji.UI.Sharer('sms', '#share_button_sms')
              .sameWindow()
              .setSeparator('&')
              .setShareLink('sms:')
              .addParam('body', shareURI)
              .bind()
          } else {
            Cryptoloji.UI.Sharer('sms', '#share_button_sms')
              .sameWindow()
              .setShareLink('sms:')
              .addParam('body', shareURI)
              .bind()
          }
        }
      })
  }
  
    var share_modal_height = 0
    var share_modal_margin = 0
  function setShareModalCoordinates () {
    // set the height and the top y coordinate to reach when share key modal is open
    // Cryptoloji.utils.remToPx(.5) is for add a margin
    // 23 is the magic number...
    share_modal_height = $('body').height() - $('.share_social_wrapper').position().top - $('.share_social_wrapper').height() + Cryptoloji.utils.remToPx(.5) + 23 -$('#encryptHeader').innerHeight()
    share_modal_margin = Cryptoloji.utils.remToPx(12.5)
    if (Cryptoloji.mq.matches) {
      share_modal_margin = Cryptoloji.utils.remToPx(15)
    }
    $('.share_key').css('height', share_modal_height)
    TweenLite.set($('.share_key'), {y: share_modal_height - share_modal_margin})
  }

  function _closeModal () {
    $('.share_key').removeClass('share_key-open')
    TweenLite.to($('.share_key'), .75, {y: share_modal_height - share_modal_margin, ease:Expo.easeInOut, onComplete: function(){
      $('.share_key_emoji-item').attr('id', '')
    }})
    $('.section_share .share_main_wrap').off()
  }
  function handleShareModal () {
    $('.share_key_emoji-item').on('click', function () {
      // open modal
      $('.share_key').addClass('share_key-open')
      TweenLite.to($('.share_key'), .75, {y: 0, ease:Expo.easeInOut, onComplete: function(){
        $('.share_key_emoji-item').attr('id', 'share_copykeytoclipboard')
        handleCloseShareModal()
      }})
    })
    $('#share_key_hide').on('click', function () {
      _closeModal()
    })
  }
  function handleCloseShareModal () {
    $('.section_share .share_main_wrap').on("click", function () {
      _closeModal()
    })
  }

})(window, window.Cryptoloji); 
