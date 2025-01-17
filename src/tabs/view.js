import Tabs from './components/view';

window.pulsarBlocks = window.pulsarBlocks || {};
window.pulsarBlocks.tabs = new Map();

window.addEventListener('DOMContentLoaded', () => {
	'use strict';

	const tablists = document.querySelectorAll('.wp-block-pulsar-tabs');

	tablists.forEach((tabs) => {
		const tabsId = tabs.getAttribute('data-tabs-id');

		window.pulsarBlocks.tabs.set(tabsId, new Tabs(tabs));
	});
});
