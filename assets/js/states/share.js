(function (window, Cryptoloji, undefined) {
  'use strict'
  
  Cryptoloji.states.share = {
    enter: function () {
      $(".section_share").addClass("section-show")
      setTimeout(function(){
        $("#share_more_arrow").addClass("shown")
      }, 0)

      insertShareMessage()
    },
    leave: function () {
      $(".section_share").removeClass("section-show")
    }
  }

  function insertShareMessage () {
    $('#share_content').html(Cryptoloji.UI.toTwemoji(Cryptoloji.current.output))
  }

})(window, window.Cryptoloji); 
