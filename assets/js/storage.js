(function (window, Cryptoloji, JSON, undefined) {

  /*
   * This is a quick and dirty library to perform persistence using URL as a 
   * storage.
   *
   * 
   */

  var STORAGE = {}

  //////////////////////////////////////////////////////////////////////////////

  function init () {
    // read URL
    var uri = _readURL()
    // get query params
    var queryValues = uri.queryGet()
    // is there is something
    if (!_.isEmpty(queryValues) && queryValues.data) {
      // dehashify
      STORAGE = _dehashify(queryValues.data)
      // clean url
      uri.querySet({})
      _saveURL(uri.toString())
      console.debug('storage is:', STORAGE)
    }
  }

  function persist () {
    _saveURL(getPersistedURL())
  }
  
  function get (key) {
    return _.result(STORAGE, key)
  }

  function set (key, data) {
    _.set(STORAGE, key, data)
    return this
  }

  function getPersistedURL () {
    // parse URI
    var uri = _readURL()
    if (!_.isEmpty(STORAGE)) {
      // temporary query object
      var queryObj = uri.queryGet()
      // assign all key and value in STORAGE
      _.forEach(STORAGE, function (data, key) { queryObj[key] = data })
      // merge query params, appending or updating
      uri.queryMerge(queryObj)
      // check URI length and limit to 2048 ( bitly max )
      if (uri.toString().length > 2048) {
        return reject('URI too long; is ' + uri.toString().length + ' while max allowed is 2048')
      }
      // save to URL for persistence accross refresh
      uri.querySet({ 'data': _hashify(STORAGE) })
    }
    // return url with persisted storage if any
    return uri.toString()
  }

  //////////////////////////////////////////////////////////////////////////////

  /**
   * Save specifiec URL to browser window URL, without reloading
   *
   * http://caniuse.com/#feat=history
   * 
   * @param  {String} url a string rapresenting a valid URL
   * @return void
   */
  function _saveURL (url) {
    // replace current history state, hoping browser will not create a new history state
    window.history.replaceState({}, '', url)
  }

  /**
   * Read current URL and return a YouAreI instance
   * 
   * @return {YouAreI} a YouAreI instance
   */
  function _readURL () {
    return new YouAreI(window.location.toString()) 
  }

  /**
   * Make object URL ready
   *
   * @see http://bit.ly/edl4AC
   * 
   * @param  {object} data a generic object
   * @return {string}      a sanitized string
   */
  function _hashify (data) {
    return window.btoa(window.unescape(window.encodeURIComponent(JSON.stringify(data))))
  }
  /**
   * Read object from sanitized URL param
   * @see http://bit.ly/edl4AC
   * 
   * @param  {string} data a sanitized object as string in URL
   * @return {object}      a object
   */
  function _dehashify (data) {
    return JSON.parse(window.decodeURIComponent(window.escape(window.atob(data))))
  }

  //////////////////////////////////////////////////////////////////////////////

  Cryptoloji.storage = {
    get: get,
    getPersistedURL: getPersistedURL,
    init: init,
    persist: persist,
    set: set,
  }
  
})(window, window.Cryptoloji, window.JSON); 
