import { useState, useEffect, useCallback } from '@wordpress/element';
import { useSelect } from '@wordpress/data';
import { store as blockEditorStore } from '@wordpress/block-editor';

export const usePrevNextButtons = (emblaApi) => {
	const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
	const [nextBtnDisabled, setNextBtnDisabled] = useState(true);

	const onPrevButtonClick = useCallback(() => {
		if (!emblaApi) return;
		emblaApi.scrollPrev();
	}, [emblaApi]);

	const onNextButtonClick = useCallback(() => {
		if (!emblaApi) return;
		emblaApi.scrollNext();
	}, [emblaApi]);

	const onSelect = useCallback((api) => {
		setPrevBtnDisabled(!api.canScrollPrev());
		setNextBtnDisabled(!api.canScrollNext());
	}, []);

	useEffect(() => {
		if (!emblaApi) return;

		onSelect(emblaApi);
		emblaApi.on('reInit', onSelect).on('select', onSelect);
	}, [emblaApi, onSelect]);

	return {
		prevBtnDisabled,
		nextBtnDisabled,
		onPrevButtonClick,
		onNextButtonClick,
	};
};

export const addTogglePrevNextBtnsActive = (emblaApi, prevBtn, nextBtn) => {
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

export const addPrevNextBtnsClickHandlers = (emblaApi, prevBtn, nextBtn) => {
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

export const addDotBtnsAndClickHandlers = (emblaApi, dotsNode) => {
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

export const useEmblaCarousels = () => {
	return useSelect((select) => {
		const data = [];
		const blocks = select(blockEditorStore).getBlocks();

		const searchNestedBlocks = (block) => {
			if (block?.innerBlocks) {
				block.innerBlocks.forEach((innerBlock) => {
					if (innerBlock.name === 'pulsar/embla-carousel') {
						data.push(innerBlock);
					}

					searchNestedBlocks(innerBlock);
				});
			}
		};

		blocks.forEach((block) => {
			if (block.name === 'pulsar/embla-carousel') {
				data.push(block);
			}

			searchNestedBlocks(block);
		});

		return data;
	});
};

export const setupProgressBar = (emblaApi, progressNode) => {
	const applyProgress = () => {
		const indicateCurrentPosition =
			progressNode.parentElement.dataset.indicateCurrentPosition ===
			'true';
		let finalProgress;

		if (indicateCurrentPosition) {
			const totalScrollSnaps = emblaApi.scrollSnapList().length;
			const currentSnapIndex = emblaApi.selectedScrollSnap();

			if (totalScrollSnaps > 0) {
				finalProgress = (currentSnapIndex + 1) / totalScrollSnaps;
			} else {
				finalProgress = 0;
			}
		} else {
			finalProgress = emblaApi.scrollProgress();
			progressNode.style.transition = 'none';
		}

		finalProgress = Math.max(0, Math.min(1, finalProgress));
		progressNode.style.transform = `translate3d(${finalProgress * 100}%,0px,0px)`;
	};

	const removeProgress = () => {
		progressNode.removeAttribute('style');
	};

	return {
		applyProgress,
		removeProgress,
	};
};
