;(function (window, Cryptoloji, $, undefined) {

  function getShortenedLink () {
    var deferred = jQuery.Deferred()

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
    var shareURI = uri.toString()

    // shareURI should be sent to bit.ly to be shortened

    deferred.resolve(shareURI)

    return deferred.promise()
  }

  Cryptoloji.Api = {
    getShortenedLink: getShortenedLink
  }
  
})(window, window.Cryptoloji, window.jQuery, window.Q); 
