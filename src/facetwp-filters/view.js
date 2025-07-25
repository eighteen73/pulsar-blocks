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
			const modal = window.pulsarBlocks.facetwpFilters.get(
				context.filtersModalId
			);
			if (modal) {
				modal.showModal(true);
			}
		},
		closeModal: () => {
			const { actions } = store('pulsar/facetwp-filters');
			const context = getContext();
			const modal = window.pulsarBlocks.facetwpFilters.get(
				context.filtersModalId
			);
			if (modal) {
				modal.closeModal();
				actions.onModalClosed();
			}
		},
		toggleFilter: () => {
			const context = getContext();
			const { openFilters, filterId, filtersLayout, filtersModalId } =
				context;
			const { ref } = getElement();
			const isOpening = !openFilters.includes(filterId);
			const isSlideOutItems =
				filtersLayout === 'slide-out' &&
				ref.closest('.wp-block-pulsar-facetwp-filters__items');

			if (!isOpening) {
				// If the filter is already open, close it by removing it from the array.
				context.openFilters = openFilters.filter(
					(filterIdentifier) => filterIdentifier !== filterId
				);
			} else if (isSlideOutItems) {
				// If it's the slide-out layout, we are opening a filter, and the click
				// is from outside the modal, set it as the *only* open filter.
				context.openFilters = [filterId];
			} else {
				// For all other cases (e.g., inside the modal, or other layouts),
				// add the new filter to the array of open filters.
				context.openFilters = [...openFilters, filterId];
			}

			if (isOpening && isSlideOutItems) {
				const modal =
					window.pulsarBlocks.facetwpFilters.get(filtersModalId);
				if (modal) {
					modal.showModal(true);
				}
			}
		},
		resetFilters: () => {
			if (window.FWP) {
				window.FWP.reset();
			}
		},
		onFacetwpLoaded: () => {
			const context = getContext();

			let count = 0;
			const excludeFacets = ['pager', 'sort', 'reset'];

			Object.entries(window.FWP.facets).forEach(([name, val]) => {
				const type = window.FWP.facet_type?.[name];
				if (!excludeFacets.includes(type) && val.length > 0) {
					count += val.length;
				}
			});

			context.appliedFilterCount = count;
		},
		onModalClosed: (event) => {
			const context = getContext();
			const modalId = event.detail;
			const filtersModalId = context.filtersModalId;

			if (modalId === filtersModalId) {
				context.openFilters = [];
			}
		},
	},
	callbacks: {
		init: () => {
			const { actions } = store('pulsar/facetwp-filters');
			const context = getContext();
			const { filtersModalId } = context;
			const { ref } = getElement();
			const modalElement = ref.querySelector(
				`[data-modal-id="${filtersModalId}"]`
			);

			if (!window.pulsarBlocks.facetwpFilters.has(filtersModalId)) {
				if (modalElement) {
					const options = {
						targetModal: filtersModalId,
						modalElement,
						closeTrigger: 'data-modal-close',
						openClass: 'is-open',
						containerClass:
							'wp-block-pulsar-facetwp-filters__modal-container',
						overlayClass:
							'wp-block-pulsar-facetwp-filters__modal-overlay',
					};
					window.pulsarBlocks.facetwpFilters.set(
						filtersModalId,
						new Modal(options)
					);
				}
			}

			actions.onFacetwpLoaded();
		},
		isActiveFilter: () => {
			const context = getContext();
			const { openFilters, filterId } = context;
			return openFilters.includes(filterId);
		},
	},
});
