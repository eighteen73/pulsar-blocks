export default class Tabs {
	constructor(groupNode) {
		this.tablistNode = groupNode;

		this.tabs = [];

		this.firstTab = null;
		this.lastTab = null;

		this.tabs = Array.from(this.tablistNode.querySelectorAll('[role=tab]'));
		this.tabpanels = [];

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
	}

	setSelectedTab(currentTab, setFocus) {
		if (typeof setFocus !== 'boolean') {
			setFocus = true;
		}
		for (let i = 0; i < this.tabs.length; i += 1) {
			const tab = this.tabs[i];
			if (currentTab === tab) {
				tab.setAttribute('aria-selected', 'true');
				tab.removeAttribute('tabindex');
				this.tabpanels[i].removeAttribute('hidden');
				if (setFocus) {
					tab.focus();
				}
			} else {
				tab.setAttribute('aria-selected', 'false');
				tab.tabIndex = -1;
				this.tabpanels[i].setAttribute('hidden', true);
			}
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

	/* EVENT HANDLERS */

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
