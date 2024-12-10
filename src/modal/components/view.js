export default class Modal {
	constructor({ targetModal, triggers = [], dismissedDuration }) {
		this.modalId = targetModal;
		this.dismissedDuration = dismissedDuration;

		// Save a reference of the modal
		this.modal = document.querySelector(
			`[data-modal-id="${this.modalId}"]`
		);

		// Register click events only if pre binding eventListeners
		if (triggers.length > 0) this.registerTriggers(...triggers);

		this.modal.removeAttribute('data-modal-trigger-delay');
		this.modal.removeAttribute('data-modal-trigger-selector');
		this.modal.removeAttribute('data-modal-dismissed-duration');

		// pre bind functions for event listeners
		this.onClick = this.onClick.bind(this);
		this.onKeydown = this.onKeydown.bind(this);
	}

	modal;
	modalId;
	openTrigger = 'data-trigger-modal';
	closeTrigger = 'wp-block-pulsar-modal__close';
	openClass = 'is-open';
	dismissedDuration = 0;
	activeElement;
	focusableElements =
		'a[href],area[href],input:not([disabled]):not([type="hidden"]):not([aria-hidden]),select:not([disabled]):not([aria-hidden]),textarea:not([disabled]):not([aria-hidden]),button:not([disabled]):not([aria-hidden]),iframe,object,embed,[contenteditable],[tabindex]:not([tabindex^="-"])';

	/**
	 * Loops through all openTriggers and binds click event
	 *
	 * @param {Array} triggers [Array of node elements]
	 * @return {void}
	 */
	registerTriggers(...triggers) {
		triggers.filter(Boolean).forEach((trigger) => {
			trigger.addEventListener('click', (event) => this.showModal(true));
		});
	}

	setStorage() {
		const exp = new Date().getTime() + this.dismissedDuration * 60 * 1000;
		window.localStorage.setItem('pulsar_modal_' + this.modalId, exp);
	}

	getStorage() {
		const exp = window.localStorage.getItem('pulsar_modal_' + this.modalId);
		if (exp && new Date().getTime() < exp) {
			return true;
		}
		return false;
	}

	showModal(force = false) {
		if (this.dismissedDuration && this.getStorage() && false === force) {
			return;
		}

		this.activeElement = document.activeElement;
		this.modal.classList.add(this.openClass);
		this.addEventListeners();
		this.setFocusToFirstNode();
	}

	closeModal() {
		const modal = this.modal;
		this.removeEventListeners();

		if (this.activeElement && this.activeElement.focus) {
			this.activeElement.focus();
		}

		modal.classList.remove(this.openClass);

		if (this.dismissedDuration) {
			this.setStorage();
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
		if (
			event.target.classList.contains(this.closeTrigger) ||
			event.target.parentNode.classList.contains(this.closeTrigger) ||
			event.target.classList.contains('wp-block-pulsar-modal') ||
			event.target.classList.contains('wp-block-pulsar-modal__overlay')
		) {
			event.preventDefault();
			event.stopPropagation();
			this.closeModal(event);
		}
	}

	onKeydown(event) {
		if (event.keyCode === 27) this.closeModal(event); // esc
		if (event.keyCode === 9) this.retainFocus(event); // tab
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
			return !node.classList.contains(this.closeTrigger);
		});

		if (nodesWhichAreNotCloseTargets.length > 0)
			nodesWhichAreNotCloseTargets[0].focus();
		if (nodesWhichAreNotCloseTargets.length === 0)
			focusableNodes[0].focus();
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

		const focusedItemIndex = focusableNodes.indexOf(document.activeElement);

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
