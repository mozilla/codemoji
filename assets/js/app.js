(function (window, Cryptoloji, $, undefined) {
  'use strict'

  Cryptoloji.settings = {
    inputMaxSize: 120
  }

  //
  // jQuery document ready bootstrap
  //
  $(document).ready(function () {

    FastClick.attach(document.body);

    // 
    // fix height
    // 
    // $("body").css("height",$(window).innerHeight())

    //
    // load svg
    //
    Cryptoloji.UI.handleSvgLoading()

    //
    // Key modal setup
    //    
    Cryptoloji.UI.KeyModal('#key-modal')
      .fill(EmojiList)
      .addClickHandler('#encryption_key_modal_open')
      .addClickHandler('#decryption_key_modal_open')

    //
    // handle header show/hide
    //
    Cryptoloji.UI.handleHeader()

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
  })

})(window, window.Cryptoloji, jQuery); 
