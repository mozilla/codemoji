;(function (window, Cryptoloji, undefined) {

  var visitNumber = parseInt(cookie.get('visitNumber', '0'), 10)

  Cryptoloji.visitor =  {
    countVisit: function countVisit () {
      if (cookie.enabled()) {
        cookie.set('visitNumber', (++visitNumber).toString())()
      }
    },
    isFirstVisit: function isFirstVisit () {
      return visitNumber == 1
    },
    alreadySeen: function isFirstVisit () {
      return visitNumber >= 1
    }
  }
  
})(window, window.Cryptoloji); 
