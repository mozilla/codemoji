function gHandleSvgLoading (svg_loaded) {
    function loadSvg (element, path) {
      $.get(path)
       .done(function (result) {
          $(element).append(result.documentElement)
          svg_loaded.push(path)
        })
       .fail(function () {
          console.error(this)
        })
    }
    $("div[data-svg*='assets/svg']").each(function () {
      var self = this
      var path = $(self).attr('data-svg')
      loadSvg(self, path)
    })
  }