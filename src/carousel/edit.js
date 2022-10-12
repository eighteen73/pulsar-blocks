import {
	InnerBlocks,
	useBlockProps,
	useInnerBlocksProps,
} from '@wordpress/block-editor';

import { useState, useEffect } from '@wordpress/element';

import Splide from '@splidejs/splide';

import './editor.css';

const ALLOWED_BLOCKS = [ 'pulsar/carousel-slide' ];

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
export default function Edit( { attributes: { splide }, clientId } ) {
	const blockProps = useBlockProps();

	const [ carousel, setCarousel ] = useState( {} );

	useEffect( () => {
		if ( Object.keys( carousel ).length === 0 ) {
			const splide = new Splide( `#block-${ clientId }` );
			setCarousel( splide.mount() );
			return;
		}
		carousel.destroy(false);
	}, [] );

	const innerBlocksProps = useInnerBlocksProps( { className: 'splide__list' }, {
		orientation: 'horizontal',
		allowedBlocks: ALLOWED_BLOCKS,
		renderAppender: () => <InnerBlocks.ButtonBlockAppender />,
	} );

	return (
		<div
			{ ...useBlockProps( { className: 'splide' } ) }
			aria-label=""
			data-splide={JSON.stringify(splide)}
		>
			<div className="splide__track">
				<div { ...innerBlocksProps }></div>
			</div>
		</div>
	);
}
