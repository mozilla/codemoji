function gHandleSvgLoading (svg_loaded) {
    function loadSvg (element, path) {
      return Q.promise(function (resolve, reject) {
        $.get(path)
         .done(function (result) {
            $(element).append(result.documentElement)
            svg_loaded.push(path)
            Cryptoloji.stateman.emit('svg:loaded', path)
            resolve(path)
          })
         .fail(function () {
            console.error(this)
            reject()
          })
       })
    }
    var svgsPromises = []
    $("div[data-svg*='assets/svg']").each(function () {
      var self = this
      var path = $(self).attr('data-svg')
      // loadSvg(self, path)
      svgsPromises.push(loadSvg(self, path))
    })
    Q.all(svgsPromises).then(function () {
       Cryptoloji.stateman.emit('svg:loaded-all')
    })
  }
