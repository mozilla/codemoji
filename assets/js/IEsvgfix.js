;(function (window, $, Cryptoloji) {


  function detectIE() {
    var ua = window.navigator.userAgent;
    var msie = ua.indexOf('MSIE ');
    if (msie > 0) {
        // IE 10 or older => return version number
        return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
    }
    var trident = ua.indexOf('Trident/');
    if (trident > 0) {
        // IE 11 => return version number
        var rv = ua.indexOf('rv:');
        return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
    }
    var edge = ua.indexOf('Edge/');
    if (edge > 0) {
       // Edge (IE 12+) => return version number
       return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
    }
    return false;
  }

  function detectIOS7 () {
    var ios7 = navigator.userAgent.match(/(iPad|iPhone|iPod touch);.*CPU.*OS 7_\d/i)
    return ios7 ? true : false
  }

  if (detectIE() || detectIOS7()) {

      Cryptoloji.stateman.on('footer:show', function(){
        fixSvgDimensions();
      })

  // if (true) {
    function fixSvgDimensions () {
      // $('[data-svg]').each(function() {
      $('svg').parent().each(function() {
        var that = this
        setTimeout(function(){
        // console.log($(this).attr("unfixme"))
        if (!$(that).attr("unfixme")){
          var $svg = $('svg', that)
          var $wrapper = $(that)


          // 
          // get dimensions from viebox
          // 
          var $viewbox = $svg[0].getAttribute('viewBox').split(' ')
          for(var i = 0; i < $viewbox.length; i++){
            $viewbox[i] = parseInt($viewbox[i], 10)
          }

          var $size = {}
          $size.x = $viewbox[2]
          $size.y = $viewbox[3]

          var svgWidth = $size.x
          var svgHeight = $size.y

          // 
          // get dimensions from attributes
          // 
          // var svgWidth = $svg.attr('width')
          // var svgHeight = $svg.attr('height')
          

          if (svgWidth && svgHeight) {
            svgWidth = parseInt(svgWidth, 10)
            svgHeight = parseInt(svgHeight, 10)

            var wrapperWidth = parseInt($wrapper.css("width"), 10)
            var wrapperHeight = parseInt($wrapper.css("height"), 10)

            $svg.attr('height', '100%')
            $svg.attr('width', '100%')

            var fixWidth = $wrapper.attr('iefix-width') !== undefined
            var fixHeight = $wrapper.attr('iefix-height') !== undefined

            if (!fixWidth && !fixHeight)
              fixHeight = true

            if (fixHeight) {
              if(wrapperWidth>0) $wrapper.css('height', wrapperWidth * svgHeight / svgWidth)
            } else if (fixWidth) {
              if(wrapperHeight>0) $wrapper.css('width', wrapperHeight * svgWidth / svgHeight)
            }
          }
        }
        }, 10)
      })
    }
    $(document).ready(function () { fixSvgDimensions() })
    $(window).resize(function () { fixSvgDimensions() })
  }
})(window, window.jQuery, Cryptoloji);
