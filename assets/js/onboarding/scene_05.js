;(function (window, OnBoardingAnimations, $, undefined) {

	var oo = OnBoardingAnimations

	oo.scene_05 = {}

	var prep = '#s5 '

	var timer

	function enter(clb){
		
		clearTimeout(timer);

		[1,2,3,4].forEach(function(d){
			$(prep + '#tt'+d).css('display', 'none')
			var e = $(prep + '#tt'+d)
			TweenLite.set(e, {opacity:0})
		});

		TweenLite.from($(prep+'#bubble_trig'), .5, {delay:.25, opacity:0, ease:Quart.easeInOut});
		TweenLite.from($(prep+'#deli'), 1.5, {delay:.25, opacity:0, y:20, transformOrigin:'center center', ease:Expo.easeInOut});

		TweenLite.from($(prep+'#d1'), 1., {delay:1.5, opacity:0, y:10, ease:Expo.easeInOut});

		TweenLite.to($('#s5'), 2.5, {onComplete:dotss})
		TweenLite.to($('#s5'), 3, {onComplete:dotss})
		TweenLite.to($('#s5'), 3.5, {onComplete:dotss})

        
		TweenLite.to($(prep+'#d1'), 1, {delay:3.8, opacity:0, ease:Expo.easeInOut});
		TweenLite.from($(prep+'#d2'), 1, {delay:3.8, opacity:0, ease:Expo.easeInOut});

		[1,2,3,4].forEach(function(d){
			var e = $(prep + '#tt'+d).css({display:'block'})
			TweenLite.set(e, {opacity:1, y:0})
			TweenLite.from(e, 1, {delay:4 + d*.1, opacity:0, y:40, transformOrigin:'center center', ease:Expo.easeInOut})
		});


		timer = setTimeout(function(){
			clb()
		}, 5000)

	}



	function dotss(){
		$(prep+'#d1 #dots > g').each(function(i, e){
          TweenLite.to($(e), .2, {delay: i*.1, y:-12, ease:Sine.easeInOut})
          TweenLite.to($(e), .2, {delay: .2+i*.1, y:0, ease:Sine.easeInOut})
        })
	}



	function exit(clb){

		clearTimeout(timer);

		[1,2,3,4].forEach(function(d, i){
			var e = $(prep + '#tt'+d)
			TweenLite.to(e, .5, {delay:.3 + i*.1, opacity:0})
		});


		timer = setTimeout(function(){
			clb()
		}, 1000)
	}

	oo.scene_05.enter = enter
	oo.scene_05.exit = exit

})(window, window.OnBoardingAnimations, window.jQuery); 
