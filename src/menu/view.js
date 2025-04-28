import {
	store,
	getContext,
	getElement,
	withSyncEvent,
} from '@wordpress/interactivity';

store('pulsar/menu', {
	state: {
		isMenuOpen: false,
		openSubMenus: [], // Array of { id, parent }
		isTouch: false,
		hoverEnabled: true,
	},
	getters: {
		isSubmenuOpen: (state) => (menuId) => {
			return state.openSubMenus.some((item) => item.id === menuId);
		},
	},
	actions: {
		toggleMenu() {
			const state = store('pulsar/menu').state;
			state.isMenuOpen = !state.isMenuOpen;
		},
		openSubmenu(menuId, parentId) {
			const state = store('pulsar/menu').state;
			const getters = store('pulsar/menu').getters;
			if (getters.isSubmenuOpen(menuId)) return;
			store('pulsar/menu').actions.closeSubmenusAtSameLevel(parentId);
			state.openSubMenus = [...state.openSubMenus, { id: menuId, parent: parentId }];
		},
		closeSubmenu(menuId) {
			const state = store('pulsar/menu').state;
			if (!state.openSubMenus.some((item) => item.id === menuId)) return;
			state.openSubMenus = state.openSubMenus.filter((item) => item.id !== menuId && item.parent !== menuId);
		},
		toggleSubmenu(menuId, parentId) {
			const state = store('pulsar/menu').state;
			const getters = store('pulsar/menu').getters;
			if (getters.isSubmenuOpen(menuId)) {
				store('pulsar/menu').actions.closeSubmenu(menuId);
			} else {
				store('pulsar/menu').actions.openSubmenu(menuId, parentId);
			}
		},
		closeSubmenusAtSameLevel(parentId) {
			const state = store('pulsar/menu').state;
			state.openSubMenus = state.openSubMenus.filter((item) => item.parent !== parentId);
		},
		closeAllSubMenus() {
			const state = store('pulsar/menu').state;
			state.openSubMenus = [];
		},
		// Hover, click-away, keyboard, and focus logic remain as before, but use openSubMenus structure
	}
});
	state: {
		// These are initialized from context but managed here
		isMobileMenuOpen: false,
		openSubMenuIds: [],
		isTouch: false,
		hoverEnabled: true,
		hoverDelay: 300,
		// Store timeouts for hover delays
		submenuHoverTimeouts: {},
		// Focus trapping state (managed via context merge)
		focus: {
			trap: false,
			previousFocus: null,
			firstFocusableElement: null,
			lastFocusableElement: null,
		},
	},
	// Getters provide computed state or helper checks
	getters: {
		// Check if a specific submenu ID is in the open array
		isSubmenuOpen: (state) => (menuId) => {
			return state.openSubMenuIds.includes(menuId);
		},
	},
	actions: {
		// --- Main Menu ---
		toggleMobileMenu() {
			const state = store('pulsar/menu').state;
			state.isMobileMenuOpen = !state.isMobileMenuOpen;

			if (state.isMobileMenuOpen) {
				// Opening
				state.focus.previousFocus = document.activeElement;
				document.body.classList.add('has-open-menu');
				state.focus.trap = true; // Enable focus trap
				// initMobileMenuContainer callback will find focusable elements
			} else {
				// Closing
				store('pulsar/menu').actions.closeAllSubMenus(); // Close submenus when closing main
				document.body.classList.remove('has-open-menu');
				state.focus.trap = false; // Disable focus trap
				// Attempt to restore focus
				if (state.focus.previousFocus) {
					state.focus.previousFocus.focus();
				}
				// Clear focus state
				state.focus.previousFocus = null;
				state.focus.firstFocusableElement = null;
				state.focus.lastFocusableElement = null;
			}
		},

		// --- Submenus ---
		openSubmenu(menuId, parentId) {
			const state = store('pulsar/menu').state;
			const getters = store('pulsar/menu').getters;

			if (getters.isSubmenuOpen(menuId)) {
				return; // Already open
			}

			// Close siblings first (Alpine logic)
			actions.closeSubmenusAtSameLevel(parentId);

			// Add to open array
			state.openSubMenuIds = [...state.openSubMenuIds, menuId];
		},

		closeSubmenu(menuId, parentId) {
			const state = store('pulsar/menu').state;
			const getters = store('pulsar/menu').getters;

			if (!getters.isSubmenuOpen(menuId)) {
				return; // Already closed
			}

			// Filter out the closed menu ID and any potential children (recursive close not explicitly in Alpine, but good practice)
			// Simple filter based on ID for now, matching Alpine
			state.openSubMenuIds = state.openSubMenuIds.filter(
				(id) => id !== menuId
			);
		},

		toggleSubmenu(menuId, parentId) {
			const getters = store('pulsar/menu').getters;
			const actions = store('pulsar/menu').actions;
			if (getters.isSubmenuOpen(menuId)) {
				actions.closeSubmenu(menuId, parentId);
			} else {
				actions.openSubmenu(menuId, parentId);
			}
		},

		closeSubmenusAtSameLevel(parentId) {
			const state = store('pulsar/menu').state;
			// This requires knowing the parent of each open submenu.
			// The Alpine code stored {id, parent}. Let's adapt state.
			// Option 1: Change openSubMenuIds to [{id, parent}, ...]
			// Option 2: Re-query the DOM to find parents (less ideal)
			// Let's go with Option 1 for cleaner logic.
			// *** Requires changing state structure and how openSubMenuIds is managed ***

			// --- REVISED STATE STRUCTURE ---
			// state.openSubMenus = []; // Array of { id: number, parent: number }
			// getters.isSubmenuOpen = (state) => (menuId) => state.openSubMenus.some(item => item.id === menuId);
			// actions.openSubmenu: state.openSubMenus = [...state.openSubMenus, { id: menuId, parent: parentId }];
			// actions.closeSubmenu: state.openSubMenus = state.openSubMenus.filter(item => item.id !== menuId);
			// actions.closeAllSubMenus: state.openSubMenus = [];

			// Assuming revised state: state.openSubMenus = [{id, parent}, ...]
			state.openSubMenus = state.openSubMenus.filter(
				(item) => item.parent !== parentId
			);
		},

		closeAllSubMenus() {
			const state = store('pulsar/menu').state;
			// Assuming revised state:
			state.openSubMenus = [];
			// Original state:
			// state.openSubMenuIds = [];
		},

		// --- Hover Actions ---
		openSubmenuWithDelay(menuId, parentId) {
			const state = store('pulsar/menu').state;
			const actions = store('pulsar/menu').actions;

			// Clear any existing closing timeout for this menu
			if (state.submenuHoverTimeouts[menuId]?.close) {
				clearTimeout(state.submenuHoverTimeouts[menuId].close);
				state.submenuHoverTimeouts[menuId].close = null;
			}

			// Set opening timeout
			const openFunction = () => {
				if (state.hoverEnabled && !state.isTouch) {
					actions.openSubmenu(menuId, parentId);
				}
				state.submenuHoverTimeouts[menuId].open = null; // Clear timeout ref after execution
			};

			// Clear existing open timeout before setting new one
			if (state.submenuHoverTimeouts[menuId]?.open) {
				clearTimeout(state.submenuHoverTimeouts[menuId].open);
			}
			if (!state.submenuHoverTimeouts[menuId])
				state.submenuHoverTimeouts[menuId] = {};
			state.submenuHoverTimeouts[menuId].open = setTimeout(
				openFunction,
				state.hoverDelay
			);
		},

		closeSubmenuWithDelay(menuId, parentId) {
			const state = store('pulsar/menu').state;
			const actions = store('pulsar/menu').actions;

			// Clear any existing opening timeout for this menu
			if (state.submenuHoverTimeouts[menuId]?.open) {
				clearTimeout(state.submenuHoverTimeouts[menuId].open);
				state.submenuHoverTimeouts[menuId].open = null;
			}

			// Set closing timeout
			const closeFunction = () => {
				// Check if mouse is still over the parent LI (more robust than checking submenu div)
				const parentLi = document.getElementById(`menu-item-${menuId}`);
				const mouseWithin = parentLi
					? parentLi.matches(':hover')
					: false;

				if (state.hoverEnabled && !state.isTouch && !mouseWithin) {
					actions.closeSubmenu(menuId, parentId);
				}
				state.submenuHoverTimeouts[menuId].close = null; // Clear timeout ref after execution
			};

			// Clear existing close timeout before setting new one
			if (state.submenuHoverTimeouts[menuId]?.close) {
				clearTimeout(state.submenuHoverTimeouts[menuId].close);
			}
			if (!state.submenuHoverTimeouts[menuId])
				state.submenuHoverTimeouts[menuId] = {};
			state.submenuHoverTimeouts[menuId].close = setTimeout(
				closeFunction,
				state.hoverDelay
			);
		},

		// --- Global Handlers ---
		handleRootKeydown: withSyncEvent((event) => {
			const state = store('pulsar/menu').state;
			const actions = store('pulsar/menu').actions;

			// Handle Escape key
			if (event.key === 'Escape') {
				event.preventDefault();
				if (state.isMobileMenuOpen) {
					// If mobile is open, Escape should close everything and focus toggle
					actions.toggleMobileMenu(); // This already closes submenus and handles focus
				} else {
					// If only submenus are open (desktop hover), close them
					actions.closeAllSubMenus();
				}
			}

			// Handle Tab key for focus trapping within mobile menu
			if (
				state.isMobileMenuOpen &&
				state.focus.trap &&
				event.key === 'Tab'
			) {
				const { firstFocusableElement, lastFocusableElement } =
					state.focus;
				if (!firstFocusableElement || !lastFocusableElement) return; // Should be set by initMobileMenuContainer

				if (
					event.shiftKey &&
					document.activeElement === firstFocusableElement
				) {
					// Shift+Tab on first element -> focus last
					event.preventDefault();
					lastFocusableElement.focus();
				} else if (
					!event.shiftKey &&
					document.activeElement === lastFocusableElement
				) {
					// Tab on last element -> focus first
					event.preventDefault();
					firstFocusableElement.focus();
				}
			}
		}),

		// Click Away Logic (added in initNav)
		handleClickAway(event) {
			const state = store('pulsar/menu').state;
			const { ref: navElement } = getElement(); // Get the nav element ref

			// If the click is outside the nav element and not on a toggle button
			if (
				navElement &&
				!navElement.contains(event.target) &&
				!event.target.closest(
					'button[data-wp-on--click*="toggleMobileMenu"]'
				)
			) {
				if (state.isMobileMenuOpen) {
					store('pulsar/menu').actions.toggleMobileMenu(); // Close mobile menu
				} else {
					store('pulsar/menu').actions.closeAllSubMenus(); // Close desktop submenus
				}
			}
		},
	},
	callbacks: {
		initNav() {
			const state = store('pulsar/menu').state;
			const actions = store('pulsar/menu').actions;
			state.isTouch = isTouchEnabled();

			// Add global click listener for click-away
			// Ensure listener is added only once
			if (!window.pulsarMenuClickAway) {
				window.pulsarMenuClickAway = (event) => {
					// Need context of the specific menu instance
					// This is tricky. A better way might be focusout on the nav.
					// Let's try focusout on the nav element instead.
				};
				// document.addEventListener('click', window.pulsarMenuClickAway);
			}
			// Alternative: Use focusout on the nav element itself
			const { ref: navElement } = getElement();
			navElement.addEventListener('focusout', (event) => {
				// If focus moves outside the nav element entirely
				if (!navElement.contains(event.relatedTarget)) {
					if (!state.isMobileMenuOpen) {
						// Only close submenus if mobile isn't open
						actions.closeAllSubMenus();
					}
					// Mobile menu focusout is handled by its own container focusout
				}
			});
		},
		initMobileMenuContainer() {
			// Find focusable elements when the mobile container becomes visible
			const state = store('pulsar/menu').state;
			const { ref: containerElement } = getElement();

			if (state.isMobileMenuOpen) {
				const focusable =
					containerElement.querySelectorAll(focusableSelectors);
				state.focus.firstFocusableElement = focusable[0];
				state.focus.lastFocusableElement =
					focusable[focusable.length - 1];
				// Optionally focus the first element automatically
				// requestAnimationFrame(() => state.focus.firstFocusableElement?.focus());
			}
		},
	},
	// --- REVISED STATE STRUCTURE (as discussed in closeSubmenusAtSameLevel) ---
	state: {
		isMobileMenuOpen: false,
		openSubMenus: [], // Array of { id: number, parent: number }
		isTouch: false,
		hoverEnabled: true,
		hoverDelay: 300,
		submenuHoverTimeouts: {},
		focus: {
			/* ... */
		},
	},
	getters: {
		isSubmenuOpen: (state) => (menuId) => {
			return state.openSubMenus.some((item) => item.id === menuId);
		},
	},
	actions: {
		// ... (adapt actions like openSubmenu, closeSubmenu, closeAllSubMenus to use state.openSubMenus) ...
		openSubmenu(menuId, parentId) {
			const state = store('pulsar/menu').state;
			const getters = store('pulsar/menu').getters;
			if (getters.isSubmenuOpen(menuId)) return;
			actions.closeSubmenusAtSameLevel(parentId); // Close siblings
			state.openSubMenus = [
				...state.openSubMenus,
				{ id: menuId, parent: parentId },
			]; // Add new
		},
		closeSubmenu(menuId, parentId) {
			const state = store('pulsar/menu').state;
			state.openSubMenus = state.openSubMenus.filter(
				(item) => item.id !== menuId
			); // Remove
		},
		closeAllSubMenus() {
			const state = store('pulsar/menu').state;
			state.openSubMenus = []; // Clear
		},
		// ... rest of actions need to use the revised state/getters ...
	},
});
