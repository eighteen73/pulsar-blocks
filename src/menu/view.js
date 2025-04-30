import { store, getContext, getElement } from '@wordpress/interactivity';

// Define the breakpoint
// Probably get this from a data attribute in the future.
const MOBILE_BREAKPOINT = '(max-width: 1024px)';

store('pulsar/menu', {
	state: {
		isMenuOpen: false,
		isCollapsed: window.matchMedia(MOBILE_BREAKPOINT).matches,
	},
	actions: {
		toggleMenuOnClick: () => {
			const { state } = store('pulsar/menu');
			state.isMenuOpen = !state.isMenuOpen;
		},
		openMenuOnClick: () => {
			const { state } = store('pulsar/menu');
			state.isMenuOpen = true;
		},
		closeMenuOnClick: () => {
			const { state } = store('pulsar/menu');
			state.isMenuOpen = false;
		},
		toggleSubmenuOnClick: () => {
			const context = getContext();
			context.isSubmenuOpen = !context.isSubmenuOpen;
		},
		openSubmenuOnClick: () => {
			const context = getContext();
			context.isSubmenuOpen = true;
		},
		closeSubmenuOnClick: () => {
			const context = getContext();
			context.isSubmenuOpen = false;
		},
		openSubmenuOnHover: () => {
			const { state } = store('pulsar/menu');
			const context = getContext();
			if (state.isCollapsed) return;

			context.isSubmenuOpen = true;
		},
		closeSubmenuOnHover: () => {
			const { state } = store('pulsar/menu');
			const context = getContext();
			if (state.isCollapsed) return;

			context.isSubmenuOpen = false;
		},
	},
	callbacks: {
		initMenu: () => {
			const { state } = store('pulsar/menu');
			console.log(state.isCollapsed);
		},
	},
});
