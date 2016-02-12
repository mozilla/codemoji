(function (window, Cryptoloji, undefined) {
  'use strict'
  
  Cryptoloji.states.loading = {
    enter: function () {
      $(".section_loading").addClass("section-show")
      Cryptoloji.stateman.emit('header:hide')

      svgTransition()
      setTimeout(function(){
        Cryptoloji.stateman.go('home')
      }, 8000)
    },
    leave: function () {
      $(".section_loading").removeClass("section-show")
    }
  }

  function svgTransition(){

        var callbacks = $.Callbacks()
        var time_flow = 0

        function animate(item_class, execution_time, delay_time_next, delay_time_next_extension, value) {
          time_flow += execution_time * $(item_class).length + delay_time_next_extension
          $(item_class).each(function(i) {
            var j=($(item_class).length-1) - i
            TweenLite.to($(this), execution_time, {delay: execution_time * j + delay_time_next, opacity: value})
          })
        }
        
        callbacks.add(animate)
        callbacks.fire('.emoji_item', 0,  0, 0, '0')
        callbacks.fire('.loading_text_black', 0, 0, 0, '0')
        callbacks.fire('.loading_text_gray', 0, 0, 0, '0')
        callbacks.fire('.loading_text_gray', .2, time_flow, .6, '1')
        callbacks.fire('.loading_text_black', .15, time_flow, 0.3, '1')
        callbacks.fire('.letter_i', .05,  time_flow, 0, '0')
        callbacks.fire('.emoji_i', .05,  time_flow, 0.05, '1')
        callbacks.fire('.letter_o', .05,  time_flow, 0, '0')
        callbacks.fire('.emoji_o', .05,  time_flow, 0.05, '1')
        callbacks.fire('.letter_t', .05,  time_flow, 0, '0')
        callbacks.fire('.emoji_t', .05,  time_flow, 0.05, '1')
        callbacks.fire('.letter_s', .05,  time_flow, 0, '0')
        callbacks.fire('.emoji_s', .05,  time_flow, 0.05, '1')
        callbacks.fire('.letter_last', .2, time_flow, -1, '0')
        callbacks.fire('.emoji_last', .2, time_flow, 0, '1')
        callbacks.fire('.emoji_item',  .1, time_flow, 0, '0')
  }
})(window, window.Cryptoloji) 















