import { useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';
import { useSelect } from '@wordpress/data';
import { useEffect } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import useEmblaCarousel from 'embla-carousel-react';
import SingleBlockTypeAppender from '../components/single-block-type-appender';

import {
	addDotBtnsAndClickHandlers,
	addPrevNextBtnsClickHandlers,
} from '../utils/embla';

import './editor.scss';

export default function Edit({
	clientId,
	attributes: { options },
	setAttributes,
	isSelected,
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

	const viewportBlock =
		innerBlocks.find(
			(block) => block.name === 'pulsar/embla-carousel-viewport'
		) || false;

	const viewportInnerBlocks = useSelect((select) =>
		viewportBlock &&
			select('core/block-editor').getBlock(viewportBlock.clientId)
			? select('core/block-editor').getBlock(viewportBlock.clientId)
				.innerBlocks
			: []
	);

	const hasQueryLoop = viewportInnerBlocks.find(
		(block) => block.name === 'core/query' || block.name === 'woocommerce/product-collection'
	);

	function getContainer() {

		if (!hasQueryLoop) {
			return '.embla__container';
		}

		if (hasQueryLoop.name === 'core/query') {
			return '.wp-block-post-template';
		}
		if (hasQueryLoop.name === 'woocommerce/product-collection') {
			return '.wp-block-woocommerce-product-template';
		}

		return '.embla__container';
	}

	const [emblaRef, emblaApi] = useEmblaCarousel({
		...options,
		container: getContainer(),
	});

	useEffect(() => {
		if (!emblaApi) return;

		setAttributes({ emblaApi });
	}, [emblaApi, setAttributes]);

	useEffect(() => {
		if (!emblaApi) return;

		setAttributes({ emblaApi });

		const block = document.querySelector(`[data-block="${clientId}"]`);
		const buttons = block?.querySelectorAll('.embla__button');
		const dotsNode = block?.querySelector('.embla__dots');

		if (!buttons || buttons.length < 2 || !dotsNode) return;

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

	const isInnerBlockSelected = useSelect((select) =>
		select('core/block-editor').hasSelectedInnerBlock(clientId, true)
	);

	return (
		<div {...innerBlocksProps}>
			<div className="embla" ref={emblaRef}>
				{children}
			</div>

			{viewportBlock &&
				viewportBlock?.attributes?.allowedBlocks?.length === 1 &&
				(isSelected || isInnerBlockSelected) && (
					<SingleBlockTypeAppender
						onClickAfter={() => { }}
						variant="secondary"
						text={__('Add item', 'pulsar-blocks')}
						allowedBlock={
							viewportBlock?.attributes?.allowedBlocks?.[0]
						}
						style={{
							width: '50%',
							justifyContent: 'center',
							marginTop: '1rem',
							marginLeft: 'auto',
							marginRight: 'auto',
							display: 'flex',
						}}
						clientId={viewportBlock.clientId}
					/>
				)}
		</div>
	);
}
