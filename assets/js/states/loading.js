(function (window, Cryptoloji, undefined) {
  'use strict'
  
  Cryptoloji.states.loading = {
    enter: function () {
      $(".section_loading").addClass("section-show")
      Cryptoloji.stateman.emit('header:hide')

      $( ".section_loading_wrapper" ).load( "assets/svg/loading.svg", function() {
        svgTransition()
      })
      setTimeout(function(){
        Cryptoloji.stateman.go('encrypt')
      }, 5800)
    },
    leave: function () {
      $(".section_loading").removeClass("section-show")
    }
  }

  function svgTransition(){

    var callbacks = $.Callbacks()

    function animate_async(item_class, element_time, delay, value) {
      $(item_class).each(function(i) {
        var j=($(item_class).length-1) - i
        TweenLite.to($(this), element_time, {delay: element_time * j + delay, opacity: value})
      })
    }

    callbacks.add(animate_async)
    callbacks.fire('.emoji_item', 0, 0, '0');
    callbacks.fire('.loading_text_black', 0, 0, '0')
    callbacks.fire('.loading_text_gray', 0, 0, '0')
    callbacks.fire('.loading_text_gray', .07, 0, '1')
    callbacks.fire('.loading_text_black', .07, .8, '1')
    callbacks.fire('.letter_t', 0, 2.5, '0')
    callbacks.fire('.emoji_t', 0, 2.55, '1')
    callbacks.fire('.letter_i', 0, 2, '0')
    callbacks.fire('.emoji_i', 0.05, 2, '1' )
    callbacks.fire('.letter_o', 0, 2.3, 0)
    callbacks.fire('.emoji_o', 0.05, 2.3, '1')
    callbacks.fire('.letter_s', 0, 2.7, '0')
    callbacks.fire('.emoji_s', 0.05, 2.7, '1')
    callbacks.fire('.letter_c', 0, 3.4, '0')
    callbacks.fire('.emoji_c', 0.05, 3.4, '1')
    callbacks.fire('.letter_r', 0, 3.3, '0')
    callbacks.fire('.emoji_r', 0.05, 3.3, '1')
    callbacks.fire('.letter_j', 0, 3.2, '0')
    callbacks.fire('.emoji_j', 0.05, 3.2, '1')
    callbacks.fire('.letter_p', 0, 3.1, '0')
    callbacks.fire('.emoji_p', 0.05, 3.1, '1')
    callbacks.fire('.letter_y', 0, 3.0, '0')
    callbacks.fire('.emoji_y', 0.05, 3.0, '1')
    callbacks.fire('.letter_h', 0, 2.9, '0')
    callbacks.fire('.emoji_h', 0.05, 2.9, '1')
    callbacks.fire('.letter_l', 0, 2.8, '0')
    callbacks.fire('.emoji_l', 0.05, 2.8, '1')
    callbacks.fire('.emoji_item', 0.1, 4, '0')
  }
})(window, window.Cryptoloji)
