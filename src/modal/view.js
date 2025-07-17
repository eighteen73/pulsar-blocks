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
		const modalTriggerType = modal.getAttribute('data-modal-trigger-type');
		const modalSelector = modal.getAttribute('data-modal-trigger-selector');
		const modalDelay = parseInt(
			modal.getAttribute('data-modal-trigger-delay')
		);
		const modalDismissedDuration =
			modal.getAttribute('data-modal-dismissed-duration') || 0;
		const disableClosing =
			modal.getAttribute('data-modal-disable-closing') === 'true';

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
			{
				openTrigger: 'data-trigger-modal',
				portalContainerId: 'pulsar-modal-portal',
				closeTrigger: 'data-modal-close',
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
		options.dismissedDuration = dismissedDurationInMinutes;
		options.disableClosing = disableClosing;

		window.pulsarBlocks.modals.set(modalId, new Modal(options));

		const currentModalInstance = window.pulsarBlocks.modals.get(modalId);

		if (
			modalTriggerType === 'load' &&
			null !== modalDelay &&
			!isNaN(modalDelay)
		) {
			setTimeout(() => currentModalInstance.showModal(), modalDelay);
		} else if (modalTriggerType === 'scroll' && modalSelector) {
			const targetElement = document.querySelector(modalSelector);
			const scrollThreshold =
				parseInt(modal.getAttribute('data-modal-scroll-threshold')) ||
				10;
			if (targetElement) {
				const observer = new IntersectionObserver(
					(entries, obs) => {
						entries.forEach((entry) => {
							if (entry.isIntersecting) {
								if (null !== modalDelay && !isNaN(modalDelay)) {
									setTimeout(
										() => currentModalInstance.showModal(),
										modalDelay
									);
								} else {
									currentModalInstance.showModal();
								}
								obs.unobserve(targetElement);
							}
						});
					},
					{ threshold: scrollThreshold / 100 }
				);
				observer.observe(targetElement);
			} else {
				console.warn(
					`Pulsar Modal: Target element "${modalSelector}" not found for scroll trigger.`
				);
			}
		}
	});
});
