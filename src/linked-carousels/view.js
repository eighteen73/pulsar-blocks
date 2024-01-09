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
		primaryCarousel.mount();
		secondaryCarousel.mount();
	}
});
