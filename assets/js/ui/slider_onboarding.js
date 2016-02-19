
(function (window, Cryptoloji, $, undefined) {


	function buildSlider(content_selector){

		console.log('buildSlider', content_selector)

	    Cryptoloji.onBoardingSlider = true

	    var mapval = rebound.MathUtil.mapValueInRange;
	    var springSystem = new rebound.SpringSystem();
	    var spring = springSystem.createSpring(50, 10);

	    var el = $(content_selector);
	    //var scenes = 6//el.children();
	    var num = 6//scenes.length;
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
	    

	    setTimeout(function(){
		    var letter_icons = ['#single_c_1', '#single_i_1', '#single_i_1', '#single_i_1', '#single_o_1', '#single_o_2']
		    var icon_icons = ['#img_c_1', '#img_i_1', '#img_i_2', '#img_i_3', '#img_o_1', '#img_o_2']

		    var arr = [].concat(icon_icons)

		    arr.forEach(function(e){
		      TweenLite.set('#onboarding_svg '+e, {opacity:0})
		    })

		    // $('#onboarding_svg image').each(function(i, e){
		    // 	var url = $(e).attr('xlink:href').replace('..', 'assets')
		    // 	$(e).attr('xlink:href', url)
		    // })

		    TweenLite.set('#onboarding_svg #letter_c', {drawSVG:"100% 100%"})

		    TweenLite.to('#onboarding_svg #watermelon image', 1, {delay:1.2, rotation:0, transformOrigin:"50% 50%", ease:Elastic.easeInOut})
		    TweenLite.from('#onboarding_svg #text1', 1, {delay:1, opacity:0, y:"+20px", ease:Expo.easeInOut})

	    }, 50)

	    
	    el.on('touchmousedown', function(e) {
	    	console.log('touchmousedown');
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

		    //TweenLite.set(el[0], {x:currentPos+currentShift})
		    
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

	      //var currentScene = $(scenes[step])
	      $(dots[step]).addClass('current')

	      

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
	      }, 1200)
	    }

	    spring.addListener({
	      onSpringUpdate: function(spring) {
	        var oval = spring.getCurrentValue();
	        val = mapval(oval, 0, 1, 0, (w*num*-1));
	        var svgval = mapval(oval, 0, 1, 0, (svgw*num*-1));
	        if(!mousedown) {
	          //TweenLite.set(el[0], {x:val})

	          if(val % w === 0) consolidated_step=step

	          handlePosition(svgval);

	          currentPos = val
	        }
	      }
	    })

	    var debouncer;
	    var elmprev = []


	    function lttrIn(sel){
	    	TweenLite.set('#onboarding_svg '+sel, {opacity:1})
	      	TweenLite.from('#onboarding_svg '+sel, 1, {opacity:0, y:"+20px", ease:Expo.easeInOut})
	    }	
	    function lttrOut(sel){
	    	TweenLite.to('#onboarding_svg '+sel, 1, {opacity:0, y:"-20px", ease:Expo.easeInOut})
	    }
	    function resetIn(sel){
	    	TweenLite.to('#onboarding_svg '+sel, 1, {opacity:1, y:0})
	    }
	    function resetOut(sel){
	    	TweenLite.to('#onboarding_svg '+sel, 1, {opacity:0, y:0})
	    }
	    function resetBigLettr(sel){
	    	TweenLite.to('#onboarding_svg '+sel, 1, {opacity:0})
	    }

	    function handlePosition(x){
	      //console.log(step, consolidated_step, dir)

	      clearInterval(debouncer)
	      debouncer = setInterval(function(){

	      	if(consolidated_step == 0){
	      		console.warn('zero')
	      		TweenLite.set('#onboarding_svg #letter_c', {drawSVG:"0% 100%"})
	            TweenLite.to('#onboarding_svg #letter_c', 2, {drawSVG:"100% 100%", ease:Expo.easeInOut})
	      	}
	        if(consolidated_step == 1){
	      		console.warn('uno')
	            TweenLite.set('#onboarding_svg #letter_c', {drawSVG:"100% 100%"})
	            TweenLite.to('#onboarding_svg #letter_c', 2, {drawSVG:"0% 100%", ease:Expo.easeInOut})
	            
	            resetIn('#single_c_1')
	            resetOut('#img_c_1')
	        }
	        if(consolidated_step == 2){
	      		console.warn('due')
	      		
	      		lttrOut('#single_c_1')
	      		lttrIn('#img_c_1')

	      		resetIn('#single_i_1')
	      		resetOut('#img_i_1')
	      		resetIn('#single_i_2')
	      		resetOut('#img_i_2')
	      		resetIn('#single_i_3')
	      		resetOut('#img_i_3')

	      		TweenLite.set('#onboarding_svg #letter_i', {drawSVG:"100% 100%"})
	        }
	        if(consolidated_step == 3){
	      		console.warn('tre')

	      		TweenLite.to('#onboarding_svg #single_c_1',  .7, {opacity:1, y:0})
	      		TweenLite.to('#onboarding_svg #img_c_1', 1, {opacity:0})


	            TweenLite.to('#onboarding_svg #letter_i', 2, {drawSVG:"0% 100%", ease:Expo.easeInOut})
	            TweenLite.set('#onboarding_svg #letter_o', {drawSVG:"100% 100%"})

	      		lttrOut('#single_i_1')
	      		lttrIn('#img_i_1')
	      		lttrOut('#single_i_2')
	      		lttrIn('#img_i_2')
	      		lttrOut('#single_i_3')
	      		lttrIn('#img_i_3')


	            resetIn('#single_o_1')
	      		resetOut('#img_o_1')
	      		resetIn('#single_o_2')
	      		resetOut('#img_o_2')

	        }
	        if(consolidated_step == 4){
	      		console.warn('quatto')

	      		TweenLite.set('#onboarding_svg #letter_i', {drawSVG:"100% 100%"})
	      		TweenLite.set('#onboarding_svg #letter_o', {drawSVG:"100% 100%"})
	            TweenLite.to('#onboarding_svg #letter_o', 2, {drawSVG:"0% 100%", ease:Expo.easeInOut})

	      		lttrOut('#single_o_1')
	      		lttrIn('#img_o_1')
	      		lttrOut('#single_o_2')
	      		lttrIn('#img_o_2')


	            resetIn('#single_i_1')
	      		resetOut('#img_i_1')
	      		resetIn('#single_i_2')
	      		resetOut('#img_i_2')
	      		resetIn('#single_i_3')
	      		resetOut('#img_i_3')
	      		
	        }
	        if(consolidated_step == 5){
	      		console.warn('cinque')
	      		TweenLite.to('#onboarding_svg', .5, {opacity:0})
	        }

	        clearInterval(debouncer)

	      }, 200)

	      if(dir == 1){
	        if(consolidated_step>=0 && consolidated_step<=1){
	          	TweenLite.set('#onboarding_svg #txts', {x:x})
	        }
	        if(consolidated_step>=2 && consolidated_step<=4){
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


  }


  Cryptoloji.buildSlider = buildSlider
  Cryptoloji.onBoardingSlider = false

})(window, window.Cryptoloji, window.jQuery);

