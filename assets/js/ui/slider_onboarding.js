
(function (window, Cryptoloji, $, undefined) {


	function buildSlider(content_selector){

	    Cryptoloji.UI.onBoardingSlider = true

	    var mapval = rebound.MathUtil.mapValueInRange;
	    var springSystem = new rebound.SpringSystem();
	    var spring = springSystem.createSpring(50, 10);

	    var el = $(content_selector);
	    var scenes = el.children();
	    var num = scenes.length;
	    var w = $(document).width();
	    var svgw = 400;
	    var dots = $('.onboarding_pages').children()

	    var mousedown=false;
	    var currentX = 0;
	    var lastX = 0;
	    var currentPos = 0;
	    var currentShift = 0;
	    var step = 0
	    var consolidated_step = 0
	    var dir
	    var currpagex

	    $('#onboarding_svg svg').removeAttr('width')
	    $('#onboarding_svg svg').removeAttr('height')

	    var letter_icons = ['#single_c_1', '#single_i_1', '#single_i_1', '#single_i_1', '#single_o_1', '#single_o_2']
	    var icon_icons = ['#icon_c_1', '#icon_i_1', '#icon_i_2', '#icon_i_3', '#icon_o_1', '#icon_o_2']
	    var bigletters = ['#lttr_c', '#lttr_i', '#lttr_o']

	    var arr = [].concat(icon_icons).concat(bigletters)

	    arr.forEach(function(e){
	      TweenLite.set('#onboarding_svg '+e, {opacity:0})
	    })

	    el.on('touchmousedown', function(e) {
	    	currpagex=e.pageX
	    	currentX = e.pageX;
	    	mousedown=true;
	    });

	    $('body').on('touchmousemove', function(e){
	    	currpagex=e.pageX
		    if (!mousedown) return;

		    var fakt = 1;
		    if(step==0 && e.pageX > currentX){
		      fakt = .29;
		    }
		    if(step==num && e.pageX < currentX){
		      fakt = .29;
		    }

		    if(lastX < currentX){
		      dir=1
		    }else{
		      dir=-1
		    }

		    currentShift = (e.pageX - currentX) * fakt;

		    TweenLite.set(el[0], {x:currentPos+currentShift})
		    
		    var shiftNorm = mapval(currentPos+currentShift, 0, w*num, 0, 1)

		    var svgval2 = mapval(shiftNorm, 0, 1, 0, (svgw*num));
		    handlePosition(svgval2);
		    
		    spring.setCurrentValue(shiftNorm*-1);
		    lastX = e.pageX;
	    })


	    $('body').on('touchmouseup', function(e){
	      if (!mousedown) return;
	      mousedown=false;
	      currentPos += currentShift;

	      previous = step
	      var diff = (currpagex) ? Math.abs(currpagex - currentX) : 0
	      if(lastX < currentX){
	        dir=1
	        if(diff>10) step++;
	        if(step > num-1) step=num-1;
	      }else{
	        dir=-1
	        if(diff>10) step--;
	        if(step < 0) step=0;
	      }

	      dots.removeClass('current')

	      var currentScene = $(scenes[step])
	      $(dots[step]).addClass('current')

	      if(step == 1){
	        TweenLite.to('#onboarding_svg #lttr', 1, {delay:1, opacity:1})
	      }

	      if(step == num-1){
	        $('.onboarding_pages').addClass('hide')
	        destroy();
	      }

	      spring.setEndValue(step/num);
	    })


	    function destroy(){
	      el.off('touchmousedown')
	      $('body').on('touchmousemove')
	      $('body').off('touchmouseup')
	      
	      setTimeout(function(){
	        Cryptoloji.stateman.go('loading')
	        spring.destroy()
	      }, 3000)
	    }

	    spring.addListener({
	      onSpringUpdate: function(spring) {
	        var oval = spring.getCurrentValue();
	        val = mapval(oval, 0, 1, 0, (w*num*-1));
	        var svgval = mapval(oval, 0, 1, 0, (svgw*num*-1));
	        if(!mousedown) {
	          TweenLite.set(el[0], {x:val})

	          if(val % w === 0) consolidated_step=step

	          handlePosition(svgval);

	          currentPos = val
	        }
	      }
	    })

	    var debouncer;
	    var elmprev = []

	    function handlePosition(x){
	      console.log(step, consolidated_step, dir)

	      clearInterval(debouncer)
	      debouncer = setInterval(function(){

	        if(consolidated_step <= 1){
	          showHidelettersOne(true)
	          showHidelettersTwo(true)
	          showHidelettersThree(true)
	        }
	        if(consolidated_step == 1){
	            showHidelettersOne(true)
	            showHidelettersTwo(true)
	            showHidelettersThree(true)
	            showHidelettersZero(false)
	        }
	        if(consolidated_step == 2){
	            showHidelettersTwo(true)
	            showHidelettersThree(true)
	            showHidelettersOne(false)
	        }
	        if(consolidated_step == 3){
	            showHidelettersOne(true)
	            showHidelettersThree(true)
	            showHidelettersTwo(false)
	        }
	        if(consolidated_step == 4){
	            showHidelettersThree(false)
	            showHidelettersOne(true)
	            showHidelettersTwo(true)
	        }
	        if(consolidated_step == 5){
	            showHidelettersFour(false)
	            showHidelettersOne(true)
	            showHidelettersTwo(true)
	            showHidelettersThree(true)
	        }

	        clearInterval(debouncer)

	      }, 500)

	      if(dir == 1){
	        if(consolidated_step>=0 && consolidated_step<=1){
	          	TweenLite.set('#onboarding_svg #txts', {x:x})
	        }
	        if(consolidated_step>=2 && consolidated_step<=4){
	        	console.log(svgw*2+x, x)
	          	TweenLite.set('#onboarding_svg #icns', {x:svgw*2+x})
	        }

	      }


	      if(dir == -1){
	        if(consolidated_step>=0 && consolidated_step<=2){
	          	TweenLite.set('#onboarding_svg #txts', {x:x})
	        }
	        if(consolidated_step>=3 && consolidated_step<=4){
	          	TweenLite.set('#onboarding_svg #icns', {x:svgw*2+x})
	        }
	      }
	      
	    }


	    function showHideElements(arr, hide){
	      var o = (hide) ? 0 : 1;
	      arr.forEach(function(e){
	        TweenLite.to('#onboarding_svg '+e, .35, {opacity:o})
	      })
	    }

	    function showHidelettersZero(invert){
	      showHideElements(['#lttr_c'], invert)
	    }
	    function showHidelettersOne(invert){
	      showHideElements(['#icon_c_1'], invert)
	      showHideElements(['#single_c_1'], !invert)
	      //TweenLite.to('#onboarding_svg #watermelon_icon_1_', 2, {transformOrigin:"50% 50%", rotation:360})
	    }
	    function showHidelettersTwo(invert){
	      showHideElements(['#lttr_i','#icon_i_1','#icon_i_2','#icon_i_3'], invert)
	      showHideElements(['#single_i_1', '#single_i_2', '#single_i_3'], !invert)
	    }
	    function showHidelettersThree(invert){
	      showHideElements(['#lttr_o','#icon_o_1','#icon_o_2'], invert)
	      showHideElements(['#single_o_1', '#single_o_2'], !invert)
	    }
	    function showHidelettersFour(invert){
	      showHideElements(['#lttr_o','#icon_o_1','#icon_o_2', '#text3'], !invert)
	    }


  }


  Cryptoloji.buildSlider = buildSlider
  Cryptoloji.onBoardingSlider = false

})(window, window.Cryptoloji, window.jQuery);

