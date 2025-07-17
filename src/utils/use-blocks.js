import { useSelect } from '@wordpress/data';
import { store as blockEditorStore } from '@wordpress/block-editor';

export const useBlocks = (blockName) => {
	return useSelect((select) => {
		const data = [];
		const blocks = select(blockEditorStore).getBlocks();

		const searchNestedBlocks = (block) => {
			if (block?.innerBlocks) {
				block.innerBlocks.forEach((innerBlock) => {
					if (innerBlock.name === blockName) {
						data.push(innerBlock);
					}

					searchNestedBlocks(innerBlock);
				});
			}
		};

		blocks.forEach((block) => {
			if (block.name === blockName) {
				data.push(block);
			}

			searchNestedBlocks(block);
		});

		return data;
	});
};
