import { useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';
import { useSelect } from '@wordpress/data';
import { useEffect } from '@wordpress/element';
import useEmblaCarousel from 'embla-carousel-react';

import {
	addDotBtnsAndClickHandlers,
	addPrevNextBtnsClickHandlers,
} from '../utils/embla';

export default function Edit({
	clientId,
	attributes: { options },
	setAttributes,
}) {
	const blockProps = useBlockProps({ className: 'embla' });
	const { children, ...innerBlocksProps } = useInnerBlocksProps(blockProps, {
		orientation: 'vertical',
		template: [
			['pulsar/embla-carousel-viewport'],
			['pulsar/embla-carousel-buttons'],
			['pulsar/embla-carousel-dots'],
		],
		templateLock: false,
	});

	const innerBlocks = useSelect((select) =>
		select('core/block-editor').getBlock(clientId)
			? select('core/block-editor').getBlock(clientId).innerBlocks
			: []
	);

	const viewportBlock = innerBlocks.find(
		(block) => block.name === 'pulsar/embla-carousel-viewport'
	);

	const viewportInnerBlocks = useSelect((select) =>
		viewportBlock &&
		select('core/block-editor').getBlock(viewportBlock.clientId)
			? select('core/block-editor').getBlock(viewportBlock.clientId)
					.innerBlocks
			: []
	);

	const hasQueryLoop = viewportInnerBlocks.find(
		(block) => block.name === 'core/query'
	);

	const [emblaRef, emblaApi] = useEmblaCarousel({
		...options,
		container: hasQueryLoop
			? '.wp-block-post-template'
			: '.embla__container',
	});

	useEffect(() => {
		if (!emblaApi) return;

		setAttributes({ emblaApi });
	}, [emblaApi, setAttributes]);

	useEffect(() => {
		if (!emblaApi) return;

		setAttributes({ emblaApi });

		const block = document.querySelector(`[data-block="${clientId}"]`);
		const buttons = block.querySelectorAll('.embla__button');
		const dotsNode = block.querySelector('.embla__dots');

		if (buttons.length < 2 || !dotsNode) return;

		const removePrevNextBtnsClickHandlers = addPrevNextBtnsClickHandlers(
			emblaApi,
			buttons[0],
			buttons[1]
		);
		const removeDotBtnsAndClickHandlers = addDotBtnsAndClickHandlers(
			emblaApi,
			dotsNode
		);

		return () => {
			removePrevNextBtnsClickHandlers();
			removeDotBtnsAndClickHandlers();
		};
	}, [clientId, emblaApi, innerBlocks, setAttributes]);

	useEffect(() => {
		if (!emblaApi) return;

		setAttributes({ emblaApi });
	}, [emblaApi, setAttributes]);

	return (
		<div {...innerBlocksProps}>
			<div className="embla" ref={emblaRef}>
				{children}
			</div>
		</div>
	);
}