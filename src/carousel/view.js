import EmblaCarousel from 'embla-carousel';

const carousels = document.getElementsByClassName('embla');

document.addEventListener('DOMContentLoaded', () => {
	for (let i = 0; i < carousels.length; i++) {
		const options = carousels[i].dataset.embla;
		const emblaApi = EmblaCarousel(carousels[i], options);
	}
});
