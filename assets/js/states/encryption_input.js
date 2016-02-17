(function (window, Cryptoloji, $, undefined) {
  'use strict'
  Cryptoloji.states.encryptionInput = {
    enter: function () {
      Cryptoloji.stateman.emit('header:hide')
      $('body').removeClass('main_content_top_input-first')

      if (!$('.encryptionInput').hasClass('section-show') || !$('#edit_encryption_input').is(':focus')) {
        Cryptoloji.stateman.go('encrypt')
      }

      $('#edit_encryption_input_cleaner').show()
      $('#edit_encryption_input_count').show()

      Cryptoloji.UI.CharCounter('encryptInput', '#edit_encryption_input_count')
        .setMaxSize(Cryptoloji.settings.inputMaxSize)
        .attachTo('#edit_encryption_input')

      // encrypt text on input
      $('#edit_encryption_input').bind('input propertychange', function() {
        Cryptoloji.UI.encryptText()
      })

      // empty input field
      $('#edit_encryption_input_cleaner').on('click', function () {
        emptyInput()
        emptyOutput()
        Cryptoloji.UI.CharCounter('encryptInput').resetCount()
      })

      $('#edit_encryption_input').on('blur', function () {
        $('#encryption_input').val($('#edit_encryption_input').val())
        Cryptoloji.stateman.go('encrypt')
      })
    },
    leave: function () {
      $('.encryptionInput').removeClass('section-show')
    }
  }

  function emptyInput () {
    $('#encryption_input').val('')
    $('#edit_encryption_input').val('')
    $('#edit_encryption_input_cleaner').hide()
    $('#edit_encryption_input_count').hide()
    $('#encryption_share_button').removeClass('main_share-open')
  }

  function emptyOutput () {
    $('#encryption_output').html('').addClass('placeholdit')
    $('.share_message_item').html('')
  }

})(window, window.Cryptoloji, window.jQuery);
