(function (window, Cryptoloji, undefined) {
  'use strict'
  
  Cryptoloji.states.share = {
    enter: function () {
      $(".section_share").addClass("section-show")
      setTimeout(function(){
        $("#share_more_arrow").addClass("shown")
      }, 0)
      // $("#share_more_arrow").addClass("shown")
    },
    leave: function () {
      $(".section_share").removeClass("section-show")
    }
  }

})(window, window.Cryptoloji); 
