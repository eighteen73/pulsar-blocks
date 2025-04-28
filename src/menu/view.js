import { store, getContext, getElement } from '@wordpress/interactivity';

// Reusable list of focusable elements selector
const focusableSelectors = [
	'a[href]',
	'input:not([disabled]):not([type="hidden"]):not([aria-hidden])',
	'select:not([disabled]):not([aria-hidden])',
	'textarea:not([disabled]):not([aria-hidden])',
	'button:not([disabled]):not([aria-hidden])',
	'[contenteditable]',
	'[tabindex]:not([tabindex^="-"])',
];

// Define the breakpoint
const MOBILE_BREAKPOINT = '(max-width: 1024px)';

// --- Helper function to get owner document ---
// Avoids repeating the logic in multiple places
function getOwnerDocument(elementRef) {
	return elementRef?.ownerDocument ?? document;
}

store('pulsar/menu', {
	state: {
		// State managed at the root level for the main mobile menu toggle
		isMobileMenuOpen: false,
		// NEW: State to track responsive view
		isMobileView: window.matchMedia(MOBILE_BREAKPOINT).matches,
		// We'll store references needed for focus management here
		mobileMenuElement: null,
		firstFocusableElement: null,
		lastFocusableElement: null,
		previousFocus: null, // Element that triggered the mobile menu open
	},
	actions: {
		// --- Mobile Menu Actions ---
		toggleMobileMenu: () => {
			const { state, actions } = store('pulsar/menu');
			const { ref: toggleButton } = getElement();
			const ownerDoc = getOwnerDocument(toggleButton);

			state.isMobileMenuOpen = !state.isMobileMenuOpen;
			// Class toggling will be handled by data-wp-class in render.php

			if (state.isMobileMenuOpen) {
				state.previousFocus = ownerDoc.activeElement;
				ownerDoc.documentElement.classList.add('has-menu-open');
				// Focus first element when menu opens (might need slight delay)
				// We rely on initMobileMenu now primarily
			} else {
				ownerDoc.documentElement.classList.remove('has-menu-open');
				if (state.previousFocus && state.previousFocus.focus) {
					state.previousFocus.focus();
				}
				actions.clearMobileMenuFocusData();
			}
		},
		closeMobileMenu: () => {
			const { state, actions } = store('pulsar/menu');
			if (state.isMobileMenuOpen) {
				// Directly set state to false instead of calling toggle,
				// avoids potential race conditions if called rapidly.
				state.isMobileMenuOpen = false;

				const { ref: closeButton } = getElement(); // Assumes called from close button context
				const ownerDoc = getOwnerDocument(closeButton);
				ownerDoc.documentElement.classList.remove('has-menu-open');
				if (state.previousFocus && state.previousFocus.focus) {
					state.previousFocus.focus();
				}
				actions.clearMobileMenuFocusData();
			}
		},
		clearMobileMenuFocusData: () => {
			const { state } = store('pulsar/menu');
			state.mobileMenuElement = null;
			state.firstFocusableElement = null;
			state.lastFocusableElement = null;
			state.previousFocus = null;
		},
		handleMobileMenuKeydown: (event) => {
			const { state } = store('pulsar/menu');
			if (!state.isMobileMenuOpen) return;
			const { actions } = store('pulsar/menu');
			const { ref: mobileMenuContainer } = getElement();
			const ownerDoc = getOwnerDocument(mobileMenuContainer);

			// Close on Escape
			if (event.key === 'Escape') {
				event.stopPropagation(); // Still important to prevent bubbling
				actions.closeMobileMenu();
				return;
			}

			// Trap Tab focus
			if (event.key === 'Tab') {
				const { firstFocusableElement, lastFocusableElement } = state;
				// Ensure elements are found before trapping
				if (!firstFocusableElement || !lastFocusableElement) {
					// Attempt to find them now if they weren't ready during init
					if (state.mobileMenuElement) {
						const focusableElements =
							state.mobileMenuElement.querySelectorAll(
								focusableSelectors.join(',')
							);
						if (focusableElements.length) {
							state.firstFocusableElement = focusableElements[0];
							state.lastFocusableElement =
								focusableElements[focusableElements.length - 1];
						}
					}
					// If still not found, exit tab trapping logic
					if (
						!state.firstFocusableElement ||
						!state.lastFocusableElement
					) {
						return;
					}
				}

				// Use ownerDoc.activeElement
				if (
					event.shiftKey &&
					ownerDoc.activeElement === firstFocusableElement
				) {
					// Shift + Tab on first element -> loop to last
					event.preventDefault(); // Still needed to prevent default tab behavior
					lastFocusableElement.focus();
				} else if (
					!event.shiftKey &&
					ownerDoc.activeElement === lastFocusableElement
				) {
					// Tab on last element -> loop to first
					event.preventDefault(); // Still needed
					firstFocusableElement.focus();
				}
			}
		},
		handleMobileMenuFocusout: () => {
			const { state, actions } = store('pulsar/menu');
			const { ref: mobileMenuContainer } = getElement();

			requestAnimationFrame(() => {
				if (
					state.isMobileMenuOpen &&
					state.mobileMenuElement &&
					!state.mobileMenuElement.contains(
						getOwnerDocument(mobileMenuContainer).activeElement
					)
				) {
					actions.closeMobileMenu();
				}
			});
		},

		// --- Submenu Actions ---
		// Toggle now primarily manages state for aria and class binding
		toggleSubmenu: () => {
			const context = getContext();
			context.isSubmenuOpen = !context.isSubmenuOpen;
		},
		openSubmenu: () => {
			const context = getContext();
			context.isSubmenuOpen = true;
		},
		closeSubmenu: () => {
			const context = getContext();
			context.isSubmenuOpen = false;
		},
		openSubmenuOnHover: () => {
			const { state } = store('pulsar/menu');
			if (state.isMobileView) return;
			const context = getContext();
			context.isSubmenuOpen = true;
		},
		closeSubmenuOnHover: () => {
			const { state } = store('pulsar/menu');
			if (state.isMobileView) return;
			const context = getContext();
			const { ref } = getElement();
			setTimeout(() => {
				if (ref && !ref.matches(':hover')) {
					context.isSubmenuOpen = false;
				}
			}, 100);
		},
		handleSubmenuKeydown: (event) => {
			const context = getContext();
			if (!context.isSubmenuOpen) return;
			const { actions } = store('pulsar/menu');

			if (event.key === 'Escape') {
				event.stopPropagation();
				actions.closeSubmenu();
				const { ref } = getElement();
				const parentLi = ref.closest('li.wp-block-pulsar-menu__item');
				const toggleButton = parentLi?.querySelector(
					'.wp-block-pulsar-menu__submenu-icon'
				);
				toggleButton?.focus();
			}
		},
		handleSubmenuFocusout: () => {
			const context = getContext();
			const { ref } = getElement();
			const { actions } = store('pulsar/menu');

			requestAnimationFrame(() => {
				if (
					context.isSubmenuOpen &&
					ref &&
					!ref.contains(getOwnerDocument(ref).activeElement)
				) {
					actions.closeSubmenu();
				}
			});
		},

		// --- Responsive Actions ---
		_updateIsMobileView: (matches) => {
			const { state, actions } = store('pulsar/menu');
			const previousIsMobileView = state.isMobileView;
			state.isMobileView = matches;

			// If switching to desktop view
			if (!matches) {
				// If mobile menu was open, close it cleanly
				if (state.isMobileMenuOpen) {
					actions.closeMobileMenu();
				}
				// Optional: Close all open submenus when switching to desktop?
				// This would require iterating through elements or contexts.
			}
			// If switching TO mobile view
			else if (matches && !previousIsMobileView) {
				// Optional: Close all open submenus when switching to mobile?
			}
		},
	},
	callbacks: {
		// --- Mobile Menu Callbacks ---
		initMobileMenu: () => {
			const { state } = store('pulsar/menu');
			const { ref } = getElement();
			state.mobileMenuElement = ref;
			// Find focusable elements only if menu is currently open on init
			if (state.isMobileMenuOpen) {
				const focusableElements = ref.querySelectorAll(
					focusableSelectors.join(',')
				);
				if (focusableElements.length) {
					state.firstFocusableElement = focusableElements[0];
					state.lastFocusableElement =
						focusableElements[focusableElements.length - 1];
					state.firstFocusableElement.focus(); // Focus now it's definitely open
				} else {
					state.firstFocusableElement = null;
					state.lastFocusableElement = null;
				}
			}
		},

		// --- Root Nav Callbacks ---
		initNav: () => {
			const { actions } = store('pulsar/menu');
			const mediaQuery = window.matchMedia(MOBILE_BREAKPOINT);

			// Initial check
			actions._updateIsMobileView(mediaQuery.matches);

			// Listener for changes
			// Using 'change' event is preferred over 'resize' for matchMedia
			const changeHandler = (event) => {
				actions._updateIsMobileView(event.matches);
			};
			mediaQuery.addEventListener('change', changeHandler);

			// Return cleanup function to remove listener
			return () => {
				mediaQuery.removeEventListener('change', changeHandler);
			};
		},
	},
});

// Define requestAnimationFrame if not globally available
const requestAnimationFrame =
	window.requestAnimationFrame ||
	((callback) => window.setTimeout(callback, 1000 / 60));
