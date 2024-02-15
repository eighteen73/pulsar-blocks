'use strict';

class Accordion {
	constructor( containerEl ) {
		this.containerEl = containerEl;
		this.openMultiple =
			containerEl.getAttribute( 'data-open-multiple' ) === 'true';
		this.items = [];

		const itemEls = containerEl.querySelectorAll(
			'.wp-block-pulsar-accordion__item'
		);

		itemEls.forEach( ( itemEl, index ) => {
			const accordionItem = new AccordionItem( itemEl, this );
			this.items.push( accordionItem );

			if (
				index === 0 &&
				containerEl.getAttribute( 'data-start-open' ) === 'true'
			) {
				accordionItem.openItem();
			}
		} );
	}

	closeAll() {
		this.items.forEach( ( item ) => item.close() );
	}
}

class AccordionItem {
	constructor( domNode, accordion ) {
		this.rootEl = domNode;
		this.accordion = accordion;
		this.buttonEl = this.rootEl.querySelector( 'button[aria-expanded]' );

		const controlsId = this.buttonEl.getAttribute( 'aria-controls' );
		this.contentEl = document.getElementById( controlsId );

		this.isOpen = this.buttonEl.getAttribute( 'aria-expanded' ) === 'true';

		// Add event listeners
		this.buttonEl.addEventListener(
			'click',
			this.onButtonClick.bind( this )
		);
	}

	onButtonClick() {
		// If data-open-multiple is enabled, toggle the item's state
		if ( this.accordion.openMultiple ) {
			this.toggle();
		} else if ( this.isOpen ) {
			// If data-open-multiple is not enabled, close the active item if it's already open
			this.close();
		} else {
			// Otherwise, open the item and close others
			this.accordion.closeAll();
			this.openItem();
		}
	}

	toggle() {
		this.isOpen = ! this.isOpen;
		this.buttonEl.setAttribute( 'aria-expanded', this.isOpen );
		this.rootEl.classList.toggle( 'is-active', this.isOpen );
	}

	openItem() {
		this.isOpen = true;
		this.buttonEl.setAttribute( 'aria-expanded', 'true' );
		this.rootEl.classList.add( 'is-active' );
	}

	close() {
		this.isOpen = false;
		this.buttonEl.setAttribute( 'aria-expanded', 'false' );
		this.rootEl.classList.remove( 'is-active' );
	}
}

document.addEventListener( 'DOMContentLoaded', () => {
	const accordions = document.querySelectorAll(
		'.wp-block-pulsar-accordion'
	);
	accordions.forEach( ( accordionEl ) => {
		const accordionInstance = new Accordion( accordionEl );
		accordionEl.accordionInstance = accordionInstance;
	} );
} );
