(function (window, Cryptoloji, undefined) {
  'use strict'
  
  Cryptoloji.states.landing = {
    canEnter: function () {
      console.log(Cryptoloji.storage.get('message'))
      // verify a message is present in the storage
      if (_.isUndefined(Cryptoloji.storage.get('message')) || _.isEmpty(Cryptoloji.storage.get('message'))) {
        // if not redirect to not found state
        Cryptoloji.stateman.go('404')
      }
    },
    enter: function () {
      fillMessage()

      $(".section_landing").addClass("section-show")
      Cryptoloji.stateman.emit('footer:show') 

      var time = .3
      var delay = .4
      TweenLite.set($("[landing-state]"), {display: "none"})
      TweenLite.set($("[landing-state='1']"), {display: "block", opacity: 0})
      // text
      TweenLite.to($("#landing_state_1_text"), time, {opacity: 1, delay: delay})
      // svg
      TweenLite.to($("#landing_state_1_encrypted_message"), time, {opacity: 1, delay: delay * 2})
      // button
      TweenLite.to($("#landing_state_1_button"), time, {opacity: 1, delay: delay * 3})


      $("#landing_state_1_button").on("click", function(){
        TweenLite.set($("[landing-state]"), {display: "none"})
        TweenLite.set($("[landing-state='2']"), {display: "block", opacity: 0})
        TweenLite.set($("#landing_state_2_question_mark"), {opacity: 0})
        // text
        TweenLite.to($("#landing_state_2_text"), time, {opacity: 1, delay: delay})
        // svg
        TweenLite.to($("#landing_state_2_svg"), time, {opacity: 1, delay: delay * 2})
        TweenLite.to($("#landing_state_2_emoji"), time, {opacity: .3, delay: delay * 3})
        TweenLite.to($("#landing_state_2_question_mark"), time, {opacity: 1, delay: delay * 3})
        // button
        TweenLite.to($("#landing_state_2_button"), time, {opacity: 1, delay: delay * 3})
      })

    },
    leave: function () {
      $(".section_landing").removeClass("section-show")
      Cryptoloji.stateman.emit('footer:hide') 
    }
  }

  function fillMessage () {
    var message = Cryptoloji.storage.get('message')
    $('#landing_state_1_encrypted_message').html(Cryptoloji.UI.toTwemoji(message))
  }

})(window, window.Cryptoloji); 







