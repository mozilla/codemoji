function gHandleSvgLoading (svg_loaded) {
    function loadSvg (element, path) {
        $.get(path)
         .done(function (result) {
            $(element).append(result.documentElement)
            svg_loaded.push(path)
            Cryptoloji.stateman.emit('svg:loaded', path)
          })
         .fail(function () {
            console.error(this)
          })
    }
    var svgsPromises = []
    $("div[data-svg*='assets/svg']").each(function () {
      var self = this
      var path = $(self).attr('data-svg')
      loadSvg(self, path)
    })
  }
