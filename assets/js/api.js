;(function (window, Cryptoloji, $, undefined) {

  function getShortenedLink () {
    var deferred = jQuery.Deferred()

    // store message and key for persistence
    Cryptoloji.storage.set('message', Cryptoloji.current.output)
    Cryptoloji.storage.set('key', Cryptoloji.current.key)
    // create URL
    var uri = new YouAreI(Cryptoloji.storage.getPersistedURL())
    uri.fragment('/landing')
    uri.path_parts().push('share.html')
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
