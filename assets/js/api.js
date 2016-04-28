;(function (window, Cryptoloji, $, undefined) {

  // memoized share link
  var shareURL = null
  // shared deferred object
  var deferred = jQuery.Deferred()
  // one promise at a time
  var promiseRunning = false

  function getShortenedLink () {
    if (!promiseRunning) {
      if (shareURL) {
        deferred.resolve(shareURL)
      } else {
        promiseRunning = true
        // store message and key for persistence
        Cryptoloji.storage.set('message', Cryptoloji.current.output)
        Cryptoloji.storage.set('key', Cryptoloji.current.key)
        // create URL
        var uri = new YouAreI(Cryptoloji.storage.getPersistedURL())
        uri.path_parts().push('share.html')
        uri.fragment('')
        // uri._path_leading_slash = false
        uri._path_trailing_slash = false
        // get URL as string
        shareURL = uri.toString()

        // try to shorten URL link, fallback to full link on error
        $.post('https://bitly.mofoprod.net/generate/', {
          url: shareURL
        }, function success (data) {
          shareURL = data
          deferred.resolve(shareURL)
        }).fail(function failure() {
          // console.error('URL shortening failed, falling back to long URL')
          deferred.resolve(shareURL)
        }).always(function always () {
          promiseRunning = false
        })
      }
    }

    return deferred.promise()
  }

  Cryptoloji.Api = {
    getShortenedLink: getShortenedLink
  }
  
})(window, window.Cryptoloji, window.jQuery, window.Q); 
