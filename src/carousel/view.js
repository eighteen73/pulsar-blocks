import { Splide } from '@splidejs/splide';

const carousels = document.getElementsByClassName('wp-block-pulsar-carousel');

document.addEventListener('DOMContentLoaded', () => {
	for (let i = 0; i < carousels.length; i++) {
		const carouselContainer = carousels[i].querySelector('.splide');
		const carouselOptions = JSON.parse(
			carouselContainer.getAttribute('data-splide')
		);
		const carousel = new Splide(carouselContainer);
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

		carousel.mount();
	}
});
