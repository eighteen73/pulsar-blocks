export default class Tabs {
	constructor(groupNode) {
		this.tablistNode = groupNode;

		this.tabs = [];

		this.firstTab = null;
		this.lastTab = null;

		this.tabs = Array.from(this.tablistNode.querySelectorAll('[role=tab]'));
		this.tabpanels = [];

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

	/* HELPER METHODS */

	getTabByNumber(tabNumber) {
		return this.tabs.find((tab) => {
			const tabId = tab.id;
			const match = tabId.match(/-tab-(\d+)$/);
			return match && match[1] === String(tabNumber);
		});
	}

	/* EVENT HANDLERS */

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
}
