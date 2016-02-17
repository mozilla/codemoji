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

      // fillLinkCopy()
      // fillKeyCopy()

      linkClipboard = new Clipboard('#share_copytoclipboard')
      keyClipboard = new Clipboard('#share_copykeytoclipboard')
      copyLinkToClipboardHandler()
      copyKeyToClipboardHandler()
    },
    leave: function () {
      $(".section_share").removeClass("section-show")
      linkClipboard.destroy()
    }
  }

  function copyLinkToClipboardHandler () {
    linkClipboard.on('success', function(e) {
      e.clearSelection()

      // give feedback in place
      var oldVal = $(e.trigger).val()
      $(e.trigger).val('Copied!')
      setTimeout(function () {
        $(e.trigger).val(oldVal)
      }, 350)
    });

    linkClipboard.on('error', function(e) {
      alert('cannot copy')
      console.error('Action:', e.action)
      console.error('Trigger:', e.trigger)
    });
  }

  function copyKeyToClipboardHandler () {
    keyClipboard.on('success', function(e) {
      e.clearSelection()

      // give feedback in place
      var oldVal = $(e.trigger).text()
      $(e.trigger).text('Copied!')
      setTimeout(function () {
        $(e.trigger).text(oldVal)
      }, 350)
    });

    keyClipboard.on('error', function(e) {
      alert('cannot copy')
      console.error('Action:', e.action)
      console.error('Trigger:', e.trigger)
    });
  }

  function fillLinkCopy () {
    // fill copy to clipboard link input
  }

})(window, window.Cryptoloji); 
