import lightGallery from 'lightgallery';
import lgThumbnail from 'lightgallery/plugins/thumbnail';

window.pulsarBlocks = window.pulsarBlocks || {};
window.pulsarBlocks.mediaViewer = new Map();

window.addEventListener('DOMContentLoaded', () => {
	'use strict';

	const blocks = document.querySelectorAll('.wp-block-pulsar-media-viewer');

	blocks.forEach((block) => {
		const id = block.dataset.id;
		const showThumbnails = block.dataset.showThumbnails === 'true';
		const overlayColor = block.dataset.overlayColor;

		const lightbox = lightGallery(block, {
			download: false,
			allowMediaOverlap: false,
			addClass: 'wp-block-pulsar-media-viewer__lightbox',
			selector: '.wp-block-pulsar-media-viewer__items > *',
			plugins: showThumbnails ? [lgThumbnail] : [],
		});

		if (overlayColor) {
			const container = lightbox.$container.selector;
			container.style.setProperty(
				'--lightbox-overlay-color',
				overlayColor
			);
		}

		const viewAll = block.querySelector(
			'.wp-block-pulsar-media-viewer__view-all'
		);

		viewAll.addEventListener('click', () => {
			lightbox.openGallery();
		});

		window.pulsarBlocks.mediaViewer.set(id, lightbox);
	});
});
