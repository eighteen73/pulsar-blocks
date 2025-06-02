import { store, getContext, getElement } from '@wordpress/interactivity';
import { createFocusTrap } from 'focus-trap';

// Helper to check if an element is ready for focus trapping
const isElementReady = (element) => {
	if (!element) return false;
	const style = window.getComputedStyle(element);
	return (
		style.display !== 'none' &&
		style.visibility !== 'hidden' &&
		style.opacity !== '0'
	);
};

// Helper to activate focus trap when element is ready
const activateWhenReady = (element, trap) => {
	if (isElementReady(element)) {
		trap.activate();
		return;
	}
	requestAnimationFrame(() => activateWhenReady(element, trap));
};

store('pulsar/menu', {
	state: {
		isLoading: true,
		isMenuOpen: false,
		isCollapsed: false,
		openSubmenus: [],
		menuTrap: null,
		submenuTraps: {},
	},
	actions: {
		toggleMenuOnClick: () => {
			const { state } = store('pulsar/menu');
			const { ref } = getElement();

			state.isMenuOpen = !state.isMenuOpen;
			document.documentElement.classList.toggle(
				'has-open-menu',
				state.isMenuOpen
			);

			if (state.isMenuOpen) {
				if (!state.menuTrap) {
					const nav = ref.closest('.wp-block-pulsar-menu');
					const container = nav.querySelector(
						'.wp-block-pulsar-menu__container'
					);

					if (container) {
						state.menuTrap = createFocusTrap(container, {
							allowOutsideClick: true,
							escapeDeactivates: true,
							returnFocusOnDeactivate: true,
							onDeactivate: () => {
								state.isMenuOpen = false;
								state.openSubmenus = [];
								document.documentElement.classList.remove(
									'has-open-menu'
								);
							},
							initialFocus: container.querySelector(
								'.wp-block-pulsar-menu__close'
							),
							fallbackFocus: container,
						});

						activateWhenReady(container, state.menuTrap);
					}
				} else {
					activateWhenReady(
						ref
							.closest('.wp-block-pulsar-menu')
							.querySelector('.wp-block-pulsar-menu__container'),
						state.menuTrap
					);
				}
			} else {
				if (state.menuTrap) {
					state.menuTrap.deactivate();
				}

				Object.keys(state.submenuTraps).forEach((submenuId) => {
					if (state.submenuTraps[submenuId]) {
						state.submenuTraps[submenuId].deactivate();
						delete state.submenuTraps[submenuId];
					}
				});
				state.openSubmenus = [];
			}
		},
		openMenuOnClick: () => {
			const { state } = store('pulsar/menu');
			state.isMenuOpen = true;
			document.documentElement.classList.add('has-open-menu');
		},
		closeMenuOnClick: () => {
			const { state } = store('pulsar/menu');
			if (state.menuTrap) {
				state.menuTrap.deactivate();
			}
			state.isMenuOpen = false;
			state.openSubmenus = [];
			document.documentElement.classList.remove('has-open-menu');
		},
		toggleSubmenuOnClick: () => {
			const { state } = store('pulsar/menu');
			const context = getContext();
			const submenuId = context.submenuId;
			const newOpenSubmenus = [...state.openSubmenus];

			if (newOpenSubmenus.includes(submenuId)) {
				const index = newOpenSubmenus.indexOf(submenuId);
				if (index !== -1) {
					if (state.submenuTraps[submenuId]) {
						state.submenuTraps[submenuId].deactivate();
						delete state.submenuTraps[submenuId];
					}
					newOpenSubmenus.splice(index, 1);
				}
			} else {
				newOpenSubmenus.push(submenuId);

				// Only create focus traps when menu is collapsed
				if (state.isCollapsed) {
					const { ref } = getElement();
					const submenuElement = ref
						.closest('.wp-block-pulsar-menu__item')
						.querySelector('.wp-block-pulsar-menu__submenu');

					if (submenuElement && !state.submenuTraps[submenuId]) {
						state.submenuTraps[submenuId] = createFocusTrap(
							submenuElement,
							{
								allowOutsideClick: true,
								escapeDeactivates: true,
								returnFocusOnDeactivate: true,
								onDeactivate: () => {
									const index =
										state.openSubmenus.indexOf(submenuId);
									if (index !== -1) {
										state.openSubmenus.splice(index, 1);
									}
								},
							}
						);

						activateWhenReady(
							submenuElement,
							state.submenuTraps[submenuId]
						);
					}
				}
			}
			state.openSubmenus = newOpenSubmenus;
		},
		openSubmenuOnClick: () => {
			const { state } = store('pulsar/menu');
			const context = getContext();
			const submenuId = context.submenuId;
			const newOpenSubmenus = [...state.openSubmenus];
			newOpenSubmenus.push(submenuId);
			state.openSubmenus = newOpenSubmenus;
		},
		closeSubmenuOnClick: () => {
			const { state } = store('pulsar/menu');
			const context = getContext();
			const submenuId = context.submenuId;
			const newOpenSubmenus = [...state.openSubmenus];
			const index = newOpenSubmenus.indexOf(submenuId);
			if (index !== -1) {
				if (state.submenuTraps[submenuId]) {
					state.submenuTraps[submenuId].deactivate();
					delete state.submenuTraps[submenuId];
				}
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
		handleKeydown: (event) => {
			const { state } = store('pulsar/menu');
			const { ref } = getElement();

			// Only handle Escape in non-collapsed mode
			if (!state.isCollapsed && event.key === 'Escape') {
				const menuItem = ref.closest('.wp-block-pulsar-menu__item');
				if (menuItem) {
					const submenuId = parseInt(
						menuItem.dataset.wpContext.match(/\d+/)[0],
						10
					);
					if (state.openSubmenus.includes(submenuId)) {
						const newOpenSubmenus = [...state.openSubmenus];
						const index = newOpenSubmenus.indexOf(submenuId);
						if (index !== -1) {
							newOpenSubmenus.splice(index, 1);
							state.openSubmenus = newOpenSubmenus;

							// Focus the parent menu item's link
							const menuToggle = menuItem.querySelector(
								'.wp-block-pulsar-menu__submenu-toggle'
							);
							if (menuToggle) {
								menuToggle.focus();
							}
						}
					}
				}
			}
		},
	},
	callbacks: {
		isLoading: () => {
			const { state } = store('pulsar/menu');
			state.isLoading = false;
		},
		isCollapsed: () => {
			const { state } = store('pulsar/menu');
			const { ref } = getElement();
			const isAlwaysCollapsed =
				ref.classList.contains('collapses-always');
			const breakpoint = ref.dataset.breakpoint;
			const mq = window.matchMedia(`(min-width: ${breakpoint}px)`);

			state.isCollapsed =
				isAlwaysCollapsed || (!isAlwaysCollapsed && !mq.matches);
		},
		isAriaHidden: () => {
			const { state } = store('pulsar/menu');
			return !state.isMenuOpen && state.isCollapsed;
		},
		isSubmenuOpen: () => {
			const { state } = store('pulsar/menu');
			const context = getContext();
			return state.openSubmenus.includes(context.submenuId);
		},
		isTouchEnabled: () => {
			return (
				'ontouchstart' in window ||
				window.navigator.maxTouchPoints > 0 ||
				window.navigator.msMaxTouchPoints > 0
			);
		},
	},
});
