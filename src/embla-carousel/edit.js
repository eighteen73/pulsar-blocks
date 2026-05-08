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
	const buttonsBlock =
		innerBlocks.find(
			(block) => block.name === 'pulsar/embla-carousel-buttons'
		) || false;
	const dotsBlock =
		innerBlocks.find(
			(block) => block.name === 'pulsar/embla-carousel-dots'
		) || false;

	const viewportInnerBlocks = useSelect((select) =>
		viewportBlock &&
		select('core/block-editor').getBlock(viewportBlock.clientId)
			? select('core/block-editor').getBlock(viewportBlock.clientId)
					.innerBlocks
			: []
	);
	const {
		selectedBlockClientId,
		selectedBlockParents,
		selectedBlockDescendants,
	} = useSelect((select) => {
		const store = select('core/block-editor');
		const currentSelectedBlockClientId = store.getSelectedBlockClientId();
		const selectedBlock = currentSelectedBlockClientId
			? store.getBlock(currentSelectedBlockClientId)
			: null;
		const descendantIds = [];

		const collectDescendants = (block) => {
			if (!block?.innerBlocks?.length) {
				return;
			}

			block.innerBlocks.forEach((innerBlock) => {
				descendantIds.push(innerBlock.clientId);
				collectDescendants(innerBlock);
			});
		};
		collectDescendants(selectedBlock);

		return {
			selectedBlockClientId: currentSelectedBlockClientId,
			selectedBlockParents: currentSelectedBlockClientId
				? store.getBlockParents(currentSelectedBlockClientId)
				: [],
			selectedBlockDescendants: descendantIds,
		};
	});

	const hasQueryLoop = viewportInnerBlocks.find(
		(block) =>
			block.name === 'core/query' ||
			block.name === 'woocommerce/product-collection'
	);

	const getContainer = () => {
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
	};

	const [emblaRef, emblaApi] = useEmblaCarousel({
		...options,
		container: getContainer(),
		// Gutenberg can temporarily wrap inner blocks during selection/focus changes.
		// Target real block nodes instead of direct children to keep snap count stable.
		slides: '.block-editor-block-list__block:not(.block-list-appender)',
		// Prevent editor focus changes from auto-scrolling to a different slide.
		watchFocus: false,
	});

	useEffect(() => {
		if (!emblaApi) return;

		setAttributes({ emblaApi });
	}, [emblaApi, setAttributes]);

	useEffect(() => {
		if (!emblaApi) return;

		setAttributes({ emblaApi });
		let removePrevNextBtnsClickHandlers = null;
		let removeDotBtnsAndClickHandlers = null;
		let controlsObserver = null;
		let controlsBound = false;

		const bindControls = () => {
			const blockCandidates = Array.from(
				document.querySelectorAll(`[data-block="${clientId}"]`)
			);
			const block =
				blockCandidates.find((node) => node.querySelector('.embla')) ||
				blockCandidates[0] ||
				null;
			const buttonsNode = buttonsBlock?.clientId
				? block?.querySelector(
						`[data-block="${buttonsBlock.clientId}"]`
					)
				: block?.querySelector('.embla__buttons');
			const dotsNodeById = dotsBlock?.clientId
				? block?.querySelector(`[data-block="${dotsBlock.clientId}"]`)
				: block?.querySelector('.embla__dots');
			const buttons = buttonsNode?.querySelectorAll('.embla__button');
			const dotsNode =
				dotsNodeById || block?.querySelector('.embla__dots');

			if (!buttons || buttons.length < 2 || !dotsNode) {
				return false;
			}

			removePrevNextBtnsClickHandlers = addPrevNextBtnsClickHandlers(
				emblaApi,
				buttons[0],
				buttons[1]
			);
			removeDotBtnsAndClickHandlers = addDotBtnsAndClickHandlers(
				emblaApi,
				dotsNode
			);
			controlsBound = true;
			return true;
		};

		if (!bindControls()) {
			controlsObserver = new MutationObserver(() => {
				if (!controlsBound && bindControls()) {
					controlsObserver?.disconnect();
				}
			});
			controlsObserver.observe(document.body, {
				childList: true,
				subtree: true,
			});
		}

		return () => {
			controlsObserver?.disconnect();
			removePrevNextBtnsClickHandlers?.();
			removeDotBtnsAndClickHandlers?.();
		};
	}, [
		clientId,
		emblaApi,
		innerBlocks,
		setAttributes,
		buttonsBlock,
		dotsBlock,
	]);

	useEffect(() => {
		if (!emblaApi || !selectedBlockClientId || !viewportBlock) return;
		if (
			selectedBlockClientId !== clientId &&
			!selectedBlockParents.includes(clientId)
		) {
			return;
		}

		const getDescendantIds = (block) => {
			if (!block?.innerBlocks?.length) {
				return [];
			}

			const ids = [];
			const collect = (innerBlock) => {
				ids.push(innerBlock.clientId);
				innerBlock.innerBlocks?.forEach(collect);
			};
			block.innerBlocks.forEach(collect);

			return ids;
		};

		const rootSlideDescendantMaps = viewportInnerBlocks.map(
			(block, index) => ({
				index,
				rootClientId: block.clientId,
				allRelatedIds: [block.clientId, ...getDescendantIds(block)],
			})
		);
		const carouselContainerNode = document.querySelector(
			`[data-block="${clientId}"] .embla__container`
		);
		const domMatchedBlockClientId =
			[selectedBlockClientId, ...selectedBlockParents].find((id) =>
				carouselContainerNode?.querySelector(`[data-block="${id}"]`)
			) || null;
		const domMatchedBlockNode = domMatchedBlockClientId
			? carouselContainerNode?.querySelector(
					`[data-block="${domMatchedBlockClientId}"]`
				)
			: null;
		const domDirectSlideNodes = carouselContainerNode
			? Array.from(carouselContainerNode.children).filter(
					(node) => !node.classList.contains('block-list-appender')
				)
			: [];
		const domMatchedViewportIndex =
			domMatchedBlockNode && domDirectSlideNodes.length > 0
				? domDirectSlideNodes.findIndex(
						(node) =>
							node === domMatchedBlockNode ||
							node.contains(domMatchedBlockNode)
					)
				: -1;

		const exactSelectedViewportIndex = viewportInnerBlocks.findIndex(
			(block) => block.clientId === selectedBlockClientId
		);
		const parentMatchedViewportIndex =
			exactSelectedViewportIndex === -1
				? viewportInnerBlocks.findIndex((block) =>
						selectedBlockParents.includes(block.clientId)
					)
				: -1;
		const descendantMatchedViewportIndex =
			exactSelectedViewportIndex === -1 &&
			parentMatchedViewportIndex === -1
				? viewportInnerBlocks.findIndex((block) =>
						selectedBlockDescendants.includes(block.clientId)
					)
				: -1;
		const ancestryMatchedViewportIndex =
			exactSelectedViewportIndex === -1 &&
			parentMatchedViewportIndex === -1 &&
			descendantMatchedViewportIndex === -1
				? (rootSlideDescendantMaps.find((slideMap) =>
						[selectedBlockClientId, ...selectedBlockParents].some(
							(id) => slideMap.allRelatedIds.includes(id)
						)
					)?.index ?? -1)
				: -1;
		let selectedViewportIndex = domMatchedViewportIndex;

		if (exactSelectedViewportIndex !== -1) {
			selectedViewportIndex = exactSelectedViewportIndex;
		} else if (parentMatchedViewportIndex !== -1) {
			selectedViewportIndex = parentMatchedViewportIndex;
		} else if (descendantMatchedViewportIndex !== -1) {
			selectedViewportIndex = descendantMatchedViewportIndex;
		} else if (ancestryMatchedViewportIndex !== -1) {
			selectedViewportIndex = ancestryMatchedViewportIndex;
		}
		const currentSnap = emblaApi.selectedScrollSnap();

		if (
			selectedViewportIndex > -1 &&
			currentSnap !== selectedViewportIndex &&
			selectedViewportIndex < emblaApi.scrollSnapList().length
		) {
			emblaApi.scrollTo(selectedViewportIndex);
		}
	}, [
		emblaApi,
		selectedBlockClientId,
		selectedBlockParents,
		selectedBlockDescendants,
		viewportInnerBlocks,
		viewportBlock,
		clientId,
	]);

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
						onClickAfter={() => {}}
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
