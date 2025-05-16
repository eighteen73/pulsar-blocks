const v1 = {
	attributes: {
		triggerSelector: {
			type: 'string',
		},
		enableTriggerDelay: {
			type: 'boolean',
			default: false,
		},
	},
	migrate: (attributes) => {
		return {
			clickSelector: attributes.triggerSelector,
		};
	},
};

export default [v1];
