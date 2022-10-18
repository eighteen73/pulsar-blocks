import {
	useBlockProps,
	useInnerBlocksProps,
	BlockControls,
} from "@wordpress/block-editor";

import { Button } from "@wordpress/components";

import { useState, useEffect, useCallback } from "@wordpress/element";

import { dispatch, select, subscribe } from "@wordpress/data";

import { createBlock } from "@wordpress/blocks";

import Splide from "@splidejs/splide";

import "./editor.css";

const ALLOWED_BLOCKS = ["pulsar/carousel-slide"];

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @param {Object} param0
 * @param {Object} param0.attributes
 * @param          param0.attributes.splide
 * @param {Object} param0.clientId
 * @return {WPElement} Element to render.
 *
 *
 */
export default function Edit({ attributes: { splide }, clientId }) {
	const [carousel, setCarousel] = useState({});

	const refreshCarousel = () => {
		if (Object.keys(carousel).length !== 0) {
			carousel.refresh();
		}
	};

	const addBlock = () => {
		const innerBlocks =
			select("core/editor").getBlocksByClientId(clientId)[0].innerBlocks;
		const block = createBlock("pulsar/carousel-slide");
		dispatch("core/editor")
			.insertBlock(block, innerBlocks.length, clientId)
			.then(() => {
				refreshCarousel();
				carousel.go(innerBlocks.length);
			});
	};

	const innerBlocksProps = useInnerBlocksProps(
		{ className: "splide__list" },
		{
			orientation: "horizontal",
			allowedBlocks: ALLOWED_BLOCKS,
			renderAppender: false,
		}
	);

	const callback = useCallback(() => {
		console.log("hello");
		refreshCarousel();
	});

	// Set up the carousel.
	useEffect(() => {
		const splide = new Splide(`#block-${clientId}`);
		setCarousel(splide.mount());

		return function cleanup() {
			setCarousel(null);
		};
	}, []);

	// Watch for a change in child blocks and refresh.
	useEffect(() => {
		const { getBlock } = select("core/block-editor");
		let blockList = getBlock(clientId).innerBlocks;

		subscribe(() => {
			const newBlockList = getBlock(clientId).innerBlocks;
			const blockListChanged = newBlockList !== blockList;
			blockList = newBlockList;

			if (blockListChanged) {
				callback();
			}
		});
	});

	return (
		<>
			<BlockControls>
				<Button
					style={{ borderRight: "1px solid #000" }}
					onClick={addBlock}
				>
					Add Slide
				</Button>
			</BlockControls>
			<div
				{...useBlockProps({ className: "splide" })}
				aria-label=""
				data-splide={JSON.stringify(splide)}
			>
				<div className="splide__track">
					<div {...innerBlocksProps}></div>
				</div>
			</div>
		</>
	);
}
