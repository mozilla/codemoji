function gHandleSvgLoading (svg_loaded) {
  function loadSvg (element, path) {
      return $.get(path)
       .done(function (result) {
          $(element).append(result.documentElement)
          svg_loaded.push(path)
        })
       .fail(function () {
          console.error(this)
        })
  }
  $.holdReady(true)
  var svgsPromises = []
  $("div[data-svg*='assets/svg']").each(function () {
    var self = this
    var path = $(self).attr('data-svg')
    svgsPromises.push(loadSvg(self, path))
  })
  $.when.apply($, svgsPromises).then(function(){
    $.holdReady(false)
  })
}
