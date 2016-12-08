$(window).load(function(){
	if( /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) ) {
		$('body').addClass('ios');
	};
	$('body').removeClass('loaded');
});
function viewport(){
	var e = window,
		a = 'inner';
	if ( !( 'innerWidth' in window ) )
	{
		a = 'client';
		e = document.documentElement || document.body;
	}
	return { width : e[ a+'Width' ] , height : e[ a+'Height' ] }
};
$(function(){

	$('.button-nav').click(function(){
		$(this).toggleClass('active'),
		$('.main-nav-list').slideToggle();
		return false;
	});
});

var handler = function(){

	var height_footer = $('footer').outerHeight();
	//var height_header = $('header').height();
	$('.content').css({'padding-bottom':height_footer/*, 'padding-top':height_header+40*/});


	var viewport_wid = viewport().width;
	/*tabs select choice */
	if(viewport_wid <= 640) {
		$('.nav-tab-list__link').click(function() {
			var text = $(this).find('.nav-tab-list__link-text').text();
			$('.toggle_tabs .toggle_tabs-text').text(text);
			$('.nav-tab-list').slideUp();
			return false;
		});
	};

	//Scroll block
	if(viewport_wid >= 640) {
		if($('.js-tab-wrap').length){
			var leftTop = $('.js-tab-wrap');
			var scrollBlock = $('.js-nav-tab-list');
			var asideHeight = $('.js-nav-tab-list').outerHeight(); //Для условия если контент большого блока меньше по высоте чем сайдбар
			var asideCont = $('.box-tab-cont-wrap').outerHeight();

			function stikyLeftSide(rightSide, leftCol) {
				var scrollPos = $(window).scrollTop();
				var leftTop =  leftCol.offset().top;
				var width = $('.nav-tab-list-wrap').width();

				if (scrollPos > leftTop-80 && scrollPos < (leftTop + leftCol.height() - rightSide.outerHeight())) {
					rightSide.addClass('fixed').css('width', width);
					$('.nav-tab-list-wrap').removeClass('relative');
					rightSide.removeClass('bottom');
					//rightSide.removeClass('top');
				} else if (scrollPos < leftTop) {
					rightSide.removeClass('fixed');
					rightSide.removeClass('fixed').css('width', '100%');
					$('.nav-tab-list-wrap').addClass('relative');
				} else if (scrollPos > leftTop && scrollPos > (leftTop + leftCol.height() - rightSide.outerHeight()) && asideHeight <= asideCont) {
					rightSide.removeClass('fixed');
					rightSide.addClass('bottom');
				}
				$('.tab-cont').css('min-height', asideHeight);
			}
			stikyLeftSide(scrollBlock,leftTop,asideHeight);
			$(window).on('scroll', function () {
				stikyLeftSide(scrollBlock, leftTop);
			});
			$(window).resize(function(){
				stikyLeftSide(scrollBlock, leftTop,asideHeight);
			});
		};
	};


	if (viewport_wid >= 768) {
		//Fixed header
		$(window).scroll(function () {
		    if ($(this).scrollTop() > 150) {
		        $('header').addClass('stuck');
		    } else {
		        $('header').removeClass('stuck');
		    }
		    if ($(this).scrollTop() > 400) {
		        $('header').addClass('fixed_header');
		    } else {
		        $('header').removeClass('fixed_header');
		    }
		});
	}

};
$(window).bind('load', handler);
$(window).bind('resize', handler);


$('.js-video').on('click', function(){
    var dataYoutubeLink = $(this).attr('data-youtube-link');
    $(this).html('<iframe class="video-frame" src="https://www.youtube.com/embed/'+ dataYoutubeLink +'?autoplay=1" allowfullscreen></iframe>');
    $(this).addClass('play-video');
});

$('.js-mob').on('click', function(){
    $(this).toggleClass('nav-open');
    $('body').toggleClass('nav-active');
    $('.nav-box').toggleClass('nav-show');
});

// Табы
$(document).ready(function(){
	$('.tabs li a').click(function(){
		$(this).parents('.tab-wrap').find('.tab-cont').addClass('hide');
		$(this).parent().siblings().removeClass('active');
		var id = $(this).attr('href');
		$(id).removeClass('hide');
		$(this).parent().addClass('active');
		return false;
	});

		/* open tabs select */
		$(".toggle_tabs").click(function() {
			$(".nav-tab-list").slideToggle();
			return false;
		});

});
