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

gsap.registerPlugin(ScrollTrigger);

const panels = gsap.utils.toArray(".weeks__wrapper .image");
const lastImage = panels[panels.length - 1];
// Добавляем контейнер для последнего изображения, если его нет
const lastImageContainer = document.createElement('div');
lastImageContainer.style.width = '100%';
lastImage.parentElement.insertBefore(lastImageContainer, lastImage);
lastImageContainer.appendChild(lastImage);

panels.forEach((panel, i) => {
	const isLastPanel = panel === lastImage;
	let panelHeight = panel.offsetHeight;
	let windowHeight = window.innerHeight;
	let difference = panelHeight - windowHeight;
	let fakeScrollRatio = difference > 0 ? (difference / (difference + windowHeight)) : 0;
	let tl;

	if (isLastPanel) {
		tl = gsap.timeline({
			scrollTrigger: {
				trigger: lastImageContainer,
				start: "top top",
				end: "+=600%",
				pin: true,
				scrub: 1,
				pinSpacing: true,
				onUpdate: (self) => {
					let progress = self.progress;

					// Первая треть скролла (0-0.33) - увеличение ширины
					if (progress <= 0.33) {
						let widthProgress = gsap.utils.mapRange(0, 0.33, 0, 1, progress);
						gsap.set(panel, {
							width: gsap.utils.interpolate(50, 100, widthProgress) + "%",
							scale: 1
						});
					}
					// Вторая треть скролла (0.33-0.66) - увеличение scale
					else if (progress <= 0.66) {
						let scaleProgress = gsap.utils.mapRange(0.33, 0.66, 0, 1, progress);
						gsap.set(panel, {
							width: "100%",
							scale: gsap.utils.interpolate(1, 1.4, scaleProgress)
						});
					}
					// Последняя треть (0.66-1) - фиксированное состояние
					else {
						gsap.set(panel, {
							width: "100%",
							scale: 1.4
						});
					}
				},

			}
		});

	} else {
		if (fakeScrollRatio) {
			panel.style.marginBottom = panelHeight * fakeScrollRatio + "px";
		}
		// Анимация для остальных панелей
		tl = gsap.timeline({
			scrollTrigger: {
				trigger: isLastPanel ? lastImageContainer : panel,
				start: "top top",
				end: fakeScrollRatio ? `+=${panel.offsetHeight}` : "bottom top",
				pin: true,
				scrub: 1,
			}
		});

		if (fakeScrollRatio) {
			tl.to(panel, { y: -difference, duration: 1 / (1 - fakeScrollRatio) - 1, ease: "none" });
		}
		tl.fromTo(panel,
			{ scale: 1, opacity: 1 },
			{ scale: 0.8, opacity: 0, ease: "none" }
		);
	}
});


