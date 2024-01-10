import { Splide } from '@splidejs/splide';

const carousels = document.getElementsByClassName('wp-block-pulsar-carousel');

document.addEventListener('DOMContentLoaded', () => {
	for (let i = 0; i < carousels.length; i++) {
		const isLinkedCarousels = !!carousels[i].closest(
			'.wp-block-pulsar-linked-carousels'
		);

		if (isLinkedCarousels) {
			continue;
		}

		const carouselContainer = carousels[i].querySelector('.splide');
		const carousel = new Splide(carouselContainer);

		setProgressBar(carousel, carouselContainer);

		carousel.mount();
	}
});

const setProgressBar = (carousel, carouselContainer) => {
	const carouselOptions = JSON.parse(
		carouselContainer.getAttribute('data-splide')
	);

	const pageProgressBar = carousel.root.querySelector(
		'.splide__progress__bar'
	);

	const progressBarFromBeginning = carouselOptions.progressBarFromBeginning;

	if (
		pageProgressBar &&
		carouselOptions.progressBar &&
		!carouselOptions.autoplay
	) {
		carousel.on('mounted move', function () {
			const end = progressBarFromBeginning
				? carousel.Components.Controller.getEnd()
				: carousel.Components.Controller.getEnd() + 1;
			const rate = progressBarFromBeginning
				? carousel.index / end
				: Math.min((carousel.index + 1) / end, 1);
			pageProgressBar.style.width = String(100 * rate) + '%';
			pageProgressBar.style.transitionDuration =
				carousel.options.speed + 'ms';
		});
	}
};
