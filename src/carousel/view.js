import { Splide } from '@splidejs/splide';

const carousels = document.getElementsByClassName('wp-block-pulsar-carousel');

document.addEventListener('DOMContentLoaded', () => {
	for (let i = 0; i < carousels.length; i++) {
		const carousel = new Splide(carousels[i]);
		carousel.mount();
	}
});
