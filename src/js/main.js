@@include('./lib/jquery.fancybox.min.js')
@@include('./lib/swiper.js')

$(document).ready(function(){
	
// mobile_menu
    
    $('.burger').click( function() { 
        $('header .navbar').slideToggle(300); 
        $('.burger').toggleClass( 'burger_active' ); 
    });
	
	var ww=window.innerWidth;
	$(window).resize(function(){
		//функция вызывается всегда, при изменении размера окна. Для того, чтобы она вызывалась только при изменении ширины окна - этот пункт
		if(ww==window.innerWidth) return;//
		if(window.innerWidth > 1279) {
			$('header .navbar').show(); 
		} else {
			$('header .navbar').hide();
			$('.burger').removeClass('burger_active'); 
		}
	});
	
	$('.menu li.menu-item-has-children>a' ).click(function(e){
		if(!$('.burger').is(':visible'))return;
		e.preventDefault();
		$('.sub-menu').not($(this).closest('li').find('.sub-menu')).slideUp('300');
		$(this).closest('li').find('.sub-menu').slideToggle('300');
	});
	
// 	slider	
	
	var mySwiper = new Swiper ('.swiper-container', {
		direction: 'vertical',
		autoHeight: "true",
		autoplay: true,
		speed: 500,
		pagination: {
        el: '.swiper-pagination',
        clickable: true,
        renderBullet: function (index, className) {
          return '<span class="' + className + '">' + (index + 1) + '</span>';
        },
      },
	})
	
	
	
	$(window).resize();
	setTimeout(function(){
		ww=0;
		$(window).resize();
	},400)
}); 