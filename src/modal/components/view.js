export default class Modal {
	constructor({
		targetModal,
		modalElement,
		triggers = [],
		dismissedDuration,
		disableClosing = false,
		portalContainerId,
		openTrigger = 'data-trigger-modal',
		closeTrigger = 'data-modal-close',
		openClass = 'is-open',
		bodyOpenClass = 'modal-is-open',
		focusFirstNode = true,
		focusableElements = 'a[href],area[href],input:not([disabled]):not([type="hidden"]):not([aria-hidden]),select:not([disabled]):not([aria-hidden]),textarea:not([disabled]):not([aria-hidden]),button:not([disabled]):not([aria-hidden]),iframe,object,embed,[contenteditable],[tabindex]:not([tabindex^="-"])',
		storageKeyPrefix = 'pulsar_modal_',
		escKeyCode = 27,
		tabKeyCode = 9,
		modalSelector = 'data-modal-id',
		overlayClass = 'wp-block-pulsar-modal',
		overlayOverlayClass = 'wp-block-pulsar-modal__overlay',
	}) {
		this.modalId = targetModal;
		this.dismissedDuration = dismissedDuration;
		this.disableClosing = disableClosing;

		// Set configurable properties
		this.openTrigger = openTrigger;
		this.closeTrigger = closeTrigger;
		this.openClass = openClass;
		this.bodyOpenClass = bodyOpenClass;
		this.focusFirstNode = focusFirstNode;
		this.focusableElements = focusableElements;
		this.storageKeyPrefix = storageKeyPrefix;
		this.escKeyCode = escKeyCode;
		this.tabKeyCode = tabKeyCode;
		this.modalSelector = modalSelector;
		this.overlayClass = overlayClass;
		this.overlayOverlayClass = overlayOverlayClass;

		// Determine if closeTrigger is a class or data attribute
		this.closeTriggerType = closeTrigger.startsWith('data-')
			? 'data'
			: 'class';

		// Save a reference to the modal and its original parent
		this.modal =
			modalElement ||
			document.querySelector(`[${this.modalSelector}="${this.modalId}"]`);

		if (!this.modal) {
			return;
		}

		this.originalParent = this.modal.parentNode;

		// Create a reference to the portal container
		this.portalContainer = document.getElementById(portalContainerId);

		// Register triggers
		if (triggers.length > 0) this.registerTriggers(...triggers);

		// Pre-bind functions for event listeners
		this.onClick = this.onClick.bind(this);
		this.onKeydown = this.onKeydown.bind(this);
	}

	modal;
	modalId;
	openTrigger;
	closeTrigger;
	closeTriggerType;
	openClass;
	bodyOpenClass;
	dismissedDuration = 0;
	disableClosing = false;
	activeElement;
	focusFirstNode;
	focusableElements;
	storageKeyPrefix;
	escKeyCode;
	tabKeyCode;
	modalSelector;
	overlayClass;
	overlayOverlayClass;

	/**
	 * Checks if an element is a close trigger based on the configured closeTrigger
	 * @param {Element} element - The element to check
	 * @return {boolean} - True if the element is a close trigger
	 */
	isCloseTrigger(element) {
		if (!element) return false;

		if (this.closeTriggerType === 'data') {
			// Check if element has the data attribute
			return (
				element.hasAttribute(this.closeTrigger) ||
				(element.parentNode &&
					element.parentNode.hasAttribute(this.closeTrigger))
			);
		}

		// Check if element has the class
		return (
			element.classList.contains(this.closeTrigger) ||
			(element.parentNode &&
				element.parentNode.classList.contains(this.closeTrigger))
		);
	}

	/**
	 * Loops through all openTriggers and binds click event
	 *
	 * @param {Array} triggers [Array of node elements]
	 * @return {void}
	 */
	registerTriggers(...triggers) {
		triggers.filter(Boolean).forEach((trigger) => {
			// Handle click events
			trigger.addEventListener('click', (event) => {
				const isAnchor =
					event.target.tagName === 'A' || event.target.closest('a');
				if (
					isAnchor &&
					!this.modal.classList.contains(this.openClass)
				) {
					event.preventDefault();
					event.stopPropagation();
				}
				this.showModal(true);
			});

			// Handle keydown events for "Enter" and "Space"
			trigger.addEventListener('keydown', (event) => {
				if (event.key === 'Enter' || event.key === ' ') {
					event.preventDefault(); // Prevent default scrolling for space
					this.showModal(true);
				}
			});
		});
	}

	setStorage() {
		const exp = new Date().getTime() + this.dismissedDuration * 60 * 1000;
		window.localStorage.setItem(this.storageKeyPrefix + this.modalId, exp);
	}

	getStorage() {
		const exp = window.localStorage.getItem(
			this.storageKeyPrefix + this.modalId
		);
		if (exp && new Date().getTime() < exp) {
			return true;
		}
		return false;
	}

	showModal(force = false) {
		if (this.dismissedDuration && this.getStorage() && false === force) {
			return;
		}

		this.activeElement = this.modal.ownerDocument.activeElement;

		// Move modal to the portal container
		this.moveToPortal();

		this.modal.classList.add(this.openClass);
		document.body.classList.add(this.bodyOpenClass);

		this.updateAriaExpanded('true');
		this.addEventListeners();

		if (this.focusFirstNode) {
			this.setFocusToFirstNode();
		}
	}

	closeModal() {
		if (this.disableClosing) {
			return;
		}
		this.removeEventListeners();

		if (this.activeElement && this.activeElement.focus) {
			this.activeElement.focus();
		}

		this.modal.classList.remove(this.openClass);
		document.body.classList.remove(this.bodyOpenClass);
		this.updateAriaExpanded('false');

		// Restore modal to its original parent
		this.restoreToOriginalParent();

		if (this.dismissedDuration) {
			this.setStorage();
		}
		window.dispatchEvent(
			new CustomEvent('pulsar-modal-closed', {
				detail: this.modalId,
			})
		);
	}

	moveToPortal() {
		if (
			this.portalContainer &&
			this.modal.parentNode !== this.portalContainer
		) {
			this.portalContainer.appendChild(this.modal);
		}
	}

	restoreToOriginalParent() {
		if (
			this.originalParent &&
			this.modal.parentNode === this.portalContainer
		) {
			this.originalParent.appendChild(this.modal);
		}
	}

	addEventListeners() {
		this.modal.addEventListener('touchstart', this.onClick);
		this.modal.addEventListener('click', this.onClick);
		document.addEventListener('keydown', this.onKeydown);
	}

	removeEventListeners() {
		this.modal.removeEventListener('touchstart', this.onClick);
		this.modal.removeEventListener('click', this.onClick);
		document.removeEventListener('keydown', this.onKeydown);
	}

	onClick(event) {
		if (this.disableClosing) {
			// If closing is disabled, only allow interactions within the modal content,
			// not on the close button or overlay.
			const isCloseButton = this.isCloseTrigger(event.target);
			const isOverlay =
				event.target.classList.contains(this.overlayClass) ||
				event.target.classList.contains(this.overlayOverlayClass);

			if (isCloseButton || isOverlay) {
				event.preventDefault();
				event.stopPropagation();
				return;
			}
		}

		if (
			this.isCloseTrigger(event.target) ||
			event.target.classList.contains(this.overlayClass) ||
			event.target.classList.contains(this.overlayOverlayClass)
		) {
			event.preventDefault();
			event.stopPropagation();
			this.closeModal(event);
		}
	}

	updateAriaExpanded(state) {
		const triggers = document.querySelectorAll(
			`[${this.openTrigger}="${this.modalId}"]`
		);
		triggers.forEach((trigger) => {
			trigger.setAttribute('aria-expanded', state);
		});
	}

	onKeydown(event) {
		if (this.disableClosing && event.keyCode === this.escKeyCode) {
			// esc
			event.preventDefault();
			return;
		}
		if (event.keyCode === this.escKeyCode) this.closeModal(event); // esc
		if (event.keyCode === this.tabKeyCode) this.retainFocus(event); // tab
	}

	getFocusableNodes() {
		const nodes = this.modal.querySelectorAll(this.focusableElements);
		return Array.from(nodes);
	}

	/**
	 * Tries to set focus on a node which is not a close trigger
	 * if no other nodes exist then focuses on first close trigger
	 */
	setFocusToFirstNode() {
		const focusableNodes = this.getFocusableNodes();

		// no focusable nodes
		if (focusableNodes.length === 0) return;

		// remove nodes on whose click, the modal closes
		// could not think of a better name :(
		const nodesWhichAreNotCloseTargets = focusableNodes.filter((node) => {
			return !this.isCloseTrigger(node);
		});

		if (nodesWhichAreNotCloseTargets.length > 0)
			nodesWhichAreNotCloseTargets[0].focus();
		if (nodesWhichAreNotCloseTargets.length === 0)
			focusableNodes[0].focus();
	}

	setFocusToNode(node) {
		if (node) {
			node.focus();
		}
	}

	retainFocus(event) {
		let focusableNodes = this.getFocusableNodes();

		// no focusable nodes
		if (focusableNodes.length === 0) return;

		/**
		 * Filters nodes which are hidden to prevent
		 * focus leak outside modal
		 */
		focusableNodes = focusableNodes.filter((node) => {
			return node.offsetParent !== null;
		});

		const focusedItemIndex = focusableNodes.indexOf(
			this.modal.ownerDocument.activeElement
		);

		if (event.shiftKey && focusedItemIndex === 0) {
			focusableNodes[focusableNodes.length - 1].focus();
			event.preventDefault();
		}

		if (
			!event.shiftKey &&
			focusableNodes.length > 0 &&
			focusedItemIndex === focusableNodes.length - 1
		) {
			focusableNodes[0].focus();
			event.preventDefault();
		}
	}
}
