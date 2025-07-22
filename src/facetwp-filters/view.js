import { store, getContext, getElement } from '@wordpress/interactivity';
import Modal from '../modal/components/view';

// Ensure the global namespace exists.
window.pulsarBlocks = window.pulsarBlocks || {};
window.pulsarBlocks.facetwpFilters =
	window.pulsarBlocks.facetwpFilters || new Map();

store('pulsar/facetwp-filters', {
	actions: {
		openModal: () => {
			const context = getContext();
			const modal = window.pulsarBlocks.facetwpFilters.get(context.id);
			if (modal) {
				modal.showModal(true);
			}
		},
		closeModal: () => {
			const context = getContext();
			const modal = window.pulsarBlocks.facetwpFilters.get(context.id);
			if (modal) {
				modal.closeModal();
			}
		},
		toggleFilter: () => {
			const context = getContext();
			const { openFilters, filterId } = context;

			if (openFilters.includes(filterId)) {
				context.openFilters = openFilters.filter(
					(id) => id !== filterId
				);
			} else {
				context.openFilters = [...openFilters, filterId];
			}
		},
		resetFilters: () => {
			if (window.FWP) {
				window.FWP.reset();
			}
		},
	},
	callbacks: {
		init: () => {
			const context = getContext();
			const { id: modalId } = context;
			const { ref } = getElement();
			const modalElement = ref.querySelector(
				`[data-modal-id="${modalId}"]`
			);

			if (!window.pulsarBlocks.facetwpFilters.has(modalId)) {
				if (modalElement) {
					const options = {
						targetModal: modalId,
						modalElement,
						closeTrigger: 'data-modal-close',
						openClass: 'is-open',
						containerClass:
							'wp-block-pulsar-facetwp-filters__modal-container',
						overlayClass:
							'wp-block-pulsar-facetwp-filters__modal-overlay',
					};
					window.pulsarBlocks.facetwpFilters.set(
						modalId,
						new Modal(options)
					);
				}
			}
		},
		isActiveFilter: () => {
			const context = getContext();
			const { openFilters, filterId } = context;
			return openFilters.includes(filterId);
		},
	},
});
