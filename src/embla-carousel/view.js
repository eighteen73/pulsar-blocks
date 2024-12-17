import EmblaCarousel from 'embla-carousel';
import ClassNames from 'embla-carousel-class-names';
import Fade from 'embla-carousel-fade';
import Autoplay from 'embla-carousel-autoplay';
import Autoscroll from 'embla-carousel-auto-scroll';

window.pulsarBlocks = window.pulsarBlocks || {};
window.pulsarBlocks.emblaCarousels = new Map();

document.addEventListener('DOMContentLoaded', () => {
	const carouselBlocks = document.querySelectorAll(
		'.wp-block-pulsar-embla-carousel'
	);

	carouselBlocks.forEach((carouselBlock) => {
		const emblaNode = carouselBlock.querySelector('.embla');
		const emblaId = emblaNode.dataset.emblaId;
		const options = JSON.parse(emblaNode.dataset.emblaOptions);
		const fade = emblaNode.dataset.emblaFade === 'true';
		const autoplay = emblaNode.dataset.emblaAutoplay === 'true';
		const autoplayOptions = JSON.parse(
			emblaNode.dataset.emblaAutoplayOptions
		);
		const autoscroll = emblaNode.dataset.emblaAutoscroll === 'true';
		const autoscrollOptions = JSON.parse(
			emblaNode.dataset.emblaAutoscrollOptions
		);
		const viewportNode = emblaNode.querySelector('.embla__viewport');
		const prevBtnNode = emblaNode.querySelector('.embla__button--prev');
		const nextBtnNode = emblaNode.querySelector('.embla__button--next');
		const dotsNode = emblaNode.querySelector('.embla__dots');
		const containerNode = emblaNode.querySelector('.embla__container');
		const queryLoop = containerNode.querySelector(
			'.wp-block-post-template'
		);

		const plugins = [ClassNames()];
		if (fade) {
			plugins.push(Fade());
		}
		if (autoplay) {
			plugins.push(Autoplay(autoplayOptions));
			options.loop = true;
		}
		if (autoscroll) {
			plugins.push(Autoscroll(autoscrollOptions));
		}

		if (queryLoop !== null) {
			options.container = queryLoop;
		} else {
			options.container = containerNode;
		}

		const emblaApi = EmblaCarousel(viewportNode, options, plugins);

		window.pulsarBlocks.emblaCarousels.set(emblaId, emblaApi);

		if (prevBtnNode && nextBtnNode) {
			const removePrevNextBtnsClickHandlers =
				addPrevNextBtnsClickHandlers(
					emblaApi,
					prevBtnNode,
					nextBtnNode
				);

			emblaApi.on('destroy', removePrevNextBtnsClickHandlers);
		}

		if (dotsNode) {
			const removeDotBtnsAndClickHandlers = addDotBtnsAndClickHandlers(
				emblaApi,
				dotsNode
			);

			emblaApi.on('destroy', removeDotBtnsAndClickHandlers);
		}
	});
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
