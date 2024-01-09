import { Splide } from '@splidejs/splide';

const containers = document.getElementsByClassName(
	'wp-block-pulsar-linked-carousels'
);

document.addEventListener('DOMContentLoaded', () => {
	for (let i = 0; i < containers.length; i++) {
		const carousels = containers[i].querySelectorAll('.splide');

		let primaryCarousel = null;
		let secondaryCarousel = null;

		for (let j = 0; j < carousels.length; j++) {
			const carouselOptions = JSON.parse(
				carousels[j].getAttribute('data-splide')
			);

			if (carouselOptions.isNavigation) {
				secondaryCarousel = carousels[j];
			} else {
				primaryCarousel = carousels[j];
			}
		}

		if (!primaryCarousel || !secondaryCarousel) {
			continue;
		}

		primaryCarousel = new Splide(primaryCarousel);
		secondaryCarousel = new Splide(secondaryCarousel);

		primaryCarousel.sync(secondaryCarousel);

		setProgressBar(primaryCarousel, primaryCarousel.root);
		setProgressBar(secondaryCarousel, secondaryCarousel.root);

		primaryCarousel.mount();
		secondaryCarousel.mount();
	}
});

const setProgressBar = (carousel, carouselContainer) => {
	const carouselOptions = JSON.parse(
		carouselContainer.getAttribute('data-splide')
	);

	const pageProgressBar = carousel.root.querySelector(
		'.splide__progress__bar'
	);

	if (
		pageProgressBar &&
		carouselOptions.progressBar &&
		!carouselOptions.autoplay
	) {
		carousel.on('mounted move', function () {
			const end = carousel.Components.Controller.getEnd() + 1;
			const rate = Math.min((carousel.index + 1) / end, 1);
			pageProgressBar.style.width = String(100 * rate) + '%';
			pageProgressBar.style.transitionDuration =
				carousel.options.speed + 'ms';
		});
	}
};
