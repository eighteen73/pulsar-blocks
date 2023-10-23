/**
 * WordPress dependencies
 */
import {
	RichText,
	InnerBlocks,
	useBlockProps,
	useInnerBlocksProps,
} from '@wordpress/block-editor';

import { Button } from '@wordpress/components';
import { useEffect } from "@wordpress/element";
import { __ } from '@wordpress/i18n';

import './editor.css';

const ALLOWED_BLOCKS = ['core/heading', 'core/paragraph', 'core/buttons'];

/**
 * The save function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @param  root0
 * @param  root0.clientId
 * @param  root0.attributes
 * @param  root0.setAttributes
 * @return {WPElement} Element to render.
 */
export default function Edit({ clientId, attributes: {id}, setAttributes }) {


	const innerBlocksProps = useInnerBlocksProps({
			className: 'wp-block-pulsar-tab-panel'
		}, {
			orientation: "vertical",
			allowedBlocks: ALLOWED_BLOCKS,
			renderAppender: () => <InnerBlocks.ButtonBlockAppender />,
		}
	);

	// // Set the ID.
	useEffect(() => {
		if (id === "") {
			let this_item = document.querySelector('[data-block="' + clientId + '"]');
			let parent_item = this_item.parentElement.parentElement.parentElement.parentElement;
			let titles = parent_item.querySelectorAll('.wp-block-pulsar-tab-title');
			let last_title = titles[titles.length - 1];
			let title_id = last_title.dataset.block;
			setAttributes({ id: title_id });
		}
	}, []);

	function focusNextTab(currentTabPanel, currentTab, nextTab) {

		currentTabPanel.classList.add('deleted')
		currentTab.classList.add('deleted')
		let tabpanels = Array.from(currentTab.parentElement.parentElement.parentElement.querySelectorAll('.wp-block-pulsar-tab-item:not(.deleted)'));
		let tabs = Array.from(currentTab.parentElement.querySelectorAll('.wp-block-pulsar-tab-title:not(.deleted)'));


		for (var i = 0; i < tabs.length; i ++) {
			var tab = tabs[i];

			if (nextTab === tab) {
				tab.setAttribute('aria-selected', 'true');
				tab.removeAttribute('tabindex');
				tabpanels[i].classList.remove('is-hidden');
				tab.focus();
			} else {
				tab.setAttribute('aria-selected', 'false');
				tab.tabIndex = -1;
				tabpanels[i].classList.add('is-hidden');
			}
		}
	}


	function removeTab() {
		// // find tab with id
		let tabItem = document.getElementById('tabpanel-' + id);
		let tabItem_id = tabItem.dataset.block;

		// // find title with id
		let tab = document.getElementById('tab-' + id);
		let tab_id = tab.dataset.block;

		let nextTab;

		//find next tab to focus on
		if (tab.nextElementSibling !== null && tab.nextElementSibling.classList.contains('wp-block-pulsar-tab-title')) {
			nextTab = tab.nextElementSibling
		} else if (tab.previousElementSibling !== null && tab.previousElementSibling.classList.contains('wp-block-pulsar-tab-title')) {
			nextTab = tab.previousElementSibling
		}

		//check there's a tab and panel to remove
		if (tabItem_id && tab_id) {
			wp.data.dispatch( 'core/block-editor' ).removeBlock( tabItem_id );
			wp.data.dispatch( 'core/block-editor' ).removeBlock( tab_id );
			focusNextTab(tabItem, tab, nextTab);
		}
	}

	return (

		<div
			{...useBlockProps()}
			className={`block-editor-block-list__block wp-block wp-block-pulsar-tab-item ${id === 1 ? '' : 'is-hidden'}`}
			id={`tabpanel-${id}`} role="tabpanel" tabIndex="0" aria-labelledby={`tab-${id}`}
			>

			<div { ...innerBlocksProps }></div>

			<Button className="components-button--remove is-secondary has-icon" onClick={() => removeTab(id)}>Remove Tab</Button>

		</div>
	);
}
