(function (window, Cryptoloji, undefined) {
  'use strict'
  
  Cryptoloji.states.loading = {
    enter: function () {
      $(".section_loading").addClass("section-show")
      Cryptoloji.stateman.emit('header:hide')

      stephy();
      setTimeout(function(){
        Cryptoloji.stateman.go('home')
      }, 5200)
    },
    leave: function () {
      $(".section_loading").removeClass("section-show")
    }
  }

})(window, window.Cryptoloji); 




function stephy(){
  var svg = d3.select('#ttloading')

  svg.selectAll('#text > g')
      .attr('opacity', 0)

      console.log(svg.selectAll('#text > g'));
  svg.selectAll('#cryptoloji > g')
      .attr('opacity', 0)
  
  
  // appearing title    
  
      svg.selectAll('#text > g')
          .attr('opacity', 0)
          .transition()
          .delay(function(d, i){
          return (5-i)*70
          })
          .attr('opacity', 1)
      
      svg.selectAll('#cryptoloji > g')
          .transition()
          .delay(function(d, i){
          return 800 + ((9-i)*70)
          })
          .attr('opacity', 1)
      
  // appearing emojis
      
  // T
      svg.select('#tT text')
          .transition()
          .delay(2500)
          .attr('fill', '#E5E5E5')
      svg.select('#gem_1')
          .transition()
          .delay(2500)
          .attr('opacity', 1)
      svg.select('#tT_1 text')
          .transition()
          .delay(2550)
          .attr('fill', '#E5E5E5')
      svg.select('#gem_2')
          .transition()
          .delay(2550)
          .attr('opacity', 1)
  // I
      svg.select('#tI text')
          .transition()
          .delay(2000)
          .attr('fill', '#E5E5E5')
      svg.select('#barber_pole_1')
          .transition()
          .delay(2000)
          .attr('opacity', 1)
      svg.select('#tI_1 text')
          .transition()
          .delay(2050)
          .attr('fill', '#E5E5E5')
      svg.select('#barber_pole_3')
          .transition()
          .delay(2050)
          .attr('opacity', 1)
      svg.select('#tI_2 text')
          .transition()
          .delay(2000)
          .attr('fill', '#E5E5E5')
      svg.select('#barber_pole_2')
          .transition()
          .delay(2000)
          .attr('opacity', 1)
  // C
      svg.select('#tC text')
          .transition()
          .delay(3400)
          .attr('fill', '#E5E5E5')
      svg.select('#s_watermelon')
          .transition()
          .delay(3400)
          .attr('opacity', 1)
  // R
      svg.select('#tR text')
          .transition()
          .delay(3300)
          .attr('fill', '#E5E5E5')
      svg.select('#grape')
          .transition()
          .delay(3300)
          .attr('opacity', 1)
  // J
      svg.select('#tJ text')
          .transition()
          .delay(3200)
          .attr('fill', '#E5E5E5')
      svg.select('#cactus')
          .transition()
          .delay(3200)
          .attr('opacity', 1)
  // P
      svg.select('#tP text')
          .transition()
          .delay(3100)
          .attr('fill', '#E5E5E5')
      svg.select('#donut')
          .transition()
          .delay(3100)
          .attr('opacity', 1)
  // Y
      svg.select('#tY text')
          .transition()
          .delay(3000)
          .attr('fill', '#E5E5E5')
      svg.select('#cocktail')
          .transition()
          .delay(3000)
          .attr('opacity', 1)
  // H
      svg.select('#tH text')
          .transition()
          .delay(2900)
          .attr('fill', '#E5E5E5')
      svg.select('#hen')
          .transition()
          .delay(2900)
          .attr('opacity', 1)
  // L
      svg.select('#tL text')
          .transition()
          .delay(2800)
          .attr('fill', '#E5E5E5')
      svg.select('#target')
          .transition()
          .delay(2800)
          .attr('opacity', 1)
  // S
      svg.select('#tS text')
          .transition()
          .delay(2700)
          .attr('fill', '#E5E5E5')
      svg.select('#tonguee')
          .transition()
          .delay(2700)
          .attr('opacity', 1)
      svg.select('#tS_1 text')
          .transition()
          .delay(2750)
          .attr('fill', '#E5E5E5')
      svg.select('#tongue')
          .transition()
          .delay(2750)
          .attr('opacity', 1)
  // O
      svg.select('#tO text')
          .transition()
          .delay(2300)
          .attr('fill', '#E5E5E5')
      svg.select('#tangerine_2')
          .transition()
          .delay(2300)
          .attr('opacity', 1)
      svg.select('#tO_1 text')
          .transition()
          .delay(2350)
          .attr('fill', '#E5E5E5')
      svg.select('#tangerine_1')
          .transition()
          .delay(2350)
          .attr('opacity', 1)
      
// end of onboarding - fade out
      
      svg.selectAll('#emoji> g')
          .transition()
          .duration(500)
          .delay(function(d, i){
          return 4000 + ((9-i)*70)
          })
          .attr('opacity', 0)
  
}