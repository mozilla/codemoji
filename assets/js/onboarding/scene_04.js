;(function (window, OnBoardingAnimations, $, undefined) {

	var oo = OnBoardingAnimations

	oo.scene_04 = {}

	var prep = '#s4 '

	var interval

	var pos = [0, -95, 0, 95]
	var first=true
	var previndex

	function enter(clb){
		
		[1,2,3].forEach(function(d){
			$(prep + '#tt'+d).css('display', 'none')
			$(prep + '#g'+d).css('display', 'none')
			TweenLite.set($(prep + '#sel'), {opacity:0})

			TweenLite.from($(prep + '#f'+d), 1, {delay:d*.15, opacity:0, scale:1.3, transformOrigin:'center center', ease:Elastic.easeInOut})
		})


		var del = 2350
		var step=1250
		setTimeout(function(){
			swap(2)
		}, del);

		setTimeout(function(){
			swap(1)
		}, del+step);

		setTimeout(function(){
			swap(3)
		}, del+step*2);


		[1,2,3].forEach(function(d){
			var e = $(prep + '#tt'+d).css({display:'block'})
			TweenLite.from(e, 1.5, {delay:4.25 + d*.15, opacity:0, y:20, transformOrigin:'center center', ease:Elastic.easeInOut})
		});

		setTimeout(function(){
			clb()
		}, 6500)

	}



	function swap(index){

		if(first){
			$(prep + '#txt > g').each(function(i, e){
				TweenLite.to($(e), .5, {delay:Math.random()*.25, opacity:0, ease:Quart.easeInOut})
			})
		}

		TweenLite.from($(prep + '#f'+index), .5, {scale:1.2, transformOrigin:'center center', ease:Quart.easeInOut})
		TweenLite.set($(prep + '#sel'), {scale:1.3, transformOrigin:'center center'})
		TweenLite.to($(prep + '#sel'), .9, {opacity:1, x:pos[index], scale:1, transformOrigin:'center center', ease:Elastic.easeInOut})
		
		if(!first && previndex){
			$(prep + '#g'+previndex+' > g').each(function(i, e){
				TweenLite.to($(e), .5, {delay:Math.random()*.25, opacity:0, ease:Quart.easeInOut})
			})
		}

		$(prep + '#g'+index).css('display', 'block')
		$(prep + '#g'+index+' > g').each(function(i, e){
			TweenLite.set($(e), {opacity:0, transformOrigin:'center center'})
			TweenLite.to($(e), .5, {delay:Math.random()*.25, opacity:1, ease:Quart.easeInOut})
		})

		previndex=index
		first=false
	}

	function exit(clb){

		[1,2,3].forEach(function(d, i){
			var e = $(prep + '#tt'+d)
			TweenLite.to(e, .5, {delay:.3 + i*.1, opacity:0})
			TweenLite.to($(prep + '#f'+d), .5, {delay:i*.15, opacity:0, scale:1.3, transformOrigin:'center center', ease:Expo.easeInOut})
		});

		TweenLite.to($(prep + '#sel'), .5, {opacity:0, scale:1.2, transformOrigin:'center center', ease:Expo.easeInOut})

		setTimeout(function(){
			clb()
		}, 1000)
	}

	oo.scene_04.enter = enter
	oo.scene_04.exit = exit

})(window, window.OnBoardingAnimations, window.jQuery); 
