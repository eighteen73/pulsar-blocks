/* global requestAnimationFrame */
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
		isTouchEnabled: false,
	},
	actions: {
		toggleMenuOnClick: () => {
			const context = getContext();
			const { ref } = getElement();

			context.isMenuOpen = !context.isMenuOpen;
			document.documentElement.classList.toggle(
				'has-open-menu',
				context.isMenuOpen
			);

			if (context.isMenuOpen) {
				if (!context.menuTrap) {
					const nav = ref.closest('.wp-block-pulsar-menu');
					const container = nav.querySelector(
						'.wp-block-pulsar-menu__container'
					);

					if (container) {
						context.menuTrap = createFocusTrap(container, {
							allowOutsideClick: true,
							escapeDeactivates: true,
							returnFocusOnDeactivate: true,
							onDeactivate: () => {
								context.isMenuOpen = false;
								context.openSubmenus = [];
								document.documentElement.classList.remove(
									'has-open-menu'
								);
							},
							initialFocus: container.querySelector(
								'.wp-block-pulsar-menu__close'
							),
							fallbackFocus: container,
						});

						activateWhenReady(container, context.menuTrap);
					}
				} else {
					activateWhenReady(
						ref
							.closest('.wp-block-pulsar-menu')
							.querySelector('.wp-block-pulsar-menu__container'),
						context.menuTrap
					);
				}
			} else {
				if (context.menuTrap) {
					context.menuTrap.deactivate();
				}

				Object.keys(context.submenuTraps).forEach((submenuId) => {
					if (context.submenuTraps[submenuId]) {
						context.submenuTraps[submenuId].deactivate();
						delete context.submenuTraps[submenuId];
					}
				});
				context.openSubmenus = [];
			}
		},
		openMenuOnClick: () => {
			const context = getContext();
			context.isMenuOpen = true;
			document.documentElement.classList.add('has-open-menu');
		},
		closeMenuOnClick: () => {
			const context = getContext();
			if (context.menuTrap) {
				context.menuTrap.deactivate();
			}
			context.isMenuOpen = false;
			context.openSubmenus = [];
			document.documentElement.classList.remove('has-open-menu');
		},
		toggleSubmenuOnClick: () => {
			const context = getContext();
			const submenuId = context.submenuId;
			const newOpenSubmenus = [...context.openSubmenus];

			if (newOpenSubmenus.includes(submenuId)) {
				const index = newOpenSubmenus.indexOf(submenuId);
				if (index !== -1) {
					if (context.submenuTraps[submenuId]) {
						context.submenuTraps[submenuId].deactivate();
						delete context.submenuTraps[submenuId];
					}
					newOpenSubmenus.splice(index, 1);
				}
			} else {
				newOpenSubmenus.push(submenuId);

				if (context.isCollapsed) {
					const { ref } = getElement();
					const submenuElement = ref
						.closest('.wp-block-pulsar-menu__item')
						.querySelector('.wp-block-pulsar-menu__submenu');

					if (submenuElement && !context.submenuTraps[submenuId]) {
						context.submenuTraps[submenuId] = createFocusTrap(
							submenuElement,
							{
								allowOutsideClick: true,
								escapeDeactivates: true,
								returnFocusOnDeactivate: true,
								onDeactivate: () => {
									const index =
										context.openSubmenus.indexOf(submenuId);
									if (index !== -1) {
										context.openSubmenus.splice(index, 1);
									}
								},
							}
						);

						activateWhenReady(
							submenuElement,
							context.submenuTraps[submenuId]
						);
					}
				}
			}
			context.openSubmenus = newOpenSubmenus;
		},
		openSubmenuOnClick: () => {
			const context = getContext();
			const submenuId = context.submenuId;
			const newOpenSubmenus = [...context.openSubmenus];
			newOpenSubmenus.push(submenuId);
			context.openSubmenus = newOpenSubmenus;
		},
		closeSubmenuOnClick: () => {
			const context = getContext();
			const submenuId = context.submenuId;
			const newOpenSubmenus = [...context.openSubmenus];
			const index = newOpenSubmenus.indexOf(submenuId);
			if (index !== -1) {
				if (context.submenuTraps[submenuId]) {
					context.submenuTraps[submenuId].deactivate();
					delete context.submenuTraps[submenuId];
				}
				newOpenSubmenus.splice(index, 1);
				context.openSubmenus = newOpenSubmenus;
			}
		},
		openSubmenuOnHover: () => {
			const { state } = store('pulsar/menu');
			const context = getContext();
			if (context.isCollapsed || state.isTouchEnabled) return;

			const newOpenSubmenus = [...context.openSubmenus];
			newOpenSubmenus.push(context.submenuId);
			context.openSubmenus = newOpenSubmenus;
		},
		closeSubmenuOnHover: () => {
			const { state } = store('pulsar/menu');
			const context = getContext();
			if (context.isCollapsed || state.isTouchEnabled) return;

			const newOpenSubmenus = [...context.openSubmenus];
			const index = newOpenSubmenus.indexOf(context.submenuId);
			if (index !== -1) {
				newOpenSubmenus.splice(index, 1);
				context.openSubmenus = newOpenSubmenus;
			}
		},
		handleKeydown: (event) => {
			const context = getContext();
			const { ref } = getElement();

			// Only handle Escape in non-collapsed mode
			if (!context.isCollapsed && event.key === 'Escape') {
				const menuItem = ref.closest('.wp-block-pulsar-menu__item');
				if (menuItem) {
					const submenuId = parseInt(
						menuItem.dataset.wpContext.match(/\d+/)[0],
						10
					);
					if (context.openSubmenus.includes(submenuId)) {
						const newOpenSubmenus = [...context.openSubmenus];
						const index = newOpenSubmenus.indexOf(submenuId);
						if (index !== -1) {
							newOpenSubmenus.splice(index, 1);
							context.openSubmenus = newOpenSubmenus;

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
			const context = getContext();
			const { ref } = getElement();
			const isAlwaysCollapsed =
				ref.classList.contains('collapses-always');
			const breakpoint = ref.dataset.breakpoint;
			const mq = window.matchMedia(`(min-width: ${breakpoint}px)`);

			context.isCollapsed =
				isAlwaysCollapsed || (!isAlwaysCollapsed && !mq.matches);
		},
		isTouchEnabled: () => {
			const { state } = store('pulsar/menu');
			const hasTouchSupport =
				'ontouchstart' in window ||
				window.navigator.maxTouchPoints > 0 ||
				window.navigator.msMaxTouchPoints > 0;

			state.isTouchEnabled = hasTouchSupport;

			return hasTouchSupport;
		},
		isAriaHidden: () => {
			const context = getContext();
			return !context.isMenuOpen && context.isCollapsed;
		},
		isSubmenuOpen: () => {
			const context = getContext();
			return context.openSubmenus.includes(context.submenuId);
		},
	},
});
