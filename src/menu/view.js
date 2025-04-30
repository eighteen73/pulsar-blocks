import { store, getContext, getElement } from '@wordpress/interactivity';

// Define the breakpoint
// Probably get this from a data attribute in the future.
const MOBILE_BREAKPOINT = '(max-width: 1024px)';

store('pulsar/menu', {
	state: {
		isMenuOpen: false,
		isCollapsed: window.matchMedia(MOBILE_BREAKPOINT).matches,
		openSubmenus: [],
	},
	actions: {
		toggleMenuOnClick: () => {
			const { state } = store('pulsar/menu');
			state.isMenuOpen = !state.isMenuOpen;
			if (!state.isMenuOpen) {
				state.openSubmenus = [];
			}
		},
		openMenuOnClick: () => {
			const { state } = store('pulsar/menu');
			state.isMenuOpen = true;
		},
		closeMenuOnClick: () => {
			const { state } = store('pulsar/menu');
			state.isMenuOpen = false;
			state.openSubmenus = [];
		},
		toggleSubmenuOnClick: () => {
			const { state } = store('pulsar/menu');
			const context = getContext();
			const newOpenSubmenus = [...state.openSubmenus];

			if (newOpenSubmenus.includes(context.submenuId)) {
				const index = newOpenSubmenus.indexOf(context.submenuId);
				if (index !== -1) {
					newOpenSubmenus.splice(index, 1);
					state.openSubmenus = newOpenSubmenus;
				}
			} else {
				newOpenSubmenus.push(context.submenuId);
				state.openSubmenus = newOpenSubmenus;
			}
		},
		openSubmenuOnClick: () => {
			const { state } = store('pulsar/menu');
			const context = getContext();
			const newOpenSubmenus = [...state.openSubmenus];
			newOpenSubmenus.push(context.submenuId);
			state.openSubmenus = newOpenSubmenus;
		},
		closeSubmenuOnClick: () => {
			const { state } = store('pulsar/menu');
			const context = getContext();
			const newOpenSubmenus = [...state.openSubmenus];
			const index = newOpenSubmenus.indexOf(context.submenuId);
			if (index !== -1) {
				newOpenSubmenus.splice(index, 1);
				state.openSubmenus = newOpenSubmenus;
			}
		},
		openSubmenuOnHover: () => {
			const { state } = store('pulsar/menu');
			const context = getContext();
			if (state.isCollapsed) return;

			const newOpenSubmenus = [...state.openSubmenus];
			newOpenSubmenus.push(context.submenuId);
			state.openSubmenus = newOpenSubmenus;
		},
		closeSubmenuOnHover: () => {
			const { state } = store('pulsar/menu');
			const context = getContext();
			if (state.isCollapsed) return;

			const newOpenSubmenus = [...state.openSubmenus];
			const index = newOpenSubmenus.indexOf(context.submenuId);
			if (index !== -1) {
				newOpenSubmenus.splice(index, 1);
				state.openSubmenus = newOpenSubmenus;
			}
		},
		closeDeepestSubmenu: () => {
			const { state } = store('pulsar/menu');
			if (state.openSubmenus.length === 0) return;

			const newOpenSubmenus = [...state.openSubmenus];
			newOpenSubmenus.pop();
			state.openSubmenus = newOpenSubmenus;
		},
		handleKeydown: (event) => {
			const { state, actions } = store('pulsar/menu');

			if (event?.key === 'Escape') {
				if (state.openSubmenus.length > 0) {
					actions.closeDeepestSubmenu();
					return;
				}

				if (state.isMenuOpen) {
					actions.closeMenuOnClick();
				}
			}
		},
	},
	callbacks: {
		initMenu: () => {
			const { state } = store('pulsar/menu');
		},
		isSubmenuOpen: () => {
			const { state } = store('pulsar/menu');
			const context = getContext();
			return state.openSubmenus.includes(context.submenuId);
		},
	},
});
