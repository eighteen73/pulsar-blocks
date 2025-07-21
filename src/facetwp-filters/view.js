/**
 * Internal dependencies
 */
import Modal from '../modal/components/view';

window.pulsarBlocks = window.pulsarBlocks || {};
window.pulsarBlocks.facetwpFilters = new Map();

window.addEventListener('DOMContentLoaded', () => {
	'use strict';

	if (!document.getElementById('pulsar-facetwp-filters-modal-portal')) {
		const portalContainer = document.createElement('div');
		portalContainer.id = 'pulsar-facetwp-filters-modal-portal';
		portalContainer.classList.add('pulsar-facetwp-filters-modal-portal');
		document.body.appendChild(portalContainer);
	}

	window.modalBlocks = new Map();

	const filterModals = document.querySelectorAll(
		'.wp-block-pulsar-facetwp-filters__modal'
	);

	filterModals.forEach((modal) => {
		const modalId = modal.getAttribute('data-modal-id');
		const modalTriggerType = modal.getAttribute('data-modal-trigger-type');
		const modalSelector = modal.getAttribute('data-modal-trigger-selector');

		const options = Object.assign(
			{},
			{
				openTrigger: 'data-trigger-facetwp-filters-modal',
				closeTrigger: 'data-modal-close',
				openClass: 'is-open',
				containerClass:
					'wp-block-pulsar-facetwp-filters__modal-container',
				overlayClass: 'wp-block-pulsar-facetwp-filters__modal-overlay',
			}
		);

		const triggers = [
			...document.querySelectorAll(
				`[${options.openTrigger}="${modalId}"]`
			),
			...(modalTriggerType === 'click' && modalSelector
				? document.querySelectorAll(`${modalSelector}`)
				: []),
		];

		options.targetModal = modalId;
		options.triggers = triggers;

		window.pulsarBlocks.facetwpFilters.set(modalId, new Modal(options));
	});
});
