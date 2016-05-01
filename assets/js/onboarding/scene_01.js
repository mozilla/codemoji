;(function (window, OnBoardingAnimations, $, undefined) {

	var oo = OnBoardingAnimations

	oo.scene_01 = {}

	var prep = '#s1 '

	var interval
	var timeint
	var timer
	var index = 1
	var anims = []
	var isEnter=false

	function enter(clb){
		isEnter=true
		clearTimeout(timer);

		[1,2,3].forEach(function(d){
			$(prep + '#b'+d+' > g').css('display', 'none')
		});

		[1,2,3,4].forEach(function(d){
			$(prep + '#tt'+d).css('display', 'none')
		})

		$(prep + '#a1 > g').each(function(i, e){
			anims.push( TweenLite.from($(e), 1, {delay:.1 + .75-i*.15, opacity:0, scale:1.5, transformOrigin:'center center', ease:Expo.easeInOut}) )
		})

		$(prep + '#a2 > *').each(function(i, e){
			anims.push( TweenLite.from($(e), 1, {delay:1.7 + i*.1, opacity:0, ease:Quart.easeInOut}) )
		})

		timeint = setTimeout(function(){
			swap()
			interval = setInterval(swap, 1600)
		}, 2200);
		
		[1,2,3,4].forEach(function(d){
			var e = $(prep + '#tt'+d).css({display:'block'})
			TweenLite.set(e, {opacity:1, y:0})
			anims.push( TweenLite.from(e, 1, {delay:4 + d*.1, opacity:0, y:40, transformOrigin:'center center', ease:Expo.easeInOut}) )
		});

		timer = setTimeout(function(){
			clb()
		}, 4000)

	}

	function swap(){
		
		$(prep + '#b'+index+' > g').each(function(i, e){
			TweenLite.to($(e), .5, {delay:.5-i*.1, opacity:0})
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
		clearTimeout(timeint)
		interval=null

		anims.forEach(function(d, i){
			if(d) d.kill()
		})
		anims=[]

		$(prep + '#b'+index+' > g').each(function(i, e){
			TweenLite.to($(e), .5, {delay:.5-i*.1, opacity:0, ease:Quart.easeInOut})
		});

		[1,2,3,4].forEach(function(d, i){
			var e = $(prep + '#tt'+d)
			TweenLite.to(e, .5, {delay:i*.1, opacity:0, ease:Quart.easeInOut})
		});

		timer = setTimeout(function(){
			clb()
		}, 1000)
	}

	oo.scene_01.enter = enter
	oo.scene_01.exit = exit

})(window, window.OnBoardingAnimations, window.jQuery); 
