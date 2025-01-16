/**
 * Internal dependencies
 */
import Modal from './components/view';

window.pulsarBlocks = window.pulsarBlocks || {};
window.pulsarBlocks.modals = new Map();

window.addEventListener('DOMContentLoaded', () => {
	'use strict';

	if (!document.getElementById('pulsar-modal-portal')) {
		const portalContainer = document.createElement('div');
		portalContainer.id = 'pulsar-modal-portal';
		portalContainer.classList.add('pulsar-modal-portal');
		document.body.appendChild(portalContainer);
	}

	window.modalBlocks = new Map();

	const modals = document.querySelectorAll('.wp-block-pulsar-modal');

	modals.forEach((modal) => {
		const modalId = modal.getAttribute('data-modal-id');
		const modalSelector = modal.getAttribute('data-modal-trigger-selector');
		const modalDelay = parseInt(
			modal.getAttribute('data-modal-trigger-delay')
		);
		const modalDismissedDuration =
			modal.getAttribute('data-modal-dismissed-duration') || 0;

		// get unite data-dismissed-duration minus the number
		const modalDismissedUnit = modalDismissedDuration
			.toString()
			.replace(/\d+/g, '');

		let dismissedDurationInMinutes = modalDismissedDuration;

		if (modalDismissedUnit) {
			switch (modalDismissedUnit) {
				case 'mins':
					dismissedDurationInMinutes = parseInt(
						modalDismissedDuration
					);
					break;
				case 'hrs':
					dismissedDurationInMinutes =
						parseInt(modalDismissedDuration) * 60;
					break;
				case 'days':
					dismissedDurationInMinutes =
						parseInt(modalDismissedDuration) * 1440;
					break;
				default:
					console.warn(
						`Unknown dismissed unit: ${modalDismissedUnit}`
					);
			}
		}

		const options = Object.assign(
			{},
			{ openTrigger: 'data-trigger-modal' }
		);

		const triggers = [
			...document.querySelectorAll(
				`[${options.openTrigger}="${modalId}"]`
			),
			...(modalSelector
				? document.querySelectorAll(`${modalSelector}`)
				: []),
		];

		options.targetModal = modalId;
		options.triggers = triggers;
		options.dismissedDuration = dismissedDurationInMinutes;

		window.pulsarBlocks.modals.set(modalId, new Modal(options));

		if (null !== modalDelay && !isNaN(modalDelay)) {
			setTimeout(
				() => window.pulsarBlocks.modals.get(modalId).showModal(),
				modalDelay
			);
		}
	});
});
