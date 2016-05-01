;(function (window, OnBoardingAnimations, $, undefined) {

	var oo = OnBoardingAnimations

	oo.scene_02 = {}

	var prep = '#s2 '

	var interval
	var timer
	var index = 1
	var anims = []
	var isEnter=false

	function enter(clb){

		isEnter=true
		clearTimeout(timer);

		[1,2,3].forEach(function(d){
			$(prep + '#b'+d+' > g').css({display: 'none', opacity:1})
		});

		[1,2,3,4,5].forEach(function(d){
			$(prep + 'tt'+d).css({display: 'none', opacity:1})
		})

		TweenLite.set($(prep + '#a1 > g'), {opacity:1, y:0})
		TweenLite.set($(prep + '#a2 > *'), {opacity:1})

		swap()
		interval = setInterval(swap, 1750);
		
		[1,2,3,4,5].forEach(function(d){
			var e = $(prep + '#tt'+d).css({display:'block'})
			TweenLite.set(e, {opacity:1, y:0})
			anims.push( TweenLite.from(e, 1, {delay:2.25 + d*.1, opacity:0, y:40, transformOrigin:'center center', ease:Expo.easeInOut}) )
		});

		timer = setTimeout(function(){
			clb()
		}, 2600)

	}

	function swap(){
		
		$(prep + '#b'+index+' > g').each(function(i, e){
			anims.push( TweenLite.to($(e), .5, {delay:.5-i*.1, opacity:0}) )
		})

		if(index == 3) index = 0
		index++;

		$(prep + '#b'+index+' > g').each(function(i, e){
			$(e).css({display: 'block', opacity:1})
			anims.push( TweenLite.from($(e), .5, {delay:.5-i*.1, scale:1.35, opacity:0, transformOrigin:'center center', ease:Quart.easeInOut}) )
		})


	}

	function exit(clb){

		if(!isEnter){
			clb()
			return
		}
		isEnter=false

		clearInterval(interval)
		clearTimeout(timer)
		interval=null

		anims.forEach(function(d, i){
			if(d) d.kill()
		})
		anims=[]
		
		$(prep + '#b'+index+' > g').each(function(i, e){
			TweenLite.to($(e), .5, {delay:.5-i*.1, opacity:0})
		});

		[1,2,3,4,5].forEach(function(d, i){
			var e = $(prep + '#tt'+d)
			TweenLite.to(e, .5, {delay:i*.1, opacity:0})
		});

		$(prep + '#a1 > g').each(function(i, e){
			TweenLite.to($(e), .5, {delay:.25 + .35-i*.07, opacity:0, y:-30, ease:Expo.easeInOut})
		})

		$(prep + '#a2 > *').each(function(i, e){
			TweenLite.to($(e), .5, {delay:i*.1, opacity:0, ease:Quart.easeInOut})
		})

		timer = setTimeout(function(){
			clb()
		}, 1000)
	}

	oo.scene_02.enter = enter
	oo.scene_02.exit = exit

})(window, window.OnBoardingAnimations, window.jQuery); 
