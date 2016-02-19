(function (window, Cryptoloji, undefined) {

  var visitNumber = parseInt(cookie.get('visitNumber', '0'), 10)
  console.log(visitNumber)

  Cryptoloji.visitor =  {
    countVisit: function countVisit () {
      if (cookie.enabled()) {
        cookie.set('visitNumber', (++visitNumber).toString())()
      }
    },
    isFirstVisit: function isFirstVisit () {
      console.log(visitNumber)
      return visitNumber > 0
    }
  }
  
})(window, window.Cryptoloji); 
