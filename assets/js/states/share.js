(function (window, Cryptoloji, undefined) {
  'use strict'

  var clipboard = null
  
  Cryptoloji.states.share = {
    enter: function () {
      $(".section_share").addClass("section-show")
      setTimeout(function(){
        $("#share_more_arrow").addClass("shown")
      }, 0)

      clipboard = new Clipboard('#share_copytoclipboard')
      fillLinkCopy()
      copyToClipboardHandler()
    },
    leave: function () {
      $(".section_share").removeClass("section-show")
      clipboard.destroy()
    }
  }

  function copyToClipboardHandler () {
    clipboard.on('success', function(e) {
      e.clearSelection()

      // give feedback in place
      var oldVal = $(e.trigger).val()
      $(e.trigger).val('Copied!')
      setTimeout(function () {
        $(e.trigger).val(oldVal)
      }, 350)
    });

    clipboard.on('error', function(e) {
      alert('cannot copy')
      console.error('Action:', e.action)
      console.error('Trigger:', e.trigger)
    });
  }

  function fillLinkCopy () {
    // fill copy to clipboard link input
  }

})(window, window.Cryptoloji); 
