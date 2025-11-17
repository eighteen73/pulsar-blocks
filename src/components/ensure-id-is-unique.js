import { dispatch } from '@wordpress/data';
import { generateId } from '../utils/helpers';

export const ensureIdIsUnique = (blocks) => {
	const duplicates = blocks.filter((obj, index, arr) =>
		arr.find(
			(innerObj) =>
				innerObj.attributes.id === obj.attributes.id &&
				innerObj.clientId !== obj.clientId
		)
	);

	if (duplicates.length <= 1) {
		return;
	}

	for (let i = 1; i < duplicates.length; i++) {
		dispatch('core/block-editor').updateBlockAttributes(
			duplicates[i].clientId,
			{ id: generateId() }
		);
	}
};
