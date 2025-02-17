(function ($) {
	console.log('j')
    window.App = window.App || {};

    App.isScrollTopBody  = true;
    App.winLocHash       = window.location.hash;
    App.$body            = $('body');
    App.$htmlBody        = $('html, body');
    App.$modelsMenu      = $('.slider-menu .models-menu');
    App.$productsMobile  = $('.products-mobile');
    App.$headerMobile    = $('.header-mobile');
    App.$currentProduct  = null;
    App.$nextProduct     = null;


	    // lazy load for images
		App.lazyLoadImages = function () {
			$('img[data-src]').each(function () {
				let $img = $(this);
				if ($img.isInViewportImg() && !$img.data('loaded')) {
					let src = $img.attr('data-src');
					let srcset = $img.attr('data-srcset');
	
					if (src) $img.attr('src', src);
					if (srcset) $img.attr('srcset', srcset);
					$img.data('loaded', true);
					$img.hide().fadeIn(400);
				}
			});
		};

	//Mask	
	// $('.inpt-tel').mask('+7 (999) 999-99-99');

	function pauseOtherVideos(videoContainer) {
        const $videoContainer = $(videoContainer).find('video');
        $videoContainer.each(function () {
            this.pause();
        });
    }

	// opening popups
    App.$body.on('click touch', '.open-dialog, .open-popup, .open-form, .open-modal', function (event) {
        event.preventDefault();
console.log('popup')
        const category = $(this).attr('href');
        const $dialogs = $('.dialogs');
        const $categoryDialogs = $dialogs.find(category);
        const $flexPopup = $dialogs.find('.flex-popup');
        const popupCategory = category.slice(1);

        if (popupCategory !== 'policy') {
            localStorage.setItem('popup', popupCategory);
        }

        if (popupCategory === 'list') {
            App.$body.css({ 'overflow-y': 'hidden' });
            $dialogs.css({ 'overflow-y': 'hidden' });
        }

        $dialogs.find('.popup').removeClass('active').hide();

        if (!$categoryDialogs.length) {
            console.log(`Попап с ID ${category} не найден.`);
            return false;
        }

        $dialogs.find('.popup').removeClass('active').hide();
        $categoryDialogs.show();
        $dialogs.show();

        $flexPopup.addClass('popup--' + popupCategory);
        $dialogs.animate({ opacity: 1 }, 300, () => {
            $categoryDialogs.addClass('active');
            App.$body.css({ 'overflow-y': 'hidden' });
        });

        pauseOtherVideos('.video-box');

        return false;
    });

    // closing popups
    $('.dialogs').on('click touch', '.close, .close-bg', function () {
        const $dialogs = $('.dialogs');
        const $flexPopup = $dialogs.find('.flex-popup');
        const $activePopup = $dialogs.find('.popup.active');
        const popupId = $activePopup.attr('id');

        const bodyScroll = () => {
            App.$body.css({ 'overflow-y': 'auto' });
        };

        const removeClassPopup = () => {
            $flexPopup.removeClass(function (index, className) {
                return (className.match(/popup--\S+/g) || []).join(' ');
            });
        };

        const $popupActive = $flexPopup.find('.popup.active');

        if (popupId === 'cart') { // Корзина
            $popupActive.animate({ right: '-100%', opacity: 0 }, 600, function () {
                $dialogs.animate({ opacity: 0 }, 300, function () {
                    $dialogs.find('.popup').removeClass('active').hide();
                    $popupActive.removeAttr('style');
                    $dialogs.hide();
                    $dialogs.find('.thanks-popup').hide();
                    removeClassPopup();
                });
                bodyScroll();
            });

        } else if (popupId === 'policy') { // Политика конфиденциальности

            $popupActive.removeClass('active').hide();

            let popupCategory = localStorage.getItem('popup');

            // Открываем popup с соответствующим ID
            const $popupToOpen = $('.dialogs #' + popupCategory);
            if ($popupToOpen.length) {
                $popupToOpen.addClass('active').show();
                $dialogs.show();
            } else {
                console.log('Попап с ID ' + popupCategory + ' не найден.');
            }

        } else if (popupId === 'details') { // Детали преимуществ

            $popupActive.animate({ top: '100%', opacity: 0 }, 600, function () {
                $dialogs.animate({ opacity: 0 }, 400, function () {
                    $dialogs.find('.popup').removeClass('active').hide();
                    $popupActive.removeAttr('style');
                    $dialogs.hide();
                    removeClassPopup();
                });
                bodyScroll();
            });

        } else if (popupId === 'list') {

            $popupActive.animate({ bottom: '-100%', opacity: 0 }, 600, function () {
                $dialogs.animate({ opacity: 0 }, 300, function () {
                    $dialogs.find('.popup').removeClass('active').hide();
                    $popupActive.removeAttr('style');
                    $dialogs.hide();
                    removeClassPopup();
                });
                bodyScroll();
            });

        } else { // Остальные окна

            $popupActive.removeClass('active').hide();
            $dialogs.animate({ opacity: 0 }, 300, function () {
                $dialogs.hide();
                $dialogs.find('.thanks-popup').hide();
                removeClassPopup();
                bodyScroll();
            });
        }
        pauseOtherVideos('.swiper-slide');
    });

	const workTitleLinks = document.querySelectorAll('.work-title-link');
	const workItems = document.querySelectorAll('.work-item');
	let activeIndex = null;

	workTitleLinks.forEach((link, index) => {
		link.addEventListener('click', (e) => {
			const clickedTitleLinkWrap = link.parentElement.parentElement.parentElement;
			e.preventDefault();

			if (activeIndex === index) {
				return;
			}

			workItems.forEach((item, itemIndex) => {
				if (item === clickedTitleLinkWrap) {
					item.classList.add('u-pointer');
					gsap.to(item, {
						opacity: 0,
						duration: 0.3,
						ease: 'power2.out'
					});
					gsap.to(clickedTitleLinkWrap, {
						opacity: 0,
						duration: 0.3,
						ease: 'power2.out'
					});
				} else {
					item.classList.remove('u-pointer');
					gsap.to(item, {
						opacity: 1,
						duration: 0.3,
						ease: 'power2.out'
					});
					gsap.to(workTitleLinks[itemIndex].parentElement.parentElement, {
						opacity: 1,
						duration: 0.3,
						ease: 'power2.out'
					});
				}
			});
			activeIndex = index;
			console.log(index)
		});
	});

	$(document).ready(function () {
		$('.accordion-header:first').addClass('active');
		$('.accordion-content:first').show();

		$('.accordion-header').click(function () {
			const content = $(this).next('.accordion-content');

			$('.accordion-content').not(content).slideUp(300);
			$('.accordion-header').not(this).removeClass('active');

			$(this).toggleClass('active');
			content.slideToggle(300);
		});
	});

	wow = new WOW(
        {
        boxClass:     'wow',      
        animateClass: 'animated', 
        offset:       50,          
        mobile:       true,       
        live:         true        
    }
    );
    wow.init();
})(jQuery);
