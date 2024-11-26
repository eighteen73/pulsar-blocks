import EmblaCarousel from 'embla-carousel';

const carousels = document.getElementsByClassName('embla');

document.addEventListener('DOMContentLoaded', () => {
	for (let i = 0; i < carousels.length; i++) {
		const options = {};
		const emblaNode = carousels[i];
		const viewportNode = emblaNode.querySelector('.embla__viewport');
		const prevBtnNode = emblaNode.querySelector('.embla__button--prev');
		const nextBtnNode = emblaNode.querySelector('.embla__button--next');
		const dotsNode = emblaNode.querySelector('.embla__dots');
		const containerNode = emblaNode.querySelector('.embla__container');
		const queryLoop = containerNode.querySelector(
			'.wp-block-post-template'
		);

		if (queryLoop !== null) {
			options.container = queryLoop;
		} else {
			options.container = containerNode;
		}

		const emblaApi = EmblaCarousel(viewportNode, options);

		const removePrevNextBtnsClickHandlers = addPrevNextBtnsClickHandlers(
			emblaApi,
			prevBtnNode,
			nextBtnNode
		);
		const removeDotBtnsAndClickHandlers = addDotBtnsAndClickHandlers(
			emblaApi,
			dotsNode
		);

		emblaApi.on('destroy', removePrevNextBtnsClickHandlers);
		emblaApi.on('destroy', removeDotBtnsAndClickHandlers);
	}
});

const addTogglePrevNextBtnsActive = (emblaApi, prevBtn, nextBtn) => {
	const togglePrevNextBtnsState = () => {
		if (emblaApi.canScrollPrev()) prevBtn.removeAttribute('disabled');
		else prevBtn.setAttribute('disabled', 'disabled');

		if (emblaApi.canScrollNext()) nextBtn.removeAttribute('disabled');
		else nextBtn.setAttribute('disabled', 'disabled');
	};

	emblaApi
		.on('select', togglePrevNextBtnsState)
		.on('init', togglePrevNextBtnsState)
		.on('reInit', togglePrevNextBtnsState);

	return () => {
		prevBtn.removeAttribute('disabled');
		nextBtn.removeAttribute('disabled');
	};
};

const addPrevNextBtnsClickHandlers = (emblaApi, prevBtn, nextBtn) => {
	const scrollPrev = () => {
		emblaApi.scrollPrev();
	};
	const scrollNext = () => {
		emblaApi.scrollNext();
	};
	prevBtn.addEventListener('click', scrollPrev, false);
	nextBtn.addEventListener('click', scrollNext, false);

	const removeTogglePrevNextBtnsActive = addTogglePrevNextBtnsActive(
		emblaApi,
		prevBtn,
		nextBtn
	);

	return () => {
		removeTogglePrevNextBtnsActive();
		prevBtn.removeEventListener('click', scrollPrev, false);
		nextBtn.removeEventListener('click', scrollNext, false);
	};
};

const addDotBtnsAndClickHandlers = (emblaApi, dotsNode) => {
	let dotNodes = [];

	const addDotBtnsWithClickHandlers = () => {
		dotsNode.innerHTML = emblaApi
			.scrollSnapList()
			.map(() => '<button class="embla__dot" type="button"></button>')
			.join('');

		const scrollTo = (index) => {
			emblaApi.scrollTo(index);
		};

		dotNodes = Array.from(dotsNode.querySelectorAll('.embla__dot'));
		dotNodes.forEach((dotNode, index) => {
			dotNode.addEventListener('click', () => scrollTo(index), false);
		});
	};

	const toggleDotBtnsActive = () => {
		const previous = emblaApi.previousScrollSnap();
		const selected = emblaApi.selectedScrollSnap();
		dotNodes[previous].classList.remove('embla__dot--selected');
		dotNodes[selected].classList.add('embla__dot--selected');
	};

	emblaApi
		.on('init', addDotBtnsWithClickHandlers)
		.on('reInit', addDotBtnsWithClickHandlers)
		.on('init', toggleDotBtnsActive)
		.on('reInit', toggleDotBtnsActive)
		.on('select', toggleDotBtnsActive);

	return () => {
		dotsNode.innerHTML = '';
	};
};
