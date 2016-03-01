;(function (window, Cryptoloji, $, undefined) {
  'use strict'

  Cryptoloji.visitor.countVisit()

  //
  // jQuery document ready bootstrap
  //
  $(document).ready(function () {

    FastClick.attach(document.body);

    // 
    // fix height
    // 
    Cryptoloji.UI.fixHeight()
    
    // 
    // on rotation/resize
    //
    Cryptoloji.UI.handleOrientationChanges()

    //
    // load svg
    //
    Cryptoloji.UI.handleSvgLoading()

    //
    // behavior help button
    //
    Cryptoloji.UI.loadLogicHelpButton('encryption')
    Cryptoloji.UI.loadLogicHelpButton('decryption')

    //
    // Key modal setup
    //    
    if (!Cryptoloji.mq.matches) {
      Cryptoloji.UI.KeyModal('#key-modal')
        .fill(EmojiList)
        .addClickHandler('#encryption_key_modal_open')
        .addClickHandler('#decryption_key_modal_open')
    } else {
      Cryptoloji.UI.KeyPanel('#encryption_keypanel')
        .fill(EmojiList)
      Cryptoloji.UI.KeyPanel('#decryption_keypanel')
        .fill(EmojiList)
    }

    //
    // handle header show/hide
    //
    Cryptoloji.UI.handleHeader()
    Cryptoloji.UI.handleFooter()

    //
    // StateMan bootstrap
    //
    Cryptoloji.stateman.start()
    // go to welcome if no state is active
    if (Cryptoloji.stateman.current.name === '')
      Cryptoloji.stateman.go('welcome')

    Cryptoloji.stateman.on('begin', function (event) { console.log('begin ', event) })
    Cryptoloji.stateman.on('end', function (phase) { console.log('end ', phase) })
    Cryptoloji.stateman.on('notfound', function () { console.log('notfound') })


    //
    // handle first visit element display/hide
    //
    if (Cryptoloji.visitor.isFirstVisit()) {
      $('[hide-on-first-visit-only]').hide()
    } else {
      $('[show-on-first-visit-only]').hide()
    }

    if (Cryptoloji.mq.matches) {
      $(".nano").nanoScroller()
    }
  })

})(window, window.Cryptoloji, jQuery); 
