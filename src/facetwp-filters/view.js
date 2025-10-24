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
			const context = getContext();
			const modal = window.pulsarBlocks.facetwpFilters.get(
				context.filtersModalId
			);
			if (modal) {
				modal.closeModal();
			}
		},
		toggleFilter: () => {
			const context = getContext();
			const { openFilters, filterId } = context;
			const isOpening = !openFilters.includes(filterId);

			// If the filter is already open, close it.
			if (!isOpening) {
				context.openFilters = openFilters.filter(
					(fId) => fId !== filterId
				);
				return;
			}

			const { ref } = getElement();
			const { filtersLayout, filtersModalId } = context;
			const isInsideItems = !!ref.closest(
				'.wp-block-pulsar-facetwp-filters__items'
			);

			// Dropdowns and slide-out triggers on desktop should only have one filter open at a time.
			const isSingleOpenLayout =
				(filtersLayout === 'dropdowns' ||
					filtersLayout === 'slide-out') &&
				isInsideItems;

			if (isSingleOpenLayout) {
				context.openFilters = [filterId];
			} else {
				// For 'stacked' layout, and 'slide-out' inside the modal, allow multiple filters to be open.
				context.openFilters = [...openFilters, filterId];
			}

			// If opening a slide-out filter from the desktop items list, show the modal.
			if (filtersLayout === 'slide-out' && isInsideItems) {
				const modal =
					window.pulsarBlocks.facetwpFilters.get(filtersModalId);
				if (modal) {
					modal.showModal(true);

					const elementToFocus = modal.modal.querySelector(
						`[data-filter-id="${filterId}"] .wp-block-pulsar-facetwp-filter__title`
					);

					modal.setFocusToNode(elementToFocus);
				}
			}
		},
		resetFilters: () => {
			if (window.FWP) {
				window.FWP.reset();
			}
		},
		onModalClose: (event) => {
			const context = getContext();
			const modalId = event.detail;
			const filtersModalId = context.filtersModalId;

			if (modalId === filtersModalId) {
				context.openFilters = [];
			}
		},
		updateFilterCount: () => {
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
		handleKeydown: (event) => {
			const context = getContext();
			const { actions } = store('pulsar/facetwp-filters');
			const { openFilters, filterId } = context;

			if (openFilters.includes(filterId) && event.key === 'Escape') {
				actions.toggleFilter();
			}
		},
		handleClickOutside: (event) => {
			const context = getContext();
			const { ref } = getElement();
			const { openFilters, filtersLayout } = context;
			const items = ref.querySelector(
				'.wp-block-pulsar-facetwp-filters__items'
			);

			if (
				filtersLayout !== 'dropdowns' ||
				openFilters.length === 0 ||
				!items ||
				items.contains(event.target)
			) {
				return;
			}

			context.openFilters = [];
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
						focusFirstNode: true,
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
			actions.updateFilterCount();
		},
		isActiveFilter: () => {
			const context = getContext();
			const { openFilters, filterId } = context;
			return openFilters.includes(filterId);
		},
	},
});
