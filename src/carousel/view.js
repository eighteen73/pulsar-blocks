import { Splide } from '@splidejs/splide';

const carousels = document.getElementsByClassName('wp-block-pulsar-carousel');

document.addEventListener('DOMContentLoaded', () => {
	for (let i = 0; i < carousels.length; i++) {
		const carouselContainer = carousels[i].querySelector('.splide');
		const carousel = new Splide(carouselContainer);
		carousel.mount();
	}
});
