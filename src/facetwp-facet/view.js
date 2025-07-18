import { store, getContext } from '@wordpress/interactivity';

store('pulsar/filter-facetwp', {
	actions: {
		toggle: () => {
			const context = getContext();
			context.isOpen = !context.isOpen;
		},

		open: () => {
			const context = getContext();
			context.isOpen = true;
		},

		close: () => {
			const context = getContext();
			context.isOpen = false;
		},

		openFilter: (filterId) => {
			const context = getContext();
			context.isOpen = true;
		},

		closeFilter: (filterId) => {
			const context = getContext();
			context.isOpen = false;
		},
	},
});
