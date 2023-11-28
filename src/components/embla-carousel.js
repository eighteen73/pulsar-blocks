import { useCallback, useEffect, useState } from '@wordpress/element';
import useEmblaCarousel from 'embla-carousel-react';

const Carousel = ({
	options,
	arrows,
	pagination,
	hasContainer,
	children,
	...props
}) => {
	const [emblaRef, emblaApi] = useEmblaCarousel(options);
	const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
	const [nextBtnDisabled, setNextBtnDisabled] = useState(true);
	const [selectedIndex, setSelectedIndex] = useState(0);
	const [scrollSnaps, setScrollSnaps] = useState([]);

	const scrollPrev = useCallback(
		() => emblaApi && emblaApi.scrollPrev(),
		[emblaApi]
	);
	const scrollNext = useCallback(
		() => emblaApi && emblaApi.scrollNext(),
		[emblaApi]
	);
	const scrollTo = useCallback(
		(index) => emblaApi && emblaApi.scrollTo(index),
		[emblaApi]
	);

	const onInit = useCallback((emblaApi) => {
		setScrollSnaps(emblaApi.scrollSnapList());
	}, []);

	const onSelect = useCallback((emblaApi) => {
		setSelectedIndex(emblaApi.selectedScrollSnap());
		setPrevBtnDisabled(!emblaApi.canScrollPrev());
		setNextBtnDisabled(!emblaApi.canScrollNext());
	}, []);

	useEffect(() => {
		if (!emblaApi) return;

		onInit(emblaApi);
		onSelect(emblaApi);
		emblaApi.on('reInit', onInit);
		emblaApi.on('reInit', onSelect);
		emblaApi.on('select', onSelect);
	}, [emblaApi, onInit, onSelect]);

	return (
		<>
			<section className="embla" {...props}>
				<div className="embla__viewport" ref={emblaRef}>
					{hasContainer ? (
						<ul className="embla__container">{children}</ul>
					) : (
						children
					)}
				</div>

				{arrows && (
					<ul className="embla__navigation">
						<li className="embla__navigation__item embla__navigation__item--prev">
							<PrevButton
								onClick={scrollPrev}
								disabled={prevBtnDisabled}
							/>
						</li>

						<li className="embla__navigation__item embla__navigation__item--next">
							<NextButton
								onClick={scrollNext}
								disabled={nextBtnDisabled}
							/>
						</li>
					</ul>
				)}

				{pagination && (
					<ul className="embla__pagination">
						{scrollSnaps.map((_, index) => (
							<li className="embla__pagination-item" key={index}>
								<DotButton
									onClick={() => scrollTo(index)}
									className={'embla__pagination-button'.concat(
										index === selectedIndex
											? ' is-active'
											: ''
									)}
								/>
							</li>
						))}
					</ul>
				)}
			</section>
		</>
	);
};

export const DotButton = (props) => {
	const { children, ...restProps } = props;

	return (
		<button type="button" {...restProps}>
			{children}
		</button>
	);
};

export const PrevButton = (props) => {
	const { children, ...restProps } = props;

	return (
		<button
			className="embla__button embla__button--prev"
			type="button"
			{...restProps}
		>
			<svg className="embla__button__svg" viewBox="0 0 532 532">
				<path
					fill="currentColor"
					d="M355.66 11.354c13.793-13.805 36.208-13.805 50.001 0 13.785 13.804 13.785 36.238 0 50.034L201.22 266l204.442 204.61c13.785 13.805 13.785 36.239 0 50.044-13.793 13.796-36.208 13.796-50.002 0a5994246.277 5994246.277 0 0 0-229.332-229.454 35.065 35.065 0 0 1-10.326-25.126c0-9.2 3.393-18.26 10.326-25.2C172.192 194.973 332.731 34.31 355.66 11.354Z"
				/>
			</svg>
			{children}
		</button>
	);
};

export const NextButton = (props) => {
	const { children, ...restProps } = props;

	return (
		<button
			className="embla__button embla__button--next"
			type="button"
			{...restProps}
		>
			<svg className="embla__button__svg" viewBox="0 0 532 532">
				<path
					fill="currentColor"
					d="M176.34 520.646c-13.793 13.805-36.208 13.805-50.001 0-13.785-13.804-13.785-36.238 0-50.034L330.78 266 126.34 61.391c-13.785-13.805-13.785-36.239 0-50.044 13.793-13.796 36.208-13.796 50.002 0 22.928 22.947 206.395 206.507 229.332 229.454a35.065 35.065 0 0 1 10.326 25.126c0 9.2-3.393 18.26-10.326 25.2-45.865 45.901-206.404 206.564-229.332 229.52Z"
				/>
			</svg>
			{children}
		</button>
	);
};

export default Carousel;
