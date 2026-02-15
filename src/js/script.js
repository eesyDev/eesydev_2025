(function ($) {
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


    // LENIS - LENIS - LENIS 1. Инициализация Lenis 
    const lenis = new Lenis({
        duration: 1.3, // Длительность скролла (чем больше, тем плавнее)
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Функция плавности
        smoothWheel: true,
        orientation: 'vertical', 
        gestureOrientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 1,
        smoothTouch: false, // На мобильных обычно лучше оставлять нативный скролл
        touchMultiplier: 2,
    });

    // 2. ВАЖНО: Связка Lenis и GSAP ScrollTrigger
    // Говорим ScrollTrigger обновляться каждый раз, когда Lenis скроллит
    lenis.on('scroll', ScrollTrigger.update);

    // Добавляем Lenis в ticker GSAP'а, чтобы они работали синхронно в одном кадре анимации
    gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
    });

    // Отключаем лаг-сглаживание GSAP, так как Lenis берет это на себя
    gsap.ticker.lagSmoothing(0);
    // LENIS - LENIS - LENIS


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

    // Cookie логика
    const cookieBanner = document.getElementById("cookieBanner");
    const cookieBtn = document.getElementById("cookieAccept");

    if (localStorage.getItem("cookieAccepted")) {
        cookieBanner.style.display = "none";
    }
    cookieBtn.addEventListener("click", () => {
        localStorage.setItem("cookieAccepted", "true");
        cookieBanner.style.display = "none";
    });
    // Cookie логика

    // Header смена fixed
    const header = document.querySelector('.header');
    const headerHeight = header.offsetHeight;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('header--fixed');
            document.body.style.paddingTop = headerHeight + 'px';
        } else {
            header.classList.remove('header--fixed');
            document.body.style.paddingTop = '';
        }
    });
    // Header смена fixed

    // Кнопки Быстрая связь и Вверх
    const upBtn = document.querySelector('.fixed-btns__go-up');

    window.addEventListener('scroll', () => {
        upBtn.classList.toggle('is-visible', window.scrollY > 2000);
    });

    upBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    document.querySelectorAll('.animation-arrow-up').forEach(phoneFab => {
        const mainBtn = phoneFab.querySelector('.animation-arrow-up-main');

        if (!mainBtn) return;

        mainBtn.addEventListener('click', () => {
            phoneFab.classList.toggle('is-open');
        });
    });
    // Кнопки Быстрой связь и Вверх


	$(document).ready(function () {
		$('.accordion-header-packs:first').addClass('active');
		$('.accordion-content-packs:first').show();

		$('.accordion-header-faq:first').addClass('active');
		$('.accordion-content-faq:first').show();

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

    $('.header__burger').on('click', function() {
        $(this).toggleClass('active');
        if ($(this).hasClass('active')) {
            $('.burger-menu').addClass('active');
        } else {
            $('.burger-menu').removeClass('active');
        }
    });
    $(document).ready(function() {
        $(".cases-img").on("load", function() {
          $(this).closest(".cases-shot-loader").hide();
        });
      });
      
      
      $(document).ready(function() {
        $(".tab-nav a").click(function(event) {
          event.preventDefault();
          var tabId = $(this).attr("href");
          
          $(".tab-nav li").removeClass("active");
          $(this).parent().addClass("active");
          
          $(".tab-content").removeClass("active");
          $(tabId).addClass("active");
        });
      });

    document.querySelectorAll('.copy-btn').forEach(btn => {
        btn.addEventListener('click', async () => {
            const text = btn.dataset.copy;

            try {
                await navigator.clipboard.writeText(text);

                btn.classList.add('copied');

                setTimeout(() => {
                btn.classList.remove('copied');
                }, 1300);

            } catch (err) {
                console.error('Не удалось скопировать', err);
            }
        });
    });

    $(document).ready(function() {
        $('.services-page-tabs__tab').on('click', function () {
            const tab = $(this).data('tab');
            const $tabs = $(this).closest('.services-page-tabs');

            // активный таб
            $tabs.find('.services-page-tabs__tab').removeClass('is-active');
            $(this).addClass('is-active');

            // активная панель
            $tabs.find('.services-page-tabs__tab-panel').removeClass('is-active');
            $tabs.find(`.services-page-tabs__tab-panel[data-tab="${tab}"]`).addClass('is-active');

            $tabs.find('.services-page-tabs__tab-panel').hide();
            $tabs.find(`.services-page-tabs__tab-panel[data-tab="${tab}"]`)
            .fadeIn(200)
            .addClass('is-active');
        });
    });

   document.addEventListener('DOMContentLoaded', function () {
        // 1. Инициализация слайдеров
        const content = new Splide('#cases-content', {
            type: 'fade',
            speed: 1000,
            rewind: true,
            arrows: false,
            pagination: false,
            drag: false
        });

        const images = new Splide('#cases-images', {
            type: 'fade',
            height: '700px',
            perPage: 1,
            arrows: false,
            pagination: false,
            speed: 1200,
            drag: false,
            // easing: 'cubic-bezier(0.22, 1, 0.5, 1)'
        });

        content.sync(images);
        content.mount();
        images.mount();

        // images.on('active', function (slide) {
        //     // Анимируем маску (clip-path)
        //     gsap.fromTo(slide.slide, 
        //         { clipPath: 'inset(0% 0% 100% 0%)' }, // Скрыта снизу
        //         { 
        //             clipPath: 'inset(0% 0% 0% 0%)',   // Полное раскрытие
        //             duration: 1.2, 
        //             ease: "expo.out" 
        //         }
        //     );
        // });

        images.on('active', function (slide) {
            const img = slide.slide.querySelector('img');
            gsap.fromTo(img, 
                { 
                    filter: 'blur(20px) brightness(1.2)', 
                    scale: 1.1 
                }, 
                { 
                    filter: 'blur(0px) brightness(1)', 
                    scale: 1, 
                    duration: 1.5, 
                    ease: "power2.out" 
                }
            );
        });

        // 2. Регистрация плагинов
        gsap.registerPlugin(SplitText);

        // Функция для анимации текста GSAP Split text
        function initTextReveals(selector = '.gsap-reveal') {
            const elements = document.querySelectorAll(selector);

            elements.forEach(el => {
                // Делаем видимым ПЕРЕД разбивкой, чтобы SplitText правильно посчитал геометрию
                gsap.set(el, { visibility: "visible" });

                const split = new SplitText(el, {
                    type: "lines, chars",
                    linesClass: "reveal-line"
                });

                gsap.from(split.chars, {
                    yPercent: 102,          // Выплывают строго снизу
                    rotateX: -3,           // Легкий наклон для объема
                    opacity: 0,
                    filter: "blur(10px)",   // Эффект мягкого фокуса в начале
                    duration: 1.5,
                    stagger: 0.005,          // Последовательное появление
                    // ease: "expo.out",       // Идеально плавно без баунса
                    ease: "power4.out",    // Резкий старт, плавный стоп
                    overwrite: true,
                    scrollTrigger: {
                        trigger: el,
                        start: "top 90%", // Когда верх элемента достигает 90% высоты экрана
                        end: "bottom 10%", // Когда низ элемента уходит выше 10% экрана
                        
                        // Настройка действий:
                        // onEnter, onLeave, onEnterBack, onLeaveBack
                        // play - играть, reset - сбросить в начало, pause - пауза, reverse - назад
                        toggleActions: "play none none none", 
                        
                        // Если хочешь, чтобы анимация "перезапускалась" при каждом появлении:
                        // toggleActions: "restart none none none"
                    }
                });
            });
        }
        // Запускаем
        initTextReveals();



        // function initTextReveals(selector = '.gsap-reveal') {
        //     const elements = document.querySelectorAll(selector);

        //     elements.forEach(el => {
        //         gsap.set(el, { visibility: "visible" });

        //         const split = new SplitText(el, {
        //             type: "lines, chars",
        //             linesClass: "reveal-line"
        //         });

        //         // Создаем анимацию
        //         gsap.from(split.chars, {
        //             yPercent: 102,          // Выплывают строго снизу
        //             rotateX: -3,           // Легкий наклон для объема
        //             opacity: 0,
        //             filter: "blur(10px)",   // Эффект мягкого фокуса в начале
        //             duration: 1.5,
        //             stagger: 0.005,          // Последовательное появление
        //             // ease: "expo.out",       // Идеально плавно без баунса
        //             ease: "power4.out",    // Резкий старт, плавный стоп
        //             overwrite: true,
        //             scrollTrigger: {
        //                 trigger: el,
        //                 start: "top 95%",
        //                 end: "bottom 5%",
        //                 // play - вперед (при входе снизу)
        //                 // reverse - назад (при уходе вверх)
        //                 // restart - заново (при входе сверху обратно)
        //                 // reverse - назад (при уходе вниз)
        //                 toggleActions: "play reverse restart reverse"
        //             }
        //         });

        //         // Привязываем к скроллу
        //         ScrollTrigger.create({
        //             trigger: el,
        //             start: "top 90%",     // Когда текст появляется снизу
        //             end: "bottom 10%",    // Когда текст уходит вверх
        //             onEnter: () => animation.play(),          // Играем вперед при скролле вниз
        //             onLeaveBack: () => animation.reverse(),   // Играем назад (прячем за шторку) при скролле вверх
        //             // toggleActions: "play reverse play reverse" // Альтернативный вариант проще
        //         });
        //     });
        // }
        // initTextReveals();
        
        // Функция для анимации текста GSAP Split text

        
        // Функция для анимации секции Кейсы
        function animateTitle(slideElement) {
            const title = slideElement.querySelector('.portfolio__left-title');
            if (!title) return;

            if (title.revert) title.revert(); 

            gsap.set(title, { visibility: "visible" });

            const split = new SplitText(title, {
                type: "lines, chars",
                linesClass: "reveal-line"
            });

            // Анимация символов: плавно, чисто, без отскоков
            gsap.from(split.chars, {
                yPercent: 102,          // Выплывают строго снизу
                rotateX: -3,           // Легкий наклон для объема
                opacity: 0,
                filter: "blur(10px)",   // Эффект мягкого фокуса в начале
                duration: 1.2,
                stagger: 0.005,          // Последовательное появление
                // ease: "expo.out",       // Идеально плавно без баунса
                ease: "power4.out",    // Резкий старт, плавный стоп
                overwrite: true
            });

            // Теги: аккуратное появление сверху вниз
            const tags = slideElement.querySelectorAll('.tag');
            gsap.fromTo(tags, 
                { 
                    opacity: 0, 
                    y: -10 
                }, 
                { 
                    opacity: 1, 
                    y: 0, 
                    duration: 0.8, 
                    stagger: 0.1, 
                    ease: "power2.out",
                    delay: 0.3 
                }
            );

            title.revert = () => split.revert();
        }

        // Запускаем анимацию для первого активного слайда сразу
        animateTitle(content.Components.Elements.slides[0]);

        // Запускаем анимацию при смене слайда
        content.on('active', function (EventInterface) {
            animateTitle(EventInterface.slide);
        });

        // 3. Управление кнопками
        document.querySelector('.portfolio__left-arrow--prev')
            .addEventListener('click', () => content.go('<'));

        document.querySelector('.portfolio__left-arrow--next')
            .addEventListener('click', () => content.go('>'));
    });

})(jQuery);

