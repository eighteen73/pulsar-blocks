import {
	InnerBlocks,
	useBlockProps,
	useInnerBlocksProps,
	BlockControls,
} from "@wordpress/block-editor";

import { Button } from "@wordpress/components";

import { useState, useEffect } from "@wordpress/element";

import { dispatch, select } from "@wordpress/data";

import { createBlock } from "@wordpress/blocks";

import Splide from "@splidejs/splide";

import "./editor.css";

const ALLOWED_BLOCKS = ["pulsar/carousel-slide"];

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @param {Object}   param0
 * @param {Object}   param0.clientId
 * @param {Object}   param0.attributes
 * @param {Function} param0.setAttributes
 * @return {WPElement} Element to render.
 *
 *
 */
export default function Edit({ attributes: { splide }, clientId }) {
	const blockProps = useBlockProps();

	const [carousel, setCarousel] = useState({});

	/*
	useEffect(() => {
		if (Object.keys(carousel).length === 0) {
			const splide = new Splide(`#block-${clientId}`);
			setCarousel(splide.mount());
			return;
		}
		carousel.destroy(false);
	}, []);

	*/

	useEffect(() => {
		const splide = new Splide(`#block-${clientId}`);
		setCarousel(splide.mount());
	}, []);

	const refreshCarousel = () => {
		carousel.destroy(false);
		setCarousel(new Splide(`#block-${clientId}`).mount());
	};

	const addBlock = () => {
		const innerBlocks =
			select("core/editor").getBlocksByClientId(clientId)[0].innerBlocks;
		const block = createBlock("pulsar/carousel-slide");
		dispatch("core/editor")
			.insertBlock(block, innerBlocks.length, clientId)
			.then(() => refreshCarousel());
	};

	const innerBlocksProps = useInnerBlocksProps(
		{ className: "splide__list" },
		{
			orientation: "horizontal",
			allowedBlocks: ALLOWED_BLOCKS,
			renderAppender: false,
		}
	);

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
