import {
	useBlockProps,
	useInnerBlocksProps,
	InspectorControls,
} from '@wordpress/block-editor';
import { useEffect } from "@wordpress/element";
import {
	FormToggle,
	PanelBody,
	Button,
} from '@wordpress/components';

import { __ } from '@wordpress/i18n';

import './editor.css';

import './tabs.js';

const ALLOWED_BLOCKS = ['pulsar/tab-titles', 'pulsar/tab-items'];

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @param {Object}   param0
 * @param {Object}   param0.clientId
 * @param {Object}   param0.attributes
 * @param {Function} param0.setAttributes
 * @return {WPElement} Element to render.
 */

export default function Edit({ clientId, attributes: { vertical, id}, setAttributes }) {

	// TODO
	// keyboard controls
	// horizontal / vertical styling

	const TEMPLATE = [
		['pulsar/tab-titles'],
		['pulsar/tab-items'],
	];

	const innerBlocksProps = useInnerBlocksProps({ className: 'wp-block-pulsar-tabs__items' }, {
		orientation: "vertical",
		allowedBlocks: ALLOWED_BLOCKS,
		template: TEMPLATE,

	});

let this_element = document.getElementById('block-' + clientId);


	if (this_element !== null) {
		let tabpanels = this_element.querySelectorAll('.wp-block-pulsar-tab-item');
		if (tabpanels.length === 1) {
			tabpanels[0].classList.remove('is-hidden')
		}
	}


	class TabsAutomatic {
		constructor(groupNode, newTab) {

		  this.tablistNode = groupNode;

		  this.tabs = [];

		  this.firstTab = null;
		  this.lastTab = null;

		  this.tabs = Array.from(this.tablistNode.querySelectorAll('.wp-block-pulsar-tab-title'));
		  this.tabpanels = [];

		  for (var i = 0; i < this.tabs.length; i += 1) {

			var tab = this.tabs[i];
			var tab_id = tab.id.replace('tab-','');;

			var tabpanel = document.querySelector('#tabpanel-' + tab_id);

			tab.tabIndex = -1;
			tab.setAttribute('aria-selected', 'false');
			this.tabpanels.push(tabpanel);

			tab.addEventListener('keydown', this.onKeydown.bind(this));
			tab.addEventListener('click', this.onClick.bind(this));

			if (!this.firstTab) {
			  this.firstTab = tab;
			}
			this.lastTab = tab;
		  }


		  if (newTab === true) {
			this.setSelectedTab(this.lastTab, false);
		  } else {
			this.setSelectedTab(this.firstTab, false);
		  }

		}

		setSelectedTab(currentTab, setFocus) {

		  if (typeof setFocus !== 'boolean') {
			setFocus = true;
		  }
		  for (var i = 0; i < this.tabs.length; i += 1) {
			var tab = this.tabs[i];
			if (currentTab === tab) {

			  tab.setAttribute('aria-selected', 'true');
			  tab.removeAttribute('tabindex');
			  this.tabpanels[i].classList.remove('is-hidden');
			  if (setFocus) {
				tab.focus();
			  }
			} else {
			  tab.setAttribute('aria-selected', 'false');
			  tab.tabIndex = -1;
			  this.tabpanels[i].classList.add('is-hidden');
			}
		  }
		}

		setSelectedToPreviousTab(currentTab) {
		  var index;

		  if (currentTab === this.firstTab) {
			this.setSelectedTab(this.lastTab);
		  } else {
			index = this.tabs.indexOf(currentTab);
			this.setSelectedTab(this.tabs[index - 1]);
		  }
		}

		setSelectedToNextTab(currentTab) {
		  var index;

		  if (currentTab === this.lastTab) {
			this.setSelectedTab(this.firstTab);
		  } else {
			index = this.tabs.indexOf(currentTab);
			this.setSelectedTab(this.tabs[index + 1]);
		  }
		}

		/* EVENT HANDLERS */

		onKeydown(event) {
		  var tgt = event.currentTarget,
			flag = false;

		  switch (event.key) {
			case 'ArrowLeft':
			  this.setSelectedToPreviousTab(tgt);
			  flag = true;
			  break;

			case 'ArrowRight':
			  this.setSelectedToNextTab(tgt);
			  flag = true;
			  break;

			case 'Home':
			  this.setSelectedTab(this.firstTab);
			  flag = true;
			  break;

			case 'End':
			  this.setSelectedTab(this.lastTab);
			  flag = true;
			  break;

			default:
			  break;
		  }

		  if (flag) {
			event.stopPropagation();
			event.preventDefault();
		  }
		}

		onClick(event) {

		  this.setSelectedTab(event.currentTarget);
		}
	  }


	// // Initialize tablist
	window.addEventListener('load', function () {
		var tablists = document.querySelectorAll('[role=tablist].automatic');
		for (var i = 0; i < tablists.length; i++) {
			new TabsAutomatic(tablists[i]);
		}
	});

	function insertTabs(clientId) {
		// get container so we can have more that one set of tabs
		let parent = document.getElementById('block-' + clientId);

		// get the id of the titles container
		var tabTitlesContainer = parent.querySelector('.wp-block-pulsar-tab-titles');
		if (tabTitlesContainer) {
			var titlesId = tabTitlesContainer.dataset.block;
		}

		// get the id of the tabs container
		var tabItemsContainer = parent.querySelector('.wp-block-pulsar-tab-items');
		if (tabItemsContainer) {
			var itemsId = tabItemsContainer.dataset.block;

		}

		// need this so we can insert at the end
		var tabTitles = parent.getElementsByClassName('wp-block-pulsar-tab-title');
		var tabItems = parent.getElementsByClassName('wp-block-pulsar-tab-item');

		// create tab blocks
		const title = wp.blocks.createBlock(
			'pulsar/tab-title'
		);
		const tab = wp.blocks.createBlock(
			'pulsar/tab-item'
		);

		function resetTabs() {

			// reset event listeners so they pick up the new tab
			var tablists = document.querySelectorAll('[role=tablist].automatic');
			for (var i = 0; i < tablists.length; i++) {

				new TabsAutomatic(tablists[i], true);
			}
		}

		async function insertBlocks() {
			wp.data.dispatch( 'core/block-editor' ).insertBlock( title, tabTitles.length, titlesId);
			wp.data.dispatch( 'core/block-editor' ).insertBlock( tab, tabItems.length, itemsId);
		}

		insertBlocks().then(
			() => {
				resetTabs();
			}
		);
	}

	return (
		<>
			<InspectorControls>
				<PanelBody
					title={__('Vertical alignment', 'pulsar')} initialOpen={true}
					name="alignment"
					className="alignment"
				>

					<FormToggle
						checked={vertical}
						onChange={() => setAttributes({
							vertical: !vertical
						})}
					/>

				</PanelBody>
			</InspectorControls>

			<div id="wp-block-pulsar-tabs-container"
				{...useBlockProps()}
			>
				<div {...innerBlocksProps}></div>

				<Button className="components-button--add is-secondary has-icon" onClick={() => insertTabs(clientId)}>Add New Tab</Button>
			</div>
		</>
	);
}
