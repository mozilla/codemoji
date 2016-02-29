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

  //////////////////////////////////////////////////////////////////////////////

  Cryptoloji.utils = {
    remToPx: remToPx
  }
  
})(window, window.Cryptoloji, window.jQuery);
