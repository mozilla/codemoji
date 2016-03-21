(function (window, Cryptoloji, $, _, TweenLite, undefined) {
  'use strict'

  Cryptoloji.states.notFound = {
    enter: function () {
      $('.section_not_found').addClass('section-show')
      Cryptoloji.stateman.emit('header:show')
      shuffle_error()

      $('.svg_wrapper_not_found').on('click', function () {
        shuffle_error()
      })
    },
    leave: function () {
      $('.section_not_found').removeClass('section-show')
    }
  }

  function shuffle_error () {
    _.times(3, function (i) {
      var offset = Math.random() * 800 + 600
      // element
      console.log($('#444_slot_' + (i + 1)), offset)
      TweenLite.set($('#444_slot_' + (i + 1)), {y: offset})
      TweenLite.to($('#444_slot_' + (i + 1)), 1, {y: 0})
      // mask
      TweenLite.set($('#444_mask_' + (i + 1) + '_1_'), {y: -1 * offset})
      TweenLite.to($('#444_mask_' + (i + 1) + '_1_'), 1, {y: 0})
    })
  }

})(window, window.Cryptoloji, window.jQuery, window._, window.TweenLite);
