gsap.registerPlugin(ScrollTrigger);

gsap.utils.toArray('.head-opacity').forEach(head => {
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
                end: "top 20%",
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
                end: "top 20%",
                scrub: 0.5
            },
            x: 100, // начальная позиция справа
            opacity: 0
        });
    });

// const panels = gsap.utils.toArray(".weeks__wrapper .image");
// const lastImage = panels[panels.length - 1];
// // Добавляем контейнер для последнего изображения, если его нет
// const lastImageContainer = document.createElement('div');
// lastImageContainer.style.width = '100%';
// lastImage.parentElement.insertBefore(lastImageContainer, lastImage);
// lastImageContainer.appendChild(lastImage);

// panels && panels.forEach((panel, i) => {
// 	const isLastPanel = panel === lastImage;
// 	let panelHeight = panel.offsetHeight;
// 	let windowHeight = window.innerHeight;
// 	let difference = panelHeight - windowHeight;
// 	let fakeScrollRatio = difference > 0 ? (difference / (difference + windowHeight)) : 0;
// 	let tl;

// 	if (isLastPanel) {
// 		tl = gsap.timeline({
// 			scrollTrigger: {
// 				trigger: lastImageContainer,
// 				start: "top top",
// 				end: "+=600%",
// 				pin: true,
// 				scrub: 1,
// 				pinSpacing: true,
// 				onUpdate: (self) => {
// 					let progress = self.progress;

// 					// Первая треть скролла (0-0.33) - увеличение ширины
// 					if (progress <= 0.33) {
// 						let widthProgress = gsap.utils.mapRange(0, 0.33, 0, 1, progress);
// 						gsap.set(panel, {
// 							width: gsap.utils.interpolate(50, 100, widthProgress) + "%",
// 							scale: 1
// 						});
// 					}
// 					// Вторая треть скролла (0.33-0.66) - увеличение scale
// 					else if (progress <= 0.66) {
// 						let scaleProgress = gsap.utils.mapRange(0.33, 0.66, 0, 1, progress);
// 						gsap.set(panel, {
// 							width: "100%",
// 							scale: gsap.utils.interpolate(1, 1.4, scaleProgress)
// 						});
// 					}
// 					// Последняя треть (0.66-1) - фиксированное состояние
// 					else {
// 						gsap.set(panel, {
// 							width: "100%",
// 							scale: 1.4
// 						});
// 					}
// 				},

// 			}
// 		});

// 	} else {
// 		if (fakeScrollRatio) {
// 			panel.style.marginBottom = panelHeight * fakeScrollRatio + "px";
// 		}
// 		// Анимация для остальных панелей
// 		tl = gsap.timeline({
// 			scrollTrigger: {
// 				trigger: isLastPanel ? lastImageContainer : panel,
// 				start: "top top",
// 				end: fakeScrollRatio ? `+=${panel.offsetHeight}` : "bottom top",
// 				pin: true,
// 				scrub: 1,
// 			}
// 		});

// 		if (fakeScrollRatio) {
// 			tl.to(panel, { y: -difference, duration: 1 / (1 - fakeScrollRatio) - 1, ease: "none" });
// 		}
// 		tl.fromTo(panel,
// 			{ scale: 1, opacity: 1 },
// 			{ scale: 0.8, opacity: 0, ease: "none" }
// 		);
// 	}
// });

const textG = document.querySelector('#textClip text');
const video = document.querySelector('.cover');
const clipPath = document.querySelector('#textClip');

if(textG) {
	
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