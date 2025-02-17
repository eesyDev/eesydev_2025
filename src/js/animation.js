(function ($) {
    $(document).ready(function () {
        gsap.registerPlugin(ScrollTrigger);

        gsap.utils.toArray('.up-opacity').forEach(head => {
            gsap.from(head, {
                opacity: 0,
                y: 50,
                duration: 1,
                scrollTrigger: {
                    trigger: head,
                    start: "top 80%",
                    end: "bottom 20%",
                    toggleActions: "play none none reverse"
                }
            });
        });

        gsap.utils.toArray('.right-opacity').forEach(head => {
            gsap.from(head, {
                opacity: 0,
                x: 100,
                duration: 1,
                scrollTrigger: {
                    trigger: head,
                    start: "top 80%",
                    end: "bottom 20%",
                    toggleActions: "play none none reverse"
                }
            });
        });

        gsap.utils.toArray('.head-animated-scroll').forEach(head => {
            gsap.from(head, {
                opacity: 0,
                y: 50,
                scrollTrigger: {
                    trigger: head,
                    start: "top 80%",
                    end: "top 20%",
                    scrub: 0.5,
                }
            });
        });

        //Появление с увеличением масштаба
        gsap.utils.toArray('.scale-in').forEach(elem => {
            gsap.from(elem, {
                scale: 0.5,
                opacity: 0,
                duration: 1,
                scrollTrigger: {
                    trigger: elem,
                    start: "top 80%",
                    toggleActions: "play none none reverse"
                }
            });
        });

        //Появление с искажением
        gsap.utils.toArray('.skew-in').forEach(elem => {
            gsap.from(elem, {
                skewX: 30,
                opacity: 0,
                x: 200,
                duration: 1,
                scrollTrigger: {
                    trigger: elem,
                    start: "top 80%",
                    toggleActions: "play none none reverse"
                }
            });
        });

        //Волнообразное появление дочерних элементов
        gsap.utils.toArray('.stagger-in').forEach(container => {
            const elements = container.children;
            gsap.from(elements, {
                y: 50,
                opacity: 0,
                duration: 0.8,
                stagger: 0.2, // Задержка между анимациями элементов
                scrollTrigger: {
                    trigger: container,
                    start: "top 55%",
                    toggleActions: "play none none reverse"
                }
            });
        });

        // Анимация блоков
        gsap.utils.toArray('.block-animated-scale').forEach(block => {
            gsap.from(block, {
                scrollTrigger: {
                    trigger: block,
                    start: "top 80%",
                    end: "top 20%",
                    scrub: 0.5
                },
                y: 100,
                scale: 0.8,
                opacity: 0,
            });
        });

        // Анимация блоков слева
        gsap.utils.toArray('.from-left').forEach(block => {
            gsap.from(block, {
                scrollTrigger: {
                    trigger: block,
                    start: "top 80%",
                    end: "top 50%",
                    scrub: 0.5
                },
                x: -100, // начальная позиция слева
                opacity: 0
            });
        });

        // Анимация блоков справа
        gsap.utils.toArray('.from-right').forEach(block => {
            gsap.from(block, {
                scrollTrigger: {
                    trigger: block,
                    start: "top 80%",
                    end: "top 50%",
                    scrub: 0.5
                },
                x: 100, // начальная позиция справа
                opacity: 0
            })
        });

        const textG = document.querySelector('#textClip text');
        const video = document.querySelector('.cover');
        const clipPath = document.querySelector('#textClip');

        if (textG) {

            gsap.set(clipPath, {
                scale: 300,
                transformOrigin: "45% 34%"
            });
            gsap.set(video, {
                clipPath: 'url(#textClip)'
            });

            // Анимация уменьшения текста
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: ".video-mask-container",
                    start: "top top",
                    end: "+=100%",
                    scrub: 1,
                    pin: true,
                }
            });

            tl.to(clipPath, {
                scale: 1,
                duration: 1
            })
            tl.to(':root', {
                '--color-opacity': 1,
                duration: 1.2,
                delay: .5
            }, 0);
        }

        const slides = document.querySelectorAll('.projects__desk');

        if (slides) {
            let currentSlide = 0;

            function animateSlideOut(slide) {
                const tl = gsap.timeline();

                // Анимация текста и заголовка
                tl.to(slide.querySelector('.project-info'), {
                    y: -50,
                    opacity: 0,
                    duration: 0.5
                })
                    // Анимация цифры
                    .to(slide.querySelectorAll('.digit'), {
                        scale: 0,
                        opacity: 0,
                        duration: 0.3,
                        stagger: 0.1
                    }, '<')
                    // Анимация изображения (только opacity)
                    .to(slide.querySelector('.image img'), {
                        opacity: 0,
                        duration: 0.5
                    }, '<')
                    // Анимация последнего текста
                    .to(slide.querySelector('.last-txt'), {
                        y: 50,
                        opacity: 0,
                        duration: 0.4
                    }, '<')
                    // Анимация глобуса
                    .to(slide.querySelector('.globe'), {
                        rotation: 180,
                        opacity: 0,
                        duration: 0.4
                    }, '<');

                return tl;
            }

            function animateSlideIn(slide) {
                const tl = gsap.timeline();

                // Установка начальных позиций
                gsap.set(slide.querySelector('.project-info'), { y: 50, opacity: 0 });
                gsap.set(slide.querySelectorAll('.digit'), { scale: 0, opacity: 0 });
                gsap.set(slide.querySelector('.image img'), { opacity: 0 });
                gsap.set(slide.querySelector('.last-txt'), { y: -50, opacity: 0 });
                gsap.set(slide.querySelector('.globe'), { rotation: -180, opacity: 0 });

                // Анимация появления
                tl.to(slide.querySelector('.project-info'), {
                    y: 0,
                    opacity: 1,
                    duration: 0.5
                })
                    .to(slide.querySelectorAll('.digit'), {
                        scale: 1,
                        opacity: 1,
                        duration: 0.4,
                        stagger: 0.1
                    }, '-=0.3')
                    .to(slide.querySelector('.image img'), {
                        opacity: 1,
                        duration: 0.5
                    }, '<')
                    .to(slide.querySelector('.last-txt'), {
                        y: 0,
                        opacity: 1,
                        duration: 0.4
                    }, '<')
                    .to(slide.querySelector('.globe'), {
                        rotation: 0,
                        opacity: 1,
                        duration: 0.4
                    }, '<');

                return tl;
            }

            function changeSlide(direction) {
                const masterTimeline = gsap.timeline();

                let nextSlideIndex;
                if (direction === 'next') {
                    nextSlideIndex = (currentSlide + 1) % slides.length;
                } else {
                    nextSlideIndex = currentSlide - 1 < 0 ? slides.length - 1 : currentSlide - 1;
                }

                const currentSlideElement = slides[currentSlide];
                const nextSlideElement = slides[nextSlideIndex];

                masterTimeline
                    .add(animateSlideOut(currentSlideElement))
                    .add(() => {
                        currentSlideElement.classList.remove('active');
                        nextSlideElement.classList.add('active');
                    })
                    .add(animateSlideIn(nextSlideElement));

                currentSlide = nextSlideIndex;
            }

            // Обработчики кнопок
            document.querySelector('.next').addEventListener('click', () => changeSlide('next'));
            document.querySelector('.prev').addEventListener('click', () => changeSlide('prev'));

            // Инициализация первого слайда
            slides[0].classList.add('active');
            animateSlideIn(slides[0]);
        }
    })
})(jQuery)