;function detectIE() {
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

// if(detectIE())

(function fix_svg_fn(){
    if(detectIE()){
        $("svg").parent().each(function() {
            var h = parseInt($('svg', this).attr("height"),10)
            var w = parseInt($('svg', this).attr("width"),10)

            var hw = parseInt($(this).css("height"),10)
            var ww = parseInt($(this).css("width"),10)

            var minhw = $(this).css("min-height")
            var minww = $(this).css("min-width")

            console.log(">>>>>>>>")
            console.log($(this))
            console.log($(this).attr("class"))
            console.log(h, w)
            console.log("-", hw, ww)

            $('svg', this).attr("height", "100%")
            $('svg', this).attr("width", "100%")    

            // if (ww && hw){
            //     console.log('----- width and height to svg parent')
            // }
            // else if (ww && !hw){

            if(minhw === "auto"){
                $(this).css("height", ww * h / w)
            } else {
                $(this).css("width", parseInt(minhw,10) * w / h)
                // $(this).css("width", "122px")
                $(this).css("height", parseInt(minhw,10))
                console.log(parseInt(minhw,10) * w / h)
            }

            // }
            // else if (hw && !ww){
            //     var wn = hw*w/h
            //     $('svg', this).css("height", wn)
            // }
            // else if (!hw && !ww){
            //     console.log('!!!!! no width - no height to svg parent')
            // }
            
        })
    }
})()
