export default class Tabs {
	constructor(groupNode) {
		this.tablistNode = groupNode;

		this.tabs = [];

		this.firstTab = null;
		this.lastTab = null;

		this.tabs = Array.from(this.tablistNode.querySelectorAll('[role=tab]'));
		this.tabpanels = [];

		// Deep linking configuration
		this.deepLinking =
			this.tablistNode.getAttribute('data-deep-linking') === 'true';
		this.deepLinkingUpdateHistory =
			this.tablistNode.getAttribute(
				'data-deep-linking-update-history'
			) === 'true';

		// Find the select element for mobile view
		this.selectNode = this.tablistNode.querySelector(
			'.wp-block-pulsar-tabs__select'
		);

		for (let i = 0; i < this.tabs.length; i += 1) {
			const tab = this.tabs[i];
			const tabpanel = document.getElementById(
				tab.getAttribute('aria-controls')
			);

			this.tabpanels.push(tabpanel);

			tab.addEventListener('keydown', this.onKeydown.bind(this));
			tab.addEventListener('click', this.onClick.bind(this));

			if (!this.firstTab) {
				this.firstTab = tab;
			}
			this.lastTab = tab;
		}

		// Add select element event listener if it exists
		if (this.selectNode) {
			this.selectNode.addEventListener(
				'change',
				this.onSelectChange.bind(this)
			);
		}

		// Initialize deep linking
		if (this.deepLinking) {
			this.initializeDeepLinking();
		}
	}

	setSelectedTab(currentTab, setFocus) {
		if (typeof setFocus !== 'boolean') {
			setFocus = true;
		}

		let selectedTabNumber = null;

		for (let i = 0; i < this.tabs.length; i += 1) {
			const tab = this.tabs[i];
			if (currentTab === tab) {
				tab.setAttribute('aria-selected', 'true');
				tab.removeAttribute('tabindex');
				this.tabpanels[i].removeAttribute('hidden');

				// Extract tab number for select sync
				const tabId = tab.id;
				const match = tabId.match(/-tab-(\d+)$/);
				if (match) {
					selectedTabNumber = match[1];
				}

				if (setFocus) {
					tab.focus();
				}

				// Update URL hash for deep linking
				this.updateUrlHash(tab);
			} else {
				tab.setAttribute('aria-selected', 'false');
				tab.tabIndex = -1;
				this.tabpanels[i].setAttribute('hidden', true);
			}
		}

		// Sync the select element without triggering its change event
		if (this.selectNode && selectedTabNumber) {
			this.selectNode.value = selectedTabNumber;
		}
	}

	setSelectedToPreviousTab(currentTab) {
		let index;

		if (currentTab === this.firstTab) {
			this.setSelectedTab(this.lastTab);
		} else {
			index = this.tabs.indexOf(currentTab);
			this.setSelectedTab(this.tabs[index - 1]);
		}
	}

	setSelectedToNextTab(currentTab) {
		let index;

		if (currentTab === this.lastTab) {
			this.setSelectedTab(this.firstTab);
		} else {
			index = this.tabs.indexOf(currentTab);
			this.setSelectedTab(this.tabs[index + 1]);
		}
	}

	getTabByNumber(tabNumber) {
		return this.tabs.find((tab) => {
			const tabId = tab.id;
			const match = tabId.match(/-tab-(\d+)$/);
			return match && match[1] === String(tabNumber);
		});
	}
	onSelectChange(event) {
		const selectedValue = event.target.value;
		const selectedTab = this.getTabByNumber(selectedValue);

		if (selectedTab) {
			// Don't set focus when changing via select to avoid jumping focus
			this.setSelectedTab(selectedTab, false);
		}
	}

	onKeydown(event) {
		const tgt = event.currentTarget;
		let flag = false;

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

	getCurrentTabIndex() {
		const tabs = this.tabs;
		for (let i = 0; i < tabs.length; i++) {
			if (tabs[i].getAttribute('aria-selected') === 'true') {
				return i;
			}
		}
		return -1;
	}

	goTo(index) {
		const tabs = this.tabs;
		if (index > 0 && index <= tabs.length) {
			this.setSelectedTab(tabs[index - 1]);
		} else {
			console.error('Invalid tab index'); // eslint-disable-line no-console
		}
	}

	onClick(event) {
		this.setSelectedTab(event.currentTarget);
	}

	initializeDeepLinking() {
		// Check for hash on page load
		this.checkHashOnLoad();

		// Listen for hash changes (browser back/forward)
		window.addEventListener('hashchange', this.onHashChange.bind(this));
	}

	checkHashOnLoad() {
		const hash = window.location.hash;
		if (hash) {
			this.activateTabByHash(hash);
		}
	}

	onHashChange() {
		const hash = window.location.hash;
		if (hash) {
			this.activateTabByHash(hash);
		}
	}

	activateTabByHash(hash) {
		// Remove the # from the hash
		const targetId = hash.substring(1);

		// Find the tab panel with matching data-deep-linking-id
		let targetPanel = null;
		let panelIndex = -1;

		for (let i = 0; i < this.tabpanels.length; i += 1) {
			const panel = this.tabpanels[i];
			const deepLinkingId = panel.getAttribute('data-deep-linking-id');
			if (deepLinkingId === targetId) {
				targetPanel = panel;
				panelIndex = i;
				break;
			}
		}

		if (!targetPanel || panelIndex === -1) {
			return;
		}

		// Activate the corresponding tab button
		if (this.tabs[panelIndex]) {
			// Activate the tab without setting focus (since it's from a hash)
			this.setSelectedTab(this.tabs[panelIndex], false);

			// Scroll the tab into view
			this.scrollTabIntoView(this.tabs[panelIndex]);
		}
	}

	scrollTabIntoView(tab) {
		// Small delay to ensure the tab is visible before scrolling
		setTimeout(() => {
			tab.scrollIntoView({
				behavior: 'smooth',
				block: 'start',
			});
		}, 100);
	}

	updateUrlHash(tab) {
		if (!this.deepLinking) {
			return;
		}

		// Find the corresponding panel and get its deep linking ID
		const panelId = tab.getAttribute('aria-controls');
		const panel = document.getElementById(panelId);

		if (!panel) {
			return;
		}

		const deepLinkingId = panel.getAttribute('data-deep-linking-id');
		if (!deepLinkingId) {
			return;
		}

		const newHash = `#${deepLinkingId}`;

		// Update the URL without triggering a hashchange event
		if (this.deepLinkingUpdateHistory) {
			window.history.pushState(null, null, newHash);
		} else {
			window.history.replaceState(null, null, newHash);
		}
	}
}
