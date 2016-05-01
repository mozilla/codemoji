window.LogoHeaderAnimation = {};


;(function (window, LogoHeaderAnimation, $, undefined) {


	function enter(prefix){
		
	    TweenLite.set($(prefix + " #animation1"),{display: 'block'})
	    TweenLite.set($(prefix + " #animation2"),{display: 'block'})

	    $(prefix + " #animation1 > g").each(function(i,e){
	      TweenLite.set(e, {opacity: 0, scale: 1.6, rotation: (Math.random() * 180)-90, transformOrigin: 'center center'})
	    })
	    $(prefix + " #animation2 > g").each(function(i,e){
	      TweenLite.set(e, {opacity: 0, scale: 1.6, rotation: (Math.random() * 180)-90, transformOrigin: 'center center'})
	    })

	    TweenLite.set($(prefix + " #animation1 > #start_o"),{opacity: 1, scale: 1})
	    TweenLite.set($(prefix + " #animation2 > #start_o"),{opacity: 1, scale: 1})

	    _animate(prefix + " #animation1 > g", .6, .8, 3)
	    _animate(prefix + " #animation2 > g", .6, .95, 3)

	    function _animate (group, startTime, delay, elements) {
	      function _reduceto (array, num) {
	        var arr = array.toArray()
	        var temp_o = arr.shift()
	        var temp_f = arr.pop()
	        if (arr.length > num) {
	          // shuffle
	          var j, x, i;
	          for (i = arr.length; i; i -= 1) {
	              j = Math.floor(Math.random() * i);
	              x = arr[i - 1];
	              arr[i - 1] = arr[j];
	              arr[j] = x;
	          }
	          // get n elements
	          arr = arr.splice(0, num)
	        }
	        // re add first and last elements
	        arr.unshift(temp_o)
	        arr.push(temp_f)
	        return arr
	      }

	      group = _reduceto($(group), elements)
	      $(group).each(function (d, elem) {
	        TweenLite.to(elem, .3, {
	          opacity: 1,
	          delay: startTime + (d+1) * delay
	        })
	        TweenLite.to(elem, .8, {
	          scale: 1,
	          transformOrigin: 'center center',
	          rotation: 0,
	          delay: startTime + (d+1) * delay,
	          ease: Elastic.easeInOut,
	          onComplete: function () {
	            if (elem !== _.last($(group))) {
	              TweenLite.to(elem, .4, {
	                scale: 0,
	                transformOrigin: 'center center',
	                ease: Expo.easeInOut
	              })
	            }
	          }
	        })
	      })
	    }


	}

	function exit(prefix){
		TweenLite.killTweensOf(prefix + " #animation1 > g")
		TweenLite.killTweensOf(prefix + " #animation2 > g")
	}


	LogoHeaderAnimation.enter = enter
	LogoHeaderAnimation.exit = exit


})(window, window.LogoHeaderAnimation, window.jQuery); 


